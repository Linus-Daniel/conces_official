"use client";
import React, { useState } from "react";
import {
  FaPray,
  FaSearch,
  FaShareSquare,
  FaComment,
  FaHeart,
  FaLightbulb,
  FaPlus,
  FaChevronDown,
} from "react-icons/fa";
import CommunityHeader from "@/components/layout/CommunityHeader";
import FilterTabs from "@/components/ui/FilterTabs";
import PostCard from "@/components/ui/PostCard";
import Sidebar from "@/components/layout/CommunitySideBar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FloatingActionButton } from "@/components/ui/FloatingButton";
import { Drawer } from "@/components/ui/Drawer";

// Types
export type Post = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  type: "discussion" | "prayer" | "project" | "announcement";
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

function CommunityPage() {
  const [createPost, setCreatePost] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
const isMobile = useMediaQuery("(max-width: 768px)");


  // Sample data - in a real app, this would come from an API
  const featuredPost: Post = {
    id: "1",
    title: "Welcome to our revamped Community Hub!",
    content:
      "Dear CONCES members, we're excited to introduce our new community platform where you can connect, share ideas, and grow together in faith and engineering excellence. Let's build a supportive community!",
    author: {
      name: "Emmanuel Okonkwo",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      role: "Admin",
    },
    date: "2 hours ago",
    type: "announcement",
    likes: 42,
    comments: 15,
  };

  const posts: Post[] = [
    {
      id: "2",
      title: "Applying engineering principles to community development",
      content:
        "I've been thinking about how we can use our engineering skills to solve problems in our local communities. Has anyone been involved in projects that address infrastructure challenges in rural areas?",
      author: {
        name: "Chioma Nwachukwu",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
        role: "Student",
      },
      date: "yesterday",
      type: "discussion",
      likes: 24,
      comments: 8,
    },
    {
      id: "3",
      title: "Prayer for upcoming final exams",
      content:
        'Please join me in prayer for all the final year students preparing for their exams. May God grant them wisdom, focus, and peace during this crucial time. "For I know the plans I have for you," declares the LORD. - Jeremiah 29:11',
      author: {
        name: "Daniel Adegoke",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
        role: "Alumni",
      },
      date: "3 days ago",
      type: "prayer",
      likes: 56,
      comments: 12,
      prayed: 23,
    },
    {
      id: "4",
      title: "Solar-powered water purification system",
      content:
        "Excited to share progress on our team's project to develop affordable solar-powered water purification systems for rural communities. We've completed the prototype and will begin field testing next month!",
      author: {
        name: "Oluwaseun Adeleke",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
        role: "Alumni",
      },
      date: "4 days ago",
      type: "project",
      likes: 38,
      comments: 16,
      images: [
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/9d9dcf75c1-63dc996275ee3b11cd38.png",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/d832446774-6d09307617380247923b.png",
      ],
    },
    {
      id: "5",
      title: "Balancing faith and science as Christian engineers",
      content:
        "How do you navigate the intersection of faith and science in your engineering studies and career? I sometimes find it challenging to reconcile certain scientific theories with biblical teachings. Would love to hear others' perspectives!",
      author: {
        name: "Blessing Okafor",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
        role: "Student",
      },
      date: "5 days ago",
      type: "discussion",
      likes: 32,
      comments: 27,
    },
  ];

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
          {/* Featured Post */}
          <PostCard post={featuredPost} featured />

          {/* Filtered Posts */}
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          <div className="text-center mt-6">
            <button className="px-6 py-2 bg-white text-royal-DEFAULT border border-royal-DEFAULT rounded-full hover:bg-royal-DEFAULT hover:text-white transition duration-300 flex items-center justify-center mx-auto">
              Load More
              <FaChevronDown className="ml-1" />
            </button>
          </div>
        </div>

        <Sidebar
          upcomingEvents={upcomingEvents}
          onCreatePost={() => setCreatePost(true)}
        />




         {/* Mobile Floating Button */}
    {isMobile && (
      <FloatingActionButton
        onClick={() => setIsMobileSidebarOpen(true)}
        icon={<FaPray />}
      />
    )}

    {/* Mobile Sidebar Drawer */}
    {isMobile && (
      <Drawer isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)}>
        <div className="p-4 space-y-6">
          <Sidebar
            upcomingEvents={upcomingEvents}
            onCreatePost={() => {
              setCreatePost(true);
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

export default CommunityPage;
