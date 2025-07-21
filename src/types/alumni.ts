type Education = {
  degree: string;
  institution: string;
  year: number;
};

type Experience = {
  position: string;
  company: string;
  duration: string;
  description: string;
};

type MentorshipDetails = {
  availability: string;
  areas: string[];
  style: string;
  commitment: string;
};

type Testimonial = {
  name: string;
  role: string;
  text: string;
  date: string;
};

export type Alumni = {
  _id:string;
  name: string;
  graduationYear: number;
  currentRole: string;
  specialization: string;
  location: string;
  avatar: string;
  availableForMentorship: boolean;
  bio: string;
  contact: string;
  linkedin: string;
  twitter: string;
  education: Education[];
  experience: Experience[];
  mentorshipDetails: MentorshipDetails;
  testimonials: Testimonial[];
};


// types.ts


interface SocialLinks {
  linkedIn?: string;
  twitter?: string;
  github?: string;
  website: string;
}

export interface IAlumniProfile extends Document {
  _id:string;
  userId:string;
  graduationYear: number;
  education: {
    schoolName: string;
    course: string;
    graduationYear: string;
  }[];
  workExperience: {
    title: string;
    organization: string;
    duration: string;
    description: string;
  }[];
  specialization: string;
  currentRole: string;
  bio?: string;
  availableForMentorship: boolean;
  isMentor: boolean;
  skills: string[];
  socialLinks: SocialLinks;
  createdAt: Date;
  updatedAt: Date;
}

// types.ts

export interface EducationEntry {
  schoolName: string;
  course: string;
  graduationYear: string;
  id: string;
}

export interface WorkExperienceEntry {
  title: string;
  organization: string;
  duration: string;
  description: string;
  id: string;
}

export interface AlumniFormData {
  _id?:string;
  graduationYear: string;
  specialization: string;
  currentRole: string;
  bio: string;
  
  education: EducationEntry[];
  
  workExperience: WorkExperienceEntry[];
  
  isMentor: boolean;
  availableForMentorship: boolean;
  skills: string[];
  
  // Step 5
socialLinks:SocialLinks
}

export const initialFormData: AlumniFormData = {
  graduationYear: '',
  specialization: '',
  currentRole: '',
  bio: '',
  education: [{ schoolName: '', course: '', graduationYear: '', id: Date.now().toString() }],
  workExperience: [{ title: '', organization: '', duration: '', description: '', id: Date.now().toString() }],
  isMentor: false,
  availableForMentorship: false,
  skills: [],
  socialLinks:{
    linkedIn:"",
    website:"",
    github:"",
    twitter:""
  }
};