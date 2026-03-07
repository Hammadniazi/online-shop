import { useRouter } from "@tanstack/react-router";
import { useCartStore } from "../stores/cartStore";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const itemCount = useCartStore((state) => state.getItemCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleNavigation = (path: string) => {
    router.navigate({ to: path });
    setIsMenuOpen(false);
  };
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => handleNavigation("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          Online Shop
        </div>
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
            >
              🛒
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-100 px-4 py-4 flex flex-col gap-4">
          <button
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
