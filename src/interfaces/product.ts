export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating?: number; // Optional rating (e.g., 1-5 stars)
  discount?: string; // e.g., "20% avslag"
}
