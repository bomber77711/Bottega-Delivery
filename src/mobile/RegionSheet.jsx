import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { regionData } from '@/components/regionData';
import { gastronomySpots } from '@/components/gastronomySpots';
import { TYPE_CONFIG, LAYER_TYPE_MAP, SPOT_DESTINATIONS } from '@/components/ItalyMap';
import { resolveSpot, searchExperiences, slugify } from '@/lib/catalog';

/*
 * Phone-only region sheet (replaces the desktop side panel below 768px).
 *  - peek: name, category chips and a swipeable row of the region's places — the map stays visible
 *    above it and the icon of the card in the middle of the row lights up.
 *  - full: swipe/tap the header up for the story, specialties, producers and experiences.
 *  - swipe down from peek closes the region.
 */
export const SHEET_PEEK = 262;

const CHIPS = [
  { id: 'all', label: 'All' },
  { id: 'producers', label: 'Producers', type: 'producer' },
  { id: 'ingredients', label: 'Ingredients', type: 'ingredient' },
  { id: 'dishes', label: 'Dishes', type: 'dish' },
  { id: 'wines', label: 'Wines', type: 'wine' },
  { id: 'experiences', label: 'Experiences', type: 'experience' },
];

const KIND_VERB = { guide: 'Guide', producer: 'Producer', products: 'Shop', recipe: 'Recipe', experience: 'Book', region: 'Discover' };

export default function RegionSheet({ regionId, extra, onClose, layer, onLayer, onHighlight, containerHeight }) {
  const navigate = useNavigate();
  const data = regionId ? regionData[regionId] : null;
  const open = !!data;
  const [full, setFull] = useState(false);
  const [drag, setDrag] = useState(0); // live finger offset (px, + = down)
  const dragRef = useRef(null);
  const rowRef = useRef(null);
  const bodyRef = useRef(null);

  const fullH = Math.max(SHEET_PEEK + 80, (containerHeight || 640) - 64);
  const restY = full ? 0 : fullH - SHEET_PEEK;

  // Reset when the region changes
  useEffect(() => {
    setFull(false);
    if (rowRef.current) rowRef.current.scrollLeft = 0;
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [regionId]);

  const spots = useMemo(() => {
    if (!regionId) return [];
    const allowed = layer !== 'all' ? LAYER_TYPE_MAP[layer] || [] : null;
    return (gastronomySpots[regionId] || [])
      .map((spot, index) => ({ spot, index, dest: SPOT_DESTINATIONS[regionId]?.[index] }))
      .filter(({ spot }) => !allowed || allowed.includes(spot.type));
  }, [regionId, layer]);

  const counts = useMemo(() => {
    const c = {};
    (gastronomySpots[regionId] || []).forEach((s) => { c[s.type] = (c[s.type] || 0) + 1; });
    return c;
  }, [regionId]);

  // Card in the middle of the row ↔ highlighted icon on the map
  const syncHighlight = useCallback(() => {
    const row = rowRef.current;
    if (!row || !spots.length) { onHighlight(null); return; }
    const mid = row.scrollLeft + row.clientWidth / 2;
    let best = 0, bestD = Infinity;
    Array.from(row.children).forEach((el, i) => {
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    // At the very start the first card is the active one
    if (row.scrollLeft < 8) best = 0;
    const s = spots[best];
    onHighlight(s ? { regionId, index: s.index } : null);
  }, [spots, regionId, onHighlight]);

  useEffect(() => {
    if (!open) { onHighlight(null); return; }
    if (rowRef.current) rowRef.current.scrollLeft = 0;
    const t = setTimeout(syncHighlight, 0);
    return () => clearTimeout(t);
  }, [open, syncHighlight, onHighlight]);

  const rafRef = useRef(0);
  const onRowScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => { rafRef.current = 0; syncHighlight(); });
  }, [syncHighlight]);
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // ── Vertical drag on the handle (grabber + header) ──
  const onTouchStart = (e) => {
    const t = e.touches[0];
    dragRef.current = { y0: t.clientY, t0: Date.now(), active: true, moved: false, dy: 0 };
  };
  const onTouchMove = (e) => {
    const st = dragRef.current;
    if (!st?.active) return;
    const dy = e.touches[0].clientY - st.y0;
    if (Math.abs(dy) > 4) st.moved = true;
    st.dy = dy;
    // resist dragging above the full position
    setDrag(restY + dy < 0 ? -Math.sqrt(-(restY + dy)) * 2 - restY : dy);
  };
  const onTouchEnd = () => {
    const st = dragRef.current;
    if (!st?.active) return;
    st.active = false;
    const dy = st.dy;
    const fast = Date.now() - st.t0 < 250;
    setDrag(0);
    if (!st.moved) return; // a tap is handled by onClick
    if (dy < -(fast ? 20 : 60)) setFull(true);
    else if (dy > (fast ? 20 : 60)) { if (full) setFull(false); else onClose(); }
  };

  const ingredientLink = (name) => resolveSpot({ label: name, type: 'ingredient' }, regionId).primary?.to;
  const experienceLink = (name) => (searchExperiences(name).length ? `/Experiences?q=${encodeURIComponent(name)}` : `/Experiences?region=${regionId}`);

  const y = open ? restY + drag : fullH + 40;

  return (
    <aside
      className="rs"
      aria-hidden={!open}
      aria-label={data ? `${data.name} region` : undefined}
      onClick={(e) => e.stopPropagation()}
      style={{
        height: fullH,
        transform: `translateY(${Math.round(y)}px)`,
        transition: drag ? 'none' : 'transform .34s cubic-bezier(.32,.72,0,1)',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      {data && (
        <>
          <div className="rs-handle" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onTouchCancel={onTouchEnd}>
            <button type="button" className="rs-grabber" aria-label={full ? 'Show less' : 'Show more'} onClick={() => setFull((f) => !f)}><span /></button>
            <div className="rs-head">
              <button type="button" className="rs-title" onClick={() => setFull((f) => !f)}>
                <h2 className={data.name.length > 14 ? 'is-long' : undefined}>{data.name}</h2>
                <span>{data.producerCount} producers · {data.experienceCount} experiences</span>
              </button>
              <button type="button" className="rs-explore" onClick={() => navigate(`/regions/${regionId}`)}>Explore <ArrowRight size={13} /></button>
              <button type="button" className="rs-close" onClick={onClose} aria-label="Close region"><X size={18} /></button>
            </div>
          </div>

          <div className="rs-chips" role="toolbar" aria-label="Show on map">
            {CHIPS.filter((c) => !c.type || counts[c.type]).map((c) => (
              <button key={c.id} type="button" aria-pressed={layer === c.id} className={layer === c.id ? 'on' : ''} onClick={() => onLayer(c.id)}>
                {c.type && <span aria-hidden>{TYPE_CONFIG[c.type].em}</span>}{c.label}{c.type && <em>{counts[c.type]}</em>}
              </button>
            ))}
          </div>

          <div className="rs-row" ref={rowRef} onScroll={onRowScroll}>
            {spots.map(({ spot, index, dest }) => {
              const cfg = TYPE_CONFIG[spot.type] || TYPE_CONFIG.producer;
              return (
                <button key={index} type="button" className="rs-card" onClick={() => dest && navigate(dest.to)}>
                  <span className="rs-card-ic" style={{ background: cfg.bg }}>{spot.emoji || cfg.em}</span>
                  <span className="rs-card-type" style={{ color: cfg.bg }}>{cfg.label}</span>
                  <strong>{spot.label}</strong>
                  {dest && <span className="rs-card-go">{KIND_VERB[dest.kind] || 'Open'} <ChevronRight size={12} /></span>}
                </button>
              );
            })}
            {!spots.length && <p className="rs-empty">Nothing in this category yet.</p>}
          </div>

          <div className="rs-body" ref={bodyRef} style={{ overflowY: full ? 'auto' : 'hidden' }}>
            <p className="rs-desc">{data.description}</p>
            <div className="rs-actions">
              <button type="button" className="rs-primary" onClick={() => navigate(`/regions/${regionId}`)}>Explore {data.name} →</button>
              <button type="button" className="rs-secondary" onClick={() => navigate(`/Products?region=${regionId}`)}>Shop</button>
            </div>

            <h3 className="rs-h">Regional specialties</h3>
            <div className="rs-pills">
              {data.featuredProducts.map((p, i) => {
                const to = ingredientLink(p);
                return <button key={i} type="button" disabled={!to} onClick={() => to && navigate(to)}>{p}</button>;
              })}
            </div>

            {(data.producers || []).length > 0 && (
              <>
                <h3 className="rs-h">Top producers</h3>
                {data.producers.slice(0, 3).map((p, i) => (
                  <button key={i} type="button" className="rs-line" onClick={() => navigate('/producers/' + slugify(p.name))}>
                    <span><strong>{p.name}</strong><span>{p.city} · {p.category}</span></span>
                    <span className="rs-rate">{p.rating} <Star size={10} fill="#2E7D32" color="#2E7D32" /></span>
                  </button>
                ))}
                <button type="button" className="rs-more" onClick={() => navigate(`/Producers?region=${regionId}`)}>All {data.name} producers <ChevronRight size={14} /></button>
              </>
            )}

            {(data.experiences || []).length > 0 && (
              <>
                <h3 className="rs-h">Experiences</h3>
                {data.experiences.map((exp, i) => (
                  <button key={i} type="button" className="rs-line rs-exp" onClick={() => navigate(experienceLink(exp.name))}>
                    <span><strong>{exp.name}</strong><span>{exp.type}</span></span>
                    <span className="rs-price">{exp.price}</span>
                  </button>
                ))}
              </>
            )}

            {extra?.tradition && (
              <blockquote className="rs-quote"><span>✦ Food tradition</span>“{extra.tradition}”</blockquote>
            )}
            {extra?.wine && (
              <div className="rs-wine">
                <span>🍷 Wine specialty</span>
                <strong>{extra.wine.name} <em>{extra.wine.doc}</em></strong>
                <p>{extra.wine.note}</p>
              </div>
            )}
          </div>
        </>
      )}
    </aside>
  );
}
