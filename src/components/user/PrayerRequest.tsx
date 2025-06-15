"use client";

import api from '@/lib/axiosInstance';
import { useState } from 'react';

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
};

type PrayerRequestCardProps = {
  request: PrayerRequest;
  userId?: string;
  onEditSuccess?: (updatedRequest: PrayerRequest) => void;
  onDeleteSuccess?: (deletedId: string) => void;
};

const PrayerRequestCard = ({ request, userId, onEditSuccess, onDeleteSuccess }: PrayerRequestCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(request.likes);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: request.title,
    content: request.content
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.put(`/prayer-request/${request._id}`, editData);
      
      if (onEditSuccess) {
        onEditSuccess(response.data);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating prayer request:', error);
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
      console.error('Error deleting prayer request:', error);
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-royal-100 hover:shadow-royal-200/30 transition-shadow duration-300">
      {isEditing ? (
        <div className="p-6 space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className="w-full px-4 py-2 border border-royal-200 rounded-lg focus:ring-2 focus:ring-royal-300 focus:border-royal-300 outline-none transition"
            placeholder="Request title"
          />
          <textarea
            value={editData.content}
            onChange={(e) => setEditData({...editData, content: e.target.value})}
            className="w-full px-4 py-2 border border-royal-200 rounded-lg focus:ring-2 focus:ring-royal-300 focus:border-royal-300 outline-none transition"
            rows={4}
            placeholder="Your prayer request..."
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-royal-700 border border-royal-200 rounded-lg hover:bg-royal-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-royal-600 text-white rounded-lg hover:bg-royal-700 disabled:opacity-50 transition flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-royal-800 mb-1">
                  {request.title}
                </h3>
                <div className="flex items-center text-sm text-royal-500 mb-4">
                  <span>By {request.creator?.fullName || 'Anonymous'}</span>
                  <span className="mx-2">•</span>
                  <span>{request.date}</span>
                </div>
              </div>
              
              {userId && userId === request.creator?._id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-royal-500 hover:text-royal-700 transition p-1 rounded-full hover:bg-royal-50"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-red-500 hover:text-red-700 transition p-1 rounded-full hover:bg-red-50"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <p className="text-royal-700 mb-6 leading-relaxed">
              {request.content}
            </p>
            
            <div className="flex justify-end space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 ${isLiked ? 'text-royal-600' : 'text-royal-400'} hover:text-royal-600 transition`}
              >
                <span className="font-medium">{likeCount}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={isLiked ? 0 : 2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="flex items-center space-x-2 text-royal-400 hover:text-royal-600 transition">
                <span className="font-medium">{request.comments}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Gold accent bar at bottom */}
          <div className="h-1 bg-gradient-to-r from-gold-300 to-gold-500"></div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4 shadow-xl border border-royal-100">
            <h3 className="text-xl font-bold text-royal-800 mb-3">Confirm Deletion</h3>
            <p className="text-royal-600 mb-6">Are you sure you want to delete this prayer request? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-royal-200 text-royal-700 rounded-lg hover:bg-royal-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerRequestCard;