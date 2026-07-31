import { Link } from "@tanstack/react-router";
import { useCartStore } from "@/stores/cartStore";
import { useEffect, useRef, useState } from "react";
import { CartIcon, CloseIcon, MenuIcon } from "@/components/icons";

const navLinkClass =
  "text-gray-700 hover:text-blue-600 transition-colors";
const activeNavLinkClass = "text-blue-600 font-semibold";

export default function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    firstMenuLinkRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
          aria-label="Go to home page"
        >
          Online Shop
        </Link>
        {/* Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className={navLinkClass}
            activeProps={{ className: `${navLinkClass} ${activeNavLinkClass}` }}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className={navLinkClass}
            activeProps={{ className: `${navLinkClass} ${activeNavLinkClass}` }}
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className={`relative ${navLinkClass}`}
            activeProps={{ className: `relative ${navLinkClass} ${activeNavLinkClass}` }}
            aria-label={`View cart, ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
          >
            <CartIcon />
            {itemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                aria-hidden="true"
              >
                {itemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="mobile-menu-backdrop md:hidden fixed inset-0 top-[64px] bg-black/40 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mobile-menu-panel md:hidden bg-gray-100 px-4 py-4 flex flex-col gap-4 relative z-50">
          <Link
            ref={firstMenuLinkRef}
            to="/"
            activeOptions={{ exact: true }}
            onClick={closeMenu}
            className={`${navLinkClass} text-left`}
            activeProps={{ className: `${navLinkClass} ${activeNavLinkClass} text-left` }}
          >
            Home
          </Link>
          <Link
            to="/cart"
            onClick={closeMenu}
            className={`${navLinkClass} text-left`}
            activeProps={{ className: `${navLinkClass} ${activeNavLinkClass} text-left` }}
          >
            Cart ({itemCount})
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className={`${navLinkClass} text-left`}
            activeProps={{ className: `${navLinkClass} ${activeNavLinkClass} text-left` }}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
