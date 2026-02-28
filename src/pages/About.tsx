import { Link } from "react-router-dom";
import pageHeaderBg from "@/assets/page-header-bg.png";
import logoSquare from "@/assets/logo-square.png";

const About = () => {
  return (
    <main>
      {/* Page Header */}
      <section
        className="relative bg-muted flex flex-col items-center justify-center py-20 px-4"
        style={{
          backgroundImage: `url(${pageHeaderBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <h1 className="font-heading text-foreground text-4xl sm:text-5xl mb-3">
          About
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Subheading: Craft a compelling subheading that sparks curiosity.
        </p>
      </section>

      {/* About Content */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={logoSquare}
          alt="About Little Cookie Co."
          className="rounded-lg shadow-md w-full max-w-md mx-auto"
        />
        <div>
          <h2 className="font-heading text-foreground text-3xl sm:text-4xl mb-6">
            About Heading
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            About Text: In this section, you can provide a detailed paragraph
            that delves into the history, values, and mission of your web
            development business. Highlight expertise, unique approach of your
            team, and the commitment that sets you apart.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-8">
            Emphasize your passion for creating exceptional web solutions and
            convey your dedication to delivering remarkable results for clients.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            CTA Button
          </Link>
        </div>
      </section>

      {/* Talk To Us */}
      <section className="bg-muted py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-heading text-foreground text-3xl sm:text-4xl mb-4">
            Talk To Us Heading
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-8">
            You can compose a friendly and informative paragraph that encourages
            visitors to engage with your business.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            CTA Button
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
