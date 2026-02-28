import { Link } from "react-router-dom";
import pageHeaderBg from "@/assets/page-header-bg.png";
import logoSquare from "@/assets/logo-square.png";

const About = () => {
  return (
    <main>
      <section
        className="relative flex flex-col items-center justify-center bg-muted px-4 py-20"
        style={{
          backgroundImage: `url(${pageHeaderBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <h1 className="mb-3 text-4xl text-foreground sm:text-5xl">About Little Cookie Co.</h1>
        <p className="max-w-2xl text-center text-base text-foreground/80 sm:text-lg">
          Premium small-batch cookies baked to order in Arvada, Colorado.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 md:grid-cols-2">
        <img alt="Little Cookie Co. logo" className="mx-auto w-full max-w-md rounded-lg shadow-md" src={logoSquare} />
        <div>
          <h2 className="mb-6 text-3xl text-foreground sm:text-4xl">Freshness and consistency first</h2>
          <p className="mb-4 leading-relaxed text-foreground/80">
            We focus on a tight lineup of cookies we can execute at a high standard every single bake. Each order is
            prepared in small batches so texture, flavor, and finish are consistent from first bite to last.
          </p>
          <p className="mb-8 leading-relaxed text-foreground/80">
            Our core menu includes Chocolate Chip, Chocolate Chocolate, Peanut Butter, and Oatmeal, with seasonal
            flavors rotating throughout the year. Pickup is based in Arvada with local delivery in select ZIP codes.
          </p>
          <a
            className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg transition-transform hover:scale-105"
            href="/#order-cookies"
          >
            Order Cookies
          </a>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl text-foreground sm:text-4xl">Need a custom order?</h2>
          <p className="mb-8 leading-relaxed text-foreground/80">
            For events and special requests, send us your details and we’ll confirm availability, timeline, and pickup
            or delivery options.
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

export default About;
