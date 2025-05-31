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
