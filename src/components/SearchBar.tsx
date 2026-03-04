import { useState } from "react";
import type { Product } from "../types";
import { useSearchProducts } from "../hooks/useProducts";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { data: result = [], isLoading } = useSearchProducts(searchQuery);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search products ..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowResults(e.target.value.length > 0);
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      {/* Search Result */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : result.length > 0 ? (
            <ul>
              {result.map((product) => (
                <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 flex items-center gap-3">
                  <img
                    src={product.image.url || "https://via.placeholder.com/50"}
                    alt={product.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                      {product.title}{" "}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.price.toFixed(2)}{" "}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No Products Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
