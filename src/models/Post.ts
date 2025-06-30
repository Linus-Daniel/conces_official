// models/Post.ts
import mongoose, { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    userId: string;
  };
  date: string;
  type: "discussion" | "prayer" | "project" | "announcement";
  likes: number;
  comments: number;
  images?: string[];
  prayed?: number;
}

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    role: { type: String, required: true },
    userId: { type: String, required: true },
  },
  date: { type: String, required: true },
  type: {
    type: String,
    enum: ["discussion", "prayer", "project", "announcement"],
    required: true,
  },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  images: { type: [String], default: [] },
  prayed: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);