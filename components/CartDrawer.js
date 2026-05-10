// components/CartDrawer.js
import { useCart } from '../lib/CartContext';
import { useRouter } from 'next/router';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <>
      <div onClick={() => setIsOpen(false)} style={{
        position: 'fixed', inset: 0, background: 'rgba(26,26,24,0.45)',
        zIndex: 200, animation: 'fadeIn 0.3s ease',
      }} />

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '420px',
        background: 'var(--warm-white)', zIndex: 201,
        display: 'flex', flexDirection: 'column',
        animation: 'slideInRight 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        {/* Header */}
        <div style={{
          padding: '28px 32px', borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 400 }}>
            Your Bag
            {items.length > 0 && <span style={{ fontSize: '14px', color: 'var(--stone)', fontWeight: 300 }}> ({items.length})</span>}
          </span>
          <button onClick={() => setIsOpen(false)} style={{ fontSize: '24px', color: 'var(--stone)', lineHeight: 1 }}>×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '80px' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 300, color: 'var(--stone)', marginBottom: '12px' }}>Your bag is empty</p>
              <p style={{ fontSize: '13px', color: 'var(--stone)', marginBottom: '32px' }}>Discover your ritual</p>
              <button onClick={() => { setIsOpen(false); router.push('/shop'); }} style={{
                border: '1px solid var(--charcoal)', padding: '12px 36px',
                fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
              }}>Shop Now</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '16px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '96px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', marginBottom: '2px' }}>{item.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--stone)', marginBottom: '14px' }}>{item.subtitle}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border)', padding: '5px 12px' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ fontSize: '16px', color: 'var(--stone)', lineHeight: 1 }}>−</button>
                        <span style={{ fontSize: '13px', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ fontSize: '16px', color: 'var(--stone)', lineHeight: 1 }}>+</button>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '14px', fontWeight: 400, marginBottom: '4px' }}>${(item.price * item.quantity).toFixed(2)}</p>
                        <button onClick={() => removeItem(item.id)} style={{ fontSize: '11px', color: 'var(--stone)', letterSpacing: '0.08em' }}>Remove</button>
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
          <div style={{ padding: '24px 32px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px' }}>${total.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--stone)', marginBottom: '20px' }}>Shipping & taxes calculated at checkout</p>
            <button onClick={() => { setIsOpen(false); router.push('/checkout'); }} style={{
              width: '100%', background: 'var(--charcoal)', color: 'var(--warm-white)',
              padding: '17px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)', border: 'none', transition: 'opacity 0.25s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
