import { Link } from "@tanstack/react-router";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page Not Found");
  return (
    <div className="text-center py-16 space-y-6">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-2xl text-gray-600">Page not found</p>
      <p className="text-gray-500 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        Go back to home
      </Link>
    </div>
  );
}
