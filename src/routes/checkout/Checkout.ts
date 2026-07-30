import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/router";
import { CheckoutPage } from "@/pages/checkoutPage/CheckoutPage";

export const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});
