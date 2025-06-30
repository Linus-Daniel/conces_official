
  import { Book, Calendar, Cog, Folder, Gauge, GraduationCap, Lightbulb, ShoppingBag, User, Users } from "lucide-react";
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


export const productData: Product[] = [
    {
      id: 1,
      name: "Faith in Engineering eBook",
      description: "Digital guide on integrating faith principles with engineering practice",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/aacf65afde-9e8a27c8cab576d18a24.png",
      price: 12.99,
      rating: 4.2,
      reviews: 18,
      slug: "faith-in-engineering-ebook",
    },
    {
      id: 2,
      name: "Christian Ethics for Engineers",
      description: "Explore biblical principles that inform engineering ethics",
      image: "https://via.placeholder.com/300x400.png?text=Christian+Ethics",
      price: 10.5,
      rating: 4.5,
      reviews: 25,
      slug: "christian-ethics-for-engineers",
    },
    {
      id: 3,
      name: "Engineering Discipleship Handbook",
      description: "Discipleship manual tailored for students in STEM fields",
      image: "https://via.placeholder.com/300x400.png?text=Discipleship+Handbook",
      price: 15.0,
      rating: 4.0,
      reviews: 12,
      slug: "engineering-discipleship-handbook",
    },
    {
      id: 4,
      name: "The Christian Engineer's Journal",
      description: "Monthly publication featuring faith-based engineering stories",
      image: "https://via.placeholder.com/300x400.png?text=Engineers+Journal",
      price: 7.99,
      rating: 3.8,
      reviews: 9,
      slug: "christian-engineers-journal",
    },
  ];
  


  interface SidebarLink {
    name:string;
    href:string;
    icon:JSX.ElementType;
    dropdown?:{
      name:string;
      href:string;
      icon:string;
    }
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
      href: '/branch/store',
      icon: ShoppingBag,
      dropdown:{
        name:"products",
        href:"branch/products",
        icon:""
      }
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