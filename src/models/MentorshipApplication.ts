import mongoose, { Schema, Document } from 'mongoose';

export interface IMentorshipApplication extends Document {
  programId: mongoose.Types.ObjectId; // Reference to MentorshipProgram
  mentorId: mongoose.Types.ObjectId; // Reference to AlumniProfile (for easier queries)
  studentId: mongoose.Types.ObjectId; // Reference to User
  message: string;
  motivation: string;
  goals: string[];
  experience?: string;
  availability: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  mentorResponse?: string;
  reviewedAt?: Date;
  applicationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MentorshipApplicationSchema = new Schema<IMentorshipApplication>({
  programId: { type: Schema.Types.ObjectId, ref: 'MentorshipProgram', required: true },
  mentorId: { type: Schema.Types.ObjectId, ref: 'AlumniProfile', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  motivation: { type: String, required: true },
  goals: [{ type: String, required: true }],
  experience: { type: String },
  availability: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  mentorResponse: { type: String },
  reviewedAt: { type: Date },
  applicationDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes for efficient queries
MentorshipApplicationSchema.index({ programId: 1 });
MentorshipApplicationSchema.index({ mentorId: 1 });
MentorshipApplicationSchema.index({ studentId: 1 });
MentorshipApplicationSchema.index({ status: 1 });
MentorshipApplicationSchema.index({ applicationDate: -1 });

// Compound indexes
MentorshipApplicationSchema.index({ programId: 1, status: 1 });
MentorshipApplicationSchema.index({ mentorId: 1, status: 1 });
MentorshipApplicationSchema.index({ studentId: 1, status: 1 });

// Ensure one application per student per program
MentorshipApplicationSchema.index(
  { programId: 1, studentId: 1 }, 
  { unique: true }
);

const MentorshipApplication = mongoose.models.MentorshipApplication || 
  mongoose.model<IMentorshipApplication>('MentorshipApplication', MentorshipApplicationSchema);

export default MentorshipApplication;