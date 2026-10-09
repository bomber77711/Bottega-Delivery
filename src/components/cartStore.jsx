import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { isPhoneNow } from '@/hooks/useIsPhone';

// The cart is saved in this browser so it survives reloads and app switches (iOS Safari
// often reloads background tabs). Storage can be unavailable (private mode) — never throw.
const STORAGE_KEY = 'bottega:cart:v1';
const loadCart = () => {
  try {
    const v = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(v) ? v.filter((i) => i && i.id && typeof i.price === 'number' && i.quantity > 0) : [];
  } catch { return []; }
};

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  // Phones: a small "Added ✓ · View cart" toast instead of the full-screen drawer.
  const [lastAdded, setLastAdded] = useState(null);
  const toastTimer = useRef();

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
  }, [items]);

  const addItem = useCallback((product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    if (isPhoneNow()) {
      setLastAdded({ name: product.name, image: product.image, at: Date.now() });
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setLastAdded(null), 3500);
    } else {
      setIsOpen(true);
    }
  }, []);
  const dismissToast = useCallback(() => { clearTimeout(toastTimer.current); setLastAdded(null); }, []);

  const updateQuantity = useCallback((id, delta) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
        .filter(i => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, total, count, isOpen, setIsOpen, clearCart, lastAdded, dismissToast }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
