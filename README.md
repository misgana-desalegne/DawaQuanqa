# Duoling Lite (React)

Lightweight Duolingo-style learning app with:
- Native language: Amharic
- Teaching languages: English and French
- Easy extension model for adding more languages later

## Run

```bash
npm install
npm run dev
```

This starts both:
- Vite app (frontend)
- Stripe API server on `http://localhost:8787`

## Build

```bash
npm run build
```

## Stripe Donate Setup (Checkout Session)

1. Get these keys from Stripe Dashboard:
- Publishable key
- Secret key

2. Create `.env.local` in project root:

```bash
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
VITE_STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
STRIPE_WEBHOOK_SECRET=
PORT=8787
```

3. Restart dev servers: `npm run dev`

### What is implemented

- Product is created automatically with blueprint pricing:
	- `name`: `Example Product`
	- `currency`: `usd`
	- `unit_amount`: `2000`
- Product and price IDs are persisted in `server/stripe-store.json`
- Checkout Session is created for one-time payment (`mode: payment`)
- Checkout completion webhook is handled at `POST /api/stripe/webhook`

### Webhook testing (local)

```bash
stripe listen --forward-to localhost:8787/api/stripe/webhook
```

## Add a new teaching language

1. Add the language in `src/data/languages.js`.
2. Add the course in `src/data/courses.js` using a matching language code.
3. Include lessons and questions under the new course key.
