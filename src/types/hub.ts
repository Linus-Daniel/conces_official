// types/hub.ts - Updated types for user details
export interface User {
  _id: string;
  fullname: string;
  email: string;
  phone?: string;
  institution?: string;
  avatar?: string;
  major?: string;
  graduationYear?: string;
  location?: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  profilePicture?: string;
  status: "pending" | "approved" | "rejected";
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
  billing: {
    plan: "Free" | "Pro" | "Enterprise";
    status: "active" | "inactive" | "canceled";
    renewalDate?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  userId: string;
  description: string;
  githubLink?: string;
  thumbnail?: string;
  link?: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  user: string;
  category: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  proficiency: number;
  experience: number;
  endorsements: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDetails extends User {
  projects: Project[];
  skills: Skill[];
  projectsCount: number;
  skillsCount: number;
}

// Existing interfaces...
export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface SkillsResponse {
  skills: Skill[];
  categories: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}
