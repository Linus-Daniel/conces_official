"use client";

import { useEffect, useState } from "react";
import PrayerRequestCard from "@/components/user/PrayerRequest";
import api from "@/lib/axiosInstance";
import { useSession } from "next-auth/react";
import { useSocketStore } from "@/zustand/socketStore";
import { motion } from "framer-motion";
import {
  FiSend,
  FiEdit2,
  FiLoader,
  FiAlertCircle,
  FiPlusCircle,
  FiHeart,
  FiMessageSquare,
} from "react-icons/fi";
import { FaPray } from "react-icons/fa";

type PrayerRequest = {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  isAnonymous?: boolean;
};

type PrayerWallProps = {
  initialPrayerRequests: PrayerRequest[];
};

const PrayerWall = ({ initialPrayerRequests }: PrayerWallProps) => {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(
    initialPrayerRequests
  );
  const [newRequest, setNewRequest] = useState({
    title: "",
    content: "",
    isAnonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const { connect, disconnect, updates } = useSocketStore();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  const userId = session?.user?.id || "";

  const handleDeleteSuccess = (deletedId: string) => {
    setPrayerRequests(prayerRequests.filter((req) => req._id !== deletedId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await api.post(`/prayer-request`, {
        title: newRequest.title,
        content: newRequest.content,
        isAnonymous: newRequest.isAnonymous,
      });

      setPrayerRequests([response.data, ...prayerRequests]);
      setNewRequest({ title: "", content: "", isAnonymous: false });
    } catch (err) {
      console.error("Error submitting prayer request:", err);
      setError("Failed to submit prayer request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSuccess = (updatedRequest: PrayerRequest) => {
    setPrayerRequests(
      prayerRequests.map((req) =>
        req._id === updatedRequest._id ? updatedRequest : req
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-50 mb-4">
          <FaPray className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Prayer Community
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Share your prayer needs and intercede for others in our caring
          community
        </p>
      </motion.div>

      {/* Prayer Request Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-indigo-50 mr-4 text-indigo-600">
              <FiPlusCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              New Prayer Request
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                >
                  <FiEdit2 className="mr-2 text-gray-400" />
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newRequest.title}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, title: e.target.value })
                  }
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Brief title for your request"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                >
                  <FiMessageSquare className="mr-2 text-gray-400" />
                  Details
                </label>
                <textarea
                  id="content"
                  value={newRequest.content}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, content: e.target.value })
                  }
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[150px]"
                  placeholder="Share your prayer request details..."
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  checked={newRequest.isAnonymous}
                  onChange={(e) =>
                    setNewRequest({
                      ...newRequest,
                      isAnonymous: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isAnonymous"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Post anonymously
                </label>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-start"
              >
                <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
                <span>{error}</span>
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
                    Post Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Prayer Requests List */}
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <FiHeart className="h-5 w-5 text-rose-500 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Recent Prayer Requests
          </h2>
          <span className="ml-3 px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
            {prayerRequests.length} requests
          </span>
        </div>

        <div className="space-y-6">
          {prayerRequests.length > 0 ? (
            prayerRequests.map((request, index) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:shadow-md transition-shadow"
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
              className="text-center py-16 bg-gray-50 rounded-2xl"
            >
              <div className="mx-auto h-24 w-24 text-gray-300 mb-4 flex items-center justify-center">
                <FaPray className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-medium text-gray-500">
                No prayer requests yet
              </h3>
              <p className="mt-2 text-gray-400">
                Be the first to share your prayer need
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-4 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium rounded-lg transition-colors"
              >
                Share your request
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerWall;
