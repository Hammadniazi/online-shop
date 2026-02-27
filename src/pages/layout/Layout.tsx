import { Outlet } from "@tanstack/react-router";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
