import type { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error?: Error | null;
  onProductClick?: (id: string) => void;
}
export const ProductGrid = ({
  products,
  isLoading,
  error,
  onProductClick = () => {},
}: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg h-64 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="product-grid-item">
          <ProductCard
            product={product}
            onProductClick={onProductClick}
          />
        </div>
      ))}
    </div>
  );
};
