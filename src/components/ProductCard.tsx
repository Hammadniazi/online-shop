import type { Product } from "../types";
import { useCartStore } from "../stores/cartStore";
import { toast } from "react-hot-toast";
import { getDiscountPercentage, isDiscounted } from "../utils/price";

interface ProductCardProps {
  product: Product;
  onProductClick: (id: string) => void;
}

export default function ProductCard({
  product,
  onProductClick,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.title} added to cart!`);
  };

  const discountPercentage = getDiscountPercentage(product);

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2 hover:scale-105"
      onClick={() => onProductClick(product.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onProductClick(product.id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.title}`}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
        <img
          src={
            product.image.url ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800  line-clamp-2">
            {product.title}{" "}
          </h3>
          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {"⭐".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                ({Math.round(product.rating)})
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          {isDiscounted(product) ? (
            <>
              <span className="text-lg font-bold text-green-600">
                {product.discountedPrice!.toFixed(2)}nok
              </span>
              <span className="text-md text-gray-600 line-through">
                {product.price.toFixed(2)}nok
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              {product.price.toFixed(2)}nok
            </span>
          )}
        </div>
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
