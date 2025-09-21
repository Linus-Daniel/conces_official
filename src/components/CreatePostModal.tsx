"use client";

import React, { useState, useEffect } from "react";
import { FaTimes, FaImage, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { useSession } from "next-auth/react";
import RichTextEditor  from "./EditText"; // Adjust path as needed
import ImageUpload from "./ImageUpload"; // Your existing ImageUpload component
import api from "@/lib/axiosInstance";

type PostType = "discussion" | "project" | "announcement" | "prayer";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<PostType>("discussion");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { data } = useSession();
  const user = data?.user;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleImageUpload = (result: any) => {
    if (result?.secure_url) {
      setImages((prev) => [...prev, result.secure_url]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Please provide both a title and content for your post.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/community/posts", {
        title: title.trim(),
        content,
        type,
        images,
      });

      onPostCreated();
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setType("discussion");
    setImages([]);
    setError("");
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Post
            </h2>
            <p className="text-gray-600 mt-1">
              Share your thoughts with the community
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <FaTimes className="text-gray-500 text-xl" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Post Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Post Type
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    value: "discussion",
                    label: "Discussion",
                    color: "blue",
                    icon: "💬",
                  },
                  {
                    value: "project",
                    label: "Project",
                    color: "green",
                    icon: "🚀",
                  },
                  {
                    value: "announcement",
                    label: "Announcement",
                    color: "purple",
                    icon: "📢",
                  },
                  {
                    value: "prayer",
                    label: "Prayer Request",
                    color: "indigo",
                    icon: "🙏",
                  },
                ].map((postType) => (
                  <button
                    key={postType.value}
                    type="button"
                    onClick={() => setType(postType.value as PostType)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      type === postType.value
                        ? `border-${postType.color}-500 bg-${postType.color}-50 text-${postType.color}-700`
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-lg">{postType.icon}</span>
                    <span className="font-medium">{postType.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a compelling title for your post..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT outline-none transition-colors text-lg"
                maxLength={100}
                disabled={isSubmitting}
                required
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">
                  Make it clear and engaging
                </p>
                <span
                  className={`text-xs ${
                    title.length > 80 ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {title.length}/100
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content *
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Share your thoughts, ideas, or updates with the community..."
                  className="border-0"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use the toolbar above to format your content with bold, italics,
                links, and more
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Images (Optional)
              </label>

              {/* Upload Button */}
              <div className="mb-4">
                <ImageUpload
                  onSuccess={handleImageUpload}
                  folder="community-posts"
                  // disabled={isSubmitting || images.length >= 4}
                >
                  <div className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-royal-DEFAULT hover:bg-blue-50 transition-colors cursor-pointer">
                    <FaImage className="text-royal-DEFAULT" />
                    <span className="text-gray-700">
                      {images.length >= 4
                        ? "Maximum 4 images reached"
                        : "Add images (up to 4)"}
                    </span>
                  </div>
                </ImageUpload>
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPG, PNG, GIF. Images will be uploaded to
                  secure cloud storage.
                </p>
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        disabled={isSubmitting}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Tips:</span> Use @ to mention
                someone, # for hashtags
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Publish Post</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
