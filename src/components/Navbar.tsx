import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import logoCircle from "@/assets/logo-circle.png";
import { Button } from "@/components/ui/button";
import { useOrdering } from "@/features/ordering/context/OrderingProvider";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cartModel, setCartOpen } = useOrdering();

  const links = [
    { label: "Home", to: "/" },
    { label: "Order", to: "/#order-cookies", isAnchor: true },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link className="flex items-center" to="/">
            <img alt="Little Cookie Co." className="h-12 w-12" src={logoCircle} />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) =>
              link.isAnchor ? (
                <a
                  className="text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
                  href={link.to}
                  key={link.to}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary ${
                    location.pathname === link.to ? "text-primary" : "text-foreground"
                  }`}
                  key={link.to}
                  to={link.to}
                >
                  {link.label}
                </Link>
              ),
            )}

            <Button className="rounded-full" onClick={() => setCartOpen(true)} variant="outline">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Cart ({cartModel.cart.totalQuantity})
            </Button>
          </div>

          <button
            aria-label="Toggle menu"
            className="text-foreground md:hidden"
            onClick={() => setMobileOpen((previous) => !previous)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="space-y-2 border-t border-border bg-background px-4 pb-4 md:hidden">
          {links.map((link) =>
            link.isAnchor ? (
              <a
                className="block py-2 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
                href={link.to}
                key={link.to}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                className={`block py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-foreground"
                }`}
                key={link.to}
                onClick={() => setMobileOpen(false)}
                to={link.to}
              >
                {link.label}
              </Link>
            ),
          )}

          <Button
            className="mt-2 w-full rounded-full"
            onClick={() => {
              setMobileOpen(false);
              setCartOpen(true);
            }}
            variant="outline"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Cart ({cartModel.cart.totalQuantity})
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
