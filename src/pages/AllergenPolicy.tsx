import pageHeaderBg from "@/assets/page-header-bg.png";

const AllergenPolicy = () => {
  return (
    <main>
      <section
        className="relative flex flex-col items-center justify-center bg-muted px-4 py-20"
        style={{
          backgroundImage: `url(${pageHeaderBg})`,
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-center font-heading text-4xl text-foreground sm:text-5xl">Allergen Policy</h1>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-4 py-12 text-foreground/85 sm:py-16">
        <p>
          Our cookies are baked in a kitchen that handles dairy, wheat, egg, peanuts, tree nuts, and soy. Cross-contact
          may occur.
        </p>
        <p>
          Every product page includes allergen callouts, but ingredient substitutions and seasonal recipes can change.
          Contact us before ordering if you have severe allergies.
        </p>
        <p>
          We do not guarantee an allergen-free environment. By placing an order, you acknowledge this shared-kitchen
          policy.
        </p>
      </section>
    </main>
  );
};

export default AllergenPolicy;
