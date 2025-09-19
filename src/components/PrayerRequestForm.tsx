"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSend,
  FiEdit2,
  FiLoader,
  FiAlertCircle,
  FiPlusCircle,
  FiMessageSquare,
} from "react-icons/fi";

type PrayerRequestFormData = {
  title: string;
  content: string;
  isAnonymous: boolean;
};

type PrayerRequestFormProps = {
  onSubmit: (data: PrayerRequestFormData) => Promise<void>;
  initialData?: Partial<PrayerRequestFormData>;
  isSubmitting?: boolean;
  error?: string;
  title?: string;
  description?: string;
  submitButtonText?: string;
  showTitle?: boolean;
  className?: string;
  compact?: boolean;
};

const PrayerRequestForm = ({
  onSubmit,
  initialData = {},
  isSubmitting = false,
  error = "",
  title = "New Prayer Request",
  description,
  submitButtonText = "Post Request",
  showTitle = true,
  className = "",
  compact = false,
}: PrayerRequestFormProps) => {
  const [formData, setFormData] = useState<PrayerRequestFormData>({
    title: initialData.title || "",
    content: initialData.content || "",
    isAnonymous: initialData.isAnonymous || false,
  });

  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Basic validation
    if (!formData.title.trim()) {
      setLocalError("Title is required");
      return;
    }

    if (!formData.content.trim()) {
      setLocalError("Content is required");
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        title: "",
        content: "",
        isAnonymous: false,
      });
    } catch (err) {
      console.error("Error submitting prayer request:", err);
      setLocalError("Failed to submit prayer request. Please try again.");
    }
  };

  const displayError = error || localError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 ${className}`}
    >
      <div className={compact ? "p-4 sm:p-6" : "p-6 sm:p-8"}>
        {showTitle && (
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-indigo-50 mr-4 text-indigo-600">
              <FiPlusCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="prayer-title"
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <FiEdit2 className="mr-2 text-gray-400" />
                Title
              </label>
              <input
                type="text"
                id="prayer-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Brief title for your request"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="prayer-content"
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <FiMessageSquare className="mr-2 text-gray-400" />
                Details
              </label>
              <textarea
                id="prayer-content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className={`w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  compact ? "min-h-[120px]" : "min-h-[150px]"
                }`}
                placeholder="Share your prayer request details..."
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="prayer-anonymous"
                checked={formData.isAnonymous}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isAnonymous: e.target.checked,
                  })
                }
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <label
                htmlFor="prayer-anonymous"
                className="ml-2 block text-sm text-gray-700"
              >
                Post anonymously
              </label>
            </div>
          </div>

          {displayError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-start"
            >
              <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
              <span>{displayError}</span>
            </motion.div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend className="mr-2" />
                  {submitButtonText}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default PrayerRequestForm;

export type { PrayerRequestFormData, PrayerRequestFormProps };
