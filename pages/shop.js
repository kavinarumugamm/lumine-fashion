// pages/shop.js
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../lib/products';

const categories = ['All', 'Serums', 'Moisturisers', 'Cleansers', 'Eye Care', 'Sun Care', 'Masks'];

export default function Shop() {
  const [active, setActive] = useState('All');
  const [sort, setSort] = useState('featured');

  const filtered = products
    .filter(p => active === 'All' || p.categories.includes(active))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.reviews - a.reviews;
      return 0;
    });

  return (
    <>
      <Head><title>Shop — Lumine Skincare</title></Head>
      <Navbar />

      {/* Page header */}
      <div style={{ paddingTop: '170px', paddingBottom: '64px', textAlign: 'center', background: 'var(--cream)' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>The Collection</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '60px', fontWeight: 300 }}>All Products</h1>
      </div>

      {/* Filter bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 80px', borderBottom: '1px solid var(--border)',
        background: 'var(--warm-white)', position: 'sticky', top: '68px', zIndex: 50,
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: '8px 20px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
              border: '1px solid', fontFamily: 'var(--font-sans)', cursor: 'pointer',
              borderColor: active === cat ? 'var(--charcoal)' : 'var(--border)',
              background: active === cat ? 'var(--charcoal)' : 'transparent',
              color: active === cat ? 'var(--warm-white)' : 'var(--stone)',
              transition: 'all 0.2s',
            }}>{cat}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{
          border: '1px solid var(--border)', padding: '8px 16px', fontSize: '12px',
          color: 'var(--charcoal)', background: 'transparent', outline: 'none', fontFamily: 'var(--font-sans)',
        }}>
          <option value="featured">Featured</option>
          <option value="rating">Top Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div style={{ padding: '56px 80px 120px' }}>
        <p style={{ fontSize: '12px', color: 'var(--stone)', marginBottom: '44px' }}>{filtered.length} products</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '52px 36px' }}>
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>

      <Footer />
    </>
  );
}
