"use client";

import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Posts from "@/components/Community";
import api from "@/lib/axiosInstance";
import {

  Activity,
  AlertCircle,
  Loader2,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { JSX } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaPray, FaStore, FaUsers } from "react-icons/fa";


export type Post = {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  type: "discussion" | "project" | "announcement";
  likes: number;
  comments: number;
  images?: string[];
  prayed?: number;
};


interface Stats{
  users:number;
  prayers:number;
  products:number;
  events:number;
}


// Skeleton loader component
const StatSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
    <div className="flex justify-between">
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

// Custom hooks for data fetching
const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await api.get("/community/posts");
      return response.data as Post[];
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep in cache for 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

const useChapterStats = (chapterId: string | undefined) => {
  return useQuery({
    queryKey: ["chapterStats", chapterId],
    queryFn: async () => {
      if (!chapterId) return ;
      const response = await api.get(`/chapters/${chapterId}/stats`);
      const statsData = response.data as Stats;
      return statsData
    },
    enabled: !!chapterId, // Only run query if chapterId exists
    staleTime: 1000 * 60 * 3, // Consider data fresh for 3 minutes
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// Combined query hook for dashboard data
const useDashboardData = (chapterId: string | undefined) => {
  const postsQuery = usePosts();
  const statsQuery = useChapterStats(chapterId);

  return {
    posts: postsQuery.data || [],
    stats: statsQuery.data || {users:0,prayers:0,products:0,events:0},  
    isLoading: postsQuery.isLoading || statsQuery.isLoading,
    isPending: postsQuery.isPending || statsQuery.isPending,
    isError: postsQuery.isError || statsQuery.isError,
    error: postsQuery.error || statsQuery.error,
    refetch: async () => {
      await Promise.all([postsQuery.refetch(), statsQuery.refetch()]);
    },
    isRefetching: postsQuery.isRefetching || statsQuery.isRefetching,
    dataUpdatedAt: Math.max(
      postsQuery.dataUpdatedAt || 0,
      statsQuery.dataUpdatedAt || 0
    ),
  };
};

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const user = session?.user;
  const userRole = user?.role;
  const authorized = userRole === "admin" || userRole === "chapter-admin";

  const {
    posts,
    stats,
    isLoading,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
    dataUpdatedAt,
  } = useDashboardData(user?.chapter);

  // Calculate time since last update
  const getTimeSinceUpdate = () => {
    if (!dataUpdatedAt) return null;
    const seconds = Math.floor((Date.now() - dataUpdatedAt) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // Handle manual refresh
  const handleRefresh = () => {
    refetch();
    // Optionally invalidate specific queries
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    queryClient.invalidateQueries({ queryKey: ["chapterStats"] });
  };

  const totalUsers = stats.users || 0;
  const totalEvents = stats.events || 0;
  const totalPrayers = stats.prayers || 0;
  const totalProducts = stats.products || 0;
  const totalResources = stats.products || 0;

  

    const statsData = [
      { id: 1, name: 'Total Users', value: totalUsers, icon: <FaUsers className="text-2xl" />, },
      { id: 2, name: 'Prayer Requests', value:totalPrayers, icon: <FaPray className="text-2xl" />,  },
      { id: 3, name: 'Store Products', value: totalProducts, icon: <FaStore className="text-2xl" />,  },
      { id: 4, name: 'Upcoming Events', value:totalEvents,  icon: <FaCalendarAlt className="text-2xl" />, change: '+2', },
      { id: 4, name: 'Resources', value:totalResources,  icon: <FaCalendarAlt className="text-2xl" />, change: '+2', }

    ];

  // Loading state for entire page
  if (status === "loading" || (isPending && !posts.length && !stats)) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 bg-gray-200 rounded-lg w-64 mb-8 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <StatSkeleton key={i} />
            ))}
          </div>

          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-royal-DEFAULT" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Section with Refresh and Status */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.name || "User"}! Here's what's happening in
                your chapter.
              </p>
            </div>

            {/* Status and Refresh Controls */}
            <div className="flex items-center gap-3">
              {/* Connection Status */}
              <div className="flex items-center gap-2 text-sm">
                {navigator.onLine ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-red-500" />
                    <span className="text-gray-600">Offline</span>
                  </>
                )}
              </div>

              {/* Last Updated */}
              {dataUpdatedAt > 0 && (
                <div className="text-sm text-gray-500">
                  Updated {getTimeSinceUpdate()}
                </div>
              )}

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefetching}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`}
                />
                <span className="text-sm font-medium">
                  {isRefetching ? "Refreshing..." : "Refresh"}
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Error Alert */}
        {isError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-800 font-medium">Error loading data</p>
                <p className="text-red-600 text-sm mt-1">
                  {error?.message ||
                    "Failed to load dashboard data. Please try again."}
                </p>
                <button
                  onClick={handleRefresh}
                  className="mt-3 text-sm text-red-700 hover:text-red-800 font-medium underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Stats Grid with Loading Overlay */}
        <div className="relative">
          {/* Loading Overlay */}
          {isRefetching && stats && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
              <Loader2 className="w-6 h-6 animate-spin text-royal-DEFAULT" />
            </div>
          )}

          {/* Show stats grid when we have data OR when loading for the first time */}
          {(stats || isLoading) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
              {isLoading && !stats
                ? // Show skeleton loaders when loading
                  [...Array(4)].map((_, i) => <StatSkeleton key={i} />)
                : // Show actual stats when data is available
                  statsData.map((stat, index) => (
                    <div
                      key={stat.id}
                      className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            {stat.name}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 mb-2 tabular-nums">
                            {stat.value}
                          </p>
                       
                        </div>
                        <div
                          className={`p-3 rounded-xl transition-colors duration-300 ${
                            index % 3 === 0
                              ? "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 group-hover:from-blue-200 group-hover:to-blue-300"
                              : index % 3 === 1
                              ? "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 group-hover:from-purple-200 group-hover:to-purple-300"
                              : "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 group-hover:from-amber-200 group-hover:to-amber-300"
                          }`}
                        >
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
        {/* No Stats Message - only show if not loading and no stats and user has chapter */}
        {!isLoading && !stats && user?.chapter && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No statistics available</p>
            <p className="text-gray-500 text-sm mt-2">
              Stats will appear here once data is available for your chapter
            </p>
          </div>
        )}
        {/* No Stats Message */}
        {!isLoading && !stats && user?.chapter && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No statistics available</p>
            <p className="text-gray-500 text-sm mt-2">
              Stats will appear here once data is available for your chapter
            </p>
          </div>
        )}
        {/* Posts Section with Loading State */}
        <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {isRefetching && posts.length > 0 && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
              <Loader2 className="w-6 h-6 animate-spin text-royal-DEFAULT" />
            </div>
          )}
          <Posts authorized={authorized} posts={posts} />
        </div>
        {/* Prefetch hint for better UX */}
        {posts.length === 0 && !isLoading && (
          <div className="mt-4 text-center text-sm text-gray-500">
            No posts to display. Check back later for updates!
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
