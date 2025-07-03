
  import { Book, Calendar, Cog, Folder, Gauge, GraduationCap, Lightbulb, Package, Receipt, ShoppingBag, ShoppingCart, User, Users } from "lucide-react";
import { JSX } from "react";
import { Product } from "./types";

type ProductVariant = {
  name: string;
  options: {
    value: string;
    label?: string;
    stock?: number;
    priceAdjustment?: number;
    image?: string;
  }[];
};

type Products = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock?: number;
  variants?: ProductVariant[];
  rating?: number;
  reviews?: number;
  isBestSeller?: boolean;
  discountPercentage?: number;
};




  interface SidebarLink {
    name:string;
    href:string;
    icon:JSX.ElementType;
    dropdown?:{
      name:string;
      href:string;
      icon:JSX.ElementType;
    }[]
  }

export const sidebarLinks: SidebarLink[] = [
    {
      name: 'Dashboard Overview',
      href: '/branch',
      icon: Gauge,
    },
    {
      name: 'Manage Members',
      href: '/branch/members',
      icon: Users,
    },
    {
      name: 'Events',
      href: '/branch/events',
      icon: Calendar,
    },
    {
      name: 'Mentorship',
      href: '/branch/mentorship',
      icon: User, // using FontAwesome faHandsHelping
    },
    {
      name: 'Resources Hub',
      href: '/branch/resources',
      icon: Folder,
    },
    {
      name: 'Alumni',
      href: '/branch/alumni',
      icon: GraduationCap,
    },
    {
      name: 'Store',
      href:"",
      icon: ShoppingCart,
      dropdown: [
        { name: 'Products', href: '/branch/store/products', icon: Package },
        { name: 'Orders', href: '/branch/store/orders', icon: Receipt },
      ],
    },
    
    {
      name: 'Settings & Profile',
      href: '/branch/settings',
      icon: Cog,
    },
 
  ];
  

  // @/constant/index.ts


export const product: Products[] = [
  {
    id: 1,
    name: "Classic CONCES T-Shirt",
    description: "Premium cotton t-shirt for Christian engineers. Show your faith and pride in style.",
    price: 7500,
    images: [
      "/images/shirt.png",
      "/images/shirt.png",
      "/images/shirt.png"
    ],
    stock: 100,
    variants: [
      {
        name: "Size",
        options: [
          { value: "S", label: "Small", stock: 20 },
          { value: "M", label: "Medium", stock: 30 },
          { value: "L", label: "Large", stock: 25 },
          { value: "XL", label: "Extra Large", stock: 15 },
        ]
      },
      {
        name: "Color",
        options: [
          { value: "white", label: "White", stock: 30, image: "/images/shirt.png" },
          { value: "black", label: "Black", stock: 40, image: "/images/shirt.png" },
        ]
      }
    ],
    rating: 4.6,
    reviews: 87,
    isBestSeller: true,
    discountPercentage: 20,
  },
];



import { Order } from '@/types';
import { FaBible, FaPhotoVideo, FaTools } from "react-icons/fa";
import { FaBriefcase, FaUsers, FaVideo } from "react-icons/fa6";





export const categories = [
  {
    name: 'Engineering Resources',
    count: 54,
    icon: FaTools,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    name: 'Devotionals',
    count: 37,
    icon: FaBible,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    name: 'Career Resources',
    count: 29,
    icon: FaBriefcase,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    name: 'Seminars & Webinars',
    count: 18,
    icon: FaVideo,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    name: 'Community Content',
    count: 42,
    icon: FaUsers,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    name: 'Multimedia',
    count: 23,
    icon: FaPhotoVideo,
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
];