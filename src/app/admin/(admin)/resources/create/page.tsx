"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FaSave,
  FaUpload,
  FaTimes,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/lib/axiosInstance";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/ImageUpload";

const RichTextEditor = dynamic(() => import("@/components/EditText"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 rounded-md animate-pulse"></div>
  ),
});

type ResourceType = "devotional" | "pdf" | "video" | "blog";
type Resource = {
  _id?: string;
  title: string;
  type: ResourceType;
  description: string;
  content: string;
  thumbnail: string;
  tags: string[];
  author: string;
  date: string;
  featured?: boolean;
};

export default function ResourceForm() {
  const router = useRouter();
  const params = useParams();
  const resourceId = params?.id as string | undefined;

  const [resource, setResource] = useState<Resource>({
    title: "",
    type: "devotional",
    description: "",
    content: "",
    thumbnail: "",
    tags: [],
    author: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  useEffect(() => {
    if (resourceId) fetchResource();
  }, [resourceId]);

  const fetchResource = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/resources/${resourceId}`);
      if (!response.ok) throw new Error("Failed to fetch resource");
      const data = await response.json();
      setResource(data);
      if (data.thumbnail) setThumbnailPreview(data.thumbnail);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load resource"
      );
      router.push("/resources");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setResource((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentChange = (content: string) => {
    setResource((prev) => ({ ...prev, content }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !resource.tags.includes(tagInput.trim())) {
      setResource((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setResource((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = resourceId ? `/resources/${resourceId}` : "/resources";
      const method = resourceId ? "put" : "post";
      const response = await api({ method, url, data: resource });
      const data = response.data;
      toast.success(
        resourceId
          ? "Resource updated successfully!"
          : "Resource created successfully!"
      );
      router.push(`/resources/${resourceId || data._id}`);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to save resource";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !resourceId ||
      !confirm("Are you sure you want to delete this resource?")
    )
      return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/resources/${resourceId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete resource");
      toast.success("Resource deleted successfully!");
      router.push("/resources");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete resource"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-royal-600 hover:text-royal-800 mr-4"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {resourceId ? "Edit Resource" : "Create New Resource"}
          </h1>
          {resourceId && (
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="ml-auto flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              <FaTrash className="mr-2" />
              Delete
            </button>
          )}
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={resource.title}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Type*
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={resource.type}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm"
                      required
                    >
                      <option value="devotional">Devotional</option>
                      <option value="pdf">PDF Document</option>
                      <option value="video">Video</option>
                      <option value="blog">Blog Post</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={resource.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Author*
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={resource.author}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date*
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={resource.date}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Thumbnail
                  </label>
                  <div className="mt-1 flex items-center">
                    <div className="mt-1 flex items-center gap-4">
                      <div className="mt-1 flex items-center gap-4">
                        <ImageUpload
                          onSuccess={(info) => {
                            console.log("RECEIVED UPLOAD INFO:", info); // ✅ log the received info
                            setResource((prev) => ({
                              ...prev,
                              thumbnail: info.secure_url,
                            }));
                            setThumbnailPreview(info.secure_url);
                          }}
                          folder="resources/"
                        >
                          <div className="flex items-center justify-center">
                            <FaUpload className="mr-2" />
                            {resource.thumbnail
                              ? "Change Thumbnail"
                              : "Thumbnail"}
                          </div>
                        </ImageUpload>

                        {thumbnailPreview && (
                          <div className="relative group">
                            <img
                              src={thumbnailPreview}
                              alt="Thumbnail preview"
                              className="h-16 w-16 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setThumbnailPreview("");
                                setResource((prev) => ({
                                  ...prev,
                                  thumbnail: "",
                                }));
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FaTimes size={10} />
                            </button>
                          </div>
                        )}
                      </div>

                      {thumbnailPreview && (
                        <div className="relative group">
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="h-16 w-16 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setThumbnailPreview("");
                              setResource((prev) => ({
                                ...prev,
                                thumbnail: "",
                              }));
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaTimes size={10} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {(resource.type === "devotional" ||
                  resource.type === "blog") && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Content*
                      </label>
                      <button
                        type="button"
                        onClick={() => setPreviewMode(!previewMode)}
                        className="text-sm text-royal-600 hover:text-royal-800"
                      >
                        {previewMode ? "Edit Content" : "Preview"}
                      </button>
                    </div>
                    {/* {previewMode ? (
                      <div
                        className="prose max-w-none p-4 border border-gray-300 rounded-md"
                        dangerouslySetInnerHTML={{ __html: resource.content }}
                      />
                    ) : (
                      <RichTextEditor
                        value={resource.content}
                        onChange={handleContentChange}
                        className="border border-gray-300 rounded-md min-h-[300px]"
                      />
                    )} */}
                  </div>
                )}

                {resource.type === "pdf" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      PDF File*
                    </label>
                    <div className="mt-1 flex items-center">
                      <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500 cursor-pointer">
                        <FaUpload className="mr-2" />
                        Upload PDF
                        <input
                          type="file"
                          accept="application/pdf"
                          className="sr-only"
                        />
                      </label>
                      {resource.thumbnail && (
                        <span className="ml-4 text-sm text-gray-500">
                          {resource.thumbnail}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {resource.type === "video" && (
                  <div>
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Video URL*
                    </label>
                    <input
                      type="url"
                      id="content"
                      name="content"
                      value={resource.content}
                      onChange={handleChange}
                      placeholder="https://youtube.com/embed/..."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm"
                      required
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tags
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddTag())
                      }
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm"
                      placeholder="Add tags"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-royal-500 focus:border-royal-500"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-royal-100 text-royal-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-royal-400 hover:bg-royal-200 hover:text-royal-500"
                        >
                          <FaTimes size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={resource.featured || false}
                    onChange={handleChange}
                    className="h-4 w-4 text-royal-600 focus:ring-royal-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="featured"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Featured Resource
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500 disabled:opacity-50"
                >
                  <FaSave className="mr-2" />
                  {isSubmitting ? "Saving..." : "Save Resource"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
