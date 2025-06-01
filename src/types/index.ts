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


import { IconType } from 'react-icons';

export interface Category {
  name: string;
  count: number;
  icon: IconType;
  bgColor: string;
  iconColor: string;
}
