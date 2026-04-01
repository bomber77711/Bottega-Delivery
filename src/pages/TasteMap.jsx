import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSaved, removeSave } from '../components/tasteMapStore';
import { publicTasteMaps } from '../components/creatorsData';
import { Heart, MapPin, Trash2, Share2 } from 'lucide-react';

const typeConfig = {
  producers: { label: 'Saved Producers', icon: '👨‍🌾', color: '#2E7D32', bg: '#E8F5E9', linkPrefix: '/producers/' },
  products: { label: 'Saved Products', icon: '🛒', color: '#2E7D32', bg: '#E8F5E9', linkPrefix: '/Products' },
  experiences: { label: 'Saved Experiences', icon: '🗺️', color: '#C1440E', bg: '#FBE9E7', linkPrefix: '/Experiences' },
  recipes: { label: 'Saved Recipes', icon: '🍝', color: '#E65100', bg: '#FFF3E0', linkPrefix: '/recipes/' },
  regions: { label: 'Saved Regions', icon: '📍', color: '#1565C0', bg: '#E3F2FD', linkPrefix: '/ExploreMap' },
};

function SavedItem({ type, item, onRemove }) {
  const cfg = typeConfig[type];
  const hasDetailLink = type === 'recipes' || type === 'producers';
  const link = hasDetailLink ? `${cfg.linkPrefix}${item.id}` : cfg.linkPrefix;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
      borderBottom: '1px solid #f0f0f0'
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
        {cfg.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: 13, color: '#1A1A1A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
        {item.region && <p style={{ fontSize: 11, color: '#888', display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={9} />{item.region}</p>}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link to={link} style={{ fontSize: 11, color: cfg.color, fontWeight: 600, textDecoration: 'none' }}>View →</Link>
        <button onClick={() => onRemove(type, item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', padding: 4, transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#D32F2F'}
          onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

function PublicMapCard({ map }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.09)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 }}>{map.title}</h3>
      </div>
      <p style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>By {map.author}</p>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
        {map.tags.map(tag => (
          <span key={tag} style={{ background: '#E8F5E9', color: '#2E7D32', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{tag}</span>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: '#888' }}>{map.items} items · {map.regions} regions</span>
        <button style={{ fontSize: 11, color: '#2E7D32', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Explore Map →</button>
      </div>
    </div>
  );
}

export default function TasteMap() {
  const [saved, setSaved] = useState(getSaved());
  const [activeTab, setActiveTab] = useState('all');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = () => setSaved(getSaved());
    window.addEventListener('tasteMapUpdate', handler);
    return () => window.removeEventListener('tasteMapUpdate', handler);
  }, []);

  const totalCount = Object.values(saved).reduce((s, arr) => s + arr.length, 0);
  const regionCount = Object.values(saved).reduce((set, arr) => {
    arr.forEach(item => item.region && set.add(item.region));
    return set;
  }, new Set()).size;

  const handleRemove = (type, id) => {
    removeSave(type, id);
    setSaved(getSaved());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'all', label: 'All', count: totalCount },
    ...Object.entries(typeConfig).map(([key, cfg]) => ({
      id: key, label: cfg.icon + ' ' + key.charAt(0).toUpperCase() + key.slice(1), count: saved[key]?.length || 0
    }))
  ];

  const displayItems = activeTab === 'all'
    ? Object.entries(saved).flatMap(([type, items]) => items.map(item => ({ type, item })))
    : (saved[activeTab] || []).map(item => ({ type: activeTab, item }));

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#FAF6F0' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #4CAF50 100%)', padding: '48px 32px 36px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: 8 }}>MY TASTE MAP</span>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                {totalCount === 0 ? 'Start Your Collection' : 'Your Taste Map'}
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
                {totalCount === 0 ? 'Save producers, products, recipes and experiences to build your personal Italian food map.' : `${totalCount} discoveries across ${regionCount} regions of Italy`}
              </p>
            </div>
            {totalCount > 0 && (
              <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                <Share2 size={15} /> {copied ? 'Copied! ✓' : 'Share Taste Map'}
              </button>
            )}
          </div>

          {/* Stats */}
          {totalCount > 0 && (
            <div style={{ display: 'flex', gap: 20, marginTop: 28, flexWrap: 'wrap' }}>
              {Object.entries(typeConfig).map(([key, cfg]) => (
                saved[key]?.length > 0 && (
                  <div key={key} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{cfg.icon}</span>
                    <div>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{saved[key].length}</p>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{key}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 32px 64px' }}>
        {totalCount === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0 40px' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🗺️</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: '#1A1A1A', marginBottom: 12 }}>Your Taste Map is Empty</h2>
            <p style={{ fontSize: 15, color: '#888', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>Start exploring Italy and save the producers, products, recipes and experiences that speak to you.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/ExploreMap" style={{ padding: '12px 24px', background: '#2E7D32', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>Explore the Map</Link>
              <Link to="/Recipes" style={{ padding: '12px 24px', background: '#fff', color: '#E65100', border: '1.5px solid #E65100', borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>Browse Recipes</Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32 }}>
            {/* Saved items list */}
            <div>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
                {tabs.map(tab => tab.count > 0 || tab.id === 'all' ? (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                    padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    background: activeTab === tab.id ? '#1A1A1A' : '#fff',
                    color: activeTab === tab.id ? '#fff' : '#555',
                    border: activeTab === tab.id ? 'none' : '1px solid #ddd',
                    transition: 'all 0.15s'
                  }}>
                    {tab.label} {tab.count > 0 && <span style={{ opacity: 0.7 }}>({tab.count})</span>}
                  </button>
                ) : null)}
              </div>

              <div style={{ background: '#fff', borderRadius: 16, padding: '8px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                {displayItems.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#aaa', padding: '32px 0' }}>Nothing saved in this category yet.</p>
                ) : (
                  displayItems.map(({ type, item }, i) => (
                    <SavedItem key={`${type}-${item.id}-${i}`} type={type} item={item} onRemove={handleRemove} />
                  ))
                )}
              </div>
            </div>

            {/* Discover community maps sidebar */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>Community Maps</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {publicTasteMaps.slice(0, 3).map(map => <PublicMapCard key={map.username} map={map} />)}
              </div>
              <Link to="/Discover" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: 12, color: '#2E7D32', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                Explore All Maps →
              </Link>
            </div>
          </div>
        )}

        {/* Community maps section (when empty) */}
        {totalCount === 0 && (
          <div style={{ marginTop: 60 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Community Taste Maps</h2>
            <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>Discover how others are exploring Italian gastronomy</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {publicTasteMaps.map(map => <PublicMapCard key={map.username} map={map} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}