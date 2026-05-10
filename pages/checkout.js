// pages/checkout.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useCart } from '../lib/CartContext';

let orderNum = 1000;

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState('info');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postcode: '', country: 'United Kingdom' });
  const [orderId, setOrderId] = useState('');

  useEffect(() => { if (items.length === 0 && step !== 'success') router.push('/shop'); }, [items]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const id = `LMN-${++orderNum}`;
    setOrderId(id);
    clearCart();
    setStep('success');
  };

  const shipping = total >= 120 ? 0 : 8.95;
  const orderTotal = total + shipping;

  const inputStyle = {
    width: '100%', border: 'none', borderBottom: '1px solid var(--border)',
    padding: '11px 0', fontSize: '14px', background: 'transparent',
    outline: 'none', color: 'var(--charcoal)', fontFamily: 'var(--font-sans)',
  };
  const labelStyle = {
    fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'var(--stone)', display: 'block', marginBottom: '8px',
  };

  if (step === 'success') {
    return (
      <>
        <Head><title>Order Confirmed — Lumine</title></Head>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px', padding: '0 40px' }}>
            <div style={{ width: '68px', height: '68px', border: '1px solid var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 36px', fontSize: '26px', color: 'var(--gold)' }}>✓</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '44px', fontWeight: 300, marginBottom: '16px' }}>Order Confirmed</h1>
            <p style={{ fontSize: '13px', color: 'var(--stone)', marginBottom: '8px' }}>Order <strong style={{ color: 'var(--charcoal)' }}>{orderId}</strong></p>
            <p style={{ fontSize: '15px', color: 'var(--stone)', lineHeight: 1.85, marginBottom: '44px' }}>
              Thank you, <strong style={{ color: 'var(--charcoal)' }}>{form.firstName}</strong>. A confirmation has been sent to <strong style={{ color: 'var(--charcoal)' }}>{form.email}</strong>.
            </p>
            <button onClick={() => router.push('/shop')} style={{
              background: 'var(--charcoal)', color: 'var(--warm-white)',
              padding: '16px 52px', fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', fontFamily: 'var(--font-sans)', border: 'none', cursor: 'pointer',
            }}>Continue Shopping</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>Checkout — Lumine</title></Head>
      <Navbar />

      <div style={{ paddingTop: '110px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '80px', maxWidth: '1200px', margin: '0 auto', padding: '110px 60px 100px' }}>

        {/* Form */}
        <div>
          {/* Step tabs */}
          <div style={{ display: 'flex', gap: '36px', marginBottom: '52px' }}>
            {['Contact & Delivery', 'Payment'].map((s, i) => {
              const isActive = (i === 0 && step === 'info') || (i === 1 && step === 'payment');
              return (
                <span key={s} style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: isActive ? 'var(--charcoal)' : 'var(--stone)', fontWeight: isActive ? 500 : 300, borderBottom: isActive ? '1px solid var(--charcoal)' : 'none', paddingBottom: '4px' }}>
                  {i + 1}. {s}
                </span>
              );
            })}
          </div>

          {step === 'info' && (
            <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', fontWeight: 300, marginBottom: '36px' }}>Contact & Delivery</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([n, l]) => (
                  <div key={n}>
                    <label style={labelStyle}>{l}</label>
                    <input name={n} value={form[n]} onChange={handleChange} required style={inputStyle} />
                  </div>
                ))}
              </div>
              {[['email', 'Email Address', 'email'], ['phone', 'Phone Number', 'tel'], ['address', 'Street Address', 'text'], ['city', 'City', 'text'], ['postcode', 'Postcode / ZIP', 'text']].map(([n, l, t]) => (
                <div key={n} style={{ marginBottom: '24px' }}>
                  <label style={labelStyle}>{l}</label>
                  <input name={n} type={t} value={form[n]} onChange={handleChange} required style={inputStyle} />
                </div>
              ))}
              <div style={{ marginBottom: '36px' }}>
                <label style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginTop: '3px', accentColor: 'var(--charcoal)' }} />
                  <span style={{ fontSize: '13px', color: 'var(--stone)', lineHeight: 1.7 }}>Sign me up for exclusive offers, new launches, and skincare rituals from Lumine.</span>
                </label>
              </div>
              <button type="submit" style={{ width: '100%', background: 'var(--charcoal)', color: 'var(--warm-white)', padding: '17px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', border: 'none', cursor: 'pointer' }}>
                Continue to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', fontWeight: 300, marginBottom: '36px' }}>Payment Details</h2>
              <div style={{ background: 'var(--cream)', padding: '18px 20px', marginBottom: '32px', fontSize: '13px', color: 'var(--stone)', lineHeight: 1.7 }}>
                🎓 <strong style={{ color: 'var(--charcoal)' }}>Practice store:</strong> No real payment is processed. Click "Place Order" to simulate a completed purchase.
              </div>
              {[['Card Number', '4242 4242 4242 4242'], ['Name on Card', form.firstName + ' ' + form.lastName], ['Expiry Date', '12 / 27'], ['Security Code', '•••']].map(([l, ph]) => (
                <div key={l} style={{ marginBottom: '24px' }}>
                  <label style={labelStyle}>{l}</label>
                  <input placeholder={ph} style={inputStyle} />
                </div>
              ))}
              <div style={{ display: 'flex', gap: '14px', marginTop: '36px' }}>
                <button type="button" onClick={() => setStep('info')} style={{ flex: 1, border: '1px solid var(--border)', padding: '16px', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', background: 'transparent', cursor: 'pointer', color: 'var(--charcoal)' }}>Back</button>
                <button type="submit" style={{ flex: 2, background: 'var(--charcoal)', color: 'var(--warm-white)', padding: '16px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', border: 'none', cursor: 'pointer' }}>
                  Place Order — ${orderTotal.toFixed(2)}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order summary */}
        <div style={{ background: 'var(--cream)', padding: '40px', height: 'fit-content', position: 'sticky', top: '110px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 300, marginBottom: '32px' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '64px', height: '80px', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--charcoal)', color: 'var(--warm-white)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>{item.quantity}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', marginBottom: '2px' }}>{item.name}</p>
                  <p style={{ fontSize: '11px', color: 'var(--stone)' }}>{item.subtitle}</p>
                </div>
                <p style={{ fontSize: '14px', flexShrink: 0 }}>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: 'var(--stone)' }}>Subtotal</span>
              <span style={{ fontSize: '13px' }}>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: 'var(--stone)' }}>Shipping</span>
              <span style={{ fontSize: '13px', color: shipping === 0 ? 'var(--gold)' : 'var(--charcoal)' }}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px' }}>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
