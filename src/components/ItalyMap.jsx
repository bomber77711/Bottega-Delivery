import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { geoMercator, geoPath } from 'd3-geo';
import { regionData, regionCentroids } from './regionData';
import { gastronomySpots } from './gastronomySpots';

const GEOJSON_URL = 'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson';

// ISTAT region code (reg_istat_code_num) -> internal region id.
// Deterministic matching: immune to name spelling, bilingual names and encoding.
const ISTAT_TO_REGION = {
  1: 'piemonte',
  2: 'valle_daosta',
  3: 'lombardia',
  4: 'trentino_alto_adige',
  5: 'veneto',
  6: 'friuli_venezia_giulia',
  7: 'liguria',
  8: 'emilia_romagna',
  9: 'toscana',
  10: 'umbria',
  11: 'marche',
  12: 'lazio',
  13: 'abruzzo',
  14: 'molise',
  15: 'campania',
  16: 'puglia',
  17: 'basilicata',
  18: 'calabria',
  19: 'sicilia',
  20: 'sardegna',
};

// Name-based fallback in case the GeoJSON source ever drops ISTAT codes.
const NAME_TO_REGION = {
  'piemonte': 'piemonte',
  'lombardia': 'lombardia',
  'veneto': 'veneto',
  'liguria': 'liguria',
  'toscana': 'toscana',
  'umbria': 'umbria',
  'marche': 'marche',
  'lazio': 'lazio',
  'abruzzo': 'abruzzo',
  'molise': 'molise',
  'campania': 'campania',
  'puglia': 'puglia',
  'basilicata': 'basilicata',
  'calabria': 'calabria',
  'sicilia': 'sicilia',
  'sardegna': 'sardegna',
};

function resolveRegionId(properties) {
  const code = properties.reg_istat_code_num ?? Number(properties.reg_istat_code);
  if (code && ISTAT_TO_REGION[code]) return ISTAT_TO_REGION[code];
  const rawName = (properties.reg_name || properties.NOME_REG || properties.name || '').toLowerCase();
  if (NAME_TO_REGION[rawName]) return NAME_TO_REGION[rawName];
  if (rawName.startsWith('valle d')) return 'valle_daosta';
  if (rawName.startsWith('trentino')) return 'trentino_alto_adige';
  if (rawName.startsWith('friuli')) return 'friuli_venezia_giulia';
  if (rawName.startsWith('emilia')) return 'emilia_romagna';
  return '';
}

const LAYER_TYPE_MAP = {
  producers: ['producer'],
  ingredients: ['ingredient'],
  dishes: ['dish'],
  wines: ['wine'],
  experiences: ['experience'],
};

function getRegionColor(regionId, producerCount, isHovered) {
  if (isHovered) return '#2D6A4F';
  if (producerCount >= 40) return '#2D5A2D';
  if (producerCount >= 20) return '#1E3E1E';
  if (producerCount >= 10) return '#183218';
  return '#132513';
}

const geojsonCache = { data: null };

function toSlug(str) {
  return (str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CATEGORY_CONFIG = {
  'Olive Oil': { bg: '#6B8E23', em: '\u{1FAD2}' },
  'Wine': { bg: '#7B2040', em: '\u{1F377}' },
  'Cheese': { bg: '#C8960A', em: '\u{1F9C0}' },
  'Coffee': { bg: '#5C3A1E', em: '☕' },
  'Cured Meats': { bg: '#A8404A', em: '\u{1F969}' },
  'Honey': { bg: '#C07820', em: '\u{1F36F}' },
  'Pasta': { bg: '#C06830', em: '\u{1F35D}' },
  'Truffle': { bg: '#5A4A3A', em: '\u{1F344}' },
};

const TYPE_CONFIG = {
  producer: { bg: '#5A7A2A', em: '\u{1F33E}', label: 'Producer' },
  ingredient: { bg: '#2E7D32', em: '\u{1F33F}', label: 'Ingredient' },
  experience: { bg: '#B8860B', em: '\u{1F3E1}', label: 'Experience' },
  wine: { bg: '#7B2040', em: '\u{1F377}', label: 'Wine' },
  dish: { bg: '#C84040', em: '\u{1F37D}️', label: 'Dish' },
};

export default function ItalyMap({ selectedRegion, onRegionSelect, onRegionHover, activeLayer = 'all', activeJourney = null }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [geojson, setGeojson] = useState(null);
  const [dims, setDims] = useState({ width: 600, height: 800 });
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [hoveredSpot, setHoveredSpot] = useState(null); // { spotKey, spot, regionId, x, y } (x/y container-relative)

  useEffect(() => {
    if (geojsonCache.data) { setGeojson(geojsonCache.data); return; }
    fetch(GEOJSON_URL).then(r => r.json()).then(data => {
      data.features = data.features.map(f => ({
        ...f,
        properties: { ...f.properties, regionId: resolveRegionId(f.properties) },
      }));
      geojsonCache.data = data;
      setGeojson(data);
    }).catch(() => console.warn('GeoJSON load failed'));
  }, []);

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      for (const e of entries) setDims({ width: e.contentRect.width, height: e.contentRect.height });
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const proj = useMemo(() => {
    if (!dims.width || !dims.height || !geojson) return null;
    const projection = geoMercator();
    projection.fitExtent([[0, 95], [dims.width, dims.height + 60]], geojson);
    return projection;
  }, [dims, geojson]);

  const pathGen = useMemo(() => proj ? geoPath().projection(proj) : null, [proj]);

  const getPos = useCallback((lng, lat) => {
    if (!proj) return null;
    return proj([lng, lat]);
  }, [proj]);

  const regionPathRefs = useRef({});
  const [zoomTransform, setZoomTransform] = useState({ tx: 0, ty: 0, scale: 1 });

  useEffect(() => {
    if (!selectedRegion || !dims.width || !dims.height) {
      setZoomTransform({ tx: 0, ty: 0, scale: 1 });
      return;
    }
    const el = regionPathRefs.current[selectedRegion];
    if (!el) return;
    const bbox = el.getBBox();
    if (!bbox.width || !bbox.height) return;
    const scale = Math.min(dims.width, dims.height) * 0.75 / Math.max(bbox.width, bbox.height);
    const tx = (dims.width * 0.68) / 2 - scale * (bbox.x + bbox.width / 2);
    const ty = dims.height / 2 - scale * (bbox.y + bbox.height / 2);
    setZoomTransform({ tx, ty, scale });
  }, [selectedRegion, dims]);

  // Geographic spot positions: region centroid + authored [deltaLng, deltaLat] offset.
  // Memoized so they are NOT recomputed on every hover re-render.
  const spotPositions = useMemo(() => {
    if (!proj) return {};
    const out = {};
    Object.entries(gastronomySpots).forEach(([regionId, spots]) => {
      const c = regionCentroids[regionId];
      if (!c) return;
      out[regionId] = spots.map(spot => {
        const off = spot.offset || [0, 0];
        return proj([c.lng + off[0], c.lat + off[1]]);
      });
    });
    return out;
  }, [proj]);

  // Journey route polyline points
  const journeyRoutePoints = useMemo(() => {
    if (!activeJourney || !proj) return null;
    const pts = activeJourney.regions
      .map(id => {
        const c = regionCentroids[id];
        if (!c) return null;
        const pos = proj([c.lng, c.lat]);
        return pos ? `${pos[0]},${pos[1]}` : null;
      })
      .filter(Boolean);
    return pts.length > 1 ? pts.join(' ') : null;
  }, [activeJourney, proj]);

  const handleEnter = useCallback((regionId) => {
    if (!regionData[regionId]) return;
    setHoveredRegion(regionId);
    onRegionHover && onRegionHover(regionId);
  }, [onRegionHover]);

  const handleLeave = useCallback(() => {
    setHoveredRegion(null);
    onRegionHover && onRegionHover(null);
  }, [onRegionHover]);

  const handleClick = useCallback((regionId) => {
    if (regionData[regionId]) onRegionSelect && onRegionSelect(regionId === selectedRegion ? null : regionId);
  }, [selectedRegion, onRegionSelect]);

  const handleSpotClick = useCallback((spot) => {
    if (spot.to) { navigate(spot.to); return; } // explicit deep link to the spot's own page
    const slug = toSlug(spot.name || spot.label || '');
    // For spots without their own page, deep-link to the list pre-filtered on the
    // most distinctive word of the label (e.g. "Truffle Hunt Alba" -> ?q=Truffle)
    const words = (spot.label || spot.name || '').split(' ');
    const q = encodeURIComponent(words.sort((a, b) => b.length - a.length)[0] || '');
    if (spot.type === 'producer') navigate('/producers/' + slug);
    else if (spot.type === 'wine') navigate('/products?q=' + q);
    else if (spot.type === 'experience') navigate('/experiences?q=' + q);
    else if (spot.type === 'dish') navigate('/recipes?q=' + q);
    else if (spot.type === 'ingredient') navigate('/products?q=' + q);
    else navigate('/producers/' + slug);
  }, [navigate]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {geojson && pathGen ? (
        <svg
          id="map-svg"
          viewBox={`0 0 ${dims.width} ${dims.height}`}
          width="100%" height="100%"
          style={{ display: 'block' }}
          onClick={(e) => { if (selectedRegion && (e.target.tagName === 'svg' || e.target.tagName === 'rect')) onRegionSelect(null); }}
        >
          <style>{`
            .hover-ring-outer, .hover-ring { opacity: 0; transition: opacity 0.2s ease; pointer-events: none; }
            g.map-spot:hover > .hover-ring-outer { opacity: 0.7; }
            g.map-spot:hover > .hover-ring { opacity: 0.25; }
          `}</style>
          <defs>
            <filter id="glowSelected">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="spotGlow">
              <feGaussianBlur stdDeviation="1.8" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <pattern id="mapgrid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#mapgrid)" />

          <g transform={`translate(${zoomTransform.tx}, ${zoomTransform.ty}) scale(${zoomTransform.scale})`} style={{ transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>

            {/* Region paths */}
            {geojson.features.map((feature, i) => {
              const regionId = feature.properties.regionId;
              const d = regionData[regionId];
              const count = d?.producerCount || 0;
              const isSelected = selectedRegion === regionId;
              const isHovered = hoveredRegion === regionId;
              const isDimmed = selectedRegion && !isSelected;
              const isInJourney = activeJourney?.regions?.includes(regionId);
              const journeyDimmed = activeJourney && !selectedRegion && !isInJourney;
              const journeyHighlighted = activeJourney && !selectedRegion && isInJourney;
              const baseColor = getRegionColor(regionId, count, isHovered);

              const opacity = isDimmed ? 0.3 : journeyDimmed ? 0.2 : 1;
              const filterVal = isSelected
                ? 'url(#glowSelected)'
                : journeyHighlighted
                ? `saturate(1.4) drop-shadow(0 0 10px ${activeJourney.color}80)`
                : 'none';

              return (
                <path
                  key={i}
                  ref={el => { if (el && regionId) regionPathRefs.current[regionId] = el; }}
                  d={pathGen(feature)}
                  fill={isSelected ? '#2D6A4F' : baseColor}
                  stroke={isSelected ? 'rgba(76,175,80,0.6)' : isHovered ? 'rgba(76,175,80,0.4)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isSelected ? 1.5 : isHovered ? 1 : 0.5}
                  opacity={opacity}
                  role={d ? 'button' : undefined}
                  aria-label={d ? d.name : undefined}
                  style={{
                    cursor: d ? 'pointer' : 'default',
                    transition: 'fill 0.2s, opacity 0.2s, stroke 0.2s, filter 0.3s',
                    filter: filterVal,
                  }}
                  onClick={() => handleClick(regionId)}
                  onMouseEnter={() => handleEnter(regionId)}
                  onMouseLeave={handleLeave}
                />
              );
            })}

            {/* Gastronomy spot markers at real geographic positions, with layer filtering */}
            {Object.entries(gastronomySpots).map(([regionId, spots]) => {
              const positions = spotPositions[regionId];
              if (!positions) return null;
              const isSelected = selectedRegion === regionId;
              const isDimmed = selectedRegion && !isSelected;
              const isInJourney = activeJourney?.regions?.includes(regionId);
              const journeyDimmed = activeJourney && !selectedRegion && !isInJourney;

              return spots.map((spot, si) => {
                if (activeLayer !== 'all') {
                  const allowed = LAYER_TYPE_MAP[activeLayer] || [];
                  if (!allowed.includes(spot.type)) return null;
                }
                const pos = positions[si];
                if (!pos) return null;

                const spotOpacity = isDimmed ? 0.1 : journeyDimmed ? 0.15 : isSelected ? 1 : 0.75;
                const isZoomed = selectedRegion === regionId;
                const s = isZoomed ? zoomTransform.scale : 1;
                const mSz = (isZoomed ? 38 : 17) / s;
                const eSz = (isZoomed ? 20 : 9) / s;
                const cfg = CATEGORY_CONFIG[spot.category || ''] || TYPE_CONFIG[spot.type] || TYPE_CONFIG.producer;
                const spotKey = `${regionId}-spot-${si}`;

                return (
                  <g
                    key={spotKey}
                    className="map-spot"
                    style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}
                    opacity={spotOpacity}
                    role="button"
                    aria-label={`${spot.label} (${TYPE_CONFIG[spot.type]?.label || spot.type})`}
                    onClick={(e) => { e.stopPropagation(); handleSpotClick(spot); }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const crect = containerRef.current?.getBoundingClientRect();
                      if (!crect) return;
                      setHoveredSpot({
                        spotKey, spot, regionId,
                        x: rect.left + rect.width / 2 - crect.left,
                        y: rect.top - crect.top,
                      });
                    }}
                    onMouseLeave={() => setHoveredSpot(null)}
                  >
                    {/* Invisible enlarged hit-area: keeps markers easy to click at any zoom level */}
                    <circle cx={pos[0]} cy={pos[1]} r={mSz / 2 + 10 / s} fill="transparent" stroke="none" />
                    {/* Green hover ring - outer stroke */}
                    <circle cx={pos[0]} cy={pos[1]} r={mSz / 2 + 8 / s} className="hover-ring-outer" fill="none" stroke="#4CAF50" strokeWidth={1.5 / s} />
                    {/* Green hover ring - inner glow */}
                    <circle cx={pos[0]} cy={pos[1]} r={mSz / 2 + 4 / s} className="hover-ring" fill="#4CAF50" />
                    <circle cx={pos[0]} cy={pos[1]} r={mSz / 2 + 2 / s} fill={cfg.bg} opacity={0.15} />
                    <circle cx={pos[0]} cy={pos[1]} r={mSz / 2} fill={cfg.bg} />
                    <text x={pos[0]} y={pos[1]} textAnchor="middle" dominantBaseline="central" fontSize={eSz} style={{ userSelect: 'none', pointerEvents: 'none' }}>{cfg.em}</text>
                  </g>
                );
              });
            })}

            {/* Region centroid producer-count dots — hidden when a non-producer layer is active */}
            {activeLayer === 'all' || activeLayer === 'producers' ? Object.entries(regionCentroids).map(([regionId, centroid]) => {
              const pos = getPos(centroid.lng, centroid.lat);
              if (!pos) return null;
              const d = regionData[regionId];
              if (!d) return null;
              const isSelected = selectedRegion === regionId;
              const isDimmed = selectedRegion && !isSelected;
              const isInJourney = activeJourney?.regions?.includes(regionId);
              const journeyDimmed = activeJourney && !selectedRegion && !isInJourney;
              const r = d.producerCount >= 40 ? 5.5 : d.producerCount >= 20 ? 4.5 : d.producerCount >= 10 ? 3.5 : 2.5;

              return (
                <g key={`dot-${regionId}`} style={{ opacity: isDimmed ? 0.2 : journeyDimmed ? 0.1 : 1, transition: 'opacity 0.25s' }}>
                  <circle cx={pos[0]} cy={pos[1]} r={r * 2.2} fill="rgba(76,175,80,0.1)"
                    style={{ animation: `markerPulse 3s ease-in-out infinite`, animationDelay: `${Math.abs(centroid.lat % 2)}s` }}
                  />
                  <circle cx={pos[0]} cy={pos[1]} r={r}
                    fill={isSelected ? '#fff' : '#4CAF50'}
                    stroke={isSelected ? '#4CAF50' : 'rgba(10,10,10,0.5)'}
                    strokeWidth={1} filter="url(#spotGlow)"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => { e.stopPropagation(); handleClick(regionId); }}
                  />
                </g>
              );
            }) : null}

            {/* Journey route polyline */}
            {journeyRoutePoints && (
              <polyline
                points={journeyRoutePoints}
                fill="none"
                stroke={activeJourney.color}
                strokeWidth={2.5}
                strokeDasharray="6 4"
                opacity={0.75}
                style={{ animation: 'dashMove 1s linear infinite', pointerEvents: 'none' }}
              />
            )}

          </g>
        </svg>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(255,255,255,0.3)', fontSize: 13, gap: 8 }}>
          <div style={{ width: 16, height: 16, border: '2px solid rgba(76,175,80,0.4)', borderTop: '2px solid #4CAF50', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          Loading atlas…
        </div>
      )}

      {/* Spot hover tooltip */}
      {hoveredSpot && (
        <div style={{
          position: 'absolute',
          left: hoveredSpot.x,
          top: hoveredSpot.y,
          transform: 'translate(-50%, calc(-100% - 10px))',
          zIndex: 400,
          pointerEvents: 'none',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(12px)',
          borderRadius: 10,
          boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          whiteSpace: 'nowrap',
          animation: 'fadeSlideIn 0.15s ease',
        }}>
          <span style={{ fontSize: 18 }}>{hoveredSpot.spot.emoji}</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: '#2E7D32', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {TYPE_CONFIG[hoveredSpot.spot.type]?.label || 'Gastronomy'}
            </span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, color: '#1A1A1A' }}>{hoveredSpot.spot.label}</span>
          </div>
        </div>
      )}
    </div>
  );
}
