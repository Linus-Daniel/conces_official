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
  id: string;
  title: string;
  type: string;
  author: string;
  date: string;
  content?:string;
  videoUrl?: string;
  duration?: string;
  description: string;
  thumbnail: string;
  fileUrl?: string;
  tags: string[];
  views:number;
  downloads?: number;
  relatedResources?:string[];
}

export type Resource = {
  id: string;
  title: string;
  type: 'devotional' | 'pdf' | 'video' | 'blog';
  category: string;
  description: string;
  content?: string; // For blog/devotional
  fileUrl?: string; // For PDF/video
  author: string;
  date: string;
  views: number;
  tags?: string[];
  featured?: boolean;
};

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




export type OrderStatus = 'placed' | 'processed' | 'shipped' | 'delivered';

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

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  progress: number;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  products: Products[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}



export interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  deliveryDate: string;
}