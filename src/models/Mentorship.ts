// models/Mentorship.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMentorship extends Document {
  mentorId: mongoose.Types.ObjectId;  // ref to Alumni
  description: string;
  topics: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MentorshipSchema = new Schema<IMentorship>(
  {
    mentorId: { type: Schema.Types.ObjectId, ref: 'Alumni', required: true },
    description: { type: String, required: true },
    topics: [{ type: String }],
   
  },
  { timestamps: true }
);

export default mongoose.models.Mentorship || mongoose.model<IMentorship>('Mentorship', MentorshipSchema);
