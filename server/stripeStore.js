import fs from "node:fs/promises";
import path from "node:path";

const storePath = path.resolve(process.cwd(), "server", "stripe-store.json");

const defaultStore = {
  productId: null,
  priceId: null,
  lastCheckoutSessionCompleted: null
};

export async function readStripeStore() {
  try {
    const content = await fs.readFile(storePath, "utf8");
    const parsed = JSON.parse(content);
    return {
      ...defaultStore,
      ...parsed
    };
  } catch {
    return { ...defaultStore };
  }
}

export async function writeStripeStore(nextStore) {
  const merged = {
    ...defaultStore,
    ...nextStore
  };

  await fs.writeFile(storePath, JSON.stringify(merged, null, 2), "utf8");
  return merged;
}
