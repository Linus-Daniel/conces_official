"use client";
import api from "@/lib/axiosInstance";
import Link from "next/link";
import React, { useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaBook,
  FaFilePdf,
  FaVideo,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import {
  ApprovalSystem,
  createApprovalComponents,
} from "@/components/admin/ApprovalSystem";
import { useApprovalSystem } from "@/hooks/useApprove";
import { Loader2, AlertCircle, Wifi, WifiOff, RefreshCcw } from "lucide-react";

export type Content = {
  _id: string;
  title: string;
  type: "devotional" | "pdf" | "video" | "blog" | "article" | "other";
  category: string;
  author?: string;
  videoUrl: string;
  content: string;
  date: string;
  views: number;
  fileUrl?: string;
  approved: boolean;
  featured: boolean;
};

// Custom hook for fetching resources
const useResources = (chapterId: string | undefined) => {
  return useQuery({
    queryKey: ["resources", chapterId],
    queryFn: async () => {
      if (!chapterId) {
        throw new Error("No chapter ID provided");
      }
      const response = await api.get(`/chapters/${chapterId}/resources`);
      return response.data as Content[];
    },
    enabled: !!chapterId, // Only run query if chapterId exists
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Skeleton loader for table rows
const ResourceRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="ml-4">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
      </div>
    </td>
  </tr>
);

export default function ContentManagement() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const user = session?.user;
  const userRole = session?.user?.role || "user";
  const userChapter = user?.chapter;

  // React Query for fetching resources
  const {
    data: resources = [],
    isLoading,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
    dataUpdatedAt,
  } = useResources(userChapter);

  // Approval system with React Query data
  const approvalSystem = useApprovalSystem({
    items: resources,
    setItems: React.useCallback(
      (updater: React.SetStateAction<Content[]>) => {
        // Handle both direct values and updater functions
        const newResources =
          typeof updater === "function" ? updater(resources) : updater;

        // Update the query cache when items change
        queryClient.setQueryData(["resources", userChapter], newResources);
      },
      [resources, queryClient, userChapter]
    ),
    entity: "resources",
    userRole,
  });
  // Create reusable table components
  const { ApprovalBadge, ApprovalActions, SelectAllCheckbox, ItemCheckbox } =
    createApprovalComponents<Content>(approvalSystem);

  // Custom filters state
  const [selectedType, setSelectedType] = React.useState("all");

  // Apply type filter to already approval-filtered items
  const finalFilteredItems = useMemo(() => {
    return approvalSystem.filteredItems.filter((content) => {
      const matchesType =
        selectedType === "all" || content.type === selectedType;
      return matchesType;
    });
  }, [approvalSystem.filteredItems, selectedType]);

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
    queryClient.invalidateQueries({ queryKey: ["resources"] });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="text-red-500" />;
      case "video":
        return <FaVideo className="text-blue-500" />;
      default:
        return <FaBook className="text-royal-DEFAULT" />;
    }
  };

  const clearAllFilters = () => {
    approvalSystem.clearFilters();
    setSelectedType("all");
  };

  // Show loading state on first load
  if (isLoading && !resources.length) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-royal-DEFAULT" />
            <span className="ml-2 text-gray-600">Loading resources...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Section with Status and Refresh */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-royal-DEFAULT">
            Resources Management
          </h2>

          {/* Status indicators */}
          <div className="flex items-center gap-3 text-sm">
            {/* Connection Status */}
            {navigator.onLine ? (
              <div className="flex items-center gap-1 text-green-600">
                <Wifi className="w-4 h-4" />
                <span>Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600">
                <WifiOff className="w-4 h-4" />
                <span>Offline</span>
              </div>
            )}

            {/* Last Updated */}
            {dataUpdatedAt > 0 && (
              <span className="text-gray-500">
                Updated {getTimeSinceUpdate()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefetching}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCcw
              className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`}
            />
            <span className="text-sm">
              {isRefetching ? "Refreshing..." : "Refresh"}
            </span>
          </button>

          {/* Add Resource Button */}
          <Link
            href={"/chapter/resources/new"}
            className="bg-royal-DEFAULT text-white px-4 py-2 rounded-lg flex items-center hover:bg-royal-dark transition"
          >
            <FaPlus className="mr-2" /> Add Resource
          </Link>
        </div>
      </div>

      {/* Error Alert */}
      {isError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">
                Error loading resources
              </p>
              <p className="text-red-600 text-sm mt-1">
                {error?.message ||
                  "Failed to load resources. Please try again."}
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

      {/* Approval System with filters */}
      {resources.length > 0 && (
        <ApprovalSystem
          {...approvalSystem}
          totalItems={resources.length}
          searchFields={["title", "category", "author"]}
          searchPlaceholder="Search resources..."
          additionalFilters={
            <>
              {/* Type Filter */}
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="devotional">Devotional</option>
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
                <option value="blog">Blog</option>
                <option value="article">Article</option>
              </select>
            </>
          }
        />
      )}

      {/* Clear filters button */}
      {resources.length > 0 && (
        <div className="px-4">
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Results count */}
      {resources.length > 0 && (
        <div className="px-4 text-sm text-gray-600">
          Showing {finalFilteredItems.length} of {resources.length} resources
        </div>
      )}

      {/* Resources Table */}
      <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Loading Overlay */}
        {isRefetching && resources.length > 0 && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-royal-DEFAULT" />
          </div>
        )}

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {approvalSystem.canApprove && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <SelectAllCheckbox />
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Show skeleton loaders during initial load */}
            {isLoading && !resources.length
              ? [...Array(5)].map((_, i) => <ResourceRowSkeleton key={i} />)
              : finalFilteredItems.map((content) => (
                  <tr key={content._id}>
                    {approvalSystem.canApprove && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ItemCheckbox item={content} />
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getTypeIcon(content.type)}
                        </div>
                        <div className="ml-4">
                          <Link
                            href={`/chapter/resources/${content._id}`}
                            className="text-sm font-medium text-gray-900 hover:text-royal-DEFAULT"
                          >
                            {content.title}
                          </Link>
                          <div className="text-sm text-gray-500">
                            {content.date}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full capitalize ${
                          content.type === "devotional"
                            ? "bg-royal-100 text-royal-DEFAULT"
                            : content.type === "pdf"
                            ? "bg-red-100 text-red-800"
                            : content.type === "video"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {content.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {content.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {content.author || "Linus Daniel"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ApprovalBadge approved={content.approved} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-royal-DEFAULT hover:text-royal-dark">
                          <FaEdit />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                        <ApprovalActions item={content} />
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {/* Empty states */}
        {!isLoading && resources.length === 0 && !userChapter && (
          <div className="text-center py-12 px-4">
            <FaBook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No chapter assigned</p>
            <p className="text-gray-500 text-sm mt-2">
              Please contact your administrator to assign you to a chapter
            </p>
          </div>
        )}

        {!isLoading && resources.length === 0 && userChapter && (
          <div className="text-center py-12 px-4">
            <FaBook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No resources found</p>
            <p className="text-gray-500 text-sm mt-2">
              Get started by creating your first resource
            </p>
            <Link
              href="/chapter/resources/new"
              className="mt-4 inline-flex items-center px-4 py-2 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-dark transition"
            >
              <FaPlus className="mr-2" />
              Add Resource
            </Link>
          </div>
        )}

        {finalFilteredItems.length === 0 && resources.length > 0 && (
          <div className="text-center py-12 px-4">
            <FaSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">
              No resources found matching your filters
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search criteria or clearing the filters
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-4 text-royal-DEFAULT hover:text-royal-dark font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
