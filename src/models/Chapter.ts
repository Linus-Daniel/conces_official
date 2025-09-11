// models/Branch.ts
import mongoose, { Schema, Document } from "mongoose";

interface ILeader {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface IBranch extends Document {
  id?: number | string;
  branchName: string;
  name?: string;
  status?: "Active" | "Inactive" | "No Leader" | "Pending";
  branchLocation: string;
  location?: string;
  leader?: ILeader | null;
  branchAdmin?: ILeader | null;
  lastActivity?: Date;
  motto?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const LeaderSchema = new Schema<ILeader>(
  {
    // _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
  }
);

const BranchSchema = new Schema<IBranch>(
  {
    id: { type: Schema.Types.Mixed }, // string | number
    branchName: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Active", "Inactive", "No Leader", "Pending"],
      default: "Active",
    },
    branchLocation: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    leader: { type: LeaderSchema, default: null },
    branchAdmin: { type: LeaderSchema, default: null },
    lastActivity: { type: Date },
    motto: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.Branch || mongoose.model<IBranch>("Branch", BranchSchema);
