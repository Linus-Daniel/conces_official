// models/Alumni.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IAlumni extends Document {
  userId: mongoose.Types.ObjectId; // reference to User
  graduationYear: number;
  currentRole: string;
  company: string;
  specialization: string;
  bio: string;
  availableForMentorship: boolean;
  expertise: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AlumniSchema = new Schema<IAlumni>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    graduationYear: { type: Number, required: true },
    currentRole: { type: String, required: true },
    company: { type: String, required: true },
    specialization: { type: String, required: true },
    bio: { type: String, required: true },
    availableForMentorship: { type: Boolean, default: false },
    expertise: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Alumni || mongoose.model<IAlumni>('Alumni', AlumniSchema);
