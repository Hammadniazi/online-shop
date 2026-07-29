import { useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";

export function RouteError({ error }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <div className="text-center py-16 space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">
        Something went wrong
      </h1>
      <p className="text-gray-500">{error.message || "Please try again."}</p>
      <button
        onClick={() => router.navigate({ to: "/" })}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        Go back to home
      </button>
    </div>
  );
}
