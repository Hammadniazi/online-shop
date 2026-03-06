import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import NotFound from "../../pages/notFound/NotFound";

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

export { notFoundRoute };
