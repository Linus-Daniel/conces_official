// models/Album.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IAlbum extends Document {
  _id: string;
  title: string;
  description: string;
  images: string[];
  date: string;
  tags: string[];
  category:
    | "fellowship"
    | "outreach"
    | "worship"
    | "conference"
    | "community"
    | "youth"
    | "missions"
    | "other";
  chapter: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  likes: number;
  comments: number;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AlbumSchema = new Schema<IAlbum>(
  {
    title: {
      type: String,
      required: [true, "Album title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Album description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (images: string[]) {
          return (
            images.length > 0 &&
            images.every(
              (img) => typeof img === "string" && img.trim().length > 0
            )
          );
        },
        message: "Album must contain at least one valid image URL",
      },
    },
    date: {
      type: String,
      required: [true, "Album date is required"],
      validate: {
        validator: function (date: string) {
          return !isNaN(Date.parse(date));
        },
        message: "Please provide a valid date",
      },
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[]) {
          return tags.every(
            (tag) =>
              typeof tag === "string" &&
              tag.trim().length > 0 &&
              tag.length <= 30
          );
        },
        message: "All tags must be valid strings with max 30 characters",
      },
    },
    category: {
      type: String,
      required: [true, "Album category is required"],
      enum: {
        values: [
          "fellowship",
          "outreach",
          "worship",
          "conference",
          "community",
          "youth",
          "missions",
          "other",
        ],
        message:
          "Category must be one of: fellowship, outreach, worship, conference, community, youth, missions, other",
      },
      default: "fellowship",
    },
    chapter: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
      required: [true, "Chapter is required"],
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
      index: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },
    comments: {
      type: Number,
      default: 0,
      min: [0, "Comments cannot be negative"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
AlbumSchema.index({ chapter: 1, date: -1 });
AlbumSchema.index({ category: 1, chapter: 1 });
AlbumSchema.index({ published: 1, featured: -1, date: -1 });
AlbumSchema.index({ createdBy: 1, date: -1 });

// Pre-save middleware
AlbumSchema.pre("save", function (next) {
  // Clean up images and tags
  this.images = this.images.filter((img) => img && img.trim().length > 0);
  this.tags = [
    ...new Set(
      this.tags
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0)
    ),
  ];

  if (this.images.length === 0) {
    return next(new Error("Album must contain at least one image"));
  }

  next();
});

// Ensure model is not re-compiled
const Album: Model<IAlbum> =
  mongoose.models.Album || mongoose.model<IAlbum>("Album", AlbumSchema);

export default Album;
