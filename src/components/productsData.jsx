// Product catalogue for Bottega Delivery.
// product.producer matches a real producer name in regionData (enables the
// "products from this producer" cross-link on producer pages); regionId matches
// a region id. categories drives the filter chips on /products.

export const categories = [
  'Olive Oil', 'Wine', 'Cheese', 'Cured Meats', 'Pasta', 'Truffle', 'Coffee', 'Preserves', 'Honey', 'Sweets',
];

const img = {
  oil: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=700&q=80',
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=80',
  cheese: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=700&q=80',
  meat: 'https://images.unsplash.com/photo-1542901031-ec5eeb518e8e?w=700&q=80',
  pasta: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=700&q=80',
  truffle: 'https://images.unsplash.com/photo-1505575972945-280edd1d2b1f?w=700&q=80',
  coffee: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80',
  preserve: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=700&q=80',
  honey: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700&q=80',
  sweet: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=700&q=80',
};

export const productsData = [
  // Toscana
  { id: 'olio-franci-evo', name: 'Frantoio Franci EVO', producer: 'Frantoio Franci', region: 'Tuscany', regionId: 'toscana', category: 'Olive Oil', price: '€24', weight: '500 ml', certifications: ['IGP'], tags: ['Organic'], description: 'Cold-pressed extra virgin olive oil from the Chianti hills, grassy and peppery.', image: img.oil },
  { id: 'brunello-rossi', name: 'Brunello di Montalcino DOCG', producer: 'Cantina Rossi', region: 'Tuscany', regionId: 'toscana', category: 'Wine', price: '€48', weight: '750 ml', certifications: ['DOCG'], tags: [], description: 'A structured Sangiovese from family estates in Montalcino, aged in oak.', image: img.wine },
  { id: 'pecorino-bianchi', name: 'Pecorino Toscano DOP', producer: 'Caseificio Bianchi', region: 'Tuscany', regionId: 'toscana', category: 'Cheese', price: '€16', weight: '400 g', certifications: ['DOP'], tags: [], description: 'Aged sheep cheese from Pienza, nutty and firm.', image: img.cheese },
  { id: 'finocchiona-falorni', name: 'Finocchiona IGP', producer: 'Salumificio Falorni', region: 'Tuscany', regionId: 'toscana', category: 'Cured Meats', price: '€19', weight: '300 g', certifications: ['IGP'], tags: [], description: 'Tuscan salami spiced with wild fennel, soft and aromatic.', image: img.meat },

  // Emilia-Romagna
  { id: 'parmigiano-gennari', name: 'Parmigiano Reggiano 24M', producer: 'Caseificio Gennari', region: 'Emilia-Romagna', regionId: 'emilia_romagna', category: 'Cheese', price: '€28', weight: '1 kg', certifications: ['DOP'], tags: [], description: '24-month aged Parmigiano Reggiano, crystalline and savory.', image: img.cheese },
  { id: 'prosciutto-san-nicola', name: 'Prosciutto di Parma DOP 18M', producer: 'Prosciuttificio San Nicola', region: 'Emilia-Romagna', regionId: 'emilia_romagna', category: 'Cured Meats', price: '€32', weight: '500 g', certifications: ['DOP'], tags: [], description: 'Sweet, air-cured Parma ham from Langhirano, aged 18 months.', image: img.meat },
  { id: 'balsamico-malpighi', name: 'Aceto Balsamico Tradizionale', producer: 'Acetaia Malpighi', region: 'Emilia-Romagna', regionId: 'emilia_romagna', category: 'Preserves', price: '€65', weight: '100 ml', certifications: ['DOP'], tags: [], description: 'Traditional Balsamic of Modena, barrel-aged to a dense, sweet syrup.', image: img.preserve },

  // Lombardia
  { id: 'grana-lombardo', name: 'Grana Padano DOP', producer: 'Caseificio Lombardo', region: 'Lombardy', regionId: 'lombardia', category: 'Cheese', price: '€22', weight: '1 kg', certifications: ['DOP'], tags: [], description: 'Mild, granular hard cheese from the Po valley.', image: img.cheese },
  { id: 'bresaola-valtellina', name: 'Bresaola della Valtellina IGP', producer: 'Salumificio Valtellina', region: 'Lombardy', regionId: 'lombardia', category: 'Cured Meats', price: '€26', weight: '300 g', certifications: ['IGP'], tags: ['Gluten-Free'], description: 'Air-dried, lean cured beef from the Alpine Valtellina.', image: img.meat },
  { id: 'franciacorta-berlucchi', name: 'Franciacorta DOCG Brut', producer: 'Cantina Berlucchi', region: 'Lombardy', regionId: 'lombardia', category: 'Wine', price: '€34', weight: '750 ml', certifications: ['DOCG'], tags: [], description: 'Metodo classico sparkling wine, fine bubbles and citrus.', image: img.wine },
  { id: 'pasta-felicetti', name: 'Monograno Felicetti Pasta', producer: 'Pastificio Felicetti', region: 'Lombardy', regionId: 'lombardia', category: 'Pasta', price: '€6', weight: '500 g', certifications: [], tags: ['Organic'], description: 'Bronze-drawn organic durum wheat pasta with a rough, sauce-gripping surface.', image: img.pasta },

  // Sicilia
  { id: 'pistacchio-bronte', name: 'Pistacchio di Bronte DOP', producer: 'Pistacchi Bronte', region: 'Sicily', regionId: 'sicilia', category: 'Sweets', price: '€21', weight: '200 g', certifications: ['DOP'], tags: ['Vegan', 'Gluten-Free'], description: 'Intensely green pistachios grown on the volcanic slopes of Etna.', image: img.sweet },
  { id: 'marsala-florio', name: 'Marsala Superiore', producer: 'Cantine Florio', region: 'Sicily', regionId: 'sicilia', category: 'Wine', price: '€29', weight: '750 ml', certifications: ['DOC'], tags: [], description: 'Fortified Sicilian wine with notes of dried fruit and caramel.', image: img.wine },
  { id: 'caffe-mokarico', name: 'Mokarico Espresso Blend', producer: 'Torrefazione Mokarico', region: 'Sicily', regionId: 'sicilia', category: 'Coffee', price: '€12', weight: '250 g', certifications: [], tags: [], description: 'Dark-roast Sicilian espresso blend, full-bodied and chocolatey.', image: img.coffee },

  // Campania
  { id: 'mozzarella-vannulo', name: 'Mozzarella di Bufala DOP', producer: 'Caseificio Vannulo', region: 'Campania', regionId: 'campania', category: 'Cheese', price: '€18', weight: '250 g', certifications: ['DOP'], tags: ['Organic'], description: 'Organic buffalo mozzarella from Paestum, milky and elastic.', image: img.cheese },
  { id: 'sanmarzano-gustarosso', name: 'San Marzano DOP Tomatoes', producer: 'Gustarosso', region: 'Campania', regionId: 'campania', category: 'Preserves', price: '€8', weight: '550 g', certifications: ['DOP'], tags: ['Vegan'], description: 'Hand-picked San Marzano tomatoes from the Sarno valley.', image: img.preserve },
  { id: 'pasta-dimartino', name: 'Pasta di Gragnano IGP', producer: 'Pastificio Di Martino', region: 'Campania', regionId: 'campania', category: 'Pasta', price: '€5', weight: '500 g', certifications: ['IGP'], tags: ['Vegan'], description: 'Bronze-die pasta from Gragnano, the birthplace of dried pasta.', image: img.pasta },

  // Piemonte
  { id: 'barolo-conterno', name: 'Barolo DOCG', producer: 'Giacomo Conterno', region: 'Piedmont', regionId: 'piemonte', category: 'Wine', price: '€89', weight: '750 ml', certifications: ['DOCG'], tags: [], description: 'Benchmark Nebbiolo from Serralunga d\'Alba, austere and ageworthy.', image: img.wine },
  { id: 'tartufo-morra', name: 'White Truffle of Alba', producer: 'Tartufi Morra', region: 'Piedmont', regionId: 'piemonte', category: 'Truffle', price: '€180', weight: '20 g', certifications: [], tags: [], description: 'Fresh Tuber magnatum from the Langhe, sold by seasonal availability.', image: img.truffle },
  { id: 'riso-costanzo', name: 'Carnaroli Rice', producer: 'Riseria Costanzo', region: 'Piedmont', regionId: 'piemonte', category: 'Preserves', price: '€7', weight: '1 kg', certifications: [], tags: ['Vegan', 'Gluten-Free'], description: 'Aged Carnaroli rice for risotto, holding a firm bite.', image: img.preserve },

  // Puglia
  { id: 'olio-muraglia', name: 'Frantoio Muraglia Olive Oil', producer: 'Frantoio Muraglia', region: 'Apulia', regionId: 'puglia', category: 'Olive Oil', price: '€20', weight: '500 ml', certifications: ['IGP'], tags: ['Organic'], description: 'Coratina olive oil from Andria in its hand-painted terracotta bottle.', image: img.oil },
  { id: 'pasta-cavalieri', name: 'Pastificio Cavalieri Orecchiette', producer: 'Pastificio Cavalieri', region: 'Apulia', regionId: 'puglia', category: 'Pasta', price: '€6', weight: '500 g', certifications: [], tags: ['Vegan'], description: 'Slow-dried orecchiette, the signature pasta of Puglia.', image: img.pasta },

  // Veneto
  { id: 'prosecco-bisol', name: 'Valdobbiadene Prosecco DOCG', producer: 'Cantina Bisol', region: 'Veneto', regionId: 'veneto', category: 'Wine', price: '€23', weight: '750 ml', certifications: ['DOCG'], tags: [], description: 'Crisp, floral Prosecco Superiore from the steep Valdobbiadene hills.', image: img.wine },
  { id: 'asiago-pennar', name: 'Asiago DOP', producer: 'Caseificio Pennar', region: 'Veneto', regionId: 'veneto', category: 'Cheese', price: '€17', weight: '500 g', certifications: ['DOP'], tags: [], description: 'Alpine cow cheese from the Asiago plateau, sweet when young.', image: img.cheese },

  // Lazio
  { id: 'miele-colli', name: 'Miele dei Colli Honey', producer: 'Miele dei Colli', region: 'Lazio', regionId: 'lazio', category: 'Honey', price: '€11', weight: '500 g', certifications: [], tags: ['Organic'], description: 'Wildflower honey from the hills around Frascati.', image: img.honey },

  // Liguria
  { id: 'pesto-rossi', name: 'Pesto Genovese DOP', producer: 'Pesto Rossi', region: 'Liguria', regionId: 'liguria', category: 'Preserves', price: '€10', weight: '180 g', certifications: ['DOP'], tags: [], description: 'Basil pesto with Genovese DOP basil, pine nuts and Ligurian oil.', image: img.preserve },

  // Calabria
  { id: 'nduja-toraldo', name: "'Nduja di Spilinga", producer: 'Salumeria Toraldo', region: 'Calabria', regionId: 'calabria', category: 'Cured Meats', price: '€14', weight: '250 g', certifications: [], tags: ['Gluten-Free'], description: 'Soft, spreadable spicy salume packed with Calabrian chilli.', image: img.meat },

  // Valle d'Aosta
  { id: 'fontina-coop', name: 'Fontina DOP', producer: 'Cooperativa Produttori Fontina', region: "Valle d'Aosta", regionId: 'valle_daosta', category: 'Cheese', price: '€24', weight: '500 g', certifications: ['DOP'], tags: [], description: 'Alpine raw-milk cheese, the heart of a true fonduta.', image: img.cheese },
];

export default productsData;
