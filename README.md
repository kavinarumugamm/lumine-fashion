# LUMINE — Luxury Skincare Store

A fully functional luxury e-commerce store built with Next.js. Deploy it and use it as your practice environment.

---

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → Add New Project → import your repo
3. Click Deploy
4. Done — your store is live

---

## Pages

- `/` — Homepage with hero, bestsellers, brand story
- `/shop` — Full product catalogue with filters and sorting
- `/products/[slug]` — Individual product detail pages
- `/checkout` — Two-step checkout (contact → payment → confirmation)

---

## Stack

- Next.js 14
- React 18
- Vercel (deployment)
- Cart persists via localStorage
- No database, no auth, no real payments
