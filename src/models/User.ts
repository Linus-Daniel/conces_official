import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  role: "student" | "alumni" | "chapter-admin" | "admin";
  password: string;
  avatar?: string;
  chapter?: string;
  verified: boolean;
  verificationToken?: string;
  verificationExpires?: Date;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    institution: { type: String },
    role: {
      type: String,
      enum: ["student", "alumni", "chapter-admin", "admin"],
      required: true,
    },
    password: { type: String, required: true },
    avatar: { type: String },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter" },
    location: { type: String },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ verificationToken: 1 });
UserSchema.index({ email: 1, chapter: 1 }, { unique: true });

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {};

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
