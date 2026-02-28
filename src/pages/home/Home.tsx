import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";

export default function Home() {
  const { data: products = [], isLoading, error } = useProducts();

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Online Shop</h1>
        <p className="text-lg">Discover amazing products at great prices</p>
      </div>
      <div>{/* <SearchBar/> */}</div>
      <div>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        {isLoading && <p className="text-center">Loading products...</p>}
        {error && (
          <p className="text-center text-red-600">Error loading products</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(products) && products.length > 0
            ? products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : !isLoading && (
                <p className="text-center text-gray-600">No products found</p>
              )}
        </div>
      </div>
    </div>
  );
}
