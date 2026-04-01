import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Heart, Star, MapPin, ChevronRight } from 'lucide-react';
import { regionData } from '../components/regionData';
import { recipesData } from '../components/recipesData';
import { isSaved, toggleSave } from '../components/tasteMapStore';
import FoodConnections from '../components/FoodConnections';
import GastronomyNetwork from '../components/GastronomyNetwork';
const WIKI = {
  toscana: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/7e69b3d03_generated_image.png',
  lombardia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/5caaf3d0f_generated_image.png',
  sicilia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/48f5ee453_generated_image.png',
  campania: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/acd73822c_generated_image.png',
  veneto: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/e687e5690_generated_image.png',
  piemonte: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/fc338e179_generated_image.png',
  puglia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/45aa42495_generated_image.png',
  emilia_romagna: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/a27d2b16a_generated_image.png',
  lazio: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/d3871d123_generated_image.png',
  sardegna: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/4f83999be_generated_image.png',
  liguria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/362518852_generated_image.png',
  calabria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/ebbd6ed12_generated_image.png',
  marche: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/bf764a187_generated_image.png',
  abruzzo: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/f32d70314_generated_image.png',
  umbria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/1db533ce9_generated_image.png',
  trentino_alto_adige: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/27a95cfc3_generated_image.png',
  friuli_venezia_giulia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/3b48fadc7_generated_image.png',
  basilicata: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/7c56426f4_generated_image.png',
  molise: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/94c651f0b_generated_image.png',
  valle_daosta: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/d0c62424d_generated_image.png',
};

export default function RegionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const region = regionData[id];
  const [saved, setSaved] = useState(isSaved('regions', id));

  if (!region) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F0F7EE', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: '#1A1A1A' }}>Region not found</p>
        <Link to="/regions" style={{ color: '#2E7D32', fontWeight: 600, textDecoration: 'none' }}>← All Regions</Link>
      </div>
    );
  }

  const featuredRecipe = region.featuredRecipe ? recipesData.find(r => r.id === region.featuredRecipe.id) : null;

  const fcNodes = [
    { id, type: 'region', label: region.name },
    ...(region.producers || []).slice(0, 2).map(p => ({ id: p.id, type: 'producer', label: p.name, path: `/producers/${p.id}` })),
    ...(featuredRecipe ? [{ id: featuredRecipe.id, type: 'recipe', label: featuredRecipe.name, path: `/recipes/${featuredRecipe.id}` }] : []),
    ...(region.experiences || []).slice(0, 1).map(e => ({ id: e.id, type: 'experience', label: e.name })),
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F6F1E7' }}>
      {/* Hero */}
      <div style={{ height: 420, position: 'relative', overflow: 'hidden' }}>
        <img src={(WIKI[id] || WIKI.toscana)} alt={region.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65) saturate(1.15)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', top: 20, left: 28 }}>
          <Link to="/regions" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', padding: '7px 14px', borderRadius: 100, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
            <ArrowLeft size={13} /> Regions
          </Link>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <MapPin size={11} color="#4CAF50" />
            <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Italian Region</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.08, marginBottom: 12 }}>{region.name}</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 600, marginBottom: 16 }}>{region.description}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(76,175,80,0.2)', border: '1px solid rgba(76,175,80,0.4)', color: '#fff', borderRadius: 100, padding: '5px 14px', fontSize: 12, fontFamily: "'DM Mono',monospace", fontWeight: 700 }}>{region.producerCount} Producers</span>
            <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', borderRadius: 100, padding: '5px 14px', fontSize: 12, fontFamily: "'DM Mono',monospace" }}>{region.experienceCount} Experiences</span>
            <button
              onClick={() => { const ns = toggleSave('regions', { id, name: region.name }); setSaved(ns); }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: saved ? 'rgba(211,47,47,0.8)' : 'rgba(255,255,255,0.12)', border: `1.5px solid ${saved ? '#D32F2F' : 'rgba(255,255,255,0.3)'}`, color: '#fff', borderRadius: 100, padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
              <Heart size={11} fill={saved ? '#fff' : 'none'} /> {saved ? 'Saved ✓' : 'Save to Taste Map'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 20px 72px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: '#888' }}>
          <Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/regions" style={{ color: '#888', textDecoration: 'none' }}>Regions</Link>
          <span>/</span>
          <span style={{ color: '#2E7D32', fontWeight: 600 }}>{region.name}</span>
        </div>

        {/* Regional Specialties */}
        <section style={{ background: '#fff', borderRadius: 16, padding: '28px 30px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#C76A3A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'DM Mono',monospace" }}>Regional Specialties</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 18 }}>Iconic Products of {region.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {region.featuredProducts.map((p, i) => (
              <span key={i} style={{ padding: '9px 18px', borderRadius: 100, background: i === 0 ? '#FBE9E7' : '#F0F7EE', color: i === 0 ? '#C76A3A' : '#2E7D32', fontSize: 13, fontWeight: 700, border: `1px solid ${i === 0 ? '#f5c4b4' : '#E8F5E9'}`, cursor: 'pointer', transition: 'all 0.15s' }}>{p}</span>
            ))}
          </div>
        </section>

        {/* Top Producers */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: '#1A1A1A' }}>Top Producers</h2>
            <Link to={`/Producers`} style={{ fontSize: 13, color: '#2E7D32', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ChevronRight size={13} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {(region.producers || []).map((p, i) => (
              <Link key={i} to={`/producers/${p.id}`} style={{ textDecoration: 'none', background: '#fff', borderRadius: 14, padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #F0F7EE', transition: 'all 0.15s', display: 'flex', gap: 14, alignItems: 'flex-start' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F9FBF9'; e.currentTarget.style.borderColor = '#E8F5E9'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#F0F7EE'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, fontWeight: 700, color: '#fff' }}>{p.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{p.name}</p>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#2E7D32', fontWeight: 700 }}>{p.rating} <Star size={9} fill="#2E7D32" color="#2E7D32" /></span>
                  </div>
                  <p style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{p.city} · {p.category}</p>
                  <p style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>{p.description}</p>
                  <p style={{ fontSize: 11, color: '#2E7D32', fontWeight: 600, marginTop: 6 }}>Visit Store →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Experiences */}
        {(region.experiences || []).length > 0 && (
          <section>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 18 }}>Food Experiences</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {(region.experiences || []).map((exp, i) => (
                <div key={i} style={{ background: '#FBE9E7', borderRadius: 14, padding: '20px', border: '1px solid #f5c4b4' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#C76A3A', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'DM Mono',monospace" }}>{exp.type}</span>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginTop: 8, marginBottom: 6 }}>{exp.name}</p>
                  <p style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>by {exp.producer}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 16, fontWeight: 800, color: '#C76A3A' }}>{exp.price}</span>
                    <button style={{ padding: '8px 16px', background: '#C76A3A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#A0522D'}
                      onMouseLeave={e => e.currentTarget.style.background = '#C76A3A'}>
                      Book →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Recipe */}
        {featuredRecipe && (
          <section style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '4px 30px 0', paddingTop: 24 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#E65100', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'DM Mono',monospace" }}>Featured Recipe</span>
            </div>
            <div style={{ display: 'flex', gap: 0 }}>
              <img src={featuredRecipe.image} alt={featuredRecipe.name} style={{ width: 220, height: 160, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ padding: '20px 28px', flex: 1 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>{featuredRecipe.name}</h3>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 14 }}>{featuredRecipe.description}</p>
                <Link to={`/recipes/${featuredRecipe.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '9px 18px', background: '#E65100', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700, transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#bf360c'}
                  onMouseLeave={e => e.currentTarget.style.background = '#E65100'}>
                  View Recipe →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Food Connections */}
        <FoodConnections nodes={fcNodes} title={`${region.name} Food Map`} />

        {/* Gastronomy Network */}
        <GastronomyNetwork entityType="regions" entityId={id} />

        {/* Back */}
        <Link to="/regions" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#2E7D32', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
          <ArrowLeft size={14} /> Back to Regions
        </Link>
      </div>
    </div>
  );
}