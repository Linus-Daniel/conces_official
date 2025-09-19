"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  page: number;
  totalPages: number;
}

export function Pagination({ page, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 flex justify-between sm:hidden">
        <Link
          href={createPageUrl(page - 1)}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            hasPrev
              ? "bg-white text-gray-700 hover:bg-gray-50"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-disabled={!hasPrev}
        >
          Previous
        </Link>
        <Link
          href={createPageUrl(page + 1)}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            hasNext
              ? "bg-white text-gray-700 hover:bg-gray-50"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-disabled={!hasNext}
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{page}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <Link
              href={createPageUrl(page - 1)}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                hasPrev
                  ? "text-gray-500 hover:bg-gray-50"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              aria-disabled={!hasPrev}
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="h-5 w-5" />
            </Link>
            
            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={createPageUrl(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  pageNum === page
                    ? "z-10 bg-royal-DEFAULT border-royal-DEFAULT text-white"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </Link>
            ))}

            <Link
              href={createPageUrl(page + 1)}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                hasNext
                  ? "text-gray-500 hover:bg-gray-50"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              aria-disabled={!hasNext}
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}