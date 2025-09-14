// app/admin/users/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiEdit,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBook,
  FiGlobe,
  FiLinkedin,
  FiGithub,
  FiCalendar,
  FiUser,
  FiSettings,
  FiTrash2,
  FiExternalLink,
  FiCode,
  FiStar,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiAlertCircle,
  FiX,
  FiSave,
} from "react-icons/fi";
import Link from "next/link";
import {
  useUserDetails,
  useUpdateUserDetails,
  useDeleteUserProject,
  useDeleteUserSkill,
} from "@/hooks/useTalentUSerData";
import { User } from "@/types/hub";
import { toast } from "react-hot-toast";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<User>>({});

  // React Query hooks
  const {
    data: userDetails,
    isLoading,
    error,
    refetch,
  } = useUserDetails(userId);
  const updateUserMutation = useUpdateUserDetails();
  const deleteProjectMutation = useDeleteUserProject();
  const deleteSkillMutation = useDeleteUserSkill();

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !userDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading User
          </h2>
          <p className="text-gray-600 mb-4">
            {error?.message || "User not found"}
          </p>
          <div className="space-x-3">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleEditClick = () => {
    setEditFormData({
      fullname: userDetails.fullname,
      email: userDetails.email,
      phone: userDetails.phone,
      institution: userDetails.institution,
      major: userDetails.major,
      graduationYear: userDetails.graduationYear,
      location: userDetails.location,
      bio: userDetails.bio,
      website: userDetails.website,
      linkedin: userDetails.linkedin,
      github: userDetails.github,
      status: userDetails.status,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate(
      { userId, userData: editFormData },
      {
        onSuccess: () => {
          setShowEditModal(false);
        },
      }
    );
  };

  const handleDeleteProject = async (
    projectId: string,
    projectTitle: string
  ) => {
    if (window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      deleteProjectMutation.mutate(projectId);
    }
  };

  const handleDeleteSkill = async (skillId: string, skillName: string) => {
    if (
      window.confirm(`Are you sure you want to delete "${skillName}" skill?`)
    ) {
      deleteSkillMutation.mutate(skillId);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <FiCheckCircle className="mr-1 h-4 w-4" />
            Approved
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            <FiXCircle className="mr-1 h-4 w-4" />
            Rejected
          </div>
        );
      case "pending":
      default:
        return (
          <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            <FiClock className="mr-1 h-4 w-4" />
            Pending
          </div>
        );
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-purple-100 text-purple-800";
      case "Advanced":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Beginner":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
              >
                <FiArrowLeft className="mr-2" /> Back to Users
              </button>
              <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
            </div>
            <button
              onClick={handleEditClick}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FiEdit className="mr-2" /> Edit User
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <div className="text-center">
                <img
                  src={userDetails.avatar || "/default-avatar.png"}
                  alt={userDetails.fullname}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-semibold text-gray-900">
                  {userDetails.fullname}
                </h2>
                <p className="text-gray-600 mb-4">{userDetails.email}</p>
                {getStatusBadge(userDetails.status)}
              </div>

              <div className="mt-6 space-y-4">
                {userDetails.phone && (
                  <div className="flex items-center text-gray-600">
                    <FiPhone className="mr-3 h-5 w-5" />
                    <span>{userDetails.phone}</span>
                  </div>
                )}
                {userDetails.location && (
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="mr-3 h-5 w-5" />
                    <span>{userDetails.location}</span>
                  </div>
                )}
                {userDetails.institution && (
                  <div className="flex items-center text-gray-600">
                    <FiBook className="mr-3 h-5 w-5" />
                    <span>{userDetails.institution}</span>
                  </div>
                )}
                {userDetails.major && (
                  <div className="flex items-center text-gray-600">
                    <FiUser className="mr-3 h-5 w-5" />
                    <span>
                      {userDetails.major} • Class of{" "}
                      {userDetails.graduationYear}
                    </span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {(userDetails.website ||
                userDetails.linkedin ||
                userDetails.github) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Links
                  </h3>
                  <div className="space-y-2">
                    {userDetails.website && (
                      <a
                        href={userDetails.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <FiGlobe className="mr-2 h-4 w-4" />
                        Website
                        <FiExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                    {userDetails.linkedin && (
                      <a
                        href={userDetails.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <FiLinkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                        <FiExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                    {userDetails.github && (
                      <a
                        href={userDetails.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <FiGithub className="mr-2 h-4 w-4" />
                        GitHub
                        <FiExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Account Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Account
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Joined:</span>
                    <span>
                      {new Date(userDetails.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-medium">
                      {userDetails.billing?.plan || "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projects:</span>
                    <span className="font-medium">
                      {userDetails.projectsCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Skills:</span>
                    <span className="font-medium">
                      {userDetails.skillsCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Projects and Skills */}
          <div className="lg:col-span-2">
            {/* Bio */}
            {userDetails.bio && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Bio</h3>
                <p className="text-gray-700">{userDetails.bio}</p>
              </div>
            )}

            {/* Projects */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <FiCode className="mr-2" />
                  Projects ({userDetails.projects.length})
                </h3>
              </div>

              {userDetails.projects.length > 0 ? (
                <div className="grid gap-4">
                  {userDetails.projects.map((project) => (
                    <div
                      key={project._id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">
                          {project.title}
                        </h4>
                        <button
                          onClick={() =>
                            handleDeleteProject(project._id, project.title)
                          }
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete project"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex space-x-4 text-sm">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <FiExternalLink className="mr-1 h-3 w-3" />
                            Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-800 flex items-center"
                          >
                            <FiGithub className="mr-1 h-3 w-3" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FiCode className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p>No projects added yet</p>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <FiStar className="mr-2" />
                  Skills ({userDetails.skills.length})
                </h3>
              </div>

              {userDetails.skills.length > 0 ? (
                <div className="grid gap-4">
                  {Object.entries(
                    userDetails.skills.reduce((acc, skill) => {
                      if (!acc[skill.category]) {
                        acc[skill.category] = [];
                      }
                      acc[skill.category].push(skill);
                      return acc;
                    }, {} as Record<string, typeof userDetails.skills>)
                  ).map(([category, skills]) => (
                    <div
                      key={category}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <h4 className="font-medium text-gray-900 mb-3">
                        {category}
                      </h4>
                      <div className="grid gap-3">
                        {skills.map((skill) => (
                          <div
                            key={skill._id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {skill.name}
                                </span>
                                <button
                                  onClick={() =>
                                    handleDeleteSkill(skill._id, skill.name)
                                  }
                                  className="text-red-600 hover:text-red-800 p-1"
                                  title="Delete skill"
                                >
                                  <FiTrash2 className="h-3 w-3" />
                                </button>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span
                                  className={`px-2 py-1 rounded ${getLevelColor(
                                    skill.level
                                  )}`}
                                >
                                  {skill.level}
                                </span>
                                <span>{skill.experience} years</span>
                                <span>{skill.proficiency}% proficiency</span>
                                {skill.endorsements > 0 && (
                                  <span>{skill.endorsements} endorsements</span>
                                )}
                              </div>
                              {skill.description && (
                                <p className="text-xs text-gray-600 mt-1">
                                  {skill.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FiStar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p>No skills added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit User
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.fullname || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          fullname: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editFormData.email || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editFormData.phone || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editFormData.location || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={editFormData.institution || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          institution: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Major
                    </label>
                    <input
                      type="text"
                      value={editFormData.major || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          major: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="text"
                      value={editFormData.graduationYear || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          graduationYear: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={editFormData.status || "pending"}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          status: e.target.value as any,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={editFormData.bio || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      value={editFormData.website || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={editFormData.linkedin || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          linkedin: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub
                    </label>
                    <input
                      type="url"
                      value={editFormData.github || ""}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          github: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateUserMutation.isPending}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    <FiSave className="mr-2" />
                    {updateUserMutation.isPending
                      ? "Saving..."
                      : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {(updateUserMutation.isPending ||
        deleteProjectMutation.isPending ||
        deleteSkillMutation.isPending) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-4"></div>
            <span>
              {updateUserMutation.isPending && "Updating user..."}
              {deleteProjectMutation.isPending && "Deleting project..."}
              {deleteSkillMutation.isPending && "Deleting skill..."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
