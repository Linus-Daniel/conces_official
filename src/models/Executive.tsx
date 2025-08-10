// models/Executive.ts
import mongoose, { Document, Model } from "mongoose";

export interface IExecutive extends Document {
  name: string;
  avatar?: string;
  course: string;
  institution: string;
  level: "200" | "300" | "400" | "500";
  position:
    | "National President"
    | "Vice President"
    | "General Secretary"
    | "Assistant General Secretary"
    | "Financial Secretary"
    | "Treasurer"
    | "Organizing Secretary"
    | "Publicity Secretary"
    | "Prayer Secretary"
    | "Traveling Secretary"
    | "North East Zonal Coordinator";
  session: string;
  status: "Active" | "Excos";
  organization: string;
  state?: string;
  department: string;
  fullTitle?: string; // virtual
  createdAt?: Date;
  updatedAt?: Date;
}

const executiveSchema = new mongoose.Schema<IExecutive>(
  {
    name: { type: String, required: true, trim: true },
    avatar: { type: String, required: false },
    course: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    level: {
      type: String,
      required: true,
      enum: ["200", "300", "400", "500"],
    },
    position: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "National President",
        "Vice President",
        "General Secretary",
        "Assistant General Secretary",
        "Financial Secretary",
        "Treasurer",
        "Organizing Secretary",
        "Publicity Secretary",
        "Prayer Secretary",
        "Traveling Secretary",
        "North East Zonal Coordinator",
      ],
    },
    session: {
      type: String,
      required: true,
      default: "2024/2025 Spiritual Session",
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Excos"],
      default: "Active",
    },
    organization: {
      type: String,
      required: true,
      default: "Conference of Nigeria Christian Engineering Students CONCES",
    },
    state: { type: String, trim: true },
    department: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

executiveSchema.index({ position: 1 });
executiveSchema.index({ institution: 1 });
executiveSchema.index({ course: 1 });
executiveSchema.index({ status: 1 });
executiveSchema.index({ session: 1 });

executiveSchema.virtual("fullTitle").get(function (this: IExecutive) {
  return `${this.position} - ${this.organization}`;
});

executiveSchema.set("toJSON", { virtuals: true }); 

const Executive: Model<IExecutive> =
  mongoose.models.Executive ||
  mongoose.model<IExecutive>("Executive", executiveSchema);

export default Executive;
