import { createRouter, createRootRoute } from "@tanstack/react-router";
import { homeRoute } from "./routes/home/homeRoute";
import Layout from "./pages/layout/Layout";
import NotFound from "./pages/notFound/NotFound";
import { productDetailsRoute } from "./routes/productDetails/ProductDetails";
import { contactRoute } from "./routes/contact/Contact";
import { cartRoute } from "./routes/cart/Cart";
import { checkoutRoute } from "./routes/checkout/Checkout";
import { checkoutSuccess } from "./routes/checkoutSuccess/CheckoutSuccess";
export const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
});
const routeTree = rootRoute.addChildren([
  homeRoute,
  productDetailsRoute,
  contactRoute,
  cartRoute,
  checkoutRoute,
  checkoutSuccess,
]);
export const router = createRouter({ routeTree });
