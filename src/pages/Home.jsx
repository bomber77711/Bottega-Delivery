import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ItalyMap, { DENSITY_SCALE } from '../components/ItalyMap';
import { regionData } from '../components/regionData';
import { getRegionImage } from '../components/imageConfig';
import { searchExperiences, resolveSpot } from '@/lib/catalog';
import { MapPin, Maximize2, Minimize2, X, Star, ChevronRight, ArrowRight, Heart, Compass, Utensils, Users } from 'lucide-react';
import AskBottega from '../components/AskBottega';

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


// ── Region panel: right-hand drawer on desktop, bottom sheet on phones ──
const PANEL_W = 380;

function RegionPanel({ regionId, onClose, compact }) {
  const navigate = useNavigate();
  const data = regionId ? regionData[regionId] : null;
  const extra = regionId ? regionExtra[regionId] : null;
  const open = !!data;

  const sheet = compact
    ? { left: 0, right: 0, bottom: 0, height: '56%', borderRadius: '18px 18px 0 0', transform: open ? 'translateY(0)' : 'translateY(105%)', boxShadow: '0 -8px 40px rgba(0,0,0,0.35)' }
    : { top: 0, right: 0, bottom: 0, width: PANEL_W, borderRadius: '16px 0 0 16px', transform: open ? 'translateX(0)' : 'translateX(105%)', boxShadow: '-4px 0 40px rgba(0,0,0,0.15)' };

  const ingredientLink = (name) => resolveSpot({ label: name, type: 'ingredient' }, regionId).primary?.to;
  const experienceLink = (name) => (searchExperiences(name).length ? `/Experiences?q=${encodeURIComponent(name)}` : `/Experiences?region=${regionId}`);

  return (
    <aside
      aria-hidden={!open}
      aria-label={data ? `${data.name} region details` : undefined}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute', zIndex: 50, ...sheet,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(12px)',
        overflowY: 'auto', overflowX: 'hidden', overscrollBehavior: 'contain',
      }}>
      {data && (
        <>
          {compact && <div style={{ position: 'sticky', top: 0, zIndex: 3, display: 'flex', justifyContent: 'center', padding: '7px 0 0' }}><span style={{ width: 38, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.85)' }} /></div>}
          {/* Hero image */}
          <div style={{ position: 'relative', height: compact ? 150 : 200, overflow: 'hidden', flexShrink: 0, background: '#1B5E20', marginTop: compact ? -11 : 0 }}>
            <img src={getRegionImage(regionId)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) saturate(1.1)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />
            <button onClick={onClose} aria-label="Close region" style={{
              position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}><X size={14} color="#333" /></button>
            <div style={{ position: 'absolute', bottom: 14, left: 18, right: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                <MapPin size={10} color="#81C784" />
                <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Italian Region</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1.1, margin: 0 }}>{data.name}</h2>
              <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#81C784', fontWeight: 700 }}>{data.producerCount} Producers</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>·</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{data.experienceCount} Experiences</span>
              </div>
            </div>
          </div>

          <div style={{ padding: '18px 20px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 13, color: '#555', lineHeight: 1.75, margin: 0 }}>{data.description}</p>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => navigate(`/regions/${regionId}`)} style={{ flex: 1, padding: '11px', background: '#2E7D32', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                Explore {data.name} →
              </button>
              <button onClick={() => navigate(`/Products?region=${regionId}`)} style={{ padding: '11px 14px', background: '#F0F7EE', border: '1.5px solid #DCEDDC', borderRadius: 9, cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#2E7D32' }}>
                Shop
              </button>
            </div>

            {/* Specialties */}
            <section>
              <SectionLabel icon={<Utensils size={11} color="#C76A3A" />} color="#C76A3A">Regional Specialties</SectionLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {data.featuredProducts.map((p, i) => {
                  const to = ingredientLink(p);
                  return (
                    <button key={i} onClick={() => to && navigate(to)} disabled={!to} style={{ padding: '5px 11px', borderRadius: 100, border: 'none', background: i === 0 ? '#FBE9E7' : '#F0F7EE', color: i === 0 ? '#C76A3A' : '#2E7D32', fontSize: 11, fontWeight: 600, cursor: to ? 'pointer' : 'default' }}>{p}</button>
                  );
                })}
              </div>
            </section>

            {/* Top Producers */}
            <section>
              <SectionLabel icon={<Users size={11} color="#2E7D32" />}>Top Producers</SectionLabel>
              {(data.producers || []).slice(0, 3).map((p, i) => (
                <button key={i} className="rp-row" onClick={() => navigate('/producers/' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#F8FAF8', border: 'none', borderRadius: 10, marginBottom: 6, cursor: 'pointer', textAlign: 'left' }}>
                  <span>
                    <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{p.name}</span>
                    <span style={{ display: 'block', fontSize: 10, color: '#888', fontFamily: "'DM Mono',monospace" }}>{p.city} · {p.category}</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#2E7D32', fontWeight: 600 }}>
                    {p.rating} <Star size={9} fill="#2E7D32" color="#2E7D32" />
                  </span>
                </button>
              ))}
              <button onClick={() => navigate(`/Producers?region=${regionId}`)} style={{ width: '100%', padding: '9px', background: 'none', border: '1.5px solid #E8F5E9', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#2E7D32', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 4 }}>
                All {data.name} producers <ChevronRight size={13} />
              </button>
            </section>

            {/* Experiences */}
            {(data.experiences || []).length > 0 && (
              <section>
                <SectionLabel icon={<Compass size={11} color="#C76A3A" />}>Experiences</SectionLabel>
                {data.experiences.map((exp, i) => (
                  <button key={i} className="rp-row rp-exp" onClick={() => navigate(experienceLink(exp.name))}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FBE9E7', border: 'none', borderRadius: 10, marginBottom: 6, cursor: 'pointer', textAlign: 'left' }}>
                    <span>
                      <span style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{exp.name}</span>
                      <span style={{ display: 'block', fontSize: 10, color: '#C76A3A' }}>{exp.type}</span>
                    </span>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 800, color: '#C76A3A' }}>{exp.price}</span>
                  </button>
                ))}
              </section>
            )}

            {/* Iconic Ingredients */}
            {extra?.ingredients && (
              <section>
                <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 14px' }} />
                <SectionLabel icon={<span style={{ fontSize: 11 }}>🫙</span>}>Iconic Ingredients</SectionLabel>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {extra.ingredients.map((ing, i) => {
                    const to = ingredientLink(ing);
                    return (
                      <button key={i} onClick={() => to && navigate(to)} disabled={!to} style={{ padding: '5px 11px', borderRadius: 100, background: '#FFF8E1', color: '#E65100', fontSize: 11, fontWeight: 600, border: '1px solid rgba(230,81,0,0.15)', cursor: to ? 'pointer' : 'default' }}>{ing}</button>
                    );
                  })}
                </div>
              </section>
            )}

            {extra?.tradition && (
              <div style={{ background: '#F8FAF8', borderRadius: 10, padding: '13px 14px', borderLeft: '3px solid #4CAF50' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: '#4CAF50', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace", marginBottom: 7 }}>✦ Food Tradition</div>
                <p style={{ fontSize: 12, color: '#444', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>“{extra.tradition}”</p>
              </div>
            )}

            {extra?.wine && (
              <div style={{ background: 'rgba(90,20,60,0.04)', borderRadius: 10, padding: '13px 14px', border: '1px solid rgba(90,20,60,0.1)' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: '#7B1FA2', textTransform: 'uppercase', fontFamily: "'DM Mono',monospace", marginBottom: 7 }}>🍷 Wine Specialty</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', margin: '0 0 3px' }}>{extra.wine.name}</p>
                    <p style={{ fontSize: 11, color: '#888', lineHeight: 1.6, margin: 0 }}>{extra.wine.note}</p>
                  </div>
                  <span style={{ padding: '3px 8px', borderRadius: 6, background: '#EDE7F6', color: '#6A1B9A', fontSize: 10, fontWeight: 800, flexShrink: 0, fontFamily: "'DM Mono',monospace" }}>{extra.wine.doc}</span>
                </div>
              </div>
            )}

            <SaveRegionButton regionId={regionId} />
          </div>
        </>
      )}
    </aside>
  );
}

function SectionLabel({ icon, color = '#888', children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
      {icon}
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color, textTransform: 'uppercase', fontFamily: "'DM Mono',monospace" }}>{children}</span>
    </div>
  );
}

// Favourite regions persist per browser (wrapped: storage can be unavailable).
function SaveRegionButton({ regionId }) {
  const read = () => { try { return JSON.parse(localStorage.getItem('bottega:savedRegions') || '[]'); } catch { return []; } };
  const [saved, setSaved] = useState(() => read().includes(regionId));
  useEffect(() => { setSaved(read().includes(regionId)); }, [regionId]);
  const toggle = () => {
    const list = read();
    const next = list.includes(regionId) ? list.filter((r) => r !== regionId) : [...list, regionId];
    try { localStorage.setItem('bottega:savedRegions', JSON.stringify(next)); } catch { /* ignore */ }
    setSaved(next.includes(regionId));
  };
  return (
    <button onClick={toggle} aria-pressed={saved} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '10px', background: saved ? '#FFEBEE' : '#F7F7F7', border: '1px solid ' + (saved ? '#FFCDD2' : '#EEE'), borderRadius: 9, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: saved ? '#C62828' : '#666' }}>
      <Heart size={14} color="#E53935" fill={saved ? '#E53935' : 'none'} /> {saved ? 'Saved to favourites' : 'Save region'}
    </button>
  );
}

// ── Animated stat ──────────────────────────────
function AnimatedStat({ target, label, suffix = '' }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let iv;
    const t = setTimeout(() => {
      let n = 0; const step = target / 50;
      iv = setInterval(() => { n = Math.min(n + step, target); setV(Math.round(n)); if (n >= target) clearInterval(iv); }, 25);
    }, 400);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [target]);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{v}{suffix}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
    </div>
  );
}

function useContainerWidth(ref) {
  const [w, setW] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1280));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

// ══════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════
export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlRegion = searchParams.get('region');
  const selectedRegion = urlRegion && regionData[urlRegion] ? urlRegion : null;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);
  const [activeLayer, setActiveLayer] = useState('all');
  const [activeJourney, setActiveJourney] = useState(null);
  const [showJourneys, setShowJourneys] = useState(false);
  const mapContainerRef = useRef(null);
  const scrollRef = useRef(null);
  const mapWidth = useContainerWidth(mapContainerRef);
  const compact = mapWidth < 768;

  // The selected region lives in the URL (?region=toscana): shareable, and Back closes it.
  const selectRegion = useCallback((id) => {
    // Opening a region pushes a history entry (Back closes it); switching/closing replaces it.
    const hadRegion = new URLSearchParams(window.location.search).has('region');
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (id) next.set('region', id); else next.delete('region');
      return next;
    }, { replace: hadRegion });
  }, [setSearchParams]);

  useEffect(() => {
    const t = setInterval(() => setCardIdx(i => (i + 1) % extendedDiscovery.length), 8000);
    return () => clearInterval(t);
  }, []);

  // Escape peels back one layer at a time: region → journey → fullscreen
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'Escape') return;
      if (selectedRegion) selectRegion(null);
      else if (activeJourney) setActiveJourney(null);
      else if (isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFullscreen, selectedRegion, activeJourney, selectRegion]);

  const handleSearchSelect = useCallback((r) => {
    if (r.type === 'Region' && r.id) selectRegion(r.id);
    else if (r.type === 'Recipe' && r.id) navigate(`/recipes/${r.id}`);
    else if (r.type === 'Producer') navigate('/Producers');
  }, [navigate, selectRegion]);

  // Screen area covered by floating UI — the map frames the zoomed region inside what's left.
  const mapInsets = useMemo(() => compact
    ? { top: 128, right: 14, bottom: selectedRegion ? Math.round((mapContainerRef.current?.clientHeight || 700) * 0.56) + 12 : 90, left: 14 }
    : { top: 150, right: selectedRegion ? PANEL_W + 28 : 24, bottom: 36, left: 250 },
  [compact, selectedRegion]);

  const card = extendedDiscovery[cardIdx % extendedDiscovery.length];

  return (
    <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', background: '#F0F7EE' }}>
      <style>{`
        .rp-row { transition: background .15s ease; }
        .rp-row:hover { background: #E8F5E9 !important; }
        .rp-exp:hover { background: #f5d6c8 !important; }
        .map-layers { scrollbar-width: none; }
        .map-layers::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ══ MAP: EDGE-TO-EDGE ══ */}
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          ref={mapContainerRef}
          id="map-container"
          style={{
            position: isFullscreen ? 'fixed' : 'relative',
            inset: isFullscreen ? 0 : 'auto',
            width: isFullscreen ? '100vw' : '100%',
            height: isFullscreen ? '100dvh' : 'calc(100dvh - 60px)',
            minHeight: 460,
            overflow: 'hidden',
            background: '#060D06',
            zIndex: isFullscreen ? 9999 : 1,
          }}>

          {/* Grid overlay + edge vignette */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, backgroundImage: 'linear-gradient(rgba(76,175,80,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,80,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(ellipse 85% 90% at 50% 50%, transparent 50%, rgba(6,13,6,0.55) 90%, rgba(6,13,6,0.8) 100%)' }} />

          <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
            <ItalyMap
              selectedRegion={selectedRegion}
              onRegionSelect={selectRegion}
              activeLayer={activeLayer}
              activeJourney={activeJourney}
              insets={mapInsets}
            />
          </div>

          {/* ── Ask Bottega ── */}
          <div style={{ position: 'absolute', top: compact ? 12 : 16, left: '50%', transform: 'translateX(-50%)', zIndex: 200, width: 420, maxWidth: 'calc(100% - 24px)' }}>
            <AskBottega onSelect={handleSearchSelect} />
          </div>

          {/* ── Food layers (horizontally scrollable on phones) ── */}
          <div className="map-layers" role="toolbar" aria-label="Map layers" style={{
            position: 'absolute', top: compact ? 66 : 70, left: compact ? 12 : 16, right: compact ? 12 : 'auto', zIndex: 200,
            display: 'flex', alignItems: 'center', gap: 5, overflowX: 'auto', whiteSpace: 'nowrap',
            background: 'rgba(6,13,6,0.78)', backdropFilter: 'blur(10px)', borderRadius: 100, padding: '5px 11px', border: '1px solid rgba(76,175,80,0.2)'
          }}>
            {!compact && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: 3 }}>Explore by</span>}
            {MAP_LAYERS.map(layer => (
              <button key={layer.id} onClick={() => setActiveLayer(layer.id)} aria-pressed={activeLayer === layer.id} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: activeLayer === layer.id ? '#81C784' : 'rgba(255,255,255,0.7)',
                background: activeLayer === layer.id ? 'rgba(76,175,80,0.2)' : 'transparent',
                border: 'none', borderRadius: 100, padding: '5px 10px', cursor: 'pointer', flexShrink: 0,
                fontWeight: activeLayer === layer.id ? 700 : 400, whiteSpace: 'nowrap', transition: 'all 0.15s'
              }}>{layer.label}</button>
            ))}
          </div>

          {/* Status label (desktop) */}
          {!compact && (
            <div style={{ position: 'absolute', top: 24, left: 18, zIndex: 20, display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50', display: 'inline-block', boxShadow: '0 0 8px rgba(76,175,80,0.9)' }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(129,199,132,0.75)', textTransform: 'uppercase' }}>
                Bottega · 20 Regions
              </span>
            </div>
          )}

          {/* Fullscreen toggle */}
          {!compact && (
            <button
              onClick={() => setIsFullscreen(f => !f)}
              style={{ position: 'absolute', top: 18, right: selectedRegion ? PANEL_W + 16 : 16, zIndex: 55, padding: '7px 12px', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: 'rgba(255,255,255,0.85)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, transition: 'right 0.32s ease' }}>
              {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
              {isFullscreen ? 'Exit' : 'Full Map'}
            </button>
          )}

          {/* Active journey card */}
          {activeJourney && !selectedRegion && (
            <div style={{ position: 'absolute', top: compact ? 112 : 116, left: '50%', transform: 'translateX(-50%)', zIndex: 250, background: 'rgba(6,13,6,0.9)', backdropFilter: 'blur(16px)', border: `1px solid ${activeJourney.color}55`, borderRadius: 12, padding: '10px 16px', width: 420, maxWidth: 'calc(100% - 24px)', display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeSlideIn 0.25s ease' }}>
              <span style={{ fontSize: 20 }}>{activeJourney.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 2px' }}>{activeJourney.title}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}>{activeJourney.description}</p>
              </div>
              <button onClick={() => setActiveJourney(null)} aria-label="Close journey" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 16, padding: 0, flexShrink: 0 }}>✕</button>
            </div>
          )}

          {/* Selected region chip + back control */}
          {selectedRegion && (
            <button onClick={() => selectRegion(null)} style={{ position: 'absolute', top: compact ? 112 : 116, left: compact ? 12 : 16, zIndex: 210, display: 'flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 100, background: 'rgba(6,13,6,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(76,175,80,0.45)', cursor: 'pointer', color: '#fff', animation: 'fadeSlideIn 0.2s ease' }}>
              <span style={{ fontSize: 12 }}>←</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600 }}>All of Italy</span>
            </button>
          )}

          {/* Hint */}
          {!selectedRegion && !compact && (
            <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'none' }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', margin: 0 }}>Click a region to zoom in · then click any icon</p>
            </div>
          )}
          {!selectedRegion && compact && (
            <div style={{ position: 'absolute', bottom: 86, left: '50%', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'none' }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', margin: 0 }}>Tap a region to explore</p>
            </div>
          )}

          {/* Food Journeys + discovery card (bottom-left); hidden on phones while a region is open */}
          {!(compact && selectedRegion) && (
            <div style={{ position: 'absolute', bottom: compact ? 14 : 20, left: compact ? 12 : 18, zIndex: 20, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(6,13,6,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(76,175,80,0.22)', borderRadius: 12, padding: '10px 14px', minWidth: 220 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: showJourneys ? 8 : 0 }}>
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>🇮🇹 Food Journeys</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {activeJourney && <button onClick={() => setActiveJourney(null)} style={{ fontSize: 10, color: '#E57373', background: 'none', border: '1px solid rgba(229,115,115,0.4)', borderRadius: 100, padding: '2px 8px', cursor: 'pointer' }}>Clear</button>}
                    <button onClick={() => setShowJourneys(j => !j)} aria-expanded={showJourneys} style={{ fontSize: 10, color: '#81C784', background: 'none', border: '1px solid rgba(76,175,80,0.4)', borderRadius: 100, padding: '2px 9px', cursor: 'pointer' }}>{showJourneys ? 'Close' : 'Explore'}</button>
                  </div>
                </div>
                {activeJourney && !showJourneys && (
                  <p style={{ fontSize: 10, color: activeJourney.color, fontFamily: "'DM Mono',monospace", margin: '4px 0 0' }}>{activeJourney.emoji} {activeJourney.title}</p>
                )}
                {showJourneys && foodJourneys.map(j => (
                  <button key={j.id} onClick={() => { setActiveJourney(activeJourney?.id === j.id ? null : j); setShowJourneys(false); selectRegion(null); }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'none', border: 'none', borderTopStyle: 'solid', cursor: 'pointer', textAlign: 'left', opacity: activeJourney?.id === j.id ? 1 : 0.88 }}>
                    <span style={{ fontSize: 18 }}>{j.emoji}</span>
                    <span>
                      <span style={{ display: 'block', fontSize: 12, color: '#fff', fontWeight: 500, marginBottom: 2 }}>{j.title}</span>
                      <span style={{ display: 'block', fontSize: 9, color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Mono',monospace" }}>{j.regions.map(r => regionData[r]?.name).join(' → ')}</span>
                    </span>
                  </button>
                ))}
              </div>

              {!compact && (
                <button onClick={() => selectRegion(card.region)} style={{ background: 'rgba(6,13,6,0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(76,175,80,0.22)', borderRadius: 14, padding: '12px 14px', width: 220, cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ display: 'block', fontSize: 9, fontFamily: "'DM Mono',monospace", fontWeight: 700, color: 'rgba(129,199,132,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 7 }}>✦ {card.label}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ fontSize: 20 }}>{card.emoji}</span>
                    <span>
                      <span style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{card.name}</span>
                      <span style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Mono',monospace" }}>{card.subtitle}</span>
                    </span>
                  </span>
                  <span style={{ display: 'flex', gap: 4, marginTop: 9, justifyContent: 'center' }}>
                    {extendedDiscovery.map((_, i) => (<span key={i} onClick={e => { e.stopPropagation(); setCardIdx(i); }} style={{ width: i === cardIdx ? 14 : 5, height: 3, borderRadius: 2, background: i === cardIdx ? '#4CAF50' : 'rgba(255,255,255,0.22)', transition: 'all 0.2s' }} />))}
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Legend — same scale the map uses, kept as subtle as the original */}
          {!compact && (
            <div style={{ position: 'absolute', top: 58, right: selectedRegion ? PANEL_W + 18 : 18, zIndex: 10, display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'none', transition: 'right 0.32s ease' }}>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Mono',monospace", textTransform: 'uppercase' }}>Low</span>
              {[...DENSITY_SCALE].reverse().map((b) => (
                <span key={b.label} title={`${b.label} producers`} style={{ width: 12, height: 7, borderRadius: 2, background: b.color, display: 'inline-block', border: '1px solid rgba(255,255,255,0.08)' }} />
              ))}
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Mono',monospace", textTransform: 'uppercase' }}>High</span>
            </div>
          )}

          <RegionPanel regionId={selectedRegion} onClose={() => selectRegion(null)} compact={compact} />
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
            <div key={id} onClick={() => { selectRegion(id); scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ minWidth: 200, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', flexShrink: 0, position: 'relative', aspectRatio: '4/3', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <img src={getRegionImage(id)} alt={r.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) saturate(1.1)' }} />
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
