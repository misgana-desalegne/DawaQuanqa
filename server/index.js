import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import { readStripeStore, writeStripeStore } from "./stripeStore.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8787);
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
const hasUsableSecretKey = Boolean(stripeSecretKey)
  && !stripeSecretKey.includes("${")
  && stripeSecretKey.startsWith("sk_");
const stripe = hasUsableSecretKey ? new Stripe(stripeSecretKey) : null;

app.use(express.json());

async function ensureProductAndPrice() {
  if (!stripe) {
    throw new Error("Missing STRIPE_SECRET_KEY. Add it to .env.local.");
  }

  const store = await readStripeStore();

  if (store.productId && store.priceId) {
    return store;
  }

  const product = await stripe.products.create({
    name: "Example Product",
    default_price_data: {
      currency: "usd",
      unit_amount: 2000
    }
  });

  const nextStore = await writeStripeStore({
    ...store,
    productId: product.id,
    priceId: product.default_price
  });

  return nextStore;
}

app.post("/api/stripe/create-checkout-session", async (req, res) => {
  try {
    const { priceId } = await ensureProductAndPrice();
    const origin = req.headers.origin || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=cancel`
    });

    res.json({
      id: session.id,
      url: session.url
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Stripe Checkout Session";

    if (!hasUsableSecretKey) {
      return res.status(503).json({
        message: "Stripe is not configured. Set STRIPE_SECRET_KEY=sk_test_... in .env.local"
      });
    }

    if (message.toLowerCase().includes("invalid api key") || message.toLowerCase().includes("api key")) {
      return res.status(401).json({
        message: "Invalid Stripe secret key. Check STRIPE_SECRET_KEY in .env.local"
      });
    }

    res.status(500).json({ message });
  }
});

app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({
        message: "Stripe webhook unavailable: missing STRIPE_SECRET_KEY"
      });
    }

    const event = webhookSecret
      ? stripe.webhooks.constructEvent(req.body, req.headers["stripe-signature"], webhookSecret)
      : JSON.parse(req.body.toString());

    if (event.type === "checkout.session.completed") {
      const store = await readStripeStore();
      await writeStripeStore({
        ...store,
        lastCheckoutSessionCompleted: {
          id: event.data.object.id,
          created: event.created
        }
      });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Webhook signature verification failed"
    });
  }
});

app.get("/api/stripe/status", async (_req, res) => {
  const store = await readStripeStore();
  res.json({
    configured: hasUsableSecretKey,
    productId: store.productId,
    priceId: store.priceId,
    lastCheckoutSessionCompleted: store.lastCheckoutSessionCompleted
  });
});

app.listen(port, () => {
  console.log(`Stripe API server running on http://localhost:${port}`);
  if (!hasUsableSecretKey) {
    console.warn("Stripe is not fully configured. Set STRIPE_SECRET_KEY=sk_test_... in .env.local.");
  }
});
