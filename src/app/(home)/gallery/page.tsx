"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  Search,
  Calendar,
  MapPin,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowLeft,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import api from "@/lib/axiosInstance";

interface Chapter {
  _id: string;
  chapterName: string;
}

interface Album {
  _id: string;
  title: string;
  images: string[];
  description: string;
  date: string;
  tags: string[];
  category: string;
  chapter: Chapter;
  likes: number;
  comments: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Album categories for filtering
const ALBUM_CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "fellowship", label: "Fellowship" },
  { value: "outreach", label: "Outreach" },
  { value: "worship", label: "Worship" },
  { value: "conference", label: "Conference" },
  { value: "community", label: "Community" },
  { value: "youth", label: "Youth" },
  { value: "missions", label: "Missions" },
  { value: "other", label: "Other" },
];

// Custom hook for fetching albums
const useAlbums = (chapterId?: string) => {
  return useQuery({
    queryKey: ["albums", chapterId],
    queryFn: async () => {
      let endpoint = "/gallery/albums";
      if (chapterId) {
        endpoint = `/chapters/${chapterId}/albums`;
      }
      const response = await api.get(endpoint);
      return response.data as Album[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// Single album hook for detail view
const useAlbum = (albumId: string | null) => {
  return useQuery({
    queryKey: ["album", albumId],
    queryFn: async () => {
      if (!albumId) throw new Error("No album ID provided");
      const response = await api.get(`/gallery/albums/${albumId}`);
      return response.data as Album;
    },
    enabled: !!albumId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

const AlbumGallerySystem = () => {
  const { data: session } = useSession();
  const [currentView, setCurrentView] = useState<"gallery" | "album">(
    "gallery"
  );
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [showUserChapterOnly, setShowUserChapterOnly] = useState(false);

  // Determine which albums to fetch
  const fetchChapterId = useMemo(() => {
    if (showUserChapterOnly && session?.user?.chapter) {
      return session.user.chapter;
    }
    return undefined; // Fetch all albums
  }, [showUserChapterOnly, session?.user?.chapter]);

  // Fetch albums
  const {
    data: albums = [],
    isLoading: albumsLoading,
    isError: albumsError,
    error: albumsErrorData,
    refetch: refetchAlbums,
    isRefetching: albumsRefetching,
  } = useAlbums(fetchChapterId);

  // Fetch single album for detail view
  const {
    data: selectedAlbum,
    isLoading: albumLoading,
    isError: albumError,
  } = useAlbum(selectedAlbumId);

  // Get unique chapters, categories, and years from fetched data
  const { chapters, years } = useMemo(() => {
    const uniqueChapters = [
      "all",
      ...new Set(albums.map((album) => album.chapter.chapterName)),
    ];
    const uniqueYears = [
      "all",
      ...new Set(
        albums.map((album) => new Date(album.date).getFullYear().toString())
      ),
    ];
    return {
      chapters: uniqueChapters,
      years: uniqueYears,
    };
  }, [albums]);

  // Filter albums
  const filteredAlbums = useMemo(() => {
    let result = [...albums];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (album) =>
          album.title.toLowerCase().includes(searchLower) ||
          album.description.toLowerCase().includes(searchLower) ||
          album.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Chapter filter
    if (selectedChapter !== "all") {
      result = result.filter(
        (album) => album.chapter.chapterName === selectedChapter
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((album) => album.category === selectedCategory);
    }

    // Year filter
    if (selectedYear !== "all") {
      result = result.filter(
        (album) =>
          new Date(album.date).getFullYear().toString() === selectedYear
      );
    }

    // Sort by date (newest first)
    result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return result;
  }, [albums, searchTerm, selectedChapter, selectedCategory, selectedYear]);

  const openAlbum = (album: Album) => {
    setSelectedAlbumId(album._id);
    setCurrentView("album");
  };

  const openImageViewer = (album: Album, imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setSelectedImage(album.images[imageIndex]);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedAlbum) return;

    let newIndex;
    if (direction === "prev") {
      newIndex =
        currentImageIndex === 0
          ? selectedAlbum.images.length - 1
          : currentImageIndex - 1;
    } else {
      newIndex =
        currentImageIndex === selectedAlbum.images.length - 1
          ? 0
          : currentImageIndex + 1;
    }

    setCurrentImageIndex(newIndex);
    setSelectedImage(selectedAlbum.images[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "Escape") closeImageViewer();
        if (e.key === "ArrowLeft") navigateImage("prev");
        if (e.key === "ArrowRight") navigateImage("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentImageIndex, selectedAlbum]);

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedChapter("all");
    setSelectedCategory("all");
    setSelectedYear("all");
    setShowUserChapterOnly(false);
  };

  // Album collage component
  const AlbumCollage = ({
    album,
    onClick,
  }: {
    album: Album;
    onClick: (album: Album) => void;
  }) => {
    const displayImages = album.images.slice(0, 5);

    return (
      <div
        className="relative h-80 rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #f0f5ff, #e0eaff)",
        }}
        onClick={() => onClick(album)}
      >
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(26, 31, 80, 0.8) 0%, transparent 40%, transparent 100%)",
          }}
        />

        {/* Images collage */}
        <div className="relative w-full h-full">
          {displayImages.map((image, index) => {
            const positions = [
              {
                top: "10%",
                left: "10%",
                width: "45%",
                height: "40%",
                zIndex: 5,
              },
              {
                top: "15%",
                right: "10%",
                width: "35%",
                height: "35%",
                zIndex: 4,
              },
              {
                bottom: "15%",
                left: "15%",
                width: "30%",
                height: "30%",
                zIndex: 3,
              },
              {
                bottom: "20%",
                right: "15%",
                width: "25%",
                height: "25%",
                zIndex: 2,
              },
              {
                top: "45%",
                left: "40%",
                width: "20%",
                height: "20%",
                zIndex: 1,
              },
            ];

            const position = positions[index] || positions[0];

            return (
              <div
                key={index}
                className="absolute rounded-lg overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300"
                style={{
                  top: position.top,
                  left: position.left,
                  right: position.right,
                  bottom: position.bottom,
                  width: position.width,
                  height: position.height,
                  zIndex: position.zIndex,
                }}
              >
                <img
                  src={image}
                  alt={`${album.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Album info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500 text-white">
              {album.chapter.chapterName}
            </span>
            <span className="text-sm text-blue-200">
              {new Date(album.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {album.featured && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500 text-yellow-900">
                Featured
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{album.title}</h3>
          <p className="text-sm line-clamp-2 text-blue-100">
            {album.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1">
              {album.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-blue-500 bg-opacity-50 text-blue-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span className="text-sm font-medium text-blue-200">
              {album.images.length} photos
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Loading skeleton
  const AlbumSkeleton = () => (
    <div className="h-80 rounded-xl bg-gray-200 animate-pulse">
      <div className="w-full h-full bg-gradient-to-t from-gray-300 to-gray-200 rounded-xl"></div>
    </div>
  );

  // Gallery view
  const GalleryView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-blue-900">
                Gallery Albums
              </h1>
              <p className="text-blue-600">
                Explore our community moments and achievements
              </p>
            </div>

            {/* Refresh button */}
            <button
              onClick={() => refetchAlbums()}
              disabled={albumsRefetching}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${albumsRefetching ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search albums..."
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-48"
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                >
                  <option value="all">All Chapters</option>
                  {chapters.slice(1).map((chapter) => (
                    <option key={chapter} value={chapter}>
                      {chapter}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Tag className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-40"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {ALBUM_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-32"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="all">All Years</option>
                  {years.slice(1).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* User chapter filter and clear filters */}
            <div className="flex items-center justify-between">
              {session?.user?.chapter && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showUserChapterOnly}
                    onChange={(e) => setShowUserChapterOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-blue-700">
                    Show only my chapter
                  </span>
                </label>
              )}

              {(searchTerm ||
                selectedChapter !== "all" ||
                selectedCategory !== "all" ||
                selectedYear !== "all" ||
                showUserChapterOnly) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Error state */}
      {albumsError && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Error loading albums</p>
                <p className="text-red-600 text-sm mt-1">
                  {albumsErrorData?.message ||
                    "Failed to load albums. Please try again."}
                </p>
                <button
                  onClick={() => refetchAlbums()}
                  className="mt-3 text-sm text-red-700 hover:text-red-800 font-medium underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Album Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {albumsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <AlbumSkeleton key={i} />
            ))}
          </div>
        ) : filteredAlbums.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-blue-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">
              No albums found
            </h3>
            <p className="text-blue-600">
              {albums.length === 0
                ? "No albums have been created yet"
                : "Try adjusting your search or filter criteria"}
            </p>
            {(searchTerm ||
              selectedChapter !== "all" ||
              selectedCategory !== "all" ||
              selectedYear !== "all" ||
              showUserChapterOnly) && (
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album) => (
              <AlbumCollage key={album._id} album={album} onClick={openAlbum} />
            ))}
          </div>
        )}

        {/* Statistics */}
        {albums.length > 0 && (
          <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {albums.length}
                </div>
                <div className="text-blue-400">Total Albums</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600">
                  {chapters.length - 1}
                </div>
                <div className="text-blue-400">Active Chapters</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {albums.reduce(
                    (total, album) => total + album.images.length,
                    0
                  )}
                </div>
                <div className="text-blue-400">Total Photos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">
                  {albums.filter((album) => album.featured).length}
                </div>
                <div className="text-blue-400">Featured Albums</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );

  // Album detail view
  const AlbumView = () => {
    if (albumLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-blue-600">Loading album...</p>
          </div>
        </div>
      );
    }

    if (albumError || !selectedAlbum) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Album Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The album you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => setCurrentView("gallery")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <button
              onClick={() => setCurrentView("gallery")}
              className="flex items-center mb-4 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Gallery
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-blue-900">
                  {selectedAlbum.title}
                </h1>
                <p className="mb-4 text-blue-600">
                  {selectedAlbum.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-800">
                      {selectedAlbum.chapter.chapterName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-800">
                      {new Date(selectedAlbum.date).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <span className="text-blue-600">
                    {selectedAlbum.images.length} photos
                  </span>
                  {selectedAlbum.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedAlbum.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Images Grid */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selectedAlbum.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => openImageViewer(selectedAlbum, index)}
              >
                <img
                  src={image}
                  alt={`${selectedAlbum.title} ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 text-white font-medium text-sm">
                    {index + 1} of {selectedAlbum.images.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  };

  // Image viewer modal
  const ImageViewer = () => {
    if (!selectedImage || !selectedAlbum) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors z-10"
          onClick={closeImageViewer}
        >
          <X className="h-6 w-6" />
        </button>

        <button
          className="absolute left-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors z-10"
          onClick={() => navigateImage("prev")}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          className="absolute right-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors z-10"
          onClick={() => navigateImage("next")}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="max-w-4xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col">
          <div className="relative flex-1 flex items-center justify-center p-4 bg-gray-50">
            <img
              src={selectedImage}
              alt={`${selectedAlbum.title} ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-900">
                {selectedAlbum.title}
              </h2>
              <span className="text-blue-600">
                {currentImageIndex + 1} of {selectedAlbum.images.length}
              </span>
            </div>
            <p className="text-blue-800">{selectedAlbum.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {currentView === "gallery" ? <GalleryView /> : <AlbumView />}
      <ImageViewer />
    </>
  );
};

export default AlbumGallerySystem;
