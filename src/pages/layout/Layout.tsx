import { Outlet } from "@tanstack/react-router";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Toaster position="top-right" />
      <Header />
      <main
        id="main-content"
        className="flex-1 max-w-7xl w-full mx-auto px-4 py-8"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
