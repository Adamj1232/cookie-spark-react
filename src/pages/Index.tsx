import { Link } from "react-router-dom";
import heroLogo from "@/assets/hero-logo.png";
import cookieStackLeft from "@/assets/cookie-stack-left.png";
import cookieStackRight from "@/assets/cookie-stack-right.png";

const VIDEO_URL =
  "https://www.littlecookieco.com/wp-content/uploads/2026/02/cookies-7.mp4";

const Index = () => {
  return (
    <main>
      {/* Hero Section – Video Background */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-cookie-pink">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-cookie-pink/30" />

        <div className="relative z-10 flex flex-col items-center gap-6 py-16 px-4">
          <img
            src={heroLogo}
            alt="Little Cookie Co. – Baked Fresh. Die Happy."
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full shadow-2xl"
          />
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Click here
          </Link>
        </div>
      </section>

      {/* Tagline */}
      <section className="bg-cookie-pink py-4">
        <p className="text-center font-heading text-primary text-lg sm:text-xl md:text-2xl tracking-wider">
          SMALL-BATCH COOKIES, BAKED TO ORDER IN ARVADA.
        </p>
      </section>

      {/* Special Orders Section */}
      <section className="relative bg-cookie-pink overflow-hidden py-16 sm:py-24">
        {/* Cookie stacks decorating the sides */}
        <img
          src={cookieStackLeft}
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute left-0 bottom-0 h-[90%] w-auto object-contain opacity-90"
        />
        <img
          src={cookieStackRight}
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute right-0 bottom-0 h-[90%] w-auto object-contain opacity-90"
        />

        <div className="relative z-10 max-w-xl mx-auto text-center px-4">
          <h2 className="font-heading text-foreground text-3xl sm:text-4xl mb-4">
            Special Orders
          </h2>
          <p className="text-foreground/80 text-base sm:text-lg mb-8">
            Can't find what you need here? Contact us to customize your order!
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
