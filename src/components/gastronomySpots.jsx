// Gastronomy activity spots per region
// coords = [lng, lat] of the real town the spot represents (e.g. Barolo → Barolo, Pecorino → Pienza).
// offset = legacy [deltaLng, deltaLat] from the region centroid, used only when coords is missing.
// Sized to cover each region's actual geographic extent
export const gastronomySpots = {
  // Toscana: ~3.5° wide, ~2.5° tall
  toscana: [
    { emoji: '🫒', label: 'Olio EVO',           to: '/ingredients/olio-extra-vergine', type: 'ingredient', offset: [-0.562,  0.321], coords: [10.93, 43.79] },
    { emoji: '🍷', label: 'Chianti',             type: 'wine',       offset: [ 0.3, -0.9], coords: [11.37, 43.49] },
    { emoji: '🧀', label: 'Pecorino',            to: '/ingredients/pecorino-toscano', type: 'ingredient', offset: [ 0.398,  0.166], coords: [11.68, 43.08] },
    { emoji: '🌿', label: 'Truffle',             type: 'ingredient', offset: [-0.6, -0.7], coords: [10.85, 43.68] },
    { emoji: '👨‍🌾', label: 'Frantoio Franci',   type: 'producer',   offset: [-0.969,  0.161], coords: [11.32, 43.58] },
    { emoji: '👨‍🌾', label: 'Cantina Rossi',     type: 'producer',   offset: [ 0.312,  0.351], coords: [11.49, 43.06] },
    { emoji: '🍽️', label: 'Bistecca Fiorentina', type: 'dish',       offset: [ 0.841, -0.168], coords: [11.25, 43.77] },
    { emoji: '🗺️', label: 'Olive Oil Tour',      type: 'experience', offset: [-0.061,  0.303], coords: [10.5, 43.84] },
  ],
  // Emilia-Romagna: ~4° wide, ~1.5° tall
  emilia_romagna: [
    { emoji: '🧀', label: 'Parmigiano',          type: 'ingredient', to: '/ingredients/parmigiano-reggiano', offset: [-1.5,  0.4], coords: [10.63, 44.7] },
    { emoji: '🥩', label: 'Prosciutto',          to: '/ingredients/prosciutto-di-parma', type: 'ingredient', offset: [ 0.885, -0.111], coords: [10.27, 44.61] },
    { emoji: '🍝', label: 'Tortellini',          type: 'dish',       offset: [ 0.4, -0.6], coords: [11.34, 44.49] },
    { emoji: '🫙', label: 'Balsamic',            to: '/ingredients/aceto-balsamico', type: 'ingredient', offset: [-0.21,  0.421], coords: [10.93, 44.65] },
    { emoji: '👨‍🌾', label: 'Acetaia Malpighi',  type: 'producer',   offset: [ 0.7,  0.3], coords: [10.95, 44.58] },
    { emoji: '👨‍🌾', label: 'Caseificio Gennari', type: 'producer',  offset: [-1.8,  0.1], coords: [10.21, 44.75] },
    { emoji: '🍾', label: 'Lambrusco',           type: 'wine',       offset: [-0.511, -0.319], coords: [11.02, 44.73] },
    { emoji: '🗺️', label: 'Dairy Visit',         type: 'experience', offset: [ 0.503, -0.086], coords: [10.45, 44.8] },
  ],
  // Lombardia: ~3.5° wide, ~2° tall
  lombardia: [
    { emoji: '🧀', label: 'Grana Padano',        to: '/ingredients/grana-padano', type: 'ingredient', offset: [-0.488,  0.203], coords: [9.5, 45.31] },
    { emoji: '🥩', label: 'Bresaola',            to: '/ingredients/bresaola', type: 'ingredient', offset: [ 0.456, -0.364], coords: [9.87, 46.17] },
    { emoji: '🍾', label: 'Franciacorta',        type: 'wine',       offset: [-0.254, -0.424], coords: [9.97, 45.6] },
    { emoji: '🍚', label: 'Risotto',             type: 'dish',       to: '/recipes/risotto-milanese', offset: [ 0.6,  0.7], coords: [9.19, 45.46] },
    { emoji: '👨‍🌾', label: 'Salumificio Valtellina', type: 'producer', offset: [ 1.4,  0.3], coords: [10.17, 46.21] },
    { emoji: '👨‍🌾', label: 'Cantina Berlucchi', type: 'producer',   offset: [-0.462,  0.462], coords: [10.04, 45.63] },
    { emoji: '🍫', label: 'Torrone Cremona',     type: 'ingredient', offset: [ 0.2, -0.2], coords: [10.02, 45.13] },
    { emoji: '🗺️', label: 'Cellar Tour',         type: 'experience', offset: [-0.314, -0.063], coords: [9.25, 44.98] },
  ],
  // Sicilia: ~4° wide, ~2° tall
  sicilia: [
    { emoji: '🍋', label: 'Citrus',              type: 'ingredient', offset: [-1.309,  0.409], coords: [14.95, 37.4] },
    { emoji: '🍷', label: 'Marsala',             type: 'wine',       offset: [-0.731, -0.122], coords: [12.47, 37.8] },
    { emoji: '🌿', label: 'Pistachio',           to: '/ingredients/pistacchio-di-bronte', type: 'ingredient', offset: [ 1.242,  0.331], coords: [14.83, 37.79] },
    { emoji: '🐟', label: 'Pesce Spada',         type: 'ingredient', offset: [ 0.13, -0.454], coords: [15.5, 38.18] },
    { emoji: '👨‍🌾', label: 'Pistacchi Bronte',  type: 'producer',   offset: [ 0.972, -0.162], coords: [14.74, 37.74] },
    { emoji: '👨‍🌾', label: 'Cioccolato Bonajuto', name: 'Cioccolato Modica Bonajuto', type: 'producer', offset: [ 0.587,  0.417], coords: [14.76, 36.86] },
    { emoji: '🍝', label: 'Pasta alla Norma',    type: 'dish',       to: '/recipes/pasta-alla-norma', offset: [-0.149,  0.347], coords: [15.05, 37.52] },
    { emoji: '🗺️', label: 'Etna Harvest',        type: 'experience', offset: [-0.394, -0.295], coords: [15.0, 37.68] },
  ],
  // Campania: ~2.5° wide, ~2° tall
  campania: [
    { emoji: '🍕', label: 'Pizza',               to: '/recipes/pizza-margherita', type: 'dish',       offset: [-0.34,  0.476], coords: [14.27, 40.86] },
    { emoji: '🧀', label: 'Mozzarella',          to: '/ingredients/mozzarella-di-bufala', type: 'ingredient', offset: [ 0.8, -0.5], coords: [14.98, 40.61] },
    { emoji: '🍅', label: 'San Marzano',         type: 'ingredient', to: '/ingredients/san-marzano', offset: [-0.061, -0.04], coords: [14.59, 40.77] },
    { emoji: '🍋', label: 'Limoncello',          to: '/ingredients/limoncello', type: 'ingredient', offset: [ 0.776,  0.431], coords: [14.4, 40.62] },
    { emoji: '👨‍🌾', label: 'Caseificio Vannulo', type: 'producer',  offset: [-0.129,  0.581], coords: [15.03, 40.42] },
    { emoji: '👨‍🌾', label: 'Gustarosso',        type: 'producer',   offset: [ 0.6,  0.1], coords: [14.68, 40.74] },
    { emoji: '🫙', label: 'Colatura Alici',      type: 'ingredient', offset: [ 0.258, -0.206], coords: [14.7, 40.66] },
    { emoji: '🗺️', label: 'Buffalo Farm',        type: 'experience', offset: [-0.014,  0.435], coords: [14.1, 41.05] },
  ],
  // Veneto: ~3° wide, ~1.5° tall
  veneto: [
    { emoji: '🍾', label: 'Prosecco',            type: 'wine',       offset: [ 0.633,  0.253], coords: [12.0, 45.9] },
    { emoji: '🧀', label: 'Asiago',              to: '/ingredients/asiago', type: 'ingredient', offset: [-0.343, -0.412], coords: [11.51, 45.87] },
    { emoji: '🍷', label: 'Amarone',             type: 'wine',       offset: [-0.8,  0.3], coords: [10.94, 45.53] },
    { emoji: '🍚', label: 'Risotto Veneto',      type: 'dish',       offset: [ 0.025, -0.042], coords: [12.24, 45.49] },
    { emoji: '👨‍🌾', label: 'Cantina Bisol',     type: 'producer',   offset: [ 0.468,  0.153], coords: [12.08, 45.93] },
    { emoji: '👨‍🌾', label: 'Allegrini',         type: 'producer',   offset: [-1.033,  0.122], coords: [10.85, 45.57] },
    { emoji: '🐟', label: 'Baccalà',             type: 'ingredient', offset: [-0.127, -0.223], coords: [11.55, 45.55] },
    { emoji: '🗺️', label: 'Prosecco Tour',       type: 'experience', offset: [-0.2,  0.6], coords: [12.3, 45.89] },
  ],
  // Piemonte: ~3° wide, ~2.5° tall
  piemonte: [
    { emoji: '🍷', label: 'Barolo',              type: 'wine',       offset: [-0.384,  0.384], coords: [7.94, 44.61] },
    { emoji: '🌿', label: 'Truffle',             type: 'ingredient', to: '/ingredients/tartufo-bianco', offset: [ 0.755, -0.504], coords: [8.1, 44.66] },
    { emoji: '🍫', label: 'Gianduiotto',         to: '/ingredients/gianduiotto', type: 'ingredient', offset: [-0.3, -0.9], coords: [7.68, 45.07] },
    { emoji: '🍷', label: 'Barbaresco',          type: 'wine',       offset: [ 0.929,  0.422], coords: [8.08, 44.73] },
    { emoji: '👨‍🌾', label: 'Giacomo Conterno',  type: 'producer',   offset: [-0.836, -0.139], coords: [7.97, 44.56] },
    { emoji: '👨‍🌾', label: 'Tartufi Morra',     type: 'producer',   offset: [ 0.09,  0.452], coords: [8.03, 44.7] },
    { emoji: '🍚', label: 'Carnaroli Rice',      type: 'ingredient', offset: [ 1.2, -0.1], coords: [8.42, 45.32] },
    { emoji: '🗺️', label: 'Truffle Hunt Alba',   type: 'experience', offset: [-0.148,  0.427], coords: [8.0, 44.65] },
  ],
  // Puglia: ~1.5° wide, ~4° tall
  puglia: [
    { emoji: '🫒', label: 'Olive Oil',           type: 'ingredient', offset: [ 1.269, -0.858], coords: [16.69, 41.11] },
    { emoji: '🧀', label: 'Burrata',             to: '/ingredients/burrata', type: 'ingredient', offset: [ 0.221, -0.099], coords: [16.29, 41.23] },
    { emoji: '🍝', label: 'Orecchiette',         type: 'dish',       offset: [ 0.3, -0.5], coords: [16.85, 41.1] },
    { emoji: '🍷', label: 'Primitivo',           type: 'wine',       offset: [-0.138, -0.519], coords: [17.63, 40.4] },
    { emoji: '👨‍🌾', label: 'Frantoio Muraglia', type: 'producer',   offset: [-0.209, -0.044], coords: [16.34, 41.19] },
    { emoji: '👨‍🌾', label: 'Caseificio Montrone', type: 'producer', offset: [ 0.6, -0.8], coords: [16.92, 40.8] },
    { emoji: '🥖', label: 'Taralli',             type: 'ingredient', offset: [-0.375,  0.122], coords: [16.55, 40.83] },
    { emoji: '🗺️', label: 'Burrata Class',       type: 'experience', offset: [ 0.124, -0.558], coords: [17.34, 40.7] },
  ],
  // Lazio: ~2° wide, ~2° tall
  lazio: [
    { emoji: '🍝', label: 'Carbonara',           to: '/recipes/carbonara', type: 'dish',       offset: [-0.7,  0.6], coords: [12.5, 41.9] },
    { emoji: '🧀', label: 'Pecorino Romano',     type: 'ingredient', to: '/ingredients/pecorino-romano', offset: [ 0.7, -0.5], coords: [12.9, 41.47] },
    { emoji: '🍷', label: 'Frascati',            type: 'wine',       offset: [ 0.5,  0.7], coords: [12.68, 41.81] },
    { emoji: '🌿', label: 'Artichoke',           type: 'ingredient', offset: [-0.178, -0.156], coords: [13.06, 41.5] },
    { emoji: '👨‍🌾', label: 'Caseificio Salvo',  type: 'producer',   offset: [-0.258,  0.687], coords: [12.35, 42.05] },
    { emoji: '👨‍🌾', label: 'Salumificio Sano',  type: 'producer',   offset: [ 0.504,  0.126], coords: [12.64, 41.73] },
    { emoji: '🍽️', label: 'Porchetta Ariccia',  type: 'dish',       offset: [ 0.089, -0.357], coords: [12.7, 41.69] },
    { emoji: '🗺️', label: 'Countryside Tour',   type: 'experience', offset: [-0.401,  0.067], coords: [12.1, 42.42] },
  ],
  // Sardegna: ~2° wide, ~4° tall
  sardegna: [
    { emoji: '🧀', label: 'Pecorino Sardo',      type: 'ingredient', offset: [-0.6,  1.5], coords: [8.78, 40.27] },
    { emoji: '🍷', label: 'Cannonau',            type: 'wine',       offset: [ 0.5,  0.5], coords: [9.4, 40.27] },
    { emoji: '🐟', label: 'Bottarga',            to: '/ingredients/bottarga', type: 'ingredient', offset: [-0.258, -0.295], coords: [8.56, 39.93] },
    { emoji: '🥃', label: 'Mirto',               type: 'ingredient', offset: [ 0.003, -0.006], coords: [8.7, 40.65] },
    { emoji: '👨‍🌾', label: 'Cantina Argiolas',  type: 'producer',   offset: [ 0.4,  1.2], coords: [9.15, 39.37] },
    { emoji: '👨‍🌾', label: 'Formaggi Argiolas', type: 'producer',   offset: [-0.5, -0.2], coords: [9.25, 39.45] },
    { emoji: '🍞', label: 'Pane Carasau',        type: 'ingredient', offset: [-0.026,  0.179], coords: [9.33, 40.32] },
    { emoji: '🗺️', label: 'Lagoon Experience',   type: 'experience', offset: [-0.3,  0.8], coords: [8.62, 39.88] },
  ],
  // Liguria: ~2.5° wide, ~0.6° tall — very horizontal
  liguria: [
    { emoji: '🌿', label: 'Pesto',               type: 'ingredient', to: '/ingredients/pesto-genovese', offset: [-0.29,  0.116], coords: [8.79, 44.43] },
    { emoji: '🫒', label: 'Taggiasca',           type: 'ingredient', offset: [ 0.746, -0.083], coords: [7.85, 43.86] },
    { emoji: '🍞', label: 'Focaccia',            type: 'dish',       offset: [-0.764, -0.153], coords: [9.15, 44.36] },
    { emoji: '🐟', label: 'Acciughe',            type: 'ingredient', offset: [ 0.16,  0.16], coords: [9.65, 44.15] },
    { emoji: '👨‍🌾', label: 'Frantoio Roi',      type: 'producer',   offset: [-0.642,  0.08], coords: [7.85, 43.93] },
    { emoji: '👨‍🌾', label: 'Pesto Rossi',       type: 'producer',   offset: [ 0.392,  0.157], coords: [8.95, 44.42] },
    { emoji: '🍷', label: 'Cinque Terre DOC',    type: 'wine',       offset: [ 0.532, -0.029], coords: [9.73, 44.11] },
    { emoji: '🗺️', label: 'Pesto Class',         type: 'experience', offset: [-0.017, -0.011], coords: [9.2, 44.36] },
  ],
  // Calabria: ~1.5° wide, ~3.5° tall
  calabria: [
    { emoji: '🌶️', label: 'Nduja',              to: '/ingredients/nduja', type: 'ingredient', offset: [-0.376,  0.903], coords: [15.93, 38.64] },
    { emoji: '🍋', label: 'Bergamot',            type: 'ingredient', offset: [ 0.031, -0.076], coords: [15.75, 38.05] },
    { emoji: '🐟', label: 'Tonno Callipo',       type: 'ingredient', offset: [-0.6, -0.3], coords: [16.16, 38.73] },
    { emoji: '🧅', label: 'Cipolla Tropea',      type: 'ingredient', offset: [ 0.406,  0.487], coords: [15.9, 38.68] },
    { emoji: '👨‍🌾', label: 'Salumeria Toraldo', type: 'producer',   offset: [-0.329,  0.697], coords: [15.97, 38.6] },
    { emoji: '👨‍🌾', label: 'Agrumeti Iiriti',   type: 'producer',   offset: [ 0.157,  0.185], coords: [15.86, 37.98] },
    { emoji: '🍷', label: 'Cirò Rosso',          type: 'wine',       offset: [ 0.477,  0.159], coords: [17.08, 39.37] },
    { emoji: '🗺️', label: 'Bergamot Walk',       type: 'experience', offset: [-0.3,  0.3], coords: [15.8, 38.02] },
  ],
  // Marche: ~1.5° wide, ~2° tall
  marche: [
    { emoji: '🌿', label: 'Truffle',             type: 'ingredient', offset: [-0.007,  0.01], coords: [12.67, 43.62] },
    { emoji: '🍷', label: 'Verdicchio',          type: 'wine',       offset: [-0.09, -0.243], coords: [13.24, 43.52] },
    { emoji: '🥩', label: 'Ciauscolo',           type: 'ingredient', offset: [-0.6, -0.5], coords: [13.09, 42.93] },
    { emoji: '🐟', label: 'Brodetto Pesce',      type: 'dish',       offset: [-0.179, -0.072], coords: [13.85, 42.95] },
    { emoji: '👨‍🌾', label: 'Tartufi Ponti',     type: 'producer',   offset: [-0.546, -0.119], coords: [12.72, 43.58] },
    { emoji: '👨‍🌾', label: 'Umani Ronchi',      type: 'producer',   offset: [ 0.303, -0.484], coords: [13.48, 43.48] },
    { emoji: '🍽️', label: 'Vincisgrassi',        type: 'dish',       offset: [-0.363,  0.078], coords: [13.45, 43.3] },
    { emoji: '🗺️', label: 'Truffle Hunt',        type: 'experience', offset: [-0.945, -0.107], coords: [12.62, 43.66] },
  ],
  // Abruzzo: ~2° wide, ~1.5° tall
  abruzzo: [
    { emoji: '🌿', label: 'Saffron',             to: '/ingredients/zafferano', type: 'ingredient', offset: [-0.204,  0.17], coords: [13.73, 42.24] },
    { emoji: '🍷', label: 'Montepulciano',       type: 'wine',       offset: [ 0.7, -0.4], coords: [13.98, 42.43] },
    { emoji: '🥩', label: 'Arrosticini',         type: 'dish',       offset: [-0.331, -0.236], coords: [13.86, 42.37] },
    { emoji: '🍝', label: 'Pasta Chitarra',      type: 'dish',       offset: [ 0.497,  0.414], coords: [14.17, 42.35] },
    { emoji: '👨‍🌾', label: 'Cantina Masciarelli', type: 'producer', offset: [-0.004, -0.06], coords: [14.22, 42.22] },
    { emoji: '👨‍🌾', label: 'Zafferano Altopiano', type: 'producer', offset: [ 0.638,  0.114], coords: [13.81, 42.21] },
    { emoji: '🧀', label: 'Pecorino Farindola',  type: 'ingredient', offset: [-0.045, -0.282], coords: [13.82, 42.44] },
    { emoji: '🗺️', label: 'Saffron Harvest',     type: 'experience', offset: [ 0.242, -0.485], coords: [13.68, 42.28] },
  ],
  // Umbria: ~1.5° wide, ~1.5° tall
  umbria: [
    { emoji: '🌿', label: 'Black Truffle',       type: 'ingredient', offset: [-0.295,  0.295], coords: [13.09, 42.79] },
    { emoji: '🍷', label: 'Sagrantino',          type: 'wine',       offset: [ 0.5, -0.3], coords: [12.65, 42.89] },
    { emoji: '🥩', label: 'Norcia Prosciutto',   type: 'ingredient', offset: [ 0.234,  0.292], coords: [13.05, 42.83] },
    { emoji: '🌱', label: 'Lenticchie',          type: 'ingredient', offset: [-0.33, -0.412], coords: [13.2, 42.83] },
    { emoji: '👨‍🌾', label: 'Cantina Antonelli', type: 'producer',   offset: [ 0.102, -0.034], coords: [12.69, 42.86] },
    { emoji: '👨‍🌾', label: 'Tartufi Bianconi',  type: 'producer',   offset: [-0.334,  0.067], coords: [13.12, 42.75] },
    { emoji: '🫙', label: 'Olio DOP Umbria',     type: 'ingredient', offset: [ 0.138, -0.672], coords: [12.62, 43.07] },
    { emoji: '🗺️', label: 'Truffle Hunt Norcia', type: 'experience', offset: [-0.145,  0.435], coords: [13.03, 42.76] },
  ],
  // Trentino-Alto Adige: ~1.5° wide, ~1.5° tall
  trentino_alto_adige: [
    { emoji: '🥩', label: 'Speck',               to: '/ingredients/speck-alto-adige', type: 'ingredient', offset: [-0.4,  0.5], coords: [11.0, 46.65] },
    { emoji: '🍎', label: 'Mela DOP',            type: 'ingredient', offset: [ 0.164, -0.131], coords: [11.05, 46.38] },
    { emoji: '🍷', label: 'Pinot Grigio',        type: 'wine',       offset: [-0.262, -0.21], coords: [11.12, 46.21] },
    { emoji: '🧀', label: 'Stelvio DOP',         type: 'ingredient', offset: [ 0.4,  0.5], coords: [10.55, 46.6] },
    { emoji: '👨‍🌾', label: 'Speck Recla',       type: 'producer',   offset: [-0.3,  0.2], coords: [10.77, 46.63] },
    { emoji: '👨‍🌾', label: 'Cantina Terlan',    type: 'producer',   offset: [-0.085, -0.344], coords: [11.25, 46.53] },
    { emoji: '🥃', label: 'Grappa Trentina',     type: 'ingredient', offset: [ 0.1,  0.5], coords: [11.12, 46.07] },
    { emoji: '🗺️', label: 'Speck Farm Tour',     type: 'experience', offset: [-0.471,  0.673], coords: [11.16, 46.69] },
  ],
  // Friuli-Venezia Giulia: ~2° wide, ~1° tall
  friuli_venezia_giulia: [
    { emoji: '🥩', label: 'San Daniele',         type: 'ingredient', offset: [-0.7,  0.3], coords: [13.01, 46.16] },
    { emoji: '🍷', label: 'Friulano',            type: 'wine',       offset: [ 0.364, -0.104], coords: [13.46, 45.96] },
    { emoji: '🧀', label: 'Montasio',            type: 'ingredient', offset: [-0.205, -0.273], coords: [13.0, 46.4] },
    { emoji: '🍽️', label: 'Frico',               type: 'dish',       offset: [ 0.231,  0.139], coords: [13.23, 46.06] },
    { emoji: '👨‍🌾', label: 'Prolongo San Daniele', type: 'producer', offset: [-0.688,  0.086], coords: [13.06, 46.13] },
    { emoji: '👨‍🌾', label: 'Cantina Jermann',   type: 'producer',   offset: [ 0.215,  0.395], coords: [13.47, 46.04] },
    { emoji: '🥃', label: 'Grappa Julia',        type: 'ingredient', offset: [ 0.243, -0.324], coords: [12.66, 45.96] },
    { emoji: '🗺️', label: 'Ham Cellar Tour',     type: 'experience', offset: [-0.4,  0.4], coords: [12.97, 46.19] },
  ],
  // Basilicata: ~2° wide, ~1.5° tall
  basilicata: [
    { emoji: '🌶️', label: 'Cruschi',             type: 'ingredient', offset: [-0.362,  0.301], coords: [16.3, 40.15] },
    { emoji: '🍷', label: 'Aglianico',           type: 'wine',       offset: [ 0.6, -0.3], coords: [15.67, 40.93] },
    { emoji: '🧀', label: 'Caciocavallo',        type: 'ingredient', offset: [-0.325, -0.186], coords: [15.8, 40.64] },
    { emoji: '🍞', label: 'Pane di Matera',      type: 'ingredient', offset: [ 0.225,  0.225], coords: [16.58, 40.67] },
    { emoji: '👨‍🌾', label: 'Cantine del Notaio', type: 'producer',  offset: [-0.207,  0.414], coords: [15.62, 40.96] },
    { emoji: '👨‍🌾', label: 'Sapori Lucani',      type: 'producer',  offset: [-0.047,  0.169], coords: [15.86, 40.57] },
    { emoji: '🫒', label: 'Olio Matera DOP',     type: 'ingredient', offset: [ 0.2, -0.6], coords: [16.45, 40.5] },
    { emoji: '🗺️', label: 'Vulture Wine Tour',   type: 'experience', offset: [-0.28,  0.105], coords: [15.68, 40.88] },
  ],
  // Molise: ~1.2° wide, ~0.8° tall — small region
  molise: [
    { emoji: '🧀', label: 'Caciocavallo',        type: 'ingredient', offset: [-0.4,  0.3], coords: [14.37, 41.81] },
    { emoji: '🍷', label: 'Tintilia',            type: 'wine',       offset: [ 0.205, -0.103], coords: [14.6, 41.6] },
    { emoji: '🥩', label: 'Agnello Molise',      type: 'ingredient', offset: [-0.168, -0.126], coords: [14.45, 41.62] },
    { emoji: '🌾', label: 'Heritage Wheat',      type: 'ingredient', offset: [ 0.4,  0.3], coords: [14.91, 41.8] },
    { emoji: '👨‍🌾', label: 'Cantine Catabbo',   type: 'producer',   offset: [-0.2,  0.2], coords: [14.98, 41.86] },
    { emoji: '👨‍🌾', label: 'Caseificio Di Nucci', type: 'producer', offset: [ 0.3,  0.1], coords: [14.42, 41.77] },
    { emoji: '🍽️', label: 'Taccozzelle',         type: 'dish',       offset: [ 0.023,  0.211], coords: [14.23, 41.59] },
    { emoji: '🗺️', label: 'Pastoral Tour',       type: 'experience', offset: [-0.021,  0.011], coords: [14.47, 41.48] },
  ],
  // Valle d'Aosta: ~1° wide, ~0.8° tall — tiny region
  valle_daosta: [
    { emoji: '🧀', label: 'Fontina',             to: '/ingredients/fontina', type: 'ingredient', offset: [-0.11,  0.11], coords: [7.33, 45.83] },
    { emoji: '🥃', label: 'Genepì',              type: 'ingredient', offset: [ 0.205, -0.136], coords: [7.36, 45.61] },
    { emoji: '🥩', label: "Lard d'Arnad",        type: 'ingredient', offset: [-0.3, -0.2], coords: [7.72, 45.65] },
    { emoji: '🍷', label: 'Donnas DOC',          type: 'wine',       offset: [ 0.3,  0.2], coords: [7.77, 45.6] },
    { emoji: '👨‍🌾', label: 'Coop Fontina',       name: 'Cooperativa Produttori Fontina', type: 'producer',  offset: [-0.065, -0.118], coords: [7.27, 45.8] },
    { emoji: '👨‍🌾', label: 'Maison Bertolin',    type: 'producer',  offset: [ 0.116,  0.173], coords: [7.67, 45.67] },
    { emoji: '🫙', label: 'Fonduta',             type: 'dish',       offset: [ 0.481, -0.094], coords: [7.32, 45.74] },
    { emoji: '🗺️', label: 'Alpine Dairy Tour',   type: 'experience', offset: [-0.304,  0.111], coords: [7.62, 45.88] },
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