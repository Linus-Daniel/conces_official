"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Upload,
  Image as ImageIcon,
  Eye,
  Calendar,
  Tag,
  Loader2,
  AlertCircle,
  RefreshCw,
  X,
  Camera,
  Folder,
} from "lucide-react";
import { useSession } from "next-auth/react";
import api from "@/lib/axiosInstance";

interface Album {
  _id: string;
  title: string;
  description: string;
  images: string[];
  date: string;
  tags: string[];
  category: string;
  chapter: {
    _id: string;
    chapterName: string;
  };
}

// Album categories
const ALBUM_CATEGORIES = [
  {
    value: "fellowship",
    label: "Fellowship",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "outreach",
    label: "Outreach",
    color: "bg-green-100 text-green-800",
  },
  {
    value: "worship",
    label: "Worship",
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "conference",
    label: "Conference",
    color: "bg-orange-100 text-orange-800",
  },
  {
    value: "community",
    label: "Community",
    color: "bg-pink-100 text-pink-800",
  },
  { value: "youth", label: "Youth", color: "bg-indigo-100 text-indigo-800" },
  { value: "missions", label: "Missions", color: "bg-red-100 text-red-800" },
  { value: "other", label: "Other", color: "bg-gray-100 text-gray-800" },
];

// Custom hook for fetching albums
const useAlbums = (chapterId: string | undefined) => {
  return useQuery({
    queryKey: ["albums", chapterId],
    queryFn: async () => {
      if (!chapterId) throw new Error("No chapter ID provided");
      const response = await api.get(`/gallery/albums`);
      return response.data as Album[];
    },
    enabled: !!chapterId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};



// Image upload component
const ImageUploader = ({
  onImagesChange,
  images = [],
}: {
  onImagesChange: (images: string[]) => void;
  images: string[];
}) => {
  const [uploading, setUploading] = useState<number[]>([]);

  const handleFileUpload = async (files: FileList, index?: number) => {
    const uploadPromises = Array.from(files).map(async (file, fileIndex) => {
      const targetIndex =
        index !== undefined ? index : images.length + fileIndex;

      setUploading((prev) => [...prev, targetIndex]);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "albums");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const result = await response.json();
        return { index: targetIndex, url: result.secure_url };
      } catch (error) {
        console.error("Upload error:", error);
        throw error;
      } finally {
        setUploading((prev) => prev.filter((i) => i !== targetIndex));
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      const newImages = [...images];

      results.forEach(({ index, url }) => {
        newImages[index] = url;
      });

      // Add empty slots if we uploaded more images than we have slots
      while (newImages.length < images.length + files.length) {
        newImages.push("");
      }

      onImagesChange(newImages);
    } catch (error) {
      alert("Some images failed to upload. Please try again.");
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const addImageSlot = () => {
    onImagesChange([...images, ""]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
              {uploading.includes(index) ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-royal-DEFAULT" />
                </div>
              ) : image ? (
                <>
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                      <label className="cursor-pointer bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                        <Upload className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files &&
                            handleFileUpload(e.target.files, index)
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files && handleFileUpload(e.target.files, index)
                    }
                  />
                </label>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addImageSlot}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-royal-DEFAULT hover:bg-royal-50 transition-colors flex items-center justify-center gap-2 text-gray-600"
      >
        <Plus className="w-5 h-5" />
        Add More Images
      </button>
    </div>
  );
};

// Album Card Component
const AlbumCard = ({
  album,
  onEdit,
  onDelete,
}: {
  album: Album;
  onEdit: (album: Album) => void;
  onDelete: (id: string) => void;
}) => {
  const categoryConfig =
    ALBUM_CATEGORIES.find((cat) => cat.value === album.category) ||
    ALBUM_CATEGORIES.find((cat) => cat.value === "other")!;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48">
        {album.images.length > 0 ? (
          <img
            src={album.images[0]}
            alt={album.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Folder className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
            <Link
              href={`/admin/gallery/${album._id}`}
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onEdit(album)}
              className="bg-royal-DEFAULT text-white p-2 rounded-full hover:bg-royal-600 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(album._id)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${categoryConfig.color}`}
          >
            {categoryConfig.label}
          </span>
        </div>

        {/* Image count */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
          {album.images.length} photos
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-1">
          {album.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {album.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{new Date(album.date).toLocaleDateString()}</span>
        </div>

        {/* Tags */}
        {album.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {album.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {album.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{album.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="text-sm text-gray-500">{album.chapter.chapterName}</div>
      </div>
    </div>
  );
};

// Album Modal Component
const AlbumModal = ({
  isOpen,
  onClose,
  album,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  album?: Album | null;
  onSave: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [""],
    date: new Date().toISOString().split("T")[0],
    tags: "",
    category: "fellowship",
  });

  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (album) {
      setFormData({
        title: album.title,
        description: album.description,
        images: album.images.length > 0 ? album.images : [""],
        date: album.date,
        tags: album.tags.join(", "),
        category: album.category || "fellowship",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        images: [""],
        date: new Date().toISOString().split("T")[0],
        tags: "",
        category: "fellowship",
      });
    }
  }, [album, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const albumData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        images: formData.images.filter((img) => img.trim() !== ""),
      };

      if (album) {
        await api.put(`/albums/${album._id}`, albumData);
      } else {
        await api.post("/albums", albumData);
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving album:", error);
      alert("Error saving album. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {album ? "Edit Album" : "Create New Album"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                required
                placeholder="Enter album title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                required
              >
                {ALBUM_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
              required
              placeholder="Describe this album..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="community, fellowship, outreach"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Images
            </label>
            <ImageUploader
              images={formData.images}
              onImagesChange={(images) => setFormData({ ...formData, images })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? "Saving..." : album ? "Update Album" : "Create Album"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminAlbumsPage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const user = session?.user;
  const userChapter = user?.chapter;

  // React Query for albums
  const {
    data: albums = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    dataUpdatedAt,
  } = useAlbums(userChapter);

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedChapter, setSelectedChapter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
console.log(albums)
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/albums/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
  });

  // Filtered albums
  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      const matchesSearch =
        album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || album.category === selectedCategory;

      const matchesChapter =
        selectedChapter === "all" ||
        album.chapter.chapterName === selectedChapter;

      return matchesSearch && matchesCategory && matchesChapter;
    });
  }, [albums, searchTerm, selectedCategory, selectedChapter]);

  // Get unique chapters
  const chapters = useMemo(() => {
    return [
      "all",
      ...new Set(albums.map((album) => album.chapter.chapterName)),
    ];
  }, [albums]);

  const handleEdit = (album: Album) => {
    setEditingAlbum(album);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this album?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAlbum(null);
  };

  const handleSave = () => {
    queryClient.invalidateQueries({ queryKey: ["albums"] });
  };

  const getTimeSinceUpdate = () => {
    if (!dataUpdatedAt) return null;
    const seconds = Math.floor((Date.now() - dataUpdatedAt) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-royal-DEFAULT mx-auto mb-4" />
          <p className="text-gray-600">Loading albums...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Album Management
              </h1>
              <p className="text-gray-600">
                Manage your gallery albums and organize your memories
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Status */}
              {dataUpdatedAt > 0 && (
                <span className="text-sm text-gray-500">
                  Updated {getTimeSinceUpdate()}
                </span>
              )}

              {/* Refresh */}
              <button
                onClick={() => refetch()}
                disabled={isRefetching}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`}
                />
                <span className="text-sm">Refresh</span>
              </button>

              {/* Add Album */}
              <button
                onClick={() => {
                  setEditingAlbum(null);
                  setIsModalOpen(true);
                }}
                className="bg-royal-DEFAULT text-white px-6 py-3 rounded-lg hover:bg-royal-600 flex items-center gap-2 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Create Album
              </button>
            </div>
          </div>
        </div>

        {/* Error state */}
        {isError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-800 font-medium">Error loading albums</p>
                <p className="text-red-600 text-sm mt-1">
                  {error?.message || "Failed to load albums. Please try again."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search albums by title or description..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {ALBUM_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
              >
                {chapters.map((chapter) => (
                  <option key={chapter} value={chapter}>
                    {chapter === "all" ? "All Chapters" : chapter}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">{filteredAlbums.length}</span> of{" "}
              <span className="font-medium">{albums.length}</span> albums
            </div>

            {(searchTerm ||
              selectedCategory !== "all" ||
              selectedChapter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedChapter("all");
                }}
                className="text-sm text-royal-DEFAULT hover:text-royal-600 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Albums Grid */}
        <div className="relative">
          {isRefetching && albums.length > 0 && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
              <Loader2 className="w-8 h-8 animate-spin text-royal-DEFAULT" />
            </div>
          )}

          {filteredAlbums.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAlbums.map((album) => (
                <AlbumCard
                  key={album._id}
                  album={album}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {albums.length === 0
                  ? "No albums yet"
                  : "No albums match your filters"}
              </h3>
              <p className="text-gray-500 mb-6">
                {albums.length === 0
                  ? "Create your first album to get started"
                  : "Try adjusting your search criteria"}
              </p>
              {albums.length === 0 && (
                <button
                  onClick={() => {
                    setEditingAlbum(null);
                    setIsModalOpen(true);
                  }}
                  className="bg-royal-DEFAULT text-white px-6 py-3 rounded-lg hover:bg-royal-600 flex items-center gap-2 mx-auto transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Album
                </button>
              )}
            </div>
          )}
        </div>

        {/* Album Modal */}
        <AlbumModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          album={editingAlbum}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default AdminAlbumsPage;
