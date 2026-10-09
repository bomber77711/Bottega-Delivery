import { Check, X } from 'lucide-react';
import { useCart } from '@/components/cartStore';

// Phone-only confirmation after "Add to Cart" — replaces the full-screen drawer.
export default function AddedToast() {
  const { lastAdded, dismissToast, setIsOpen, count } = useCart();
  if (!lastAdded) return null;
  return (
    <div className="added-toast" role="status" aria-live="polite" key={lastAdded.at}>
      <span className="added-toast-check"><Check size={16} strokeWidth={3} /></span>
      <span className="added-toast-text">
        <strong>Added to cart</strong>
        <span>{lastAdded.name}</span>
      </span>
      <button type="button" className="added-toast-cta" onClick={() => { dismissToast(); setIsOpen(true); }}>
        View cart{count > 1 ? ` (${count})` : ''}
      </button>
      <button type="button" className="added-toast-close" onClick={dismissToast} aria-label="Dismiss"><X size={16} /></button>
    </div>
  );
}
