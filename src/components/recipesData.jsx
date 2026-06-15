export const recipesData = [
  {
    id: "cacio-e-pepe",
    name: "Cacio e Pepe",
    region: "lazio",
    regionName: "Lazio",
    category: "Pasta",
    description: "Rome's most deceptively simple pasta — two ingredients, one technique, centuries of tradition.",
    culturalStory: "Cacio e Pepe is the quintessential Roman pasta, born from shepherds who carried aged Pecorino and black pepper on long transhumance journeys across Lazio. The technique of emulsifying cheese into a creamy sauce without breaking it is the mark of a true Roman cook — and the reason why this apparently three-ingredient dish remains one of the most difficult to master. Every Roman grandmother has an opinion on the right pepper quantity.",
    cookTime: "20 min",
    difficulty: "Medium",
    image: "https://media.base44.com/images/public/69b28610d2d035157c27d27a/060a93996_generated_image.png",
    creator: { id: "chef-antonio", name: "Chef Antonio Rossi" },
    ingredients: [
      { name: "Spaghetti or Tonnarelli", amount: "400g", producerId: null },
      { name: "Pecorino Romano DOP", amount: "200g finely grated", producerId: "caseificio-salvo" },
      { name: "Black pepper", amount: "2 tsp freshly cracked", producerId: null }
    ],
    steps: [
      "Boil spaghetti in generously salted water until 2 minutes before al dente.",
      "Toast black pepper in a dry pan until fragrant. Add a ladle of pasta water and let simmer.",
      "Drain pasta reserving 200ml cooking water. Add pasta to the pepper pan over low heat.",
      "Remove from heat. Add finely grated Pecorino a little at a time, tossing constantly.",
      "Add pasta water gradually to create a creamy, coating sauce. Serve immediately."
    ],
    videoUrl: null,
    relatedRecipes: ["tagliatelle-ragu", "trofie-al-pesto"]
  },
  {
    id: "tagliatelle-ragu",
    name: "Tagliatelle al Ragù Bolognese",
    region: "emilia_romagna",
    regionName: "Emilia-Romagna",
    category: "Pasta",
    description: "The original Bolognese — a slow-cooked meat sauce born in the kitchens of Bologna. Never on spaghetti.",
    culturalStory: "The ragù alla Bolognese recipe was officially deposited at the Bologna Chamber of Commerce in 1982. In Bologna, where it was born, the ragù is a pale, delicate, wine-enriched meat sauce served only on fresh egg tagliatelle — never on spaghetti. The version served in its homeland bears little resemblance to what the rest of the world calls 'Bolognese'. The quality of the Prosciutto di Parma and San Marzano tomatoes is what separates the authentic from the approximate.",
    cookTime: "3 hours",
    difficulty: "Medium",
    image: "https://media.base44.com/images/public/69b28610d2d035157c27d27a/b34b69586_generated_image.png",
    creator: { id: "chef-lucia", name: "Chef Lucia Ferretti" },
    ingredients: [
      { name: "Tagliatelle all'uovo", amount: "400g", producerId: "pastificio-cavalieri" },
      { name: "Beef mince", amount: "300g", producerId: null },
      { name: "Pork mince", amount: "200g", producerId: null },
      { name: "Prosciutto di Parma DOP", amount: "100g finely diced", producerId: "prosciuttificio-san-nicola" },
      { name: "Parmigiano Reggiano DOP", amount: "80g grated", producerId: "caseificio-gennari" },
      { name: "San Marzano tomatoes DOP", amount: "400g", producerId: "gustarosso" }
    ],
    steps: [
      "Sauté finely diced onion, carrot, and celery in butter until very soft — about 15 minutes.",
      "Add minced prosciutto and cook 2 minutes. Add beef and pork, breaking up and browning well.",
      "Pour in white wine and reduce completely. Add crushed San Marzano tomatoes.",
      "Simmer on the very lowest heat for 2.5 to 3 hours, adding warm broth as needed.",
      "Cook tagliatelle 2 minutes. Toss with ragù. Finish with generous Parmigiano."
    ],
    videoUrl: null,
    relatedRecipes: ["cacio-e-pepe", "risotto-milanese"]
  },
  {
    id: "risotto-milanese",
    name: "Risotto alla Milanese",
    region: "lombardia",
    regionName: "Lombardy",
    category: "Risotto",
    description: "Milan's golden risotto — saffron, bone marrow, and Grana Padano. The soul of Lombard cooking.",
    culturalStory: "Risotto alla Milanese is the city of Milan in a bowl — golden from Abruzzese saffron, rich from bone marrow, perfumed with white wine. It has been served alongside Ossobuco since the 18th century, and the quality of the rice — traditionally Carnaroli from Monferrato — is what separates a competent version from an extraordinary one. The saffron must be dissolved in warm broth, never cold, to release its full colour and perfume.",
    cookTime: "35 min",
    difficulty: "Medium",
    image: "https://media.base44.com/images/public/69b28610d2d035157c27d27a/0e9782abd_generated_image.png",
    creator: { id: "chef-marco", name: "Chef Marco Bianchi" },
    ingredients: [
      { name: "Carnaroli rice", amount: "320g", producerId: "riseria-costanzo" },
      { name: "Grana Padano DOP", amount: "100g grated", producerId: "caseificio-lombardo" },
      { name: "Saffron DOP", amount: "0.5g", producerId: "zafferano-altopiano" },
      { name: "Dry white wine", amount: "100ml", producerId: null },
      { name: "Bone marrow", amount: "50g", producerId: null }
    ],
    steps: [
      "Dissolve saffron in 2 tbsp warm broth. Set aside for at least 10 minutes.",
      "Sauté finely diced onion in butter with bone marrow until translucent and soft.",
      "Toast rice 2 minutes until translucent at edges. Add wine and stir until fully absorbed.",
      "Add hot broth ladle by ladle, stirring constantly. At 15 minutes add the saffron infusion.",
      "Remove from heat. Stir in cold butter cubes and grated Grana Padano. Rest 2 min. Serve."
    ],
    videoUrl: null,
    relatedRecipes: ["tagliatelle-ragu", "tajarin-tartufo"]
  },
  {
    id: "trofie-al-pesto",
    name: "Trofie al Pesto Genovese",
    region: "liguria",
    regionName: "Liguria",
    category: "Pasta",
    description: "The definitive pesto pasta — trofie with fresh Genovese basil, Ligurian olive oil, and Sardinian pecorino. Never heat the pesto.",
    culturalStory: "Pesto Genovese is a protected tradition — the basil must be grown on the Ligurian Riviera, picked young with small leaves, and combined only with Ligurian Taggiasca olive oil, Sardinian Fiore Sardo, and Parmigiano Reggiano. The marble mortar technique is the original method and the heat friction of a blender destroys the herb's delicate chlorophyll and fragrance. The golden rule: never heat the pesto.",
    cookTime: "25 min",
    difficulty: "Easy",
    image: "https://media.base44.com/images/public/69b28610d2d035157c27d27a/d94a68e27_generated_image.png",
    creator: { id: "chef-elena", name: "Chef Elena Conti" },
    ingredients: [
      { name: "Trofie pasta", amount: "400g", producerId: null },
      { name: "Pesto Genovese DOP", amount: "150g", producerId: "pesto-rossi" },
      { name: "Riviera Ligure olive oil DOP", amount: "3 tbsp", producerId: "frantoio-roi" },
      { name: "Pecorino Sardo DOP", amount: "40g grated", producerId: "formaggi-argiolas" }
    ],
    steps: [
      "Cook trofie in well-salted boiling water until al dente. Reserve 100ml pasta water.",
      "Place pesto in a large bowl. Add 3–4 tbsp pasta cooking water and stir gently to loosen.",
      "Drain trofie and add immediately to the pesto bowl. Toss well to coat every strand.",
      "Add a drizzle of Ligurian DOP oil and extra grated Pecorino Sardo. Serve at once.",
      "Critical rule: never heat the pesto. The warmth of the pasta is entirely sufficient."
    ],
    videoUrl: null,
    relatedRecipes: ["cacio-e-pepe", "pasta-alla-norma"]
  },
  {
    id: "pasta-alla-norma",
    name: "Pasta alla Norma",
    region: "sicilia",
    regionName: "Sicily",
    category: "Pasta",
    description: "Sicily's greatest pasta — fried aubergine, San Marzano tomatoes, and salted ricotta. Named for Bellini's opera.",
    culturalStory: "Pasta alla Norma was created in Catania and named in honour of Vincenzo Bellini's opera Norma, considered so perfect that 'alla Norma' became Sicilian slang for anything exceptional. The dish requires San Marzano DOP tomatoes for their sweetness and low acidity, aubergine fried in good olive oil — never baked, never air-fried — and ricotta salata aged hard enough to grate, not the fresh kind.",
    cookTime: "45 min",
    difficulty: "Easy",
    image: "https://media.base44.com/images/public/69b28610d2d035157c27d27a/575fc93e4_generated_image.png",
    creator: { id: "chef-sofia", name: "Chef Sofia Rizzo" },
    ingredients: [
      { name: "Rigatoni", amount: "400g", producerId: null },
      { name: "Aubergine", amount: "2 large", producerId: null },
      { name: "San Marzano tomatoes DOP", amount: "500g", producerId: "gustarosso" },
      { name: "Ricotta salata", amount: "100g grated", producerId: null },
      { name: "Olive oil", amount: "150ml for frying", producerId: "olio-callipo" }
    ],
    steps: [
      "Salt aubergine cubes generously and rest 30 minutes to draw out bitterness. Pat completely dry.",
      "Fry aubergine in hot olive oil until deeply golden on all sides. Drain on paper towels.",
      "Sauté 2 crushed garlic cloves in fresh olive oil. Add crushed San Marzano tomatoes. Simmer 20 min.",
      "Cook rigatoni until al dente. Drain, reserving some pasta water.",
      "Combine pasta with tomato sauce. Add fried aubergine and toss gently. Top with ricotta salata and fresh basil."
    ],
    videoUrl: null,
    relatedRecipes: ["trofie-al-pesto", "cacio-e-pepe"]
  },
  {
    id: "tajarin-tartufo",
    name: "Tajarin al Tartufo Bianco d'Alba",
    region: "piemonte",
    regionName: "Piedmont",
    category: "Pasta",
    description: "Piedmont's most precious pasta — ultra-thin egg tajarin under a blizzard of white truffle. Simplicity at its most luxurious.",
    culturalStory: "Tajarin is Piedmont's most aristocratic pasta — 100% egg yolk pasta, cut into ultra-thin strands of 2mm maximum, so delicate that the sauce must be minimal to let the pasta speak. In Alba during truffle season between October and December, a fresh shaving of white truffle over buttered tajarin is the most perfect plate of food in all of Italy. The truffle must never be cooked. It must only be shaved, tableside, at the very last moment.",
    cookTime: "40 min",
    difficulty: "Medium",
    image: "https://media.base44.com/images/public/69b28610d2d035157c27d27a/1191d492e_generated_image.png",
    creator: { id: "chef-luca", name: "Chef Luca Carnevale" },
    ingredients: [
      { name: "00 flour", amount: "200g", producerId: null },
      { name: "Egg yolks", amount: "10 large yolks", producerId: null },
      { name: "Unsalted butter", amount: "80g", producerId: null },
      { name: "White truffle d'Alba", amount: "30g fresh", producerId: "tartufi-morra" },
      { name: "Parmigiano Reggiano DOP", amount: "60g grated", producerId: "caseificio-gennari" }
    ],
    steps: [
      "Mix egg yolks into flour. Knead 10 minutes until smooth and elastic. Rest 30 min wrapped.",
      "Roll pasta paper-thin on a floured board. Fold loosely and cut into very fine strips — 2mm max.",
      "Shake off excess flour and allow to nest gently on a tray. Use within 2 hours.",
      "Melt butter in a wide pan over the very lowest heat. Do not allow it to brown even slightly.",
      "Cook tajarin in salted water for 90 seconds. Toss immediately in warm butter with Parmigiano. Plate and shave white truffle generously over the top."
    ],
    videoUrl: null,
    relatedRecipes: ["risotto-milanese", "cacio-e-pepe"]
  },
  {
    id: "pizza-margherita",
    name: "Pizza Margherita",
    region: "campania",
    regionName: "Campania",
    category: "Pizza",
    description: "The original Neapolitan pizza — San Marzano tomatoes, buffalo mozzarella, basil. UNESCO-protected and unimprovable.",
    culturalStory: "Created in Naples in 1889 by pizzaiolo Raffaele Esposito to honour Queen Margherita of Savoy, with toppings in the colours of the Italian flag — red San Marzano tomatoes, white Mozzarella di Bufala, green basil. The art of the Neapolitan pizzaiuolo is UNESCO intangible heritage: the dough must be hand-stretched only, never rolled, and baked 60 to 90 seconds in a wood-fired oven at around 485°C. The cornicione — the puffy, leopard-spotted rim — is where a great pizza reveals itself.",
    cookTime: "30 min (+ 24h dough)",
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&q=80",
    creator: { id: "chef-sofia", name: "Chef Sofia Rizzo" },
    ingredients: [
      { name: "00 flour", amount: "500g", producerId: null },
      { name: "San Marzano tomatoes DOP", amount: "300g, hand-crushed", producerId: "gustarosso" },
      { name: "Mozzarella di Bufala DOP", amount: "250g, well drained", producerId: "caseificio-vannulo" },
      { name: "Fresh basil", amount: "8 leaves", producerId: null },
      { name: "Extra virgin olive oil", amount: "2 tbsp", producerId: "olio-torretta" }
    ],
    steps: [
      "Make the dough with flour, water, salt, and very little yeast. Knead well and ferment 24 hours, with the final 2 hours as individual 250g balls.",
      "Hand-stretch each ball from the centre outwards, preserving the air in the rim. Never use a rolling pin.",
      "Spread a thin layer of hand-crushed San Marzano tomatoes, leaving a 2cm rim. Season with a pinch of salt.",
      "Tear well-drained mozzarella over the top. Add basil leaves and a thread of olive oil.",
      "Bake at the highest heat your oven allows — ideally on a preheated stone — until the rim is puffed and spotted. In a 485°C wood oven: 60–90 seconds."
    ],
    videoUrl: null,
    relatedRecipes: ["pasta-alla-norma", "pasta-nduja"]
  },
  {
    id: "pasta-nduja",
    name: "Pasta alla 'Nduja",
    region: "calabria",
    regionName: "Calabria",
    category: "Pasta",
    description: "Calabria's fiery signature — spreadable 'nduja melted into tomato, finished with creamy burrata. Heat and silk together.",
    culturalStory: "'Nduja was born in Spilinga as peasant food — pork scraps mixed with so much local Calabrian chilli that it needed no other preservative. Once a symbol of poverty, it is now Calabria's proudest export. In this pasta it dissolves into the tomato sauce, turning it brick-red, smoky, and slow-burning. The cool burrata on top is not decoration: it is the necessary truce between you and the chilli.",
    cookTime: "25 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&q=80",
    creator: { id: "chef-antonio", name: "Chef Antonio Rossi" },
    ingredients: [
      { name: "Rigatoni or paccheri", amount: "400g", producerId: null },
      { name: "'Nduja di Spilinga", amount: "80g", producerId: "salumeria-toraldo" },
      { name: "San Marzano tomatoes DOP", amount: "400g", producerId: "gustarosso" },
      { name: "Burrata", amount: "1 ball (125g)", producerId: "caseificio-montrone" },
      { name: "Red onion of Tropea", amount: "1 small, finely sliced", producerId: "cipolla-di-tropea-santoro" }
    ],
    steps: [
      "Sweat the sliced Tropea onion gently in olive oil until soft and sweet — about 8 minutes.",
      "Add the 'nduja and let it melt completely into the oil, breaking it up with a wooden spoon.",
      "Add crushed San Marzano tomatoes and simmer 15 minutes until thick and brick-red.",
      "Cook the pasta until just before al dente. Transfer into the sauce with a splash of pasta water and finish cooking there.",
      "Plate and tear the cold burrata over the hot pasta. A few basil leaves, a thread of oil. Serve immediately."
    ],
    videoUrl: null,
    relatedRecipes: ["pizza-margherita", "pasta-alla-norma"]
  },
  {
    id: "carbonara",
    name: "Spaghetti alla Carbonara",
    region: "lazio",
    regionName: "Lazio",
    category: "Pasta",
    description: "Rome's most famous export — guanciale, eggs, Pecorino Romano, black pepper. No cream. Ever.",
    culturalStory: "Carbonara is the youngest of Rome's four canonical pastas, appearing in the late 1940s, yet it has become the most fiercely defended. The rules are absolute: guanciale (cured pork cheek), never pancetta or bacon; Pecorino Romano, never Parmigiano alone; egg yolks emulsified off the heat into a silken sauce — and no cream, ever, under any circumstances. The carbonara test is the mark of every Roman trattoria: if the eggs scramble, you start again.",
    cookTime: "25 min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=900&q=80",
    creator: { id: "chef-antonio", name: "Chef Antonio Rossi" },
    ingredients: [
      { name: "Spaghetti", amount: "400g", producerId: "pastificio-latini" },
      { name: "Guanciale", amount: "150g, cut into strips", producerId: "salumificio-sano" },
      { name: "Pecorino Romano DOP", amount: "100g finely grated", producerId: "caseificio-salvo" },
      { name: "Egg yolks", amount: "4, plus 1 whole egg", producerId: null },
      { name: "Black pepper", amount: "1 tsp freshly cracked", producerId: null }
    ],
    steps: [
      "Render the guanciale strips slowly in a dry pan until golden and crisp. Turn off the heat and keep the fat.",
      "Whisk yolks, whole egg, Pecorino, and pepper into a thick paste in a large bowl.",
      "Cook spaghetti until al dente. Reserve a cup of the starchy cooking water.",
      "Toss the hot pasta in the guanciale pan to coat in the fat. Let it cool for 30 seconds — this is the step that prevents scrambling.",
      "Off the heat, add pasta to the egg mixture, tossing fast and adding pasta water gradually until the sauce turns silken and coats every strand. Top with the crisp guanciale and more Pecorino."
    ],
    videoUrl: null,
    relatedRecipes: ["cacio-e-pepe", "tagliatelle-ragu"]
  }
];

export const recipeCategories = ['All', 'Pasta', 'Pizza', 'Risotto', 'Meat', 'Fish', 'Vegetarian', 'Dessert'];