// Experiences (tastings, farm visits, classes) for Bottega Delivery.
// producer matches a real producer name in regionData; regionId matches a region id.
// experienceTypes drives the type filter chips on /experiences.

export const experienceTypes = [
  'All', 'Farm Visit', 'Wine Tasting', 'Cooking Class', 'Tour', 'Harvest',
];

const img = {
  oil: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=800&q=80',
  wine: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
  cook: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
  farm: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80',
  truffle: 'https://images.unsplash.com/photo-1609252925148-b0f2f3a4f2a0?w=800&q=80',
  cheese: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&q=80',
};

export const experiencesData = [
  { id: 'olive-oil-tour-franci', name: 'Olive Oil Farm Tour', type: 'Farm Visit', producer: 'Frantoio Franci', region: 'Tuscany', regionId: 'toscana', price: '€45', rating: 4.9, description: 'Walk the Chianti groves, see the cold-press mill in action and taste fresh EVO on warm bread.', includes: ['Guided grove walk', 'Mill demonstration', 'Tasting of 3 oils', 'Bottle to take home'], image: img.oil },
  { id: 'chianti-tasting-rossi', name: 'Chianti & Brunello Tasting', type: 'Wine Tasting', producer: 'Cantina Rossi', region: 'Tuscany', regionId: 'toscana', price: '€60', rating: 4.8, description: 'A seated vertical tasting of Sangiovese wines in a Montalcino cellar.', includes: ['5 wines', 'Cheese pairing', 'Cellar tour'], image: img.wine },
  { id: 'dairy-visit-gennari', name: 'Parmigiano Dairy Visit', type: 'Farm Visit', producer: 'Caseificio Gennari', region: 'Emilia-Romagna', regionId: 'emilia_romagna', price: '€35', rating: 4.9, description: 'Watch the dawn making of Parmigiano Reggiano and taste it at three ages.', includes: ['Early-morning dairy tour', 'Tasting of 24/36/48M', 'Aging vault visit'], image: img.cheese },
  { id: 'balsamic-acetaia-malpighi', name: 'Balsamic Acetaia Tour', type: 'Tour', producer: 'Acetaia Malpighi', region: 'Emilia-Romagna', regionId: 'emilia_romagna', price: '€30', rating: 4.7, description: 'Climb to the barrel loft and taste Traditional Balsamic aged 12 and 25 years.', includes: ['Loft barrel tour', 'Tasting of aged condiments', 'Drizzle on Parmigiano'], image: img.farm },
  { id: 'franciacorta-cellar-berlucchi', name: 'Franciacorta Cellar Tour', type: 'Wine Tasting', producer: 'Cantina Berlucchi', region: 'Lombardy', regionId: 'lombardia', price: '€40', rating: 4.6, description: 'Discover metodo classico sparkling wine from vine to riddling rack.', includes: ['Cellar tour', '3 sparkling wines', 'Light aperitivo'], image: img.wine },
  { id: 'risotto-class-costanzo', name: 'Risotto Cooking Class', type: 'Cooking Class', producer: 'Riseria Costanzo', region: 'Piedmont', regionId: 'piemonte', price: '€55', rating: 4.8, description: 'Master risotto alla milanese with Carnaroli rice and proper mantecatura.', includes: ['Hands-on class', 'Lunch with wine', 'Rice to take home'], image: img.cook },
  { id: 'truffle-hunt-morra', name: 'Truffle Hunt in Alba', type: 'Tour', producer: 'Tartufi Morra', region: 'Piedmont', regionId: 'piemonte', price: '€95', rating: 5.0, description: 'Hunt white truffles with a trifolau and his dog in the autumn Langhe woods.', includes: ['Guided hunt with dog', 'Truffle tasting', 'Glass of Barolo'], image: img.truffle },
  { id: 'pistachio-harvest-bronte', name: 'Pistachio Harvest Experience', type: 'Harvest', producer: 'Pistacchi Bronte', region: 'Sicily', regionId: 'sicilia', price: '€38', rating: 4.7, description: 'Join the biennial pistachio harvest on the volcanic slopes of Etna.', includes: ['Field harvest', 'Shelling demo', 'Pistachio pesto tasting'], image: img.farm },
  { id: 'marsala-tasting-florio', name: 'Marsala Heritage Tasting', type: 'Wine Tasting', producer: 'Cantine Florio', region: 'Sicily', regionId: 'sicilia', price: '€42', rating: 4.6, description: 'Tour the historic Florio cellars on the Marsala waterfront and taste fortified classics.', includes: ['Historic cellar tour', '4 Marsala wines', 'Almond pairing'], image: img.wine },
  { id: 'buffalo-farm-vannulo', name: 'Buffalo Mozzarella Farm', type: 'Farm Visit', producer: 'Caseificio Vannulo', region: 'Campania', regionId: 'campania', price: '€33', rating: 4.9, description: 'Meet the water buffalo and watch mozzarella stretched by hand at Paestum.', includes: ['Farm and dairy tour', 'Fresh mozzarella tasting', 'Gelato di bufala'], image: img.farm },
  { id: 'pizza-class-dimartino', name: 'Neapolitan Pizza Class', type: 'Cooking Class', producer: 'Pastificio Di Martino', region: 'Campania', regionId: 'campania', price: '€50', rating: 4.8, description: 'Learn to stretch and bake a true Margherita in a wood-fired oven.', includes: ['Dough handling', 'Wood-oven baking', 'Pizza dinner'], image: img.cook },
  { id: 'prosecco-tasting-bisol', name: 'Valdobbiadene Prosecco Tasting', type: 'Wine Tasting', producer: 'Cantina Bisol', region: 'Veneto', regionId: 'veneto', price: '€36', rating: 4.7, description: 'Taste Prosecco Superiore among the steep UNESCO hills of Valdobbiadene.', includes: ['Vineyard view tasting', '3 sparkling wines', 'Local cicchetti'], image: img.wine },
  { id: 'pesto-class-rossi', name: 'Pesto Mortar Class', type: 'Cooking Class', producer: 'Pesto Rossi', region: 'Liguria', regionId: 'liguria', price: '€32', rating: 4.6, description: 'Grind authentic pesto by hand in a marble mortar in Genova.', includes: ['Mortar-and-pestle class', 'Trofie lunch', 'Jar of pesto'], image: img.cook },
  { id: 'fontina-cellar-fontina', name: 'Fontina Aging Cellar Visit', type: 'Tour', producer: 'Cooperativa Produttori Fontina', region: "Valle d'Aosta", regionId: 'valle_daosta', price: '€28', rating: 4.7, description: 'Descend into an alpine tunnel where thousands of Fontina wheels age.', includes: ['Aging cave tour', 'Fontina tasting', 'Fonduta sample'], image: img.cheese },
];

export default experiencesData;
