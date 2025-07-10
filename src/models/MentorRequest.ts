// models/MentorRequest.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMentorRequest extends Document {
  userId: mongoose.Types.ObjectId;
  primaryExpertise: string;
  skills: string[]; // derived from comma-separated input
  style: '1-on-1' | 'Group' | 'Text-based' | 'Video/Call' | string;
  preferredTimes: string; // e.g. "Weekends, 4pm - 6pm"
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const MentorRequestSchema = new Schema<IMentorRequest>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  primaryExpertise: { type: String, required: true },
  skills: [{ type: String, required: true }],
  style: { type: String, required: true },
  preferredTimes: { type: String, required: true },
  motivation: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.models.MentorRequest || mongoose.model<IMentorRequest>('MentorRequest', MentorRequestSchema);
