import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { regionData } from './regionData';
import { recipesData } from './recipesData';
import { X, Sparkles, ArrowRight } from 'lucide-react';

const buildDiscoveries = () => {
  const discoveries = [];
  // Regions
  Object.entries(regionData).forEach(([id, r]) => {
    discoveries.push({ type: 'Region', icon: '🗺️', title: r.name, sub: `${r.producerCount} producers · ${r.featuredProducts[0]}`, href: '/ExploreMap', badge: '📍 Region Discovery', badgeColor: '#2E7D32' });
  });
  // Recipes
  recipesData.forEach(r => {
    discoveries.push({ type: 'Recipe', icon: '🍝', title: r.name, sub: `${r.regionName} · ${r.cookTime}`, href: `/recipes/${r.id}`, badge: '🍝 Recipe of the Moment', badgeColor: '#E65100' });
  });
  // Producers
  Object.values(regionData).forEach(r => {
    r.producers?.forEach(p => {
      discoveries.push({ type: 'Producer', icon: '👨‍🌾', title: p.name, sub: `${p.city} · ${p.category} · ★${p.rating}`, href: '/Producers', badge: '👨‍🌾 Producer Spotlight', badgeColor: '#2E7D32' });
    });
  });
  return discoveries;
};

const discoveries = buildDiscoveries();

export default function DiscoveryFloat() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  const showDiscovery = useCallback(() => {
    const idx = Math.floor(Math.random() * discoveries.length);
    setCurrent(discoveries[idx]);
    setVisible(true);
    setDismissed(false);
  }, []);

  const handleNavigate = () => {
    navigate(current.href);
    setVisible(false);
  };

  const handleNext = () => {
    const idx = Math.floor(Math.random() * discoveries.length);
    setCurrent(discoveries[idx]);
  };

  if (dismissed) return null;

  return (
    <>
      {/* Floating button */}
      {!visible && (
        <button onClick={showDiscovery} style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '13px 20px', background: '#1A1A1A',
          color: '#fff', borderRadius: 100, fontSize: 13, fontWeight: 700,
          border: '1px solid rgba(76,175,80,0.3)', cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          transition: 'all 0.2s ease'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#2E7D32'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(46,125,50,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; }}>
          <Sparkles size={14} color="#4CAF50" />
          ✦ Discover
        </button>
      )}

      {/* Discovery card */}
      {visible && current && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 1001,
          width: 300, background: '#111',
          border: '1px solid rgba(76,175,80,0.2)', borderRadius: 16,
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          overflow: 'hidden', animation: 'fadeSlideIn 0.25s ease'
        }}>
          {/* Header */}
          <div style={{ padding: '12px 16px', background: 'rgba(76,175,80,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: current.badgeColor, letterSpacing: '0.05em' }}>
              {current.badge}
            </span>
            <button onClick={() => { setVisible(false); setDismissed(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 2 }}>
              <X size={13} />
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '16px 18px 14px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {current.icon}
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display',serif", marginBottom: 4, lineHeight: 1.2 }}>{current.title}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{current.sub}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleNavigate} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '9px 14px', background: '#2E7D32', color: '#fff',
                borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none',
                transition: 'background 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#1B5E20'}
                onMouseLeave={e => e.currentTarget.style.background = '#2E7D32'}>
                Explore <ArrowRight size={12} />
              </button>
              <button onClick={handleNext} style={{
                padding: '9px 14px', background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.7)', borderRadius: 8, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}