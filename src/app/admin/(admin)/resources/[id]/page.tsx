"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaEdit,
  FaFilePdf,
  FaVideo,
  FaBook,
  FaArrowLeft,
  FaEye,
  FaCalendar,
  FaUser,
  FaTag,
  FaDownload,
  FaPlayCircle,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import { Resource } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";
import dynamic from "next/dynamic";

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// Dynamically import PDF viewer
const PDFViewer = dynamic(() => import("../../../../../components/PdfViewer"), { ssr: false });

async function fetchResources(id: string) {
  const response = await api.get(`/resources/${id}`);
  return response.data;
}

async function updateResource({
  id,
  data,
}: {
  id: string;
  data: Partial<Resource>;
}) {
  const response = await api.put(`/resources/${id}`, data);
  return response.data;
}

// Helper function to detect and render HTML content
const renderContent = (content: string) => {
  // Check if content contains HTML tags
  const isHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(content);

  if (isHTML) {
    return (
      <div
        className="prose prose-lg max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Render as plain text with proper formatting
  return (
    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
      {content}
    </div>
  );
};

// Edit Resource Modal Component
const EditResourceModal = ({
  resource,
  isOpen,
  onClose,
  onSave,
}: {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Resource>) => void;
}) => {
  const [formData, setFormData] = useState<Partial<Resource>>(resource);
  const [tagsInput, setTagsInput] = useState<string>(
    resource.tags?.join(", ") || ""
  );

  useEffect(() => {
    if (resource) {
      setFormData(resource);
      setTagsInput(resource.tags?.join(", ") || "");
    }
  }, [resource]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagsInput(value);
    setFormData((prev) => ({
      ...prev,
      tags: value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-royal-900">Edit Resource</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              >
                <option value="blog">Blog</option>
                <option value="devotional">Devotional</option>
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={handleTagsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              placeholder="faith, prayer, bible"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content || ""}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
            />
          </div>

          {(formData.type === "pdf" || formData.type === "video") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.type === "pdf" ? "PDF URL" : "Video URL"}
              </label>
              <input
                type="url"
                name="fileUrl"
                value={formData.fileUrl || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
                required
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured || false}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, featured: e.target.checked }))
              }
              className="h-4 w-4 text-royal-DEFAULT focus:ring-royal-DEFAULT border-gray-300 rounded"
            />
            <label htmlFor="featured" className="text-sm text-gray-700">
              Featured Resource
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-dark transition-colors flex items-center"
            >
              <FaSave className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Video Player Component
const VideoPlayer = ({ url }: { url: string }) => {
  return (
    <div className="bg-black rounded-xl overflow-hidden shadow-lg">
      <div className="relative pt-[56.25%]">
        {" "}
        {/* 16:9 aspect ratio */}
        <ReactPlayer
          src={url}
          width="100%"
          height="100%"
          controls
          style={{ position: "absolute", top: 0, left: 0 }}
          config={{
          }}
        />
      </div>
    </div>
  );
};

export default function ViewResource() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [resource, setResource] = useState<Resource | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "content">("preview");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["resource", id],
    queryFn: () => fetchResources(id as string),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: updateResource,
    onSuccess: (updatedResource) => {
      setResource(updatedResource);
      queryClient.invalidateQueries({ queryKey: ["resource", id] });
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      setIsEditModalOpen(false);
    },
  });

  useEffect(() => {
    if (data) {
      setResource(data);
    }
  }, [data]);

  const getTypeIcon = () => {
    switch (resource?.type) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-3xl" />;
      case "video":
        return <FaVideo className="text-blue-500 text-3xl" />;
      default:
        return <FaBook className="text-royal-DEFAULT text-3xl" />;
    }
  };

  const getTypeBadge = () => {
    switch (resource?.type) {
      case "pdf":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
            PDF
          </span>
        );
      case "video":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            Video
          </span>
        );
      case "devotional":
        return (
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
            Devotional
          </span>
        );
      case "blog":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Blog
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
            Resource
          </span>
        );
    }
  };

  const handleSave = (data: Partial<Resource>) => {
    if (id) {
      updateMutation.mutate({ id: id as string, data });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-royal-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-DEFAULT mx-auto mb-4"></div>
          <p className="text-royal-700">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (isError || !resource) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Resource Not Found
          </h2>
          <p className="text-red-600 mb-4">
            The resource you're looking for doesn't exist or couldn't be loaded.
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-dark transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Resources
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-royal-50 to-white">
      <EditResourceModal
        resource={resource}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-royal-DEFAULT hover:text-royal-dark font-medium transition-colors group"
          >
            <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Resources
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-royal-50 to-royal-100 p-6 md:p-8 border-b border-royal-200">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {getTypeIcon()}
                  {getTypeBadge()}
                  {resource.featured && (
                    <span className="px-3 py-1 bg-gold-100 text-gold-800 text-sm font-medium rounded-full flex items-center">
                      <span className="w-2 h-2 bg-gold-DEFAULT rounded-full mr-2"></span>
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-royal-900 mb-4">
                  {resource.title}
                </h1>

                <p className="text-lg text-royal-700 mb-6">
                  {resource.description}
                </p>
              </div>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center px-4 py-2 bg-white text-royal-DEFAULT border border-royal-200 rounded-lg hover:bg-royal-50 transition-colors shadow-sm"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Video Player for Video Resources */}
                {resource.type === "video" && resource.fileUrl && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-royal-900 mb-4 pb-2 border-b border-royal-100">
                      Video Content
                    </h2>
                    <VideoPlayer url={resource.videoUrl as string} />
                  </div>
                )}

                {/* PDF Viewer for PDF Resources */}
                {resource.type === "pdf" && resource.fileUrl && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-royal-900 mb-4 pb-2 border-b border-royal-100">
                      PDF Document
                    </h2>
                    <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                      <PDFViewer url={resource.fileUrl} />
                    </div>
                  </div>
                )}

                {/* Content for Blog/Devotional with Tabs */}
                {(resource.type === "devotional" || resource.type === "blog") &&
                  resource.content && (
                    <div className="mb-8">
                      <div className="flex border-b border-gray-200 mb-4">
                        <button
                          className={`px-4 py-2 font-medium ${
                            activeTab === "preview"
                              ? "text-royal-DEFAULT border-b-2 border-royal-DEFAULT"
                              : "text-gray-500"
                          }`}
                          onClick={() => setActiveTab("preview")}
                        >
                          Preview
                        </button>
                        <button
                          className={`px-4 py-2 font-medium ${
                            activeTab === "content"
                              ? "text-royal-DEFAULT border-b-2 border-royal-DEFAULT"
                              : "text-gray-500"
                          }`}
                          onClick={() => setActiveTab("content")}
                        >
                          HTML Content
                        </button>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        {activeTab === "preview" ? (
                          renderContent(resource.content)
                        ) : (
                          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg overflow-x-auto">
                            {resource.content}
                          </pre>
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Resource Details Card */}
                <div className="bg-royal-50 rounded-xl p-6 border border-royal-100">
                  <h3 className="text-lg font-semibold text-royal-900 mb-4 flex items-center">
                    <FaEye className="mr-2 text-royal-DEFAULT" />
                    Resource Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 text-royal-DEFAULT">
                        <FaUser />
                      </div>
                      <div>
                        <p className="text-xs text-royal-600">Author</p>
                        <p className="font-medium text-royal-900">
                          {resource.author}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 text-royal-DEFAULT">
                        <FaCalendar />
                      </div>
                      <div>
                        <p className="text-xs text-royal-600">Published</p>
                        <p className="font-medium text-royal-900">
                          {new Date(resource.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 text-royal-DEFAULT">
                        <FaEye />
                      </div>
                      <div>
                        <p className="text-xs text-royal-600">Views</p>
                        <p className="font-medium text-royal-900">
                          {resource.views}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 text-royal-DEFAULT">
                        <FaBook />
                      </div>
                      <div>
                        <p className="text-xs text-royal-600">Category</p>
                        <p className="font-medium text-royal-900 capitalize">
                          {resource.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags Card */}
                {resource.tags && resource.tags.length > 0 && (
                  <div className="bg-royal-50 rounded-xl p-6 border border-royal-100">
                    <h3 className="text-lg font-semibold text-royal-900 mb-4 flex items-center">
                      <FaTag className="mr-2 text-royal-DEFAULT" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white text-royal-DEFAULT border border-royal-200 rounded-full text-sm font-medium hover:bg-royal-DEFAULT hover:text-white transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Card for PDF/Video */}
                {(resource.type === "pdf" || resource.type === "video") &&
                  resource.fileUrl && (
                    <div className="bg-gradient-to-br from-royal-DEFAULT to-royal-dark rounded-xl p-6 text-white">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        {resource.type === "pdf" ? (
                          <FaDownload className="mr-2" />
                        ) : (
                          <FaPlayCircle className="mr-2" />
                        )}
                        {resource.type === "pdf"
                          ? "PDF Document"
                          : "Video Resource"}
                      </h3>

                      <p className="text-royal-100 mb-4 text-sm">
                        {resource.type === "pdf"
                          ? "Download this PDF resource for offline reading."
                          : "Watch this video resource to enhance your learning."}
                      </p>

                      <a
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-3 bg-white text-royal-DEFAULT font-semibold rounded-lg hover:bg-royal-50 transition-colors shadow-md"
                      >
                        {resource.type === "pdf" ? (
                          <>
                            <FaDownload className="mr-2" />
                            Download PDF
                          </>
                        ) : (
                          <>
                            <FaPlayCircle className="mr-2" />
                            Watch Video
                          </>
                        )}
                      </a>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
