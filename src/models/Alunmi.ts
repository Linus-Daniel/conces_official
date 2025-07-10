import mongoose, { Document, Schema, Model } from 'mongoose';

interface SocialLinks {
  linkedIn?: string;
  twitter?: string;
  github?: string;
  website: string;
}

export interface IAlumniProfile extends Document {
  userId: mongoose.Types.ObjectId;
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
  avatar:string
  availableForMentorship: boolean;
  isMentor: boolean;
  skills: string[];
  socialLinks: SocialLinks;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinksSchema: Schema = new Schema({
  linkedIn: { type: String },
  twitter: { type: String },
  github: { type: String },
  website: { type: String },
}, { _id: false });

const EducationSchema: Schema = new Schema({
  schoolName: { type: String, required: true },
  course: { type: String, required: true },
  graduationYear: { type: String, required: true },
}, { _id: false });

const ExperienceSchema: Schema = new Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const AlumniProfileSchema: Schema<IAlumniProfile> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  graduationYear: { type: Number, required: true },
  education: [EducationSchema],
  workExperience: [ExperienceSchema],
  specialization: { type: String, required: true },
  avatar:{type: String, required: true},
  currentRole: { type: String, required: true },
  bio: { type: String },
  availableForMentorship: { type: Boolean, default: false },
  isMentor: { type: Boolean, default: false },
  skills: [{ type: String }],
  socialLinks: SocialLinksSchema,
}, {
  timestamps: true,
});
const AlumniProfile: Model<IAlumniProfile> =
  mongoose.models.AlumniProfile || mongoose.model<IAlumniProfile>('AlumniProfile', AlumniProfileSchema);
export default AlumniProfile;
