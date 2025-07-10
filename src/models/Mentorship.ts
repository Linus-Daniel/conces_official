import mongoose, { Document, Schema } from 'mongoose';

interface Schedule {
  days: string[];
  time: string;
  meetingLink?: string;
  additionalNotes?: string;
}

export interface IMentorship extends Document {
  mentorId: mongoose.Types.ObjectId;
  description: string;
  topics: string[];
  schedule?: Schedule;
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
    mentorId: { type: Schema.Types.ObjectId, ref: 'Alumni', required: true },
    description: { type: String, required: true },
    topics: [{ type: String }],
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
    schedule: ScheduleSchema,
  },
  { timestamps: true }
);

export default mongoose.models.Mentorship || mongoose.model<IMentorship>('Mentorship', MentorshipSchema);
