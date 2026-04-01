import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Heart, ExternalLink } from 'lucide-react';
import { regionData } from '../components/regionData';
import { recipesData } from '../components/recipesData';
import FoodConnections from '../components/FoodConnections';
import { isSaved, toggleSave } from '../components/tasteMapStore';
import GastronomyNetwork from '../components/GastronomyNetwork';

// Static ingredient knowledge base
const ingredients = {
  'pecorino-romano': {
    id: 'pecorino-romano', name: 'Pecorino Romano DOP', region: 'lazio', regionName: 'Lazio',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=900&q=80',
    description: 'One of Italy\'s oldest cheeses, Pecorino Romano DOP is a hard, salty sheep\'s milk cheese produced in Lazio and Sardinia. Its sharp, pungent flavour makes it essential to Roman pasta dishes.',
    flavors: ['Salty', 'Sharp', 'Umami', 'Nutty', 'Pungent'],
    pairings: ['Black Pepper', 'Guanciale', 'Eggs', 'Pasta', 'Chianti', 'Honeys'],
    pairingIds: ['black-pepper', 'guanciale', 'eggs', 'pasta', 'chianti', 'honey'],
    nutrition: ['High Protein', 'Rich in Calcium', 'Aged', 'Low Lactose'],
    producerIds: ['caseificio-salvo', 'formaggi-argiolas'],
    recipeIds: ['cacio-e-pepe', 'trofie-al-pesto'],
  },
  'parmigiano-reggiano': {
    id: 'parmigiano-reggiano', name: 'Parmigiano Reggiano DOP', region: 'emilia_romagna', regionName: 'Emilia-Romagna',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=900&q=80',
    description: 'The "King of Italian Cheeses" — an aged, granular hard cheese produced in Parma, Reggio Emilia, and surrounding provinces. Aged 12 to 36 months, its crystalline texture and complex umami depth are unparalleled.',
    flavors: ['Umami', 'Nutty', 'Savory', 'Sweet', 'Crystalline'],
    pairings: ['Prosciutto di Parma', 'Balsamic Vinegar', 'Pasta', 'Risotto', 'Lambrusco'],
    pairingIds: ['prosciutto-di-parma', 'balsamic-vinegar', 'pasta', 'risotto', 'lambrusco'],
    nutrition: ['High Protein', 'Rich in Calcium', 'Aged', 'Lactose-Free'],
    producerIds: ['caseificio-gennari', 'caseificio-lombardo'],
    recipeIds: ['tagliatelle-ragu', 'risotto-milanese', 'tajarin-tartufo'],
  },
  'tartufo-bianco': {
    id: 'tartufo-bianco', name: "Tartufo Bianco d'Alba", region: 'piemonte', regionName: 'Piedmont',
    image: 'https://images.unsplash.com/photo-1609501676614-6f01f0f3d0ea?w=900&q=80',
    description: "The white truffle from Alba is the most prized food in Italy — earthy, garlicky, honey-sweet, and intensely perfumed. Harvested October to December in the Langhe forests. Never cooked. Always shaved raw.",
    flavors: ['Earthy', 'Garlicky', 'Honey', 'Musky', 'Intense'],
    pairings: ['Tajarin', 'Butter', 'Parmigiano Reggiano', 'Risotto', 'Eggs'],
    pairingIds: ['tajarin', 'butter', 'parmigiano-reggiano', 'risotto', 'eggs'],
    nutrition: ['Low Calorie', 'High in Antioxidants', 'Seasonal', 'Rare'],
    producerIds: ['tartufi-morra', 'tartufi-ponti'],
    recipeIds: ['tajarin-tartufo'],
  },
  'pesto-genovese': {
    id: 'pesto-genovese', name: 'Pesto Genovese DOP', region: 'liguria', regionName: 'Liguria',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=900&q=80',
    description: 'True Pesto Genovese is made only with DOP Genovese basil, Ligurian extra virgin olive oil, Sardinian Fiore Sardo, Parmigiano, pine nuts, and garlic. Never heat it. Always use a marble mortar ideally.',
    flavors: ['Fresh', 'Herbal', 'Nutty', 'Savory', 'Bright'],
    pairings: ['Trofie', 'Focaccia', 'Burrata', 'Cherry Tomatoes', 'Pecorino'],
    pairingIds: ['trofie', 'focaccia', 'burrata', 'cherry-tomatoes', 'pecorino-sardo'],
    nutrition: ['High in Healthy Fats', 'Antioxidant-rich', 'Vegetarian', 'Gluten-Free'],
    producerIds: ['pesto-rossi', 'frantoio-roi'],
    recipeIds: ['trofie-al-pesto'],
  },
  'san-marzano': {
    id: 'san-marzano', name: 'San Marzano DOP Tomatoes', region: 'campania', regionName: 'Campania',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=900&q=80',
    description: 'San Marzano tomatoes grown in the volcanic plains of Sarno — the gold standard for tomato sauce. Lower acidity, fewer seeds, and a meaty flesh that makes them the only tomato permitted in authentic Neapolitan pizza.',
    flavors: ['Sweet', 'Low Acid', 'Bright', 'Fresh', 'Umami'],
    pairings: ['Mozzarella di Bufala', 'Basil', 'Olive Oil', 'Pasta', 'Pizza'],
    pairingIds: ['mozzarella-bufala', 'basil', 'olive-oil', 'pasta', 'pizza'],
    nutrition: ['Low Calorie', 'Rich in Lycopene', 'Vegan', 'Gluten-Free'],
    producerIds: ['gustarosso'],
    recipeIds: ['pasta-alla-norma', 'tagliatelle-ragu'],
  },
};

const heroImages = {
  lazio: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80',
  emilia_romagna: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80',
  piemonte: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
  liguria: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=900&q=80',
  campania: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=900&q=80',
};

export default function Ingredient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ingredient = ingredients[id];
  const [saved, setSaved] = useState(isSaved('ingredients', id));

  if (!ingredient) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F0F7EE', gap: 16 }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: '#1A1A1A' }}>Ingredient not found</p>
        <button onClick={() => navigate(-1)} style={{ color: '#2E7D32', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeft size={14} /> Go back
        </button>
      </div>
    );
  }

  const region = regionData[ingredient.region];
  const heroImg = ingredient.image || heroImages[ingredient.region] || heroImages.lazio;
  const relatedProducers = (region?.producers || []).filter(p => ingredient.producerIds.includes(p.id));
  const relatedRecipes = recipesData.filter(r => ingredient.recipeIds.includes(r.id));

  // Food connections
  const fcNodes = [
    { id: ingredient.id, type: 'ingredient', label: ingredient.name },
    ...relatedProducers.slice(0, 2).map(p => ({ id: p.id, type: 'producer', label: p.name, path: `/producers/${p.id}` })),
    ...relatedRecipes.slice(0, 2).map(r => ({ id: r.id, type: 'recipe', label: r.name, path: `/recipes/${r.id}` })),
    ...(region ? [{ id: ingredient.region, type: 'region', label: region.name, path: `/regions/${ingredient.region}` }] : []),
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F6F1E7' }}>
      {/* Hero */}
      <div style={{ height: 360, position: 'relative', overflow: 'hidden' }}>
        <img src={heroImg} alt={ingredient.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65) saturate(1.1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', top: 20, left: 28 }}>
          <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', border: 'none', padding: '7px 14px', borderRadius: 100, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            <ArrowLeft size={13} /> Back
          </button>
        </div>
        <div style={{ position: 'absolute', bottom: 28, left: 32, right: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Italian Ingredient</span>
            {region && <span style={{ background: '#E8F5E9', color: '#2E7D32', fontSize: 11, fontWeight: 700, borderRadius: 100, padding: '3px 10px' }}>{ingredient.regionName}</span>}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 12 }}>{ingredient.name}</h1>
          <button
            onClick={() => { const ns = toggleSave('ingredients', { id: ingredient.id, name: ingredient.name, region: ingredient.regionName }); setSaved(ns); }}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', background: saved ? 'rgba(211,47,47,0.9)' : 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: `1.5px solid ${saved ? '#D32F2F' : 'rgba(255,255,255,0.4)'}`, borderRadius: 100, cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#fff', transition: 'all 0.2s' }}>
            <Heart size={14} fill={saved ? '#fff' : 'none'} />
            {saved ? 'Saved ✓' : 'Save to Taste Map'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px 80px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Description */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '28px 30px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: '#333', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 8 }}>{ingredient.description.split('.')[0]}.</p>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8 }}>{ingredient.description.split('.').slice(1).join('.').trim()}</p>
        </div>

        {/* Flavor Profile */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, color: '#1A1A1A', marginBottom: 14 }}>Flavor Profile</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ingredient.flavors.map((f, i) => (
              <span key={i} style={{ padding: '7px 16px', borderRadius: 100, background: '#F0F7EE', color: '#2E7D32', fontSize: 13, fontWeight: 700, border: '1px solid #E8F5E9' }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Pairing Intelligence */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Pairs Well With</h3>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 14 }}>Classic ingredient pairings in Italian tradition</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ingredient.pairings.map((p, i) => (
              <Link key={i} to={`/ingredients/${ingredient.pairingIds[i] || p.toLowerCase().replace(/\s/g, '-')}`}
                style={{ padding: '7px 16px', borderRadius: 100, background: '#F5F5F5', color: '#444', fontSize: 13, fontWeight: 600, textDecoration: 'none', border: '1px solid #e5e5e5', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E8F5E9'; e.currentTarget.style.color = '#2E7D32'; e.currentTarget.style.borderColor = '#2E7D32'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F5F5F5'; e.currentTarget.style.color = '#444'; e.currentTarget.style.borderColor = '#e5e5e5'; }}>
                {p}
              </Link>
            ))}
          </div>
        </div>

        {/* Nutrition */}
        <div style={{ background: '#F0F7EE', borderRadius: 12, padding: '18px 22px' }}>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontFamily: "'DM Mono',monospace" }}>Nutritional Profile</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ingredient.nutrition.map((n, i) => (
              <span key={i} style={{ padding: '5px 13px', background: '#fff', color: '#2E7D32', borderRadius: 100, fontSize: 12, fontWeight: 600, border: '1px solid #E8F5E9' }}>{n}</span>
            ))}
          </div>
        </div>

        {/* Producers */}
        {relatedProducers.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Producers of {ingredient.name.split(' ').slice(0, 2).join(' ')}</h3>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>Artisan producers that source and supply this ingredient</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
              {relatedProducers.map((p, i) => (
                <Link key={i} to={`/producers/${p.id}`} style={{ textDecoration: 'none', display: 'flex', gap: 12, padding: '14px', background: '#F9FBF9', borderRadius: 12, border: '1px solid #E8F5E9', transition: 'all 0.15s', alignItems: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#E8F5E9'; e.currentTarget.style.borderColor = '#2E7D32'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#F9FBF9'; e.currentTarget.style.borderColor = '#E8F5E9'; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, fontWeight: 700, color: '#fff' }}>{p.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{p.name}</p>
                    <p style={{ fontSize: 11, color: '#888' }}>{p.city} · {p.category}</p>
                    <p style={{ fontSize: 11, color: '#2E7D32', fontWeight: 600, marginTop: 3 }}>Visit Store <ExternalLink size={9} style={{ display: 'inline' }} /></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recipes */}
        {relatedRecipes.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>Recipes Featuring This Ingredient</h3>
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4 }}>
              {relatedRecipes.map((r, i) => (
                <Link key={i} to={`/recipes/${r.id}`} style={{ flexShrink: 0, width: 200, textDecoration: 'none' }}>
                  <div style={{ background: '#F9FBF9', borderRadius: 12, overflow: 'hidden', border: '1px solid #E8F5E9', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <img src={r.image} alt={r.name} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                    <div style={{ padding: '12px 14px' }}>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{r.name}</p>
                      <p style={{ fontSize: 11, color: '#888' }}>{r.regionName}</p>
                      <p style={{ fontSize: 11, color: '#E65100', fontWeight: 600, marginTop: 6 }}>View Recipe →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Gastronomy Network */}
        <GastronomyNetwork entityType="ingredients" entityId={id} />

        {/* Food Connections */}
        <FoodConnections nodes={fcNodes} title={`${ingredient.name} Connections`} />
      </div>
    </div>
  );
}