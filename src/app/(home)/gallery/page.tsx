"use client";
import React, { useState, useEffect, FormEvent, KeyboardEvent } from "react";
import {
  Search,
  Calendar,
  MapPin,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowLeft,
} from "lucide-react";
import mockAlbums from "@/constant";

interface Chapter {
  _id: string;
  chapterName: string;
}

interface Album {
  id: number;
  title: string;
  images: string[];
  description: string;
  date: string; // ISO date string
  tags: string[];
  chapter: Chapter;
}



const AlbumGallerySystem = () => {
  const [currentView, setCurrentView] = useState<"gallery" | "album">(
    "gallery"
  );
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery filters
  const [albums] = useState<Album[]>(mockAlbums);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>(mockAlbums);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  // Get unique chapters and years
  const chapters = [
    "all",
    ...new Set(albums.map((album) => album.chapter.chapterName)),
  ];
  const years = [
    "all",
    ...new Set(albums.map((album) => album.date.split("-")[0])),
  ];

  // Filter logic
  useEffect(() => {
    let result = [...albums];

    if (searchTerm) {
      result = result.filter(
        (album) =>
          album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          album.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          album.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedChapter !== "all") {
      result = result.filter(
        (album) => album.chapter.chapterName === selectedChapter
      );
    }

    if (selectedYear !== "all") {
      result = result.filter((album) => album.date.startsWith(selectedYear));
    }

    setFilteredAlbums(result);
  }, [searchTerm, selectedChapter, selectedYear, albums]);

  const openAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setCurrentView("album");
  };

  const openImageViewer = (album: Album, imageIndex: number) => {
    setSelectedAlbum(album);
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

    window.addEventListener(
      "keydown",
      handleKeyDown as unknown as EventListener
    );
    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener
      );
  }, [selectedImage, currentImageIndex, selectedAlbum]);

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
          background:
            "linear-gradient(135deg, var(--color-royal-100), var(--color-royal-200))",
        }}
        onClick={() => onClick(album)}
      >
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, var(--color-royal-900) 0%, transparent 40%, transparent 100%)",
            opacity: 0.6,
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
            <span
              className="px-2 py-1 text-xs font-medium rounded-full"
              style={{
                backgroundColor: "var(--color-gold-400)",
                color: "var(--color-royal-900)",
              }}
            >
              {album.chapter.chapterName}
            </span>
            <span
              className="text-sm"
              style={{ color: "var(--color-gold-200)" }}
            >
              {new Date(album.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{album.title}</h3>
          <p
            className="text-sm line-clamp-2"
            style={{ color: "var(--color-gold-100)" }}
          >
            {album.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1">
              {album.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(40, 50, 174, 0.5)",
                    color: "var(--color-gold-200)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-gold-200)" }}
            >
              {album.images.length} photos
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Gallery view
  const GalleryView = () => (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-royal-50)" }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold"
              style={{ color: "var(--color-royal-dark)" }}
            >
              Gallery Albums
            </h1>
            <p style={{ color: "var(--color-royal-400)" }}>
              Explore our community moments and achievements
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-3 w-5 h-5"
                style={{ color: "var(--color-royal-400)" }}
              />
              <input
                type="text"
                placeholder="Search albums..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                style={{
                  borderColor: "var(--color-royal-200)",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 w-5 h-5"
                style={{ color: "var(--color-royal-400)" }}
              />
              <select
                className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:border-transparent appearance-none bg-white min-w-48"
                style={{
                  borderColor: "var(--color-royal-200)",
                }}
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
              <Calendar
                className="absolute left-3 top-3 w-5 h-5"
                style={{ color: "var(--color-royal-400)" }}
              />
              <select
                className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:border-transparent appearance-none bg-white min-w-32"
                style={{
                  borderColor: "var(--color-royal-200)",
                }}
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
        </div>
      </header>

      {/* Album Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {filteredAlbums.length === 0 ? (
          <div className="text-center py-16">
            <div style={{ color: "var(--color-royal-400)" }} className="mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--color-royal-800)" }}
            >
              No albums found
            </h3>
            <p style={{ color: "var(--color-royal-400)" }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album) => (
              <AlbumCollage key={album.id} album={album} onClick={openAlbum} />
            ))}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--color-royal-DEFAULT)" }}
              >
                {albums.length}
              </div>
              <div style={{ color: "var(--color-royal-400)" }}>
                Total Albums
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--color-gold-DEFAULT)" }}
              >
                {chapters.length - 1}
              </div>
              <div style={{ color: "var(--color-royal-400)" }}>
                Active Chapters
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--color-royal-600)" }}
              >
                {albums.reduce(
                  (total, album) => total + album.images.length,
                  0
                )}
              </div>
              <div style={{ color: "var(--color-royal-400)" }}>
                Total Photos
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // Album detail view
  const AlbumView = () => (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-royal-50)" }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => setCurrentView("gallery")}
            className="flex items-center mb-4 px-3 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
            style={{
              color: "var(--color-royal-DEFAULT)",
              backgroundColor: "var(--color-royal-100)",
            }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Gallery
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--color-royal-dark)" }}
              >
                {selectedAlbum?.title}
              </h1>
              <p className="mb-4" style={{ color: "var(--color-royal-400)" }}>
                {selectedAlbum?.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin
                    className="w-4 h-4"
                    style={{ color: "var(--color-royal-400)" }}
                  />
                  <span style={{ color: "var(--color-royal-800)" }}>
                    {selectedAlbum?.chapter.chapterName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar
                    className="w-4 h-4"
                    style={{ color: "var(--color-royal-400)" }}
                  />
                  <span style={{ color: "var(--color-royal-800)" }}>
                    {selectedAlbum &&
                      new Date(selectedAlbum.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </span>
                </div>
                <span style={{ color: "var(--color-royal-400)" }}>
                  {selectedAlbum?.images.length} photos
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedAlbum?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: "var(--color-gold-100)",
                      color: "var(--color-gold-800)",
                    }}
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
          {selectedAlbum?.images.map((image, index) => (
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
              <div
                className="absolute inset-0 bg-gradient-to-t from-royal-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, var(--color-royal-900) 0%, transparent 70%)",
                }}
              >
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

  // Image viewer modal
  const ImageViewer = () => {
    if (!selectedImage || !selectedAlbum) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(26, 31, 80, 0.9)" }}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full text-white hover:bg-opacity-80 transition-colors z-10"
          style={{ backgroundColor: "var(--color-royal-DEFAULT)" }}
          onClick={closeImageViewer}
        >
          <X className="h-6 w-6" />
        </button>

        <button
          className="absolute left-4 p-2 rounded-full text-white hover:bg-opacity-80 transition-colors z-10"
          style={{ backgroundColor: "var(--color-royal-DEFAULT)" }}
          onClick={() => navigateImage("prev")}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          className="absolute right-4 p-2 rounded-full text-white hover:bg-opacity-80 transition-colors z-10"
          style={{ backgroundColor: "var(--color-royal-DEFAULT)" }}
          onClick={() => navigateImage("next")}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="max-w-4xl w-full  max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col">
          <div
            className="relative flex-1 flex items-center justify-center p-4"
            style={{ backgroundColor: "var(--color-royal-50)" }}
          >
            <img
              src={selectedImage}
              alt={`${selectedAlbum.title} ${currentImageIndex + 1}`}
              className="max-w-[80%] max-h-[80%] object-contain"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--color-royal-dark)" }}
              >
                {selectedAlbum.title}
              </h2>
              <span style={{ color: "var(--color-royal-400)" }}>
                {currentImageIndex + 1} of {selectedAlbum.images.length}
              </span>
            </div>
            <p style={{ color: "var(--color-royal-800)" }}>
              {selectedAlbum.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          :root {
            --color-royal-light: #3b82f6;
            --color-royal-DEFAULT: #1d4ed8;
            --color-royal-dark: #1e40af;
            --color-gold-light: #fcd34d;
            --color-gold-DEFAULT: #f59e0b;
            --color-gold-dark: #d97706;
            --color-royal-50: #f0f5ff;
            --color-royal-100: #e0eaff;
            --color-royal-200: #c7d5ff;
            --color-royal-300: #a0b5ff;
            --color-royal-400: #7a8fff;
            --color-royal-500: #5c6cff;
            --color-royal-600: #3a4bf5;
            --color-royal-700: #2c3ad8;
            --color-royal-800: #2832ae;
            --color-royal-900: #253389;
            --color-royal-950: #1a1f50;
            --color-gold-50: #fffbeb;
            --color-gold-100: #fff4c6;
            --color-gold-200: #ffe989;
            --color-gold-300: #ffd54d;
            --color-gold-400: #ffbf24;
            --color-gold-500: #f59e0b;
            --color-gold-600: #d97706;
            --color-gold-700: #b45309;
            --color-gold-800: #92400e;
            --color-gold-900: #78350f;
          }
        `}
      </style>
      {currentView === "gallery" ? <GalleryView /> : <AlbumView />}
      <ImageViewer />
    </>
  );
};

export default AlbumGallerySystem;
