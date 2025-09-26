// app/album/[id]/page.tsx
"use client";

import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Tag,
  MapPin,
  Share2,
  Download,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  AlertCircle,
  Copy,
  Facebook,
  Twitter,
  Instagram,
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
  likes?: number;
  comments?: number;
}

const ALBUM_CATEGORIES = {
  fellowship: { label: "Fellowship", color: "bg-blue-100 text-blue-800" },
  outreach: { label: "Outreach", color: "bg-green-100 text-green-800" },
  worship: { label: "Worship", color: "bg-purple-100 text-purple-800" },
  conference: { label: "Conference", color: "bg-orange-100 text-orange-800" },
  community: { label: "Community", color: "bg-pink-100 text-pink-800" },
  youth: { label: "Youth", color: "bg-indigo-100 text-indigo-800" },
  missions: { label: "Missions", color: "bg-red-100 text-red-800" },
  other: { label: "Other", color: "bg-gray-100 text-gray-800" },
};

// Custom hook for fetching album details
const useAlbum = (id: string) => {
  return useQuery({
    queryKey: ["album", id],
    queryFn: async () => {
      const response = await api.get(`/gallery/albums/${id}`);
      return response.data as Album;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// Image Modal Component
const ImageModal = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-opacity-30 rounded-full transition-all"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-opacity-30 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-opacity-30 rounded-full transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/20 px-4 py-2 rounded-full text-white">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Main image */}
      <div className="w-full h-full flex items-center justify-center p-8">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex gap-2 bg-white/20 p-2 rounded-lg max-w-screen-sm overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  /* Handle thumbnail click if needed */
                }}
                className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-white"
                    : "border-transparent opacity-60 hover:opacity-80"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Share Modal Component
const ShareModal = ({
  isOpen,
  onClose,
  album,
}: {
  isOpen: boolean;
  onClose: () => void;
  album: Album;
}) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(`Check out this album: ${album.title}`)}`,
    instagram: "#", // Instagram doesn't support direct URL sharing
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Share Album</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Copy Link */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 bg-royal-DEFAULT text-white rounded text-sm hover:bg-royal-600 transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Facebook className="w-6 h-6 text-blue-600" />
                <span className="text-sm text-gray-600">Facebook</span>
              </a>

              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Twitter className="w-6 h-6 text-blue-400" />
                <span className="text-sm text-gray-600">Twitter</span>
              </a>

              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg opacity-50">
                <Instagram className="w-6 h-6 text-pink-600" />
                <span className="text-sm text-gray-600">Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlbumDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const albumId = params?.id as string;

  // State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  // Fetch album data
  const { data: album, isLoading, isError, error, refetch } = useAlbum(albumId);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const handleNextImage = () => {
    if (album) {
      setCurrentImageIndex((prev) => (prev + 1) % album.images.length);
    }
  };

  const handlePrevImage = () => {
    if (album) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + album.images.length) % album.images.length
      );
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Implement API call to like/unlike album
  };

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${album?.title || "album"}-image-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-royal-DEFAULT mx-auto mb-4" />
          <p className="text-gray-600">Loading album...</p>
        </div>
      </div>
    );
  }

  if (isError || !album) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Album Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error?.message ||
              "The album you're looking for doesn't exist or has been removed."}
          </p>
          <button
            onClick={() => router.back()}
            className="bg-royal-DEFAULT text-white px-6 py-3 rounded-lg hover:bg-royal-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const categoryConfig =
    ALBUM_CATEGORIES[album.category as keyof typeof ALBUM_CATEGORIES] ||
    ALBUM_CATEGORIES.other;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {album.title}
                </h1>
                <p className="text-sm text-gray-500">
                  {album.images.length} photos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              <Link
                href="/admin/albums"
                className="px-4 py-2 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-600 transition-colors"
              >
                Manage Albums
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Album Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <span
                    className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${categoryConfig.color}`}
                  >
                    {categoryConfig.label}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {album.description}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(album.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{album.chapter.chapterName}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Folder className="w-4 h-4" />
                    <span>{album.images.length} photos</span>
                  </div>
                </div>

                {/* Tags */}
                {album.tags.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {album.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button
                    onClick={handleLike}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      liked
                        ? "bg-red-50 text-red-600 border border-red-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
                    />
                    {liked ? "Liked" : "Like Album"}
                  </button>

                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Album
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="lg:col-span-3">
            {album.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {album.images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image}
                      alt={`${album.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(image, index);
                          }}
                          className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Image number */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No images in this album
                </h3>
                <p className="text-gray-500">
                  This album doesn't contain any images yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        images={album.images}
        currentIndex={currentImageIndex}
        onClose={() => setIsImageModalOpen(false)}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        album={album}
      />
    </div>
  );
};

export default AlbumDetailPage;
