// app/admin/alumni/page.tsx
"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiTrash2, FiEye, FiPlus, FiUsers } from "react-icons/fi";
import Link from "next/link";

interface Alumni {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  graduationYear: number;
  education: {
    schoolName: string;
    course: string;
    graduationYear: string;
  }[];
  workExperience: {
    title: string;
    organization: string;
    duration: string;
    description: string;
  }[];
  specialization: string;
  currentRole: string;
  bio?: string;
  avatar: string;
  availableForMentorship: boolean;
  isMentor: boolean;
  skills: string[];
  socialLinks: {
    linkedIn?: string;
    twitter?: string;
    github?: string;
    website: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function AlumniManagement() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [error, setError] = useState("");

  const fetchAlumni = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/alumni?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setAlumni(data.alumni);
        setPagination(data.pagination);
      } else {
        setError(data.error || "Failed to fetch alumni");
      }
    } catch (err) {
      setError("Failed to fetch alumni");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAlumni(1, searchTerm);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchAlumni(newPage, searchTerm);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this alumni profile?")) return;

    try {
      const response = await fetch(`/api/alumni/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the list
        fetchAlumni(pagination.page, searchTerm);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete alumni");
      }
    } catch (err) {
      setError("Failed to delete alumni");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FiUsers className="mr-2 text-blue-600" /> Alumni Management
              </h1>
              <p className="text-gray-600 mt-1">Manage all alumni profiles</p>
            </div>
            <Link
              href="/admin/alumni/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" /> Add Alumni
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by role, specialization, or education..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Alumni Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading alumni...</p>
            </div>
          ) : alumni.length === 0 ? (
            <div className="p-8 text-center">
              <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No alumni found</h3>
              <p className="mt-2 text-gray-600">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first alumni profile"}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Alumni
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Education
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {alumni.map((alum) => (
                      <tr key={alum._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={alum.avatar || "/default-avatar.png"}
                              alt={alum.userId.name}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{alum.userId.name}</div>
                              <div className="text-sm text-gray-500">{alum.userId.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {alum.education[0]?.course || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {alum.education[0]?.schoolName || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{alum.currentRole}</div>
                          <div className="text-sm text-gray-500">{alum.specialization}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            {alum.isMentor && (
                              <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-purple-100 text-purple-800">
                                Mentor
                              </span>
                            )}
                            {alum.availableForMentorship && (
                              <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-green-100 text-green-800">
                                Available for mentorship
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/admin/alumni/${alum._id}`}
                              className="text-blue-600 hover:text-blue-900 p-1"
                            >
                              <FiEye className="h-5 w-5" />
                            </Link>
                            <Link
                              href={`/admin/alumni/${alum._id}/edit`}
                              className="text-amber-600 hover:text-amber-900 p-1"
                            >
                              <FiEdit className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(alum._id)}
                              className="text-red-600 hover:text-red-900 p-1"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{" "}
                        <span className="font-medium">
                          {Math.min(pagination.page * pagination.limit, pagination.total)}
                        </span>{" "}
                        of <span className="font-medium">{pagination.total}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(pagination.page - 1)}
                          disabled={pagination.page === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                            pagination.page === 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          Previous
                        </button>
                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pagination.page === pageNum
                                ? "z-10 bg-blue-600 border-blue-600 text-white"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}
                        <button
                          onClick={() => handlePageChange(pagination.page + 1)}
                          disabled={pagination.page === pagination.pages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                            pagination.page === pagination.pages
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}