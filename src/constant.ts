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
    href: "/chapter",
    icon: Gauge,
  },
  {
    name: "Manage Members",
    href: "/chapter/members",
    icon: Users,
  },
  {
    name: "Events",
    href: "/chapter/events",
    icon: Calendar,
  },
  {
    name: "Mentorship",
    href: "/chapter/mentorship",
    icon: User, // using FontAwesome faHandsHelping
  },
  {
    name: "Resources Hub",
    href: "/chapter/resources",
    icon: Folder,
  },
  {
    name: "Alumni",
    href: "/chapter/alumni",
    icon: GraduationCap,
  },
  {
    name: "Store",
    href: "",
    icon: ShoppingCart,
    dropdown: [
      { name: "Products", href: "/chapter/store/products", icon: Package },
      { name: "Orders", href: "/chapter/store/orders", icon: Receipt },
    ],
  },

  // {
  //   name: "Settings & Profile",
  //   href: "/chapter/settings",
  //   icon: Cog,
  // },
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

export const albums = [
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
import { Album } from "@/types/index";

export const mockAlbums: Album[] = [
  {
    id: 1,
    title: "Annual Conference",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Our annual gathering of Christian engineers from across the nation. Three days of worship, technical sessions, and networking opportunities.",
    date: "2023-01-15",
    tags: ["conference", "networking", "fellowship", "worship"],
    chapter: {
      _id: "national",
      chapterName: "National Conference",
    },
  },
  {
    id: 2,
    title: "Tech Innovation Workshop",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581094288338-231b058b38b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Hands-on technical workshop for skill development. Participants learned about emerging technologies and their applications in solving real-world problems.",
    date: "2023-02-20",
    tags: ["workshop", "skills", "technology", "innovation"],
    chapter: {
      _id: "lagos",
      chapterName: "Lagos Chapter",
    },
  },
  {
    id: 3,
    title: "Community Outreach Program",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549056572-75914d6d7e1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Serving local communities through engineering projects. We provided clean water solutions and built infrastructure for underserved areas.",
    date: "2023-03-10",
    tags: ["community", "service", "outreach", "humanitarian"],
    chapter: {
      _id: "abuja",
      chapterName: "Abuja Chapter",
    },
  },
  {
    id: 4,
    title: "Leadership Training Summit",
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Developing the next generation of Christian engineering leaders. Intensive program focusing on spiritual growth and professional leadership skills.",
    date: "2023-04-05",
    tags: ["leadership", "training", "development", "mentorship"],
    chapter: {
      _id: "ph",
      chapterName: "Port Harcourt Chapter",
    },
  },
  {
    id: 5,
    title: "Prayer & Fellowship Breakfast",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Monthly fellowship and prayer gathering. A time of spiritual refreshment and community building among Christian engineers.",
    date: "2023-05-12",
    tags: ["prayer", "fellowship", "spiritual", "breakfast"],
    chapter: {
      _id: "kano",
      chapterName: "Kano Chapter",
    },
  },
  {
    id: 6,
    title: "Engineering Career Fair",
    images: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Connecting Christian engineers with ethical employers. Over 30 companies participated, offering opportunities for internships and full-time positions.",
    date: "2023-06-08",
    tags: ["career", "employment", "networking", "recruitment"],
    chapter: {
      _id: "ibadan",
      chapterName: "Ibadan Chapter",
    },
  },
  {
    id: 7,
    title: "Mentorship Program Launch",
    images: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Pairing experienced engineers with students and new graduates. Our mentorship program focuses on both professional and spiritual development.",
    date: "2023-07-15",
    tags: ["mentorship", "guidance", "development", "career"],
    chapter: {
      _id: "benin",
      chapterName: "Benin Chapter",
    },
  },
  {
    id: 8,
    title: "Engineering Design Competition",
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581094288338-231b058b38b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Annual engineering design challenge for students. Teams competed to develop innovative solutions to community problems with sustainability in mind.",
    date: "2023-08-20",
    tags: ["competition", "innovation", "students", "design"],
    chapter: {
      _id: "enugu",
      chapterName: "Enugu Chapter",
    },
  },
  {
    id: 9,
    title: "Scholarship Fundraising Gala",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Elegant evening supporting our scholarship programs. Raised funds to support engineering students from underserved communities.",
    date: "2023-09-09",
    tags: ["fundraising", "scholarship", "gala", "charity"],
    chapter: {
      _id: "national",
      chapterName: "National Board",
    },
  },
  {
    id: 10,
    title: "Industrial Field Trip",
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Visiting innovative engineering projects around the country. Students gained practical insights into various engineering disciplines and industries.",
    date: "2023-10-14",
    tags: ["fieldtrip", "education", "innovation", "industry"],
    chapter: {
      _id: "kaduna",
      chapterName: "Kaduna Chapter",
    },
  },
  {
    id: 11,
    title: "Thanksgiving Service",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Celebrating God's faithfulness throughout the year. A special service of gratitude for all the accomplishments and blessings we've experienced.",
    date: "2023-11-05",
    tags: ["thanksgiving", "worship", "celebration", "gratitude"],
    chapter: {
      _id: "all",
      chapterName: "All Chapters",
    },
  },
  {
    id: 12,
    title: "Christmas Community Outreach",
    images: [
      "https://images.unsplash.com/photo-1549056572-75914d6d7e1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Bringing joy and practical help to communities during the holidays. Distributed food, clothing, and essential supplies to families in need.",
    date: "2023-12-16",
    tags: ["christmas", "outreach", "service", "charity"],
    chapter: {
      _id: "outreach",
      chapterName: "Community Outreach",
    },
  },
];

export default mockAlbums;