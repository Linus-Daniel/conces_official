
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

export async function getOrders(): Promise<Order[]> {
  // In a real app, this would fetch from your API
  return [
    {
      id: '1',
      number: 'RS-2023-456789',
      date: 'October 15, 2023',
      status: 'hipped',
      items: [
        {
          id: '101',
          name: 'Royal Blue Velvet Cushion',
          image: '/placeholder-product.jpg',
          quantity: 1,
          price: 49.99
        },
        {
          id: '102',
          name: 'Gold Embroidered Throw Pillow',
          image: '/placeholder-product.jpg',
          quantity: 2,
          price: 59.99
        },
        {
          id: '103',
          name: 'Regal Table Runner',
          image: '/placeholder-product.jpg',
          quantity: 1,
          price: 39.99
        }
      ],
      total: 225.94,
      deliveryDate: 'October 22, 2023'
    },
    {
      id: '2',
      number: 'RS-2023-345678',
      date: 'September 28, 2023',
      status: 'Delivered',
      items: [
        {
          id: '201',
          name: 'Royal Ceramic Vase',
          image: '/placeholder-product.jpg',
          quantity: 1,
          price: 89.99
        },
        {
          id: '202',
          name: 'Velvet Curtains',
          image: '/placeholder-product.jpg',
          quantity: 1,
          price: 59.98
        }
      ],
      total: 149.97,
      deliveryDate: 'October 5, 2023'
    },
    {
      id: '3',
      number: 'RS-2023-234567',
      date: 'September 15, 2023',
      status: 'Processing',
      items: [
        {
          id: '301',
          name: 'Silk Pillowcase Set',
          image: '/placeholder-product.jpg',
          quantity: 1,
          price: 89.98
        }
      ],
      total: 89.98,
      deliveryDate: 'September 18, 2023'
    }
  ];
}