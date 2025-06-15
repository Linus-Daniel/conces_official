"use client"
import React from "react";
import { FaSearch } from "react-icons/fa";

interface PrayerFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
}

const PrayerFilters: React.FC<PrayerFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortOption,
  onSortChange
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search prayers..."
            className="w-full text-gray-800 placeholder:text-gray-400 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <FaSearch className="absolute placeholder:text-gray-400 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <select
          className="border text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option className="mt" value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          className="border text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="mostPrayed">Most Prayed</option>
        </select>
      </div>
    </div>
  );
};

export default PrayerFilters;