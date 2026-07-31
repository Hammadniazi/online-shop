import { Link } from "@tanstack/react-router";
import type { Product } from "@/types";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "react-hot-toast";
import { formatPrice, getDiscountPercentage, isDiscounted } from "@/utils/price";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success(`${product.title} added to cart!`);
  };

  const discountPercentage = getDiscountPercentage(product);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:scale-105">
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="block cursor-pointer"
        aria-label={`View details for ${product.title}`}
      >
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
          <img
            src={product.image.url || "/placeholder.svg"}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              -{discountPercentage}%
            </div>
          )}
        </div>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800  line-clamp-2">
              {product.title}{" "}
            </h3>
            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center mb-3">
                <StarRating rating={product.rating} />
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
                  {formatPrice(product.discountedPrice!)}
                </span>
                <span className="text-md text-gray-600 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
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
