import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import { CheckoutSuccess } from "../../pages/checkoutSuccess/CheckoutSuccess";

const checkoutSuccess = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout-success",
  component: CheckoutSuccess,
});
export { checkoutSuccess };
