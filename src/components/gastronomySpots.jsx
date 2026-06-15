// Gastronomy activity spots per region
// offset = [deltaLng, deltaLat] in real degrees from centroid
// Sized to cover each region's actual geographic extent
export const gastronomySpots = {
  // Toscana: ~3.5° wide, ~2.5° tall
  toscana: [
    { emoji: '🫒', label: 'Olio EVO',           to: '/ingredients/olio-extra-vergine', type: 'ingredient', offset: [-0.562,  0.321] },
    { emoji: '🍷', label: 'Chianti',             type: 'wine',       offset: [ 0.3, -0.9] },
    { emoji: '🧀', label: 'Pecorino',            to: '/ingredients/pecorino-toscano', type: 'ingredient', offset: [ 0.398,  0.166] },
    { emoji: '🌿', label: 'Truffle',             type: 'ingredient', offset: [-0.6, -0.7] },
    { emoji: '👨‍🌾', label: 'Frantoio Franci',   type: 'producer',   offset: [-0.969,  0.161] },
    { emoji: '👨‍🌾', label: 'Cantina Rossi',     type: 'producer',   offset: [ 0.312,  0.351] },
    { emoji: '🍽️', label: 'Bistecca Fiorentina', type: 'dish',       offset: [ 0.841, -0.168] },
    { emoji: '🗺️', label: 'Olive Oil Tour',      type: 'experience', offset: [-0.061,  0.303] },
  ],
  // Emilia-Romagna: ~4° wide, ~1.5° tall
  emilia_romagna: [
    { emoji: '🧀', label: 'Parmigiano',          type: 'ingredient', to: '/ingredients/parmigiano-reggiano', offset: [-1.5,  0.4] },
    { emoji: '🥩', label: 'Prosciutto',          to: '/ingredients/prosciutto-di-parma', type: 'ingredient', offset: [ 0.885, -0.111] },
    { emoji: '🍝', label: 'Tortellini',          type: 'dish',       offset: [ 0.4, -0.6] },
    { emoji: '🫙', label: 'Balsamic',            to: '/ingredients/aceto-balsamico', type: 'ingredient', offset: [-0.21,  0.421] },
    { emoji: '👨‍🌾', label: 'Acetaia Malpighi',  type: 'producer',   offset: [ 0.7,  0.3] },
    { emoji: '👨‍🌾', label: 'Caseificio Gennari', type: 'producer',  offset: [-1.8,  0.1] },
    { emoji: '🍾', label: 'Lambrusco',           type: 'wine',       offset: [-0.511, -0.319] },
    { emoji: '🗺️', label: 'Dairy Visit',         type: 'experience', offset: [ 0.503, -0.086] },
  ],
  // Lombardia: ~3.5° wide, ~2° tall
  lombardia: [
    { emoji: '🧀', label: 'Grana Padano',        to: '/ingredients/grana-padano', type: 'ingredient', offset: [-0.488,  0.203] },
    { emoji: '🥩', label: 'Bresaola',            to: '/ingredients/bresaola', type: 'ingredient', offset: [ 0.456, -0.364] },
    { emoji: '🍾', label: 'Franciacorta',        type: 'wine',       offset: [-0.254, -0.424] },
    { emoji: '🍚', label: 'Risotto',             type: 'dish',       to: '/recipes/risotto-milanese', offset: [ 0.6,  0.7] },
    { emoji: '👨‍🌾', label: 'Salumificio Valtellina', type: 'producer', offset: [ 1.4,  0.3] },
    { emoji: '👨‍🌾', label: 'Cantina Berlucchi', type: 'producer',   offset: [-0.462,  0.462] },
    { emoji: '🍫', label: 'Torrone Cremona',     type: 'ingredient', offset: [ 0.2, -0.2] },
    { emoji: '🗺️', label: 'Cellar Tour',         type: 'experience', offset: [-0.314, -0.063] },
  ],
  // Sicilia: ~4° wide, ~2° tall
  sicilia: [
    { emoji: '🍋', label: 'Citrus',              type: 'ingredient', offset: [-1.309,  0.409] },
    { emoji: '🍷', label: 'Marsala',             type: 'wine',       offset: [-0.731, -0.122] },
    { emoji: '🌿', label: 'Pistachio',           to: '/ingredients/pistacchio-di-bronte', type: 'ingredient', offset: [ 1.242,  0.331] },
    { emoji: '🐟', label: 'Pesce Spada',         type: 'ingredient', offset: [ 0.13, -0.454] },
    { emoji: '👨‍🌾', label: 'Pistacchi Bronte',  type: 'producer',   offset: [ 0.972, -0.162] },
    { emoji: '👨‍🌾', label: 'Cioccolato Bonajuto', name: 'Cioccolato Modica Bonajuto', type: 'producer', offset: [ 0.587,  0.417] },
    { emoji: '🍝', label: 'Pasta alla Norma',    type: 'dish',       to: '/recipes/pasta-alla-norma', offset: [-0.149,  0.347] },
    { emoji: '🗺️', label: 'Etna Harvest',        type: 'experience', offset: [-0.394, -0.295] },
  ],
  // Campania: ~2.5° wide, ~2° tall
  campania: [
    { emoji: '🍕', label: 'Pizza',               to: '/recipes/pizza-margherita', type: 'dish',       offset: [-0.34,  0.476] },
    { emoji: '🧀', label: 'Mozzarella',          to: '/ingredients/mozzarella-di-bufala', type: 'ingredient', offset: [ 0.8, -0.5] },
    { emoji: '🍅', label: 'San Marzano',         type: 'ingredient', to: '/ingredients/san-marzano', offset: [-0.061, -0.04] },
    { emoji: '🍋', label: 'Limoncello',          to: '/ingredients/limoncello', type: 'ingredient', offset: [ 0.776,  0.431] },
    { emoji: '👨‍🌾', label: 'Caseificio Vannulo', type: 'producer',  offset: [-0.129,  0.581] },
    { emoji: '👨‍🌾', label: 'Gustarosso',        type: 'producer',   offset: [ 0.6,  0.1] },
    { emoji: '🫙', label: 'Colatura Alici',      type: 'ingredient', offset: [ 0.258, -0.206] },
    { emoji: '🗺️', label: 'Buffalo Farm',        type: 'experience', offset: [-0.014,  0.435] },
  ],
  // Veneto: ~3° wide, ~1.5° tall
  veneto: [
    { emoji: '🍾', label: 'Prosecco',            type: 'wine',       offset: [ 0.633,  0.253] },
    { emoji: '🧀', label: 'Asiago',              to: '/ingredients/asiago', type: 'ingredient', offset: [-0.343, -0.412] },
    { emoji: '🍷', label: 'Amarone',             type: 'wine',       offset: [-0.8,  0.3] },
    { emoji: '🍚', label: 'Risotto Veneto',      type: 'dish',       offset: [ 0.025, -0.042] },
    { emoji: '👨‍🌾', label: 'Cantina Bisol',     type: 'producer',   offset: [ 0.468,  0.153] },
    { emoji: '👨‍🌾', label: 'Allegrini',         type: 'producer',   offset: [-1.033,  0.122] },
    { emoji: '🐟', label: 'Baccalà',             type: 'ingredient', offset: [-0.127, -0.223] },
    { emoji: '🗺️', label: 'Prosecco Tour',       type: 'experience', offset: [-0.2,  0.6] },
  ],
  // Piemonte: ~3° wide, ~2.5° tall
  piemonte: [
    { emoji: '🍷', label: 'Barolo',              type: 'wine',       offset: [-0.384,  0.384] },
    { emoji: '🌿', label: 'Truffle',             type: 'ingredient', to: '/ingredients/tartufo-bianco', offset: [ 0.755, -0.504] },
    { emoji: '🍫', label: 'Gianduiotto',         to: '/ingredients/gianduiotto', type: 'ingredient', offset: [-0.3, -0.9] },
    { emoji: '🍷', label: 'Barbaresco',          type: 'wine',       offset: [ 0.929,  0.422] },
    { emoji: '👨‍🌾', label: 'Giacomo Conterno',  type: 'producer',   offset: [-0.836, -0.139] },
    { emoji: '👨‍🌾', label: 'Tartufi Morra',     type: 'producer',   offset: [ 0.09,  0.452] },
    { emoji: '🍚', label: 'Carnaroli Rice',      type: 'ingredient', offset: [ 1.2, -0.1] },
    { emoji: '🗺️', label: 'Truffle Hunt Alba',   type: 'experience', offset: [-0.148,  0.427] },
  ],
  // Puglia: ~1.5° wide, ~4° tall
  puglia: [
    { emoji: '🫒', label: 'Olive Oil',           type: 'ingredient', offset: [ 1.269, -0.858] },
    { emoji: '🧀', label: 'Burrata',             to: '/ingredients/burrata', type: 'ingredient', offset: [ 0.221, -0.099] },
    { emoji: '🍝', label: 'Orecchiette',         type: 'dish',       offset: [ 0.3, -0.5] },
    { emoji: '🍷', label: 'Primitivo',           type: 'wine',       offset: [-0.138, -0.519] },
    { emoji: '👨‍🌾', label: 'Frantoio Muraglia', type: 'producer',   offset: [-0.209, -0.044] },
    { emoji: '👨‍🌾', label: 'Caseificio Montrone', type: 'producer', offset: [ 0.6, -0.8] },
    { emoji: '🥖', label: 'Taralli',             type: 'ingredient', offset: [-0.375,  0.122] },
    { emoji: '🗺️', label: 'Burrata Class',       type: 'experience', offset: [ 0.124, -0.558] },
  ],
  // Lazio: ~2° wide, ~2° tall
  lazio: [
    { emoji: '🍝', label: 'Carbonara',           to: '/recipes/carbonara', type: 'dish',       offset: [-0.7,  0.6] },
    { emoji: '🧀', label: 'Pecorino Romano',     type: 'ingredient', to: '/ingredients/pecorino-romano', offset: [ 0.7, -0.5] },
    { emoji: '🍷', label: 'Frascati',            type: 'wine',       offset: [ 0.5,  0.7] },
    { emoji: '🌿', label: 'Artichoke',           type: 'ingredient', offset: [-0.178, -0.156] },
    { emoji: '👨‍🌾', label: 'Caseificio Salvo',  type: 'producer',   offset: [-0.258,  0.687] },
    { emoji: '👨‍🌾', label: 'Salumificio Sano',  type: 'producer',   offset: [ 0.504,  0.126] },
    { emoji: '🍽️', label: 'Porchetta Ariccia',  type: 'dish',       offset: [ 0.089, -0.357] },
    { emoji: '🗺️', label: 'Countryside Tour',   type: 'experience', offset: [-0.401,  0.067] },
  ],
  // Sardegna: ~2° wide, ~4° tall
  sardegna: [
    { emoji: '🧀', label: 'Pecorino Sardo',      type: 'ingredient', offset: [-0.6,  1.5] },
    { emoji: '🍷', label: 'Cannonau',            type: 'wine',       offset: [ 0.5,  0.5] },
    { emoji: '🐟', label: 'Bottarga',            to: '/ingredients/bottarga', type: 'ingredient', offset: [-0.258, -0.295] },
    { emoji: '🥃', label: 'Mirto',               type: 'ingredient', offset: [ 0.003, -0.006] },
    { emoji: '👨‍🌾', label: 'Cantina Argiolas',  type: 'producer',   offset: [ 0.4,  1.2] },
    { emoji: '👨‍🌾', label: 'Formaggi Argiolas', type: 'producer',   offset: [-0.5, -0.2] },
    { emoji: '🍞', label: 'Pane Carasau',        type: 'ingredient', offset: [-0.026,  0.179] },
    { emoji: '🗺️', label: 'Lagoon Experience',   type: 'experience', offset: [-0.3,  0.8] },
  ],
  // Liguria: ~2.5° wide, ~0.6° tall — very horizontal
  liguria: [
    { emoji: '🌿', label: 'Pesto',               type: 'ingredient', to: '/ingredients/pesto-genovese', offset: [-0.29,  0.116] },
    { emoji: '🫒', label: 'Taggiasca',           type: 'ingredient', offset: [ 0.746, -0.083] },
    { emoji: '🍞', label: 'Focaccia',            type: 'dish',       offset: [-0.764, -0.153] },
    { emoji: '🐟', label: 'Acciughe',            type: 'ingredient', offset: [ 0.16,  0.16] },
    { emoji: '👨‍🌾', label: 'Frantoio Roi',      type: 'producer',   offset: [-0.642,  0.08] },
    { emoji: '👨‍🌾', label: 'Pesto Rossi',       type: 'producer',   offset: [ 0.392,  0.157] },
    { emoji: '🍷', label: 'Cinque Terre DOC',    type: 'wine',       offset: [ 0.532, -0.029] },
    { emoji: '🗺️', label: 'Pesto Class',         type: 'experience', offset: [-0.017, -0.011] },
  ],
  // Calabria: ~1.5° wide, ~3.5° tall
  calabria: [
    { emoji: '🌶️', label: 'Nduja',              to: '/ingredients/nduja', type: 'ingredient', offset: [-0.376,  0.903] },
    { emoji: '🍋', label: 'Bergamot',            type: 'ingredient', offset: [ 0.031, -0.076] },
    { emoji: '🐟', label: 'Tonno Callipo',       type: 'ingredient', offset: [-0.6, -0.3] },
    { emoji: '🧅', label: 'Cipolla Tropea',      type: 'ingredient', offset: [ 0.406,  0.487] },
    { emoji: '👨‍🌾', label: 'Salumeria Toraldo', type: 'producer',   offset: [-0.329,  0.697] },
    { emoji: '👨‍🌾', label: 'Agrumeti Iiriti',   type: 'producer',   offset: [ 0.157,  0.185] },
    { emoji: '🍷', label: 'Cirò Rosso',          type: 'wine',       offset: [ 0.477,  0.159] },
    { emoji: '🗺️', label: 'Bergamot Walk',       type: 'experience', offset: [-0.3,  0.3] },
  ],
  // Marche: ~1.5° wide, ~2° tall
  marche: [
    { emoji: '🌿', label: 'Truffle',             type: 'ingredient', offset: [-0.007,  0.01] },
    { emoji: '🍷', label: 'Verdicchio',          type: 'wine',       offset: [-0.09, -0.243] },
    { emoji: '🥩', label: 'Ciauscolo',           type: 'ingredient', offset: [-0.6, -0.5] },
    { emoji: '🐟', label: 'Brodetto Pesce',      type: 'dish',       offset: [-0.179, -0.072] },
    { emoji: '👨‍🌾', label: 'Tartufi Ponti',     type: 'producer',   offset: [-0.546, -0.119] },
    { emoji: '👨‍🌾', label: 'Umani Ronchi',      type: 'producer',   offset: [ 0.303, -0.484] },
    { emoji: '🍽️', label: 'Vincisgrassi',        type: 'dish',       offset: [-0.363,  0.078] },
    { emoji: '🗺️', label: 'Truffle Hunt',        type: 'experience', offset: [-0.945, -0.107] },
  ],
  // Abruzzo: ~2° wide, ~1.5° tall
  abruzzo: [
    { emoji: '🌿', label: 'Saffron',             to: '/ingredients/zafferano', type: 'ingredient', offset: [-0.204,  0.17] },
    { emoji: '🍷', label: 'Montepulciano',       type: 'wine',       offset: [ 0.7, -0.4] },
    { emoji: '🥩', label: 'Arrosticini',         type: 'dish',       offset: [-0.331, -0.236] },
    { emoji: '🍝', label: 'Pasta Chitarra',      type: 'dish',       offset: [ 0.497,  0.414] },
    { emoji: '👨‍🌾', label: 'Cantina Masciarelli', type: 'producer', offset: [-0.004, -0.06] },
    { emoji: '👨‍🌾', label: 'Zafferano Altopiano', type: 'producer', offset: [ 0.638,  0.114] },
    { emoji: '🧀', label: 'Pecorino Farindola',  type: 'ingredient', offset: [-0.045, -0.282] },
    { emoji: '🗺️', label: 'Saffron Harvest',     type: 'experience', offset: [ 0.242, -0.485] },
  ],
  // Umbria: ~1.5° wide, ~1.5° tall
  umbria: [
    { emoji: '🌿', label: 'Black Truffle',       type: 'ingredient', offset: [-0.295,  0.295] },
    { emoji: '🍷', label: 'Sagrantino',          type: 'wine',       offset: [ 0.5, -0.3] },
    { emoji: '🥩', label: 'Norcia Prosciutto',   type: 'ingredient', offset: [ 0.234,  0.292] },
    { emoji: '🌱', label: 'Lenticchie',          type: 'ingredient', offset: [-0.33, -0.412] },
    { emoji: '👨‍🌾', label: 'Cantina Antonelli', type: 'producer',   offset: [ 0.102, -0.034] },
    { emoji: '👨‍🌾', label: 'Tartufi Bianconi',  type: 'producer',   offset: [-0.334,  0.067] },
    { emoji: '🫙', label: 'Olio DOP Umbria',     type: 'ingredient', offset: [ 0.138, -0.672] },
    { emoji: '🗺️', label: 'Truffle Hunt Norcia', type: 'experience', offset: [-0.145,  0.435] },
  ],
  // Trentino-Alto Adige: ~1.5° wide, ~1.5° tall
  trentino_alto_adige: [
    { emoji: '🥩', label: 'Speck',               to: '/ingredients/speck-alto-adige', type: 'ingredient', offset: [-0.4,  0.5] },
    { emoji: '🍎', label: 'Mela DOP',            type: 'ingredient', offset: [ 0.164, -0.131] },
    { emoji: '🍷', label: 'Pinot Grigio',        type: 'wine',       offset: [-0.262, -0.21] },
    { emoji: '🧀', label: 'Stelvio DOP',         type: 'ingredient', offset: [ 0.4,  0.5] },
    { emoji: '👨‍🌾', label: 'Speck Recla',       type: 'producer',   offset: [-0.3,  0.2] },
    { emoji: '👨‍🌾', label: 'Cantina Terlan',    type: 'producer',   offset: [-0.085, -0.344] },
    { emoji: '🥃', label: 'Grappa Trentina',     type: 'ingredient', offset: [ 0.1,  0.5] },
    { emoji: '🗺️', label: 'Speck Farm Tour',     type: 'experience', offset: [-0.471,  0.673] },
  ],
  // Friuli-Venezia Giulia: ~2° wide, ~1° tall
  friuli_venezia_giulia: [
    { emoji: '🥩', label: 'San Daniele',         type: 'ingredient', offset: [-0.7,  0.3] },
    { emoji: '🍷', label: 'Friulano',            type: 'wine',       offset: [ 0.364, -0.104] },
    { emoji: '🧀', label: 'Montasio',            type: 'ingredient', offset: [-0.205, -0.273] },
    { emoji: '🍽️', label: 'Frico',               type: 'dish',       offset: [ 0.231,  0.139] },
    { emoji: '👨‍🌾', label: 'Prolongo San Daniele', type: 'producer', offset: [-0.688,  0.086] },
    { emoji: '👨‍🌾', label: 'Cantina Jermann',   type: 'producer',   offset: [ 0.215,  0.395] },
    { emoji: '🥃', label: 'Grappa Julia',        type: 'ingredient', offset: [ 0.243, -0.324] },
    { emoji: '🗺️', label: 'Ham Cellar Tour',     type: 'experience', offset: [-0.4,  0.4] },
  ],
  // Basilicata: ~2° wide, ~1.5° tall
  basilicata: [
    { emoji: '🌶️', label: 'Cruschi',             type: 'ingredient', offset: [-0.362,  0.301] },
    { emoji: '🍷', label: 'Aglianico',           type: 'wine',       offset: [ 0.6, -0.3] },
    { emoji: '🧀', label: 'Caciocavallo',        type: 'ingredient', offset: [-0.325, -0.186] },
    { emoji: '🍞', label: 'Pane di Matera',      type: 'ingredient', offset: [ 0.225,  0.225] },
    { emoji: '👨‍🌾', label: 'Cantine del Notaio', type: 'producer',  offset: [-0.207,  0.414] },
    { emoji: '👨‍🌾', label: 'Sapori Lucani',      type: 'producer',  offset: [-0.047,  0.169] },
    { emoji: '🫒', label: 'Olio Matera DOP',     type: 'ingredient', offset: [ 0.2, -0.6] },
    { emoji: '🗺️', label: 'Vulture Wine Tour',   type: 'experience', offset: [-0.28,  0.105] },
  ],
  // Molise: ~1.2° wide, ~0.8° tall — small region
  molise: [
    { emoji: '🧀', label: 'Caciocavallo',        type: 'ingredient', offset: [-0.4,  0.3] },
    { emoji: '🍷', label: 'Tintilia',            type: 'wine',       offset: [ 0.205, -0.103] },
    { emoji: '🥩', label: 'Agnello Molise',      type: 'ingredient', offset: [-0.168, -0.126] },
    { emoji: '🌾', label: 'Heritage Wheat',      type: 'ingredient', offset: [ 0.4,  0.3] },
    { emoji: '👨‍🌾', label: 'Cantine Catabbo',   type: 'producer',   offset: [-0.2,  0.2] },
    { emoji: '👨‍🌾', label: 'Caseificio Di Nucci', type: 'producer', offset: [ 0.3,  0.1] },
    { emoji: '🍽️', label: 'Taccozzelle',         type: 'dish',       offset: [ 0.023,  0.211] },
    { emoji: '🗺️', label: 'Pastoral Tour',       type: 'experience', offset: [-0.021,  0.011] },
  ],
  // Valle d'Aosta: ~1° wide, ~0.8° tall — tiny region
  valle_daosta: [
    { emoji: '🧀', label: 'Fontina',             to: '/ingredients/fontina', type: 'ingredient', offset: [-0.11,  0.11] },
    { emoji: '🥃', label: 'Genepì',              type: 'ingredient', offset: [ 0.205, -0.136] },
    { emoji: '🥩', label: "Lard d'Arnad",        type: 'ingredient', offset: [-0.3, -0.2] },
    { emoji: '🍷', label: 'Donnas DOC',          type: 'wine',       offset: [ 0.3,  0.2] },
    { emoji: '👨‍🌾', label: 'Coop Fontina',       name: 'Cooperativa Produttori Fontina', type: 'producer',  offset: [-0.065, -0.118] },
    { emoji: '👨‍🌾', label: 'Maison Bertolin',    type: 'producer',  offset: [ 0.116,  0.173] },
    { emoji: '🫙', label: 'Fonduta',             type: 'dish',       offset: [ 0.481, -0.094] },
    { emoji: '🗺️', label: 'Alpine Dairy Tour',   type: 'experience', offset: [-0.304,  0.111] },
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