// components/Navbar.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../lib/CartContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div style={{
        position: 'fixed', top: 0, zIndex: 99, width: '100%',
        background: 'var(--charcoal)', color: 'var(--gold-light)',
        textAlign: 'center', fontSize: '11px', letterSpacing: '0.15em',
        textTransform: 'uppercase', padding: '9px',
        transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.35s ease',
      }}>
        Complimentary shipping on orders over $120 · Code <strong>LUMINE15</strong> for 15% off
      </div>

      <nav style={{
        position: 'fixed', top: scrolled ? 0 : '37px', left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(253,252,250,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
        padding: '0 60px', height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Left */}
        <div style={{ display: 'flex', gap: '36px', flex: 1 }}>
          {[['Shop', '/shop'], ['Rituals', '#'], ['About', '#']].map(([label, href]) => (
            <Link key={label} href={href} style={{
              fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase',
              fontWeight: 400, color: 'var(--charcoal)', opacity: 0.65,
              transition: 'opacity 0.25s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.65'}
            >{label}</Link>
          ))}
        </div>

        {/* Logo */}
        <Link href="/" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300,
            letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--charcoal)',
          }}>Lumine</span>
        </Link>

        {/* Right */}
        <div style={{ display: 'flex', gap: '32px', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Link href="#" style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.65 }}>Account</Link>
          <button onClick={() => setIsOpen(true)} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--charcoal)', opacity: 0.65, transition: 'opacity 0.25s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.65'}
          >
            Bag
            {count > 0 && (
              <span style={{
                background: 'var(--charcoal)', color: 'var(--warm-white)',
                borderRadius: '50%', width: '18px', height: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 500,
              }}>{count}</span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer />
    </>
  );
}
