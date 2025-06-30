import mongoose, { Document, Schema, Types } from "mongoose";

export interface IComment extends Document {
  postId: Types.ObjectId;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    author: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      avatar: { type: String },
      role: { type: String, required: true },
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model<IComment>("Comment", CommentSchema);
