"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiSave, FiPlus, FiTrash } from "react-icons/fi";
import { showSuccess, showError } from "@/lib/toast";

interface Alumni {
  _id: string;
  userId: string;
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
  bio: string;
  avatar: string;
  availableForMentorship: boolean;
  isMentor: boolean;
  skills: string[];
  socialLinks: {
    linkedIn?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export default function EditAlumniPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Alumni>({
    _id: "",
    userId: "",
    graduationYear: new Date().getFullYear(),
    education: [{ schoolName: "", course: "", graduationYear: "" }],
    workExperience: [{ title: "", organization: "", duration: "", description: "" }],
    specialization: "",
    currentRole: "",
    bio: "",
    avatar: "",
    availableForMentorship: false,
    isMentor: false,
    skills: [],
    socialLinks: {},
  });

  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/alumni/${params.id}`);
        const data = await response.json();

        if (response.ok) {
          setFormData(data.alumni);
        } else {
          setError(data.error || "Failed to fetch alumni profile");
        }
      } catch (err) {
        setError("Failed to fetch alumni profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAlumni();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/alumni/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        await showSuccess("Alumni profile updated successfully!");
        router.push(`/admin/alumni/${params.id}`);
      } else {
        await showError(data.error || "Failed to update alumni profile");
      }
    } catch (error) {
      console.error("Error updating alumni:", error);
      await showError("Failed to update alumni profile");
    } finally {
      setSaving(false);
    }
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { schoolName: "", course: "", graduationYear: "" }],
    });
  };

  const removeEducation = (index: number) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [...formData.workExperience, { title: "", organization: "", duration: "", description: "" }],
    });
  };

  const removeWorkExperience = (index: number) => {
    const newWork = formData.workExperience.filter((_, i) => i !== index);
    setFormData({ ...formData, workExperience: newWork });
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <FiArrowLeft className="mr-2" /> Back to Profile
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Alumni Profile</h1>
            <p className="text-gray-600 mt-1">Update alumni information and settings</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Role *
                </label>
                <input
                  type="text"
                  value={formData.currentRole}
                  onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization *
                </label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Year *
                </label>
                <input
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief professional biography..."
              />
            </div>

            <div className="mt-4 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.availableForMentorship}
                  onChange={(e) => setFormData({ ...formData, availableForMentorship: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Available for mentorship
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isMentor}
                  onChange={(e) => setFormData({ ...formData, isMentor: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Active mentor
                </span>
              </label>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Skills</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <FiPlus />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <FiTrash size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}