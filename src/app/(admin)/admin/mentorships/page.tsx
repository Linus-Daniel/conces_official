"use client";

import { useState, useEffect } from "react";
import { FiEye, FiCheck, FiX, FiUsers, FiClock, FiSearch, FiTrash } from "react-icons/fi";
import { showSuccess, showError } from "@/lib/toast";

interface Mentorship {
  _id: string;
  mentorId: {
    _id: string;
    fullName: string;
    email: string;
  };
  menteeId: {
    _id: string;
    fullName: string;
    email: string;
  };
  status: "pending" | "active" | "completed" | "cancelled";
  createdAt: string;
  topic?: string;
  description?: string;
}

export default function MentorshipsPage() {
  const [mentorships, setMentorships] = useState<Mentorship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchMentorships = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/mentorships");
      const data = await response.json();

      if (response.ok) {
        setMentorships(data.mentorships || []);
      } else {
        await showError(data.error || "Failed to fetch mentorships");
      }
    } catch (error) {
      await showError("Failed to fetch mentorships");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentorships();
  }, []);

  const updateMentorshipStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/mentorships/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await showSuccess(`Mentorship ${status} successfully`);
        fetchMentorships();
      } else {
        const data = await response.json();
        await showError(data.error || "Failed to update mentorship");
      }
    } catch (error) {
      await showError("Failed to update mentorship");
      console.error(error);
    }
  };

  const deleteMentorship = async (id: string, mentorName: string, menteeName: string) => {
    if (!confirm(`Are you sure you want to delete the mentorship between ${mentorName} and ${menteeName}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/mentorships/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await showSuccess("Mentorship deleted successfully");
        fetchMentorships();
      } else {
        const data = await response.json();
        await showError(data.error || "Failed to delete mentorship");
      }
    } catch (error) {
      await showError("Failed to delete mentorship");
      console.error(error);
    }
  };

  const filteredMentorships = mentorships.filter((mentorship) => {
    const matchesSearch = 
      mentorship.mentorId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.menteeId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.mentorId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentorship.menteeId?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || mentorship.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMentorships.length / itemsPerPage);
  const paginatedMentorships = filteredMentorships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FiUsers className="mr-3" />
                Mentorship Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and monitor all mentorship relationships
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiClock className="mr-1" />
              Total: {mentorships.length} mentorships
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Mentorships
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by mentor or mentee name/email..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchMentorships}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Mentorships Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {paginatedMentorships.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FiUsers className="mx-auto mb-4 text-4xl" />
              <p>No mentorships found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mentor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mentee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedMentorships.map((mentorship) => (
                    <tr key={mentorship._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {mentorship.mentorId?.fullName || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {mentorship.mentorId?.email || 'No email'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {mentorship.menteeId?.fullName || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {mentorship.menteeId?.email || 'No email'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            mentorship.status
                          )}`}
                        >
                          {mentorship.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(mentorship.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {mentorship.status === "pending" && (
                            <>
                              <button
                                onClick={() => updateMentorshipStatus(mentorship._id, "active")}
                                className="text-green-600 hover:text-green-800 transition-colors"
                                title="Approve"
                              >
                                <FiCheck size={16} />
                              </button>
                              <button
                                onClick={() => updateMentorshipStatus(mentorship._id, "cancelled")}
                                className="text-red-600 hover:text-red-800 transition-colors"
                                title="Reject"
                              >
                                <FiX size={16} />
                              </button>
                            </>
                          )}
                          {mentorship.status === "active" && (
                            <button
                              onClick={() => updateMentorshipStatus(mentorship._id, "completed")}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="Mark Complete"
                            >
                              <FiCheck size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => {/* View details functionality */}}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                            title="View Details"
                          >
                            <FiEye size={16} />
                          </button>
                          <button
                            onClick={() => deleteMentorship(
                              mentorship._id, 
                              mentorship.mentorId?.fullName || 'Unknown',
                              mentorship.menteeId?.fullName || 'Unknown'
                            )}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete Mentorship"
                          >
                            <FiTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredMentorships.length)} of{" "}
                  {filteredMentorships.length} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}