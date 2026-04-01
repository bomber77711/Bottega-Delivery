export const regionData = {
  toscana: {
    name: "Tuscany", producerCount: 52, experienceCount: 8,
    description: "Tuscany is the heartland of Italian gastronomy — rolling hills of olive groves, ancient vineyards producing Chianti and Brunello, and centuries of cheesemaking tradition in the Val d'Orcia.",
    featuredProducts: ["Olio Extra Vergine DOP", "Chianti Classico DOCG", "Pecorino Toscano"],
    producers: [
      { name: "Frantoio Franci", city: "Greve in Chianti", category: "Olive Oil", description: "Cold-pressed extra virgin oils from the Tuscan hills since 1958", rating: 4.9 },
      { name: "Cantina Rossi", city: "Montalcino", category: "Wine", description: "Brunello and Chianti from family-owned Montalcino estates", rating: 4.8 },
      { name: "Caseificio Bianchi", city: "Pienza", category: "Cheese", description: "Aged Pecorino Toscano following centuries-old Pienza tradition", rating: 4.7 },
      { name: "Salumificio Falorni", city: "Greve in Chianti", category: "Cured Meats", description: "Traditional Tuscan salumi and finocchiona IGP since 1729", rating: 4.8 },
      { name: "Podere Il Casale", city: "Pienza", category: "Cheese", description: "Organic sheep's milk cheeses from the Val d'Orcia biosphere reserve", rating: 4.7 },
      { name: "Olio Ardenghi", city: "Lucca", category: "Olive Oil", description: "Single-estate Lucchese extra virgin olive oil, IGP certified since 1987", rating: 4.6 },
    ],
    experiences: [
      { name: "Olive Oil Farm Tour", type: "Farm Visit", price: "€45/person", producer: "Frantoio Franci" },
      { name: "Chianti Wine Tasting", type: "Wine Tasting", price: "€60/person", producer: "Cantina Rossi" }
    ]
  },
  lombardia: {
    name: "Lombardy", producerCount: 68, experienceCount: 10,
    description: "Lombardy is Italy's most productive gastronomic region — home to Grana Padano, Franciacorta sparkling wines, and the finest Bresaola from the Valtellina valleys.",
    featuredProducts: ["Grana Padano DOP", "Bresaola IGP", "Franciacorta DOCG"],
    producers: [
      { name: "Caseificio Lombardo", city: "Lodi", category: "Cheese", description: "Grana Padano DOP aged minimum 16 months in Lodi dairy", rating: 4.8 },
      { name: "Salumificio Valtellina", city: "Sondrio", category: "Cured Meats", description: "Bresaola della Valtellina IGP from Sondrio mountain valleys", rating: 4.7 },
      { name: "Cantina Berlucchi", city: "Franciacorta", category: "Wine", description: "Pioneer of Franciacorta DOCG sparkling wines", rating: 4.9 },
      { name: "Pastificio Felicetti", city: "Predazzo", category: "Pasta", description: "High-altitude durum wheat pasta dried slowly in mountain air", rating: 4.7 },
      { name: "Mielerie Lombarde", city: "Varese", category: "Honey", description: "Multifloral and acacia honeys from the pre-Alpine foothills", rating: 4.5 },
      { name: "Torrone Vergani", city: "Cremona", category: "Condiments", description: "Traditional Cremona torrone and mostarda, handmade since 1885", rating: 4.8 },
    ],
    experiences: [
      { name: "Franciacorta Cellar Tour", type: "Wine Tasting", price: "€55/person", producer: "Cantina Berlucchi" },
      { name: "Cheese Aging Visit", type: "Farm Visit", price: "€35/person", producer: "Caseificio Lombardo" }
    ]
  },
  sicilia: {
    name: "Sicily", producerCount: 45, experienceCount: 7,
    description: "Sicily's volcanic soil and Mediterranean sun produce some of Italy's most intense flavours — from Bronte pistachios grown on Etna's slopes to historic Marsala wines and street food traditions.",
    featuredProducts: ["Marsala DOC", "Pistacchio di Bronte DOP", "Arancini"],
    producers: [
      { name: "Torrefazione Mokarico", city: "Palermo", category: "Coffee", description: "Specialty blends roasted in Palermo since 1949", rating: 4.8 },
      { name: "Pistacchi Bronte", city: "Bronte", category: "Nuts", description: "Premium DOP pistachios from the volcanic slopes of Etna", rating: 4.9 },
      { name: "Cantine Florio", city: "Marsala", category: "Wine", description: "Historic Marsala DOC producer since 1833", rating: 4.7 },
      { name: "Azienda Geraci", city: "Ragusa", category: "Olive Oil", description: "Monocultivar Tonda Iblea DOP olive oil from southeast Sicily", rating: 4.8 },
      { name: "Cioccolato Modica Bonajuto", city: "Modica", category: "Chocolate", description: "Baroque cold-process chocolate made since 1880 in Modica", rating: 4.9 },
      { name: "Conserve della Nonna", city: "Catania", category: "Preserves", description: "Traditional Sicilian caponata, pesto di pistacchio and sun-dried tomatoes", rating: 4.6 },
    ],
    experiences: [
      { name: "Etna Pistachio Harvest", type: "Farm Visit", price: "€50/person", producer: "Pistacchi Bronte" },
      { name: "Palermo Street Food Tour", type: "Food Tour", price: "€40/person", producer: "Bottega Delivery" }
    ]
  },
  campania: {
    name: "Campania", producerCount: 41, experienceCount: 9,
    description: "Campania is the cradle of Italian food — birthplace of pizza, home to buffalo mozzarella from Paestum, San Marzano tomatoes from volcanic Sarno soil, and limoncello from the Amalfi Coast.",
    featuredProducts: ["Mozzarella di Bufala DOP", "San Marzano DOP", "Limoncello"],
    producers: [
      { name: "Caseificio Vannulo", city: "Capaccio", category: "Cheese", description: "Organic buffalo mozzarella from Paestum's famous herds", rating: 4.9 },
      { name: "Gustarosso", city: "Sarno", category: "Preserves", description: "San Marzano DOP tomatoes grown in volcanic Sarno soil", rating: 4.8 },
      { name: "Antiche Distillerie Riunite", city: "Sorrento", category: "Liqueurs", description: "Artisan limoncello from Sorrento Coast IGP lemons", rating: 4.7 },
      { name: "Pastificio Di Martino", city: "Gragnano", category: "Pasta", description: "Bronze-die Gragnano IGP pasta, dried at low temperature since 1912", rating: 4.8 },
      { name: "Olio Torretta", city: "Cilento", category: "Olive Oil", description: "Cilento DOP extra virgin olive oil from centuries-old Pisciottana trees", rating: 4.7 },
      { name: "Casearia Ausonia", city: "Caserta", category: "Cheese", description: "Mozzarella di bufala and provola affumicata from the Caserta plains", rating: 4.6 },
    ],
    experiences: [
      { name: "Buffalo Farm Visit", type: "Farm Visit", price: "€45/person", producer: "Caseificio Vannulo" },
      { name: "Amalfi Lemon Grove Tour", type: "Farm Visit", price: "€55/person", producer: "Antiche Distillerie Riunite" }
    ]
  },
  veneto: {
    name: "Veneto", producerCount: 38, experienceCount: 6,
    description: "The Veneto is home to Prosecco hills, Asiago mountain cheese, and Amarone — one of Italy's greatest red wines. A region of extraordinary variety from the Dolomites to the Adriatic coast.",
    featuredProducts: ["Prosecco DOCG", "Asiago DOP", "Amarone DOCG"],
    producers: [
      { name: "Cantina Bisol", city: "Valdobbiadene", category: "Wine", description: "Prosecco Superiore DOCG from the original Valdobbiadene hills", rating: 4.9 },
      { name: "Caseificio Pennar", city: "Asiago", category: "Cheese", description: "Mountain Asiago DOP aged in traditional plateau cellars", rating: 4.7 },
      { name: "Allegrini", city: "Fumane", category: "Wine", description: "Amarone della Valpolicella DOCG from Fumane valley estates", rating: 4.8 },
      { name: "Salumificio Palmieri", city: "Verona", category: "Cured Meats", description: "Sopressa Vicentina DOP and traditional Venetian salumi", rating: 4.6 },
      { name: "Riso Vialone Nano Ferron", city: "Isola della Scala", category: "Rice", description: "Vialone Nano IGP rice from the Verona plain — the risotto rice of the Veneto", rating: 4.8 },
      { name: "Grappa Poli", city: "Bassano del Grappa", category: "Spirits", description: "Artisan grappa from the historic Bassano del Grappa distillery since 1898", rating: 4.9 },
    ],
    experiences: [
      { name: "Prosecco Hills Tasting", type: "Wine Tasting", price: "€50/person", producer: "Cantina Bisol" },
      { name: "Asiago Cheese Dairy Tour", type: "Farm Visit", price: "€40/person", producer: "Caseificio Pennar" }
    ]
  },
  piemonte: {
    name: "Piedmont", producerCount: 35, experienceCount: 8,
    description: "Piedmont is the most aristocratic of Italian food regions — home to Barolo, white truffles from Alba, Gianduiotto chocolate, and Carnaroli rice from the Monferrato plains.",
    featuredProducts: ["Barolo DOCG", "Tartufo Bianco d'Alba", "Gianduiotto"],
    producers: [
      { name: "Riseria Costanzo", city: "Villanova Monferrato", category: "Rice", description: "Premium Carnaroli and Basmati grown in Monferrato", rating: 4.7 },
      { name: "Giacomo Conterno", city: "Serralunga d'Alba", category: "Wine", description: "Legendary Barolo DOCG producer from Serralunga d'Alba", rating: 5.0 },
      { name: "Tartufi Morra", city: "Alba", category: "Truffle", description: "White and black truffles from the legendary Alba forests", rating: 4.9 },
      { name: "Peyrano Cioccolato", city: "Torino", category: "Chocolate", description: "Gianduiotto and pralines handcrafted in Turin since 1915", rating: 4.8 },
      { name: "Salumificio Rapelli", city: "Domodossola", category: "Cured Meats", description: "Ossola valley salami and Piemontese lardo, mountain-cured", rating: 4.6 },
      { name: "Vermouth Carpano", city: "Torino", category: "Spirits", description: "Turin vermouth of the finest tradition — home of the Negroni ingredient", rating: 4.9 },
    ],
    experiences: [
      { name: "Alba Truffle Hunt", type: "Food Tour", price: "€120/person", producer: "Tartufi Morra" },
      { name: "Barolo Cellar Visit", type: "Wine Tasting", price: "€80/person", producer: "Giacomo Conterno" }
    ]
  },
  puglia: {
    name: "Apulia", producerCount: 32, experienceCount: 5,
    description: "Puglia is Italy's heel — a land of ancient olive trees, hand-shaped orecchiette pasta, burrata from Andria, and Primitivo wines from sun-scorched Salento vineyards.",
    featuredProducts: ["Burrata di Andria", "Orecchiette", "Primitivo DOC"],
    producers: [
      { name: "Caseificio Montrone", city: "Andria", category: "Cheese", description: "Artisan burrata and mozzarella, hand-pulled daily in Andria", rating: 4.8 },
      { name: "Pastificio Cavalieri", city: "Maglie", category: "Pasta", description: "Bronze-die extruded orecchiette and pasta, slow dried", rating: 4.8 },
      { name: "Cantine Due Palme", city: "Cellino San Marco", category: "Wine", description: "Primitivo di Manduria DOC from centuries-old Salento vines", rating: 4.7 },
      { name: "Frantoio Muraglia", city: "Andria", category: "Olive Oil", description: "Coratina monocultivar DOP oil in iconic hand-painted ceramic bottles", rating: 4.9 },
      { name: "Masseria Il Frantoio", city: "Ostuni", category: "Olive Oil", description: "Biodynamic estate olive oil from centuries-old Ostuni groves", rating: 4.7 },
      { name: "Taralli Dibenedetto", city: "Bari", category: "Baked Goods", description: "Traditional Pugliese taralli al vino and finocchio, baked in wood oven", rating: 4.6 },
    ],
    experiences: [
      { name: "Burrata Making Class", type: "Cooking Class", price: "€65/person", producer: "Caseificio Montrone" },
      { name: "Ancient Olive Grove Tour", type: "Farm Visit", price: "€35/person", producer: "Bottega Delivery" }
    ]
  },
  emilia_romagna: {
    name: "Emilia-Romagna", producerCount: 30, experienceCount: 7,
    description: "Emilia-Romagna is Italy's food valley — birthplace of Parmigiano Reggiano, Prosciutto di Parma, traditional balsamic vinegar, tortellini, and Lambrusco wine.",
    featuredProducts: ["Parmigiano Reggiano DOP", "Prosciutto di Parma DOP", "Aceto Balsamico DOP"],
    producers: [
      { name: "Caseificio Gennari", city: "Parma", category: "Cheese", description: "Parmigiano Reggiano DOP aged 24 and 36 months in Parma", rating: 4.9 },
      { name: "Prosciuttificio San Nicola", city: "Langhirano", category: "Cured Meats", description: "Prosciutto di Parma DOP cured in Langhirano mountain air", rating: 4.8 },
      { name: "Acetaia Malpighi", city: "Modena", category: "Condiments", description: "Traditional Balsamic Vinegar of Modena DOP, aged 12–25 years", rating: 5.0 },
      { name: "Salumificio Parmacotto", city: "Parma", category: "Cured Meats", description: "Mortadella di Bologna IGP and cooked hams from Parma's finest pigs", rating: 4.7 },
      { name: "Pastificio Rustichella", city: "Penne", category: "Pasta", description: "Bronze-die Emilian egg pasta, slow dried at low temperature", rating: 4.8 },
      { name: "Lambrusco Cleto Chiarli", city: "Modena", category: "Wine", description: "The historic Lambrusco di Sorbara DOC — the original fizzy red of Modena", rating: 4.7 },
    ],
    experiences: [
      { name: "Parmigiano Dairy Visit", type: "Farm Visit", price: "€45/person", producer: "Caseificio Gennari" },
      { name: "Balsamic Vinegar Tasting", type: "Tasting", price: "€55/person", producer: "Acetaia Malpighi" }
    ]
  },
  lazio: {
    name: "Lazio", producerCount: 28, experienceCount: 4,
    description: "Lazio surrounds Rome and produces Pecorino Romano, Frascati wines from the Alban Hills, artichokes from Velletri, and a rich tradition of cucina romana.",
    featuredProducts: ["Pecorino Romano DOP", "Castelli Romani DOC", "Carciofo Romanesco"],
    producers: [
      { name: "Miele dei Colli", city: "Frascati", category: "Honey", description: "Wildflower and chestnut honeys from the Alban Hills", rating: 4.6 },
      { name: "Caseificio Salvo", city: "Latina", category: "Cheese", description: "Pecorino Romano DOP from Pontine plains flocks", rating: 4.7 },
      { name: "Cantina Gotto d'Oro", city: "Marino", category: "Wine", description: "Castelli Romani DOC white wines from volcanic Alban Hills", rating: 4.6 },
      { name: "Salumificio Sano", city: "Ariccia", category: "Cured Meats", description: "Porchetta di Ariccia IGP roasted whole in wood-fired ovens", rating: 4.8 },
      { name: "Pastificio Latini", city: "Roma", category: "Pasta", description: "Artisan pasta made with ancient Senatore Cappelli wheat", rating: 4.5 },
      { name: "Olio Quattrociocchi", city: "Alatri", category: "Olive Oil", description: "Ciociaria DOP Itrana monocultivar oil — fruity and peppery", rating: 4.7 },
    ],
    experiences: [
      { name: "Roman Countryside Food Tour", type: "Food Tour", price: "€70/person", producer: "Bottega Delivery" },
      { name: "Frascati Wine Tasting", type: "Wine Tasting", price: "€40/person", producer: "Cantina Gotto d'Oro" }
    ]
  },
  sardegna: {
    name: "Sardinia", producerCount: 22, experienceCount: 5,
    description: "Sardinia is an island of ancient food traditions — Cannonau wines, Pecorino Sardo, bottarga from the Cabras lagoon, and pane carasau flatbread baked in wood-fired ovens.",
    featuredProducts: ["Pecorino Sardo DOP", "Cannonau DOC", "Bottarga di Muggine"],
    producers: [
      { name: "Formaggi Argiolas", city: "Dolianova", category: "Cheese", description: "Pecorino Sardo DOP from free-range Sardinian flocks", rating: 4.8 },
      { name: "Cantina Argiolas", city: "Serdiana", category: "Wine", description: "Cannonau di Sardegna DOC from century-old indigenous vines", rating: 4.9 },
      { name: "Pescheria Giuliani", city: "Cabras", category: "Fish", description: "Bottarga di Muggine from the famous Cabras lagoon", rating: 4.8 },
      { name: "Forno Civraxiu", city: "Cagliari", category: "Baked Goods", description: "Traditional pane carasau and civraxiu bread baked in wood-fired ovens", rating: 4.7 },
      { name: "Liquori Zedda Piras", city: "Quartu Sant'Elena", category: "Spirits", description: "Authentic Mirto di Sardegna — myrtle berry liqueur from wild Sardinian berries", rating: 4.8 },
      { name: "Olio Sas Moracas", city: "Sassari", category: "Olive Oil", description: "Single-estate Bosana monocultivar oil from ancient Sardinian groves", rating: 4.7 },
    ],
    experiences: [
      { name: "Cabras Lagoon Bottarga Experience", type: "Farm Visit", price: "€60/person", producer: "Pescheria Giuliani" },
      { name: "Cannonau Wine Tasting", type: "Wine Tasting", price: "€45/person", producer: "Cantina Argiolas" }
    ]
  },
  calabria: {
    name: "Calabria", producerCount: 18, experienceCount: 3,
    description: "Calabria is Italy's toe — a land of intense flavours. Nduja from Spilinga, Bergamotto from Reggio, Cipolla di Tropea, and one of Italy's oldest olive oil traditions.",
    featuredProducts: ["Nduja di Spilinga", "Bergamotto di Reggio IGP", "Cipolla di Tropea IGP"],
    producers: [
      { name: "Salumeria Toraldo", city: "Spilinga", category: "Cured Meats", description: "Original Nduja di Spilinga, spreadable spiced salami", rating: 4.8 },
      { name: "Agrumeti Iiriti", city: "Reggio Calabria", category: "Citrus", description: "Bergamotto di Reggio Calabria IGP essential oil and preserves", rating: 4.7 },
      { name: "Olio Callipo", city: "Pizzo", category: "Olive Oil", description: "Extra virgin olive oil from ancient Calabrian olive groves", rating: 4.6 },
      { name: "Tonno Callipo", city: "Pizzo", category: "Fish", description: "Hand-packed yellowfin tuna from the Calabrian Tyrrhenian coast", rating: 4.8 },
      { name: "Cipolla di Tropea Santoro", city: "Tropea", category: "Preserves", description: "Cipolla Rossa di Tropea IGP — jams, chutneys and whole preserved onions", rating: 4.6 },
      { name: "Liquorificio Strega Alberti", city: "Catanzaro", category: "Spirits", description: "Calabrese amaro and liquori from local mountain herbs and citrus peel", rating: 4.5 },
    ],
    experiences: [
      { name: "Nduja Production Tour", type: "Farm Visit", price: "€40/person", producer: "Salumeria Toraldo" },
      { name: "Bergamot Grove Walk", type: "Farm Visit", price: "€35/person", producer: "Agrumeti Iiriti" }
    ]
  },
  liguria: {
    name: "Liguria", producerCount: 15, experienceCount: 4,
    description: "Liguria hugs the Italian Riviera — birthplace of pesto Genovese, Taggiasca olive oil, Focaccia di Recco, and the fragrant Ligurian basil that defines one of Italy's most iconic sauces.",
    featuredProducts: ["Pesto Genovese DOP", "Focaccia di Recco IGP", "Riviera Ligure Olive Oil DOP"],
    producers: [
      { name: "Pesto Rossi", city: "Genova", category: "Condiments", description: "Classic Genovese pesto with Ligurian DOP basil and Sardinian pecorino", rating: 4.8 },
      { name: "Frantoio Roi", city: "Badalucco", category: "Olive Oil", description: "Riviera Ligure DOP oil from Taggiasca olives", rating: 4.9 },
      { name: "Panificio Moltedo", city: "Recco", category: "Baked Goods", description: "Original Focaccia di Recco IGP with fresh local crescenza", rating: 4.7 },
      { name: "Acciughe Deho", city: "Monterosso al Mare", category: "Fish", description: "Hand-salted anchovies from Monterosso — the finest on the Ligurian coast", rating: 4.8 },
      { name: "Cantina BioVio", city: "Finale Ligure", category: "Wine", description: "Organic Pigato and Rossese from the terraced Ligurian slopes", rating: 4.6 },
      { name: "Miele Ligure Aiolfi", city: "Sassello", category: "Honey", description: "Chestnut and wildflower honeys from the Ligurian Apennine forests", rating: 4.5 },
    ],
    experiences: [
      { name: "Pesto Making Class Genova", type: "Cooking Class", price: "€55/person", producer: "Pesto Rossi" },
      { name: "Taggiasca Olive Grove Tour", type: "Farm Visit", price: "€45/person", producer: "Frantoio Roi" }
    ]
  },
  marche: {
    name: "Marche", producerCount: 14, experienceCount: 3,
    description: "Marche is Italy's hidden gem — Verdicchio wines from the hills, black and white truffles from Acqualagna, Ciauscolo salami, and a pristine Adriatic coastline.",
    featuredProducts: ["Verdicchio DOC", "Ciauscolo IGP", "Tartufo di Acqualagna"],
    producers: [
      { name: "Umani Ronchi", city: "Osimo", category: "Wine", description: "Verdicchio dei Castelli di Jesi DOC from coastal Marche hills", rating: 4.8 },
      { name: "Tartufi Ponti", city: "Acqualagna", category: "Truffle", description: "White and black truffles from the forests of Acqualagna", rating: 4.9 },
      { name: "Salumificio Sarnese", city: "Fabriano", category: "Cured Meats", description: "Ciauscolo IGP soft spreadable salami from Fabriano", rating: 4.6 },
      { name: "Olio Marche Sasso", city: "Pesaro", category: "Olive Oil", description: "Marche IGP Coroncina monocultivar oil from the Pesaro hills", rating: 4.7 },
      { name: "Pastificio Girolomoni", city: "Isola del Piano", category: "Pasta", description: "Organic pasta from ancient Monococco wheat, biodynamic certified", rating: 4.8 },
      { name: "Cantina Velenosi", city: "Ascoli Piceno", category: "Wine", description: "Rosso Piceno DOC and Falerio from the southern Marche hills", rating: 4.7 },
    ],
    experiences: [
      { name: "Acqualagna Truffle Hunt", type: "Food Tour", price: "€90/person", producer: "Tartufi Ponti" },
      { name: "Verdicchio Wine Tasting", type: "Wine Tasting", price: "€40/person", producer: "Umani Ronchi" }
    ]
  },
  abruzzo: {
    name: "Abruzzo", producerCount: 13, experienceCount: 3,
    description: "Abruzzo sits between the Gran Sasso mountains and the Adriatic — home to Montepulciano d'Abruzzo wine, L'Aquila saffron DOP, arrosticini lamb skewers, and pristine mountain food traditions.",
    featuredProducts: ["Montepulciano d'Abruzzo DOC", "Zafferano dell'Aquila DOP", "Arrosticini"],
    producers: [
      { name: "Cantina Masciarelli", city: "San Martino sulla Marrucina", category: "Wine", description: "Montepulciano d'Abruzzo DOC from Gran Sasso mountain slopes", rating: 4.9 },
      { name: "Zafferano Altopiano", city: "L'Aquila", category: "Spices", description: "DOP saffron from the historic L'Aquila plateau cultivation", rating: 4.8 },
      { name: "Agriturismo Valle Verde", city: "Scanno", category: "Meat", description: "Traditional Abruzzese arrosticini from mountain-raised sheep", rating: 4.7 },
      { name: "Pastificio Verrigni", city: "Roseto degli Abruzzi", category: "Pasta", description: "Gold-die spaghetti alla chitarra and linguine from Abruzzese durum wheat", rating: 4.8 },
      { name: "Olio San Nicola", city: "Loreto Aprutino", category: "Olive Oil", description: "Aprutino Pescarese DOP — lightly fruity Dritta monocultivar oil", rating: 4.7 },
      { name: "Caseificio Tre Colli", city: "Teramo", category: "Cheese", description: "Pecorino di Farindola — a rare Abruzzese sheep's milk cheese aged in walnut husks", rating: 4.6 },
    ],
    experiences: [
      { name: "Saffron Harvest Experience", type: "Farm Visit", price: "€65/person", producer: "Zafferano Altopiano" },
      { name: "Gran Sasso Food & Wine Tour", type: "Food Tour", price: "€75/person", producer: "Bottega Delivery" }
    ]
  },
  umbria: {
    name: "Umbria", producerCount: 12, experienceCount: 4,
    description: "Umbria is the green heart of Italy — Sagrantino di Montefalco, black truffles of Norcia, Umbrian olive oil, and a deeply rooted culture of slow food and artisan craft.",
    featuredProducts: ["Sagrantino DOCG", "Tartufo Nero di Norcia", "Olio DOP Umbria"],
    producers: [
      { name: "Cantina Antonelli", city: "Montefalco", category: "Wine", description: "Family estate producing Sagrantino di Montefalco DOCG", rating: 4.9 },
      { name: "Salumificio Norcino", city: "Norcia", category: "Cured Meats", description: "Norcia IGP prosciutto and salumi following ancient mountain recipes", rating: 4.7 },
      { name: "Tartufi Bianconi", city: "Scheggino", category: "Truffle", description: "Black truffle of Norcia, hand-harvested in Umbrian forests", rating: 4.8 },
      { name: "Frantoio Gaudenzi", city: "Trevi", category: "Olive Oil", description: "DOP Umbria Colli Assisi-Spoleto — intensely fruity Moraiolo oil", rating: 4.8 },
      { name: "Lenticchie di Castelluccio Bianconi", city: "Norcia", category: "Legumes", description: "IGP Castelluccio lentils from the Piano Grande — tiny, earthy, extraordinary", rating: 4.7 },
      { name: "Caseificio La Mucca Umbra", city: "Perugia", category: "Cheese", description: "Caciotta umbra and pecorino tartufo from the Umbrian hills", rating: 4.6 },
    ],
    experiences: [
      { name: "Black Truffle Hunt Norcia", type: "Food Tour", price: "€95/person", producer: "Tartufi Bianconi" },
      { name: "Sagrantino Wine Tasting", type: "Wine Tasting", price: "€60/person", producer: "Cantina Antonelli" }
    ]
  },
  trentino_alto_adige: {
    name: "Trentino-Alto Adige", producerCount: 10, experienceCount: 3,
    description: "Trentino-Alto Adige sits in the Alps — Speck Alto Adige, Val di Non apples, Trentino grappa, and mountain dairy traditions that blend Italian and Austrian influences.",
    featuredProducts: ["Speck Alto Adige IGP", "Grappa Trentina", "Mela Val di Non DOP"],
    producers: [
      { name: "Speck Recla", city: "Lana", category: "Cured Meats", description: "Speck Alto Adige IGP cold-smoked and mountain-air cured", rating: 4.8 },
      { name: "Distilleria Marzadro", city: "Nogaredo", category: "Spirits", description: "Trentino grappa distilled from local pomace in copper pot stills", rating: 4.7 },
      { name: "Melinda", city: "Cles", category: "Fruit", description: "Val di Non DOP apples from the Noce river valley", rating: 4.6 },
      { name: "Cantina Terlan", city: "Terlano", category: "Wine", description: "Alto Adige Pinot Grigio and Sauvignon from the Terlano cooperative", rating: 4.9 },
      { name: "Caseificio Latte Ora", city: "Bolzano", category: "Cheese", description: "Stelvio DOP and alpine-style grey cheese from South Tyrolean dairies", rating: 4.7 },
      { name: "Bäckerei Konditorei Pfeifer", city: "Merano", category: "Baked Goods", description: "Traditional South Tyrolean strudel, Schüttelbrot and Vinschgauer bread", rating: 4.8 },
    ],
    experiences: [
      { name: "Speck Farm Tour", type: "Farm Visit", price: "€45/person", producer: "Speck Recla" },
      { name: "Alpine Grappa Distillery Visit", type: "Tasting", price: "€50/person", producer: "Distilleria Marzadro" }
    ]
  },
  friuli_venezia_giulia: {
    name: "Friuli-Venezia Giulia", producerCount: 9, experienceCount: 2,
    description: "Friuli-Venezia Giulia is Italy's northeastern corner — Prosciutto di San Daniele DOP, Collio DOC whites, Montasio cheese, and a unique crossroads of Italian, Slovenian, and Austrian food culture.",
    featuredProducts: ["Prosciutto di San Daniele DOP", "Friulano DOC", "Montasio DOP"],
    producers: [
      { name: "Prolongo San Daniele", city: "San Daniele del Friuli", category: "Cured Meats", description: "Prosciutto di San Daniele DOP aged 16 months in Friulian air", rating: 4.9 },
      { name: "Cantina Jermann", city: "Ruttars", category: "Wine", description: "Iconic Friulano and Vintage Tunina from Collio DOC", rating: 4.9 },
      { name: "Caseificio Tonutti", city: "Spilimbergo", category: "Cheese", description: "Montasio DOP aged in traditional Friulian mountain dairies", rating: 4.7 },
      { name: "Grappa Julia", city: "Cividale del Friuli", category: "Spirits", description: "Friulian grappa from Picolit and Schioppettino — elegant and floral", rating: 4.7 },
      { name: "Miele del Carso Karst", city: "Trieste", category: "Honey", description: "Karst plateau honeys — sage, black locust and rare local wildflower varieties", rating: 4.6 },
      { name: "Pastificio Wolf Sauris", city: "Sauris", category: "Cured Meats", description: "Smoked Sauris ham IGP — cured in the highest village of Carnia", rating: 4.8 },
    ],
    experiences: [
      { name: "San Daniele Ham Cellar Tour", type: "Farm Visit", price: "€50/person", producer: "Prolongo San Daniele" },
      { name: "Collio Wine Tasting", type: "Wine Tasting", price: "€55/person", producer: "Cantina Jermann" }
    ]
  },
  basilicata: {
    name: "Basilicata", producerCount: 8, experienceCount: 2,
    description: "Basilicata is Italy's wild south — Aglianico del Vulture from volcanic soils, Peperone di Senise cruschi peppers, Canestrato di Moliterno cheese, and a rugged mountain food culture.",
    featuredProducts: ["Aglianico del Vulture DOC", "Peperone di Senise IGP", "Canestrato di Moliterno"],
    producers: [
      { name: "Cantine del Notaio", city: "Rionero in Vulture", category: "Wine", description: "Aglianico del Vulture DOC from volcanic Vulture soils", rating: 4.9 },
      { name: "Sapori Lucani", city: "Senise", category: "Vegetables", description: "Peperone di Senise IGP dried cruschi peppers, a Basilicata icon", rating: 4.7 },
      { name: "Caseificio Moliterno", city: "Moliterno", category: "Cheese", description: "Canestrato di Moliterno IGP aged in mountain basket moulds", rating: 4.6 },
      { name: "Olio Il Frantoio Lucano", city: "Matera", category: "Olive Oil", description: "Matera DOP Majatica monocultivar oil from ancient Lucanian groves", rating: 4.7 },
      { name: "Forno Granaio Lucano", city: "Matera", category: "Baked Goods", description: "Pane di Matera IGP — 2kg sourdough loaf baked in wood-fired stone ovens", rating: 4.8 },
      { name: "Salumificio Basilisco", city: "Lauria", category: "Cured Meats", description: "Lucanian sausage and soppressata — ancient mountain curing traditions", rating: 4.5 },
    ],
    experiences: [
      { name: "Vulture Volcano Wine Tour", type: "Wine Tasting", price: "€65/person", producer: "Cantine del Notaio" },
      { name: "Cruschi Pepper Farm Visit", type: "Farm Visit", price: "€35/person", producer: "Sapori Lucani" }
    ]
  },
  molise: {
    name: "Molise", producerCount: 5, experienceCount: 2,
    description: "Molise is Italy's smallest and most authentic region — Tintilia wine from indigenous vines, Caciocavallo Molisano aged in ancient cellars, and a mountain pastoral food culture unchanged for centuries.",
    featuredProducts: ["Tintilia del Molise DOC", "Caciocavallo Molisano", "Agnello Molisano"],
    producers: [
      { name: "Cantine Catabbo", city: "Campobasso", category: "Wine", description: "Tintilia del Molise DOC from the region's indigenous red grape", rating: 4.7 },
      { name: "Caseificio Di Nucci", city: "Agnone", category: "Cheese", description: "Caciocavallo Molisano DOP aged in traditional Agnone cellars", rating: 4.6 },
      { name: "Agriturismo Selvaggi", city: "Isernia", category: "Meat", description: "Free-range Molise lamb raised on Matese mountain pastures", rating: 4.5 },
      { name: "Olio Colavita Molise", city: "Sant'Elia a Pianisi", category: "Olive Oil", description: "Gentile di Larino monocultivar oil from the Molise Apennine foothills", rating: 4.6 },
      { name: "Molitura Mola del Vento", city: "Trivento", category: "Grain", description: "Stone-ground heritage wheat flours from ancient Molisan varieties", rating: 4.7 },
      { name: "Salumificio Trotta", city: "Agnone", category: "Cured Meats", description: "Ventricina del Vastese and Molisan soppressata — bold, artisan, rare", rating: 4.5 },
    ],
    experiences: [
      { name: "Molise Pastoral Food Experience", type: "Food Tour", price: "€55/person", producer: "Agriturismo Selvaggi" },
      { name: "Tintilia Wine Discovery", type: "Wine Tasting", price: "€40/person", producer: "Cantine Catabbo" }
    ]
  },
  valle_daosta: {
    name: "Valle d'Aosta", producerCount: 4, experienceCount: 2,
    description: "Valle d'Aosta is Italy's smallest region and highest altitude — Fontina DOP from Alpine cows, Lard d'Arnad aged in chestnut brine, Genepì alpine liqueur, and mountain dairy traditions under Mont Blanc.",
    featuredProducts: ["Fontina DOP", "Lard d'Arnad DOP", "Genepì"],
    producers: [
      { name: "Cooperativa Produttori Fontina", city: "Aosta", category: "Cheese", description: "Authentic Fontina DOP from Alpine pasture-raised cows", rating: 4.9 },
      { name: "Maison Bertolin", city: "Arnad", category: "Cured Meats", description: "Lard d'Arnad DOP aged in chestnut brine, a Valle d'Aosta treasure", rating: 4.8 },
      { name: "Distillerie Valdotaine", city: "Villeneuve", category: "Spirits", description: "Alpine grappa and genepì liqueur from high-altitude herbs", rating: 4.7 },
      { name: "Caves Cooperatives de Donnas", city: "Donnas", category: "Wine", description: "Valle d'Aosta DOC Nebbiolo-based reds from Europe's most extreme alpine vineyards", rating: 4.8 },
      { name: "Miele delle Alpi Stella", city: "Saint-Vincent", category: "Honey", description: "Rhododendron and wildflower honeys harvested at 1600m altitude", rating: 4.7 },
      { name: "Patisserie Boch", city: "Aosta", category: "Baked Goods", description: "Traditional Valdostan tegole biscuits, meringues and chestnut confections", rating: 4.6 },
    ],
    experiences: [
      { name: "Alpine Fontina Dairy Tour", type: "Farm Visit", price: "€55/person", producer: "Cooperativa Produttori Fontina" },
      { name: "Mont Blanc Food & Wine Walk", type: "Food Tour", price: "€80/person", producer: "Bottega Delivery" }
    ]
  }
};

export const regionCentroids = {
  lombardia: { lat: 45.47, lng: 9.19 },
  toscana: { lat: 43.77, lng: 11.25 },
  sicilia: { lat: 37.60, lng: 14.01 },
  campania: { lat: 40.84, lng: 14.25 },
  veneto: { lat: 45.44, lng: 12.33 },
  piemonte: { lat: 45.07, lng: 7.68 },
  puglia: { lat: 41.12, lng: 16.87 },
  emilia_romagna: { lat: 44.49, lng: 11.34 },
  lazio: { lat: 41.90, lng: 12.48 },
  sardegna: { lat: 39.22, lng: 9.11 },
  calabria: { lat: 38.91, lng: 16.59 },
  liguria: { lat: 44.41, lng: 8.93 },
  marche: { lat: 43.62, lng: 13.51 },
  abruzzo: { lat: 42.35, lng: 13.39 },
  umbria: { lat: 43.11, lng: 12.39 },
  trentino_alto_adige: { lat: 46.07, lng: 11.12 },
  friuli_venezia_giulia: { lat: 46.07, lng: 13.23 },
  basilicata: { lat: 40.64, lng: 15.97 },
  molise: { lat: 41.56, lng: 14.66 },
  valle_daosta: { lat: 45.74, lng: 7.32 }
};