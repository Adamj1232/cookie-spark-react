import { Link } from "react-router-dom";
import cookieStackLeft from "@/assets/cookie-stack-left.png";
import cookieStackRight from "@/assets/cookie-stack-right.png";
import cookieTopView from "@/assets/cookie-top-view.png";
import cookieStackHero from "@/assets/cookie-stack-hero.png";
import logoSquare from "@/assets/logo-square.png";
import { CookieMenuSection } from "@/features/ordering/components/CookieMenuSection";
import { LocalBusinessSchema } from "@/features/ordering/components/LocalBusinessSchema";

const Index = () => {
  return (
    <main>
      <LocalBusinessSchema />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-cookie-pink">

        {/* Top-left — top-view cookie, slow clockwise spin */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 overflow-hidden rounded-full animate-spin-slow
                     sm:-left-10 sm:-top-10 sm:h-48 sm:w-48
                     lg:-left-12 lg:-top-12 lg:h-60 lg:w-60"
        >
          <img
            alt=""
            className="h-full w-full scale-[1.15] object-cover object-center"
            src={cookieTopView}
          />
        </div>

        {/* Top-right — top-view cookie, slower counter-clockwise spin */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 overflow-hidden rounded-full animate-spin-slow-reverse
                     sm:-right-10 sm:-top-10 sm:h-44 sm:w-44
                     lg:-right-12 lg:-top-12 lg:h-56 lg:w-56"
        >
          <img
            alt=""
            className="h-full w-full scale-[1.15] object-cover object-center"
            src={cookieTopView}
          />
        </div>

        {/* Bottom-left — hero stack, no animation, left-anchored */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 -left-2 w-28
                     sm:w-40 md:w-52 lg:w-64"
        >
          <img
            alt=""
            className="w-full h-auto object-contain object-bottom"
            src={cookieStackHero}
          />
        </div>

        {/* Bottom-right — hero stack mirrored, no animation */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 -right-2 w-28
                     sm:w-40 md:w-52 lg:w-64"
        >
          <img
            alt=""
            className="w-full h-auto object-contain object-bottom [transform:scaleX(-1)]"
            src={cookieStackHero}
          />
        </div>

        {/* Centre logo */}
        <div className="relative z-10 animate-logo-float px-4">
          <img
            alt="Little Cookie Co. — Freshly baked in Arvada"
            className="w-44 drop-shadow-2xl sm:w-64 md:w-80 lg:w-[22rem]"
            src={logoSquare}
          />
        </div>
      </section>

      {/* ── Tagline bar ───────────────────────────────────── */}
      <section className="bg-cookie-pink py-4">
        <p className="text-center font-heading text-lg tracking-wider text-primary sm:text-xl md:text-2xl">
          SMALL-BATCH COOKIES, BAKED TO ORDER IN ARVADA.
        </p>
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
