import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ItalyMap from '../components/ItalyMap';
import FloatingRegionPanel from '../components/FloatingRegionPanel';
import { regionData } from '../components/regionData';
import { recipesData } from '../components/recipesData';
import { Sparkles, X, MapPin, ChevronRight, ArrowRight } from 'lucide-react';

const aiSuggestions = [
  'best cheese regions', 'truffle producers', 'wine Tuscany', 'pasta Emilia-Romagna',
  'seafood Sicily', 'olive oil DOP', 'Parmigiano Reggiano', 'buffalo mozzarella'
];

const discoveryCards = [
  { icon: '🍝', title: 'Dish of the Day', name: 'Cacio e Pepe', region: 'lazio' },
  { icon: '🧀', title: 'Regional Ingredient', name: 'Parmigiano Reggiano', region: 'emilia_romagna' },
  { icon: '👨‍🌾', title: 'Producer Spotlight', name: 'Acetaia Malpighi', region: 'emilia_romagna' },
  { icon: '🍷', title: 'Wine Discovery', name: 'Barolo DOCG', region: 'piemonte' },
  { icon: '🫒', title: 'Artisan Product', name: 'Riviera Ligure DOP', region: 'liguria' },
];

function AIBar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  const handleInput = (val) => {
    setQuery(val);
    if (!val) { setResults([]); return; }
    const q = val.toLowerCase();
    const regionMatches = Object.entries(regionData)
      .filter(([, r]) => r.name.toLowerCase().includes(q) || r.featuredProducts.some(p => p.toLowerCase().includes(q)))
      .slice(0, 3).map(([id, r]) => ({ type: 'Region', icon: '🗺️', label: r.name, sub: r.featuredProducts.slice(0, 2).join(' · '), id }));
    const producerMatches = Object.values(regionData)
      .flatMap(r => (r.producers || []))
      .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 2).map(p => ({ type: 'Producer', icon: '👨‍🌾', label: p.name, sub: `${p.city} · ${p.category}` }));
    setResults([...regionMatches, ...producerMatches]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 9, padding: '10px 18px',
        borderRadius: 100, background: 'rgba(6,13,6,0.85)', backdropFilter: 'blur(16px)',
        border: `1px solid ${focused ? 'rgba(76,175,80,0.5)' : 'rgba(76,175,80,0.2)'}`,
        boxShadow: focused ? '0 0 0 3px rgba(76,175,80,0.1), 0 8px 32px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'all 0.2s ease', width: 380
      }}>
        <Sparkles size={13} color="#4CAF50" />
        <input
          ref={inputRef}
          value={query}
          onChange={e => handleInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Ask Bottega about Italian food…"
          style={{ border: 'none', background: 'none', outline: 'none', fontSize: 13, color: '#fff', flex: 1, fontFamily: "'DM Sans',sans-serif" }}
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', padding: 0 }}>
            <X size={12} />
          </button>
        )}
      </div>
      {focused && (results.length > 0 || !query) && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8,
          background: 'rgba(8,16,8,0.97)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(76,175,80,0.2)', borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)', zIndex: 200, overflow: 'hidden'
        }}>
          {!query && (
            <>
              <div style={{ padding: '10px 16px 4px', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Try asking</div>
              {aiSuggestions.slice(0, 5).map((s, i) => (
                <button key={i} onClick={() => { handleInput(s); inputRef.current?.focus(); }} style={{
                  width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none',
                  cursor: 'pointer', fontSize: 13, color: 'rgba(255,255,255,0.55)', transition: 'all 0.1s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(76,175,80,0.08)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}>
                  {s}
                </button>
              ))}
            </>
          )}
          {results.map((r, i) => (
            <button key={i} onClick={() => { onSelect && onSelect(r); setQuery(''); setResults([]); }} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.1s'
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(76,175,80,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              <span style={{ fontSize: 15 }}>{r.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 1 }}>{r.label}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{r.sub}</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#4CAF50', background: 'rgba(76,175,80,0.1)', borderRadius: 100, padding: '2px 8px' }}>{r.type}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExploreMap() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [cardIdx, setCardIdx] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const r = params.get('region');
    if (r && regionData[r]) setSelectedRegion(r);
  }, [location.search]);

  // Cycle discovery card
  useEffect(() => {
    const t = setInterval(() => setCardIdx(i => (i + 1) % discoveryCards.length), 4000);
    return () => clearInterval(t);
  }, []);

  const activeHoverData = hoveredRegion ? regionData[hoveredRegion] : null;
  const card = discoveryCards[cardIdx];

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#060D06' }}>

      {/* ── FULL-SCREEN MAP ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          backgroundImage: 'linear-gradient(rgba(76,175,80,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,80,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        {/* edge vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: 'radial-gradient(ellipse 80% 80% at 40% 50%, transparent 35%, rgba(6,13,6,0.5) 75%, rgba(6,13,6,0.82) 100%)'
        }} />
        <ItalyMap
          selectedRegion={selectedRegion}
          onRegionSelect={setSelectedRegion}
          onRegionHover={setHoveredRegion}
        />
      </div>

      {/* ── TOP: ENGINE + AI SEARCH ── */}
      <div style={{
        position: 'absolute', top: 16, left: 0, right: 0, zIndex: 40,
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, padding: '0 24px'
      }}>
        {/* Engine badge — left */}
        <div style={{
          position: 'absolute', left: 24, display: 'flex', alignItems: 'center', gap: 6
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50', boxShadow: '0 0 8px rgba(76,175,80,0.9)', display: 'inline-block' }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(76,175,80,0.55)', textTransform: 'uppercase' }}>
            Bottega · 20 Regions
          </span>
        </div>

        {/* Center: AI search */}
        <AIBar onSelect={(r) => {
          if (r.type === 'Region' && r.id) setSelectedRegion(r.id);
          else if (r.type === 'Producer') navigate('/Producers');
        }} />

        {/* Right: stats */}
        <div style={{
          position: 'absolute', right: 24, display: 'flex', gap: 16
        }}>
          {[['450+', 'Producers'], ['120+', 'Recipes'], ['80+', 'Experiences']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700, color: '#4CAF50', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM-LEFT: Discovery card ── */}
      <div style={{ position: 'absolute', bottom: 28, left: 24, zIndex: 30 }}>
        <div style={{
          background: 'rgba(6,13,6,0.88)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(76,175,80,0.2)', borderRadius: 16,
          padding: '14px 16px', width: 220,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          cursor: 'pointer', transition: 'border-color 0.2s'
        }}
          onClick={() => setSelectedRegion(card.region)}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(76,175,80,0.45)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(76,175,80,0.2)'}>
          <p style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", fontWeight: 700, color: 'rgba(76,175,80,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
            ✦ {card.title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>{card.icon}</span>
            <div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{card.name}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono',monospace" }}>
                {regionData[card.region]?.name}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10, fontSize: 10, color: 'rgba(76,175,80,0.6)', fontWeight: 600 }}>
            Explore region <ArrowRight size={10} />
          </div>
        </div>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 4, marginTop: 8, justifyContent: 'center' }}>
          {discoveryCards.map((_, i) => (
            <span key={i} onClick={() => setCardIdx(i)} style={{
              width: i === cardIdx ? 16 : 5, height: 4, borderRadius: 2,
              background: i === cardIdx ? '#4CAF50' : 'rgba(255,255,255,0.15)',
              cursor: 'pointer', transition: 'all 0.25s ease'
            }} />
          ))}
        </div>
      </div>

      {/* ── BOTTOM-CENTER: Hover region tooltip ── */}
      {activeHoverData && !selectedRegion && (
        <div style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          zIndex: 30, background: 'rgba(6,13,6,0.92)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(76,175,80,0.3)', borderRadius: 14,
          padding: '12px 18px', minWidth: 260, pointerEvents: 'none',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)', animation: 'fadeSlideIn 0.15s ease'
        }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{activeHoverData.name}</p>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#4CAF50', marginBottom: 6 }}>
            {activeHoverData.producerCount} Producers · {activeHoverData.experienceCount} Experiences
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
            {activeHoverData.featuredProducts.slice(0, 3).join(' · ')}
          </p>
          <p style={{ fontSize: 10, color: 'rgba(76,175,80,0.65)', marginTop: 6, fontWeight: 600 }}>Click to explore →</p>
        </div>
      )}

      {/* ── HINT when nothing selected ── */}
      {!activeHoverData && !selectedRegion && (
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Hover a region to discover · Click to explore
          </p>
        </div>
      )}

      {/* ── SELECTED region chip ── */}
      {selectedRegion && (
        <div style={{
          position: 'absolute', top: 68, left: '50%', transform: 'translateX(-50%)', zIndex: 30,
          display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100,
          background: 'rgba(46,125,50,0.15)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(76,175,80,0.35)', animation: 'fadeSlideIn 0.2s ease'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 700, color: '#fff' }}>
            {regionData[selectedRegion]?.name}
          </span>
          <button onClick={() => setSelectedRegion(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', padding: 0, marginLeft: 2 }}>
            <X size={12} />
          </button>
        </div>
      )}

      {/* ── FLOATING REGION PANEL (slides in from right) ── */}
      <FloatingRegionPanel regionId={selectedRegion} onClose={() => setSelectedRegion(null)} />
    </div>
  );
}