import { Link } from "react-router-dom";
import cookieStackLeft from "@/assets/cookie-stack-left.png";
import cookieStackRight from "@/assets/cookie-stack-right.png";
import cookieMascot from "@/assets/cookie-icon.png";
import { CookieMenuSection } from "@/features/ordering/components/CookieMenuSection";
import { LocalBusinessSchema } from "@/features/ordering/components/LocalBusinessSchema";

const Index = () => {
  return (
    <main>
      <LocalBusinessSchema />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gingham w-full overflow-hidden">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:items-center sm:gap-6 sm:py-12 md:gap-10 md:py-14 lg:gap-14 lg:py-16">

          {/* Mascot */}
          <div className="w-36 flex-shrink-0 sm:w-44 md:w-52 lg:w-60">
            <img
              alt="Little Cookie Co. mascot"
              className="h-auto w-full drop-shadow-lg"
              src={cookieMascot}
            />
          </div>

          {/* Text block */}
          <div className="min-w-0 text-center sm:text-left">
            <h1 className="font-heading leading-none tracking-tight text-primary
                           text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl">
              LITTLE COOKIE CO.
            </h1>
            <p className="mt-1 font-heading text-primary
                          text-lg sm:text-xl md:text-2xl lg:text-3xl">
              BAKED FRESH. SERVED HAPPY
            </p>
            <p className="mt-2 font-heading tracking-widest text-primary/75
                          text-xs sm:text-sm md:text-sm lg:text-base">
              SMALL BATCH COOKIES, BAKED TO ORDER IN ARVADA
            </p>
          </div>

        </div>
      </section>

      <CookieMenuSection />

      {/* ── Special Orders ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cookie-pink py-16 sm:py-24">
        <img
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 hidden h-[90%] w-auto object-contain opacity-90 lg:block"
          loading="lazy"
          src={cookieStackLeft}
        />
        <img
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 hidden h-[90%] w-auto object-contain opacity-90 lg:block"
          loading="lazy"
          src={cookieStackRight}
        />

        <div className="relative z-10 mx-auto max-w-xl px-4 text-center">
          <h2 className="mb-4 text-3xl text-foreground sm:text-4xl">Special Orders</h2>
          <p className="mb-8 text-base text-foreground/80 sm:text-lg">
            Need a larger batch or custom cookie request? Send us your details and we&apos;ll confirm options quickly.
          </p>
          <Link
            className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg transition-transform hover:scale-105"
            to="/contact"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
