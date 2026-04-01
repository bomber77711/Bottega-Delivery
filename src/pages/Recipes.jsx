import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { recipesData, recipeCategories } from '../components/recipesData';
import { creatorsData } from '../components/creatorsData';
import { isSaved, toggleSave } from '../components/tasteMapStore';
import { Search, Clock, Heart, ChefHat } from 'lucide-react';

function RecipeCard({ recipe }) {
  const [saved, setSaved] = useState(isSaved('recipes', recipe.id));

  const handleSave = (e) => {
    e.preventDefault();
    const nowSaved = toggleSave('recipes', { id: recipe.id, name: recipe.name, region: recipe.regionName });
    setSaved(nowSaved);
  };

  const creator = creatorsData.find(c => c.id === recipe.creator.id);
  const difficultyColor = { Easy: '#2E7D32', Medium: '#E65100', Hard: '#D32F2F' };

  return (
    <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#fff', borderRadius: 14, overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(230,81,0,0.07)',
        transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column'
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          <img src={recipe.image} alt={recipe.name} loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <span style={{ background: '#E65100', color: '#fff', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
              🍝 {recipe.category}
            </span>
          </div>
          <button onClick={handleSave} style={{
            position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.9)',
            border: 'none', borderRadius: '50%', width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            transition: 'transform 0.15s'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <Heart size={14} fill={saved ? '#D32F2F' : 'none'} color={saved ? '#D32F2F' : '#888'} />
          </button>
        </div>
        <div style={{ padding: '14px 16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, lineHeight: 1.3 }}>
            {recipe.name}
          </h3>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            <span style={{ background: '#E8F5E9', color: '#2E7D32', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{recipe.regionName}</span>
            <span style={{ background: '#FFF3E0', color: difficultyColor[recipe.difficulty] || '#555', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{recipe.difficulty}</span>
          </div>
          <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: 10 }}>
            {recipe.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#E65100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChefHat size={10} color="#fff" />
              </div>
              <span style={{ fontSize: 11, color: '#888' }}>{recipe.creator.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#888', fontSize: 11 }}>
              <Clock size={11} /> {recipe.cookTime}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Recipes() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() =>
    recipesData.filter(r => {
      const matchSearch = !search || [r.name, r.regionName, r.description]
        .some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchCat = category === 'All' || r.category === category;
      return matchSearch && matchCat;
    }),
    [search, category]
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#FAF6F0' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0800 0%, #E65100 100%)',
        padding: '52px 32px 40px'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 10 }}>RECIPES</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.1 }}>
            Italian Recipes
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 32, maxWidth: 520 }}>
            Traditional dishes, authentic ingredients, and the producers behind them.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 18px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)', flex: 1, minWidth: 200, maxWidth: 360 }}>
              <Search size={14} color="rgba(255,255,255,0.7)" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search recipes, regions, ingredients..."
                style={{ border: 'none', background: 'none', outline: 'none', fontSize: 13, color: '#fff', flex: 1, fontFamily: "'DM Sans',sans-serif" }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
            {recipeCategories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: category === cat ? '#fff' : 'rgba(255,255,255,0.12)',
                color: category === cat ? '#E65100' : 'rgba(255,255,255,0.85)',
                border: category === cat ? 'none' : '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.15s'
              }}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 32px 64px' }}>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>
          <strong style={{ color: '#1A1A1A' }}>{filtered.length}</strong> recipes
        </p>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#bbb' }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 28 }}>No recipes found</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}