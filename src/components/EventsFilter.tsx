"use client"
import React from "react";
import { FaSearch } from "react-icons/fa";

interface EventFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  branchFilter: string;
  onBranchChange: (branch: string) => void;
  branches: { id: string; name: string }[];
}

const EventFilters: React.FC<EventFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  branchFilter,
  onBranchChange,
  branches
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
          value={branchFilter}
          onChange={(e) => onBranchChange(e.target.value)}
        >
          <option value="all">All Branches</option>
          <option value="main">Main</option>
          {branches.map(branch => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EventFilters;