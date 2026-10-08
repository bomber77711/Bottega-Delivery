export const REGION_IMAGES = {
  toscana: '/img/b44/7e69b3d03.webp',
  lombardia: '/img/b44/5caaf3d0f.webp',
  sicilia: '/img/b44/48f5ee453.webp',
  campania: '/img/b44/acd73822c.webp',
  veneto: '/img/b44/e687e5690.webp',
  piemonte: '/img/b44/fc338e179.webp',
  puglia: '/img/b44/45aa42495.webp',
  emilia_romagna: '/img/b44/a27d2b16a.webp',
  lazio: '/img/b44/d3871d123.webp',
  sardegna: '/img/b44/4f83999be.webp',
  liguria: '/img/b44/362518852.webp',
  calabria: '/img/b44/ebbd6ed12.webp',
  marche: '/img/b44/bf764a187.webp',
  abruzzo: '/img/b44/f32d70314.webp',
  umbria: '/img/b44/1db533ce9.webp',
  trentino_alto_adige: '/img/b44/27a95cfc3.webp',
  friuli_venezia_giulia: '/img/b44/3b48fadc7.webp',
  basilicata: '/img/b44/7c56426f4.webp',
  molise: '/img/b44/94c651f0b.webp',
  valle_daosta: '/img/b44/d0c62424d.webp',
};

export const PRODUCT_IMAGES = {
  'Olive Oil': '/img/u/1474979266404-7eaacbcd87c5-400.webp',
  'Wine': '/img/u/1698063126115-7ba800c43289-400.webp',
  'Cheese': '/img/products/cat-cheese.webp',
  'Pasta': '/img/u/1751182471056-ecd29a41f339-400.webp',
  'Coffee': '/img/u/1650100458608-824a54559caa-400.webp',
  'Truffle': '/img/lib/black-truffles.webp',
  'Cured Meats': '/img/lib/cured-meats.webp',
  'Honey': '/img/lib/honey.webp',
  'Condiments': '/img/u/1733336748576-82854570ef01-400.webp',
  'Spirits': '/img/u/1719433436838-3f0c01d6222c-400.webp',
  'Chocolate': '/img/u/1522249341405-3871994ac062-400.webp',
  'Nuts': '/img/lib/nuts.webp',
  'default': '/img/u/1689001915758-dc1fb9acb3ff-400.webp',
};

export const RECIPE_IMAGES = {
  'cacio-e-pepe': '/img/u/1621996346565-e3dbc646d9a9-800.webp',
  'tagliatelle-ragu': '/img/lib/tagliatelle.webp',
  'risotto-milanese': '/img/u/1476124369491-e7addf5db371-800.webp',
  'trofie-al-pesto': '/img/lib/trofie-pesto.webp',
  'pasta-alla-norma': '/img/u/1473093295043-cdd812d0e601-800.webp',
  'tajarin-tartufo': '/img/u/1548940740-204726a19be3-800.webp',
};

export const getRegionImage = (regionId) => REGION_IMAGES[regionId] || REGION_IMAGES.toscana;
export const getProductImage = (category) => PRODUCT_IMAGES[category] || PRODUCT_IMAGES.default;
export const getRecipeImage = (id) => RECIPE_IMAGES[id] || '/img/u/1556909114-f6e7ad7d3136-800.webp';
