import type { Product } from "../interfaces/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 transform hover:scale-105 transition-transform duration-200">
      {/* Product Image Section with Discount Badge */}
      <div className="relative">
        <img
          className="w-full h-56 object-cover"
          src={product.imageUrl}
          alt={product.name}
        />
        {product.discount && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 m-2 rounded-full">
            {product.discount}
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">
          {product.name}
        </div>
        <p className="text-gray-700 text-base">
          {/* Placeholder for description or other details */}
          En kort beskrivelse av produktet her. Dette produktet er av høy
          kvalitet...
        </p>
      </div>

      {/* Price and Rating Section */}
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="text-2xl font-bold text-green-600">
          {product.price} NOK
        </span>
        {product.rating && (
          <div className="flex items-center">
            {/* Simple star rating display */}
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < product.rating! ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 
1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.387 2.46a1 1 0 00-.364 1.118l1.287 3.973c.3.921-
.755 1.688-1.54 1.118l-3.387-2.46a1 1 0 00-1.175 0l-3.387 2.46c-.784.57-1.838-.197-1.539-
1.118l1.287-3.973a1 1 0 00-.364-1.118L2.23 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-
.69L9.049 2.927z"
                />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating})
            </span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="px-6 py-4">
        <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Legg i handlekurv
        </button>
      </div>
    </div>
  );
}
