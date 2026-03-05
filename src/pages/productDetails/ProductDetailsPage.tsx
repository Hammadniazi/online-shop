import { useParams } from "@tanstack/react-router";
import { useProductById } from "../../hooks/useProducts";
import { router } from "../../router";

export const ProductDetailsPage = () => {
  const { id } = useParams({ from: "/products/$id" });
  const { data: product, isLoading, error } = useProductById(id);

  if (isLoading) {
    return <div className="text-center py-12 text-lg">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load product details</p>
        <button
          onClick={() => router.navigate({ to: "/" })}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => router.navigate({ to: "/" })}
        className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
      >
        Back to Products
      </button>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg p-8 shadow-lg">
        <div className="flex items-center justify-center bg-gray-100 rounded-lg">
          <img
            src={product.image?.url || "https://via.placeholder.com/500"}
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
              <div className="flex text-yellow-400 mr-2">
                {"⭐".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </div>
              <span className="text-gray-600">
                ({Math.round(product.rating)})
              </span>
            </div>
          )}

          {/* price */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              {product.discountedPrice &&
              product.discountedPrice < product.price ? (
                <>
                  <span className="text-3xl font-bold text-gray-900">
                    {product.discountedPrice.toFixed(2)}nok
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {product.price.toFixed(2)}nok
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {product.price.toFixed(2)}nok
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
            {/* Add to Cart Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition-colors">
              Add to Cart
            </button>
          </div>
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
                  <p className="text-yellow-400">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
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
