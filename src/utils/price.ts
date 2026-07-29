import type { Product } from "../types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NOK",
});

export const formatPrice = (amount: number) => currencyFormatter.format(amount);

export const getDisplayPrice = (product: Pick<Product, "price" | "discountedPrice">) =>
  product.discountedPrice && product.discountedPrice < product.price
    ? product.discountedPrice
    : product.price;

export const isDiscounted = (product: Pick<Product, "price" | "discountedPrice">) =>
  Boolean(product.discountedPrice && product.discountedPrice < product.price);

export const getDiscountPercentage = (product: Pick<Product, "price" | "discountedPrice">) =>
  isDiscounted(product)
    ? Math.round(((product.price - product.discountedPrice!) / product.price) * 100)
    : 0;
