import { Link, useParams } from "@tanstack/react-router";
import { useProductById } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { formatPrice, isDiscounted } from "@/utils/price";
import { StarRating } from "@/components/StarRating";
import { QuantityStepper } from "@/components/QuantityStepper";
import { CheckIcon } from "@/components/icons";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export const ProductDetailsPage = () => {
  const { id } = useParams({ from: "/products/$id" });
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { data: product, isLoading, error } = useProductById(id);
  const addItem = useCartStore((state) => state.addItem);

  useDocumentTitle(product?.title);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg p-8 shadow-lg">
        <div className="bg-gray-200 rounded-lg h-80 animate-pulse" />
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          </div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load product details</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  return (
    <div className="space-y-8">
      <Link
        to="/"
        className="inline-block text-blue-600 hover:text-blue-800 font-semibold mb-4"
      >
        Back to Products
      </Link>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg p-8 shadow-lg">
        <div className="flex items-center justify-center bg-gray-100 rounded-lg">
          <img
            src={product.image?.url || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Details */}

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          {product.rating > 0 && (
            <div className="flex items-center">
              <StarRating rating={product.rating} className="mr-2" />
              <span className="text-gray-600">
                ({Math.round(product.rating)})
              </span>
            </div>
          )}

          {/* price */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              {isDiscounted(product) ? (
                <>
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.discountedPrice!)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">
              Quantity:
            </span>
            <QuantityStepper
              quantity={quantity}
              onChange={(q) => {
                setQuantity(q);
                setAddedToCart(false);
              }}
              ariaLabel="Quantity"
            />
          </div>
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors text-white flex items-center justify-center gap-2 ${
              addedToCart ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {addedToCart && <CheckIcon className="w-5 h-5" />}
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">
                    {review.username || "Anonymous"}
                  </p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-700">{review.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
