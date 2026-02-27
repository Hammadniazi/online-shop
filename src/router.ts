import { createRouter, createRootRoute } from "@tanstack/react-router";
import { homeRoute } from "./routes/home/homeRoute";
import Layout from "./pages/layout/Layout";
export const rootRoute = createRootRoute({
  component: Layout,
});
const routeTree = rootRoute.addChildren([homeRoute]);
export const router = createRouter({ routeTree });
