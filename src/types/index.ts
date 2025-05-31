export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  images?:string[]
  reviews: number;
  slug: string;
};
