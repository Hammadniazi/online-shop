import { useRouter } from "@tanstack/react-router";
import { useCartStore } from "@/stores/cartStore";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const router = useRouter();
  const itemCount = useCartStore((state) => state.getItemCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLButtonElement>(null);

  const handleNavigation = (path: string) => {
    router.navigate({ to: path });
    setIsMenuOpen(false);
  };

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
        <button
          onClick={() => handleNavigation("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          aria-label="Go to home page"
        >
          Online Shop
        </button>
        {/* Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <button
            onClick={() => handleNavigation("/")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/cart")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Cart
          </button>
          <button
            onClick={() => handleNavigation("/contact")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Contact
          </button>
          <div className="relative">
            <button
              onClick={() => handleNavigation("/cart")}
              className="relative text-gray-700 hover:text-blue-600 transition-colors"
              aria-label={`View cart, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
            >
              🛒
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" aria-hidden="true">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
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
          <button
            ref={firstMenuLinkRef}
            onClick={() => handleNavigation("/")}
            className="text-gray-700 hover:text-blue-600 text-left"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/cart")}
            className="text-gray-700 hover:text-blue-600 text-left"
          >
            Cart ({itemCount})
          </button>
          <button
            onClick={() => handleNavigation("/contact")}
            className="text-gray-700 hover:text-blue-600 text-left"
          >
            Contact
          </button>
        </nav>
      )}
    </header>
  );
}
