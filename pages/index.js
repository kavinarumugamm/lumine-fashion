// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../lib/products';

const bestsellers = products.filter(p => ['lmn-001', 'lmn-006', 'lmn-004', 'lmn-005'].includes(p.id));

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <>
      <Head>
        <title>Lumine — Precision Skincare</title>
        <meta name="description" content="Precision skincare formulated for those who believe beauty is a ritual, not a routine." />
      </Head>
      <Navbar />

      {/* HERO */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1800&q=85"
          alt="Hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,24,0.65) 0%, transparent 60%)' }} />
        <div style={{
          position: 'relative', padding: '0 80px 90px',
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(30px)',
          transition: 'all 1.1s 0.2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '18px' }}>
            New collection — Autumn 2025
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(52px, 8vw, 100px)',
            fontWeight: 300, color: 'var(--warm-white)', lineHeight: 1.03,
            marginBottom: '32px', maxWidth: '660px',
          }}>
            The art of<br /><em>luminous skin.</em>
          </h1>
          <div style={{ display: 'flex', gap: '14px' }}>
            <Link href="/shop" style={{
              background: 'var(--warm-white)', color: 'var(--charcoal)',
              padding: '16px 44px', fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', display: 'inline-block', transition: 'background 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--warm-white)'}
            >Shop Collection</Link>
            <a href="#story" style={{
              border: '1px solid rgba(255,255,255,0.55)', color: 'var(--warm-white)',
              padding: '16px 44px', fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', display: 'inline-block',
            }}>Our Ritual</a>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '36px', right: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: '1px', height: '48px', background: 'rgba(255,255,255,0.25)' }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: 'var(--charcoal)', overflow: 'hidden', padding: '13px 0' }}>
        <div style={{ display: 'flex', gap: '56px', whiteSpace: 'nowrap', animation: 'marquee 28s linear infinite' }}>
          {Array(8).fill(['Vegan & Cruelty-Free', 'Clinically Tested', 'Dermatologist Approved', 'Sustainable Packaging', 'No Harmful Fillers', 'Science-Backed Formulas']).flat().map((t, i) => (
            <span key={i} style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--stone)' }}>
              {t} <span style={{ color: 'var(--gold)', margin: '0 6px' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* STORY */}
      <section id="story" style={{ padding: '120px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>About Lumine</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: 300, lineHeight: 1.12, marginBottom: '28px' }}>
            Skincare that works as hard as you do.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--stone)', lineHeight: 1.95, marginBottom: '20px' }}>
            We believe effective skincare shouldn't compromise on elegance. Every Lumine formula is born from years of research, combining pharmaceutical-grade actives with the finest botanical ingredients.
          </p>
          <p style={{ fontSize: '15px', color: 'var(--stone)', lineHeight: 1.95, marginBottom: '40px' }}>
            No unnecessary additives. No empty promises. Just science and beauty, perfectly balanced.
          </p>
          <Link href="/shop" style={{
            display: 'inline-block', borderBottom: '1px solid var(--gold)',
            paddingBottom: '4px', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase',
          }}>Explore All Products</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <img src="https://images.unsplash.com/photo-1631390979758-a1b8c45a8db0?w=600&q=85" alt="" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
          <img src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=85" alt="" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', marginTop: '48px' }} />
        </div>
      </section>

      {/* BESTSELLERS */}
      <section style={{ padding: '80px 80px 120px', background: 'var(--cream)' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>Most Loved</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 4vw, 50px)', fontWeight: 300 }}>Bestsellers</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '36px' }}>
          {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link href="/shop" style={{
            border: '1px solid var(--charcoal)', padding: '16px 52px',
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--charcoal)'; e.currentTarget.style.color = 'var(--warm-white)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--charcoal)'; }}
          >View All Products</Link>
        </div>
      </section>

      {/* FULL-WIDTH BANNER */}
      <section style={{ height: '65vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1800&q=85" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,24,0.42)' }} />
        <div style={{ position: 'relative', textAlign: 'center', color: 'var(--warm-white)' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>The Lumine Ritual</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 300, lineHeight: 1.08, marginBottom: '36px' }}>
            Build your perfect<br />morning routine.
          </h2>
          <Link href="/shop" style={{
            border: '1px solid rgba(255,255,255,0.6)', color: 'var(--warm-white)',
            padding: '16px 52px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block',
          }}>Shop the Ritual</Link>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '100px 80px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        {[
          { number: '7,200+', label: 'Five-star reviews' },
          { number: '12', label: 'Luxury formulas' },
          { number: '98%', label: 'Would repurchase' },
          { number: '4 Weeks', label: 'Visible results' },
        ].map(s => (
          <div key={s.number}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '52px', fontWeight: 300, marginBottom: '8px' }}>{s.number}</p>
            <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--stone)' }}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* PRESS */}
      <section style={{ padding: '60px 80px' }}>
        <p style={{ textAlign: 'center', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '44px' }}>As seen in</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', alignItems: 'center' }}>
          {["Vogue", "Harper's Bazaar", "Elle", "Allure", "Refinery29"].map(pub => (
            <span key={pub} style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 300, color: 'var(--stone)', fontStyle: 'italic' }}>{pub}</span>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
