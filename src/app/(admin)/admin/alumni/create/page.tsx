"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiArrowLeft, FiUpload } from "react-icons/fi";
import { showSuccess, showError } from "@/lib/toast";

interface AlumniFormData {
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
  skills: string[];
  socialLinks: {
    linkedIn?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export default function CreateAlumniPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AlumniFormData>({
    userId: "",
    graduationYear: new Date().getFullYear(),
    education: [{ schoolName: "", course: "", graduationYear: "" }],
    workExperience: [{ title: "", organization: "", duration: "", description: "" }],
    specialization: "",
    currentRole: "",
    bio: "",
    avatar: "",
    availableForMentorship: false,
    skills: [],
    socialLinks: {},
  });

  const [skillInput, setSkillInput] = useState("");

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
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/alumni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        await showSuccess("Alumni profile created successfully!");
        router.push("/admin/alumni");
      } else {
        await showError(data.error || "Failed to create alumni profile");
      }
    } catch (error) {
      console.error("Error creating alumni:", error);
      await showError("Failed to create alumni profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Alumni Profile</h1>
            <p className="text-gray-600 mt-1">Add a new alumni member to the database</p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User ID *
                </label>
                <input
                  type="text"
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter user ID"
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
                  Specialization *
                </label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g., Software Engineering, Data Science"
                />
              </div>

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
                  placeholder="e.g., Senior Software Engineer"
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
                placeholder="Brief biography..."
              />
            </div>

            <div className="mt-4">
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
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Create Alumni Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}