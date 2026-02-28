import pageHeaderBg from "@/assets/page-header-bg.png";

const Terms = () => {
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
        <h1 className="text-center font-heading text-4xl text-foreground sm:text-5xl">Terms of Service</h1>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-4 py-12 text-foreground/85 sm:py-16">
        <p>
          Orders are considered confirmed once checkout is completed and payment authorization is approved by the
          payment provider.
        </p>
        <p>
          Pickup and delivery windows are estimates. Customers are responsible for providing accurate contact and
          fulfillment details during checkout.
        </p>
        <p>
          Product availability may change due to ingredient supply or demand. If we cannot fulfill your selected item,
          we will contact you with options.
        </p>
      </section>
    </main>
  );
};

export default Terms;
