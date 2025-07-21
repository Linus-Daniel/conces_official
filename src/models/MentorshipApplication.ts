import mongoose, { Schema, Document } from 'mongoose';

export interface IMentorshipApplication extends Document {
  mentorship: mongoose.Types.ObjectId; // reference to Mentorship
  mentorId: mongoose.Types.ObjectId;     // reference to Alumni
  studentId: mongoose.Types.ObjectId;    // reference to User
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const MentorshipApplicationSchema = new Schema<IMentorshipApplication>(
  {
    mentorship: { type: Schema.Types.ObjectId, ref: 'Mentorship', required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: 'AlumniProfile', required: true },
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

// Add indexes for faster queries (especially useful for filters)
MentorshipApplicationSchema.index({ mentorId: 1 });
MentorshipApplicationSchema.index({ studentId: 1 });
MentorshipApplicationSchema.index({ mentorship: 1 });

const MentorshipApplication = mongoose.models.MentorshipApplication || mongoose.model<IMentorshipApplication>('MentorshipApplication', MentorshipApplicationSchema);

export default MentorshipApplication;
