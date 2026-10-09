import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';
import { regionData } from './regionData';
import { recipesData } from './recipesData';
import { creatorsData } from './creatorsData';
import { productsData } from './productsData';
import { ingredients } from './ingredientsData';
import { slugify } from '@/lib/catalog';
import { isPhoneNow } from '@/hooks/useIsPhone';
import AskChat from '@/mobile/AskChat';

const ASK_SUGGESTIONS = ['What wine goes with truffle?', 'Best cheese for carbonara?', 'Traditional dishes from Sicily', 'What is aceto balsamico DOP?'];

const allResults = [
  // Regions
  ...Object.entries(regionData).map(([id, r]) => ({
    type: 'Region', icon: '🗺️', label: r.name, sub: `${r.producerCount} producers · ${r.experienceCount} experiences`,
    href: `/?region=${id}`, color: '#2E7D32'
  })),
  // Recipes
  ...recipesData.map(r => ({
    type: 'Recipe', icon: '🍝', label: r.name, sub: `${r.regionName} · ${r.cookTime}`,
    href: `/recipes/${r.id}`, color: '#E65100'
  })),
  // Producers (sample)
  ...Object.values(regionData).flatMap(r => r.producers.map(p => ({
    type: 'Producer', icon: '👨‍🌾', label: p.name, sub: `${p.city} · ${p.category}`,
    href: `/producers/${slugify(p.name)}`, color: '#2E7D32'
  }))),
  // Creators
  ...creatorsData.map(c => ({
    type: 'Chef', icon: '👨‍🍳', label: c.name, sub: c.title,
    href: `/creators/${c.id}`, color: '#1565C0'
  })),
];

// Phones: search is the main way in, so it also covers products and ingredient guides.
const phoneExtras = [
  ...productsData.map(p => ({
    type: 'Product', icon: '🛒', label: p.name, sub: `${p.producer} · €${p.price.toFixed(2)}`,
    href: `/Products?q=${encodeURIComponent(p.name)}`, color: '#2E7D32'
  })),
  ...Object.values(ingredients).map(i => ({
    type: 'Ingredient', icon: '🌿', label: i.name, sub: i.regionName,
    href: `/ingredients/${i.id}`, color: '#6B8E23'
  })),
];

export default function CommandBar({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [aiQ, setAiQ] = useState(null); // phones: question sent to Ask Bottega
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setAiQ(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); isOpen ? onClose() : onClose(); }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const phone = isPhoneNow();
  const pool = phone ? [...phoneExtras, ...allResults] : allResults;
  const filtered = query.length < 1
    ? allResults.slice(0, 8)
    : pool.filter(r =>
        r.label.toLowerCase().includes(query.toLowerCase()) ||
        r.sub.toLowerCase().includes(query.toLowerCase()) ||
        r.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);

  const handleSelect = (item) => {
    navigate(item.href);
    onClose();
  };

  // Phones: the keyboard's Search key opens an exact match, otherwise asks Bottega.
  const onPhoneEnter = (e) => {
    if (!phone || e.key !== 'Enter' || !query.trim()) return;
    e.preventDefault();
    const exact = filtered.find((r) => r.label.toLowerCase() === query.trim().toLowerCase());
    if (exact) handleSelect(exact); else setAiQ(query.trim());
  };

  return (
    <div className="cmd-overlay" style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      paddingTop: '14vh'
    }} onClick={onClose}>
      <div className="cmd-panel" style={{
        background: '#111', border: '1px solid rgba(76,175,80,0.25)', borderRadius: 16,
        width: '100%', maxWidth: 580, boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', animation: 'fadeSlideIn 0.15s ease'
      }} onClick={e => e.stopPropagation()}>
        {/* Search input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {phone && aiQ ? (
            <>
              <button type="button" onClick={() => setAiQ(null)} aria-label="Back to search" style={{ background: 'none', border: 'none', color: '#81C784', padding: 4, display: 'flex', alignItems: 'center' }}><ChevronLeft size={22} /></button>
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 16, fontWeight: 700 }}><Sparkles size={16} color="#81C784" /> Ask Bottega</span>
            </>
          ) : (<>
          <Search size={16} color="rgba(255,255,255,0.4)" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={phone ? onPhoneEnter : undefined}
            enterKeyHint={phone ? 'search' : undefined}
            placeholder="Search regions, recipes, producers, chefs…"
            style={{
              flex: 1, border: 'none', background: 'none', outline: 'none',
              fontSize: 16, color: '#fff', fontFamily: "'DM Sans',sans-serif"
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4 }}>
              <X size={14} />
            </button>
          )}
          </>)}
          <button type="button" onClick={onClose} className="show-mobile" style={{ display: 'none', background: 'none', border: 'none', color: '#81C784', fontSize: 15, fontWeight: 600, padding: '8px 4px', cursor: 'pointer' }}>Cancel</button>
          <kbd style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '2px 6px' }}>ESC</kbd>
        </div>

        {phone && aiQ ? <AskChat key={aiQ} initialQuestion={aiQ} /> : (
        /* Results */
        <div className="cmd-results" style={{ maxHeight: 400, overflowY: 'auto' }}>
          {phone && (
            <>
              <button type="button" className="ask-row" onClick={() => query.trim() ? setAiQ(query.trim()) : inputRef.current?.focus()}>
                <span className="ask-row-ic"><Sparkles size={18} color="#fff" /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <strong>Ask Bottega AI</strong>
                  <span>{query.trim() ? `“${query.trim()}”` : 'Ask anything about Italian food & wine'}</span>
                </span>
                <ArrowRight size={16} color="#81C784" />
              </button>
              {!query && (
                <div className="ask-sugg">
                  {ASK_SUGGESTIONS.map((q) => <button key={q} type="button" onClick={() => setAiQ(q)}>{q}</button>)}
                </div>
              )}
            </>
          )}
          {filtered.length === 0 ? (phone ? null :
            <div style={{ padding: '32px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
              No results for "{query}"
            </div>
          ) : (
            <>
              {!query && (
                <div style={{ padding: '10px 20px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
                  SUGGESTED
                </div>
              )}
              {filtered.map((item, i) => (
                <button key={i} onClick={() => handleSelect(item)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 20px', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(76,175,80,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{item.sub}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}18`, borderRadius: 100, padding: '2px 8px' }}>{item.type}</span>
                    <ArrowRight size={12} color="rgba(255,255,255,0.2)" />
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
        )}

        {/* Footer */}
        {!(phone && aiQ) && <div style={{ padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 16 }}>
          {['🗺️ Regions', '🍝 Recipes', '👨‍🌾 Producers'].map(label => (
            <span key={label} style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: 4 }}>{label}</span>
          ))}
        </div>}
      </div>
    </div>
  );
}