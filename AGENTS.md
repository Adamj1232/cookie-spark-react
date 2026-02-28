# AGENTS.md

## Execution Priorities
1. Preserve the current defined color palette unless the user explicitly requests a palette change.
2. Protect ecommerce trust and edible-safety UX before visual embellishments.
3. Maintain mobile-first purchase conversion flow.
4. Keep implementation scoped to requested outcomes.

## Engineering Standards
- Reuse existing utilities/components (`cn`, shadcn primitives, existing hooks) before adding new helpers.
- Colocate feature helpers in `src/features/ordering` unless reused across multiple features.
- Avoid duplicate mapping/validation logic.
- Prefer tactical validations only:
  - Shopify env presence
  - ZIP allowlist for delivery mode
  - requested date >= 24-hour lead time
  - variant availability and quantity bounds
  - checkout URL presence

## Commerce Standards
- Shopify remains primary commerce integration.
- Maintain cart attributes for fulfillment mode, delivery ZIP, and requested date.
- Keep allergen notice visible in ordering surfaces.
- Keep legal policy links available in cart/checkout flow.

## SEO + LLM Checklist
- Update metadata, canonical, and schema when core business facts change.
- Keep sitemap and robots aligned with public routes.
- Update `public/llms.txt` and `public/llms-full.txt` when products, policies, or service area changes.
- Keep localization explicit: Arvada primary, Denver secondary.

## Pre-Release Gates
Do not mark production-ready until these are confirmed:
- Real business phone/email/address/hours finalized
- Delivery ZIP allowlist and fee/minimum policy finalized
- Final prices validated in Shopify
- Canonical domain and OG assets verified
- Terms, privacy, refund, and allergen policy text approved

## QA Requirements
- `npm run test` passes
- `npm run build` passes
- Homepage ordering section appears between Hero and Special Orders
- Non-pink ordering background adheres to current palette tokens
- Mobile sticky cart bar and cart drawer function correctly
