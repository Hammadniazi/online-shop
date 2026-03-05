import { useProducts } from "../../hooks/useProducts";
import { ProductGrid } from "../../components/ProductGrid";
import { SearchBar } from "../../components/SearchBar";
import { useRouter } from "@tanstack/react-router";

export default function Home() {
  const router = useRouter();
  const { data: products = [], isLoading, error } = useProducts();
  const handleProductclick = (id: string) => {
    router.navigate({ to: `/products/${id}` });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Online Shop</h1>
        <p className="text-lg">Discover amazing products at great prices</p>
      </div>
      <div className="flex justify-center">
        <SearchBar />
      </div>
      {/* Product Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <ProductGrid
          products={products}
          isLoading={isLoading}
          error={error}
          onProductClick={(id) => handleProductclick(id)}
        />
      </div>
    </div>
  );
}
