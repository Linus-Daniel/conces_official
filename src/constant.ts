import {
  Book,
  Calendar,
  Cog,
  Folder,
  Gauge,
  GraduationCap,
  Lightbulb,
  Package,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
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
  name: string;
  href: string;
  icon: JSX.ElementType;
  dropdown?: {
    name: string;
    href: string;
    icon: JSX.ElementType;
  }[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    name: "Dashboard Overview",
    href: "/branch",
    icon: Gauge,
  },
  {
    name: "Manage Members",
    href: "/branch/members",
    icon: Users,
  },
  {
    name: "Events",
    href: "/branch/events",
    icon: Calendar,
  },
  {
    name: "Mentorship",
    href: "/branch/mentorship",
    icon: User, // using FontAwesome faHandsHelping
  },
  {
    name: "Resources Hub",
    href: "/branch/resources",
    icon: Folder,
  },
  {
    name: "Alumni",
    href: "/branch/alumni",
    icon: GraduationCap,
  },
  {
    name: "Store",
    href: "",
    icon: ShoppingCart,
    dropdown: [
      { name: "Products", href: "/branch/store/products", icon: Package },
      { name: "Orders", href: "/branch/store/orders", icon: Receipt },
    ],
  },

  {
    name: "Settings & Profile",
    href: "/branch/settings",
    icon: Cog,
  },
];

export const product: Products[] = [
  {
    id: 1,
    name: "Classic CONCES T-Shirt",
    description:
      "Premium cotton t-shirt for Christian engineers. Show your faith and pride in style.",
    price: 7500,
    images: ["/images/shirt.png", "/images/shirt.png", "/images/shirt.png"],
    stock: 100,
    variants: [
      {
        name: "Size",
        options: [
          { value: "S", label: "Small", stock: 20 },
          { value: "M", label: "Medium", stock: 30 },
          { value: "L", label: "Large", stock: 25 },
          { value: "XL", label: "Extra Large", stock: 15 },
        ],
      },
      {
        name: "Color",
        options: [
          {
            value: "white",
            label: "White",
            stock: 30,
            image: "/images/shirt.png",
          },
          {
            value: "black",
            label: "Black",
            stock: 40,
            image: "/images/shirt.png",
          },
        ],
      },
    ],
    rating: 4.6,
    reviews: 87,
    isBestSeller: true,
    discountPercentage: 20,
  },
];

import { Order } from "@/types";
import { FaBible, FaPhotoVideo, FaTools } from "react-icons/fa";
import { FaBriefcase, FaUsers, FaVideo } from "react-icons/fa6";

export const categories = [
  {
    name: "Engineering Resources",
    count: 54,
    icon: FaTools,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "Devotionals",
    count: 37,
    icon: FaBible,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    name: "Career Resources",
    count: 29,
    icon: FaBriefcase,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    name: "Seminars & Webinars",
    count: 18,
    icon: FaVideo,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    name: "Community Content",
    count: 42,
    icon: FaUsers,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    name: "Multimedia",
    count: 23,
    icon: FaPhotoVideo,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];


export const executives = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Executive Director",
    image: "/images/executives/alex.jpg",
    bio: "Visionary leader with 10+ years of experience in nonprofit management and social impact initiatives.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Program Director",
    image: "/images/executives/maria.jpg",
    bio: "Passionate about youth development and creating scalable programs that drive meaningful change.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "James Chen",
    role: "Technology Lead",
    image: "/images/executives/james.jpg",
    bio: "Tech innovator focused on leveraging technology to solve social challenges and empower communities.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Partnership Manager",
    image: "/images/executives/sarah.jpg",
    bio: "Expert in building strategic partnerships that amplify impact and create sustainable solutions.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
];

export const gallery = [
  {
    id: 1,
    title: "Aji",
    image: "/images/aji.jpg",
    description: "Fellowship member contributing to community projects",
    date: "January 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 2,
    title: "Ant",
    image: "/images/ant.jpg",
    description: "Leading our tech innovation workshop",
    date: "February 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 3,
    title: "Chidi",
    image: "/images/chidi.jpg",
    description: "Speaking at our annual leadership conference",
    date: "March 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 4,
    title: "Dave",
    image: "/images/dave.jpg",
    description: "Organizing local community outreach",
    date: "April 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 5,
    title: "Dog",
    image: "/images/dog.jpg",
    description: "Our fellowship mascot at charity event",
    date: "May 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 6,
    title: "Happy",
    image: "/images/happy.jpg",
    description: "Celebrating successful project completion",
    date: "June 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 7,
    title: "Joel",
    image: "/images/joel.jpg",
    description: "Mentoring new fellowship members",
    date: "July 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 8,
    title: "Julius",
    image: "/images/julius.jpg",
    description: "Presenting research findings",
    date: "August 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 9,
    title: "Nansoh",
    image: "/images/nansoh.jpg",
    description: "Coordinating international partnership",
    date: "September 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 10,
    title: "Prince",
    image: "/images/prince.jpg",
    description: "Leading fundraising initiative",
    date: "October 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 11,
    title: "Tima",
    image: "/images/tima.jpg",
    description: "Facilitating skills development workshop",
    date: "November 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
  {
    id: 12,
    title: "Yohny",
    image: "/images/yohny.jpg",
    description: "Receiving community service award",
    date: "December 2023",
    tags: ["community", "projects", "fellowship"],
    chapter: "Community Outreach",
  },
];