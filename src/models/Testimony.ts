import { Schema, models, model } from 'mongoose';

const TestimonySchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  avatar: {
    type: String,
    default: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-default.jpg',
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    }),
  }
}, { timestamps: true });

export default models.Testimony || model('Testimony', TestimonySchema);
