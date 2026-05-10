// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--charcoal)', color: 'var(--gold-light)',
      padding: '80px 80px 40px',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '60px', marginBottom: '80px',
      }}>
        <div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '20px', color: '#FDFCFA' }}>Lumine</p>
          <p style={{ fontSize: '13px', lineHeight: 1.9, color: 'var(--stone)', maxWidth: '260px', marginBottom: '28px' }}>
            Precision skincare formulated for those who believe beauty is a ritual, not a routine.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Instagram', 'TikTok', 'Pinterest'].map(s => (
              <a key={s} href="#" style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--stone)', transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
                onMouseLeave={e => e.target.style.color = 'var(--stone)'}
              >{s}</a>
            ))}
          </div>
        </div>

        {[
          { title: 'Shop', links: ['All Products', 'Serums', 'Moisturisers', 'Cleansers', 'Eye Care', 'SPF', 'Masks'] },
          { title: 'Help', links: ['Shipping & Returns', 'Track Your Order', 'FAQ', 'Contact Us'] },
          { title: 'The Ritual', links: ['Our Story', 'Ingredients', 'Sustainability', 'Science', 'Press'] },
        ].map(col => (
          <div key={col.title}>
            <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--gold)' }}>{col.title}</p>
            {col.links.map(item => (
              <div key={item} style={{ marginBottom: '12px' }}>
                <a href="#" style={{ fontSize: '13px', color: 'var(--stone)', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={e => e.target.style.color = 'var(--stone)'}
                >{item}</a>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '11px', color: 'var(--stone)' }}>© 2025 Lumine Skincare. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms', 'Cookie Settings'].map(item => (
            <a key={item} href="#" style={{ fontSize: '11px', color: 'var(--stone)' }}>{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
