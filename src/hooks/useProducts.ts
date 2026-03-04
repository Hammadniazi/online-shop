import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";
import { productService } from "../services/api";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: [`products`],
    queryFn: productService.getProduct,
  });
};
export const useSearchProducts = (query: string) => {
  return useQuery<Product[]>({
    queryKey: ["product", "search", query],
    queryFn: () => productService.searchProducts(query),
  });
};
