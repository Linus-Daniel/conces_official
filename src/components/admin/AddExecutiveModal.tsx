import React, { FormEvent, useState } from 'react'
import { FaTimes, FaUpload } from 'react-icons/fa';
import ImageUpload from '../ImageUpload';
import { X } from 'lucide-react';
import { IExecutive } from '@/models/Executive';

function AddExecutiveModal({fetchExecutives,isEditing, isOpen,handleEdit}: {isEditing:IExecutive | null,fetchExecutives: () => void,isOpen:boolean,handleEdit: (executive: IExecutive) => void}) {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    console.log(isOpen)
  const [editingExecutive, setEditingExecutive] = useState<IExecutive | null>();
    const [formData, setFormData] = React.useState({
        name: '',
        avatar: '',
        position: '',
        institution: '',
        level: '',
        status: 'Active',
        course: '',
        department: '',
        session: '',
        state: ''
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
        "North East Zonal Coordinator"
    ];
    const levels = ["200", "300", "400", "500"];
    const statuses = ["Active", "Excos"];
    const resetForm = () => {
        setFormData({
            name: '',
            avatar: '',
            position: '',
            institution: '',
            level: '',
            status: 'Active',
            course: '',
            department: '',
            session: '',
            state: ''
        });
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
            ? `/api/executives/${editingExecutive.id}`
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

    //   const handleEdit = (executive: IExecutive) => {
    //     setEditingExecutive(executive);
    //     setFormData({
    //       name: executive.name,
    //       course: executive.course,
    //       institution: executive.institution,
    //       level: executive.level,
    //       position: executive.position,
    //       session: executive.session,
    //       avatar: executive.avatar || "",
    //       status: executive.status,
    //       state: executive.state || "",
    //       department: executive.department,
    //     });
    //     setIsModalOpen(true);
    //   };

      const handleDelete = async (id: string, name: string) => {
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
    
  return (
    <div>

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
      
    </div>
  );
}

export default AddExecutiveModal