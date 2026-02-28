import pageHeaderBg from "@/assets/page-header-bg.png";

const Refunds = () => {
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
        <h1 className="text-center font-heading text-4xl text-foreground sm:text-5xl">Refund & Cancellation Policy</h1>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-4 py-12 text-foreground/85 sm:py-16">
        <p>
          Because cookies are made to order, cancellations are accepted up to 24 hours before your requested pickup or
          delivery date.
        </p>
        <p>
          If there is an issue with your order quality or accuracy, contact us within 24 hours of fulfillment so we can
          make it right.
        </p>
        <p>
          Approved refunds are returned to the original payment method according to your card issuer processing times.
        </p>
      </section>
    </main>
  );
};

export default Refunds;
