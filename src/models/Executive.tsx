// models/Executive.js
import mongoose from "mongoose";

const ExecutiveSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
ExecutiveSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Executive", ExecutiveSchema);
