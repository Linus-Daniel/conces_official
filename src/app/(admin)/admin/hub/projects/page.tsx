"use client";
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import { useHubProjects, useDeleteProject } from "@/hooks/useHubData";
import { Project } from "@/types/hub";


interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const ProjectsAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, error, isLoading, refetch } = useHubProjects({
    page: currentPage,
    limit: 10,
    search: searchTerm,
  });

  const deleteProjectMutation = useDeleteProject();

  const projects = data?.projects || [];
  const pagination = data?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const handleDelete = (projectId: string) => {
    deleteProjectMutation.mutate(projectId, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSelectedProject(null);
        refetch();
      },
    });
  };

  const openViewModal = (project: Project) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-softgray flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-teal mx-auto mb-4" />
          <p className="text-navy">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-softgray flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error.message}</p>
          <button
            onClick={() => refetch()}
            className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-softgray">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-navy">
                Projects Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage all projects in the system
              </p>
            </div>
            <button className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal/90 flex items-center">
              <FaPlus className="mr-2" />
              Add Project
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-navy text-white px-6 py-2 rounded-lg hover:bg-navy/90"
            >
              Search
            </button>
          </form>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={project.thumbnail}
                            alt={project.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-navy">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal/10 text-teal"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.userId.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(project.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openViewModal(project)}
                          className="text-teal hover:text-teal/80"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(project)}
                          className="text-gold hover:text-gold/80"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(project)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash className="w-4 h-4" />
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
            <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * pagination.limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * pagination.limit,
                        pagination.total
                      )}
                    </span>{" "}
                    of <span className="font-medium">{pagination.total}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <FaChevronLeft className="h-4 w-4" />
                    </button>
                    {Array.from(
                      { length: Math.min(5, pagination.pages) },
                      (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNum
                                ? "z-10 bg-teal border-teal text-white"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.min(pagination.pages, currentPage + 1)
                        )
                      }
                      disabled={currentPage === pagination.pages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-navy">Project Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Title</h4>
                  <p className="text-navy font-medium">
                    {selectedProject.title}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Owner</h4>
                  <p className="text-navy">{selectedProject.userId.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Created</h4>
                  <p className="text-navy">
                    {formatDate(selectedProject.createdAt)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Last Updated
                  </h4>
                  <p className="text-navy">
                    {formatDate(selectedProject.updatedAt)}
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Description
                </h4>
                <p className="text-navy">{selectedProject.description}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal/10 text-teal"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-navy hover:text-teal"
                  >
                    <FaGithub className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-navy hover:text-teal"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="bg-navy text-white px-4 py-2 rounded-lg hover:bg-navy/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-navy mb-4">
                Delete Project
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the project "
                {selectedProject.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedProject._id)}
                  disabled={deleteProjectMutation.isPending}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {deleteProjectMutation.isPending && (
                    <FaSpinner className="animate-spin" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsAdminPage;
