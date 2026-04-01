import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Users, Heart, ExternalLink } from 'lucide-react';
import { creatorsData } from '../components/creatorsData';
import { recipesData } from '../components/recipesData';
import { regionData } from '../components/regionData';

const tabs = ['Recipes', 'Favorite Producers', 'Taste Map'];

export default function CreatorProfile() {
  const { id } = useParams();
  const creator = creatorsData.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState('Recipes');
  const [following, setFollowing] = useState(false);

  if (!creator) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F0F7EE', gap: 16 }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: '#1A1A1A' }}>Creator not found</p>
        <Link to="/Discover" style={{ color: '#2E7D32', fontWeight: 600, textDecoration: 'none' }}>← Back to Discover</Link>
      </div>
    );
  }

  const creatorRecipes = recipesData.filter(r => creator.recipes?.includes(r.id));
  const favoriteProducers = Object.values(regionData).flatMap(r => r.producers || []).filter(p => creator.favoriteProducers?.includes(p.id));
  const initials = creator.name.split(' ').map(n => n[0]).slice(0, 2).join('');

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F0F7EE' }}>
      {/* Banner */}
      <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
        <img src={creator.banner} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) saturate(1.1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
        <div style={{ position: 'absolute', top: 18, left: 24 }}>
          <Link to="/Discover" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', border: 'none', padding: '7px 14px', borderRadius: 100, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
            <ArrowLeft size={13} /> Discover
          </Link>
        </div>
      </div>

      {/* Profile header */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#fff', borderRadius: '0 0 20px 20px', padding: '0 30px 28px', marginBottom: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', position: 'relative' }}>
          {/* Avatar */}
          <div style={{ position: 'absolute', top: -44, left: 30, width: 88, height: 88, borderRadius: '50%', background: '#2E7D32', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 28, fontWeight: 700, color: '#fff' }}>{initials}</span>
          </div>
          <div style={{ paddingTop: 52, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: '#1A1A1A', marginBottom: 4 }}>{creator.name}</h1>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{creator.title}</p>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, maxWidth: 480, marginBottom: 10 }}>{creator.bio}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Users size={13} color="#2E7D32" />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 700, color: '#2E7D32' }}>{creator.followers.toLocaleString()}</span>
                <span style={{ fontSize: 12, color: '#888' }}>followers</span>
              </div>
            </div>
            <button
              onClick={() => setFollowing(f => !f)}
              style={{ padding: '10px 22px', background: following ? '#2E7D32' : '#fff', color: following ? '#fff' : '#2E7D32', border: '1.5px solid #2E7D32', borderRadius: 100, cursor: 'pointer', fontSize: 14, fontWeight: 700, transition: 'all 0.2s' }}>
              {following ? '✓ Following' : '+ Follow'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#fff', borderRadius: 12, padding: 5, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: 'fit-content' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ padding: '9px 20px', borderRadius: 9, background: activeTab === t ? '#2E7D32' : 'transparent', color: activeTab === t ? '#fff' : '#666', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, transition: 'all 0.2s' }}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab: Recipes */}
        {activeTab === 'Recipes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18, paddingBottom: 40 }}>
            {creatorRecipes.length === 0 && <p style={{ fontSize: 14, color: '#888' }}>No recipes yet.</p>}
            {creatorRecipes.map((r, i) => (
              <Link key={i} to={`/recipes/${r.id}`} style={{ textDecoration: 'none', background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)'; }}>
                <img src={r.image} alt={r.name} loading="lazy" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                <div style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#E65100', textTransform: 'uppercase', letterSpacing: '0.08em', background: '#FFF3E0', borderRadius: 100, padding: '3px 9px', fontFamily: "'DM Mono',monospace" }}>{r.category}</span>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: '#1A1A1A', margin: '8px 0 4px' }}>{r.name}</h3>
                  <p style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>{r.regionName} · {r.cookTime}</p>
                  <p style={{ fontSize: 12, color: '#E65100', fontWeight: 700 }}>View Recipe →</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Tab: Favorite Producers */}
        {activeTab === 'Favorite Producers' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, paddingBottom: 40 }}>
            {favoriteProducers.length === 0 && <p style={{ fontSize: 14, color: '#888' }}>No favorite producers listed.</p>}
            {favoriteProducers.map((p, i) => (
              <Link key={i} to={`/producers/${p.id}`} style={{ textDecoration: 'none', background: '#fff', borderRadius: 14, padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #F0F7EE', transition: 'all 0.15s', display: 'flex', gap: 14 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8F5E9'; e.currentTarget.style.background = '#F9FBF9'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#F0F7EE'; e.currentTarget.style.background = '#fff'; }}>
                <div style={{ width: 46, height: 46, borderRadius: 10, background: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, fontWeight: 700, color: '#fff' }}>{p.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{p.name}</p>
                  <p style={{ fontSize: 11, color: '#888', marginBottom: 5 }}>{p.city} · {p.category}</p>
                  <span style={{ fontSize: 11, color: '#2E7D32', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>Visit Store <ExternalLink size={9} /></span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Tab: Taste Map */}
        {activeTab === 'Taste Map' && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '32px', textAlign: 'center', marginBottom: 40, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗺️</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>{creator.name.split(' ')[1]}'s Taste Map</h3>
            <p style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>A curated collection of Italian producers, recipes, and experiences.</p>
            <Link to={`/taste-map/${creator.username}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 24px', background: '#2E7D32', color: '#fff', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
              Explore Full Map →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}