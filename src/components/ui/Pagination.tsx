import React from 'react';

interface PaginationProps {
  totalBranches: number;
  currentPage: number;
  itemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({ 
  totalBranches, 
  currentPage, 
  itemsPerPage = 6 
}) => {
  const totalPages = Math.ceil(totalBranches / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalBranches);

  return (
    <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
      {/* Mobile Pagination */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
          Previous
        </button>
        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
          Next
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{totalBranches}</span> branches
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
              <span className="sr-only">Previous</span>
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* Page Numbers */}
            {currentPage > 1 && (
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                {currentPage - 1}
              </button>
            )}

            <button className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer" aria-current="page">
              {currentPage}
            </button>

            {currentPage < totalPages && (
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                {currentPage + 1}
              </button>
            )}

            {currentPage + 1 < totalPages && (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            )}

            {currentPage + 1 < totalPages && (
              <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                {totalPages}
              </button>
            )}

            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
              <span className="sr-only">Next</span>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;