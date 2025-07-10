import mongoose, { Schema, Document } from 'mongoose';

export interface IMentorshipRequest extends Document {
  mentorshipId: mongoose.Types.ObjectId; // reference to Mentorship
  mentorId: mongoose.Types.ObjectId;     // reference to Alumni
  studentId: mongoose.Types.ObjectId;    // reference to User
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const MentorshipRequestSchema = new Schema<IMentorshipRequest>(
  {
    mentorshipId: { type: Schema.Types.ObjectId, ref: 'Mentorship', required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: 'Alumni', required: true },
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
MentorshipRequestSchema.index({ mentorId: 1 });
MentorshipRequestSchema.index({ studentId: 1 });
MentorshipRequestSchema.index({ mentorshipId: 1 });

const MentorshipRequest = mongoose.models.MentorshipApplication || mongoose.model<IMentorshipRequest>('MentorshipApplication', MentorshipRequestSchema);

export default MentorshipRequest;
