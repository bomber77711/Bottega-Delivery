import { useEffect, useRef } from 'react';
import { useCart } from './cartStore';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, total } = useCart();
  const overlayRef = useRef();

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setIsOpen]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex' }}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
      />
      {/* Drawer */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 420, maxWidth: '95vw',
        background: '#fff', display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
        animation: 'drawerSlide 0.25s ease'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={20} color="#2E7D32" />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>
              Your Cart
            </span>
            {items.length > 0 && (
              <span style={{ background: '#2E7D32', color: '#fff', borderRadius: '100px', padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: '#555', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
              <ShoppingBag size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: '#999', marginBottom: 8 }}>Your cart is empty</p>
              <p style={{ fontSize: 13, color: '#bbb' }}>Explore Italian producers to add products</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: 14, padding: 14, background: '#FAFAF9', borderRadius: 12, border: '1px solid #F0F0EE' }}>
                  <img src={item.image} alt={item.name} style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: '#1A1A1A', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>{item.producer}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #E8F5E9', borderRadius: 8, padding: '2px 4px' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', color: '#2E7D32', display: 'flex' }}>
                          <Minus size={12} />
                        </button>
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 500, minWidth: 16, textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', color: '#2E7D32', display: 'flex' }}>
                          <Plus size={12} />
                        </button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', display: 'flex', padding: 2, transition: 'color 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#D32F2F'}
                          onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #E8F5E9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ color: '#555', fontWeight: 500 }}>Total</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>
                €{total.toFixed(2)}
              </span>
            </div>
            <button style={{
              width: '100%', padding: '15px', background: '#2E7D32', color: '#fff',
              border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer',
              transition: 'background 0.2s, transform 0.15s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1B5E20'; e.currentTarget.style.transform = 'scale(1.01)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2E7D32'; e.currentTarget.style.transform = 'scale(1)'; }}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}