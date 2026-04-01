import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Star, ChevronRight, Utensils, Users, Compass } from 'lucide-react';
import { regionData } from './regionData';
const WIKI = {
  toscana: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/85bc38620_riccardo-cervia-1e_ciLqqTV0-unsplash.jpg',
  lombardia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/c47d474d1_stanislav-gulei-32oHXq6phvA-unsplash.jpg',
  sicilia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/8b7808501_sterling-lanier-EYeWIJu5Mc0-unsplash.jpg',
  campania: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/9d60c1054_antonio-sessa-MHhf6RmbQWQ-unsplash.jpg',
  veneto: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/03c802e32_henrique-ferreira-RKsLQoSnuTc-unsplash.jpg',
  piemonte: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/2e605a220_federico-di-dio-photography-9MzTjgxpIYA-unsplash.jpg',
  puglia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/9f4c481b7_sam-ferrara-uNvgvo2cs7k-unsplash.jpg',
  emilia_romagna: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/d96f7e04e_richard-hedrick-ug4-b19KX5o-unsplash.jpg',
  lazio: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/c25962b57_petr-slovacek-SXk8BWKvoXE-unsplash.jpg',
  sardegna: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/7397f32c2_giulia-gasperini-0vHwXA42NzU-unsplash.jpg',
  liguria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/e754515ae_gabriele-romano-kU6ZP3W_M4k-unsplash.jpg',
  calabria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/ca4c2a634_vincenzo-de-simone-ag-2vUYJLpM-unsplash.jpg',
  marche: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/629d0f7c8_bernard-hermant-Bhsj6ai7pUA-unsplash.jpg',
  abruzzo: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/b9af25e26_chris-weiher-M39zQlScA84-unsplash.jpg',
  umbria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/bdc34d534_krzysztof-maksimiuk-4GgBxc3CgeQ-unsplash.jpg',
  trentino_alto_adige: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/7b4fd0fe3_nicola-pavan-5ZvYfLOuSzw-unsplash.jpg',
  friuli_venezia_giulia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/4b23cd7e8_kristof-van-rentergem-lpYWtWpTwbs-unsplash.jpg',
  basilicata: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/26e1be612_katie-kalmykova-JkgYrViv8Q8-unsplash.jpg',
  molise: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/47e0c006a_massimiliano-morosinotto-PlRRMpAWZKU-unsplash.jpg',
  valle_daosta: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/9531fd2b6_antonio-sessa-Mwz1wWm9Xvk-unsplash.jpg',
};

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={9} fill={i <= Math.round(rating) ? '#C76A3A' : 'transparent'} color={i <= Math.round(rating) ? '#C76A3A' : 'rgba(255,255,255,0.2)'} />
      ))}
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginLeft: 3 }}>{rating}</span>
    </div>
  );
}

export default function FloatingRegionPanel({ regionId, onClose }) {
  const data = regionId ? regionData[regionId] : null;
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, bottom: 0, width: 400,
      zIndex: 50, pointerEvents: data ? 'all' : 'none',
      transform: data ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #0A1A0A 0%, #080E08 100%)',
      borderLeft: '1px solid rgba(76,175,80,0.15)',
      boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
      overflowY: 'auto', overflowX: 'hidden',
    }}>
      {data && (
        <>
          {/* Cinematic Hero */}
          <div style={{ position: 'relative', height: 220, flexShrink: 0, overflow: 'hidden' }}>
            <img
              src={(WIKI[regionId] || WIKI.toscana)}
              alt={data.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55) saturate(1.2)' }}
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,26,10,0.95) 0%, transparent 50%)' }} />
            {/* Close */}
            <button onClick={onClose} style={{
              position: 'absolute', top: 14, right: 14,
              width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.8)'
            }}>
              <X size={15} />
            </button>
            {/* Region name */}
            <div style={{ position: 'absolute', bottom: 18, left: 20, right: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <MapPin size={11} color="#4CAF50" />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: '#4CAF50', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Italian Region
                </span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
                {data.name}
              </h2>
              <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'rgba(76,175,80,0.9)', fontWeight: 700 }}>
                  {data.producerCount} Producers
                </span>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>·</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                  {data.experienceCount} Experiences
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 22 }}>
            {/* Description */}
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>
              {data.description}
            </p>

            {/* Featured Specialties */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Utensils size={12} color="#C76A3A" />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                  Regional Specialties
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {data.featuredProducts.map((p, i) => (
                  <span key={i} style={{
                    padding: '5px 12px', borderRadius: 100,
                    background: i === 0 ? 'rgba(199,106,58,0.12)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${i === 0 ? 'rgba(199,106,58,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    fontSize: 11, fontWeight: 600,
                    color: i === 0 ? '#C76A3A' : 'rgba(255,255,255,0.55)'
                  }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Producers */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Users size={12} color="#4CAF50" />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                  Featured Producers
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(data.producers || []).slice(0, 3).map((p, i) => (
                  <div key={i} style={{
                    padding: '12px 14px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'all 0.15s ease', cursor: 'pointer'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(76,175,80,0.07)'; e.currentTarget.style.borderColor = 'rgba(76,175,80,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{p.name}</p>
                        <p style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: 'rgba(76,175,80,0.7)' }}>
                          {p.city} · {p.category}
                        </p>
                      </div>
                      <StarRating rating={p.rating} />
                    </div>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{p.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiences */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Compass size={12} color="#C76A3A" />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                  Experiences
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(data.experiences || []).map((exp, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '11px 14px', borderRadius: 10,
                    background: 'rgba(199,106,58,0.06)', border: '1px solid rgba(199,106,58,0.15)',
                    cursor: 'pointer', transition: 'all 0.15s ease'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(199,106,58,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(199,106,58,0.06)'; }}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#F6F1E7', marginBottom: 2 }}>{exp.name}</p>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{exp.type}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 13, fontWeight: 800, color: '#C76A3A' }}>{exp.price}</p>
                      <ChevronRight size={12} color="rgba(199,106,58,0.5)" style={{ marginLeft: 'auto' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore Region Button */}
            <button
              onClick={() => navigate(`/regions/${regionId}`)}
              style={{
                width: '100%', padding: '13px', background: '#2E7D32', color: '#fff',
                border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
                cursor: 'pointer', transition: 'background 0.15s', fontFamily: "'DM Sans',sans-serif"
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1B5E20'}
              onMouseLeave={e => e.currentTarget.style.background = '#2E7D32'}
            >
              Explore Region →
            </button>

            {/* Knowledge connections */}
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(76,175,80,0.05)', border: '1px solid rgba(76,175,80,0.1)', marginBottom: 8 }}>
              <p style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: 'rgba(76,175,80,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>
                Food Connections
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {data.featuredProducts.slice(0, 2).map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{p}</span>
                    {i < data.featuredProducts.length - 2 && (
                      <ChevronRight size={10} color="rgba(76,175,80,0.4)" />
                    )}
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C76A3A', display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{data.name}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}