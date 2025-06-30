"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
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

function Posts({posts}:{posts:Post[]}) {
  const [activeTab, setActiveTab] = useState("all");

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
    const handlePostCreated = () => {
    // In a real app, you would fetch the updated posts from the API
    // For now, we'll just show a success message
    console.log("Post created successfully!");
  };



  const upcomingEvents: EventItem[] = [
    {
      id: "1",
      title: "Monthly Prayer Meeting",
      date: "12 JUN",
      time: "7:00 PM - 8:30 PM",
      location: "Virtual (Zoom)",
    },
    {
      id: "2",
      title: "Tech Talk: Faith & AI",
      date: "18 JUN",
      time: "5:30 PM - 7:00 PM",
      location: "Lagos Chapter Office",
    },
    {
      id: "3",
      title: "Mentorship Meetup",
      date: "25 JUN",
      time: "2:00 PM - 4:00 PM",
      location: "Abuja Chapter Office",
    },
  ];

  const filteredPosts =
    activeTab === "all"
      ? posts
      : posts.filter((post) => post.type === activeTab);

  return (
    <div className="bg-gray-50 font-poppins min-h-screen">
      <CommunityHeader />

      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4 space-y-6">

          
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        <Sidebar
          onCreatePost={() => setIsCreatePostModalOpen(true)}
        />

        {/* Mobile Floating Button */}
        {isMobile && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsCreatePostModalOpen(true)}
            className="bg-royal-DEFAULT text-white rounded-full p-4 shadow-lg hover:bg-royal-dark transition-colors"
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
        {/* Mobile Sidebar Drawer */}
        {isMobile && (
          <Drawer
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          >
            <div className="p-4 space-y-6">
              <Sidebar
                // upcomingEvents={upcomingEvents}
                onCreatePost={() => {
                  setIsCreatePostModalOpen(true)
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
