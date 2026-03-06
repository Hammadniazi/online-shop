import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import { Contact } from "../../pages/contact/Contact";

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
export { contactRoute };
