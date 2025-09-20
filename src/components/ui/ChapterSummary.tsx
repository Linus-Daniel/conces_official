// ChapterSummary.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBuilding,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowUp,
  FaArrowDown,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import api from "@/lib/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";

// Types
interface ChapterStats {
  totalChapters: number;
  activeChapters: number;
  chaptersWithoutLeaders: number;
  totalMembers: number;
  recentlyAdded: number;
  trends: {
    activePercentage: number;
    activeChange: "up" | "down" | "stable";
    withoutLeadersPercentage: number;
    withoutLeadersChange: "up" | "down" | "stable";
    memberGrowth: number;
  };
}

// API Function
const fetchChapterStats = async (): Promise<ChapterStats> => {
  const { data } = await api.get<ChapterStats>("/chapters/stats");
  return data;
};

// Loading Skeleton
const StatSkeleton = () => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <Skeleton className="h-12 w-12 rounded-md" />
        <div className="ml-5 flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  </div>
);

const ChapterSummary = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chapterStats"],
    queryFn: fetchChapterStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });

  // Generate stat cards dynamically based on data
  const generateStatCards = () => {
    if (!stats) return [];

    return [
      {
        title: "Total Chapters",
        value: stats.totalChapters,
        icon: <FaBuilding className="text-royal-600 text-xl" />,
        iconBg: "bg-royal-100",
      },
      {
        title: "Active Chapters",
        value: stats.activeChapters,
        icon: <FaCheckCircle className="text-green-600 text-xl" />,
        iconBg: "bg-green-100",
        trend: {
          icon:
            stats.trends.activeChange === "up" ? (
              <FaArrowUp />
            ) : (
              <FaArrowDown />
            ),
          value: `${stats.trends.activePercentage}%`,
          textColor:
            stats.trends.activeChange === "up"
              ? "text-green-600"
              : "text-red-600",
        },
      },
      {
        title: "Chapters w/o Leaders",
        value: stats.chaptersWithoutLeaders,
        icon: <FaExclamationCircle className="text-red-600 text-xl" />,
        iconBg: "bg-red-100",
        trend: {
          icon:
            stats.trends.withoutLeadersChange === "down" ? (
              <FaArrowDown />
            ) : (
              <FaArrowUp />
            ),
          value: `${stats.trends.withoutLeadersPercentage}%`,
          textColor:
            stats.trends.withoutLeadersChange === "down"
              ? "text-green-600"
              : "text-red-600",
        },
      },
      {
        title: "Total Members",
        value: stats.totalMembers.toLocaleString(),
        icon: <FaUsers className="text-blue-600 text-xl" />,
        iconBg: "bg-blue-100",
        trend:
          stats.trends.memberGrowth > 0
            ? {
                icon: <FaArrowUp />,
                value: `+${stats.trends.memberGrowth}%`,
                textColor: "text-green-600",
              }
            : undefined,
      },
      {
        title: "Recently Added",
        value: stats.recentlyAdded,
        icon: <FaClock className="text-purple-600 text-xl" />,
        iconBg: "bg-purple-100",
        subtext: "Last 30 days",
      },
    ];
  };

  if (isLoading) {
    return (
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, index) => (
          <StatSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-600">
          Failed to load chapter statistics
        </p>
      </div>
    );
  }

  const statCards = generateStatCards();

  return (
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {statCards.map((item, index) => (
        <div
          key={index}
          className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-md p-3 ${item.iconBg}`}>
                {item.icon}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.title}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {item.value}
                    </div>
                    {item.trend && (
                      <div
                        className={`ml-2 text-sm flex items-center gap-1 ${item.trend.textColor}`}
                      >
                        {item.trend.icon}
                        <span>{item.trend.value}</span>
                      </div>
                    )}
                  </dd>
                  {item.subtext && (
                    <dd className="text-xs text-gray-500 mt-1">
                      {item.subtext}
                    </dd>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChapterSummary;
