import pageHeaderBg from "@/assets/page-header-bg.png";

const Privacy = () => {
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
        <h1 className="text-center font-heading text-4xl text-foreground sm:text-5xl">Privacy Policy</h1>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-4 py-12 text-foreground/85 sm:py-16">
        <p>
          We collect contact and order details needed to fulfill cookie orders, coordinate pickup or delivery, and
          respond to customer support requests.
        </p>
        <p>
          Payments are processed securely through Shopify checkout and supported wallets. Card numbers are not stored on
          this website.
        </p>
        <p>
          We use basic analytics to understand site performance and checkout conversion. For data access or deletion
          requests, contact us directly.
        </p>
      </section>
    </main>
  );
};

export default Privacy;
