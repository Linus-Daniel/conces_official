import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  role: "student" | "alumni" | "branch-admin" | "admin";
  password: string;
  avatar?: string;
  branch?: string;
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
      enum: ["student", "alumni", "branch-admin", "admin"],
      required: true,
    },
    password: { type: String, required: true },
    avatar: { type: String },
    branch: { type: Schema.Types.ObjectId, ref: "Branch" },
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
UserSchema.index({ email: 1, branch: 1 }, { unique: true });

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {};

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
