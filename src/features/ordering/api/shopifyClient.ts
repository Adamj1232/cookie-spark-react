const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string | undefined;
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string | undefined;
const SHOPIFY_API_VERSION =
  (import.meta.env.VITE_SHOPIFY_API_VERSION as string | undefined) || "2025-01";

export const isShopifyConfigured = Boolean(SHOPIFY_DOMAIN && SHOPIFY_TOKEN);

const getShopifyEndpoint = () => {
  if (!SHOPIFY_DOMAIN) {
    throw new Error("Missing Shopify domain. Set VITE_SHOPIFY_STORE_DOMAIN.");
  }

  return `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
};

interface ShopifyResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export const shopifyRequest = async <T>(query: string, variables?: Record<string, unknown>) => {
  if (!isShopifyConfigured || !SHOPIFY_TOKEN) {
    throw new Error("Shopify storefront env vars are not configured.");
  }

  const response = await fetch(getShopifyEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as ShopifyResponse<T>;

  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "Shopify API returned an error.");
  }

  if (!payload.data) {
    throw new Error("Shopify API response did not include data.");
  }

  return payload.data;
};
