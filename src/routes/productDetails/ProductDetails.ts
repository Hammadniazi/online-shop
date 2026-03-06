import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import { ProductDetailsPage } from "../../pages/productDetails/ProductDetailsPage";

const productDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: ProductDetailsPage,
});

export { productDetailsRoute };