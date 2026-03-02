import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  //   Calculate discount percentage
  const discountPercentage = product.discountedPrice
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100,
      )
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        <img
          src={
            product.image.url ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.title}{" "}
        </h3>
      </div>
    </div>
  );
}
