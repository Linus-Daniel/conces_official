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


export interface Resources {
  _id: string;
  title: string;
  type: string;
  featured:boolean;
  author: string;
  date: string;
  content?:string;
  category:string;
  videoUrl?: string;
  duration?: string;
  createdAt: string |Date
  description: string;
  thumbnail: string;
  fileUrl?: string;
  tags: string[];
  views:number;
  downloads?: number;
  relatedResources?:string[];
}



export interface IEvent {
  id: string;
  title: string;
  category: 'spiritual' | 'academic' | 'career' | 'social' | string;
  branch: string;
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription: string;
  rsvps: number;
  comments: number;
  featured: boolean;
  image: string;
  registrationLink: string;
  contactEmail: string;
  contactPhone: string;
  requirements?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'branch-admin' | 'student' | 'alumni';
  branch?: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  members: number;
  admin?: User;
  status: 'active' | 'inactive';
}

export interface Prayer {
  _id: string;
  title: string;
  content: string;
  creator:{
    fullName:string;
    image?:string;
  }
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  prayedCount: number
}




export interface Products {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

export interface ShippingInfo {
  name: string;
  address: string;
  method: string;
}

export interface PaymentInfo {
  method: string;
  date: string;
  billingAddress: string;
}


export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'PAID';

interface OrderItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
}

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
  };
  items: OrderItem[];
  shippingDetails: ShippingDetails;
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
}
