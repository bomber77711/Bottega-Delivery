import { useState } from 'react';
import { Link } from 'react-router-dom';
import { recipesData } from '../components/recipesData';
import { experiencesData } from '../components/experiencesData';
import { storiesData } from '../components/storiesData';
import { creatorsData } from '../components/creatorsData';
import { ChefHat, MapPin, BookOpen } from 'lucide-react';

const feedPosts = [
  { type: 'recipe', id: 'cacio-e-pepe' },
  { type: 'producer', id: 'frantoio-franci', name: 'Frantoio Franci', region: 'Tuscany', producerId: 'frantoio-franci', specialty: 'Olive Oil', description: 'Cold-pressed extra virgin oils from the Tuscan hills since 1958.', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80' },
  { type: 'experience', id: 'e1' },
  { type: 'recipe', id: 'tagliatelle-ragu' },
  { type: 'producer', id: 'acetaia-malpighi', name: 'Acetaia Malpighi', region: 'Emilia-Romagna', producerId: 'acetaia-malpighi', specialty: 'Balsamic Vinegar', description: 'Traditional balsamic vinegar of Modena aged 12–25 years in successive barrels.', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80' },
  { type: 'story', id: 's1' },
  { type: 'recipe', id: 'pasta-alla-norma' },
  { type: 'experience', id: 'e9' },
];

function RecipePost({ recipe }) {
  const creator = creatorsData.find(c => c.id === recipe.creator.id);
  return (
    <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'all 0.2s ease' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
        <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
          <img src={recipe.image} alt={recipe.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <span style={{ background: '#E65100', color: '#fff', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>🍝 New Recipe</span>
          </div>
        </div>
        <div style={{ padding: '16px 18px' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>{recipe.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#E65100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChefHat size={11} color="#fff" />
              </div>
              <span style={{ fontSize: 12, color: '#666' }}>{recipe.creator.name}</span>
            </div>
            <span style={{ background: '#E8F5E9', color: '#2E7D32', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{recipe.regionName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProducerPost({ post }) {
  return (
    <Link to={`/producers/${post.producerId}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'all 0.2s ease' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
        <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
          <img src={post.image} alt={post.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <span style={{ background: '#2E7D32', color: '#fff', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>👨‍🌾 Producer Spotlight</span>
          </div>
        </div>
        <div style={{ padding: '16px 18px' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{post.name}</h3>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            <span style={{ background: '#E8F5E9', color: '#2E7D32', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{post.region}</span>
            <span style={{ background: '#F5F5F5', color: '#555', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{post.specialty}</span>
          </div>
          <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{post.description}</p>
        </div>
      </div>
    </Link>
  );
}

function ExperiencePost({ experience }) {
  if (!experience) return null;
  return (
    <Link to={`/Experiences`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'all 0.2s ease' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
        <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
          <img src={experience.image} alt={experience.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <span style={{ background: '#C1440E', color: '#fff', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>🗺️ New Experience</span>
          </div>
        </div>
        <div style={{ padding: '16px 18px' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{experience.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ background: '#FBE9E7', color: '#C1440E', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>{experience.type}</span>
              <span style={{ background: '#F5F5F5', color: '#555', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={9} />{experience.region}</span>
            </div>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 700, color: '#C1440E' }}>{experience.priceLabel}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function StoryPost({ story }) {
  if (!story) return null;
  return (
    <Link to={`/Stories`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'all 0.2s ease' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
        <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
          <img src={story.image} alt={story.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <span style={{ background: '#1A1A1A', color: '#fff', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>📖 New Story</span>
          </div>
        </div>
        <div style={{ padding: '16px 18px' }}>
          <p style={{ background: '#F5F5F5', color: '#555', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 700, display: 'inline-block', marginBottom: 6 }}>{story.category}</p>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, lineHeight: 1.3 }}>{story.title}</h3>
          <p style={{ fontSize: 12, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}><BookOpen size={10} /> {story.readTime}</p>
        </div>
      </div>
    </Link>
  );
}

const filterTabs = ['All', 'Recipes', 'Producers', 'Experiences', 'Stories'];

export default function Discover() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visiblePosts = feedPosts.filter(post => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Recipes') return post.type === 'recipe';
    if (activeFilter === 'Producers') return post.type === 'producer';
    if (activeFilter === 'Experiences') return post.type === 'experience';
    if (activeFilter === 'Stories') return post.type === 'story';
    return true;
  });

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#FAF6F0' }}>
      <div style={{ padding: '48px 32px 32px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Discover</h1>
          <p style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>New recipes, producer stories, and gastronomy finds from the Bottega community.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {filterTabs.map(tab => (
              <button key={tab} onClick={() => setActiveFilter(tab)} style={{
                padding: '7px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: activeFilter === tab ? '#1A1A1A' : '#fff',
                color: activeFilter === tab ? '#fff' : '#555',
                border: activeFilter === tab ? 'none' : '1px solid #ddd',
                transition: 'all 0.15s'
              }}>{tab}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 32px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {visiblePosts.map((post, i) => {
            if (post.type === 'recipe') {
              const r = recipesData.find(x => x.id === post.id);
              return r ? <RecipePost key={i} recipe={r} /> : null;
            }
            if (post.type === 'producer') return <ProducerPost key={i} post={post} />;
            if (post.type === 'experience') {
              const e = experiencesData.find(x => x.id === post.id);
              return e ? <ExperiencePost key={i} experience={e} /> : null;
            }
            if (post.type === 'story') {
              const s = storiesData.find(x => x.id === post.id);
              return s ? <StoryPost key={i} story={s} /> : null;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}