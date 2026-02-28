import { BUSINESS_PROFILE, FALLBACK_MENU_ITEMS } from "@/features/ordering/config";

export const LocalBusinessSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://littlecookieco.com";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Bakery",
        "@id": `${siteUrl}#bakery`,
        name: BUSINESS_PROFILE.name,
        image: `${siteUrl}/favicon.ico`,
        address: {
          "@type": "PostalAddress",
          addressLocality: BUSINESS_PROFILE.city,
          addressRegion: BUSINESS_PROFILE.state,
          postalCode: BUSINESS_PROFILE.postalCode,
          addressCountry: "US",
        },
        areaServed: BUSINESS_PROFILE.serviceArea,
        telephone: BUSINESS_PROFILE.phone,
        email: BUSINESS_PROFILE.email,
        servesCuisine: "Dessert",
        priceRange: "$$",
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}#cookie-menu`,
        name: "Little Cookie Co. Signature Cookie Menu",
        itemListElement: FALLBACK_MENU_ITEMS.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: item.title,
            description: item.description,
            offers: item.variants.map((variant) => ({
              "@type": "Offer",
              priceCurrency: "USD",
              price: variant.price,
              availability: "https://schema.org/InStock",
            })),
          },
        })),
      },
    ],
  };

  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
};
