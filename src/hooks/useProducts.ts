import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { Product } from "@/types";
import { productService } from "@/services/api";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });
};

export const useProductById = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
};

export const useSearchProducts = (query: string) => {
  const { data: products = [], isLoading, error } = useProducts();
  const filteredProducts = useMemo(() => {
    if (!query.trim()) {
      return products;
    }
    return products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [products, query]);
  return {
    data: filteredProducts,
    isLoading,
    error,
  };
};
