import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/features/ordering/components/ProductCard";
import { useCookieMenuProducts } from "@/features/ordering/hooks/useCookieMenuProducts";

const TRUST_POINTS = [
  "Baked to order in Arvada",
  "24-hour prep window",
  "Pickup + local delivery",
  "Secure Shopify checkout",
];

export const CookieMenuSection = () => {
  const { data, isLoading, isError } = useCookieMenuProducts();

  return (
    <section className="scroll-mt-24 bg-cookie-cream py-16 sm:py-20" id="order-cookies">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Order Online</p>
          <h2 className="mt-3 font-heading text-3xl text-cookie-brown sm:text-4xl">Choose Your Cookie Box</h2>
          <p className="mt-3 text-sm text-foreground/75 sm:text-base">
            Build your order with our signature lineup and seasonal favorites. Fresh batches are prepared for pickup
            or local delivery in select Arvada and Denver ZIP codes.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {TRUST_POINTS.map((point) => (
            <Badge className="border-cookie-brown/20 bg-white px-3 py-1 text-cookie-brown" key={point} variant="outline">
              {point}
            </Badge>
          ))}
        </div>

        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="h-96 animate-pulse rounded-lg border border-cookie-brown/15 bg-white" key={index} />
            ))}
          </div>
        ) : null}

        {isError ? (
          <div className="mx-auto mt-10 max-w-xl rounded-lg border border-dashed border-cookie-brown/30 bg-white p-6 text-center">
            <p className="text-base font-semibold text-cookie-brown">Ordering is temporarily unavailable.</p>
            <p className="mt-2 text-sm text-foreground/75">
              Please try again shortly, or reach out directly for a custom order and we’ll respond quickly.
            </p>
            <Link
              className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground"
              to="/contact"
            >
              Contact for special order
            </Link>
          </div>
        ) : null}

        {!isLoading && !isError ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
