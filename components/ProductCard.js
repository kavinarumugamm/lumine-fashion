// components/ProductCard.js
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../lib/CartContext';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <Link href={`/products/${product.slug}`} style={{ display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ animation: `fadeUp 0.7s ${index * 0.08}s both`, cursor: 'pointer' }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: 'var(--cream)', marginBottom: '16px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.7s var(--transition)',
            }}
          />
          {product.badge && (
            <span style={{
              position: 'absolute', top: '14px', left: '14px',
              background: 'var(--charcoal)', color: 'var(--gold-light)',
              fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '5px 10px',
            }}>{product.badge}</span>
          )}
          <button onClick={handleQuickAdd} style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: added ? 'var(--gold)' : 'rgba(26,26,24,0.9)',
            color: 'var(--warm-white)', padding: '14px',
            fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: 'var(--font-sans)', border: 'none',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.4s var(--transition), background 0.3s',
          }}>
            {added ? '✓ Added' : 'Quick Add'}
          </button>
        </div>

        {/* Info */}
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 400, marginBottom: '3px' }}>{product.name}</p>
        <p style={{ fontSize: '12px', color: 'var(--stone)', marginBottom: '10px' }}>{product.subtitle}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ fontSize: '14px' }}>${product.price}</span>
          {product.comparePrice && (
            <span style={{ fontSize: '13px', color: 'var(--stone)', textDecoration: 'line-through' }}>${product.comparePrice}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--gold)', fontSize: '12px', letterSpacing: '0.05em' }}>★★★★★</span>
          <span style={{ fontSize: '11px', color: 'var(--stone)' }}>{product.reviews} ({product.reviewCount.toLocaleString()})</span>
        </div>
      </div>
    </Link>
  );
}
