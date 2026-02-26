import "./index.css"; // Import Tailwind CSS styles
import { ProductCard } from "./components/ProductCard";
import type { Product } from "./interfaces/product";

function App() {
  const placeholderImageUrl =
    "https://via.placeholder.com/400x300.png/007bff/fff?text=Produktbilde";
  // Example: ../images/styling-tailwind/product-card-placeholder.png

  const sampleProducts: Product[] = [
    {
      id: "1",
      name: "Norsk Ullgenser",
      imageUrl: placeholderImageUrl,
      price: 899,
      rating: 5,
      discount: "15% avslag",
    },
    {
      id: "2",
      name: 'Tursko "Fjellvandrer"',
      imageUrl: placeholderImageUrl.replace("Produktbilde", "Tursko"),
      price: 1499,
      rating: 4,
    },
    {
      id: "3",
      name: 'Kaffekopp "Morgenstund"',
      imageUrl: placeholderImageUrl.replace("Produktbilde", "Kaffekopp"),
      price: 199,
    },
  ];
  return (
    <>
      <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Våre Utvalgte Produkter
        </h1>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
