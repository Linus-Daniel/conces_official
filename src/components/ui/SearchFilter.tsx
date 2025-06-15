import React from 'react';

const SearchFilters = () => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fa-solid fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search branches, leaders, or locations..."
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <i className="fa-solid fa-map-marker-alt mr-2 text-gray-500"></i>
              Region/Zone
              <i className="fa-solid fa-chevron-down ml-2 text-gray-500"></i>
            </button>
          </div>

          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <i className="fa-solid fa-circle-dot mr-2 text-gray-500"></i>
              Status
              <i className="fa-solid fa-chevron-down ml-2 text-gray-500"></i>
            </button>
          </div>

          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <i className="fa-solid fa-chart-simple mr-2 text-gray-500"></i>
              Engagement
              <i className="fa-solid fa-chevron-down ml-2 text-gray-500"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;