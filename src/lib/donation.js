const stripePublishableKey = (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "").trim();

export function hasStripePublishableKey() {
  return Boolean(stripePublishableKey);
}

export async function startStripeDonation() {
  const popup = globalThis.open("", "stripe-checkout", "popup,width=520,height=760");

  if (!popup) {
    return false;
  }

  try {
    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      let errorMessage = "Could not start Stripe checkout.";

      try {
        const payload = await response.json();
        if (payload?.message) {
          errorMessage = payload.message;
        }
      } catch {
        // Keep default message when response has no JSON body.
      }

      popup.close();
      globalThis.alert(errorMessage);
      return false;
    }

    const payload = await response.json();

    if (!payload?.url) {
      popup.close();
      return false;
    }

    popup.location.assign(payload.url);
    return true;
  } catch {
    popup.close();
    return false;
  }
}
