import { useState, useMemo } from 'react';
import { storiesData, storyCategories } from '../components/storiesData';
import { Clock, Tag } from 'lucide-react';

const categoryColors = {
  'Producer Story': { bg: '#E8F5E9', text: '#2E7D32' },
  'Regional Culture': { bg: '#E3F2FD', text: '#1565C0' },
  'Traditional Recipe': { bg: '#FFF3E0', text: '#E65100' },
  'Food History': { bg: '#F3E5F5', text: '#6A1B9A' },
};

function StoryCard({ story }) {
  const colors = categoryColors[story.category] || { bg: '#F5F5F5', text: '#555' };
  return (
    <div style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
      <div style={{ height: story.tall ? 260 : 200, overflow: 'hidden' }}>
        <img src={story.image} alt={story.title} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
      </div>
      <div style={{ padding: '16px 18px 20px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ background: colors.bg, color: colors.text, borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{story.category}</span>
          {story.region && (
            <span style={{ fontSize: 11, color: '#888', display: 'flex', alignItems: 'center', gap: 3 }}>
              <Tag size={9} /> {story.region}
            </span>
          )}
        </div>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 8 }}>
          {story.title}
        </h3>
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 12, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {story.excerpt}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#888', fontSize: 11 }}>
            <Clock size={11} /> {story.readTime}
          </div>
          <button style={{
            background: 'none', border: 'none', color: '#2E7D32', fontSize: 12,
            fontWeight: 600, cursor: 'pointer', padding: 0
          }}>Read Story →</button>
        </div>
      </div>
    </div>
  );
}

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() =>
    activeCategory === 'All' ? storiesData : storiesData.filter(s => s.category === activeCategory),
    [activeCategory]
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#FAF6F0' }}>
      {/* Header */}
      <div style={{ padding: '52px 32px 40px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2E7D32', display: 'block', marginBottom: 12 }}>
            EDITORIAL
          </span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 700, color: '#1A1A1A', marginBottom: 10, lineHeight: 1.1 }}>
            Italian Gastronomy Stories
          </h1>
          <p style={{ fontSize: 16, color: '#555', marginBottom: 28, maxWidth: 540 }}>
            The people, places, and traditions behind Italy's greatest food culture.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {storyCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '7px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: activeCategory === cat ? '#1A1A1A' : '#fff',
                color: activeCategory === cat ? '#fff' : '#555',
                border: activeCategory === cat ? 'none' : '1px solid #ddd',
                transition: 'all 0.15s'
              }}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 32px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {filtered.map(s => <StoryCard key={s.id} story={s} />)}
        </div>
      </div>
    </div>
  );
}