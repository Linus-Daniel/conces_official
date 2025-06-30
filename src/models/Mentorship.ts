// models/Mentorship.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMentorship extends Document {
  studentId: mongoose.Types.ObjectId; // ref to User
  alumniId: mongoose.Types.ObjectId;  // ref to Alumni
  message: string;
  topics: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const MentorshipSchema = new Schema<IMentorship>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    alumniId: { type: Schema.Types.ObjectId, ref: 'Alumni', required: true },
    message: { type: String, required: true },
    topics: [{ type: String }],
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Mentorship || mongoose.model<IMentorship>('Mentorship', MentorshipSchema);
