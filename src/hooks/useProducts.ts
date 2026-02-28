import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";
import { productService } from "../services/api";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: [`products`],
    queryFn: productService.getProduct,
  });
};
