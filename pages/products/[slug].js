// pages/products/[slug].js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../lib/CartContext';
import { products, getProduct } from '../../lib/products';

export async function getStaticPaths() {
  return { paths: products.map(p => ({ params: { slug: p.slug } })), fallback: false };
}
export async function getStaticProps({ params }) {
  const product = getProduct(params.slug);
  const related = products.filter(p => p.id !== product.id && p.categories.some(c => product.categories.includes(c))).slice(0, 3);
  return { props: { product, related } };
}

export default function ProductPage({ product, related }) {
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); setActiveImg(0); }, [product]);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const accordions = [
    { id: 'details', label: 'Product Details', content: product.details.join('\n') },
    { id: 'ingredients', label: 'Full Ingredients', content: product.ingredients },
    { id: 'how', label: 'How to Use', content: product.howToUse },
  ];

  return (
    <>
      <Head>
        <title>{product.name} — Lumine Skincare</title>
        <meta name="description" content={product.description} />
      </Head>
      <Navbar />

      <main style={{ paddingTop: '110px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', padding: '56px 80px', maxWidth: '1440px', margin: '0 auto' }}>

          {/* Gallery */}
          <div>
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5', background: 'var(--cream)', marginBottom: '12px' }}>
              <img src={product.images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.35s' }} />
              {product.badge && (
                <span style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--charcoal)', color: 'var(--gold-light)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 12px' }}>{product.badge}</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: '76px', aspectRatio: '1', overflow: 'hidden', border: `2px solid ${activeImg === i ? 'var(--charcoal)' : 'transparent'}`, padding: 0, cursor: 'pointer', background: 'none' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p style={{ fontSize: '11px', color: 'var(--stone)', letterSpacing: '0.1em', marginBottom: '20px' }}>{product.categories.join(' · ')}</p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', fontWeight: 300, marginBottom: '6px', lineHeight: 1.08 }}>{product.name}</h1>
            <p style={{ fontSize: '15px', color: 'var(--stone)', marginBottom: '20px' }}>{product.subtitle}</p>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <span style={{ color: 'var(--gold)', fontSize: '14px', letterSpacing: '0.05em' }}>★★★★★</span>
              <span style={{ fontSize: '13px', color: 'var(--stone)' }}>{product.reviews} ({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '28px' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '30px' }}>${product.price}</span>
              {product.comparePrice && (
                <>
                  <span style={{ fontSize: '17px', color: 'var(--stone)', textDecoration: 'line-through' }}>${product.comparePrice}</span>
                  <span style={{ fontSize: '12px', color: 'var(--gold)' }}>Save ${product.comparePrice - product.price}</span>
                </>
              )}
            </div>

            <p style={{ fontSize: '15px', lineHeight: 1.95, color: 'var(--stone)', marginBottom: '36px' }}>{product.description}</p>

            {/* Qty + Add */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '14px 20px', fontSize: '18px', color: 'var(--stone)', background: 'none', border: 'none', cursor: 'pointer' }}>−</button>
                <span style={{ padding: '0 16px', fontSize: '14px', minWidth: '40px', textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ padding: '14px 20px', fontSize: '18px', color: 'var(--stone)', background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
              </div>
              <button onClick={handleAdd} style={{
                flex: 1, background: added ? 'var(--gold)' : 'var(--charcoal)', color: 'var(--warm-white)',
                padding: '16px 32px', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)', border: 'none', cursor: 'pointer', transition: 'background 0.3s',
              }}>
                {added ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
            </div>

            {/* Trust */}
            <div style={{ display: 'flex', gap: '24px', padding: '18px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '32px' }}>
              {['Free Shipping $120+', 'Cruelty-Free', '30-Day Returns'].map(b => (
                <p key={b} style={{ fontSize: '11px', color: 'var(--stone)', letterSpacing: '0.04em' }}>✓ {b}</p>
              ))}
            </div>

            {/* Accordions */}
            {accordions.map(a => (
              <div key={a.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <button onClick={() => setExpanded(expanded === a.id ? null : a.id)} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 0', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--charcoal)', fontFamily: 'var(--font-sans)', background: 'none', border: 'none', cursor: 'pointer',
                }}>
                  {a.label}
                  <span style={{ fontSize: '22px', fontWeight: 300, color: 'var(--stone)', transition: 'transform 0.3s', display: 'inline-block', transform: expanded === a.id ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {expanded === a.id && (
                  <p style={{ fontSize: '13px', color: 'var(--stone)', lineHeight: 1.9, paddingBottom: '20px', whiteSpace: 'pre-line' }}>{a.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section style={{ padding: '80px', background: 'var(--cream)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 300, marginBottom: '52px', textAlign: 'center' }}>Complete Your Ritual</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '36px' }}>
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
