import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import cookieIcon from "@/assets/cookie-icon.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={cookieIcon} alt="Little Cookie Co." className="h-10 w-10" />
            <span className="font-heading text-primary text-lg tracking-wide">
              LITTLE COOKIE CO.
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="border-2 border-primary text-primary font-bold text-sm uppercase tracking-wide px-5 py-2 rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-bold uppercase tracking-wide py-2 transition-colors hover:text-primary ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center border-2 border-primary text-primary font-bold text-sm uppercase tracking-wide px-5 py-2 rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
