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
  }
];

export const recipeCategories = ['All', 'Pasta', 'Risotto', 'Meat', 'Fish', 'Vegetarian', 'Dessert'];