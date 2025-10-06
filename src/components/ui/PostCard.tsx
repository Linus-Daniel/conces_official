import { IPost } from "@/models/Post";
import React, { useState, useMemo, useCallback } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Eye,
  Clock,
  Megaphone,
  FolderOpen,
  MessageSquare,
  Church,
} from "lucide-react";
import CommentsSection from "./CommentSections";

import { useSession } from "next-auth/react";

export interface Post {
  title: string;
  content: string;
  _id:string
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
}

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

export default function PostCard({ post, featured = false }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments);
  const { data: session } = useSession();
  const user = session?.user;


  const typeConfig = useMemo(() => ({
    discussion: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: MessageSquare,
      color: "#1a3a8f",
    },
    prayer: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: Church,
      color: "#9333ea",
    },
    project: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: FolderOpen,
      color: "#10b981",
    },
    announcement: {
      bg: "bg-gradient-to-r from-[#1a3a8f] to-[#3b6fcb]",
      text: "text-white",
      icon: Megaphone,
      color: "#1a3a8f",
    },
  }), []);

  const currentTypeConfig = typeConfig[post.type];
  const TypeIcon = currentTypeConfig?.icon;


  const formattedDate = useMemo(() => {
    const date = new Date(post.date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
    return date.toLocaleDateString();
  }, [post.date]);

  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  }, [isLiked, likeCount]);

  const handleCommentClick = useCallback(() => {
    setShowComments(!showComments);
  }, [showComments]);

  const handleCommentAdded = useCallback(() => {
    setCommentsCount((prev) => prev + 1);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 mb-6">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 text-base">
                  {post.author.name}
                </h3>
                <span
                  className="px-2 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: "#e6c67b",
                    color: "#1a3a8f",
                  }}
                >
                  {post.author.role}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <Clock className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium ${currentTypeConfig?.bg} ${currentTypeConfig?.text}`}
            >
              <TypeIcon className="w-4 h-4" />
              <span className="capitalize">{post.type}</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h2
            className={`text-xl font-bold leading-tight ${
              featured ? "text-[#e6c67b]" : "text-[#1a3a8f]"
            }`}
          >
            {post.title}
          </h2>

          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="relative">
          {post.images.length === 1 ? (
            <div className="w-full">
              <img
                src={post.images[0]}
                alt="Post image"
                className="w-full h-80 object-contain bg-gray-50"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={post.images[0]}
                alt="Post image"
                className="w-full h-80 object-contain bg-gray-50"
              />
              {post.images.length > 1 && (
                <div className="absolute top-3 right-3">
                  <div className="bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1 backdrop-blur-sm">
                    <Eye className="w-4 h-4" />
                    <span>+{post.images.length - 1}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Actions */}

      {user && (
        <div className="p-4 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
                  isLiked
                    ? "bg-red-50 text-red-600"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">{likeCount}</span>
              </button>

              <button
                onClick={handleCommentClick}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
                  showComments
                    ? "bg-[#1a3a8f]/10 text-[#1a3a8f]"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{commentsCount}</span>
              </button>

              <button className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-50 text-gray-600 transition-all duration-200">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>

            {post.prayed && (
              <div className="flex items-center space-x-1 text-[#e6c67b]">
                <div className="w-2 h-2 bg-[#e6c67b] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                  {post.prayed} prayed
                </span>
              </div>
            )}
          </div>

          {showComments && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <CommentsSection
                postId={post._id as string}
                initialCommentsCount={commentsCount}
                onCommentAdded={handleCommentAdded}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
