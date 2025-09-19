export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  images?: string[];
  reviews: number;
  slug: string;
};

import { IconType } from "react-icons";

export interface Category {
  name: string;
  slug?: string;
  icon: any;
  count: number;
  bgColor: string;
  iconColor: string;
}

export interface Resource {
  _id: string;
  title: string;
  type: string;
  featured: boolean;
  author: string;
  date: string;
  content?: string;
  category: string;
  videoUrl?: string;
  duration?: string;
  createdAt: string | Date;
  chapter: string;
  description: string;
  thumbnail: string;
  fileUrl?: string;
  tags: string[];
  views: number;
  downloads?: number;
  relatedResources?: string[];
}

export interface IEvent {
  id: string;
  _id?: string;
  title: string;
  category: "spiritual" | "academic" | "career" | "social" | string;
  chapter: {
    _id: string;
    chapterName: string;
  };
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription: string;
  rsvps: number;
  comments: number;
  featured: boolean;
  image: string;
  hasRegistration: boolean; 
  registrationLink: string;
  contactEmail: string;
  contactPhone: string;
  requirements?: string;
  status: "upcoming" | "ongoing" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "chapter-admin" | "student" | "alumni";
  chapter?: string;
}

export interface Chapter {
  id: string;
  name: string;
  location: string;
  members: number;
  admin?: User;
  status: "active" | "inactive";
}

export interface Prayer {
  _id: string;
  title: string;
  content: string;
  creator: {
    fullName: string;
    image?: string;
  };
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  prayedCount: number;
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

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "PAID";

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

export interface Application {
  _id: string;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "approved" | "rejected"; // Add other statuses if needed
  message: string;
  mentorId: MentorProfile;
  studentId: StudentProfile;
  mentorship: MentorshipDetails;
  __v: number;
}

export interface MentorProfile {
  _id: string;
  userId: string;
  avatar: string;
  bio: string;
  currentRole: string;
  graduationYear: number;
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
  socialLinks: SocialLinks;
  specialization: string;
  isMentor: boolean;
  availableForMentorship: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StudentProfile {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  chapter: string;
  role: "student" | string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MentorshipDetails {
  _id: string;
  name: string;
  topics: string[];
}

export interface SocialLinks {
  github: string;
  linkedIn: string;
  twitter: string;
  website: string;
}

export interface Education {
  // Define actual fields based on how your education objects look
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  startYear?: number;
  endYear?: number;
}

export interface WorkExperience {
  // Define actual fields based on how your workExperience objects look
  company?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}
