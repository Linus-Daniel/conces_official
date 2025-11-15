// app/admin/alumni/page.tsx
"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiTrash2, FiEye, FiPlus, FiUsers, FiDownload } from "react-icons/fi";
import Link from "next/link";

interface Alumni {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
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

interface FilterState {
  graduationYear: string;
  specialization: string;
  availableForMentorship: string;
  isMentor: string;
}

export default function AlumniManagement() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedAlumni, setSelectedAlumni] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    graduationYear: "",
    specialization: "",
    availableForMentorship: "",
    isMentor: "",
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [error, setError] = useState("");

  const fetchAlumni = async (page = 1, search = "", appliedFilters = filters, sort = sortBy, order = sortOrder) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        sortBy: sort,
        sortOrder: order,
        ...(search && { search }),
        ...(appliedFilters.graduationYear && { graduationYear: appliedFilters.graduationYear }),
        ...(appliedFilters.specialization && { specialization: appliedFilters.specialization }),
        ...(appliedFilters.availableForMentorship && { availableForMentorship: appliedFilters.availableForMentorship }),
        ...(appliedFilters.isMentor && { isMentor: appliedFilters.isMentor }),
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
    fetchAlumni(1, searchTerm, filters, sortBy, sortOrder);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchAlumni(newPage, searchTerm, filters, sortBy, sortOrder);
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchAlumni(1, searchTerm, newFilters, sortBy, sortOrder);
  };

  const handleSort = (field: string) => {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(newOrder);
    fetchAlumni(pagination.page, searchTerm, filters, field, newOrder);
  };

  const clearFilters = () => {
    const emptyFilters = {
      graduationYear: "",
      specialization: "",
      availableForMentorship: "",
      isMentor: "",
    };
    setFilters(emptyFilters);
    setSearchTerm("");
    setSortBy("createdAt");
    setSortOrder("desc");
    fetchAlumni(1, "", emptyFilters, "createdAt", "desc");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this alumni profile?")) return;

    try {
      const response = await fetch(`/api/alumni/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the list
        fetchAlumni(pagination.page, searchTerm, filters, sortBy, sortOrder);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete alumni");
      }
    } catch (err) {
      setError("Failed to delete alumni");
      console.error(err);
    }
  };

  const toggleSelectAlumni = (id: string) => {
    setSelectedAlumni(prev => 
      prev.includes(id) 
        ? prev.filter(alumniId => alumniId !== id)
        : [...prev, id]
    );
  };

  const selectAllAlumni = () => {
    if (selectedAlumni.length === alumni.length) {
      setSelectedAlumni([]);
    } else {
      setSelectedAlumni(alumni.map(alum => alum._id));
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedAlumni.length === 0) return;

    if (bulkAction === "delete" && !confirm(`Are you sure you want to delete ${selectedAlumni.length} alumni profiles?`)) {
      return;
    }

    try {
      const promises = selectedAlumni.map(async (id) => {
        if (bulkAction === "delete") {
          return fetch(`/api/alumni/${id}`, { method: "DELETE" });
        } else if (bulkAction === "enable-mentorship") {
          return fetch(`/api/alumni/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ availableForMentorship: true }),
          });
        } else if (bulkAction === "disable-mentorship") {
          return fetch(`/api/alumni/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ availableForMentorship: false }),
          });
        } else if (bulkAction === "make-mentor") {
          return fetch(`/api/alumni/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isMentor: true }),
          });
        } else if (bulkAction === "remove-mentor") {
          return fetch(`/api/alumni/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isMentor: false }),
          });
        }
      });

      await Promise.all(promises);
      setSelectedAlumni([]);
      setBulkAction("");
      fetchAlumni(pagination.page, searchTerm, filters, sortBy, sortOrder);
    } catch (error) {
      setError("Failed to perform bulk action");
      console.error(error);
    }
  };

  const updateMentorStatus = async (alumniId: string, field: "isMentor" | "availableForMentorship", value: boolean) => {
    try {
      const response = await fetch(`/api/alumni/${alumniId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (response.ok) {
        // Update local state
        setAlumni(prev => 
          prev.map(alum => 
            alum._id === alumniId 
              ? { ...alum, [field]: value }
              : alum
          )
        );
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update mentor status");
      }
    } catch (error) {
      setError("Failed to update mentor status");
      console.error(error);
    }
  };

  const exportAlumni = async (format: "csv" | "json") => {
    try {
      // Fetch all alumni data without pagination for export
      const queryParams = new URLSearchParams({
        page: "1",
        limit: "1000", // Large number to get all
        sortBy,
        sortOrder,
        ...(searchTerm && { search: searchTerm }),
        ...(filters.graduationYear && { graduationYear: filters.graduationYear }),
        ...(filters.specialization && { specialization: filters.specialization }),
        ...(filters.availableForMentorship && { availableForMentorship: filters.availableForMentorship }),
        ...(filters.isMentor && { isMentor: filters.isMentor }),
      });

      const response = await fetch(`/api/alumni?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        const alumniData = data.alumni.map((alum: Alumni) => ({
          Name: alum.userId.fullName,
          Email: alum.userId.email,
          "Current Role": alum.currentRole,
          Specialization: alum.specialization,
          "Graduation Year": alum.graduationYear,
          Education: alum.education.map(edu => `${edu.course} at ${edu.schoolName} (${edu.graduationYear})`).join("; "),
          "Work Experience": alum.workExperience.map(work => `${work.title} at ${work.organization}`).join("; "),
          Skills: alum.skills.join(", "),
          "Is Mentor": alum.isMentor ? "Yes" : "No",
          "Available for Mentorship": alum.availableForMentorship ? "Yes" : "No",
          "LinkedIn": alum.socialLinks.linkedIn || "",
          "Twitter": alum.socialLinks.twitter || "",
          "GitHub": alum.socialLinks.github || "",
          "Website": alum.socialLinks.website || "",
          Bio: alum.bio || "",
          "Created Date": new Date(alum.createdAt).toLocaleDateString(),
        }));

        if (format === "csv") {
          const csvContent = [
            Object.keys(alumniData[0]).join(","),
            ...alumniData.map((row:[]) => 
              Object.values(row).map(field => 
                `"${String(field).replace(/"/g, '""')}"` // Escape quotes
              ).join(",")
            )
          ].join("\n");

          const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `alumni_export_${new Date().toISOString().split('T')[0]}.csv`;
          link.click();
        } else {
          const jsonContent = JSON.stringify(alumniData, null, 2);
          const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `alumni_export_${new Date().toISOString().split('T')[0]}.json`;
          link.click();
        }
      }
    } catch (error) {
      setError("Failed to export alumni data");
      console.error(error);
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
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  onClick={() => document.getElementById('export-menu')?.classList.toggle('hidden')}
                >
                  <FiDownload className="mr-2" /> Export
                </button>
                <div id="export-menu" className="hidden absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <button
                    onClick={() => {
                      exportAlumni('csv');
                      document.getElementById('export-menu')?.classList.add('hidden');
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Export as CSV
                  </button>
                  <button
                    onClick={() => {
                      exportAlumni('json');
                      document.getElementById('export-menu')?.classList.add('hidden');
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Export as JSON
                  </button>
                </div>
              </div>
              <Link
                href="/admin/alumni/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="mr-2" /> Add Alumni
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                <input
                  type="number"
                  placeholder="e.g., 2020"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.graduationYear}
                  onChange={(e) => handleFilterChange('graduationYear', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input
                  type="text"
                  placeholder="e.g., Software Engineering"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.specialization}
                  onChange={(e) => handleFilterChange('specialization', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mentorship Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.availableForMentorship}
                  onChange={(e) => handleFilterChange('availableForMentorship', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mentor Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.isMentor}
                  onChange={(e) => handleFilterChange('isMentor', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="true">Is Mentor</option>
                  <option value="false">Not Mentor</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Clear all filters
              </button>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Sort by:</span>
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    fetchAlumni(pagination.page, searchTerm, filters, e.target.value, sortOrder);
                  }}
                >
                  <option value="createdAt">Date Added</option>
                  <option value="graduationYear">Graduation Year</option>
                  <option value="specialization">Specialization</option>
                  <option value="currentRole">Current Role</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleSort(sortBy)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Bulk Actions */}
        {selectedAlumni.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-medium text-blue-700">
                {selectedAlumni.length} alumni selected
              </span>
              <div className="flex items-center gap-3">
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="border border-blue-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">Select action...</option>
                  <option value="enable-mentorship">Enable Mentorship</option>
                  <option value="disable-mentorship">Disable Mentorship</option>
                  <option value="make-mentor">Make Mentor</option>
                  <option value="remove-mentor">Remove Mentor</option>
                  <option value="delete">Delete</option>
                </select>
                <button
                  onClick={handleBulkAction}
                  disabled={!bulkAction}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Apply
                </button>
                <button
                  onClick={() => setSelectedAlumni([])}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

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
              {/* Mobile Cards View */}
              <div className="block lg:hidden">
                {alumni.map((alum) => (
                  <div key={alum._id} className="border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAlumni.includes(alum._id)}
                          onChange={() => toggleSelectAlumni(alum._id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                        />
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={alum.avatar || "/default-avatar.png"}
                          alt={alum.userId.fullName}
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{alum.userId.fullName}</div>
                          <div className="text-sm text-gray-500">{alum.userId.email}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
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
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Current Role</span>
                        <div className="text-sm text-gray-900">{alum.currentRole}</div>
                        <div className="text-sm text-gray-500">{alum.specialization}</div>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Education</span>
                        <div className="text-sm text-gray-900">{alum.education[0]?.course || "N/A"}</div>
                        <div className="text-sm text-gray-500">{alum.education[0]?.schoolName || "N/A"}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={alum.isMentor}
                            onChange={(e) => updateMentorStatus(alum._id, "isMentor", e.target.checked)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className={`ml-2 text-xs font-semibold ${alum.isMentor ? 'text-purple-800' : 'text-gray-500'}`}>
                            Mentor
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={alum.availableForMentorship}
                            onChange={(e) => updateMentorStatus(alum._id, "availableForMentorship", e.target.checked)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className={`ml-2 text-xs font-semibold ${alum.availableForMentorship ? 'text-green-800' : 'text-gray-500'}`}>
                            Available for mentorship
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedAlumni.length === alumni.length && alumni.length > 0}
                          onChange={selectAllAlumni}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
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
                          <input
                            type="checkbox"
                            checked={selectedAlumni.includes(alum._id)}
                            onChange={() => toggleSelectAlumni(alum._id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={alum.avatar || "/default-avatar.png"}
                              alt={alum.userId.fullName}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{alum.userId.fullName}</div>
                              <div className="text-sm text-gray-500">{alum.userId.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {alum.education[0]?.course || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {alum.education[0]?.schoolName || "N/A"}
                          </div>
                          <div className="text-xs text-gray-400">
                            Graduated: {alum.education[0]?.graduationYear || alum.graduationYear || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{alum.currentRole}</div>
                          <div className="text-sm text-gray-500">{alum.specialization}</div>
                          {alum.skills && alum.skills.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {alum.skills.slice(0, 3).map((skill, index) => (
                                <span
                                  key={index}
                                  className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                                >
                                  {skill}
                                </span>
                              ))}
                              {alum.skills.length > 3 && (
                                <span className="text-xs text-gray-400">
                                  +{alum.skills.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={alum.isMentor}
                                  onChange={(e) => updateMentorStatus(alum._id, "isMentor", e.target.checked)}
                                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className={`ml-2 text-xs font-semibold ${alum.isMentor ? 'text-purple-800' : 'text-gray-500'}`}>
                                  Mentor
                                </span>
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={alum.availableForMentorship}
                                  onChange={(e) => updateMentorStatus(alum._id, "availableForMentorship", e.target.checked)}
                                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                />
                                <span className={`ml-2 text-xs font-semibold ${alum.availableForMentorship ? 'text-green-800' : 'text-gray-500'}`}>
                                  Available for mentorship
                                </span>
                              </label>
                            </div>
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