import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "@/router";
import { Cart } from "@/pages/cart/Cart";

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
});
export { cartRoute };
