import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>Online Shop</div>
        <nav className="flex gap-6 items-center">
          <button>Home</button>
          <button>Cart</button>
          <button>Contact</button>
          <button>Cart Icon</button>
        </nav>
      </div>
    </header>
  );
}
