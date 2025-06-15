"use client";

import { useEffect, useState } from 'react';
import PrayerRequestCard from "@/components/user/PrayerRequest";
import api from '@/lib/axiosInstance';

import { useSession } from 'next-auth/react';
import { useSocketStore } from '@/zustand/socketStore';


type PrayerRequest = {
  _id:string;
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
const {connect,disconnect,updates} = useSocketStore()


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
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-conces-blue">Prayer Wall</h2>
        <p className="text-gray-600 text-sm md:text-base">
          Share your prayer requests and pray for others
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-8">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
          Submit a Prayer Request
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 md:mb-4">
            <label
              htmlFor="title"
              className="block text-sm md:text-base font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newRequest.title}
              onChange={(e) =>
                setNewRequest({ ...newRequest, title: e.target.value })
              }
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
              placeholder="Brief title for your request"
              required
            />
          </div>
          <div className="mb-4 md:mb-5">
            <label
              htmlFor="content"
              className="block text-sm md:text-base font-medium text-gray-700 mb-1"
            >
              Request Details
            </label>
            <textarea
              id="content"
              value={newRequest.content}
              onChange={(e) =>
                setNewRequest({ ...newRequest, content: e.target.value })
              }
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
              rows={4}
              placeholder="Share your prayer request details..."
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-conces-blue text-white px-4 py-2 rounded-lg hover:bg-conces-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>

      <div className="space-y-4 md:space-y-6">
        {prayerRequests.length > 0 ? (
          prayerRequests.map((request,index) => (
            <PrayerRequestCard
              key={index}
              userId={userId}
              request={request}
              onEditSuccess={handleEditSuccess}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            No prayer requests yet. Be the first to share!
          </p>
        )}
      </div>
    </div>
  );
};

export default PrayerWall;