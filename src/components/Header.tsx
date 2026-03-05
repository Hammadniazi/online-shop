import React from "react";
import { router } from "../router";

export default function Header() {
  const handleNavigation = (path: string) => {
    router.navigate({ to: path });
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
        <nav className="flex gap-6 items-center">
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
          <button
            onClick={() => handleNavigation("/cart")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Cart Icon
          </button>
        </nav>
      </div>
    </header>
  );
}
