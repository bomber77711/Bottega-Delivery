import { useState, useMemo } from 'react';
import { productsData, categories } from '../components/productsData';
import { useCart } from '../components/cartStore';
import { Search, Star, ShoppingCart, Check } from 'lucide-react';

const certFilters = ['All', 'DOP/IGP', 'Organic', 'Gluten-Free', 'Vegan'];

function CertBadge({ cert }) {
  const colors = {
    DOP: { bg: '#FFF3E0', text: '#E65100' },
    IGP: { bg: '#E8F5E9', text: '#2E7D32' },
    DOCG: { bg: '#EDE7F6', text: '#4527A0' },
    DOC: { bg: '#E3F2FD', text: '#1565C0' },
    Organic: { bg: '#F1F8E9', text: '#558B2F' },
  };
  const c = colors[cert] || { bg: '#F5F5F5', text: '#555' };
  return (
    <span style={{ background: c.bg, color: c.text, borderRadius: 100, padding: '2px 7px', fontSize: 10, fontWeight: 700 }}>
      {cert}
    </span>
  );
}

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; }}
    >
      <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
        <img src={product.image} alt={product.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {/* Cert badges overlay */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {product.certifications.map(c => <CertBadge key={c} cert={c} />)}
        </div>
        {/* Region badge */}
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
          borderRadius: 6, padding: '3px 8px', fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: 600
        }}>
          {product.region}
        </div>
      </div>
      <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontWeight: 700, fontSize: 14, color: '#1A1A1A', marginBottom: 3, lineHeight: 1.3 }}>{product.name}</p>
        <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>{product.producer}</p>
        <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: 10 }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>€{product.price.toFixed(2)}</span>
            <span style={{ fontSize: 11, color: '#aaa', marginLeft: 5 }}>{product.weight}</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {product.tags.slice(0, 2).map(t => (
              <span key={t} style={{ background: '#E8F5E9', color: '#2E7D32', borderRadius: 100, padding: '2px 6px', fontSize: 10, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
        <button
          onClick={handleAdd}
          style={{
            width: '100%', padding: '10px', borderRadius: 8,
            background: added ? '#1B5E20' : '#2E7D32', color: '#fff',
            border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transform: added ? 'scale(0.98)' : 'scale(1)'
          }}>
          {added ? <><Check size={14} /> Added!</> : <><ShoppingCart size={14} /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
}

function CategoryCard({ cat, active, onClick }) {
  return (
    <div onClick={onClick} style={{
      borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', position: 'relative',
      cursor: 'pointer', transition: 'transform 0.2s ease',
      border: active ? '2px solid #4CAF50' : '2px solid transparent',
      boxShadow: active ? '0 0 0 3px rgba(76,175,80,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      <img src={cat.image} alt={cat.name} loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)'
      }} />
      <div style={{ position: 'absolute', bottom: 10, left: 12, color: '#fff' }}>
        <span style={{ fontSize: 18 }}>{cat.emoji}</span>
        <p style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>{cat.name}</p>
      </div>
    </div>
  );
}

export default function Products() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = useMemo(() => {
    return productsData.filter(p => {
      const matchSearch = !search || [p.name, p.producer, p.category, p.region].some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchFilter = activeFilter === 'All' ||
        (activeFilter === 'DOP/IGP' && p.certifications.some(c => ['DOP', 'IGP', 'DOCG', 'DOC'].includes(c))) ||
        (activeFilter === 'Organic' && p.tags.includes('Organic')) ||
        (activeFilter === 'Gluten-Free' && p.tags.includes('Gluten-Free')) ||
        (activeFilter === 'Vegan' && p.tags.includes('Vegan'));
      const matchCat = !activeCategory || p.category === activeCategory;
      return matchSearch && matchFilter && matchCat;
    });
  }, [search, activeFilter, activeCategory]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F0F7EE' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px 60px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>
            Explore Local Products
          </h2>
          <p style={{ fontSize: 16, color: '#555', maxWidth: 560, margin: '0 auto' }}>
            From extra virgin olive oil to aged Parmigiano — discover the best of Italian tradition
          </p>
        </div>

        {/* Search + Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px',
            background: '#fff', borderRadius: 100, border: '1px solid #E8F5E9',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)', maxWidth: 500
          }}>
            <Search size={16} color="#888" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by product, producer, region..."
              style={{ border: 'none', outline: 'none', fontSize: 14, color: '#1A1A1A', flex: 1, background: 'none', fontFamily: "'DM Sans',sans-serif" }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {certFilters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                padding: '7px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: activeFilter === f ? 'none' : '1px solid #ddd',
                background: activeFilter === f ? '#2E7D32' : '#fff',
                color: activeFilter === f ? '#fff' : '#555',
                transition: 'all 0.15s'
              }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, marginBottom: 16, color: '#1A1A1A' }}>Browse by Category</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 12 }}>
            {categories.map(cat => (
              <CategoryCard
                key={cat.name}
                cat={cat}
                active={activeCategory === cat.name}
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              />
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: '#1A1A1A' }}>
              {activeCategory || 'All Products'}
            </h3>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: '#888' }}>{filtered.length} products</span>
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 24 }}>No products found</p>
              <p style={{ fontSize: 14, marginTop: 8 }}>Try a different search or filter</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}