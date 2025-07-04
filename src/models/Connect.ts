import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IConnection extends Document {
  alumniId: mongoose.Types.ObjectId;
  connectedUserId: mongoose.Types.ObjectId;
  status: 'pending' | 'connected';
  createdAt: Date;
  updatedAt: Date;
}

const ConnectionSchema: Schema<IConnection> = new Schema({
  alumniId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  connectedUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'connected'],
    default: 'pending',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// ✅ Prevent duplicate connections between the same two users
ConnectionSchema.index({ alumniId: 1, connectedUserId: 1 }, { unique: true });

const Connection: Model<IConnection> = 
  mongoose.models.Connection || mongoose.model<IConnection>('Connection', ConnectionSchema);

export default Connection;
