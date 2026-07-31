import { useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchBar } from "@/components/SearchBar";
import { TagFilter } from "@/components/TagFilter";

export default function Home() {
  useDocumentTitle();
  const { data: products = [], isLoading, error } = useProducts();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    products.forEach((product) => product.tags?.forEach((tag) => tagSet.add(tag)));
    return [...tagSet].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedTags.length === 0) return products;
    return products.filter((product) =>
      product.tags?.some((tag) => selectedTags.includes(tag)),
    );
  }, [products, selectedTags]);

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <TagFilter
            tags={allTags}
            selectedTags={selectedTags}
            onToggleTag={handleToggleTag}
            onClear={() => setSelectedTags([])}
          />
        </div>
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
