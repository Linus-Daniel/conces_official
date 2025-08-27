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
  approved:{
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    required: false
  },
  fileUrl: {
    type: String,
    required: false
  },
  videoUrl: {
    type: String,
    required: false
  },
  featured: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['devotional', 'pdf', 'video', 'article', 'other']
  },
  tags: {
    type: [String],
    default: []
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  }

}, {
  timestamps: true
});
const Resource = mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
export default Resource