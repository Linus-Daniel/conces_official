import mongoose, { Document, Schema } from 'mongoose';

export interface IMentorRequest extends Document {
  alumniId: mongoose.Types.ObjectId; // Reference to AlumniProfile
  primaryExpertise: string;
  secondaryExpertise?: string;
  skills: string[];
  mentorshipStyle: 'individual' | 'group' | 'hybrid';
  preferredTimes: string;
  maxMentees: number;
  motivation: string;
  experience: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId; // Reference to admin User
  createdAt: Date;
  updatedAt: Date;
}

const MentorRequestSchema = new Schema<IMentorRequest>({
  alumniId: { type: Schema.Types.ObjectId, ref: 'AlumniProfile', required: true },
  primaryExpertise: { type: String, required: true },
  secondaryExpertise: { type: String },
  skills: [{ type: String, required: true }],
  mentorshipStyle: { 
    type: String, 
    enum: ['individual', 'group', 'hybrid'], 
    required: true 
  },
  preferredTimes: { type: String, required: true },
  maxMentees: { type: Number, default: 3, min: 1, max: 20 },
  motivation: { type: String, required: true },
  experience: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminNotes: { type: String },
  reviewedAt: { type: Date },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Indexes for efficient queries
MentorRequestSchema.index({ alumniId: 1 });
MentorRequestSchema.index({ status: 1 });
MentorRequestSchema.index({ createdAt: -1 });

// Ensure one pending request per alumni
MentorRequestSchema.index({ alumniId: 1, status: 1 }, { 
  unique: true,
  partialFilterExpression: { status: 'pending' }
});

export default mongoose.models.MentorRequest || mongoose.model<IMentorRequest>('MentorRequest', MentorRequestSchema);