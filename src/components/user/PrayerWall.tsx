"use client";

import { useEffect, useState } from "react";
import PrayerRequestCard from "@/components/user/PrayerRequest";
import PrayerRequestForm, {
  PrayerRequestFormData,
} from "@/components/PrayerRequestForm";
import api from "@/lib/axiosInstance";
import { useSession } from "next-auth/react";
import { useSocketStore } from "@/zustand/socketStore";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
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

  const handlePrayerRequestSubmit = async (data: PrayerRequestFormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await api.post(`/prayer-request`, {
        title: data.title,
        content: data.content,
        isAnonymous: data.isAnonymous,
      });

      setPrayerRequests([response.data, ...prayerRequests]);
    } catch (err) {
      console.error("Error submitting prayer request:", err);
      setSubmitError("Failed to submit prayer request. Please try again.");
      throw err; // Re-throw to let the form handle the error
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
      <div className="mb-12">
        <PrayerRequestForm
          onSubmit={handlePrayerRequestSubmit}
          isSubmitting={isSubmitting}
          error={submitError}
          title="New Prayer Request"
          description="Share your prayer needs with the community"
        />
      </div>

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
