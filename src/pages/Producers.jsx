import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { regionData } from '../components/regionData';
import { Search, MapPin, Star, ChevronDown } from 'lucide-react';
import { getProductImage } from '../components/imageConfig';

const allProducers = Object.entries(regionData).flatMap(([regionId, region]) =>
  region.producers.map((p, i) => ({
    ...p, regionId, regionName: region.name, id: `${regionId}-${i}`,
    producerCount: region.producerCount
  }))
);

const regionOptions = Object.entries(regionData).map(([id, d]) => ({ id, name: d.name }));
const categoryOptions = [...new Set(allProducers.map(p => p.category))].sort();

function ProducerCard({ producer }) {
  const navigate = useNavigate();
  const img = getProductImage(producer.category);
  const initials = producer.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{
      background: '#fff', borderRadius: 16, overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; }}>
      {/* Cover image */}
      <div style={{ height: 160, position: 'relative', overflow: 'hidden' }}>
        <img src={img} alt={producer.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
        {/* Avatar */}
        <div style={{
          position: 'absolute', bottom: -24, left: 20,
          width: 52, height: 52, borderRadius: '50%',
          background: '#2E7D32', border: '3px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: "'DM Sans',sans-serif"
        }}>{initials}</div>
      </div>

      <div style={{ padding: '30px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3, flex: 1, marginRight: 8 }}>
            {producer.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
            <Star size={12} fill="#F59E0B" color="#F59E0B" />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600 }}>{producer.rating.toFixed(1)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
          <MapPin size={11} color="#888" />
          <span style={{ fontSize: 12, color: '#888' }}>{producer.city}</span>
          <span style={{ color: '#ddd', margin: '0 3px' }}>·</span>
          <span style={{
            fontSize: 11, background: '#E8F5E9', color: '#2E7D32',
            borderRadius: 100, padding: '1px 7px', fontWeight: 600
          }}>{producer.regionName}</span>
        </div>

        <p style={{
          fontSize: 13, color: '#666', lineHeight: 1.5, marginBottom: 12,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
        }}>{producer.description}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            background: '#F0F7EE', color: '#2E7D32', borderRadius: 100,
            padding: '3px 10px', fontSize: 11, fontWeight: 600
          }}>{producer.category}</span>
          <button style={{
            background: 'none', border: '1px solid #2E7D32', color: '#2E7D32',
            borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.15s'
          }}
            onClick={() => navigate(`/producers/${producer.id}`)}
            onMouseEnter={e => { e.currentTarget.style.background = '#2E7D32'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#2E7D32'; }}>
             Visit Store →
            </button>
        </div>
      </div>
    </div>
  );
}

export default function Producers() {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filtered = useMemo(() => {
    return allProducers.filter(p => {
      const matchSearch = !search || [p.name, p.city, p.description, p.regionName, p.category]
        .some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchRegion = !regionFilter || p.regionId === regionFilter;
      const matchCat = !categoryFilter || p.category === categoryFilter;
      return matchSearch && matchRegion && matchCat;
    });
  }, [search, regionFilter, categoryFilter]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F0F7EE' }}>
      {/* Hero header */}
      <div style={{
        background: 'linear-gradient(135deg, #1A3A2A 0%, #2E7D32 100%)',
        padding: '48px 32px 40px', color: '#fff'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 700, marginBottom: 10 }}>
            Meet the Producers
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 28 }}>
            Discover the passionate artisans behind Italy's finest food & beverage tradition
          </p>

          {/* Search */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap'
          }}>
            <div style={{
              flex: 1, minWidth: 200, maxWidth: 400, display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 18px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Search size={15} color="rgba(255,255,255,0.7)" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search producers..."
                style={{ border: 'none', background: 'none', outline: 'none', fontSize: 14, color: '#fff', flex: 1, fontFamily: "'DM Sans',sans-serif" }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
                style={{
                  appearance: 'none', padding: '12px 36px 12px 18px',
                  background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100,
                  color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  fontFamily: "'DM Sans',sans-serif"
                }}>
                <option value="" style={{ color: '#1A1A1A' }}>All Regions</option>
                {regionOptions.map(r => (
                  <option key={r.id} value={r.id} style={{ color: '#1A1A1A' }}>{r.name}</option>
                ))}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.7)', pointerEvents: 'none' }} />
            </div>

            <div style={{ position: 'relative' }}>
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                style={{
                  appearance: 'none', padding: '12px 36px 12px 18px',
                  background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100,
                  color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  fontFamily: "'DM Sans',sans-serif"
                }}>
                <option value="" style={{ color: '#1A1A1A' }}>All Categories</option>
                {categoryOptions.map(c => (
                  <option key={c} value={c} style={{ color: '#1A1A1A' }}>{c}</option>
                ))}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.7)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Producers grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 32px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <p style={{ fontSize: 15, color: '#555' }}>
            Showing <strong style={{ color: '#1A1A1A' }}>{filtered.length}</strong> producers
            {regionFilter && <> in <strong style={{ color: '#2E7D32' }}>{regionOptions.find(r => r.id === regionFilter)?.name}</strong></>}
            {categoryFilter && <> — <strong style={{ color: '#2E7D32' }}>{categoryFilter}</strong></>}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 28 }}>No producers found</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {filtered.map((producer, i) => (
              <ProducerCard key={producer.id} producer={producer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}