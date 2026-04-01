const STORAGE_KEY = 'bottega_taste_map';

export function getSaved() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {
    producers: [], products: [], experiences: [], recipes: [], regions: []
  };
}

export function toggleSave(type, item) {
  const saved = getSaved();
  const list = saved[type] || [];
  const idx = list.findIndex(i => i.id === item.id);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(item);
  }
  saved[type] = list;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  window.dispatchEvent(new CustomEvent('tasteMapUpdate'));
  return idx < 0; // true = just saved
}

export function isSaved(type, id) {
  const saved = getSaved();
  return (saved[type] || []).some(i => i.id === id);
}

export function removeSave(type, id) {
  const saved = getSaved();
  saved[type] = (saved[type] || []).filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  window.dispatchEvent(new CustomEvent('tasteMapUpdate'));
}

export function getTotalCount() {
  const saved = getSaved();
  return Object.values(saved).reduce((sum, arr) => sum + arr.length, 0);
}