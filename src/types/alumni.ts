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

type Alumni = {
  id: number;
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
  // Step 1
  graduationYear: string;
  specialization: string;
  currentRole: string;
  bio: string;
  
  // Step 2
  education: EducationEntry[];
  
  // Step 3
  workExperience: WorkExperienceEntry[];
  
  // Step 4
  isMentor: boolean;
  availableForMentorship: boolean;
  skills: string[];
  
  // Step 5
  linkedIn: string;
  twitter: string;
  github: string;
  website:string;
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
  linkedIn: '',
  website:"",
  twitter: '',
  github: ''
};