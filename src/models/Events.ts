// models/Event.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  id: string;
  title: string;
  category: 'spiritual' | 'academic' | 'career' | 'social' | string;
  branch?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription: string;
  rsvps: number;
  comments: number;
  featured: boolean;
  image: string;
  registrationLink: string;
  contactEmail: string;
  contactPhone: string;
  approved:boolean;
  requirements?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const EventSchema: Schema<IEvent> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['spiritual', 'academic', 'career', 'social'],
      required: true,
    },
branch: { type: Schema.Types.ObjectId, ref: "Branch" },
    date: { type: String, required: true }, // ISO date string
    time: { type: String, required: true }, // e.g., "10:00 AM - 4:00 PM"
    location: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    rsvps: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    image: { type: String, required: true },
    registrationLink: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    approved: { type: Boolean, default: false },  
    requirements: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
