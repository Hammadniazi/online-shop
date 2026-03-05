export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  discountedPrice?: number;
  discountPercentage?: number;
  discountedPercentage?: number;
  image: {
    url: string;
  };
  tags?: string[];
  reviews?: Review[];
}
export interface Review {
  rating: number;
  description: string;
  username?: string;
}
