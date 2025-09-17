// models/Chapter.ts
import mongoose, { Schema, Document } from "mongoose";

interface ILeader {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface IChapter extends Document {
  id?: number | string;
  chapterName: string;
  name?: string;
  status?: "Active" | "Inactive" | "No Leader" | "Pending";
  chapterLocation: string;
  location?: string;
  leader?: ILeader | null;
  chapterAdmin?: ILeader | null;
  lastActivity?: Date;
  motto?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const LeaderSchema = new Schema<ILeader>({
  // _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
});

const ChapterSchema = new Schema<IChapter>(
  {
    id: { type: Schema.Types.Mixed }, // string | number
    chapterName: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Active", "Inactive", "No Leader", "Pending"],
      default: "Active",
    },
    chapterLocation: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    leader: { type: LeaderSchema, default: null },
    chapterAdmin: { type: LeaderSchema, default: null },
    lastActivity: { type: Date },
    motto: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.Chapter ||
  mongoose.model<IChapter>("Chapter", ChapterSchema);
