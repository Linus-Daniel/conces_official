"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiSave, FiPlus, FiTrash, FiUser, FiBook, FiBriefcase } from "react-icons/fi";
import { showSuccess, showError } from "@/lib/toast";

interface Education {
  schoolName: string;
  course: string;
  graduationYear: string;
}

interface WorkExperience {
  title: string;
  organization: string;
  duration: string;
  description: string;
}

interface SocialLinks {
  linkedIn?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

interface AlumniFormData {
  graduationYear: number;
  education: Education[];
  workExperience: WorkExperience[];
  specialization: string;
  currentRole: string;
  bio: string;
  avatar: string;
  skills: string[];
  socialLinks: SocialLinks;
}

export default function BecomeAlumniPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const [formData, setFormData] = useState<AlumniFormData>({
    graduationYear: new Date().getFullYear(),
    education: [{ schoolName: "", course: "", graduationYear: "" }],
    workExperience: [{ title: "", organization: "", duration: "", description: "" }],
    specialization: "",
    currentRole: "",
    bio: "",
    avatar: "",
    skills: [],
    socialLinks: {},
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    
    // Check if user is already an alumni
    if (session?.user?.role === "alumni") {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/user/become-alumni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        await showSuccess("Alumni profile created successfully! Welcome to the alumni network!");
        router.push("/dashboard");
      } else {
        await showError(data.error || "Failed to create alumni profile");
      }
    } catch (error) {
      console.error("Error creating alumni profile:", error);
      await showError("Failed to create alumni profile");
    } finally {
      setLoading(false);
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

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
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

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string) => {
    const newWork = [...formData.workExperience];
    newWork[index][field] = value;
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

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
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
            <FiArrowLeft className="mr-2" /> Back
          </button>

          <div className="text-center">
            <FiUser className="mx-auto mb-4 text-6xl text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Join the Alumni Network</h1>
            <p className="text-gray-600 mt-2">
              Create your alumni profile and connect with fellow graduates
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <FiUser className="mr-2" />
              Basic Information
            </h3>
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
                  placeholder="e.g., Software Engineer, Product Manager"
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
                  placeholder="e.g., Full Stack Development, Data Science"
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
                  min="1990"
                  max={new Date().getFullYear()}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture URL
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
                Professional Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about your professional journey and achievements..."
              />
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <FiBook className="mr-2" />
              Education
            </h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School/University
                    </label>
                    <input
                      type="text"
                      value={edu.schoolName}
                      onChange={(e) => updateEducation(index, "schoolName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="University name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course/Degree
                    </label>
                    <input
                      type="text"
                      value={edu.course}
                      onChange={(e) => updateEducation(index, "course", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Degree or course name"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Graduation Year
                      </label>
                      <input
                        type="text"
                        value={edu.graduationYear}
                        onChange={(e) => updateEducation(index, "graduationYear", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="2023"
                      />
                    </div>
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50"
                      >
                        <FiTrash />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
            >
              <FiPlus className="mr-2" /> Add Education
            </button>
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <FiBriefcase className="mr-2" />
              Work Experience
            </h3>
            {formData.workExperience.map((work, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={work.title}
                      onChange={(e) => updateWorkExperience(index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Software Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={work.organization}
                      onChange={(e) => updateWorkExperience(index, "organization", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={work.duration}
                    onChange={(e) => updateWorkExperience(index, "duration", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Jan 2020 - Present"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={work.description}
                    onChange={(e) => updateWorkExperience(index, "description", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of your role and achievements..."
                  />
                </div>
                {formData.workExperience.length > 1 && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50"
                    >
                      <FiTrash className="mr-2 inline" /> Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addWorkExperience}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
            >
              <FiPlus className="mr-2" /> Add Work Experience
            </button>
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

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Social Links (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.linkedIn || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedIn: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.github || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, github: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.twitter || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.website || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, website: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center text-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Creating Profile...
                </>
              ) : (
                <>
                  <FiSave className="mr-3" />
                  Join Alumni Network
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}