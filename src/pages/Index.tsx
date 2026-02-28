import { Link } from "react-router-dom";
import cookieStackLeft from "@/assets/cookie-stack-left.png";
import cookieStackRight from "@/assets/cookie-stack-right.png";
import logoSquare from "@/assets/logo-square.png";
import { CookieMenuSection } from "@/features/ordering/components/CookieMenuSection";
import { LocalBusinessSchema } from "@/features/ordering/components/LocalBusinessSchema";
import { useIsMobile } from "@/hooks/use-mobile";

const VIDEO_URL =
  "https://www.littlecookieco.com/wp-content/uploads/2026/02/cookies-7.mp4";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <main>
      <LocalBusinessSchema />

      <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-cookie-pink">
        {isMobile ? (
          <img alt="Freshly baked cookies" className="absolute inset-0 h-full w-full object-cover" src={logoSquare} />
        ) : (
          <video
            autoPlay
            className="absolute inset-0 h-full w-full object-cover"
            loop
            muted
            playsInline
            poster={logoSquare}
            preload="metadata"
            src={VIDEO_URL}
          />
        )}
        <div className="absolute inset-0 bg-cookie-pink/30" />
      </section>

      <section className="bg-cookie-pink py-4">
        <p className="text-center font-heading text-lg tracking-wider text-primary sm:text-xl md:text-2xl">
          SMALL-BATCH COOKIES, BAKED TO ORDER IN ARVADA.
        </p>
      </section>

      <CookieMenuSection />

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
