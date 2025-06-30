"use client";

import { useEffect, useState } from 'react';
import PrayerRequestCard from "@/components/user/PrayerRequest";
import api from '@/lib/axiosInstance';
import { useSession } from 'next-auth/react';
import { useSocketStore } from '@/zustand/socketStore';
import { motion } from 'framer-motion';

type PrayerRequest = {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
};

type PrayerWallProps = {
  initialPrayerRequests: PrayerRequest[];
};

const PrayerWall = ({ initialPrayerRequests }: PrayerWallProps) => {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(initialPrayerRequests);
  const [newRequest, setNewRequest] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const { connect, disconnect, updates } = useSocketStore();

  useEffect(() => {
    connect(); // Connect on mount
    return () => {
      disconnect(); // Clean up on unmount
    };
  }, [connect, disconnect]);

  const userId = session?.user?.id || "";

  const handleDeleteSuccess = (deletedId: string) => {
    setPrayerRequests(prayerRequests.filter(req => req._id !== deletedId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await api.post(`/prayer-request`, {
        title: newRequest.title,
        content: newRequest.content
      });

      setPrayerRequests([response.data, ...prayerRequests]);
      setNewRequest({ title: "", content: "" });
    } catch (err) {
      console.error('Error submitting prayer request:', err);
      setError('Failed to submit prayer request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSuccess = (updatedRequest: PrayerRequest) => {
    setPrayerRequests(prayerRequests.map(req => 
      req._id === updatedRequest._id ? updatedRequest : req
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Prayer Wall
        </h2>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Share your prayer needs and lift up others in prayer
        </p>
      </motion.div>

      {/* Prayer Request Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-12 border border-gray-100"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-blue-50 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Share Your Prayer Request
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newRequest.title}
                onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Brief title for your request"
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Request Details
              </label>
              <textarea
                id="content"
                value={newRequest.content}
                onChange={(e) => setNewRequest({ ...newRequest, content: e.target.value })}
                className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px]"
                placeholder="Share your prayer request details..."
                required
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Post Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Prayer Requests List */}
      <div className="space-y-6">
        {prayerRequests.length > 0 ? (
          prayerRequests.map((request, index) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <PrayerRequestCard
                userId={userId}
                request={request}
                onEditSuccess={handleEditSuccess}
                onDeleteSuccess={handleDeleteSuccess}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500">No prayer requests yet</h3>
            <p className="mt-1 text-gray-400">Be the first to share your prayer need</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PrayerWall;