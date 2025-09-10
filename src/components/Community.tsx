"use client";
import React, { useState, useMemo } from "react";
import { FaPlus, FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import CommunityHeader from "@/components/layout/CommunityHeader";
import FilterTabs from "@/components/ui/FilterTabs";
import PostCard from "@/components/ui/PostCard";
import Sidebar from "@/components/layout/CommunitySideBar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Drawer } from "@/components/ui/Drawer";
import CreatePostModal from "@/components/CreatePostModal";

// Types
export type Post = {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  type: "discussion" | "project" | "announcement";
  likes: number;
  comments: number;
  images?: string[];
  prayed?: number;
};

export type PrayerWallItem = {
  title: string;
  _id: string;
  creator: {
    fullName: string;
    avatar: string;
  };
  createdAt: string;
  content: string;
  prayed?: number;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
};

function Posts({
  posts,
  onlyPost = false,
}: {
  posts: Post[];
  onlyPost?: boolean;
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  console.log(posts)

  const handlePostCreated = () => {
    console.log("Post created successfully!");
  };

  // Filter and sort posts based on active tab, search query, and sort option
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Filter by active tab
    if (activeTab !== "all") {
      result = result.filter((post) => post.type === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query)
      );
    }

    // Sort posts
    if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortBy === "popular") {
      result = [...result].sort(
        (a, b) => b.likes + b.comments - (a.likes + a.comments)
      );
    }

    return result;
  }, [posts, activeTab, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSortBy("newest");
    setActiveTab("all");
  };

  return (
    <div className="bg-gray-50 font-poppins min-h-screen">
      {!onlyPost && <CommunityHeader />}

      <div className={`container mx-auto px-4 ${onlyPost ? "pt-6" : "pt-2"}`}>
        {/* Search and Filter Bar */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search posts, authors, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaFilter className="text-gray-600" />
                <span>Filters</span>
              </button>

              {!onlyPost && (
                <button
                  onClick={() => setIsCreatePostModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus />
                  <span>Create Post</span>
                </button>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSortBy("newest")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        sortBy === "newest"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Newest
                    </button>
                    <button
                      onClick={() => setSortBy("popular")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        sortBy === "popular"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Most Popular
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Content Type
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === "all"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveTab("discussion")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === "discussion"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Discussions
                    </button>
                    <button
                      onClick={() => setActiveTab("project")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === "project"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Projects
                    </button>
                    <button
                      onClick={() => setActiveTab("announcement")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === "announcement"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Announcements
                    </button>
                  </div>
                </div>

                {(searchQuery ||
                  activeTab !== "all" ||
                  sortBy !== "newest") && (
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FaTimes className="text-xs" />
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "post" : "posts"} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-6 flex flex-col md:flex-row gap-6">
        <div className="w-full  space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-400 mb-4">
                <FaSearch size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No posts found
              </h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "Try adjusting your search or filter criteria"
                  : "There are no posts to display at the moment"}
              </p>
              {searchQuery && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - hidden when onlyPost is true */}
        {!onlyPost && (
          <Sidebar onCreatePost={() => setIsCreatePostModalOpen(true)} />
        )}

        {isMobile && !onlyPost && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsCreatePostModalOpen(true)}
              className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus size={24} />
            </button>
          </div>
        )}

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModalOpen(false)}
          onPostCreated={handlePostCreated}
        />

        {/* Mobile Sidebar Drawer - hidden when onlyPost is true */}
        {isMobile && !onlyPost && (
          <Drawer
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          >
            <div className="p-4 space-y-6">
              <Sidebar
                onCreatePost={() => {
                  setIsCreatePostModalOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
              />
            </div>
          </Drawer>
        )}
      </main>
    </div>
  );
}

export default Posts;
