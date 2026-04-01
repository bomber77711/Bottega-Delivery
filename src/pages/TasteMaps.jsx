import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart } from 'lucide-react';
import { publicTasteMaps } from '../components/creatorsData';

const tagColors = ['#E8F5E9', '#FBE9E7', '#FFF3E0', '#E3F2FD', '#F3E5F5', '#F0F7EE'];
const tagTextColors = ['#2E7D32', '#C76A3A', '#E65100', '#1565C0', '#8E24AA', '#2E7D32'];

export default function TasteMaps() {
  const [q, setQ] = useState('');
  const filtered = publicTasteMaps.filter(m =>
    !q || m.title.toLowerCase().includes(q.toLowerCase()) || m.author.toLowerCase().includes(q.toLowerCase()) || m.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F6F1E7' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', padding: '52px 24px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16, fontFamily: "'DM Mono',monospace" }}>Community Collections</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>
            Discover <span style={{ color: '#A5D6A7', fontStyle: 'italic' }}>Taste Maps</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 28 }}>
            Curated collections of Italian producers, recipes, and experiences — built by food lovers and chefs.
          </p>
          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto' }}>
            <Search size={14} color="#999" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search taste maps…"
              style={{ width: '100%', padding: '13px 16px 13px 40px', borderRadius: 100, border: 'none', fontSize: 14, outline: 'none', fontFamily: "'DM Sans',sans-serif", boxSizing: 'border-box' }} />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px 60px' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ fontSize: 16, color: '#888' }}>No taste maps match your search.</p>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
          {filtered.map((m, i) => (
            <Link key={i} to={`/taste-map/${m.username}`} style={{ textDecoration: 'none', background: '#fff', borderRadius: 18, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #F0F7EE', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
              {/* Map preview visual */}
              <div style={{ height: 100, background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)', borderRadius: 12, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: 36 }}>🗺️</div>
                <div style={{ position: 'absolute', bottom: 8, right: 12, fontFamily: "'DM Mono',monospace", fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
                  {m.items} items · {m.regions} regions
                </div>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, lineHeight: 1.25 }}>{m.title}</h3>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#2E7D32', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, fontWeight: 700, color: '#fff' }}>{m.author.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                </div>
                {m.author}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {m.tags.map((t, ti) => (
                  <span key={ti} style={{ padding: '4px 11px', borderRadius: 100, background: tagColors[ti % tagColors.length], color: tagTextColors[ti % tagTextColors.length], fontSize: 11, fontWeight: 700 }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: '#888' }}>{m.items} items</span>
                  <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: '#888' }}>{m.regions} regions</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#2E7D32' }}>Explore →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🗺️</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Build Your Own Taste Map</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.6 }}>
            Save producers, recipes, and experiences you love. Share your Italian food journey.
          </p>
          <Link to="/TasteMap" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: '#fff', color: '#2E7D32', borderRadius: 100, textDecoration: 'none', fontSize: 14, fontWeight: 800, transition: 'all 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F0F7EE'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
            <Heart size={14} /> Start My Taste Map
          </Link>
        </div>
      </div>
    </div>
  );
}