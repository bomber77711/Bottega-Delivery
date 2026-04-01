import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ItalyMap from '../components/ItalyMap';
import { regionData } from '../components/regionData';
import { recipesData } from '../components/recipesData';
import { Sparkles, Search, MapPin, Maximize2, Minimize2, X, Star, ChevronRight, ArrowRight, Heart, Compass, Utensils, Users } from 'lucide-react';
const WIKI = {
  toscana: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/7e69b3d03_generated_image.png',
  lombardia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/5caaf3d0f_generated_image.png',
  sicilia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/48f5ee453_generated_image.png',
  campania: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/acd73822c_generated_image.png',
  veneto: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/e687e5690_generated_image.png',
  piemonte: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/fc338e179_generated_image.png',
  puglia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/45aa42495_generated_image.png',
  emilia_romagna: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/a27d2b16a_generated_image.png',
  lazio: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/d3871d123_generated_image.png',
  sardegna: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/4f83999be_generated_image.png',
  liguria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/362518852_generated_image.png',
  calabria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/ebbd6ed12_generated_image.png',
  marche: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/bf764a187_generated_image.png',
  abruzzo: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/f32d70314_generated_image.png',
  umbria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/1db533ce9_generated_image.png',
  trentino_alto_adige: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/27a95cfc3_generated_image.png',
  friuli_venezia_giulia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/3b48fadc7_generated_image.png',
  basilicata: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/7c56426f4_generated_image.png',
  molise: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/94c651f0b_generated_image.png',
  valle_daosta: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/d0c62424d_generated_image.png',
};

const foodJourneys = [
  { id: 'olive-oil-route', title: 'The Olive Oil Route', emoji: '🫒', description: 'Follow the ancient olive oil tradition from the Ligurian coast to the heel of Italy.', regions: ['liguria', 'toscana', 'puglia', 'sicilia'], color: '#D4A017' },
  { id: 'wine-journey', title: 'The Wine Journey', emoji: '🍷', description: "Italy's greatest wine regions — from Barolo in Piedmont to Brunello in Tuscany and Amarone in Veneto.", regions: ['piemonte', 'toscana', 'veneto'], color: '#7B1FA2' },
  { id: 'pasta-trail', title: 'The Pasta Trail', emoji: '🍝', description: "From Bolognese tagliatelle to Neapolitan spaghetti to Puglian orecchiette — Italy's pasta culture in three regions.", regions: ['emilia_romagna', 'campania', 'puglia'], color: '#E65100' },
];

const MAP_LAYERS = [
  { id: 'all', label: 'All' },
  { id: 'producers', label: '👨‍🌾 Producers' },
  { id: 'ingredients', label: '🫒 Ingredients' },
  { id: 'dishes', label: '🍝 Dishes' },
  { id: 'wines', label: '🍷 Wines' },
  { id: 'experiences', label: '🗺️ Experiences' },
];

const extendedDiscovery = [
  { type: 'wine',       emoji: '🍷', label: 'Wine Discovery',       name: 'Barolo DOCG',              region: 'piemonte',       subtitle: 'Piedmont' },
  { type: 'cheese',     emoji: '🧀', label: 'Artisan Cheese',       name: 'Parmigiano Reggiano DOP',  region: 'emilia_romagna', subtitle: 'Emilia-Romagna' },
  { type: 'ingredient', emoji: '🌿', label: 'Ingredient Spotlight', name: 'Pistacchio di Bronte DOP', region: 'sicilia',        subtitle: 'Sicily' },
  { type: 'experience', emoji: '🗺️', label: 'Food Experience',      name: 'Truffle Hunt — Alba',      region: 'piemonte',       subtitle: 'Piedmont' },
  { type: 'dish',       emoji: '🍝', label: 'Iconic Dish',          name: 'Trofie al Pesto',          region: 'liguria',        subtitle: 'Liguria' },
  { type: 'producer',   emoji: '👨‍🌾', label: 'Producer Spotlight',  name: 'Acetaia Malpighi',         region: 'emilia_romagna', subtitle: 'Modena' },
  { type: 'ingredient', emoji: '🫒', label: 'Ingredient Spotlight', name: 'Olio Extra Vergine DOP',   region: 'toscana',        subtitle: 'Tuscany' },
  { type: 'wine',       emoji: '🍷', label: 'Wine Discovery',       name: 'Brunello di Montalcino',   region: 'toscana',        subtitle: 'Tuscany' },
  { type: 'dish',       emoji: '🍕', label: 'Iconic Dish',          name: 'Pizza Napoletana',         region: 'campania',       subtitle: 'Campania' },
  { type: 'cheese',     emoji: '🧀', label: 'Artisan Cheese',       name: 'Mozzarella di Bufala DOP', region: 'campania',       subtitle: 'Campania' },
];



// ── Supplementary region data ──────────────────
const regionExtra = {
  toscana: { ingredients: ['Lardo di Colonnata', 'Chianina', 'Pecorino Toscano', 'Finocchiona'], tradition: 'Bistecca alla Fiorentina has anchored Florentine tables for centuries — always T-bone, always rare, always enormous.', wine: { name: 'Brunello di Montalcino', doc: 'DOCG', note: 'One of Italy\'s most celebrated reds, aged a minimum of 5 years' } },
  lombardia: { ingredients: ['Grana Padano', 'Bresaola', 'Casoncelli', 'Luganega'], tradition: 'Milan\'s risotto alla Milanese — stained golden with saffron — has been stirred continuously since the 16th century.', wine: { name: 'Franciacorta', doc: 'DOCG', note: 'Italy\'s finest metodo classico sparkling wine from glacial moraines south of Lake Iseo' } },
  sicilia: { ingredients: ['Pistacchio di Bronte', 'Capers di Pantelleria', 'Arancia Rossa', 'Tuna di Sicilia'], tradition: 'The mattanza — an ancient bluefin tuna hunt in the Egadi Islands — is one of the oldest fishing traditions still practiced in Italy.', wine: { name: 'Nero d\'Avola', doc: 'DOC', note: 'Bold, sun-baked red with notes of black cherry and dark chocolate' } },
  campania: { ingredients: ['San Marzano DOP', 'Mozzarella di Bufala', 'Limone di Sorrento', 'Colatura di Alici'], tradition: 'Pizza Napoletana is UNESCO-protected intangible heritage — dough hand-stretched only, baked in oak-fired stone ovens at 485°C.', wine: { name: 'Taurasi', doc: 'DOCG', note: 'The Barolo of the south — Aglianico aged minimum 3 years in the Campanian hills' } },
  veneto: { ingredients: ['Radicchio di Treviso', 'Asiago', 'Baccalà', 'Risi e Bisi'], tradition: 'Cicchetti — Venice\'s bar snacks — have been passed across canalside counters since the republic\'s golden age, unchanged.', wine: { name: 'Amarone della Valpolicella', doc: 'DOCG', note: 'Dried-grape Corvina aged 2+ years — one of Italy\'s most powerful reds' } },
  piemonte: { ingredients: ['Tartufo Bianco d\'Alba', 'Bra Tenero', 'Bagna Cauda', 'Agnolotti dal Plin'], tradition: 'Each November, the Alba Truffle Fair draws hunters and Michelin-starred chefs who pay thousands of euros per kilogram for the white gold.', wine: { name: 'Barolo', doc: 'DOCG', note: 'King of Italian wine — Nebbiolo aged minimum 38 months from the Langhe hills' } },
  puglia: { ingredients: ['Burrata', 'Orecchiette', 'Olive Oil DOP', 'Primitivo', 'Fave e Cicoria'], tradition: 'Orecchiette are still hand-shaped daily by the women of Bari Vecchia, a tradition passed down for generations without a single written recipe.', wine: { name: 'Primitivo di Manduria', doc: 'DOC', note: 'Deep, sun-baked reds from centuries-old ungrafted Salento vines' } },
  emilia_romagna: { ingredients: ['Parmigiano Reggiano', 'Prosciutto di Parma', 'Aceto Balsamico', 'Mortadella'], tradition: 'The Bolognese sauce (ragù) has a 1982 official notarized recipe deposited at the Bologna Chamber of Commerce.', wine: { name: 'Lambrusco di Sorbara', doc: 'DOC', note: 'Lively, violet-hued sparkling red that cuts through the region\'s richest cured meats' } },
  lazio: { ingredients: ['Pecorino Romano', 'Guanciale', 'Artichoke Romanesco', 'Ricotta di Bufala'], tradition: 'The four classical pasta sauces — Cacio e Pepe, Amatriciana, Carbonara, Gricia — form an unbreakable canon of Roman identity.', wine: { name: 'Frascati Superiore', doc: 'DOCG', note: 'Crisp golden whites from volcanic Castelli Romani hills southeast of Rome' } },
  sardegna: { ingredients: ['Pecorino Sardo', 'Bottarga', 'Pane Carasau', 'Mirto'], tradition: 'Pane Carasau — paper-thin crisp flatbread — was baked by shepherds who needed bread that lasted months during transhumance.', wine: { name: 'Cannonau di Sardegna', doc: 'DOC', note: 'Ancient Grenache linked to Sardinia\'s longevity zones; deep, spiced, and mineral' } },
  liguria: { ingredients: ['Basilico Genovese DOP', 'Olive Oil Riviera', 'Farinata', 'Acciughe di Monterosso'], tradition: 'Pesto Genovese must be made in a marble mortar — blenders are tolerated but considered a betrayal of the seven-leaf tradition.', wine: { name: 'Cinque Terre DOC', doc: 'DOC', note: 'Rare, steep-terraced whites from vertiginous Ligurian coast vineyards' } },
  calabria: { ingredients: ['\'Nduja di Spilinga', 'Bergamotto', 'Cipolla di Tropea', 'Pecorino Crotonese'], tradition: '\'Nduja — fiery, spreadable salami — was created in Spilinga as peasant food from leftover pork scraps mixed with local Calabrian chilli.', wine: { name: 'Cirò Rosso', doc: 'DOC', note: 'One of Italy\'s oldest wine zones; Gaglioppo grapes on ancient Greek-colonized soils' } },
  marche: { ingredients: ['Vincisgrassi', 'Brodetto di Pesce', 'Tartufo Nero', 'Verdicchio'], tradition: 'Vincisgrassi — Marchigian lasagne with chicken livers, sweetbreads, and béchamel — dates to a 1779 recipe named after an Austrian general.', wine: { name: 'Verdicchio dei Castelli di Jesi', doc: 'DOC', note: 'Crisp, almond-finish whites in distinctive amphora-shaped bottles' } },
  abruzzo: { ingredients: ['Zafferano DOP', 'Arrosticini', 'Pasta alla Chitarra', 'Pecorino di Farindola'], tradition: 'Arrosticini — tiny mutton skewers — are grilled on custom iron channels called fornacelle and eaten by the dozens at roadside sagre.', wine: { name: 'Montepulciano d\'Abruzzo', doc: 'DOC', note: 'Dark, velvety red from one of Italy\'s most versatile native grapes' } },
  umbria: { ingredients: ['Tartufo Nero di Norcia', 'Prosciutto di Norcia', 'Lenticchie di Castelluccio', 'Sagrantino'], tradition: 'Norcia has been synonymous with cured meats since medieval times — the Italian word for butcher, norcino, derives directly from this city.', wine: { name: 'Sagrantino di Montefalco', doc: 'DOCG', note: 'The world\'s most tannic grape — bold, inky reds aged minimum 37 months' } },
  trentino_alto_adige: { ingredients: ['Speck Alto Adige', 'Strudel di Mele', 'Schlutzkrapfen', 'Canederli'], tradition: 'Speck is cured outdoors in mountain air for a minimum of 22 weeks — a Germanic technique layered onto Italian salt and herb traditions.', wine: { name: 'Alto Adige Pinot Grigio', doc: 'DOC', note: 'Among Italy\'s finest: mineral, precise, with Alpine freshness' } },
  friuli_venezia_giulia: { ingredients: ['San Daniele DOP', 'Montasio', 'Frico', 'Ribolla Gialla'], tradition: 'Frico — crispy fried Montasio cheese with potato — is Friuli\'s most emblematic dish, a peasant staple elevated to cultural icon.', wine: { name: 'Collio Friulano', doc: 'DOC', note: 'Peachy, textured whites from rolling hills on the Slovenian border' } },
  basilicata: { ingredients: ['Peperone Crusco', 'Soppressata Lucana', 'Caciocavallo Podolico', 'Matera Bread'], tradition: 'Matera\'s Pane di Matera — a 2kg sourdough loaf baked in wood-fired ovens — has sustained the cave-dwelling population for over a millennium.', wine: { name: 'Aglianico del Vulture', doc: 'DOC', note: 'Volcanic Aglianico from Monte Vulture — austere, age-worthy, profound' } },
  molise: { ingredients: ['Caciocavallo Molisano', 'Taccozzelle', 'Trota di Molise', 'Wild Boar Salami'], tradition: 'Molise\'s transhumance routes — ancient pastoral roads called tratturi — are the longest in Europe and still occasionally walked by shepherds.', wine: { name: 'Tintilia del Molise', doc: 'DOC', note: 'A nearly extinct native grape rescued by local producers; earthy and distinctive' } },
  valle_daosta: { ingredients: ['Fontina DOP', 'Lard d\'Arnad', 'Boudin', 'Mocetta'], tradition: 'Fonduta — melted Fontina with egg yolks and white truffle — is the region\'s warming answer to the Alpine cold, stirred slowly over bain-marie.', wine: { name: 'Donnas', doc: 'DOC', note: 'Nebbiolo-based reds from Europe\'s most extreme high-altitude vineyards' } },
};

// ── Discovery cards ────────────────────────────
const discoveryCards = [
  { icon: '🍝', title: 'Dish of the Day', name: 'Cacio e Pepe', region: 'lazio' },
  { icon: '🧀', title: 'Regional Ingredient', name: 'Parmigiano Reggiano', region: 'emilia_romagna' },
  { icon: '👨‍🌾', title: 'Producer Spotlight', name: 'Acetaia Malpighi', region: 'emilia_romagna' },
  { icon: '🍷', title: 'Wine Discovery', name: 'Barolo DOCG', region: 'piemonte' },
  { icon: '🫒', title: 'Artisan Product', name: 'Riviera Ligure DOP', region: 'liguria' },
];

// ── AI Search bar ──────────────────────────────
function AISearchBar({ onSelect, compact = false }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const suggestions = ['best cheese for pasta', 'traditional dishes from Tuscany', 'low carb Italian recipes', 'Pecorino Romano producers', 'seafood dishes from Sicily'];

  const handleInput = (val) => {
    setQuery(val);
    if (!val) { setResults([]); return; }
    const q = val.toLowerCase();
    const regionMatches = Object.entries(regionData)
      .filter(([, r]) => r.name.toLowerCase().includes(q) || r.featuredProducts.some(p => p.toLowerCase().includes(q)))
      .slice(0, 3).map(([id, r]) => ({ type: 'Region', icon: '🗺️', label: r.name, sub: r.featuredProducts.slice(0, 2).join(' · '), id }));
    const recipeMatches = (recipesData || [])
      .filter(r => r.name?.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q))
      .slice(0, 2).map(r => ({ type: 'Recipe', icon: '🍝', label: r.name, sub: r.regionName || '', id: r.id }));
    const producerMatches = Object.values(regionData)
      .flatMap(r => r.producers || [])
      .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 2).map(p => ({ type: 'Producer', icon: '👨‍🌾', label: p.name, sub: `${p.city} · ${p.category}` }));
    setResults([...regionMatches, ...recipeMatches, ...producerMatches]);
  };

  return (
    <div style={{ position: 'relative', width: compact ? 320 : '100%', maxWidth: compact ? 320 : 540 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: compact ? '10px 16px' : '10px 16px',
        borderRadius: 100, background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        border: `2px solid ${focused ? '#4CAF50' : 'rgba(200,200,200,0.5)'}`,
        boxShadow: focused ? '0 0 0 4px rgba(76,175,80,0.2), 0 4px 24px rgba(0,0,0,0.25)' : '0 4px 24px rgba(0,0,0,0.25)',
        transition: 'all 0.2s ease'
      }}>
        <Search size={13} color="#999" />
        <input ref={inputRef} value={query} onChange={e => handleInput(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Ask Bottega about Italian food…"
          style={{ border: 'none', outline: 'none', fontSize: 13, color: '#1A1A1A', flex: 1, fontFamily: "'DM Sans',sans-serif", background: 'transparent' }} />
        <Sparkles size={13} color="#4CAF50" />
      </div>
      {focused && (results.length > 0 || !query) && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8, zIndex: 300,
          background: '#fff', border: '1px solid #e8e8e8', borderRadius: 16,
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)', overflow: 'hidden'
        }}>
          {!query && <>
            <div style={{ padding: '10px 16px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#aaa', textTransform: 'uppercase' }}>Try asking</div>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => handleInput(s)} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#555', transition: 'all 0.1s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F0F7EE'; e.currentTarget.style.color = '#2E7D32'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#555'; }}>
                {s}
              </button>
            ))}
          </>}
          {results.map((r, i) => (
            <button key={i} onClick={() => { onSelect && onSelect(r); setQuery(''); setResults([]); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F0F7EE'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              <span style={{ fontSize: 16 }}>{r.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 1 }}>{r.label}</p>
                <p style={{ fontSize: 11, color: '#999' }}>{r.sub}</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#2E7D32', background: '#E8F5E9', borderRadius: 100, padding: '2px 8px' }}>{r.type}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Floating Region Panel ──────────────────────
function RegionPanel({ regionId, onClose }) {
  const navigate = useNavigate();
  
  const data = regionId ? regionData[regionId] : null;

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop — click to close */}
      {data && <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 49 }} />}

      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 380,
        zIndex: 50, pointerEvents: data ? 'all' : 'none',
        transform: data ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
        borderRadius: '16px 0 0 16px',
        boxShadow: '-4px 0 40px rgba(0,0,0,0.15)',
        overflowY: 'auto', overflowX: 'hidden',
      }}>
        {data && (
          <>
            {/* Hero image */}
            <div style={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
              <img src={(WIKI[regionId] || WIKI.toscana)} alt={data.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) saturate(1.1)' }}
                onError={e => { e.currentTarget.style.background = '#1B5E20'; e.currentTarget.style.display = 'none'; }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
              <button onClick={onClose} style={{
                position: 'absolute', top: 12, right: 12, width: 30, height: 30, borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}><X size={14} color="#333" /></button>
              <div style={{ position: 'absolute', bottom: 16, left: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <MapPin size={10} color="#4CAF50" />
                  <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Italian Region</span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{data.name}</h2>
                <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#4CAF50', fontWeight: 700 }}>{data.producerCount} Producers</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>·</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{data.experienceCount} Experiences</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '20px 20px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.75 }}>{data.description}</p>

              {/* Specialties */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                  <Utensils size={11} color="#C76A3A" />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#C76A3A', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace" }}>Regional Specialties</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {data.featuredProducts.map((p, i) => (
                    <span key={i} style={{ padding: '5px 11px', borderRadius: 100, background: i === 0 ? '#FBE9E7' : '#F0F7EE', color: i === 0 ? '#C76A3A' : '#2E7D32', fontSize: 11, fontWeight: 600 }}>{p}</span>
                  ))}
                </div>
              </div>

              {/* Top Producers */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                  <Users size={11} color="#2E7D32" />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#888', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace" }}>Top Producers</span>
                </div>
                {(data.producers || []).slice(0, 3).map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#F8FAF8', borderRadius: 10, marginBottom: 6, cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#E8F5E9'}
                    onMouseLeave={e => e.currentTarget.style.background = '#F8FAF8'}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{p.name}</p>
                      <p style={{ fontSize: 10, color: '#888', fontFamily: "'DM Mono',monospace" }}>{p.city} · {p.category}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#2E7D32', fontWeight: 600 }}>
                      {p.rating} <Star size={9} fill="#2E7D32" color="#2E7D32" />
                    </div>
                  </div>
                ))}
                <button onClick={() => navigate('/Producers')} style={{ width: '100%', padding: '9px', background: 'none', border: '1.5px solid #E8F5E9', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#2E7D32', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 4 }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F0F7EE'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  View All Producers <ChevronRight size={13} />
                </button>
              </div>

              {/* Experiences */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                  <Compass size={11} color="#C76A3A" />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#888', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace" }}>Experiences</span>
                </div>
                {(data.experiences || []).map((exp, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FBE9E7', borderRadius: 10, marginBottom: 6, cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f5d6c8'}
                    onMouseLeave={e => e.currentTarget.style.background = '#FBE9E7'}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{exp.name}</p>
                      <p style={{ fontSize: 10, color: '#C76A3A' }}>{exp.type}</p>
                    </div>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 800, color: '#C76A3A' }}>{exp.price}</span>
                  </div>
                ))}
              </div>

              {/* Iconic Ingredients */}
              {regionExtra[regionId]?.ingredients && (
                <div>
                  <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 14px' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                    <span style={{ fontSize: 11 }}>🫙</span>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#888', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace" }}>Iconic Ingredients</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {regionExtra[regionId].ingredients.map((ing, i) => (
                      <span key={i} style={{ padding: '5px 11px', borderRadius: 100, background: '#FFF8E1', color: '#E65100', fontSize: 11, fontWeight: 600, border: '1px solid rgba(230,81,0,0.15)', cursor: 'pointer' }}>{ing}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Food Tradition */}
              {regionExtra[regionId]?.tradition && (
                <div style={{ background: '#F8FAF8', borderRadius: 10, padding: '13px 14px', borderLeft: '3px solid #4CAF50' }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: '#4CAF50', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace", marginBottom: 7 }}>✦ Food Tradition</div>
                  <p style={{ fontSize: 12, color: '#444', lineHeight: 1.7, fontStyle: 'italic' }}>"{regionExtra[regionId].tradition}"</p>
                </div>
              )}

              {/* Wine Specialty */}
              {regionExtra[regionId]?.wine && (
                <div style={{ background: 'rgba(90,20,60,0.04)', borderRadius: 10, padding: '13px 14px', border: '1px solid rgba(90,20,60,0.1)' }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: '#7B1FA2', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace", marginBottom: 7 }}>🍷 Wine Specialty</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{regionExtra[regionId].wine.name}</p>
                      <p style={{ fontSize: 11, color: '#888', lineHeight: 1.6 }}>{regionExtra[regionId].wine.note}</p>
                    </div>
                    <span style={{ padding: '3px 8px', borderRadius: 6, background: '#EDE7F6', color: '#6A1B9A', fontSize: 10, fontWeight: 800, flexShrink: 0, fontFamily: "'DM Mono',monospace" }}>{regionExtra[regionId].wine.doc}</span>
                  </div>
                </div>
              )}

              {/* Save + Full Region link */}
              <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
                <button onClick={() => navigate(`/regions/${regionId}`)} style={{ flex: 1, padding: '11px', background: '#2E7D32', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1B5E20'}
                  onMouseLeave={e => e.currentTarget.style.background = '#2E7D32'}>
                  Explore Region →
                </button>
                <button style={{ padding: '11px 14px', background: '#F0F7EE', border: '1.5px solid #E8F5E9', borderRadius: 9, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <Heart size={15} color="#E53935" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ── Animated stat ──────────────────────────────
function AnimatedStat({ target, label, suffix = '' }) {
  const [v, setV] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (started.current) return; started.current = true;
      let n = 0; const step = target / 50;
      const iv = setInterval(() => { n = Math.min(n + step, target); setV(Math.round(n)); if (n >= target) clearInterval(iv); }, 25);
    }, 400);
    return () => clearTimeout(t);
  }, [target]);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{v}{suffix}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
    </div>
  );
}

// ══════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════
export default function Home() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);
  const [activeLayer, setActiveLayer] = useState('all');
  const [activeJourney, setActiveJourney] = useState(null);
  const [showJourneys, setShowJourneys] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setCardIdx(i => (i + 1) % extendedDiscovery.length), 8000);
    return () => clearInterval(t);
  }, []);

  // Exit fullscreen / deselect on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        if (selectedRegion) setSelectedRegion(null);
        if (activeJourney) setActiveJourney(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFullscreen, selectedRegion, activeJourney]);

  const handleSearchSelect = useCallback((r) => {
    if (r.type === 'Region' && r.id) setSelectedRegion(r.id);
    else if (r.type === 'Recipe' && r.id) navigate(`/recipes/${r.id}`);
    else if (r.type === 'Producer') navigate('/Producers');
  }, [navigate]);

  const activeHover = hoveredRegion ? regionData[hoveredRegion] : null;
  const card = discoveryCards[cardIdx];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F0F7EE' }}>

      {/* ══ MAP: EDGE-TO-EDGE ══ */}
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          ref={mapContainerRef}
          id="map-container"
          style={{
            position: isFullscreen ? 'fixed' : 'relative',
            top: isFullscreen ? 0 : 'auto',
            left: isFullscreen ? 0 : 'auto',
            width: isFullscreen ? '100vw' : '100%',
            height: isFullscreen ? '100vh' : 'calc(100vh - 60px)',
            margin: 0,
            padding: 0,
            borderRadius: 0,
            overflow: 'hidden',
            background: '#060D06',
            zIndex: isFullscreen ? 9999 : 1,
            boxShadow: 'none',
            transition: 'all 0.3s ease'
          }}>

          {/* Grid overlay */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, backgroundImage: 'linear-gradient(rgba(76,175,80,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,80,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          {/* Edge vignette */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(ellipse 85% 90% at 50% 50%, transparent 50%, rgba(6,13,6,0.55) 90%, rgba(6,13,6,0.8) 100%)' }} />

          {/* Map fills container */}
          <ItalyMap
            selectedRegion={selectedRegion}
            onRegionSelect={setSelectedRegion}
            onRegionHover={setHoveredRegion}
            activeLayer={activeLayer}
            activeJourney={activeJourney}
          />

          {/* ── Floating search bar ── */}
          <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 200, width: 320, maxWidth: 'calc(100% - 48px)' }}>
            <AISearchBar onSelect={handleSearchSelect} />
          </div>

          {/* ── Food Layers ── */}
          <div style={{ position: 'absolute', top: 52, left: 16, zIndex: 200, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(6,13,6,0.75)', backdropFilter: 'blur(10px)', borderRadius: 100, padding: '5px 11px', border: '1px solid rgba(76,175,80,0.2)' }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: 3 }}>Explore by</span>
            {MAP_LAYERS.map(layer => (
              <button key={layer.id} onClick={() => setActiveLayer(layer.id)} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: activeLayer === layer.id ? '#4CAF50' : 'rgba(255,255,255,0.6)',
                background: activeLayer === layer.id ? 'rgba(76,175,80,0.18)' : 'transparent',
                border: 'none', borderRadius: 100, padding: '4px 9px', cursor: 'pointer',
                fontWeight: activeLayer === layer.id ? 700 : 400, whiteSpace: 'nowrap', transition: 'all 0.15s'
              }}>{layer.label}</button>
            ))}
          </div>

          {/* ── Map top controls ── */}
          <div style={{ position: 'absolute', top: 14, left: 16, zIndex: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50', display: 'inline-block', boxShadow: '0 0 8px rgba(76,175,80,0.9)' }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(76,175,80,0.65)', textTransform: 'uppercase' }}>
              Bottega · 20 Regions Live
            </span>
          </div>

          {/* Top-right: fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(f => !f)}
            style={{ position: 'absolute', top: 12, right: selectedRegion ? 396 : 12, zIndex: 55, padding: '7px 12px', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.8)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, transition: 'right 0.32s ease' }}>
            {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            {isFullscreen ? 'Exit' : 'Full Map'}
          </button>

          {/* Active journey card — top-center below search */}
          {activeJourney && (
            <div style={{ position: 'absolute', top: 72, left: '50%', transform: 'translateX(-50%)', zIndex: 250, background: 'rgba(6,13,6,0.88)', backdropFilter: 'blur(16px)', border: `1px solid ${activeJourney.color}40`, borderRadius: 12, padding: '10px 16px', maxWidth: 420, display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeSlideIn 0.25s ease' }}>
              <span style={{ fontSize: 20 }}>{activeJourney.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{activeJourney.title}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{activeJourney.description}</p>
              </div>
              <button onClick={() => setActiveJourney(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 16, padding: 0, flexShrink: 0 }}>✕</button>
            </div>
          )}

          {/* Selected region chip */}
          {selectedRegion && (
            <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 30, display: 'flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 100, background: 'rgba(46,125,50,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(76,175,80,0.4)', animation: 'fadeSlideIn 0.2s ease' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 12, fontWeight: 700, color: '#fff' }}>{regionData[selectedRegion]?.name}</span>
              <button onClick={() => setSelectedRegion(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', display: 'flex', padding: 0, marginLeft: 2 }}><X size={11} /></button>
            </div>
          )}

          {/* Hover tooltip */}
          {activeHover && !selectedRegion && (
            <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 20, background: 'rgba(6,13,6,0.93)', backdropFilter: 'blur(16px)', border: '1px solid rgba(76,175,80,0.3)', borderRadius: 13, padding: '12px 18px', minWidth: 240, pointerEvents: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', animation: 'fadeSlideIn 0.15s ease' }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{activeHover.name}</p>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#4CAF50', marginBottom: 5 }}>{activeHover.producerCount} Producers · {activeHover.experienceCount} Experiences</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{activeHover.featuredProducts.slice(0, 3).join(' · ')}</p>
              <p style={{ fontSize: 10, color: 'rgba(76,175,80,0.65)', marginTop: 6, fontWeight: 600 }}>Click to explore →</p>
            </div>
          )}

          {!activeHover && !selectedRegion && (
            <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'none' }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Hover a region · Click to explore</p>
            </div>
          )}

          {/* Food Journeys widget — bottom-left */}
          <div style={{ position: 'absolute', bottom: 200, left: 18, zIndex: 20, minWidth: 220 }}>
            <div style={{ background: 'rgba(6,13,6,0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: 12, padding: '10px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showJourneys ? 8 : 0 }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>🇮🇹 Food Journeys</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {activeJourney && <button onClick={() => setActiveJourney(null)} style={{ fontSize: 10, color: '#E57373', background: 'none', border: '1px solid rgba(229,115,115,0.4)', borderRadius: 100, padding: '2px 8px', cursor: 'pointer' }}>Clear</button>}
                  <button onClick={() => setShowJourneys(j => !j)} style={{ fontSize: 10, color: '#4CAF50', background: 'none', border: '1px solid rgba(76,175,80,0.4)', borderRadius: 100, padding: '2px 9px', cursor: 'pointer' }}>{showJourneys ? 'Close' : 'Explore'}</button>
                </div>
              </div>
              {activeJourney && !showJourneys && (
                <p style={{ fontSize: 10, color: activeJourney.color, fontFamily: "'DM Mono',monospace", marginTop: 4 }}>{activeJourney.emoji} {activeJourney.title}</p>
              )}
              {showJourneys && foodJourneys.map(j => (
                <div key={j.id} onClick={() => { setActiveJourney(activeJourney?.id === j.id ? null : j); setShowJourneys(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'opacity 0.15s', opacity: activeJourney?.id === j.id ? 1 : 0.85 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = activeJourney?.id === j.id ? '1' : '0.85'}>
                  <span style={{ fontSize: 18 }}>{j.emoji}</span>
                  <div>
                    <p style={{ fontSize: 12, color: '#fff', fontWeight: 500, marginBottom: 2 }}>{j.title}</p>
                    <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono',monospace" }}>{j.regions.map(r => regionData[r]?.name).join(' → ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discovery card — bottom-left (below journeys) */}
          {(() => {
            const card = extendedDiscovery[cardIdx % extendedDiscovery.length];
            return (
              <div style={{ position: 'absolute', bottom: 20, left: 18, zIndex: 20 }}>
                <div style={{ background: 'rgba(6,13,6,0.88)', backdropFilter: 'blur(16px)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: 14, padding: '12px 14px', width: 210, cursor: 'pointer', transition: 'border-color 0.2s, opacity 0.3s', animation: 'fadeSlideIn 0.3s ease' }}
                  onClick={() => setSelectedRegion(card.region)}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(76,175,80,0.45)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(76,175,80,0.2)'}>
                  <p style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", fontWeight: 700, color: 'rgba(76,175,80,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 7 }}>✦ {card.label}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ fontSize: 20 }}>{card.emoji}</span>
                    <div>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{card.name}</p>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono',monospace" }}>{card.subtitle}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 8, justifyContent: 'center' }}>
                    {extendedDiscovery.map((_, i) => (<span key={i} onClick={e => { e.stopPropagation(); setCardIdx(i); }} style={{ width: i === cardIdx ? 14 : 5, height: 3, borderRadius: 2, background: i === cardIdx ? '#4CAF50' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.2s' }} />))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Bottom legend */}
          <div style={{ position: 'absolute', bottom: 16, right: 16, zIndex: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            {[['#132513', 'Low'], ['#1E3E1E', ''], ['#2E7D32', ''], ['#2D5A2D', ''], ['#43A047', 'High']].map(([c, l], i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ width: i === 0 || i === 4 ? 14 : 10, height: 8, borderRadius: 2, background: c, display: 'inline-block' }} />
                {l && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: "'DM Mono',monospace", textTransform: 'uppercase' }}>{l}</span>}
              </span>
            ))}
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginLeft: 4 }}>450 Producers · 80+ Experiences</span>
          </div>

          {/* Floating Region Panel */}
          <RegionPanel regionId={selectedRegion} onClose={() => setSelectedRegion(null)} />
        </div>
      </div>

      {/* ══ SECTION 3: DISCOVERY CARDS ══ */}
      <div style={{ padding: '32px 20px', maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Today's Discoveries</h2>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>Curated gastronomy moments from across Italy</p>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8 }}>
          {[
            { emoji: '🍝', cat: 'Dish of the Day', name: 'Cacio e Pepe', region: 'Lazio', path: '/Recipes', color: '#FFF3E0', accent: '#E65100' },
            { emoji: '👨‍🌾', cat: 'Producer Spotlight', name: 'Acetaia Malpighi', region: 'Modena', path: '/Producers', color: '#E8F5E9', accent: '#2E7D32' },
            { emoji: '🧀', cat: 'Regional Ingredient', name: 'Parmigiano Reggiano', region: 'Emilia-Romagna', path: '/Producers', color: '#FBE9E7', accent: '#C76A3A' },
            { emoji: '🗺️', cat: 'Experience of the Day', name: 'Alba Truffle Hunt', region: 'Piedmont · €120', path: '/Experiences', color: '#FBE9E7', accent: '#C76A3A' },
            { emoji: '📖', cat: 'Story Highlight', name: 'The Last Rice Farmers of Monferrato', region: 'Piedmont', path: '/Stories', color: '#F3E5F5', accent: '#6A1B9A' },
          ].map((item, i) => (
            <div key={i} onClick={() => navigate(item.path)} style={{ minWidth: 200, padding: '16px', background: item.color, borderRadius: 14, cursor: 'pointer', flexShrink: 0, border: `1px solid ${item.accent}22`, transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: item.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontFamily: "'DM Mono',monospace" }}>{item.cat}</p>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{item.emoji}</span>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{item.name}</p>
              <p style={{ fontSize: 11, color: '#888', marginBottom: 10 }}>{item.region}</p>
              <span style={{ fontSize: 11, fontWeight: 600, color: item.accent, display: 'flex', alignItems: 'center', gap: 4 }}>Explore <ArrowRight size={10} /></span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SECTION 4: METRICS ══ */}
      <div style={{ background: '#1B5E20', padding: '40px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24, textAlign: 'center' }}>
          {[{ target: 20, label: 'Regions', suffix: '' }, { target: 450, label: 'Producers', suffix: '+' }, { target: 1200, label: 'Products', suffix: '+' }, { target: 80, label: 'Experiences', suffix: '+' }, { target: 120, label: 'Recipes', suffix: '+' }].map((s, i) => (
            <AnimatedStat key={i} target={s.target} label={s.label} suffix={s.suffix} />
          ))}
        </div>
      </div>

      {/* ══ SECTION 5: EXPLORE BY REGION ══ */}
      <div style={{ padding: '48px 20px', maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Explore by Region</h2>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>Each Italian region is a world unto itself — click to open on the map above</p>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8 }}>
          {Object.entries(regionData).slice(0, 8).map(([id, r]) => (
            <div key={id} onClick={() => { setSelectedRegion(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ minWidth: 200, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', flexShrink: 0, position: 'relative', aspectRatio: '4/3', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <img src={(WIKI[id] || WIKI.toscana)} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) saturate(1.1)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{r.name}</p>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{r.producerCount} Producers</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <div style={{ background: '#1A1A1A', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: '#4CAF50', marginBottom: 8 }}>BOTTEGA</p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span>© 2026 Bottega Delivery · The Digital Atlas of Italian Gastronomy</span>
          <a href="/About" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: 600 }}
            onMouseEnter={e => e.currentTarget.style.color = '#4CAF50'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>About</a>
        </p>
      </div>
    </div>
  );
}