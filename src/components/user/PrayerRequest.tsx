"use client";

import api from "@/lib/axiosInstance";
import { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiHeart,
  FiMessageSquare,
  FiX,
  FiCheck,
  FiLoader,
} from "react-icons/fi";
import { motion } from "framer-motion";

type PrayerRequest = {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  creator?: {
    _id: string;
    fullName: string;
    image: string;
  };
  isAnonymous?: boolean;
};

type PrayerRequestCardProps = {
  request: PrayerRequest;
  userId?: string;
  onEditSuccess?: (updatedRequest: PrayerRequest) => void;
  onDeleteSuccess?: (deletedId: string) => void;
};

const PrayerRequestCard = ({
  request,
  userId,
  onEditSuccess,
  onDeleteSuccess,
}: PrayerRequestCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(request.likes);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: request.title,
    content: request.content,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.put(
        `/prayer-request/${request._id}`,
        editData
      );

      if (onEditSuccess) {
        onEditSuccess(response.data);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating prayer request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await api.delete(`/prayer-request/${request._id}`);
      if (onDeleteSuccess) {
        onDeleteSuccess(request._id);
      }
    } catch (error) {
      console.error("Error deleting prayer request:", error);
    } finally {
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      {isEditing ? (
        <div className="p-6 space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800"
            placeholder="Request title"
          />
          <textarea
            value={editData.content}
            onChange={(e) =>
              setEditData({ ...editData, content: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800 min-h-[150px]"
            placeholder="Your prayer request..."
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition flex items-center"
            >
              <FiX className="mr-2" /> Cancel
            </button>
            <button
              onClick={handleEdit}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-70 transition flex items-center shadow-md hover:shadow-indigo-200"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <FiCheck className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 pb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {request.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>
                    {request.isAnonymous
                      ? "Anonymous"
                      : request.creator?.fullName || "Unknown"}
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(request.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {userId && userId === request.creator?._id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-500 hover:text-indigo-600 transition p-2 rounded-full hover:bg-indigo-50"
                    title="Edit"
                  >
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-gray-500 hover:text-red-600 transition p-2 rounded-full hover:bg-red-50"
                    title="Delete"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
              {request.content}
            </p>

            <div className="flex justify-end space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 ${
                  isLiked ? "text-rose-500" : "text-gray-400"
                } hover:text-rose-500 transition`}
              >
                <span className="font-medium">{likeCount}</span>
                <FiHeart
                  className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                />
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-indigo-500 transition">
                <span className="font-medium">{request.comments}</span>
                <FiMessageSquare className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Accent bar at bottom */}
          <div className="h-1.5 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl max-w-md w-full shadow-xl border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this prayer request? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition flex items-center"
              >
                <FiX className="mr-2" /> Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-70 transition flex items-center shadow-md hover:shadow-red-200"
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PrayerRequestCard;
