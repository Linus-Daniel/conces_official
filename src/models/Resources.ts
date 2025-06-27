import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['devotional', 'pdf', 'video', 'Article', 'Other'] // Optional: limit to specific types
  },
  tags: {
    type: [String],
    default: []
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String, // or Date if you're storing actual date objects
    required: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

export default mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);