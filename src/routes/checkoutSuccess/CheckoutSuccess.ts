import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import { CheckoutSuccess } from "../../pages/cheakoutSuccess/CheckoutSuccess";

const checkoutSuccess = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout-success",
  component: CheckoutSuccess,
});
export { checkoutSuccess };
