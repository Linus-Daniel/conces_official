import mongoose, { Document, Schema } from 'mongoose';

export interface IMentorshipProgram extends Document {
  mentorId: mongoose.Types.ObjectId; // Reference to AlumniProfile
  title: string;
  description: string;
  category: string;
  topics: string[];
  mentorshipStyle: 'individual' | 'group' | 'hybrid';
  duration: string; // e.g., "3 months", "6 weeks"
  timeCommitment: string; // e.g., "2 hours/week"
  schedule: string; // e.g., "Weekends, 2-4 PM"
  maxParticipants: number;
  currentParticipants: number;
  prerequisites?: string;
  objectives: string[];
  isActive: boolean;
  applicationDeadline?: Date;
  programStartDate?: Date;
  programEndDate?: Date;
  meetingPlatform?: string; // e.g., "Zoom", "Google Meet"
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MentorshipProgramSchema = new Schema<IMentorshipProgram>({
  mentorId: { type: Schema.Types.ObjectId, ref: 'AlumniProfile', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "Software Development", "Career Growth"
  topics: [{ type: String, required: true }],
  mentorshipStyle: { 
    type: String, 
    enum: ['individual', 'group', 'hybrid'], 
    required: true 
  },
  duration: { type: String, required: true },
  timeCommitment: { type: String, required: true },
  schedule: { type: String, required: true },
  maxParticipants: { type: Number, required: true, min: 1 },
  currentParticipants: { type: Number, default: 0, min: 0 },
  prerequisites: { type: String },
  objectives: [{ type: String }],
  isActive: { type: Boolean, default: true },
  applicationDeadline: { type: Date },
  programStartDate: { type: Date },
  programEndDate: { type: Date },
  meetingPlatform: { type: String },
  tags: [{ type: String }]
}, { timestamps: true });

// Indexes for efficient queries
MentorshipProgramSchema.index({ mentorId: 1 });
MentorshipProgramSchema.index({ category: 1 });
MentorshipProgramSchema.index({ isActive: 1 });
MentorshipProgramSchema.index({ applicationDeadline: 1 });
MentorshipProgramSchema.index({ createdAt: -1 });
MentorshipProgramSchema.index({ tags: 1 });

// Compound indexes
MentorshipProgramSchema.index({ isActive: 1, category: 1 });
MentorshipProgramSchema.index({ isActive: 1, currentParticipants: 1, maxParticipants: 1 });

// Virtual for available spots
MentorshipProgramSchema.virtual('availableSpots').get(function() {
  return this.maxParticipants - this.currentParticipants;
});

// Virtual for is full
MentorshipProgramSchema.virtual('isFull').get(function() {
  return this.currentParticipants >= this.maxParticipants;
});

export default mongoose.models.MentorshipProgram || mongoose.model<IMentorshipProgram>('MentorshipProgram', MentorshipProgramSchema);