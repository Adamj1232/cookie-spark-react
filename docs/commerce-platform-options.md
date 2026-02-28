# Commerce Platform Options

## Primary Path: Shopify Headless (Implemented)
- Product, variant, and inventory data from Shopify Storefront API.
- Cart and checkout handled via Shopify cart mutations and hosted checkout URL.
- Strong trust signals for food ecommerce: secure checkout, wallet support, robust fulfillment metadata.

## Secondary Path: Snipcart + Stripe (Fallback Option)
- Faster embed path with lower integration depth.
- Would require replacing Shopify cart API layer with Snipcart SDK events and product definitions.
- Tradeoff: less native operational depth for delivery rules and catalog workflows.

## Why Shopify is active
- Better long-term fit for localized edible-commerce operations.
- Supports fulfillment metadata and growth without custom backend complexity.
