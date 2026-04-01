import { regionData } from './regionData';
import { MapPin, Star, ArrowLeft, ChevronRight, Calendar } from 'lucide-react';
import { getProductImage, getRegionImage } from './imageConfig';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

function StarRating({ rating }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Star size={11} fill="#F59E0B" color="#F59E0B" />
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#555', fontWeight: 500 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

function ProducerCard({ producer }) {
  const img = getRegionImage(producer.regionId) || getProductImage(producer.category);
  return (
    <div style={{
      background: '#fff', borderRadius: 10, overflow: 'hidden',
      border: '1px solid rgba(46,125,50,0.1)', transition: 'all 0.2s ease',
      boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.09)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)'; }}>
      <div style={{ height: 90, overflow: 'hidden' }}>
        <img src={img} alt={producer.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '8px 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
          <p style={{ fontWeight: 700, fontSize: 12, color: '#1A1A1A', lineHeight: 1.3, flex: 1, marginRight: 4 }}>{producer.name}</p>
          <StarRating rating={producer.rating} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 5 }}>
          <MapPin size={9} color="#888" />
          <span style={{ fontSize: 10, color: '#888' }}>{producer.city}</span>
          <span style={{ fontSize: 10, background: '#E8F5E9', color: '#2E7D32', borderRadius: 100, padding: '1px 6px', fontWeight: 600, marginLeft: 3 }}>{producer.category}</span>
        </div>
        <p style={{ fontSize: 10, color: '#666', lineHeight: 1.4, marginBottom: 6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{producer.description}</p>
        <button style={{
          width: '100%', padding: '5px 0', background: 'none', border: '1px solid #2E7D32',
          color: '#2E7D32', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#2E7D32'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#2E7D32'; }}>
          Visit Store →
        </button>
      </div>
    </div>
  );
}

function ExperienceCard({ exp }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 10, padding: '12px',
      border: '1px solid rgba(193,68,14,0.15)',
      boxShadow: '0 1px 6px rgba(0,0,0,0.05)', transition: 'all 0.2s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.09)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)'; }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <p style={{ fontWeight: 700, fontSize: 12, color: '#1A1A1A', lineHeight: 1.3, flex: 1, marginRight: 8 }}>{exp.name}</p>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, color: '#C1440E', flexShrink: 0 }}>{exp.price}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span style={{ background: '#FBE9E7', color: '#C1440E', borderRadius: 100, padding: '2px 7px', fontSize: 10, fontWeight: 600 }}>{exp.type}</span>
        <span style={{ fontSize: 10, color: '#888' }}>{exp.producer}</span>
      </div>
      <button style={{
        width: '100%', padding: '5px 0', background: '#C1440E',
        color: '#fff', border: 'none', borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s'
      }}
        onMouseEnter={e => e.currentTarget.style.background = '#A0350B'}
        onMouseLeave={e => e.currentTarget.style.background = '#C1440E'}>
        Book →
      </button>
    </div>
  );
}

export default function RegionPanel({ selectedRegion, onBack }) {
  const data = selectedRegion ? regionData[selectedRegion] : null;

  if (!data) {
    return (
      <div style={{ padding: '48px 32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', animation: 'fadeSlideIn 0.3s ease' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px',
          background: '#E8F5E9', borderRadius: 100, fontSize: 12, fontWeight: 600, color: '#2E7D32',
          marginBottom: 24, width: 'fit-content'
        }}>
          <MapPin size={12} /> Interactive Experience
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: '#1A1A1A', marginBottom: 14, lineHeight: 1.2 }}>
          Explore Italy,<br />
          <span style={{ color: '#4CAF50' }}>Region by Region</span>
        </h2>
        <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 32, maxWidth: 340 }}>
          Our interactive map lets you discover artisanal producers across all 20 Italian regions. Click any region to explore local specialties and the passionate people behind them.
        </p>
        <Link to={createPageUrl('ExploreMap')} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 22px', background: '#1A1A1A', color: '#fff',
          borderRadius: 100, fontSize: 13, fontWeight: 600, textDecoration: 'none', width: 'fit-content',
          transition: 'all 0.2s ease'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#2E7D32'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.transform = 'scale(1)'; }}>
          Open Full Map <ChevronRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', animation: 'fadeSlideIn 0.25s ease' }}>
      {/* Region header */}
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(46,125,50,0.1)', flexShrink: 0 }}>
        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none',
          cursor: 'pointer', color: '#2E7D32', fontSize: 12, fontWeight: 600, marginBottom: 12, padding: 0
        }}>
          <ArrowLeft size={12} /> Back to Italy
        </button>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>
          {data.name}
        </h2>
        <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6, marginBottom: 10 }}>{data.description}</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, background: '#E8F5E9', color: '#2E7D32', borderRadius: 100, padding: '3px 10px', fontWeight: 600 }}>
            {data.producerCount} Producers
          </span>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, background: '#FBE9E7', color: '#C1440E', borderRadius: 100, padding: '3px 10px', fontWeight: 600 }}>
            {data.experienceCount} Experiences
          </span>
        </div>
        {/* Featured products */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {data.featuredProducts.map(p => (
            <span key={p} style={{ background: '#fff', border: '1px solid rgba(46,125,50,0.2)', color: '#2E7D32', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{p}</span>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 24px' }}>
        {/* Producers */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Top Producers</p>
            <Link to={`${createPageUrl('Producers')}`} style={{ fontSize: 10, color: '#2E7D32', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {data.producers.slice(0, 2).map((p, i) => <ProducerCard key={i} producer={p} />)}
          </div>
        </div>

        {/* Experiences */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Calendar size={11} /> Food Experiences
            </p>
            <Link to={createPageUrl('Experiences')} style={{ fontSize: 10, color: '#C1440E', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {data.experiences.map((exp, i) => <ExperienceCard key={i} exp={exp} />)}
          </div>
        </div>
      </div>
    </div>
  );
}