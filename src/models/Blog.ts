// models/Blog.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Define the comment interface
export interface IComment {
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  likes: number;
  approved: boolean;
  createdAt: Date;
}

// Define instance methods interface
export interface IBlogMethods {
  incrementViews(): Promise<IBlog>;
  addComment(comment: Partial<IComment>): Promise<IBlog>;
}

// Define static methods interface
export interface IBlogModel extends Model<IBlog, {}, IBlogMethods> {
  findPublished(filter?: any): any;
  findFeatured(limit?: number): any;
}

// Main blog interface extending Document and methods
export interface IBlog extends Document, IBlogMethods {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content from rich text editor
  category: "spiritual" | "technical" | "career" | "general";
  tags: string[];
  featuredImage: string;
  featured: boolean;
  published: boolean;
  publishedAt?: Date;
  readTime: number; // in minutes
  author: {
    name: string;
    avatar?: string;
    role?: string;
    bio?: string;
    userId: string;
  };
  relatedPosts?: Types.ObjectId[]; // Array of blog IDs
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  likes: number;
  comments?: IComment[];
  createdBy: string; // User ID of admin who created
  updatedBy?: string; // User ID of admin who last updated
  createdAt: Date;
  updatedAt: Date;
  // Virtual properties
  estimatedReadTime: number;
}

const BlogSchema = new Schema<IBlog, IBlogModel, IBlogMethods>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      default: "", // Add default value to prevent undefined
    },
    category: {
      type: String,
      required: true,
      enum: ["spiritual", "technical", "career", "general"],
      default: "general",
    },
    tags: {
      type: [String],
      default: [],
    },
    featuredImage: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    readTime: {
      type: Number,
      required: true,
      default: 5,
    },
    author: {
      name: { type: String, required: true },
      avatar: { type: String },
      role: { type: String },
      bio: { type: String },
      userId: { type: String, required: true },
    },
    relatedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    metaTitle: {
      type: String,
      maxlength: 100,
    },
    metaDescription: {
      type: String,
      maxlength: 160,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        author: {
          name: { type: String, required: true },
          email: { type: String, required: true },
          avatar: { type: String },
        },
        content: { type: String, required: true },
        likes: { type: Number, default: 0 },
        approved: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Ensure content exists before virtuals are calculated
        if (!ret.content) {
          ret.content = "";
        }
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        if (!ret.content) {
          ret.content = "";
        }
        return ret;
      },
    },
  }
);

// Indexes for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ published: 1, publishedAt: -1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ featured: 1 });
BlogSchema.index({ "author.userId": 1 });

// Virtual for estimated read time based on content
BlogSchema.virtual("estimatedReadTime").get(function (this: IBlog) {
  const wordsPerMinute = 200;
  
  // Add safety check for undefined/null content
  if (!this.content || typeof this.content !== 'string') {
    return 0; // Return a default value
  }
  
  // Remove HTML tags and count words
  const plainText = this.content.replace(/<[^>]*>/g, "");
  const wordCount = plainText.split(/\s+/).length;
  
  return Math.ceil(wordCount / wordsPerMinute);
});
// Pre-save middleware to auto-generate slug from title if not provided
BlogSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  // Set publishedAt date when publishing
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  // Calculate read time if not set
  if (!this.readTime && this.content) {
    const wordsPerMinute = 200;
    const wordCount = this.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }

  next();
});

// Instance method to increment views
BlogSchema.methods.incrementViews = async function (
  this: IBlog
): Promise<IBlog> {
  this.views += 1;
  return this.save();
};

// Instance method to add comment
BlogSchema.methods.addComment = async function (
  this: IBlog,
  comment: Partial<IComment>
): Promise<IBlog> {
  if (!this.comments) {
    this.comments = [];
  }
  this.comments.push(comment as IComment);
  return this.save();
};

// Static method to find published posts
BlogSchema.statics.findPublished = function (filter = {}) {
  return this.find({
    ...filter,
    published: true,
    publishedAt: { $lte: new Date() },
  }).sort("-publishedAt");
};

// Static method to find featured posts
BlogSchema.statics.findFeatured = function (limit = 2) {
  return this.find({
    published: true,
    featured: true,
    publishedAt: { $lte: new Date() },
  })
    .sort("-publishedAt")
    .limit(limit);
};

const Blog: IBlogModel =
  (mongoose.models.Blog as IBlogModel) ||
  mongoose.model<IBlog, IBlogModel>("Blog", BlogSchema);

export default Blog;
