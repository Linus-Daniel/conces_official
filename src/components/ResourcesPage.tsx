"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CategoryCard from "@/components/ui/CategoryCard";
import ResourceCard from "@/components/ui/ResourceCard";
import { categories } from "@/constant";
import { Resource } from "@/types";
import Link from "next/link";
import {
  FaPhotoVideo,
  FaPray,
  FaSearch,
  FaBars,
  FaBook,
  FaBookmark,
  FaBookOpen,
  FaBorderAll,
  FaBriefcase,
  FaDownload,
  FaEye,
  FaUpload,
  FaFilter,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";

interface ResourcesComponentProps {
  resources: Resource[];
  userRole: string;
  branch?: string;
  accountMode?: boolean;
}

// Memoized component to prevent unnecessary re-renders
const FilterButton = ({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-2 mx-1 font-medium rounded-full whitespace-nowrap transition-colors ${
      active
        ? "bg-conces-blue text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    <Icon  /> {label}
  </button>
);

function ResourcesComponent({
  resources,
  userRole,
  branch = "",
  accountMode = false,
}: ResourcesComponentProps) {
  const isStudent = useMemo(
    () => userRole?.toLowerCase() === "student",
    [userRole]
  );
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(branch);
  const [selectedType, setSelectedType] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [displayedResources, setDisplayedResources] = useState<Resource[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  // Memoized derived data
  const branches = useMemo(
    () =>
      Array.from(new Set(resources.map((resource) => resource.branch))).filter(
        Boolean
      ),
    [resources]
  );

  const types = useMemo(
    () =>
      Array.from(new Set(resources.map((resource) => resource.type))).filter(
        Boolean
      ),
    [resources]
  );

  const getUploadPath = useCallback((role: string) => {
    const paths: Record<string, string> = {
      admin: "/admin/resources/new",
      "branch-admin": "/chapters/resources/new",
      alumni: "/alumni/resources/new",
    };
    return paths[role.toLowerCase()] || "/resources";
  }, []);

  // Optimized filter function
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      if (activeCategory !== "all" && resource.category !== activeCategory)
        return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !resource.title.toLowerCase().includes(query) &&
          !resource.description?.toLowerCase().includes(query)
        )
          return false;
      }
      if (selectedBranch && resource.branch !== selectedBranch) return false;
      if (selectedType && resource.type !== selectedType) return false;
      return true;
    });
  }, [resources, activeCategory, searchQuery, selectedBranch, selectedType]);

  // Infinite scroll implementation with better performance
  const lastResourceRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (
        isLoadingMore ||
        displayedResources.length >= filteredResources.length
      )
        return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsLoadingMore(true);
            // Use requestAnimationFrame for smoother loading
            requestAnimationFrame(() => {
              const nextResources = filteredResources.slice(
                displayedResources.length,
                displayedResources.length + 8
              );
              setDisplayedResources((prev) => [...prev, ...nextResources]);
              setIsLoadingMore(false);
            });
          }
        },
        { threshold: 0.1 }
      );

      if (node) observer.current.observe(node);
    },
    [isLoadingMore, displayedResources, filteredResources]
  );

  // Reset displayed resources when filters change
  useEffect(() => {
    setDisplayedResources(filteredResources.slice(0, 12));
  }, [filteredResources]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedBranch(branch);
    setSelectedType("");
    setActiveCategory("all");
  }, [branch]);

  const hasActiveFilters = useMemo(
    () =>
      searchQuery ||
      selectedBranch !== branch ||
      selectedType ||
      activeCategory !== "all",
    [searchQuery, selectedBranch, branch, selectedType, activeCategory]
  );

  // Memoized academic resources for better performance
  const academicResources = useMemo(
    () =>
      filteredResources.filter((r) => r.category === "academic").slice(0, 8),
    [filteredResources]
  );

  // Account mode component - separated for better readability
  const AccountModeView = useMemo(
    () => (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-conces-blue">
                My Resources
              </h1>
              <p className="text-royal-700">
                Access and manage your learning materials
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-royal-50 text-royal-800 rounded-lg hover:bg-royal-100 transition-colors"
              >
                <FaFilter />
                Filters
              </button>

              {!isStudent && (
                <Link
                  href={getUploadPath(userRole)}
                  className="flex items-center gap-2 px-4 py-2 bg-conces-blue text-white rounded-lg hover:bg-royal-dark transition-colors"
                >
                  <FaUpload />
                  Upload
                </Link>
              )}
            </div>
          </div>

          <div className="mt-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-royal-500">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search your resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-royal-200 rounded-lg focus:ring-2 focus:ring-conces-blue focus:border-conces-blue outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-royal-400 hover:text-royal-600"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-royal-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-royal-700 mb-1">
                    Branch
                  </label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full rounded-lg border-royal-200 py-2 px-3 text-royal-800 bg-white focus:border-conces-blue focus:ring-2 focus:ring-conces-blue/20 outline-none"
                  >
                    <option value="">All Branches</option>
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-royal-700 mb-1">
                    Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full rounded-lg border-royal-200 py-2 px-3 text-royal-800 bg-white focus:border-conces-blue focus:ring-2 focus:ring-conces-blue/20 outline-none"
                  >
                    <option value="">All Types</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {hasActiveFilters && (
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="text-conces-blue hover:text-royal-dark font-medium flex items-center gap-1"
                    >
                      <FaTimes className="text-xs" />
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedResources.map((resource, index) => (
              <div
                key={`${resource._id}-${index}`}
                ref={
                  index === displayedResources.length - 1
                    ? lastResourceRef
                    : null
                }
              >
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>

          {isLoadingMore && (
            <div className="flex justify-center mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-conces-blue"></div>
            </div>
          )}

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="text-royal-400 mb-4">
                <FaBook className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-royal-800 mb-2">
                No resources found
              </h3>
              <p className="text-royal-600">
                {hasActiveFilters
                  ? "Try adjusting your filters to see more resources"
                  : "You haven't uploaded or saved any resources yet"}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-conces-blue hover:text-royal-dark font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    ),
    [
      isStudent,
      userRole,
      searchQuery,
      selectedBranch,
      selectedType,
      showFilters,
      branches,
      types,
      hasActiveFilters,
      clearFilters,
      displayedResources,
      isLoadingMore,
      filteredResources,
      lastResourceRef,
      getUploadPath,
    ]
  );

  // Early return for account mode
  if (accountMode) {
    return AccountModeView;
  }

  // Standard mode UI
  return (
    <div>
      <section className="bg-gradient-to-r from-royal-DEFAULT to-conces-blue text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Resources Hub
              </h1>
              <p className="text-white text-opacity-90 max-w-xl">
                Discover learning materials, spiritual growth tools, and career
                resources
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="bg-white rounded-lg p-1 flex items-center shadow-sm">
                <FaSearch className="text-royal-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search articles, courses, devotionals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-2 w-full md:w-80 outline-none text-gray-700 rounded-lg"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-conces-gold hover:bg-yellow-500 text-conces-blue font-medium px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <FaFilter /> Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showFilters && (
        <section className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-royal-700 mb-1">
                  Branch
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full md:w-48 rounded-lg border-royal-200 py-2 px-3 text-royal-800 bg-royal-50 focus:border-conces-blue focus:ring-2 focus:ring-conces-blue/20 outline-none"
                >
                  <option value="">All Branches</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-royal-700 mb-1">
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full md:w-48 rounded-lg border-royal-200 py-2 px-3 text-royal-800 bg-royal-50 focus:border-conces-blue focus:ring-2 focus:ring-conces-blue/20 outline-none"
                >
                  <option value="">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="text-conces-blue hover:text-royal-dark font-medium flex items-center gap-1"
                  >
                    <FaTimes className="text-xs" />
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 -mx-4 px-4 md:px-0 md:justify-center">
            <FilterButton
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              icon={FaBorderAll}
              label="All"
            />
            <FilterButton
              active={activeCategory === "academic"}
              onClick={() => setActiveCategory("academic")}
              icon={FaBook}
              label="Academic"
            />
            <FilterButton
              active={activeCategory === "spiritual"}
              onClick={() => setActiveCategory("spiritual")}
              icon={FaPray}
              label="Spiritual"
            />
            <FilterButton
              active={activeCategory === "career"}
              onClick={() => setActiveCategory("career")}
              icon={FaBriefcase}
              label="Career"
            />
            <FilterButton
              active={activeCategory === "media"}
              onClick={() => setActiveCategory("media")}
              icon={FaPhotoVideo}
              label="Media"
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {hasActiveFilters && (
          <div className="mb-6 flex justify-between items-center">
            <p className="text-royal-700 text-sm font-medium">
              {filteredResources.length} resources found
              {selectedBranch && ` in ${selectedBranch}`}
            </p>
            <button
              onClick={clearFilters}
              className="text-xs text-conces-blue hover:text-royal-dark font-medium flex items-center gap-1"
            >
              <FaTimes className="text-xs" />
              Clear filters
            </button>
          </div>
        )}

        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Engineering Learning Resources
            </h2>
            <span className="text-conces-blue hover:underline text-sm font-medium cursor-pointer">
              View all
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicResources.map((item, index) => (
              <ResourceCard resource={item} key={item._id} />
            ))}
          </div>
        </section>

        {/* Other sections would go here */}

        {userRole && !isStudent && (
          <section className="mb-10 bg-gradient-to-r from-royal-light to-conces-blue rounded-xl overflow-hidden shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 p-8">
                <div className="inline-block bg-white bg-opacity-20 text-royal-DEFAULT text-sm px-3 py-1 rounded-full mb-4">
                  Alumni & Admin Feature
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Share Your Knowledge
                </h2>
                <p className="text-white text-opacity-90 mb-6">
                  Contribute valuable resources to help others grow
                </p>
                <Link
                  href={getUploadPath(userRole)}
                  className="inline-flex bg-white text-conces-blue hover:bg-gray-100 font-medium px-6 py-3 rounded-lg transition items-center"
                >
                  <FaUpload className="mr-2" /> Upload New Resource
                </Link>
              </div>
              <div className="md:w-1/3 relative hidden md:block">
                <img
                  className="w-full h-full object-cover"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/34ce8892b8-b213797673b80ccc1620.png"
                  alt="Nigerian engineering alumni sharing knowledge"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        )}
      </main>

      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button className="bg-conces-blue text-white p-4 rounded-full shadow-lg">
          <FaBars />
        </button>
      </div>
    </div>
  );
}

export default ResourcesComponent;
