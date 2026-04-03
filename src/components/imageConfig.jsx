export const REGION_IMAGES = {
  toscana: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/7e69b3d03_generated_image.png',
  lombardia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/5caaf3d0f_generated_image.png',
  sicilia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/48f5ee453_generated_image.png',
  campania: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/acd73822c_generated_image.png',
  veneto: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/e687e5690_generated_image.png',
  piemonte: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/fc338e179_generated_image.png',
  puglia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/45aa42495_generated_image.png',
  emilia_romagna: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/a27d2b16a_generated_image.png',
  lazio: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/d3871d123_generated_image.png',
  sardegna: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/4f83999be_generated_image.png',
  liguria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/362518852_generated_image.png',
  calabria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/ebbd6ed12_generated_image.png',
  marche: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/bf764a187_generated_image.png',
  abruzzo: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/f32d70314_generated_image.png',
  umbria: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/1db533ce9_generated_image.png',
  trentino_alto_adige: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/27a95cfc3_generated_image.png',
  friuli_venezia_giulia: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/3b48fadc7_generated_image.png',
  basilicata: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/7c56426f4_generated_image.png',
  molise: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/94c651f0b_generated_image.png',
  valle_daosta: 'https://media.base44.com/images/public/69b28610d2d035157c27d27a/d0c62424d_generated_image.png',
};

export const PRODUCT_IMAGES = {
  'Olive Oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
  'Wine': 'https://images.unsplash.com/photo-1698063126115-7ba800c43289?w=400&q=80',
  'Cheese': 'https://images.unsplash.com/photo-1773919685006-2d329149f44b?w=400&q=80',
  'Pasta': 'https://images.unsplash.com/photo-1751182471056-ecd29a41f339?w=400&q=80',
  'Coffee': 'https://images.unsplash.com/photo-1650100458608-824a54559caa?w=400&q=80',
  'Truffle': 'https://images.unsplash.com/photo-1650475972369-4579ce5e8b71?w=400&q=80',
  'Cured Meats': 'https://images.unsplash.com/photo-1615932726364-a8f79917a65a?w=400&q=80',
  'Honey': 'https://images.unsplash.com/photo-1692797178143-659c48c34135?w=400&q=80',
  'Condiments': 'https://images.unsplash.com/photo-1733336748576-82854570ef01?w=400&q=80',
  'Spirits': 'https://images.unsplash.com/photo-1719433436838-3f0c01d6222c?w=400&q=80',
  'Chocolate': 'https://images.unsplash.com/photo-1522249341405-3871994ac062?w=400&q=80',
  'Nuts': 'https://images.unsplash.com/photo-1769255484631-d4e5b7d77446?w=400&q=80',
  'default': 'https://images.unsplash.com/photo-1689001915758-dc1fb9acb3ff?w=400&q=80',
};

export const RECIPE_IMAGES = {
  'cacio-e-pepe': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=85',
  'tagliatelle-ragu': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85',
  'risotto-milanese': 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=85',
  'trofie-al-pesto': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=85',
  'pasta-alla-norma': 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=85',
  'tajarin-tartufo': 'https://images.unsplash.com/photo-1548940740-204726a19be3?w=800&q=85',
};

export const getRegionImage = (regionId) => REGION_IMAGES[regionId] || REGION_IMAGES.toscana;
export const getProductImage = (category) => PRODUCT_IMAGES[category] || PRODUCT_IMAGES.default;
export const getRecipeImage = (id) => RECIPE_IMAGES[id] || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85';
