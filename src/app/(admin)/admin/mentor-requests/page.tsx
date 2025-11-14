"use client";

import { useState, useEffect } from "react";
import { FiCheck, FiX, FiEye, FiUser, FiClock, FiSearch } from "react-icons/fi";
import { showSuccess, showError } from "@/lib/toast";

interface MentorRequest {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    avatar?: string;
  };
  primaryExpertise: string;
  secondaryExpertise?: string;
  skills: string[];
  style: string;
  preferredTimes: string;
  motivation: string;
  menteeCount?: number;
  acceptedTerms: boolean;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function MentorRequestsPage() {
  const [requests, setRequests] = useState<MentorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedRequest, setSelectedRequest] = useState<MentorRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/mentor/request");
      const data = await response.json();

      if (response.ok) {
        setRequests(data.data || []);
      } else {
        await showError(data.error || "Failed to fetch mentor requests");
      }
    } catch (error) {
      await showError("Failed to fetch mentor requests");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateRequestStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const response = await fetch(`/api/mentor/request/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await showSuccess(`Request ${status} successfully`);
        fetchRequests();
        setShowModal(false);
      } else {
        const data = await response.json();
        await showError(data.error || "Failed to update request");
      }
    } catch (error) {
      await showError("Failed to update request");
      console.error(error);
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = 
      request.userId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.primaryExpertise?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
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
                <FiUser className="mr-3" />
                Mentor Requests
              </h1>
              <p className="text-gray-600 mt-1">
                Review and approve mentor applications
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiClock className="mr-1" />
              {requests.filter(r => r.status === "pending").length} pending requests
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Requests
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or expertise..."
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
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchRequests}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredRequests.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FiUser className="mx-auto mb-4 text-4xl" />
              <p>No mentor requests found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Primary Expertise
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={request.userId?.avatar || "/default-avatar.png"}
                            alt={request.userId?.fullName || 'User'}
                          />
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {request.userId?.fullName || 'Unknown'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {request.userId?.email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{request.primaryExpertise}</div>
                        {request.secondaryExpertise && (
                          <div className="text-sm text-gray-500">{request.secondaryExpertise}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="View Details"
                          >
                            <FiEye size={16} />
                          </button>
                          {request.status === "pending" && (
                            <>
                              <button
                                onClick={() => updateRequestStatus(request._id, "approved")}
                                className="text-green-600 hover:text-green-800 transition-colors"
                                title="Approve"
                              >
                                <FiCheck size={16} />
                              </button>
                              <button
                                onClick={() => updateRequestStatus(request._id, "rejected")}
                                className="text-red-600 hover:text-red-800 transition-colors"
                                title="Reject"
                              >
                                <FiX size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for viewing request details */}
        {showModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Mentor Request Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Applicant Info */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Applicant Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={selectedRequest.userId?.avatar || "/default-avatar.png"}
                          alt={selectedRequest.userId?.fullName || 'User'}
                        />
                        <div className="ml-3">
                          <p className="font-medium">{selectedRequest.userId?.fullName}</p>
                          <p className="text-sm text-gray-500">{selectedRequest.userId?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Expertise</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p><strong>Primary:</strong> {selectedRequest.primaryExpertise}</p>
                      {selectedRequest.secondaryExpertise && (
                        <p><strong>Secondary:</strong> {selectedRequest.secondaryExpertise}</p>
                      )}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Style & Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Mentoring Style</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p>{selectedRequest.style}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Preferred Times</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p>{selectedRequest.preferredTimes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Motivation */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Motivation</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p>{selectedRequest.motivation}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {selectedRequest.status === "pending" && (
                    <div className="flex space-x-4 pt-4 border-t">
                      <button
                        onClick={() => updateRequestStatus(selectedRequest._id, "approved")}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <FiCheck className="mr-2" />
                        Approve Request
                      </button>
                      <button
                        onClick={() => updateRequestStatus(selectedRequest._id, "rejected")}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                      >
                        <FiX className="mr-2" />
                        Reject Request
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}