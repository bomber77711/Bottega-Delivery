import { Link } from 'react-router-dom';
import { recipesData } from './recipesData';
import { regionData } from './regionData';

// ── Static entity lookup maps ──────────────────────────────────────────────

const regionImages = {
  toscana: '/img/lib/r-toscana.webp',
  lombardia: '/img/lib/r-lombardia.webp',
  sicilia: '/img/lib/r-sicilia.webp',
  campania: '/img/lib/r-campania.webp',
  veneto: '/img/lib/r-veneto.webp',
  piemonte: '/img/lib/r-piemonte.webp',
  puglia: '/img/lib/r-puglia.webp',
  emilia_romagna: '/img/lib/r-emilia.webp',
  lazio: '/img/u/1552832230-c0197dd311b5-400.webp',
  sardegna: '/img/lib/r-sardegna.webp',
  liguria: '/img/u/1499678329028-101435549a4e-400.webp',
  calabria: '/img/lib/r-calabria.webp',
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
  'caseificio-salvo': '/img/u/1486297678162-eb2a19b0a32d-300.webp',
  'caseificio-gennari': '/img/u/1486297678162-eb2a19b0a32d-300.webp',
  'caseificio-lombardo': '/img/u/1486297678162-eb2a19b0a32d-300.webp',
  'caseificio-vannulo': '/img/u/1486297678162-eb2a19b0a32d-300.webp',
  'acetaia-malpighi': '/img/products/balsamico-malpighi.webp',
  'frantoio-franci': '/img/u/1474979266404-7eaacbcd87c5-300.webp',
  'frantoio-roi': '/img/u/1474979266404-7eaacbcd87c5-300.webp',
  'tartufi-morra': '/img/products/tartufo-morra.webp',
  'pesto-rossi': '/img/products/pesto-rossi.webp',
  'gustarosso': '/img/products/sanmarzano-gustarosso.webp',
  'prosciuttificio-san-nicola': '/img/u/1625938144755-652e08e359b7-300.webp',
  'formaggi-argiolas': '/img/u/1486297678162-eb2a19b0a32d-300.webp',
  'pastificio-cavalieri': '/img/u/1555949258-eb67b1ef0ceb-300.webp',
  'riseria-costanzo': '/img/products/riso-costanzo.webp',
  'olio-callipo': '/img/u/1474979266404-7eaacbcd87c5-300.webp',
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
  'pecorino-romano': '/img/u/1486297678162-eb2a19b0a32d-300.webp',
  'parmigiano-reggiano': '/img/u/1486297678162-eb2a19b0a32d-300.webp',
  'tartufo-bianco-alba': '/img/products/tartufo-morra.webp',
  'mozzarella-di-bufala': '/img/u/1486297678162-eb2a19b0a32d-300.webp',
  'san-marzano': '/img/products/sanmarzano-gustarosso.webp',
  'pesto-genovese': '/img/products/pesto-rossi.webp',
  'nduja': '/img/products/nduja-toraldo.webp',
  'aceto-balsamico': '/img/products/balsamico-malpighi.webp',
  'olio-extra-vergine': '/img/u/1474979266404-7eaacbcd87c5-300.webp',
  'prosciutto-di-parma': '/img/u/1625938144755-652e08e359b7-300.webp',
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
