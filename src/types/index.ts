export interface Product {
  id: number;
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
}
