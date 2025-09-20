// ChapterOversight.tsx
"use client";

import { useState } from "react";
import Head from "next/head";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChapterSummary from "@/components/ui/ChapterSummary";
import SearchFilters from "@/components/ui/SearchFilter";
import ChapterCard from "@/components/ui/ChapterCard";
import CreateChapterModal from "@/components/CreateChapter";
import ViewActions from "@/components/ViewAction";
import api from "@/lib/axiosInstance";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Loader2, AlertCircle, Search } from "lucide-react";

interface Chapter {
  _id: string;
  id?: number | string; // Support both number and string IDs
  chapterName: string; // or 'name' depending on your API
  name?: string; // fallback
  status?: "Active" | "Inactive" | "No Leader" | "Pending";
  chapterLocation: string; // or 'location'
  location?: string; // fallback
  members?: number;
  totalMembers?: number; // Alternative field name
  events?: number;
  upcomingEvents?: number; // Alternative field name
  lastActivity?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  motto?: string;
  description?: string;
}


interface ChaptersResponse {
  chapters: Chapter[];
  totalChapters: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

// API Functions
const fetchChapters = async (
  page: number,
  filters?: any
): Promise<ChaptersResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: "9", // Better for 3-column grid
    ...filters,
  });

  const { data } = await api.get<ChaptersResponse>(`/chapters?${params}`);
  return data;
};

// Loading Component
const ChapterLoadingSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow animate-pulse">
        <div className="p-6">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    ))}
  </div>
);

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-12">
    <Search className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-semibold text-gray-900">
      No chapters found
    </h3>
    <p className="mt-1 text-sm text-gray-500">
      Try adjusting your filters or create a new chapter.
    </p>
  </div>
);

// Error State Component
const ErrorState = ({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) => (
  <div className="rounded-lg bg-red-50 p-6 text-center">
    <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
    <h3 className="mt-2 text-sm font-semibold text-gray-900">
      Error loading chapters
    </h3>
    <p className="mt-1 text-sm text-gray-500">{error.message}</p>
    <button
      onClick={onRetry}
      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Try Again
    </button>
  </div>
);

// Pagination Helper
const generatePaginationItems = (currentPage: number, totalPages: number) => {
  const items: (number | "ellipsis")[] = [];
  const maxVisible = 7;

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  items.push(1);

  if (currentPage > 3) {
    items.push("ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  if (currentPage < totalPages - 2) {
    items.push("ellipsis");
  }

  items.push(totalPages);

  return items;
};

const ChapterOversight = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    hasLeader: "all",
  });

  const queryClient = useQueryClient();

  // Fetch chapters with React Query
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["chapters", currentPage, filters],
    queryFn: () => fetchChapters(currentPage, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Prefetch next page
  const prefetchNextPage = () => {
    if (data && currentPage < data.totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["chapters", currentPage + 1, filters],
        queryFn: () => fetchChapters(currentPage + 1, filters),
        staleTime: 5 * 60 * 1000,
      });
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= (data?.totalPages || 1)) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCreateSuccess = async () => {
    setIsModalOpen(false);
    // Invalidate and refetch chapters
    await queryClient.invalidateQueries({ queryKey: ["chapters"] });
    await queryClient.invalidateQueries({ queryKey: ["chapterStats"] });
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const paginationItems = data
    ? generatePaginationItems(currentPage, data.totalPages)
    : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Chapter Oversight | CONCES Admin</title>
        <meta name="description" content="Chapter management dashboard" />
      </Head>

      <main className="flex-1 overflow-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Chapter Summary with dynamic data */}
          <ChapterSummary />

          {/* Search and Filters */}
          <SearchFilters />

          {/* View Actions */}
          <ViewActions
            chapterCount={data?.totalChapters || 0}
            onAddChapter={() => setIsModalOpen(true)}
          />

          {/* Content Area */}
          {isLoading ? (
            <ChapterLoadingSkeleton />
          ) : error ? (
            <ErrorState error={error as Error} onRetry={refetch} />
          ) : !data || data.chapters.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Chapter Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.chapters.map((chapter) => (
                  <ChapterCard
                    key={chapter.id}
                    chapter={chapter}

                  />
                ))}
              </div>

              {/* Pagination */}
              {data.totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {paginationItems.map((item, index) => (
                      <PaginationItem key={index}>
                        {item === "ellipsis" ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href="#"
                            isActive={item === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(item);
                            }}
                            className="cursor-pointer"
                          >
                            {item}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                        className={
                          currentPage === data.totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}

          {/* Loading Overlay for refetching */}
          {isFetching && !isLoading && (
            <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-2 z-50">
              <Loader2 className="h-4 w-4 animate-spin text-royal-600" />
              <span className="text-sm text-gray-600">Updating...</span>
            </div>
          )}
        </div>
      </main>

      <CreateChapterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default ChapterOversight;
