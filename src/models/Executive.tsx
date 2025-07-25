// models/Executive.js
import mongoose from "mongoose";

const ExecutiveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Please provide a role"],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, "Please provide a bio"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    twitter: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
  }
);

// Prevent model overwrite during hot reload in dev
export default mongoose.models.Executive ||
  mongoose.model("Executive", ExecutiveSchema);
