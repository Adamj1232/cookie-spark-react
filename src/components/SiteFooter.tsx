import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="border-t border-cookie-brown/15 bg-cookie-cream/60 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-foreground/80 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Little Cookie Co. · Arvada, Colorado · Small-batch cookies baked to order.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="hover:text-primary" to="/allergen-policy">
            Allergen Policy
          </Link>
          <Link className="hover:text-primary" to="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-primary" to="/terms">
            Terms
          </Link>
          <Link className="hover:text-primary" to="/refunds">
            Refunds
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
