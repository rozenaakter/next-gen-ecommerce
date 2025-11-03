export interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  stock: number;
  sku: string;
  category?: string;
}