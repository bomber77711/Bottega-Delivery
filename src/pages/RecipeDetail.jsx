import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { recipesData } from '../components/recipesData';
import { isSaved, toggleSave } from '../components/tasteMapStore';
import { ArrowLeft, Clock, ChefHat, Heart, ExternalLink } from 'lucide-react';
import GastronomyNetwork from '../components/GastronomyNetwork';

const producerImages = {
  'caseificio-salvo': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'pastificio-cavalieri': 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=300&q=70',
  'prosciuttificio-san-nicola': 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=300&q=70',
  'caseificio-gennari': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'gustarosso': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=70',
  'riseria-costanzo': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=70',
  'caseificio-lombardo': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'zafferano-altopiano': 'https://images.unsplash.com/photo-1609501676614-6f01f0f3d0ea?w=300&q=70',
  'pesto-rossi': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&q=70',
  'frantoio-roi': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=70',
  'formaggi-argiolas': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'olio-callipo': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=70',
  'tartufi-morra': 'https://images.unsplash.com/photo-1609501676614-6f01f0f3d0ea?w=300&q=70',
};

const producerNames = {
  'caseificio-salvo': 'Caseificio Salvo', 'pastificio-cavalieri': 'Pastificio Cavalieri',
  'prosciuttificio-san-nicola': 'Prosciuttificio San Nicola', 'caseificio-gennari': 'Caseificio Gennari',
  'gustarosso': 'Gustarosso', 'riseria-costanzo': 'Riseria Costanzo', 'caseificio-lombardo': 'Caseificio Lombardo',
  'zafferano-altopiano': 'Zafferano Altopiano', 'pesto-rossi': 'Pesto Rossi', 'frantoio-roi': 'Frantoio Roi',
  'formaggi-argiolas': 'Formaggi Argiolas', 'olio-callipo': 'Olio Callipo', 'tartufi-morra': 'Tartufi Morra',
};

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipesData.find(r => r.id === id);
  const [saved, setSaved] = useState(isSaved('recipes', id));

  useEffect(() => {
    window.scrollTo(0, 0);
    setSaved(isSaved('recipes', id));
  }, [id]);

  if (!recipe) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF6F0' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: '#1A1A1A', marginBottom: 16 }}>Recipe not found</p>
          <Link to="/Recipes" style={{ color: '#E65100', fontWeight: 600, textDecoration: 'none' }}>← Back to Recipes</Link>
        </div>
      </div>
    );
  }

  const taggedIngredients = recipe.ingredients.filter(i => i.producerId);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#FAF6F0' }}>
      {/* Hero */}
      <div style={{ height: 380, position: 'relative', overflow: 'hidden' }}>
        <img src={recipe.image} alt={recipe.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%)' }} />
        <div style={{ position: 'absolute', top: 20, left: 32, display: 'flex', alignItems: 'center' }}>
          <Link to="/Recipes" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: 13, fontWeight: 600, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', padding: '7px 14px', borderRadius: 100 }}>
            <ArrowLeft size={13} /> Back to Recipes
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 32px 80px' }}>
        {/* Header */}
        <div style={{ background: '#fff', borderRadius: '0 0 20px 20px', padding: '32px 36px', marginBottom: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ background: '#FFF3E0', color: '#E65100', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>{recipe.category}</span>
                <span style={{ background: '#E8F5E9', color: '#2E7D32', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{recipe.regionName}</span>
                <span style={{ background: '#F5F5F5', color: '#555', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={11} /> {recipe.cookTime}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 700, color: '#1A1A1A', marginBottom: 10, lineHeight: 1.15 }}>{recipe.name}</h1>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>{recipe.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E65100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChefHat size={13} color="#fff" />
                </div>
                <span style={{ fontSize: 13, color: '#555' }}>By <strong style={{ color: '#1A1A1A' }}>{recipe.creator.name}</strong></span>
              </div>
            </div>
            <button onClick={() => { const ns = toggleSave('recipes', { id: recipe.id, name: recipe.name, region: recipe.regionName }); setSaved(ns); }}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', background: saved ? '#FFF0F0' : '#fff', border: `1.5px solid ${saved ? '#D32F2F' : '#ddd'}`, borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: saved ? '#D32F2F' : '#555', transition: 'all 0.2s', flexShrink: 0 }}>
              <Heart size={15} fill={saved ? '#D32F2F' : 'none'} />
              {saved ? 'Saved ✓' : 'Save to Taste Map'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          {/* Cultural Story */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '28px 30px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', gridColumn: '1 / -1' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 14 }}>The Story</h2>
            <p style={{ fontSize: 15, color: '#444', lineHeight: 1.8, fontStyle: 'italic', fontFamily: "'Playfair Display',serif", marginBottom: 8 }}>
              {recipe.culturalStory.split('.')[0]}.
            </p>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8 }}>
              {recipe.culturalStory.split('.').slice(1).join('.').trim()}
            </p>
          </div>

          {/* Ingredients */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '28px 30px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 18 }}>Ingredients</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {recipe.ingredients.map((ing, i) => (
                <li key={i} style={{ borderBottom: i < recipe.ingredients.length - 1 ? '1px solid #f0f0f0' : 'none', padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    {ing.producerId ? (
                      <Link to={`/producers/${ing.producerId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#E8F5E9', color: '#2E7D32', borderRadius: 100, padding: '3px 10px', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'all 0.15s', border: '1px solid transparent' }}
                        onMouseEnter={e => { e.currentTarget.style.border = '1px solid #2E7D32'; e.currentTarget.style.background = '#D7F0DA'; }}
                        onMouseLeave={e => { e.currentTarget.style.border = '1px solid transparent'; e.currentTarget.style.background = '#E8F5E9'; }}>
                        {ing.name} <ExternalLink size={10} />
                      </Link>
                    ) : (
                      <span style={{ fontSize: 14, color: '#1A1A1A' }}>{ing.name}</span>
                    )}
                  </div>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: '#888', flexShrink: 0 }}>{ing.amount}</span>
                </li>
              ))}
            </ul>
            {taggedIngredients.length > 0 && (
              <p style={{ marginTop: 14, fontSize: 11, color: '#888', fontStyle: 'italic' }}>
                ✦ Green tags link directly to the producer's store
              </p>
            )}
          </div>

          {/* Steps */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '28px 30px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 18 }}>Method</h2>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {recipe.steps.map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 700, color: '#E65100', background: '#FFF3E0', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                  <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, margin: 0 }}>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Recommended Producers */}
        {taggedIngredients.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '28px 30px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Where to Source These Ingredients</h2>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>Artisan producers that supply the key ingredients in this recipe</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
              {taggedIngredients.map((ing, i) => (
                <Link key={i} to={`/producers/${ing.producerId}`} style={{ textDecoration: 'none', display: 'flex', gap: 12, padding: '12px 14px', background: '#F9FBF9', borderRadius: 10, border: '1px solid #E8F5E9', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#E8F5E9'; e.currentTarget.style.border = '1px solid #2E7D32'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#F9FBF9'; e.currentTarget.style.border = '1px solid #E8F5E9'; }}>
                  <img src={producerImages[ing.producerId] || 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=60&q=60'} alt=""
                    style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{producerNames[ing.producerId] || ing.producerId}</p>
                    <p style={{ fontSize: 11, color: '#888' }}>{ing.name}</p>
                    <p style={{ fontSize: 10, color: '#2E7D32', fontWeight: 600, marginTop: 2 }}>Visit Store →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Gastronomy Network */}
        <GastronomyNetwork entityType="recipes" entityId={id} />

        {/* Related recipes */}
          {recipe.relatedRecipes?.length > 0 && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>Related Recipes</h2>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
              {recipe.relatedRecipes.map(rid => {
                const r = recipesData.find(x => x.id === rid);
                if (!r) return null;
                return (
                  <Link key={rid} to={`/recipes/${r.id}`} style={{ textDecoration: 'none', flexShrink: 0, width: 200 }}>
                    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', transition: 'transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                      <img src={r.image} alt={r.name} loading="lazy" style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                      <div style={{ padding: '10px 12px' }}>
                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{r.name}</p>
                        <p style={{ fontSize: 11, color: '#888' }}>{r.regionName}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}