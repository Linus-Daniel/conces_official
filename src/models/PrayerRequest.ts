import mongoose, { Schema, model, models } from "mongoose";

const PrayerRequestSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // assuming you have a User model
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite upon hot reload in development
const PrayerRequest = models.PrayerRequest || model("PrayerRequest", PrayerRequestSchema);

export default PrayerRequest;
