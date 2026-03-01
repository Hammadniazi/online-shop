import { createRouter, createRootRoute } from "@tanstack/react-router";
import { homeRoute } from "./routes/home/homeRoute";
import Layout from "./pages/layout/Layout";
import NotFound from "./pages/notFound/NotFound";
export const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
});
const routeTree = rootRoute.addChildren([homeRoute]);
export const router = createRouter({ routeTree });
