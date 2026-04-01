import { Link } from 'react-router-dom';
import { recipesData } from './recipesData';
import { regionData } from './regionData';

// ── Static entity lookup maps ──────────────────────────────────────────────

const regionImages = {
  toscana: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=70',
  lombardia: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&q=70',
  sicilia: 'https://images.unsplash.com/photo-1523365280197-f1783db9fe62?w=400&q=70',
  campania: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&q=70',
  veneto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70',
  piemonte: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70',
  puglia: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=70',
  emilia_romagna: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=70',
  lazio: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=70',
  sardegna: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=70',
  liguria: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=400&q=70',
  calabria: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&q=70',
};

const producerNames = {
  'caseificio-salvo': 'Caseificio Salvo',
  'caseificio-gennari': 'Caseificio Gennari',
  'caseificio-lombardo': 'Caseificio Lombardo',
  'caseificio-vannulo': 'Caseificio Vannulo',
  'acetaia-malpighi': 'Acetaia Malpighi',
  'frantoio-franci': 'Frantoio Franci',
  'frantoio-roi': 'Frantoio Roi',
  'tartufi-morra': 'Tartufi Morra',
  'pesto-rossi': 'Pesto Rossi',
  'gustarosso': 'Gustarosso',
  'prosciuttificio-san-nicola': 'Prosciuttificio San Nicola',
  'formaggi-argiolas': 'Formaggi Argiolas',
  'pastificio-cavalieri': 'Pastificio Cavalieri',
  'riseria-costanzo': 'Riseria Costanzo',
  'salumeria-toraldo': 'Salumeria Toraldo',
  'olio-callipo': 'Olio Callipo',
};

const producerImages = {
  'caseificio-salvo': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'caseificio-gennari': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'caseificio-lombardo': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'caseificio-vannulo': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'acetaia-malpighi': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=70',
  'frantoio-franci': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=70',
  'frantoio-roi': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=70',
  'tartufi-morra': 'https://images.unsplash.com/photo-1609501676614-6f01f0f3d0ea?w=300&q=70',
  'pesto-rossi': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&q=70',
  'gustarosso': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=70',
  'prosciuttificio-san-nicola': 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=300&q=70',
  'formaggi-argiolas': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'pastificio-cavalieri': 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=300&q=70',
  'riseria-costanzo': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=70',
  'olio-callipo': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=70',
};

const ingredientNames = {
  'pecorino-romano': 'Pecorino Romano DOP',
  'parmigiano-reggiano': 'Parmigiano Reggiano DOP',
  'tartufo-bianco-alba': "Tartufo Bianco d'Alba",
  'mozzarella-di-bufala': 'Mozzarella di Bufala',
  'san-marzano': 'San Marzano DOP',
  'pesto-genovese': 'Pesto Genovese DOP',
  'nduja': 'Nduja di Spilinga',
  'aceto-balsamico': 'Aceto Balsamico DOP',
  'olio-extra-vergine': 'Olio Extra Vergine',
  'prosciutto-di-parma': 'Prosciutto di Parma',
};

const ingredientImages = {
  'pecorino-romano': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'parmigiano-reggiano': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'tartufo-bianco-alba': 'https://images.unsplash.com/photo-1609501676614-6f01f0f3d0ea?w=300&q=70',
  'mozzarella-di-bufala': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=70',
  'san-marzano': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=70',
  'pesto-genovese': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&q=70',
  'nduja': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=70',
  'aceto-balsamico': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=70',
  'olio-extra-vergine': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=70',
  'prosciutto-di-parma': 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=300&q=70',
};

// ── Gastronomy Graph ───────────────────────────────────────────────────────

const gastronomyGraph = {
  ingredients: {
    'pecorino-romano': {
      regions: ['lazio'],
      recipes: ['cacio-e-pepe', 'trofie-al-pesto'],
      producers: ['caseificio-salvo', 'formaggi-argiolas'],
      pairings: ['Black Pepper', 'Guanciale', 'Pasta', 'Chianti', 'Honey'],
    },
    'parmigiano-reggiano': {
      regions: ['emilia_romagna'],
      recipes: ['tagliatelle-ragu', 'risotto-milanese', 'tajarin-tartufo'],
      producers: ['caseificio-gennari', 'caseificio-lombardo'],
      pairings: ['Prosciutto di Parma', 'Balsamic Vinegar', 'Pasta', 'Lambrusco'],
    },
    'tartufo-bianco-alba': {
      regions: ['piemonte'],
      recipes: ['tajarin-tartufo'],
      producers: ['tartufi-morra'],
      pairings: ['Tajarin', 'Butter', 'Parmigiano Reggiano', 'Risotto', 'Eggs'],
    },
    'mozzarella-di-bufala': {
      regions: ['campania'],
      recipes: ['pizza-margherita'],
      producers: ['caseificio-vannulo'],
      pairings: ['San Marzano', 'Basil', 'Olive Oil'],
    },
    'san-marzano': {
      regions: ['campania'],
      recipes: ['tagliatelle-ragu', 'pasta-alla-norma'],
      producers: ['gustarosso'],
      pairings: ['Mozzarella di Bufala', 'Basil', 'Olive Oil', 'Pasta'],
    },
    'pesto-genovese': {
      regions: ['liguria'],
      recipes: ['trofie-al-pesto'],
      producers: ['pesto-rossi', 'frantoio-roi'],
      pairings: ['Trofie', 'Focaccia', 'Burrata', 'Pecorino'],
    },
    'nduja': {
      regions: ['calabria'],
      recipes: ['pasta-nduja'],
      producers: ['salumeria-toraldo'],
      pairings: ['Burrata', 'Bruschetta', 'Pasta'],
    },
    'aceto-balsamico': {
      regions: ['emilia_romagna'],
      recipes: ['tagliatelle-ragu'],
      producers: ['acetaia-malpighi'],
      pairings: ['Parmigiano Reggiano', 'Prosciutto di Parma', 'Fragole'],
    },
    'prosciutto-di-parma': {
      regions: ['emilia_romagna'],
      producers: ['prosciuttificio-san-nicola'],
      pairings: ['Parmigiano Reggiano', 'Melon', 'Figs', 'Balsamic'],
    },
    'olio-extra-vergine': {
      regions: ['toscana'],
      producers: ['frantoio-franci', 'frantoio-roi'],
      pairings: ['Bread', 'Salad', 'Pasta', 'Grilled Vegetables'],
    },
  },

  recipes: {
    'cacio-e-pepe': {
      regions: ['lazio'],
      ingredients: ['pecorino-romano'],
      producers: ['caseificio-salvo', 'pastificio-cavalieri'],
      related: ['tagliatelle-ragu', 'trofie-al-pesto'],
    },
    'tagliatelle-ragu': {
      regions: ['emilia_romagna'],
      ingredients: ['parmigiano-reggiano', 'san-marzano', 'prosciutto-di-parma'],
      producers: ['caseificio-gennari', 'prosciuttificio-san-nicola', 'gustarosso'],
      related: ['cacio-e-pepe', 'risotto-milanese'],
    },
    'risotto-milanese': {
      regions: ['lombardia'],
      ingredients: ['parmigiano-reggiano'],
      producers: ['caseificio-lombardo', 'riseria-costanzo'],
      related: ['tajarin-tartufo', 'trofie-al-pesto'],
    },
    'trofie-al-pesto': {
      regions: ['liguria'],
      ingredients: ['pesto-genovese', 'pecorino-romano'],
      producers: ['pesto-rossi', 'frantoio-roi'],
      related: ['cacio-e-pepe', 'pasta-alla-norma'],
    },
    'pasta-alla-norma': {
      regions: ['sicilia'],
      ingredients: ['san-marzano'],
      producers: ['gustarosso', 'olio-callipo'],
      related: ['tagliatelle-ragu'],
    },
    'tajarin-tartufo': {
      regions: ['piemonte'],
      ingredients: ['tartufo-bianco-alba', 'parmigiano-reggiano'],
      producers: ['tartufi-morra', 'caseificio-gennari'],
      related: ['risotto-milanese', 'cacio-e-pepe'],
    },
    'pizza-margherita': {
      regions: ['campania'],
      ingredients: ['mozzarella-di-bufala', 'san-marzano'],
      producers: ['caseificio-vannulo', 'gustarosso'],
      related: ['pasta-alla-norma'],
    },
  },

  producers: {
    'caseificio-gennari': {
      regions: ['emilia_romagna'],
      recipes: ['tagliatelle-ragu', 'risotto-milanese', 'tajarin-tartufo'],
      ingredients: ['parmigiano-reggiano'],
    },
    'acetaia-malpighi': {
      regions: ['emilia_romagna'],
      recipes: ['tagliatelle-ragu'],
      ingredients: ['aceto-balsamico'],
    },
    'frantoio-franci': {
      regions: ['toscana'],
      recipes: ['trofie-al-pesto', 'pasta-alla-norma'],
      ingredients: ['olio-extra-vergine'],
    },
    'tartufi-morra': {
      regions: ['piemonte'],
      recipes: ['tajarin-tartufo'],
      ingredients: ['tartufo-bianco-alba'],
    },
    'caseificio-vannulo': {
      regions: ['campania'],
      recipes: ['pizza-margherita'],
      ingredients: ['mozzarella-di-bufala'],
    },
    'pesto-rossi': {
      regions: ['liguria'],
      recipes: ['trofie-al-pesto'],
      ingredients: ['pesto-genovese'],
    },
    'gustarosso': {
      regions: ['campania'],
      recipes: ['tagliatelle-ragu', 'pasta-alla-norma', 'pizza-margherita'],
      ingredients: ['san-marzano'],
    },
    'caseificio-salvo': {
      regions: ['lazio'],
      recipes: ['cacio-e-pepe'],
      ingredients: ['pecorino-romano'],
    },
    'prosciuttificio-san-nicola': {
      regions: ['emilia_romagna'],
      recipes: ['tagliatelle-ragu'],
      ingredients: ['prosciutto-di-parma'],
    },
  },

  regions: {
    toscana: {
      producers: ['frantoio-franci'],
      recipes: ['trofie-al-pesto'],
      ingredients: ['olio-extra-vergine'],
    },
    emilia_romagna: {
      producers: ['caseificio-gennari', 'prosciuttificio-san-nicola', 'acetaia-malpighi'],
      recipes: ['tagliatelle-ragu'],
      ingredients: ['parmigiano-reggiano', 'prosciutto-di-parma', 'aceto-balsamico'],
    },
    piemonte: {
      producers: ['tartufi-morra'],
      recipes: ['tajarin-tartufo'],
      ingredients: ['tartufo-bianco-alba'],
    },
    campania: {
      producers: ['caseificio-vannulo', 'gustarosso'],
      recipes: ['pizza-margherita'],
      ingredients: ['mozzarella-di-bufala', 'san-marzano'],
    },
    lazio: {
      producers: ['caseificio-salvo'],
      recipes: ['cacio-e-pepe'],
      ingredients: ['pecorino-romano'],
    },
    liguria: {
      producers: ['pesto-rossi', 'frantoio-roi'],
      recipes: ['trofie-al-pesto'],
      ingredients: ['pesto-genovese'],
    },
    sicilia: {
      producers: ['olio-callipo'],
      recipes: ['pasta-alla-norma'],
      ingredients: ['san-marzano'],
    },
    lombardia: {
      producers: ['caseificio-lombardo', 'riseria-costanzo'],
      recipes: ['risotto-milanese'],
      ingredients: ['parmigiano-reggiano'],
    },
  },
};

// ── Entity resolver ────────────────────────────────────────────────────────

function resolveEntity(type, id) {
  if (type === 'recipes') {
    const r = recipesData.find(x => x.id === id);
    if (!r) return null;
    return { name: r.name, image: r.image, subtitle: r.regionName, path: `/recipes/${id}` };
  }
  if (type === 'regions') {
    const r = regionData[id];
    if (!r) return null;
    return { name: r.name, image: regionImages[id], subtitle: `${r.producerCount} producers`, path: `/regions/${id}` };
  }
  if (type === 'producers') {
    const name = producerNames[id];
    if (!name) return null;
    return { name, image: producerImages[id], subtitle: 'Artisan Producer', path: `/producers/${id}` };
  }
  if (type === 'ingredients') {
    const name = ingredientNames[id];
    if (!name) return null;
    return { name, image: ingredientImages[id], subtitle: 'Italian Ingredient', path: `/ingredients/${id}` };
  }
  return null;
}

const TYPE_LABELS = {
  recipes: 'Recipe',
  regions: 'Region',
  producers: 'Producer',
  ingredients: 'Ingredient',
};

// ── NetworkCard ────────────────────────────────────────────────────────────

function NetworkCard({ type, id }) {
  const entity = resolveEntity(type, id);
  if (!entity) return null;
  return (
    <Link to={entity.path} style={{ textDecoration: 'none', flexShrink: 0, width: 150 }}>
      <div
        style={{ borderRadius: 10, overflow: 'hidden', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', transition: 'transform 0.18s ease, box-shadow 0.18s ease', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div style={{ width: '100%', height: 90, overflow: 'hidden', background: '#E8F5E9', position: 'relative' }}>
          {entity.image && (
            <img src={entity.image} alt={entity.name} loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>
        <div style={{ padding: '9px 11px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: '#2E7D32', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{TYPE_LABELS[type]}</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3 }}>{entity.name}</span>
          {entity.subtitle && <span style={{ fontSize: 10, color: '#888' }}>{entity.subtitle}</span>}
        </div>
      </div>
    </Link>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function GastronomyNetwork({ entityType, entityId }) {
  const connections = gastronomyGraph[entityType]?.[entityId];
  if (!connections) return null;

  const sections = [];
  if (connections.regions?.length) sections.push({ key: 'regions', title: '📍 Regions', ids: connections.regions, type: 'regions' });
  if (connections.recipes?.length) sections.push({ key: 'recipes', title: '🍝 Recipes', ids: connections.recipes, type: 'recipes' });
  if (connections.producers?.length) sections.push({ key: 'producers', title: '👨‍🌾 Producers', ids: connections.producers, type: 'producers' });
  if (connections.ingredients?.length) sections.push({ key: 'ingredients', title: '🫒 Ingredients', ids: connections.ingredients, type: 'ingredients' });
  if (connections.related?.length) sections.push({ key: 'related', title: '🍽 Related Recipes', ids: connections.related, type: 'recipes' });

  const hasSections = sections.length > 0 || connections.pairings?.length > 0;
  if (!hasSections) return null;

  return (
    <section style={{ background: '#F0F7EE', borderRadius: 16, padding: '36px 32px', margin: '32px 0' }}>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 600, color: '#2E7D32', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
        GASTRONOMY NETWORK
      </span>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: '#1A1A1A', margin: '0 0 6px' }}>
        Explore the Connections
      </h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#555', margin: '0 0 28px' }}>
        Everything on Bottega is connected. Follow the network to discover more.
      </p>

      {sections.map(section => (
        <div key={section.key} style={{ marginBottom: 28 }}>
          <h4 style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px' }}>
            {section.title}
          </h4>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {section.ids.map(id => <NetworkCard key={id} type={section.type} id={id} />)}
          </div>
        </div>
      ))}

      {connections.pairings?.length > 0 && (
        <div>
          <h4 style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px' }}>
            🔗 Pairs Well With
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {connections.pairings.map(p => (
              <span key={p} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, background: '#fff', color: '#2E7D32', border: '1.5px solid #C8E6C9', borderRadius: 100, padding: '6px 14px' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}