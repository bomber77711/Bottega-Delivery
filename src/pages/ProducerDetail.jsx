import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { regionData } from '../components/regionData';
import { productsData } from '../components/productsData';
import { recipesData } from '../components/recipesData';
import { useCart } from '../components/cartStore';
import { ArrowLeft, Star, MapPin, ShoppingCart, Check, Award, Leaf, Clock, Users, ChevronRight, Globe, Instagram, ExternalLink } from 'lucide-react';

const allProducers = Object.entries(regionData).flatMap(([regionId, region]) =>
  region.producers.map((p, i) => ({
    ...p, regionId, regionName: region.name, id: `${regionId}-${i}`
  }))
);

const categoryHeroImages = {
  'Olive Oil': 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/generated_olive_oil.png',
  'Wine': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1400&q=90',
  'Cheese': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1400&q=90',
  'Coffee': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=90',
  'Pasta': 'https://images.unsplash.com/photo-1551183053-bf91798d2233?w=1400&q=90',
  'Truffle': 'https://images.unsplash.com/photo-1609501676614-6f01f0f3d0ea?w=1400&q=90',
  'Cured Meats': 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=1400&q=90',
  'Honey': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1400&q=90',
  'Nuts': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1400&q=90',
  'Liqueurs': 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1400&q=90',
  'Condiments': 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=1400&q=90',
  'Baked Goods': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1400&q=90',
  'Rice': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=1400&q=90',
  'Spices': 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=1400&q=90',
  'Spirits': 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1400&q=90',
  'Citrus': 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1400&q=90',
  'Meat': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400&q=90',
  'Vegetables': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=90',
  'Fish': 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=1400&q=90',
  'Fruit': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=1400&q=90',
};

const regionLandscapes = {
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

const terroir = {
  toscana: 'Rolling hills of olive groves, ancient vineyards, and centuries of artisan craft in the Val d\'Orcia.',
  lombardia: 'Alpine foothills, glacial lakes, and the fertile Po plain \u2014 Italy\'s most productive gastronomic landscape.',
  sicilia: 'Volcanic soils, blazing sun, and millennia of Mediterranean crossroads culture.',
  campania: 'Vesuvian slopes, buffalo plains, and the birthplace of pizza and mozzarella.',
  veneto: 'From Dolomite peaks to Adriatic lagoons \u2014 a region of extraordinary wine and cheese variety.',
  piemonte: 'The Langhe hills in autumn fog: truffle country, Barolo, and the aristocracy of Italian food.',
  puglia: 'Ancient olive groves, brilliant sea light, and the hand-shaped pastas of the Italian heel.',
  emilia_romagna: 'The food valley of Italy \u2014 Parmigiano, Prosciutto, balsamic vinegar, and tortellini.',
  lazio: 'The eternal city\'s hinterland \u2014 volcanic lakes, Castelli Romani wines, and Roman pastoral traditions.',
  sardegna: 'An island of ancient food rituals \u2014 bottarga, pane carasau, and centuries-old sheep farming.',
  liguria: 'Steep terraces above the Ligurian sea \u2014 home of pesto, Taggiasca olives, and focaccia.',
  calabria: 'Italy\'s wild toe \u2014 nduja, bergamot, and the fierce flavours of the deep south.',
  marche: 'Hidden hills, Adriatic coast, and the truffle forests of Acqualagna.',
  abruzzo: 'Gran Sasso highlands, saffron fields, and ancient mountain pastoral traditions.',
  umbria: 'The green heart of Italy \u2014 Sagrantino vineyards, truffle forests, and Norcia cured meats.',
  trentino_alto_adige: 'Alpine meadows, mountain dairies, and the fusion of Italian and Austrian food culture.',
  friuli_venezia_giulia: 'Rolling Collio hills and the Adriatic coast \u2014 a crossroads of Italian, Slovenian, and Austrian influences.',
  basilicata: 'Wild volcanic landscapes, ancient grain fields, and the fierce independent spirit of Lucanian cuisine.',
  molise: 'Italy\'s most unspoiled region \u2014 ancient transhumance routes, mountain pastures, and artisan cheese traditions.',
  valle_daosta: 'Europe\'s highest vineyards and Alpine pastures \u2014 home of Fontina and the mountain dairy tradition.',
};

const pantryCategories = new Set(['Olive Oil', 'Pasta', 'Coffee', 'Honey']);

function getFoundingYear(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash) + name.charCodeAt(i);
  const base = 1820 + Math.abs(hash % 160);
  return base;
}

function getGenerations(year) {
  const age = 2026 - year;
  if (age > 150) return '6+';
  if (age > 100) return '4';
  if (age > 60) return '3';
  if (age > 30) return '2';
  return '1st';
}

function ProductCard({ product }) {
  const { addItem } = useCart();
  const isPantry = pantryCategories.has(product.category);
  const [subMode, setSubMode] = useState(false);
  const [deliveryInterval, setDeliveryInterval] = useState('1 month');
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    addItem({ ...product, subscriptionInterval: subMode ? deliveryInterval : null });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(46,125,50,0.2)' : 'rgba(0,0,0,0.07)'}`,
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.14)' : '0 2px 16px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        display: 'flex', flexDirection: 'column'
      }}>
      <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.07)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 60%)' }} />
        {product.certifications?.length > 0 && (
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {product.certifications.map(c => (
              <span key={c} style={{
                background: 'rgba(46,125,50,0.9)', color: '#fff',
                fontSize: 9, fontWeight: 800, padding: '3px 9px', borderRadius: 100,
                fontFamily: "'DM Mono',monospace", backdropFilter: 'blur(4px)',
                letterSpacing: '0.06em'
              }}>{c}</span>
            ))}
          </div>
        )}
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <span style={{
            background: 'rgba(0,0,0,0.55)', color: '#fff', backdropFilter: 'blur(8px)',
            fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100,
            fontFamily: "'DM Mono',monospace"
          }}>{product.category}</span>
        </div>
      </div>

      <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3, flex: 1 }}>{product.name}</h3>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, fontWeight: 800, color: '#2E7D32', display: 'block' }}>{'\u20AC'}{product.price.toFixed(2)}</span>
            {product.weight && <span style={{ fontSize: 10, color: '#bbb', fontFamily: "'DM Mono',monospace" }}>{product.weight}</span>}
          </div>
        </div>
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, flex: 1 }}>{product.description}</p>

        {isPantry && (
          <div style={{ marginTop: 4 }}>
            <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1.5px solid #E8F5E9' }}>
              <button onClick={() => setSubMode(false)} style={{
                flex: 1, padding: '8px 0', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                background: !subMode ? '#E8F5E9' : '#fff', color: !subMode ? '#2E7D32' : '#bbb', transition: 'all 0.15s'
              }}>One-time</button>
              <button onClick={() => setSubMode(true)} style={{
                flex: 1, padding: '8px 0', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer',
                background: subMode ? '#2E7D32' : '#fff', color: subMode ? '#fff' : '#bbb', transition: 'all 0.15s'
              }}>{'\uD83C\uDF3F'} Subscribe</button>
            </div>
            {subMode && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>
                  {['1 month', '2 months', '3 months'].map(opt => (
                    <button key={opt} onClick={() => setDeliveryInterval(opt)} style={{
                      flex: 1, padding: '5px 4px', fontSize: 10, fontWeight: 600, cursor: 'pointer',
                      borderRadius: 6, border: `1.5px solid ${deliveryInterval === opt ? '#2E7D32' : '#eee'}`,
                      background: deliveryInterval === opt ? '#E8F5E9' : '#fff',
                      color: deliveryInterval === opt ? '#2E7D32' : '#aaa', transition: 'all 0.15s'
                    }}>{opt}</button>
                  ))}
                </div>
                <p style={{ fontSize: 10, color: '#bbb', fontFamily: "'DM Mono',monospace" }}>Cancel anytime {'\u00B7'} Free first delivery</p>
              </div>
            )}
          </div>
        )}

        <button onClick={handleAdd} style={{
          marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          padding: '13px 0', background: added ? '#388E3C' : '#2E7D32', color: '#fff',
          border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => !added && (e.currentTarget.style.background = '#1B5E20')}
          onMouseLeave={e => !added && (e.currentTarget.style.background = '#2E7D32')}>
          {added ? <><Check size={15} /> Added to Cart</> : <><ShoppingCart size={15} />{subMode ? 'Subscribe & Add' : 'Add to Cart'}</>}
        </button>
      </div>
    </div>
  );
}


function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "").replace(/^-+/g, ""); }
export default function ProducerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const producer = allProducers.find(function(p) { return slugify(p.name) === id; });

  if (!producer) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, background: '#FAFAFA' }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: '#1A1A1A' }}>Producer not found</p>
        <button onClick={() => navigate('/Producers')} style={{ color: '#2E7D32', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 15 }}>{'\u2190'} Back to Producers</button>
      </div>
    );
  }

  const heroUrl = categoryHeroImages[producer.category] || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=90';
  const producerProducts = productsData.filter(p => p.producer === producer.name);
  const regionProducts = producerProducts.length > 0
    ? producerProducts
    : productsData.filter(p => p.regionId === producer.regionId);
  const regionRecipes = recipesData.filter(r => r.region === producer.regionId);
  const regionImg = regionLandscapes[producer.regionId] || regionLandscapes.toscana;
  const regionTerroir = terroir[producer.regionId] || `The ${producer.regionName} region is celebrated for its exceptional ${producer.category.toLowerCase()} tradition.`;
  const foundingYear = getFoundingYear(producer.name);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#FAFAFA' }}>

      {/* HERO - reduced height */}
      <div style={{ height: '55vh', minHeight: 380, position: 'relative', overflow: 'hidden' }}>
        <img src={heroUrl} alt={producer.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.38) saturate(1.1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.97) 100%)' }} />

        <button onClick={() => navigate('/Producers')} style={{
          position: 'absolute', top: 24, left: 32, zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
          color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100,
          padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}>
          <ArrowLeft size={14} /> Back
        </button>

        <div style={{
          position: 'absolute', top: 24, right: 32, zIndex: 20,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(76,175,80,0.2)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(76,175,80,0.45)',
          color: '#A5D6A7', fontSize: 10, fontWeight: 800,
          padding: '6px 14px', borderRadius: 100,
          fontFamily: "'DM Mono',monospace", letterSpacing: '0.1em', textTransform: 'uppercase'
        }}>
          {'\u2714'} Verified Artisan
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 48px 44px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 14 }}>
              <span style={{
                background: 'rgba(199,106,58,0.85)', backdropFilter: 'blur(6px)',
                color: '#fff', padding: '5px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                fontFamily: "'DM Mono',monospace", letterSpacing: '0.08em', textTransform: 'uppercase'
              }}>{producer.category}</span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display',serif", fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800,
              color: '#fff', lineHeight: 1.0, marginBottom: 16,
              textShadow: '0 2px 30px rgba(0,0,0,0.4)'
            }}>{producer.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={15} fill={s <= Math.round(producer.rating) ? '#F59E0B' : 'rgba(255,255,255,0.2)'} color={s <= Math.round(producer.rating) ? '#F59E0B' : 'rgba(255,255,255,0.2)'} />
                ))}
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: '#fff', fontWeight: 700, marginLeft: 4 }}>{producer.rating.toFixed(1)}</span>
              </div>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                <MapPin size={13} color="#4CAF50" />{producer.city}, {producer.regionName}
              </div>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                <Award size={12} color="#A5D6A7" /> Est. {foundingYear} {'\u00B7'} Family-run
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'stretch' }}>
          {[
            { icon: <MapPin size={16} color="#2E7D32" />, label: 'Location', value: producer.city },
            { icon: <Star size={16} color="#F59E0B" />, label: 'Rating', value: `${producer.rating.toFixed(1)} / 5.0` },
            { icon: <Leaf size={16} color="#4CAF50" />, label: 'Category', value: producer.category },
            { icon: <ShoppingCart size={16} color="#C76A3A" />, label: 'Products', value: `${regionProducts.length} Listed` },
            { icon: <Clock size={16} color="#888" />, label: 'Founded', value: `Est. ${foundingYear}` },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1, padding: '18px 0', textAlign: 'center',
              borderRight: i < 4 ? '1px solid #F0F0F0' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>{stat.icon}</div>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 800, color: '#1A1A1A', marginBottom: 2 }}>{stat.value}</p>
              <p style={{ fontSize: 9, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'DM Mono',monospace" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* OUR STORY + REGION SIDEBAR - inline, no tabs */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 48px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 2fr', gap: 48, alignItems: 'start' }}>
          {/* Story content - main column */}
          <div>
            <p style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: '#C76A3A', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>{'\u2726'} Our Story</p>

            <p style={{ fontSize: 16, color: '#333', lineHeight: 1.85, marginBottom: 20 }}>
              <span style={{
                float: 'left', fontFamily: "'Playfair Display',serif", fontSize: 64, fontWeight: 800,
                color: '#2E7D32', lineHeight: 0.75, marginRight: 10, marginTop: 8
              }}>T</span>
              hree generations of the <strong>{producer.name}</strong> family have worked this land,
              using methods passed down without a written recipe. The terroir of {producer.regionName} gives
              their products an unmistakable character {'\u2014'} shaped by the local climate, soil, and centuries of
              accumulated knowledge that cannot be replicated anywhere else in the world.
            </p>
            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.85, marginBottom: 20 }}>
              The {producer.regionName} region has long been celebrated for its exceptional {producer.category.toLowerCase()} tradition.
              Here, quality is not just a standard {'\u2014'} it is a way of life, embedded in every harvest, every
              pressing, every aging process. {producer.name} carries this legacy forward with the same
              reverence and precision that defines the finest Italian artisanship.
            </p>

            {/* Pull quote */}
            <div style={{
              borderLeft: '4px solid #C76A3A',
              background: 'linear-gradient(to right, rgba(199,106,58,0.06), transparent)',
              borderRadius: '0 12px 12px 0', padding: '16px 22px', marginBottom: 24
            }}>
              <p style={{ fontSize: 16, fontStyle: 'italic', color: '#5A3A25', lineHeight: 1.7, fontFamily: "'Playfair Display',serif" }}>
                "Small-batch production means every item is made by hand, inspected individually, and released only when it meets the exacting standards
                that define {producer.regionName}'s finest culinary heritage."
              </p>
            </div>

            {/* Heritage badges */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
              {[
                { icon: <Award size={15} color="#2E7D32" />, label: `Est. ${foundingYear}`, sub: `${2026 - foundingYear}+ years tradition`, bg: '#E8F5E9', color: '#1B5E20' },
                { icon: <Leaf size={15} color="#4CAF50" />, label: 'Artisan Made', sub: 'Hand-crafted daily', bg: '#F1F8E9', color: '#33691E' },
                { icon: <Users size={15} color="#C76A3A" />, label: 'Family Owned', sub: `${getGenerations(foundingYear)} generations`, bg: '#FBE9E7', color: '#BF360C' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: b.bg, borderRadius: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>{b.icon}</div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: b.color, fontFamily: "'DM Mono',monospace" }}>{b.label}</p>
                    <p style={{ fontSize: 10, color: '#888' }}>{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Region sidebar - compact */}
          <div style={{ position: 'sticky', top: 80 }}>
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 14, boxShadow: '0 12px 36px rgba(0,0,0,0.15)' }}>
              <img src={regionImg} alt={producer.regionName}
                style={{ width: '100%', height: 220, objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{producer.regionName}</p>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{producer.city}, Italy</p>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', border: '1px solid #E8F5E9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <MapPin size={12} color="#2E7D32" />
                <span style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", fontWeight: 700, color: '#2E7D32', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Terroir & Region</span>
              </div>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{regionTerroir}</p>
            </div>

            <button onClick={() => navigate(`/regions/${producer.regionId}`)} style={{
              width: '100%', padding: '11px', background: '#F0F7EE',
              border: '1.5px solid #C8E6C9', borderRadius: 10,
              fontSize: 13, fontWeight: 700, color: '#2E7D32', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.15s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E8F5E9'; e.currentTarget.style.borderColor = '#2E7D32'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F0F7EE'; e.currentTarget.style.borderColor = '#C8E6C9'; }}>
              Explore {producer.regionName} <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 48px 60px' }}>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>
            {producerProducts.length > 0 ? `Products by ${producer.name}` : `Artisan Products from ${producer.regionName}`}
          </h2>
          <p style={{ fontSize: 14, color: '#888', maxWidth: 560, lineHeight: 1.7 }}>
            {producerProducts.length > 0
              ? `Handcrafted products from ${producer.name}, sourced directly from ${producer.city}.`
              : `Curated artisan products from the ${producer.regionName} region.`}
          </p>
        </div>
        {regionProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 24 }}>
            {regionProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#ccc' }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: '#bbb' }}>No products listed yet</p>
            <p style={{ fontSize: 13, color: '#ccc', marginTop: 8 }}>Check back soon for products from this producer.</p>
          </div>
        )}
      </div>

      {/* RECIPES SECTION */}
      {regionRecipes.length > 0 && (
        <div style={{ background: '#fff', padding: '48px 0 60px', borderTop: '1px solid #F0F0F0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>
                Recipes from {producer.regionName}
              </h2>
              <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7 }}>
                Traditional dishes where {producer.name} ingredients play a starring role.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {regionRecipes.map(recipe => (
                <div key={recipe.id} onClick={() => navigate(`/recipes/${recipe.id}`)}
                  style={{
                    borderRadius: 16, overflow: 'hidden', position: 'relative',
                    cursor: 'pointer', aspectRatio: '4/3',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'; }}>
                  <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, background: 'rgba(199,106,58,0.9)', color: '#fff', padding: '3px 9px', borderRadius: 100, fontFamily: "'DM Mono',monospace", textTransform: 'uppercase' }}>{recipe.category}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.85)', padding: '3px 9px', borderRadius: 100, fontFamily: "'DM Mono',monospace" }}>{recipe.difficulty}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 3 }}>{recipe.name}</h3>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Mono',monospace" }}>{recipe.cookTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)',
        padding: '56px 48px'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: 10 }}>Discover More</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.15 }}>
              Explore {producer.regionName}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: 480, lineHeight: 1.7 }}>
              Discover more artisan producers, traditional ingredients, and unforgettable food experiences from this region.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/Products')} style={{
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 100,
              padding: '13px 26px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.2s', backdropFilter: 'blur(8px)'
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
              Browse All Products
            </button>
            <button onClick={() => navigate(`/regions/${producer.regionId}`)} style={{
              background: '#fff', color: '#2E7D32',
              border: 'none', borderRadius: 100,
              padding: '13px 26px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'; }}>
              Explore Region {'\u2192'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
