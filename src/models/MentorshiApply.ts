import mongoose, { Schema, Document } from 'mongoose';

export interface IMentorshipApplication extends Document {
  mentorshipId: mongoose.Types.ObjectId; // reference to Mentorship
  studentId: mongoose.Types.ObjectId; // reference to User
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const MentorshipApplicationSchema = new Schema<IMentorshipApplication>(
  {
    mentorshipId: { type: Schema.Types.ObjectId, ref: 'Mentorship', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.MentorshipApplication || mongoose.model<IMentorshipApplication>('MentorshipApplication', MentorshipApplicationSchema);
