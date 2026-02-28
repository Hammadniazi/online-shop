import React from "react";
import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 hover:shadow-xl transition-shadow">
      <h2 className="font-bold text-lg mb-2">{product.title}</h2>
      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
      <p className="text-xl font-bold text-green-600">${product.price}</p>
    </div>
  );
}
