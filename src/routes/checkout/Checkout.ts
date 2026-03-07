import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import { CheckoutPage } from "../../pages/checkoutPage/CheckoutPage";

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});
export { checkoutRoute };
