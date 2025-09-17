// models/Event.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  id: string;
  title: string;
  category: "spiritual" | "academic" | "career" | "social" | string;
  chapter?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription: string;
  rsvps: number;
  comments: number;
  featured: boolean;
  image: string;
  hasRegistration: boolean; // New field to indicate if registration is required
  registrationLink?: string; // Now optional
  contactEmail?: string; // Now optional
  contactPhone?: string; // Now optional
  approved: boolean;
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
      enum: ["spiritual", "academic", "career", "social"],
      required: true,
    },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter" },
    date: { type: String, required: true }, // ISO date string
    time: { type: String, required: true }, // e.g., "10:00 AM - 4:00 PM"
    location: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    rsvps: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    image: { type: String, required: true },
    hasRegistration: { type: Boolean, default: false }, // New field
    registrationLink: {
      type: String,
      required: function (this: IEvent) {
        return this.hasRegistration;
      },
    }, // Conditionally required
    contactEmail: {
      type: String,
      required: function (this: IEvent) {
        return this.hasRegistration;
      },
    }, // Conditionally required
    contactPhone: {
      type: String,
      required: function (this: IEvent) {
        return this.hasRegistration;
      },
    }, // Conditionally required
    approved: { type: Boolean, default: false },
    requirements: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Event ||
  mongoose.model<IEvent>("Event", EventSchema);
