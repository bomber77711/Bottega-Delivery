// Gastronomy activity spots per region
// offset = [deltaLng, deltaLat] in real degrees from centroid
// Sized to cover each region's actual geographic extent
export const gastronomySpots = {
  // Toscana: ~3.5° wide, ~2.5° tall
  toscana: [
    { emoji: '🫒', label: 'Olio EVO',           type: 'ingredient', offset: [-1.4,  0.8] },
    { emoji: '🍷', label: 'Chianti',             type: 'wine',       offset: [ 0.3, -0.9] },
    { emoji: '🧀', label: 'Pecorino',            type: 'ingredient', offset: [ 1.2,  0.5] },
    { emoji: '🌿', label: 'Truffle',             type: 'ingredient', offset: [-0.6, -0.7] },
    { emoji: '👨‍🌾', label: 'Frantoio Franci',   type: 'producer',   offset: [-1.2,  0.2] },
    { emoji: '👨‍🌾', label: 'Cantina Rossi',     type: 'producer',   offset: [ 0.8,  0.9] },
    { emoji: '🍽️', label: 'Bistecca Fiorentina', type: 'dish',       offset: [ 1.5, -0.3] },
    { emoji: '🗺️', label: 'Olive Oil Tour',      type: 'experience', offset: [-0.2,  1.0] },
  ],
  // Emilia-Romagna: ~4° wide, ~1.5° tall
  emilia_romagna: [
    { emoji: '🧀', label: 'Parmigiano',          type: 'ingredient', offset: [-1.5,  0.4] },
    { emoji: '🥩', label: 'Prosciutto',          type: 'ingredient', offset: [ 1.6, -0.2] },
    { emoji: '🍝', label: 'Tortellini',          type: 'dish',       offset: [ 0.4, -0.6] },
    { emoji: '🫙', label: 'Balsamic',            type: 'ingredient', offset: [-0.3,  0.6] },
    { emoji: '👨‍🌾', label: 'Acetaia Malpighi',  type: 'producer',   offset: [ 0.7,  0.3] },
    { emoji: '👨‍🌾', label: 'Caseificio Gennari', type: 'producer',  offset: [-1.8,  0.1] },
    { emoji: '🍾', label: 'Lambrusco',           type: 'wine',       offset: [-0.8, -0.5] },
    { emoji: '🗺️', label: 'Dairy Visit',         type: 'experience', offset: [ 1.2,  0.5] },
  ],
  // Lombardia: ~3.5° wide, ~2° tall
  lombardia: [
    { emoji: '🧀', label: 'Grana Padano',        type: 'ingredient', offset: [-1.2,  0.5] },
    { emoji: '🥩', label: 'Bresaola',            type: 'ingredient', offset: [ 1.0, -0.8] },
    { emoji: '🍾', label: 'Franciacorta',        type: 'wine',       offset: [-0.3, -0.5] },
    { emoji: '🍚', label: 'Risotto',             type: 'dish',       offset: [ 0.6,  0.7] },
    { emoji: '👨‍🌾', label: 'Salumificio Valtellina', type: 'producer', offset: [ 1.4,  0.3] },
    { emoji: '👨‍🌾', label: 'Cantina Berlucchi', type: 'producer',   offset: [-0.8,  0.8] },
    { emoji: '🍫', label: 'Torrone Cremona',     type: 'ingredient', offset: [ 0.2, -0.2] },
    { emoji: '🗺️', label: 'Cellar Tour',         type: 'experience', offset: [-1.5, -0.3] },
  ],
  // Sicilia: ~4° wide, ~2° tall
  sicilia: [
    { emoji: '🍋', label: 'Citrus',              type: 'ingredient', offset: [-1.6,  0.5] },
    { emoji: '🍷', label: 'Marsala',             type: 'wine',       offset: [-1.8, -0.3] },
    { emoji: '🌿', label: 'Pistachio',           type: 'ingredient', offset: [ 1.5,  0.4] },
    { emoji: '🐟', label: 'Pesce Spada',         type: 'ingredient', offset: [ 0.2, -0.7] },
    { emoji: '👨‍🌾', label: 'Pistacchi Bronte',  type: 'producer',   offset: [ 1.2, -0.2] },
    { emoji: '👨‍🌾', label: 'Cioccolato Bonajuto', type: 'producer', offset: [ 0.8,  0.6] },
    { emoji: '🍝', label: 'Pasta alla Norma',    type: 'dish',       offset: [-0.3,  0.7] },
    { emoji: '🗺️', label: 'Etna Harvest',        type: 'experience', offset: [-0.8, -0.6] },
  ],
  // Campania: ~2.5° wide, ~2° tall
  campania: [
    { emoji: '🍕', label: 'Pizza',               type: 'dish',       offset: [-0.5,  0.7] },
    { emoji: '🧀', label: 'Mozzarella',          type: 'ingredient', offset: [ 0.8, -0.5] },
    { emoji: '🍅', label: 'San Marzano',         type: 'ingredient', offset: [-0.9, -0.6] },
    { emoji: '🍋', label: 'Limoncello',          type: 'ingredient', offset: [ 0.9,  0.5] },
    { emoji: '👨‍🌾', label: 'Caseificio Vannulo', type: 'producer',  offset: [-0.2,  0.9] },
    { emoji: '👨‍🌾', label: 'Gustarosso',        type: 'producer',   offset: [ 0.6,  0.1] },
    { emoji: '🫙', label: 'Colatura Alici',      type: 'ingredient', offset: [ 1.0, -0.8] },
    { emoji: '🗺️', label: 'Buffalo Farm',        type: 'experience', offset: [-1.0,  0.2] },
  ],
  // Veneto: ~3° wide, ~1.5° tall
  veneto: [
    { emoji: '🍾', label: 'Prosecco',            type: 'wine',       offset: [ 1.0,  0.4] },
    { emoji: '🧀', label: 'Asiago',              type: 'ingredient', offset: [-0.5, -0.6] },
    { emoji: '🍷', label: 'Amarone',             type: 'wine',       offset: [-0.8,  0.3] },
    { emoji: '🍚', label: 'Risotto Veneto',      type: 'dish',       offset: [ 0.3, -0.5] },
    { emoji: '👨‍🌾', label: 'Cantina Bisol',     type: 'producer',   offset: [ 1.2,  0.6] },
    { emoji: '👨‍🌾', label: 'Allegrini',         type: 'producer',   offset: [-1.0,  0.5] },
    { emoji: '🐟', label: 'Baccalà',             type: 'ingredient', offset: [ 0.6, -0.3] },
    { emoji: '🗺️', label: 'Prosecco Tour',       type: 'experience', offset: [-0.2,  0.6] },
  ],
  // Piemonte: ~3° wide, ~2.5° tall
  piemonte: [
    { emoji: '🍷', label: 'Barolo',              type: 'wine',       offset: [-0.8,  0.8] },
    { emoji: '🌿', label: 'Truffle',             type: 'ingredient', offset: [ 0.9, -0.6] },
    { emoji: '🍫', label: 'Gianduiotto',         type: 'ingredient', offset: [-0.3, -0.9] },
    { emoji: '🍷', label: 'Barbaresco',          type: 'wine',       offset: [ 1.1,  0.5] },
    { emoji: '👨‍🌾', label: 'Giacomo Conterno',  type: 'producer',   offset: [-1.2, -0.2] },
    { emoji: '👨‍🌾', label: 'Tartufi Morra',     type: 'producer',   offset: [ 0.2,  1.0] },
    { emoji: '🍚', label: 'Carnaroli Rice',      type: 'ingredient', offset: [ 1.2, -0.1] },
    { emoji: '🗺️', label: 'Truffle Hunt Alba',   type: 'experience', offset: [-0.5,  0.3] },
  ],
  // Puglia: ~1.5° wide, ~4° tall
  puglia: [
    { emoji: '🫒', label: 'Olive Oil',           type: 'ingredient', offset: [-0.5,  1.5] },
    { emoji: '🧀', label: 'Burrata',             type: 'ingredient', offset: [ 0.5,  0.8] },
    { emoji: '🍝', label: 'Orecchiette',         type: 'dish',       offset: [ 0.3, -0.5] },
    { emoji: '🍷', label: 'Primitivo',           type: 'wine',       offset: [-0.4, -1.5] },
    { emoji: '👨‍🌾', label: 'Frantoio Muraglia', type: 'producer',   offset: [-0.6,  0.3] },
    { emoji: '👨‍🌾', label: 'Caseificio Montrone', type: 'producer', offset: [ 0.6, -0.8] },
    { emoji: '🥖', label: 'Taralli',             type: 'ingredient', offset: [-0.2,  1.2] },
    { emoji: '🗺️', label: 'Burrata Class',       type: 'experience', offset: [ 0.4, -1.8] },
  ],
  // Lazio: ~2° wide, ~2° tall
  lazio: [
    { emoji: '🍝', label: 'Carbonara',           type: 'dish',       offset: [-0.7,  0.6] },
    { emoji: '🧀', label: 'Pecorino Romano',     type: 'ingredient', offset: [ 0.7, -0.5] },
    { emoji: '🍷', label: 'Frascati',            type: 'wine',       offset: [ 0.5,  0.7] },
    { emoji: '🌿', label: 'Artichoke',           type: 'ingredient', offset: [-0.8, -0.7] },
    { emoji: '👨‍🌾', label: 'Caseificio Salvo',  type: 'producer',   offset: [-0.3,  0.8] },
    { emoji: '👨‍🌾', label: 'Salumificio Sano',  type: 'producer',   offset: [ 0.8,  0.2] },
    { emoji: '🍽️', label: 'Porchetta Ariccia',  type: 'dish',       offset: [ 0.2, -0.8] },
    { emoji: '🗺️', label: 'Countryside Tour',   type: 'experience', offset: [-0.6,  0.1] },
  ],
  // Sardegna: ~2° wide, ~4° tall
  sardegna: [
    { emoji: '🧀', label: 'Pecorino Sardo',      type: 'ingredient', offset: [-0.6,  1.5] },
    { emoji: '🍷', label: 'Cannonau',            type: 'wine',       offset: [ 0.5,  0.5] },
    { emoji: '🐟', label: 'Bottarga',            type: 'ingredient', offset: [-0.7, -0.8] },
    { emoji: '🥃', label: 'Mirto',               type: 'ingredient', offset: [ 0.6, -1.5] },
    { emoji: '👨‍🌾', label: 'Cantina Argiolas',  type: 'producer',   offset: [ 0.4,  1.2] },
    { emoji: '👨‍🌾', label: 'Formaggi Argiolas', type: 'producer',   offset: [-0.5, -0.2] },
    { emoji: '🍞', label: 'Pane Carasau',        type: 'ingredient', offset: [ 0.3, -0.5] },
    { emoji: '🗺️', label: 'Lagoon Experience',   type: 'experience', offset: [-0.3,  0.8] },
  ],
  // Liguria: ~2.5° wide, ~0.6° tall — very horizontal
  liguria: [
    { emoji: '🌿', label: 'Pesto',               type: 'ingredient', offset: [-0.5,  0.2] },
    { emoji: '🫒', label: 'Taggiasca',           type: 'ingredient', offset: [ 0.9, -0.1] },
    { emoji: '🍞', label: 'Focaccia',            type: 'dish',       offset: [-1.0, -0.2] },
    { emoji: '🐟', label: 'Acciughe',            type: 'ingredient', offset: [ 0.2,  0.2] },
    { emoji: '👨‍🌾', label: 'Frantoio Roi',      type: 'producer',   offset: [-0.8,  0.1] },
    { emoji: '👨‍🌾', label: 'Pesto Rossi',       type: 'producer',   offset: [ 0.5,  0.2] },
    { emoji: '🍷', label: 'Cinque Terre DOC',    type: 'wine',       offset: [ 1.1, -0.2] },
    { emoji: '🗺️', label: 'Pesto Class',         type: 'experience', offset: [-0.3, -0.2] },
  ],
  // Calabria: ~1.5° wide, ~3.5° tall
  calabria: [
    { emoji: '🌶️', label: 'Nduja',              type: 'ingredient', offset: [-0.5,  1.2] },
    { emoji: '🍋', label: 'Bergamot',            type: 'ingredient', offset: [ 0.4, -1.0] },
    { emoji: '🐟', label: 'Tonno Callipo',       type: 'ingredient', offset: [-0.6, -0.3] },
    { emoji: '🧅', label: 'Cipolla Tropea',      type: 'ingredient', offset: [ 0.5,  0.6] },
    { emoji: '👨‍🌾', label: 'Salumeria Toraldo', type: 'producer',   offset: [-0.4,  1.5] },
    { emoji: '👨‍🌾', label: 'Agrumeti Iiriti',   type: 'producer',   offset: [ 0.4, -1.4] },
    { emoji: '🍷', label: 'Cirò Rosso',          type: 'wine',       offset: [ 0.6,  0.2] },
    { emoji: '🗺️', label: 'Bergamot Walk',       type: 'experience', offset: [-0.3,  0.3] },
  ],
  // Marche: ~1.5° wide, ~2° tall
  marche: [
    { emoji: '🌿', label: 'Truffle',             type: 'ingredient', offset: [-0.5,  0.7] },
    { emoji: '🍷', label: 'Verdicchio',          type: 'wine',       offset: [ 0.5, -0.3] },
    { emoji: '🥩', label: 'Ciauscolo',           type: 'ingredient', offset: [-0.6, -0.5] },
    { emoji: '🐟', label: 'Brodetto Pesce',      type: 'dish',       offset: [ 0.6,  0.5] },
    { emoji: '👨‍🌾', label: 'Tartufi Ponti',     type: 'producer',   offset: [-0.4,  0.9] },
    { emoji: '👨‍🌾', label: 'Umani Ronchi',      type: 'producer',   offset: [ 0.5, -0.8] },
    { emoji: '🍽️', label: 'Vincisgrassi',        type: 'dish',       offset: [-0.2,  0.2] },
    { emoji: '🗺️', label: 'Truffle Hunt',        type: 'experience', offset: [ 0.3,  0.8] },
  ],
  // Abruzzo: ~2° wide, ~1.5° tall
  abruzzo: [
    { emoji: '🌿', label: 'Saffron',             type: 'ingredient', offset: [-0.6,  0.5] },
    { emoji: '🍷', label: 'Montepulciano',       type: 'wine',       offset: [ 0.7, -0.4] },
    { emoji: '🥩', label: 'Arrosticini',         type: 'dish',       offset: [-0.7, -0.5] },
    { emoji: '🍝', label: 'Pasta Chitarra',      type: 'dish',       offset: [ 0.6,  0.5] },
    { emoji: '👨‍🌾', label: 'Cantina Masciarelli', type: 'producer', offset: [-0.3,  0.6] },
    { emoji: '👨‍🌾', label: 'Zafferano Altopiano', type: 'producer', offset: [ 0.5,  0.3] },
    { emoji: '🧀', label: 'Pecorino Farindola',  type: 'ingredient', offset: [-0.8,  0.1] },
    { emoji: '🗺️', label: 'Saffron Harvest',     type: 'experience', offset: [ 0.3, -0.6] },
  ],
  // Umbria: ~1.5° wide, ~1.5° tall
  umbria: [
    { emoji: '🌿', label: 'Black Truffle',       type: 'ingredient', offset: [-0.5,  0.5] },
    { emoji: '🍷', label: 'Sagrantino',          type: 'wine',       offset: [ 0.5, -0.3] },
    { emoji: '🥩', label: 'Norcia Prosciutto',   type: 'ingredient', offset: [ 0.4,  0.5] },
    { emoji: '🌱', label: 'Lenticchie',          type: 'ingredient', offset: [-0.4, -0.5] },
    { emoji: '👨‍🌾', label: 'Cantina Antonelli', type: 'producer',   offset: [ 0.3,  0.3] },
    { emoji: '👨‍🌾', label: 'Tartufi Bianconi',  type: 'producer',   offset: [-0.5,  0.1] },
    { emoji: '🫙', label: 'Olio DOP Umbria',     type: 'ingredient', offset: [ 0.5, -0.5] },
    { emoji: '🗺️', label: 'Truffle Hunt Norcia', type: 'experience', offset: [-0.2,  0.6] },
  ],
  // Trentino-Alto Adige: ~1.5° wide, ~1.5° tall
  trentino_alto_adige: [
    { emoji: '🥩', label: 'Speck',               type: 'ingredient', offset: [-0.4,  0.5] },
    { emoji: '🍎', label: 'Mela DOP',            type: 'ingredient', offset: [ 0.5, -0.4] },
    { emoji: '🍷', label: 'Pinot Grigio',        type: 'wine',       offset: [-0.5, -0.4] },
    { emoji: '🧀', label: 'Stelvio DOP',         type: 'ingredient', offset: [ 0.4,  0.5] },
    { emoji: '👨‍🌾', label: 'Speck Recla',       type: 'producer',   offset: [-0.3,  0.2] },
    { emoji: '👨‍🌾', label: 'Cantina Terlan',    type: 'producer',   offset: [ 0.4, -0.2] },
    { emoji: '🥃', label: 'Grappa Trentina',     type: 'ingredient', offset: [ 0.1,  0.5] },
    { emoji: '🗺️', label: 'Speck Farm Tour',     type: 'experience', offset: [-0.4, -0.2] },
  ],
  // Friuli-Venezia Giulia: ~2° wide, ~1° tall
  friuli_venezia_giulia: [
    { emoji: '🥩', label: 'San Daniele',         type: 'ingredient', offset: [-0.7,  0.3] },
    { emoji: '🍷', label: 'Friulano',            type: 'wine',       offset: [ 0.7, -0.2] },
    { emoji: '🧀', label: 'Montasio',            type: 'ingredient', offset: [-0.3, -0.4] },
    { emoji: '🍽️', label: 'Frico',               type: 'dish',       offset: [ 0.5,  0.3] },
    { emoji: '👨‍🌾', label: 'Prolongo San Daniele', type: 'producer', offset: [-0.8,  0.1] },
    { emoji: '👨‍🌾', label: 'Cantina Jermann',   type: 'producer',   offset: [ 0.8,  0.3] },
    { emoji: '🥃', label: 'Grappa Julia',        type: 'ingredient', offset: [ 0.3, -0.4] },
    { emoji: '🗺️', label: 'Ham Cellar Tour',     type: 'experience', offset: [-0.4,  0.4] },
  ],
  // Basilicata: ~2° wide, ~1.5° tall
  basilicata: [
    { emoji: '🌶️', label: 'Cruschi',             type: 'ingredient', offset: [-0.6,  0.5] },
    { emoji: '🍷', label: 'Aglianico',           type: 'wine',       offset: [ 0.6, -0.3] },
    { emoji: '🧀', label: 'Caciocavallo',        type: 'ingredient', offset: [-0.7, -0.4] },
    { emoji: '🍞', label: 'Pane di Matera',      type: 'ingredient', offset: [ 0.5,  0.5] },
    { emoji: '👨‍🌾', label: 'Cantine del Notaio', type: 'producer',  offset: [-0.3,  0.6] },
    { emoji: '👨‍🌾', label: 'Sapori Lucani',      type: 'producer',  offset: [ 0.7,  0.2] },
    { emoji: '🫒', label: 'Olio Matera DOP',     type: 'ingredient', offset: [ 0.2, -0.6] },
    { emoji: '🗺️', label: 'Vulture Wine Tour',   type: 'experience', offset: [-0.5, -0.1] },
  ],
  // Molise: ~1.2° wide, ~0.8° tall — small region
  molise: [
    { emoji: '🧀', label: 'Caciocavallo',        type: 'ingredient', offset: [-0.4,  0.3] },
    { emoji: '🍷', label: 'Tintilia',            type: 'wine',       offset: [ 0.4, -0.2] },
    { emoji: '🥩', label: 'Agnello Molise',      type: 'ingredient', offset: [-0.4, -0.3] },
    { emoji: '🌾', label: 'Heritage Wheat',      type: 'ingredient', offset: [ 0.4,  0.3] },
    { emoji: '👨‍🌾', label: 'Cantine Catabbo',   type: 'producer',   offset: [-0.2,  0.2] },
    { emoji: '👨‍🌾', label: 'Caseificio Di Nucci', type: 'producer', offset: [ 0.3,  0.1] },
    { emoji: '🍽️', label: 'Taccozzelle',         type: 'dish',       offset: [ 0.1, -0.3] },
    { emoji: '🗺️', label: 'Pastoral Tour',       type: 'experience', offset: [-0.3,  0.1] },
  ],
  // Valle d'Aosta: ~1° wide, ~0.8° tall — tiny region
  valle_daosta: [
    { emoji: '🧀', label: 'Fontina',             type: 'ingredient', offset: [-0.3,  0.3] },
    { emoji: '🥃', label: 'Genepì',              type: 'ingredient', offset: [ 0.3, -0.2] },
    { emoji: '🥩', label: "Lard d'Arnad",        type: 'ingredient', offset: [-0.3, -0.2] },
    { emoji: '🍷', label: 'Donnas DOC',          type: 'wine',       offset: [ 0.3,  0.2] },
    { emoji: '👨‍🌾', label: 'Coop Fontina',       type: 'producer',  offset: [-0.2,  0.1] },
    { emoji: '👨‍🌾', label: 'Maison Bertolin',    type: 'producer',  offset: [ 0.2,  0.3] },
    { emoji: '🫙', label: 'Fonduta',             type: 'dish',       offset: [ 0.1, -0.3] },
    { emoji: '🗺️', label: 'Alpine Dairy Tour',   type: 'experience', offset: [-0.1,  0.2] },
  ],
};

export const spotTypeColors = {
  wine: '#9B2335',
  cheese: '#C76A3A',
  meat: '#8B4513',
  dish: '#2E7D32',
  ingredient: '#4CAF50',
  condiment: '#C76A3A',
  fish: '#1565C0',
  fruit: '#F57C00',
  spice: '#D32F2F',
  bread: '#8D6E63',
  sweet: '#6A1B9A',
  spirits: '#4E342E',
  citrus: '#F57C00',
  producer: '#1976D2',
  experience: '#E65100',
};