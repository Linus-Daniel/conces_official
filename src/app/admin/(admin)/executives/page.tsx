// app/admin/executives/page.tsx - Admin page for managing executives
"use client";
import { useState, useEffect, FormEvent } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  Users,
  Crown,
  Settings,
  Eye,
  X,
} from "lucide-react";
import { FaUpload, FaTimes } from "react-icons/fa";
import ImageUpload from "@/components/ImageUpload";
import { IExecutive } from "@/models/Executive";

export default function AdminExecutivesPage() {
  const [executives, setExecutives] = useState<IExecutive[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExecutive, setEditingExecutive] = useState<IExecutive | null>();
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    institution: "",
    level: "200",
    position: "",
    session: "2024/2025 Spiritual Session",
    status: "Active",
    state: "",
    avatar: "",
    department: "",
  });
  const [filters, setFilters] = useState({
    status: "",
    session: "",
    position: "",
  });

  const positions = [
    "National President",
    "Vice President",
    "General Secretary",
    "Assistant General Secretary",
    "Financial Secretary",
    "Treasurer",
    "Organizing Secretary",
    "Publicity Secretary",
    "Prayer Secretary",
    "Traveling Secretary",
    "North East Zonal Coordinator",
  ];

  const levels = ["200", "300", "400", "500"];
  const statuses = ["Active", "Excos"];

  useEffect(() => {
    fetchExecutives();
  }, [filters]);

  const fetchExecutives = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.session) params.append("session", filters.session);
      if (filters.position) params.append("position", filters.position);

      const response = await fetch(`/api/executives?${params.toString()}`);
      const data = await response.json();
      if (data.success) {
        setExecutives(data.data);
      }
    } catch (error) {
      console.error("Error fetching executives:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar: url,
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: "",
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = editingExecutive
        ? `/api/executives/${editingExecutive._id}`
        : "/api/executives";

      const method = editingExecutive ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          editingExecutive
            ? "Executive updated successfully!"
            : "Executive created successfully!"
        );
        setIsModalOpen(false);
        setEditingExecutive(null);
        resetForm();
        fetchExecutives();
      } else {
        alert(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error saving executive:", error);
      alert("An error occurred while saving");
    }
  };

  const handleEdit = (executive:IExecutive) => {
    setEditingExecutive(executive);
    setFormData({
      name: executive.name,
      course: executive.course,
      institution: executive.institution,
      level: executive.level,
      position: executive.position,
      session: executive.session,
      avatar: executive.avatar || "",
      status: executive.status,
      state: executive.state || "",
      department: executive.department,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id:string, name:string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const response = await fetch(`/api/executives/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          alert("Executive deleted successfully!");
          fetchExecutives();
        } else {
          alert(data.message || "An error occurred");
        }
      } catch (error) {
        console.error("Error deleting executive:", error);
        alert("An error occurred while deleting");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      course: "",
      institution: "",
      level: "200",
      position: "",
      session: "2024/2025 Spiritual Session",
      status: "Active",
      state: "",
      avatar: "",
      department: "",
    });
  };

  const handleBatchUpdateStatus = async () => {
    const session = prompt(
      'Enter session to mark as Excos (e.g., "2023/2024 Spiritual Session"):'
    );
    if (!session) return;

    if (
      confirm(
        `Are you sure you want to mark all executives from "${session}" as Excos?`
      )
    ) {
      try {
        const response = await fetch("/api/executives/batch-update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "update_session_status",
            session: session,
            newStatus: "Excos",
          }),
        });

        const data = await response.json();

        if (data.success) {
          alert(data.message);
          fetchExecutives();
        } else {
          alert(data.message || "An error occurred");
        }
      } catch (error) {
        console.error("Error in batch update:", error);
        alert("An error occurred during batch update");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading executives...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Settings className="w-8 h-8 text-blue-600" />
                Admin - CONCES Executives
              </h1>
              <p className="text-gray-600 mt-1">
                Manage fellowship executives and positions
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleBatchUpdateStatus}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Mark Session as Excos
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Executive
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                value={filters.position}
                onChange={(e) =>
                  setFilters({ ...filters, position: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Positions</option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session
              </label>
              <input
                type="text"
                value={filters.session}
                onChange={(e) =>
                  setFilters({ ...filters, session: e.target.value })
                }
                placeholder="e.g., 2024/2025"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Executives List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">
              Executives ({executives.length})
            </h2>
          </div>

          {executives.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No executives found matching your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {executives.map((executive,index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {executive.avatar && (
                            <img
                              src={executive.avatar}
                              alt={executive.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <div className="font-medium text-gray-900">
                            {executive.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {executive.position === "National President" && (
                            <Crown className="w-4 h-4 text-yellow-500" />
                          )}
                          <span className="text-gray-900">
                            {executive.position}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {executive.institution}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {executive.course}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {executive.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            executive.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {executive.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(executive)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(executive.id, executive.name)
                            }
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* View Public Page Link */}
        <div className="mt-6 text-center">
          <a
            href="/executives"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Public Executives Page
          </a>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingExecutive ? "Edit Executive" : "Add New Executive"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingExecutive(null);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Profile Photo
                </label>
                <div className="space-y-4">
                 <ImageUpload
                                onSuccess={(info) => handleImageUpload(info.secure_url)}
                                folder="products/"
                              >
                                <div className="flex items-center justify-center p-4 border rounded-md cursor-pointer">
                                  <FaUpload className="mr-2" />
                                  Upload Images
                                </div>
                              </ImageUpload>

                  {formData.avatar && (
                    <div className="relative group">
                      <img
                        src={formData.avatar}
                        alt="Executive preview"
                        className="rounded-md object-cover h-32 w-full"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <select
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Position</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution *
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course *
                </label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session
                </label>
                <input
                  type="text"
                  value={formData.session}
                  onChange={(e) =>
                    setFormData({ ...formData, session: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingExecutive ? "Update Executive" : "Create Executive"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingExecutive(null);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
