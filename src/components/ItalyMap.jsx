import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { X, ArrowRight } from 'lucide-react';
import topology from './map/italy-regions.topo.json';
import { regionData, regionCentroids } from './regionData';
import { gastronomySpots } from './gastronomySpots';
import { resolveSpot } from '@/lib/catalog';

/*
 * Interactive Italy map.
 *
 * Performance design
 *  - Region boundaries are a bundled, simplified TopoJSON (~57 KB, ~6k vertices) instead of a
 *    2.75 MB GeoJSON fetched from GitHub at runtime (71k vertices).
 *  - SVG path strings are computed once per container size, never on hover.
 *  - Mouse-follow tooltips are positioned through a ref (no React state per mousemove).
 *  - Zoom is a single animated transform on the region layer; markers live in an unscaled
 *    overlay so they keep a constant on-screen size at every zoom level.
 */

// ── Geography ─────────────────────────────────────────────────────────
const ISTAT_TO_REGION = {
  1: 'piemonte', 2: 'valle_daosta', 3: 'lombardia', 4: 'trentino_alto_adige', 5: 'veneto',
  6: 'friuli_venezia_giulia', 7: 'liguria', 8: 'emilia_romagna', 9: 'toscana', 10: 'umbria',
  11: 'marche', 12: 'lazio', 13: 'abruzzo', 14: 'molise', 15: 'campania', 16: 'puglia',
  17: 'basilicata', 18: 'calabria', 19: 'sicilia', 20: 'sardegna',
};

const ITALY = (() => {
  const fc = feature(topology, topology.objects.regions);
  fc.features.forEach((f) => { f.properties.regionId = ISTAT_TO_REGION[f.properties.reg_istat_code_num] || ''; });
  return fc;
})();

// ── Visual config (exported so the legend uses the exact same scale) ──
// The original Bottega palette: subtle dark greens, deliberately low-contrast.
export const DENSITY_SCALE = [
  { min: 40, color: '#2D5A2D', label: '40+' },
  { min: 20, color: '#1E3E1E', label: '20–39' },
  { min: 10, color: '#183218', label: '10–19' },
  { min: 0, color: '#132513', label: '<10' },
];
const HOVER_FILL = '#2D6A4F';
const SELECTED_FILL = '#2D6A4F';
const regionFill = (count) => DENSITY_SCALE.find((b) => count >= b.min).color;

export const TYPE_CONFIG = {
  producer: { bg: '#5A7A2A', em: '\u{1F33E}', label: 'Producer' },
  ingredient: { bg: '#2E7D32', em: '\u{1F33F}', label: 'Ingredient' },
  experience: { bg: '#B8860B', em: '\u{1F3E1}', label: 'Experience' },
  wine: { bg: '#7B2040', em: '\u{1F377}', label: 'Wine' },
  dish: { bg: '#C84040', em: '\u{1F37D}\u{FE0F}', label: 'Dish' },
};

const LAYER_TYPE_MAP = {
  producers: ['producer'],
  ingredients: ['ingredient'],
  dishes: ['dish'],
  wines: ['wine'],
  experiences: ['experience'],
};

const MARKER = { national: 17, zoomed: 34, zoomedCompact: 28 };
const ZOOM_MS = 650;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Screen-space de-overlap: nudges markers apart (pairwise repulsion) so none hide another.
function relax(points, minDist, iterations = 30) {
  const p = points.map(([x, y]) => [x, y]);
  for (let it = 0; it < iterations; it++) {
    let moved = false;
    for (let i = 0; i < p.length; i++) {
      for (let j = i + 1; j < p.length; j++) {
        let dx = p[j][0] - p[i][0], dy = p[j][1] - p[i][1];
        let d = Math.hypot(dx, dy);
        if (d >= minDist) continue;
        if (d < 0.01) { dx = Math.cos(j * 2.4); dy = Math.sin(j * 2.4); d = 1; }
        const push = (minDist - d) / 2, ux = dx / d, uy = dy / d;
        p[i][0] -= ux * push; p[i][1] -= uy * push;
        p[j][0] += ux * push; p[j][1] += uy * push;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return p;
}

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches);
  useEffect(() => {
    const mq = window.matchMedia?.('(hover: none)');
    if (!mq) return;
    const on = () => setCoarse(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return coarse;
}

// ── Region path (memoised: only re-renders when its own visual state changes) ──
const RegionPath = memo(function RegionPath({ regionId, d, name, fill, stroke, strokeWidth, opacity, glow, journeyColor, interactive, onEnter, onLeave, onSelect }) {
  return (
    <path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
      opacity={opacity}
      className={interactive ? 'it-region' : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : -1}
      aria-label={interactive ? `${name} — open region` : undefined}
      style={{
        cursor: interactive ? 'pointer' : 'default',
        transition: 'fill 0.18s ease, opacity 0.25s ease',
        filter: glow ? 'drop-shadow(0 0 6px rgba(76,175,80,0.55))' : journeyColor ? `drop-shadow(0 0 8px ${journeyColor}AA)` : undefined,
      }}
      onMouseEnter={interactive ? () => onEnter(regionId) : undefined}
      onMouseLeave={interactive ? onLeave : undefined}
      onClick={interactive ? (e) => { e.stopPropagation(); onSelect(regionId); } : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(regionId); } } : undefined}
    />
  );
});

// ── Main component ────────────────────────────────────────────────────
export default function ItalyMap({
  selectedRegion,
  onRegionSelect,
  onRegionHover,
  activeLayer = 'all',
  activeJourney = null,
  selectedSpot = null,          // { regionId, index }
  onSpotSelect,                 // (spotRef | null) => void
  insets = { top: 110, right: 24, bottom: 24, left: 24 }, // screen area hidden by overlays
}) {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const navigate = useNavigate();
  const coarse = useCoarsePointer();
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [hover, setHover] = useState(null); // { kind: 'region', regionId } | { kind: 'spot', regionId, index }

  // Container size
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setDims({ width: el.clientWidth, height: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const compact = dims.width > 0 && dims.width < 768;

  // Base projection: whole of Italy fitted inside the area not covered by overlays.
  const proj = useMemo(() => {
    if (!dims.width || !dims.height) return null;
    // Italy fills the screen (like the original): it may tuck under the floating controls.
    return geoMercator().fitExtent(
      compact ? [[8, 112], [dims.width - 8, dims.height - 56]] : [[0, 72], [dims.width, dims.height + 30]],
      ITALY,
    );
  }, [dims.width, dims.height, compact]);

  // Path strings + bounds — computed once per projection, never on hover.
  const shapes = useMemo(() => {
    if (!proj) return [];
    const pg = geoPath(proj);
    return ITALY.features.map((f) => ({ regionId: f.properties.regionId, name: regionData[f.properties.regionId]?.name || f.properties.reg_name, d: pg(f), bounds: pg.bounds(f) }));
  }, [proj]);
  const boundsById = useMemo(() => Object.fromEntries(shapes.map((s) => [s.regionId, s.bounds])), [shapes]);

  // Two marker layouts, projected once:
  //  - spotNat:  the original evenly-spread "constellation" (authored offsets) for the national view
  //  - spotReal: the real town each spot represents, used once you zoom into a region
  const { spotNat, spotReal } = useMemo(() => {
    if (!proj) return { spotNat: {}, spotReal: {} };
    const nat = {}, real = {};
    for (const [regionId, spots] of Object.entries(gastronomySpots)) {
      const c = regionCentroids[regionId];
      if (!c) continue;
      nat[regionId] = spots.map((s) => proj([c.lng + (s.offset?.[0] || 0), c.lat + (s.offset?.[1] || 0)]));
      real[regionId] = spots.map((s, i) => (s.coords ? proj(s.coords) : nat[regionId][i]));
    }
    return { spotNat: nat, spotReal: real };
  }, [proj]);

  const centroidBase = useMemo(() => {
    if (!proj) return {};
    return Object.fromEntries(Object.entries(regionCentroids).map(([id, c]) => [id, proj([c.lng, c.lat])]));
  }, [proj]);

  // ── Zoom (animated with rAF so markers can track the transform every frame) ──
  const target = useMemo(() => {
    const b = selectedRegion && boundsById[selectedRegion];
    if (!b || !dims.width) return { tx: 0, ty: 0, s: 1 };
    const [[x0, y0], [x1, y1]] = b;
    const box = {
      x0: insets.left, y0: insets.top,
      x1: dims.width - insets.right, y1: dims.height - insets.bottom,
    };
    const bw = Math.max(1, box.x1 - box.x0), bh = Math.max(1, box.y1 - box.y0);
    const s = Math.max(1, Math.min(10, 0.86 * Math.min(bw / (x1 - x0), bh / (y1 - y0))));
    return { s, tx: (box.x0 + box.x1) / 2 - s * (x0 + x1) / 2, ty: (box.y0 + box.y1) / 2 - s * (y0 + y1) / 2 };
  }, [selectedRegion, boundsById, dims.width, dims.height, insets.left, insets.top, insets.right, insets.bottom]);

  // De-overlap offsets (px), computed once per layout — not per animation frame.
  const nationalOffsets = useMemo(() => {
    const keys = [], pts = [];
    for (const [regionId, list] of Object.entries(spotNat)) list.forEach((p, i) => { if (p) { keys.push(`${regionId}-${i}`); pts.push(p); } });
    const relaxed = relax(pts, MARKER.national - 3);
    return Object.fromEntries(keys.map((k, i) => [k, [relaxed[i][0] - pts[i][0], relaxed[i][1] - pts[i][1]]]));
  }, [spotNat]);
  const zoomOffsets = useMemo(() => {
    if (!selectedRegion || !spotReal[selectedRegion]) return {};
    const size = compact ? MARKER.zoomedCompact : MARKER.zoomed;
    const pts = spotReal[selectedRegion].map((p) => [p[0] * target.s + target.tx, p[1] * target.s + target.ty]);
    const relaxed = relax(pts, size + 6);
    return Object.fromEntries(pts.map((p, i) => [`${selectedRegion}-${i}`, [relaxed[i][0] - p[0], relaxed[i][1] - p[1]]]));
  }, [selectedRegion, spotReal, target, compact]);

  const [view, setView] = useState({ tx: 0, ty: 0, s: 1, k: 1 });
  const viewRef = useRef(view);
  viewRef.current = view;
  useEffect(() => {
    const from = viewRef.current;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || (from.tx === target.tx && from.ty === target.ty && from.s === target.s)) { setView({ ...target, k: 1 }); return; }
    let raf, start;
    const step = (t) => {
      if (start === undefined) start = t;
      const k = easeInOutCubic(Math.min(1, (t - start) / ZOOM_MS));
      // interpolate scale geometrically so the zoom feels uniform
      const s = from.s * Math.pow(target.s / from.s, k);
      setView({ s, tx: from.tx + (target.tx - from.tx) * k, ty: from.ty + (target.ty - from.ty) * k, k });
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const toScreen = useCallback((p) => (p ? [p[0] * view.s + view.tx, p[1] * view.s + view.ty] : null), [view]);
  const zoomed = !!selectedRegion;

  // ── Interaction handlers (stable identities so RegionPath memo holds) ──
  const selectRegion = useCallback((regionId) => {
    if (!regionData[regionId]) return;
    onSpotSelect?.(null);
    onRegionSelect?.(regionId === selectedRegion ? null : regionId);
  }, [onRegionSelect, onSpotSelect, selectedRegion]);
  const selectRef = useRef(selectRegion);
  selectRef.current = selectRegion;
  const stableSelect = useCallback((id) => selectRef.current(id), []);

  const enterRegion = useCallback((regionId) => {
    setHover({ kind: 'region', regionId });
    onRegionHover?.(regionId);
  }, [onRegionHover]);
  const leaveRegion = useCallback(() => {
    setHover((h) => (h?.kind === 'region' ? null : h));
    onRegionHover?.(null);
  }, [onRegionHover]);

  const activateSpot = useCallback((regionId, index) => {
    if (regionId !== selectedRegion) onRegionSelect?.(regionId);
    onSpotSelect?.({ regionId, index });
  }, [selectedRegion, onRegionSelect, onSpotSelect]);

  // Tooltip follows the cursor via direct style writes (no re-render per mousemove)
  const onMouseMove = useCallback((e) => {
    const tip = tooltipRef.current, box = containerRef.current;
    if (!tip || !box) return;
    const r = box.getBoundingClientRect();
    let x = e.clientX - r.left + 16, y = e.clientY - r.top + 18;
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    if (x + tw > r.width - 8) x = e.clientX - r.left - tw - 16;
    if (y + th > r.height - 8) y = e.clientY - r.top - th - 14;
    tip.style.transform = `translate(${Math.max(8, x)}px, ${Math.max(8, y)}px)`;
  }, []);

  // ── Derived marker list ──
  const allowedTypes = activeLayer !== 'all' ? LAYER_TYPE_MAP[activeLayer] || [] : null;
  const markers = [];
  const lerp = (a, b, t) => a + (b - a) * t;
  const glide = zoomed ? view.k : 0; // selected region's markers glide from constellation → real towns
  for (const [regionId, spots] of Object.entries(gastronomySpots)) {
    const nat = spotNat[regionId], real = spotReal[regionId];
    if (!nat) continue;
    const isSel = regionId === selectedRegion;
    if (zoomed && !isSel) continue; // other regions' markers are hidden while zoomed
    const journeyDim = activeJourney && !zoomed && !activeJourney.regions.includes(regionId);
    spots.forEach((spot, index) => {
      if (allowedTypes && !allowedTypes.includes(spot.type)) return;
      const key = `${regionId}-${index}`;
      const a = toScreen(nat[index]), aOff = nationalOffsets[key] || [0, 0];
      if (!a) return;
      let pos = [a[0] + aOff[0], a[1] + aOff[1]];
      const t = isSel ? glide : 0;
      if (t > 0) {
        const b = toScreen(real[index]), bOff = zoomOffsets[key] || [0, 0];
        pos = [lerp(pos[0], b[0] + bOff[0], t), lerp(pos[1], b[1] + bOff[1], t)];
      }
      markers.push({ regionId, index, spot, pos, isSel, journeyDim, t });
    });
  }

  const selectedSpotData = selectedSpot && gastronomySpots[selectedSpot.regionId]?.[selectedSpot.index];
  const selectedSpotPos = (() => {
    if (!selectedSpotData) return null;
    const raw = toScreen(spotReal[selectedSpot.regionId]?.[selectedSpot.index]);
    const off = zoomOffsets[`${selectedSpot.regionId}-${selectedSpot.index}`] || [0, 0];
    return raw ? [raw[0] + off[0], raw[1] + off[1]] : null;
  })();
  const resolved = useMemo(
    () => (selectedSpotData ? resolveSpot(selectedSpotData, selectedSpot.regionId) : null),
    [selectedSpotData, selectedSpot?.regionId],
  );

  const hoverRegion = hover?.kind === 'region' ? regionData[hover.regionId] : null;
  const hoverSpot = hover?.kind === 'spot' ? gastronomySpots[hover.regionId]?.[hover.index] : null;
  const showTooltip = !coarse && ((hoverRegion && !zoomed) || hoverSpot);

  const markerInteractive = !coarse || zoomed; // on touch screens, the first tap picks a region

  return (
    <div
      ref={containerRef}
      onMouseMove={coarse ? undefined : onMouseMove}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', touchAction: 'manipulation' }}
    >
      <style>{`
        .it-region:focus { outline: none; }
        .it-region:focus-visible { stroke: #C8E6C9 !important; stroke-width: 2.5px !important; }
        .it-spot:focus { outline: none; }
        .it-spot:focus-visible .it-ring { opacity: 1 !important; }
        .it-spot .it-ring { opacity: 0; transition: opacity .15s ease; pointer-events: none; }
        .it-spot:hover .it-ring, .it-spot.is-active .it-ring { opacity: 1; }
        @keyframes itPulse { 0%,100% { opacity: .9 } 50% { opacity: .35 } }
        @keyframes itCardIn { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
      `}</style>

      {proj ? (
        <svg
          id="map-svg"
          width={dims.width}
          height={dims.height}
          viewBox={`0 0 ${dims.width} ${dims.height}`}
          style={{ display: 'block' }}
          role="application"
          aria-label="Interactive map of Italian food regions"
          onClick={() => { if (selectedSpot) onSpotSelect?.(null); else if (selectedRegion) onRegionSelect?.(null); }}
        >
          <defs>
            <pattern id="mapgrid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapgrid)" />

          {/* Region layer — one transform for zoom */}
          <g transform={`translate(${view.tx} ${view.ty}) scale(${view.s})`}>
            {shapes.map(({ regionId, d, name }) => {
              const data = regionData[regionId];
              const isSel = selectedRegion === regionId;
              const isHov = hover?.kind === 'region' && hover.regionId === regionId;
              const inJourney = activeJourney?.regions?.includes(regionId);
              const opacity = zoomed && !isSel ? 0.35 : activeJourney && !zoomed && !inJourney ? 0.3 : 1;
              return (
                <RegionPath
                  key={regionId || name}
                  regionId={regionId}
                  d={d}
                  name={name}
                  fill={isSel ? SELECTED_FILL : isHov ? HOVER_FILL : regionFill(data?.producerCount || 0)}
                  stroke={isSel ? 'rgba(76,175,80,0.6)' : isHov ? 'rgba(76,175,80,0.4)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isSel ? 1.5 : isHov ? 1 : 0.5}
                  opacity={opacity}
                  glow={isSel}
                  journeyColor={activeJourney && !zoomed && inJourney ? activeJourney.color : null}
                  interactive={!!data}
                  onEnter={enterRegion}
                  onLeave={leaveRegion}
                  onSelect={stableSelect}
                />
              );
            })}
          </g>

          {/* Journey route (screen space, constant stroke) */}
          {activeJourney && !zoomed && (() => {
            const pts = activeJourney.regions.map((id) => toScreen(centroidBase[id])).filter(Boolean);
            return pts.length > 1 ? (
              <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={activeJourney.color} strokeWidth={2.5}
                strokeDasharray="6 4" opacity={0.85} style={{ animation: 'dashMove 1s linear infinite', pointerEvents: 'none' }} />
            ) : null;
          })()}

          {/* Producer-density dots (national view only) */}
          {!zoomed && (activeLayer === 'all' || activeLayer === 'producers') && Object.entries(centroidBase).map(([regionId, p]) => {
            const d = regionData[regionId];
            const pos = toScreen(p);
            if (!d || !pos) return null;
            const r = d.producerCount >= 40 ? 5.5 : d.producerCount >= 20 ? 4.5 : d.producerCount >= 10 ? 3.5 : 2.5;
            const dim = activeJourney && !activeJourney.regions.includes(regionId);
            return (
              <g key={`dot-${regionId}`} opacity={dim ? 0.15 : 1} style={{ pointerEvents: 'none' }}>
                <circle cx={pos[0]} cy={pos[1]} r={r * 2.2} fill="rgba(76,175,80,0.14)" style={{ animation: 'itPulse 3s ease-in-out infinite', animationDelay: `${(Math.abs(p[0]) % 20) / 10}s` }} />
                <circle cx={pos[0]} cy={pos[1]} r={r} fill="#66BB6A" stroke="rgba(10,10,10,0.55)" strokeWidth={1} />
              </g>
            );
          })}

          {/* Gastronomy markers — unscaled overlay, constant on-screen size */}
          {markers.map(({ regionId, index, spot, pos, isSel, journeyDim, t }) => {
            const size = lerp(MARKER.national, compact ? MARKER.zoomedCompact : MARKER.zoomed, t);
            const cfg = TYPE_CONFIG[spot.type] || TYPE_CONFIG.producer;
            const active = selectedSpot?.regionId === regionId && selectedSpot?.index === index;
            const label = `${spot.label} — ${cfg.label}`;
            return (
              <g
                key={`${regionId}-${index}`}
                className={`it-spot${active ? ' is-active' : ''}`}
                transform={`translate(${pos[0]} ${pos[1]})`}
                opacity={journeyDim ? 0.15 : lerp(0.75, 1, t)}
                style={{ cursor: 'pointer', pointerEvents: markerInteractive ? 'auto' : 'none', transition: 'opacity .2s' }}
                role="button"
                tabIndex={isSel ? 0 : -1}
                aria-label={label}
                onClick={(e) => { e.stopPropagation(); activateSpot(regionId, index); }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateSpot(regionId, index); } }}
                onMouseEnter={coarse ? undefined : () => setHover({ kind: 'spot', regionId, index })}
                onMouseLeave={coarse ? undefined : () => setHover((h) => (h?.kind === 'spot' ? null : h))}
              >
                {/* hit area: exactly the marker, plus a small touch margin when zoomed */}
                <circle r={size / 2 + (isSel ? 6 : 1)} fill="transparent" />
                <circle className="it-ring" r={size / 2 + 5} fill="rgba(76,175,80,0.22)" stroke="#81C784" strokeWidth={1.5} />
                <circle r={size / 2 + 2} fill={cfg.bg} opacity={0.15} />
                <circle r={size / 2} fill={cfg.bg} />
                <text textAnchor="middle" dominantBaseline="central" fontSize={size * (t > 0.5 ? 0.55 : 0.53)} style={{ userSelect: 'none', pointerEvents: 'none' }}>
                  {t > 0.5 ? (spot.emoji || cfg.em) : cfg.em}
                </text>
              </g>
            );
          })}
        </svg>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(255,255,255,0.35)', fontSize: 13, gap: 8 }}>
          <div style={{ width: 16, height: 16, border: '2px solid rgba(76,175,80,0.4)', borderTop: '2px solid #4CAF50', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          Loading atlas…
        </div>
      )}

      {/* Mouse-follow tooltip (desktop only) */}
      <div
        ref={tooltipRef}
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, top: 0, zIndex: 400, pointerEvents: 'none',
          opacity: showTooltip ? 1 : 0, transition: 'opacity .12s ease',
          maxWidth: 280,
        }}
      >
        {hoverSpot ? (
          <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 10, boxShadow: '0 8px 28px rgba(0,0,0,0.3)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: 18 }}>{hoverSpot.emoji}</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: '#2E7D32', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {TYPE_CONFIG[hoverSpot.type]?.label || 'Gastronomy'} · {regionData[hover.regionId]?.name}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{hoverSpot.label}</span>
              <span style={{ fontSize: 10, color: '#888' }}>Click for details</span>
            </div>
          </div>
        ) : hoverRegion ? (
          <div style={{ background: 'rgba(6,13,6,0.94)', border: '1px solid rgba(76,175,80,0.35)', borderRadius: 12, padding: '11px 15px', boxShadow: '0 8px 32px rgba(0,0,0,0.45)', minWidth: 210 }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 3px' }}>{hoverRegion.name}</p>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#81C784', margin: '0 0 5px' }}>{hoverRegion.producerCount} producers · {hoverRegion.experienceCount} experiences</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, margin: 0 }}>{hoverRegion.featuredProducts.slice(0, 3).join(' · ')}</p>
            <p style={{ fontSize: 10, color: 'rgba(129,199,132,0.85)', margin: '6px 0 0', fontWeight: 600 }}>Click to explore →</p>
          </div>
        ) : null}
      </div>

      {/* Spot detail card */}
      {selectedSpotData && resolved && (
        <SpotCard
          spot={selectedSpotData}
          regionName={regionData[selectedSpot.regionId]?.name}
          resolved={resolved}
          anchor={selectedSpotPos}
          container={dims}
          compact={compact}
          insets={insets}
          onClose={() => onSpotSelect?.(null)}
          onNavigate={(to) => navigate(to)}
        />
      )}
    </div>
  );
}

// ── Spot card ─────────────────────────────────────────────────────────
function SpotCard({ spot, regionName, resolved, anchor, container, compact, insets, onClose, onNavigate }) {
  const cfg = TYPE_CONFIG[spot.type] || TYPE_CONFIG.producer;
  const W = compact ? Math.min(container.width - 24, 360) : 290;

  let style;
  if (compact || !anchor) {
    style = { left: '50%', top: Math.max(insets.top - 4, 12), transform: 'translateX(-50%)', width: W };
  } else {
    // to the right of the marker, flipped left if it would collide with the side panel
    const rightLimit = container.width - insets.right - 12;
    let x = anchor[0] + 28;
    if (x + W > rightLimit) x = anchor[0] - 28 - W;
    x = Math.max(12, x);
    let y = anchor[1] - 40;
    y = Math.max(insets.top - 10, Math.min(y, container.height - 260));
    style = { left: x, top: y, width: W };
  }

  const [primary, ...rest] = resolved.links;

  return (
    <div
      role="dialog"
      aria-label={`${spot.label} details`}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute', zIndex: 420, ...style,
        background: '#fff', borderRadius: 14, boxShadow: '0 18px 50px rgba(0,0,0,0.38)',
        overflow: 'hidden', animation: 'itCardIn .18s ease', fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 14px 11px', borderBottom: '1px solid #EEF3EE' }}>
        <span style={{ width: 38, height: 38, borderRadius: '50%', background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 }}>{spot.emoji || cfg.em}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#2E7D32' }}>{cfg.label} · {regionName}</p>
          <p style={{ margin: '2px 0 0', fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}>{spot.label}</p>
        </div>
        <button onClick={onClose} aria-label="Close" style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: '#F2F5F2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <X size={13} color="#555" />
        </button>
      </div>
      <div style={{ padding: '11px 14px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {primary && (
          <button onClick={() => onNavigate(primary.to)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, width: '100%', padding: '10px 13px', borderRadius: 9, border: 'none', background: '#2E7D32', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}>
            <span>{primary.label}</span><ArrowRight size={14} />
          </button>
        )}
        {rest.map((l) => (
          <button key={l.to} onClick={() => onNavigate(l.to)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, width: '100%', padding: '8px 12px', borderRadius: 9, border: '1px solid #E3EEE3', background: '#F7FAF7', color: '#2E7D32', fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
            <span>{l.label}</span><ArrowRight size={12} />
          </button>
        ))}
      </div>
    </div>
  );
}
