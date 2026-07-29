import { useEffect, useRef, useState } from "react";
import type { Product } from "../types";
import { useSearchProducts } from "../hooks/useProducts";
import { router } from "../router";
import { formatPrice } from "../utils/price";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { data: result = [], isLoading } = useSearchProducts(searchQuery);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = (product: Product) => {
    router.navigate({ to: "/products/$id", params: { id: product.id } });
    setSearchQuery("");
    setShowResults(false);
    setActiveIndex(-1);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults || result.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % result.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? result.length - 1 : prev - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelectProduct(result[activeIndex]);
    } else if (e.key === "Escape") {
      setShowResults(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <input
        type="text"
        placeholder="Search products ..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowResults(e.target.value.length > 0);
          setActiveIndex(-1);
        }}
        onKeyDown={handleInputKeyDown}
        onFocus={() => setShowResults(searchQuery.length > 0)}
        role="combobox"
        aria-expanded={showResults}
        aria-controls="search-results-listbox"
        aria-activedescendant={
          activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      {/* Search Result */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : result.length > 0 ? (
            <ul id="search-results-listbox" role="listbox">
              {result.map((product, index) => (
                <li
                  key={product.id}
                  id={`search-option-${index}`}
                  onClick={() => handleSelectProduct(product)}
                  onMouseEnter={() => setActiveIndex(index)}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`px-4 py-3 cursor-pointer border-b last:border-b-0 flex items-center gap-3 ${
                    index === activeIndex ? "bg-gray-100" : "hover:bg-gray-100"
                  }`}
                >
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
                      {formatPrice(product.price)}{" "}
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
