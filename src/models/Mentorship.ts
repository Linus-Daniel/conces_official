import mongoose, { Document, Schema } from 'mongoose';

interface Schedule {
  days: string[];
  time: string;
  meetingLink?: string;
  additionalNotes?: string;
}

export interface IMentorship extends Document {
  mentorId: mongoose.Types.ObjectId;
  name?: string;
  description: string;
  topics: string[];
  schedule?: Schedule;
  approved: boolean;
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSchema = new Schema<Schedule>(
  {
    days: [String],
    time: { type: String },
    meetingLink: String,
    additionalNotes: String,
  },
  { _id: false }
);

const MentorshipSchema = new Schema<IMentorship>(
  {
    mentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    name: { type: String, required: false },
    topics: [{ type: String }],
    approved: { type: Boolean, default: false },
    
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
    schedule: ScheduleSchema,
  },
  { timestamps: true }
);

export default mongoose.models.Mentorship || mongoose.model<IMentorship>('Mentorship', MentorshipSchema);
