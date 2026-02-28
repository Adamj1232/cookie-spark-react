# CLAUDE.md

## Project Mission
Build and maintain a trust-first ecommerce experience for edible cookies in Arvada, Colorado, with local context for Denver customers.

## Non-Negotiables
- Keep the existing defined color palette unless explicitly directed to change it.
- Prioritize safe, clear edible-commerce UX (allergen visibility, fulfillment clarity, secure checkout cues).
- Keep homepage ordering section between Hero and Special Orders.
- Maintain mobile-first purchasing flows with clear tap targets and friction-free cart access.
- Do not ship placeholder legal/policy links or broken checkout flows.

## Commerce Architecture
- Primary platform: Shopify Storefront API.
- Source of truth for products/pricing/availability: Shopify.
- Fallback data may be display-only when Shopify is not configured.
- Delivery must stay ZIP-limited and pickup must remain available.

## Local SEO + LLM Rules
- Keep Arvada/Denver localization in metadata, content, and structured data.
- Keep structured data factual and verifiable.
- Marketing claims like "best cookies ever made" can appear in marketing copy but not as factual schema assertions.
- Maintain `llms.txt` and `llms-full.txt` when canonical pages or core product facts change.

## Performance Rules
- Preserve mobile-first load performance.
- Prefer mobile poster image instead of autoplay video on constrained devices.
- Lazy-load non-critical media and below-the-fold assets.

## Content Guardrails
- Use concise, high-trust language.
- Keep policy references visible in cart/checkout flow.
- Keep allergen warnings visible at product and cart levels.
