import { useState, useMemo } from 'react';
import { experiencesData, experienceTypes } from '../components/experiencesData';
import { regionData } from '../components/regionData';
import { Search, Star, ChevronDown, MapPin } from 'lucide-react';

const regionOptions = Object.entries(regionData).map(([id, d]) => ({ id, name: d.name }));

function ExperienceCard({ exp }) {
  const [booked, setBooked] = useState(false);
  return (
    <div style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(193,68,14,0.08)',
      transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
      <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        <img src={exp.image} alt={exp.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <span style={{ background: '#C1440E', color: '#fff', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{exp.type}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', borderRadius: 6, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
          <MapPin size={10} color="rgba(255,255,255,0.8)" />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{exp.region}</span>
        </div>
      </div>
      <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontWeight: 700, fontSize: 15, color: '#1A1A1A', marginBottom: 4, lineHeight: 1.3 }}>{exp.name}</p>
        <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>{exp.producer}</p>
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: 12 }}>
          {exp.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 20, fontWeight: 700, color: '#C1440E' }}>€{exp.price}</span>
            <span style={{ fontSize: 11, color: '#aaa', marginLeft: 4 }}>/ person</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={12} fill="#F59E0B" color="#F59E0B" />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600 }}>{exp.rating.toFixed(1)}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
          {exp.includes.slice(0, 3).map(inc => (
            <span key={inc} style={{ background: '#FBE9E7', color: '#C1440E', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>✓ {inc}</span>
          ))}
        </div>
        <button
          onClick={() => { setBooked(true); setTimeout(() => setBooked(false), 1500); }}
          style={{
            width: '100%', padding: '11px', borderRadius: 8,
            background: booked ? '#A0350B' : '#C1440E', color: '#fff',
            border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => !booked && (e.currentTarget.style.background = '#A0350B')}
          onMouseLeave={e => !booked && (e.currentTarget.style.background = '#C1440E')}>
          {booked ? '✓ Booking Confirmed!' : 'Book Experience →'}
        </button>
      </div>
    </div>
  );
}

export default function Experiences() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('');

  const filtered = useMemo(() => {
    return experiencesData.filter(e => {
      const matchSearch = !search || [e.name, e.producer, e.region, e.type]
        .some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchType = typeFilter === 'All' || e.type === typeFilter;
      const matchRegion = !regionFilter || e.regionId === regionFilter;
      return matchSearch && matchType && matchRegion;
    });
  }, [search, typeFilter, regionFilter]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#FAF6F0' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0A06 0%, #C1440E 100%)',
        padding: '52px 32px 44px'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 44, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
            Food Experiences Across Italy
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', marginBottom: 32, maxWidth: 520 }}>
            Farm visits, wine tastings, truffle hunts, cooking classes — book authentic food tourism directly with Italian producers.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ flex: 1, minWidth: 200, maxWidth: 380, display: 'flex', alignItems: 'center', gap: 10, padding: '11px 18px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)' }}>
              <Search size={14} color="rgba(255,255,255,0.7)" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search experiences..."
                style={{ border: 'none', background: 'none', outline: 'none', fontSize: 13, color: '#fff', flex: 1, fontFamily: "'DM Sans',sans-serif" }} />
            </div>
            {/* Region filter */}
            <div style={{ position: 'relative' }}>
              <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
                style={{ appearance: 'none', padding: '11px 36px 11px 18px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                <option value="" style={{ color: '#1A1A1A' }}>All Regions</option>
                {regionOptions.map(r => <option key={r.id} value={r.id} style={{ color: '#1A1A1A' }}>{r.name}</option>)}
              </select>
              <ChevronDown size={13} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.7)', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Type filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
            {experienceTypes.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} style={{
                padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: typeFilter === t ? '#fff' : 'rgba(255,255,255,0.12)',
                color: typeFilter === t ? '#C1440E' : 'rgba(255,255,255,0.85)',
                border: typeFilter === t ? 'none' : '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.15s'
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 32px 64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <p style={{ fontSize: 15, color: '#555' }}>
            <strong style={{ color: '#1A1A1A' }}>{filtered.length}</strong> experiences available
          </p>
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 28 }}>No experiences found</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map(e => <ExperienceCard key={e.id} exp={e} />)}
          </div>
        )}
      </div>
    </div>
  );
}