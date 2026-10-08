import { useState } from 'react';
import { Link } from 'react-router-dom';
import { regionData } from '../components/regionData';
import { Heart, MapPin, ChevronRight } from 'lucide-react';
import { isSaved, toggleSave } from '../components/tasteMapStore';

const WIKI = {
  toscana: '/img/b44/7e69b3d03.webp',
  lombardia: '/img/b44/5caaf3d0f.webp',
  sicilia: '/img/b44/48f5ee453.webp',
  campania: '/img/b44/acd73822c.webp',
  veneto: '/img/b44/e687e5690.webp',
  piemonte: '/img/b44/fc338e179.webp',
  puglia: '/img/b44/45aa42495.webp',
  emilia_romagna: '/img/b44/a27d2b16a.webp',
  lazio: '/img/b44/d3871d123.webp',
  sardegna: '/img/b44/4f83999be.webp',
  liguria: '/img/b44/362518852.webp',
  calabria: '/img/b44/ebbd6ed12.webp',
  marche: '/img/b44/bf764a187.webp',
  abruzzo: '/img/b44/f32d70314.webp',
  umbria: '/img/b44/1db533ce9.webp',
  trentino_alto_adige: '/img/b44/27a95cfc3.webp',
  friuli_venezia_giulia: '/img/b44/3b48fadc7.webp',
  basilicata: '/img/b44/7c56426f4.webp',
  molise: '/img/b44/94c651f0b.webp',
  valle_daosta: '/img/b44/d0c62424d.webp',
};


function RegionCard({ regionId, data }) {
  const [s, setS] = useState(isSaved('regions', regionId));
  return (
    <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
      <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
        <img src={(WIKI[regionId] || WIKI.toscana)} alt={data.name}
          loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.78) saturate(1.1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>{data.name}</p>
        </div>
        <button
          onClick={e => { e.stopPropagation(); e.preventDefault(); const ns = toggleSave('regions', { id: regionId, name: data.name }); setS(ns); }}
          style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
          <Heart size={14} color={s ? '#D32F2F' : '#fff'} fill={s ? '#D32F2F' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          {data.featuredProducts.slice(0, 3).map((p, i) => (
            <span key={i} style={{ padding: '3px 9px', borderRadius: 100, background: '#F0F7EE', color: '#2E7D32', fontSize: 10, fontWeight: 700 }}>{p.split(' ').slice(0, 2).join(' ')}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: '#888' }}>{data.producerCount} Producers</span>
          <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: '#888' }}>{data.experienceCount} Experiences</span>
        </div>
        <Link to={`/regions/${regionId}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '9px', background: '#2E7D32', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700, transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#1B5E20'}
          onMouseLeave={e => e.currentTarget.style.background = '#2E7D32'}>
          Explore Region <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export default function Regions() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F0F7EE' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', padding: '52px 24px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
            <MapPin size={13} color="rgba(255,255,255,0.6)" />
            <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Italian Regions</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>
            Explore Italy <span style={{ color: '#A5D6A7', fontStyle: 'italic' }}>Region by Region</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            Twenty distinct gastronomic worlds — each with its own producers, specialties, recipes, and food traditions.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '40px 20px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 22 }}>
          {Object.entries(regionData).map(([id, data]) => (
            <RegionCard key={id} regionId={id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}