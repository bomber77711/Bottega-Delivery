import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productsData, categories } from '../components/productsData';
import { regionData } from '../components/regionData';
import { useCart } from '../components/cartStore';
import SmartImage from '../components/SmartImage';
import { searchProducts } from '@/lib/catalog';
import { Search, ShoppingCart, Check, X, SlidersHorizontal } from 'lucide-react';

// Filters live in the URL (?q=&category=&region=&cert=&sort=) so the map, search and
// shared links can deep-link straight into a filtered catalogue.
const CERT_FILTERS = ['All', 'DOP/IGP', 'Organic', 'Gluten-Free', 'Vegan'];
const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name A–Z' },
];
const PDO = ['DOP', 'IGP', 'DOCG', 'DOC'];

const CERT_COLORS = {
  DOP: { bg: '#FFF3E0', text: '#E65100' },
  IGP: { bg: '#E8F5E9', text: '#2E7D32' },
  DOCG: { bg: '#EDE7F6', text: '#4527A0' },
  DOC: { bg: '#E3F2FD', text: '#1565C0' },
};
const categoryByName = Object.fromEntries(categories.map((c) => [c.name, c]));

function CertBadge({ cert }) {
  const c = CERT_COLORS[cert] || { bg: '#F5F5F5', text: '#555' };
  return <span style={{ background: c.bg, color: c.text, borderRadius: 100, padding: '2px 7px', fontSize: 10, fontWeight: 700 }}>{cert}</span>;
}

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const cat = categoryByName[product.category];

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="pr-card" style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', position: 'relative', background: '#EEF4EC' }}>
        <SmartImage src={product.image} phoneSrc={product.image?.replace(/\.webp$/, '-640.webp')} alt={product.name} emoji={cat?.emoji} tint={cat?.tint} label={product.name} />
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {product.certifications.map((c) => <CertBadge key={c} cert={c} />)}
        </div>
        <Link to={`/Products?region=${product.regionId}`} style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', borderRadius: 6, padding: '3px 8px', fontSize: 10, color: 'rgba(255,255,255,0.95)', fontWeight: 600, textDecoration: 'none' }}>
          {product.region}
        </Link>
      </div>
      <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 14, color: '#1A1A1A', margin: '0 0 3px', lineHeight: 1.3 }}>{product.name}</h4>
        <Link to={`/producers/${product.producer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`} style={{ fontSize: 12, color: '#6B8F6B', marginBottom: 8, textDecoration: 'none' }}>{product.producer}</Link>
        <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', margin: '0 0 10px' }}>{product.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
          <div style={{ whiteSpace: 'nowrap' }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>€{product.price.toFixed(2)}</span>
            <span style={{ fontSize: 11, color: '#999', marginLeft: 5 }}>{product.weight}</span>
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {product.tags.slice(0, 2).map((t) => <span key={t} style={{ background: '#E8F5E9', color: '#2E7D32', borderRadius: 100, padding: '2px 6px', fontSize: 10, fontWeight: 600 }}>{t}</span>)}
          </div>
        </div>
        <button onClick={handleAdd} aria-live="polite" style={{ width: '100%', padding: 10, borderRadius: 8, background: added ? '#1B5E20' : '#2E7D32', color: '#fff', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {added ? <><Check size={14} /> Added!</> : <><ShoppingCart size={14} /> Add to Cart</>}
        </button>
      </div>
    </article>
  );
}

function CategoryCard({ cat, count, active, onClick }) {
  return (
    <button onClick={onClick} aria-pressed={active} className="pr-cat" style={{
      borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', position: 'relative', padding: 0, cursor: 'pointer',
      border: active ? '2px solid #4CAF50' : '2px solid transparent', background: '#DDE9DA',
      boxShadow: active ? '0 0 0 3px rgba(76,175,80,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <SmartImage src={cat.image} phoneSrc={cat.image?.replace(/\.webp$/, '-640.webp')} alt="" emoji={cat.emoji} tint={cat.tint} />
      <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 65%)' }} />
      <span style={{ position: 'absolute', bottom: 9, left: 11, right: 8, color: '#fff', textAlign: 'left' }}>
        <span style={{ display: 'block', fontSize: 16, lineHeight: 1 }}>{cat.emoji}</span>
        <span style={{ display: 'block', fontSize: 12, fontWeight: 700, marginTop: 3 }}>{cat.name}</span>
        <span style={{ display: 'block', fontSize: 10, opacity: 0.75 }}>{count} item{count === 1 ? '' : 's'}</span>
      </span>
    </button>
  );
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const category = params.get('category') || '';
  const regionId = params.get('region') || '';
  const cert = params.get('cert') || 'All';
  const sort = params.get('sort') || 'featured';

  // The search box is local state for snappy typing; it's pushed to the URL after a short pause.
  const [draft, setDraft] = useState(q);
  useEffect(() => { setDraft(q); }, [q]);
  const update = (patch, { replace = true } = {}) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => { if (v && v !== 'All' && !(k === 'sort' && v === 'featured')) next.set(k, v); else next.delete(k); });
    setParams(next, { replace });
  };
  useEffect(() => {
    if (draft === q) return;
    const t = setTimeout(() => update({ q: draft.trim() }), 250);
    return () => clearTimeout(t);
  }, [draft]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    let list = searchProducts(q, { regionId: regionId || undefined, category: category || undefined }).filter((p) =>
      cert === 'All' ||
      (cert === 'DOP/IGP' && p.certifications.some((c) => PDO.includes(c))) ||
      p.tags.includes(cert),
    );
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [q, regionId, category, cert, sort]);

  const categoryCounts = useMemo(() => Object.fromEntries(categories.map((c) => [c.name, productsData.filter((p) => p.category === c.name).length])), []);
  const regionsWithProducts = useMemo(() => [...new Set(productsData.map((p) => p.regionId))].map((id) => ({ id, name: regionData[id]?.name || id })).sort((a, b) => a.name.localeCompare(b.name)), []);
  const activeFilters = [
    q && { key: 'q', label: `“${q}”` },
    category && { key: 'category', label: category },
    regionId && { key: 'region', label: regionData[regionId]?.name || regionId },
    cert !== 'All' && { key: 'cert', label: cert },
  ].filter(Boolean);
  const title = category || (regionId ? `${regionData[regionId]?.name || ''} products` : 'All Products');

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F0F7EE' }}>
      <style>{`
        .pr-card { transition: transform .2s ease, box-shadow .2s ease; }
        .pr-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important; }
        .pr-cat { transition: transform .2s ease; }
        .pr-cat:hover { transform: scale(1.03); }
        .pr-cats { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; }
        .pr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 20px; }
        .pr-wrap { max-width: 1280px; margin: 0 auto; padding: 40px 32px 72px; }
        @media (max-width: 640px) {
          .pr-wrap { padding: 24px 16px 96px; }
          .pr-cats { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 6px; }
          .pr-cats > * { flex: 0 0 132px; scroll-snap-align: start; }
          .pr-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
          .pr-title { font-size: 30px !important; }
        }
      `}</style>
      <div className="pr-wrap">
        <header style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 className="pr-title" style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 700, color: '#1A1A1A', margin: '0 0 10px' }}>Explore Local Products</h1>
          <p style={{ fontSize: 16, color: '#555', maxWidth: 560, margin: '0 auto' }}>From extra virgin olive oil to aged Parmigiano — certified Italian specialities, straight from the producers.</p>
        </header>

        {/* Search + filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          <div className="pr-controls" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <label className="pr-search" style={{ flex: '1 1 280px', maxWidth: 520, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', background: '#fff', borderRadius: 100, border: '1px solid #DDEBDD', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <Search size={16} color="#888" />
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Search by product, producer, region…" aria-label="Search products"
                style={{ border: 'none', outline: 'none', fontSize: 14, color: '#1A1A1A', flex: 1, minWidth: 0, background: 'none', fontFamily: "'DM Sans',sans-serif" }} />
              {draft && <button onClick={() => { setDraft(''); update({ q: '' }); }} aria-label="Clear search" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}><X size={15} color="#999" /></button>}
            </label>
            <select value={regionId} onChange={(e) => update({ region: e.target.value })} aria-label="Filter by region" style={{ padding: '11px 14px', borderRadius: 100, border: '1px solid #DDEBDD', background: '#fff', fontSize: 13, color: '#333', cursor: 'pointer' }}>
              <option value="">All regions</option>
              {regionsWithProducts.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <label className="pr-sort" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#555' }}>
              <SlidersHorizontal size={14} />
              <select value={sort} onChange={(e) => update({ sort: e.target.value })} aria-label="Sort products" style={{ padding: '11px 14px', borderRadius: 100, border: '1px solid #DDEBDD', background: '#fff', fontSize: 13, color: '#333', cursor: 'pointer' }}>
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          </div>
          <div className="pr-certs" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CERT_FILTERS.map((f) => (
              <button key={f} onClick={() => update({ cert: f })} aria-pressed={cert === f} style={{
                padding: '7px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: cert === f ? '1px solid #2E7D32' : '1px solid #ddd', background: cert === f ? '#2E7D32' : '#fff', color: cert === f ? '#fff' : '#555',
              }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, margin: '0 0 14px', color: '#1A1A1A' }}>Browse by Category</h2>
          <div className="pr-cats">
            {categories.map((cat) => (
              <CategoryCard key={cat.name} cat={cat} count={categoryCounts[cat.name]} active={category === cat.name}
                onClick={() => update({ category: category === cat.name ? '' : cat.name })} />
            ))}
          </div>
        </section>

        {/* Results */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: '#1A1A1A', margin: 0 }}>{title}</h2>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: '#777' }}>{filtered.length} product{filtered.length === 1 ? '' : 's'}</span>
          </div>
          {activeFilters.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
              {activeFilters.map((f) => (
                <button key={f.key} onClick={() => update({ [f.key]: '' })} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px 5px 12px', borderRadius: 100, border: '1px solid #C8E6C9', background: '#fff', color: '#2E7D32', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  {f.label} <X size={12} />
                </button>
              ))}
              <button onClick={() => setParams(new URLSearchParams(), { replace: true })} style={{ border: 'none', background: 'none', color: '#777', fontSize: 12, textDecoration: 'underline', cursor: 'pointer' }}>Clear all</button>
            </div>
          )}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '56px 16px', background: '#fff', borderRadius: 16, border: '1px dashed #CFE3CF' }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: '#333', margin: '0 0 6px' }}>No products match {q ? `“${q}”` : 'these filters'}</p>
              <p style={{ fontSize: 14, color: '#777', margin: '0 0 18px' }}>We're onboarding new producers every month. Try a broader search, or browse everything we have today.</p>
              <button onClick={() => setParams(new URLSearchParams(), { replace: true })} style={{ padding: '10px 20px', borderRadius: 100, border: 'none', background: '#2E7D32', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Show all {productsData.length} products</button>
            </div>
          ) : (
            <div className="pr-grid">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
