import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IDonation extends Document {
  reference: string;
  donorName?: string;
  email?: string;
  amount: number; // stored in kobo
  anonymous: boolean;
  paidAt: Date;
  purpose?: string;
  status: 'success' | 'failed' | 'pending';
}

const DonationSchema: Schema = new Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    donorName: {
      type: String,
    },
    email: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
    purpose: {
      type: String,
      default: 'General Donation',
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite on hot-reload in dev
export default models.Donation || model<IDonation>('Donation', DonationSchema);
