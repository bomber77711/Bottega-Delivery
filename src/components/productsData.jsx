// Product catalogue for Bottega Delivery.
// IMPORTANT shape contract (consumed by Products.jsx, ProducerDetail.jsx, cart/Checkout):
//   - price is a NUMBER (UI renders it as `€{price.toFixed(2)}` and multiplies in the cart)
//   - certifications and tags are arrays of strings
//   - categories is an array of OBJECTS { name, emoji, tint, image }; product.category must
//     match a category .name for the "Browse by Category" cards to filter.
// product.producer matches a real producer name in regionData (enables the
// "products from this producer" cross-link); regionId matches a region id.

export const categories = [
  { name: 'Olive Oil', emoji: '\u{1FAD2}', tint: '#6B8E23', image: '/img/products/cat-olive-oil.webp' },
  { name: 'Wine', emoji: '\u{1F377}', tint: '#7B2040', image: '/img/products/cat-wine.webp' },
  { name: 'Cheese', emoji: '\u{1F9C0}', tint: '#C8960A', image: '/img/products/cat-cheese.webp' },
  { name: 'Cured Meats', emoji: '\u{1F969}', tint: '#A8404A', image: '/img/products/cat-cured-meats.webp' },
  { name: 'Pasta & Rice', emoji: '\u{1F35D}', tint: '#C06830', image: '/img/products/cat-pasta-rice.webp' },
  { name: 'Truffle', emoji: '\u{1F344}', tint: '#5A4A3A', image: '/img/products/cat-truffle.webp' },
  { name: 'Condiments', emoji: '\u{1FAD9}', tint: '#4E342E', image: '/img/products/cat-condiments.webp' },
  { name: 'Preserves', emoji: '\u{1F345}', tint: '#C62828', image: '/img/products/cat-preserves.webp' },
  { name: 'Coffee', emoji: '\u2615', tint: '#5C3A1E', image: '/img/products/cat-coffee.webp' },
  { name: 'Honey', emoji: '\u{1F36F}', tint: '#C07820', image: '/img/products/cat-honey.webp' },
  { name: 'Nuts & Sweets', emoji: '\u{1F330}', tint: '#7CB342', image: '/img/products/cat-nuts-sweets.webp' },
];

// Each product has its own photo in /public/img/products/<id>.webp (see public/img/CREDITS.md).
const img = (id) => `/img/products/${id}.webp`;

export const productsData = [
  // Toscana
  { id: 'olio-franci-evo', name: 'Frantoio Franci EVO', producer: 'Frantoio Franci', region: 'Tuscany', regionId: 'toscana', category: 'Olive Oil', price: 24, weight: '500 ml', certifications: ['IGP'], tags: ['Organic'], description: 'Cold-pressed extra virgin olive oil from the Chianti hills, grassy and peppery.', image: img('olio-franci-evo') },
  { id: 'brunello-rossi', name: 'Brunello di Montalcino DOCG', producer: 'Cantina Rossi', region: 'Tuscany', regionId: 'toscana', category: 'Wine', price: 48, weight: '750 ml', certifications: ['DOCG'], tags: [], description: 'A structured Sangiovese from family estates in Montalcino, aged in oak.', image: img('brunello-rossi') },
  { id: 'pecorino-bianchi', name: 'Pecorino Toscano DOP', producer: 'Caseificio Bianchi', region: 'Tuscany', regionId: 'toscana', category: 'Cheese', price: 16, weight: '400 g', certifications: ['DOP'], tags: [], description: 'Aged sheep cheese from Pienza, nutty and firm.', image: img('pecorino-bianchi') },
  { id: 'finocchiona-falorni', name: 'Finocchiona IGP', producer: 'Salumificio Falorni', region: 'Tuscany', regionId: 'toscana', category: 'Cured Meats', price: 19, weight: '300 g', certifications: ['IGP'], tags: [], description: 'Tuscan salami spiced with wild fennel, soft and aromatic.', image: img('finocchiona-falorni') },

  // Emilia-Romagna
  { id: 'parmigiano-gennari', name: 'Parmigiano Reggiano 24M', producer: 'Caseificio Gennari', region: 'Emilia-Romagna', regionId: 'emilia_romagna', category: 'Cheese', price: 28, weight: '1 kg', certifications: ['DOP'], tags: [], description: '24-month aged Parmigiano Reggiano, crystalline and savory.', image: img('parmigiano-gennari') },
  { id: 'prosciutto-san-nicola', name: 'Prosciutto di Parma DOP 18M', producer: 'Prosciuttificio San Nicola', region: 'Emilia-Romagna', regionId: 'emilia_romagna', category: 'Cured Meats', price: 32, weight: '500 g', certifications: ['DOP'], tags: [], description: 'Sweet, air-cured Parma ham from Langhirano, aged 18 months.', image: img('prosciutto-san-nicola') },
  { id: 'balsamico-malpighi', name: 'Aceto Balsamico Tradizionale', producer: 'Acetaia Malpighi', region: 'Emilia-Romagna', regionId: 'emilia_romagna', category: 'Condiments', price: 65, weight: '100 ml', certifications: ['DOP'], tags: [], description: 'Traditional Balsamic of Modena, barrel-aged to a dense, sweet syrup.', image: img('balsamico-malpighi') },

  // Lombardia
  { id: 'grana-lombardo', name: 'Grana Padano DOP', producer: 'Caseificio Lombardo', region: 'Lombardy', regionId: 'lombardia', category: 'Cheese', price: 22, weight: '1 kg', certifications: ['DOP'], tags: [], description: 'Mild, granular hard cheese from the Po valley.', image: img('grana-lombardo') },
  { id: 'bresaola-valtellina', name: 'Bresaola della Valtellina IGP', producer: 'Salumificio Valtellina', region: 'Lombardy', regionId: 'lombardia', category: 'Cured Meats', price: 26, weight: '300 g', certifications: ['IGP'], tags: ['Gluten-Free'], description: 'Air-dried, lean cured beef from the Alpine Valtellina.', image: img('bresaola-valtellina') },
  { id: 'franciacorta-berlucchi', name: 'Franciacorta DOCG Brut', producer: 'Cantina Berlucchi', region: 'Lombardy', regionId: 'lombardia', category: 'Wine', price: 34, weight: '750 ml', certifications: ['DOCG'], tags: [], description: 'Metodo classico sparkling wine, fine bubbles and citrus.', image: img('franciacorta-berlucchi') },
  { id: 'pasta-felicetti', name: 'Monograno Felicetti Pasta', producer: 'Pastificio Felicetti', region: 'Lombardy', regionId: 'lombardia', category: 'Pasta & Rice', price: 6, weight: '500 g', certifications: [], tags: ['Organic'], description: 'Bronze-drawn organic durum wheat pasta with a rough, sauce-gripping surface.', image: img('pasta-felicetti') },

  // Sicilia
  { id: 'pistacchio-bronte', name: 'Pistacchio di Bronte DOP', producer: 'Pistacchi Bronte', region: 'Sicily', regionId: 'sicilia', category: 'Nuts & Sweets', price: 21, weight: '200 g', certifications: ['DOP'], tags: ['Vegan', 'Gluten-Free'], description: 'Intensely green pistachios grown on the volcanic slopes of Etna.', image: img('pistacchio-bronte') },
  { id: 'marsala-florio', name: 'Marsala Superiore', producer: 'Cantine Florio', region: 'Sicily', regionId: 'sicilia', category: 'Wine', price: 29, weight: '750 ml', certifications: ['DOC'], tags: [], description: 'Fortified Sicilian wine with notes of dried fruit and caramel.', image: img('marsala-florio') },
  { id: 'caffe-mokarico', name: 'Mokarico Espresso Blend', producer: 'Torrefazione Mokarico', region: 'Sicily', regionId: 'sicilia', category: 'Coffee', price: 12, weight: '250 g', certifications: [], tags: [], description: 'Dark-roast Sicilian espresso blend, full-bodied and chocolatey.', image: img('caffe-mokarico') },

  // Campania
  { id: 'mozzarella-vannulo', name: 'Mozzarella di Bufala DOP', producer: 'Caseificio Vannulo', region: 'Campania', regionId: 'campania', category: 'Cheese', price: 18, weight: '250 g', certifications: ['DOP'], tags: ['Organic'], description: 'Organic buffalo mozzarella from Paestum, milky and elastic.', image: img('mozzarella-vannulo') },
  { id: 'sanmarzano-gustarosso', name: 'San Marzano DOP Tomatoes', producer: 'Gustarosso', region: 'Campania', regionId: 'campania', category: 'Preserves', price: 8, weight: '550 g', certifications: ['DOP'], tags: ['Vegan'], description: 'Hand-picked San Marzano tomatoes from the Sarno valley.', image: img('sanmarzano-gustarosso') },
  { id: 'pasta-dimartino', name: 'Pasta di Gragnano IGP', producer: 'Pastificio Di Martino', region: 'Campania', regionId: 'campania', category: 'Pasta & Rice', price: 5, weight: '500 g', certifications: ['IGP'], tags: ['Vegan'], description: 'Bronze-die pasta from Gragnano, the birthplace of dried pasta.', image: img('pasta-dimartino') },

  // Piemonte
  { id: 'barolo-conterno', name: 'Barolo DOCG', producer: 'Giacomo Conterno', region: 'Piedmont', regionId: 'piemonte', category: 'Wine', price: 89, weight: '750 ml', certifications: ['DOCG'], tags: [], description: 'Benchmark Nebbiolo from Serralunga d\'Alba, austere and ageworthy.', image: img('barolo-conterno') },
  { id: 'tartufo-morra', name: 'White Truffle of Alba', producer: 'Tartufi Morra', region: 'Piedmont', regionId: 'piemonte', category: 'Truffle', price: 180, weight: '20 g', certifications: [], tags: [], description: 'Fresh Tuber magnatum from the Langhe, sold by seasonal availability.', image: img('tartufo-morra') },
  { id: 'riso-costanzo', name: 'Carnaroli Rice', producer: 'Riseria Costanzo', region: 'Piedmont', regionId: 'piemonte', category: 'Pasta & Rice', price: 7, weight: '1 kg', certifications: [], tags: ['Vegan', 'Gluten-Free'], description: 'Aged Carnaroli rice for risotto, holding a firm bite.', image: img('riso-costanzo') },

  // Puglia
  { id: 'olio-muraglia', name: 'Frantoio Muraglia Olive Oil', producer: 'Frantoio Muraglia', region: 'Apulia', regionId: 'puglia', category: 'Olive Oil', price: 20, weight: '500 ml', certifications: ['IGP'], tags: ['Organic'], description: 'Coratina olive oil from Andria in its hand-painted terracotta bottle.', image: img('olio-muraglia') },
  { id: 'pasta-cavalieri', name: 'Pastificio Cavalieri Orecchiette', producer: 'Pastificio Cavalieri', region: 'Apulia', regionId: 'puglia', category: 'Pasta & Rice', price: 6, weight: '500 g', certifications: [], tags: ['Vegan'], description: 'Slow-dried orecchiette, the signature pasta of Puglia.', image: img('pasta-cavalieri') },

  // Veneto
  { id: 'prosecco-bisol', name: 'Valdobbiadene Prosecco DOCG', producer: 'Cantina Bisol', region: 'Veneto', regionId: 'veneto', category: 'Wine', price: 23, weight: '750 ml', certifications: ['DOCG'], tags: [], description: 'Crisp, floral Prosecco Superiore from the steep Valdobbiadene hills.', image: img('prosecco-bisol') },
  { id: 'asiago-pennar', name: 'Asiago DOP', producer: 'Caseificio Pennar', region: 'Veneto', regionId: 'veneto', category: 'Cheese', price: 17, weight: '500 g', certifications: ['DOP'], tags: [], description: 'Alpine cow cheese from the Asiago plateau, sweet when young.', image: img('asiago-pennar') },

  // Lazio
  { id: 'miele-colli', name: 'Miele dei Colli Honey', producer: 'Miele dei Colli', region: 'Lazio', regionId: 'lazio', category: 'Honey', price: 11, weight: '500 g', certifications: [], tags: ['Organic'], description: 'Wildflower honey from the hills around Frascati.', image: img('miele-colli') },

  // Liguria
  { id: 'pesto-rossi', name: 'Pesto Genovese DOP', producer: 'Pesto Rossi', region: 'Liguria', regionId: 'liguria', category: 'Condiments', price: 10, weight: '180 g', certifications: ['DOP'], tags: [], description: 'Basil pesto with Genovese DOP basil, pine nuts and Ligurian oil.', image: img('pesto-rossi') },

  // Calabria
  { id: 'nduja-toraldo', name: "'Nduja di Spilinga", producer: 'Salumeria Toraldo', region: 'Calabria', regionId: 'calabria', category: 'Cured Meats', price: 14, weight: '250 g', certifications: [], tags: ['Gluten-Free'], description: 'Soft, spreadable spicy salume packed with Calabrian chilli.', image: img('nduja-toraldo') },

  // Valle d'Aosta
  { id: 'fontina-coop', name: 'Fontina DOP', producer: 'Cooperativa Produttori Fontina', region: "Valle d'Aosta", regionId: 'valle_daosta', category: 'Cheese', price: 24, weight: '500 g', certifications: ['DOP'], tags: [], description: 'Alpine raw-milk cheese, the heart of a true fonduta.', image: img('fontina-coop') },
];

export default productsData;
