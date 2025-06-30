import { IPost } from "@/models/Post";
import React, { useState } from "react";
import { FaPray, FaHeart, FaComment, FaShareSquare } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import CommentsSection from "./CommentSections";

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

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

export default function PostCard({ post, featured = false }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [hasPrayed, setHasPrayed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handlePray = () => {
    setHasPrayed(!hasPrayed);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const typeColors = {
    discussion: { bg: "bg-indigo-100", text: "text-indigo-800" },
    prayer: { bg: "bg-purple-100", text: "text-purple-800" },
    project: { bg: "bg-green-100", text: "text-green-800" },
    announcement: { bg: "bg-royal-DEFAULT", text: "text-white" },
  };

  return (
    <div
      className={`rounded-xl overflow-hidden ${
        post.type=="announcement"
          ? "bg-gradient-to-r from-royal-light to-royal-DEFAULT p-1"
          : "bg-white shadow-sm border border-gray-200"
      }`}
    >
      <div
        className={`rounded-lg overflow-hidden ${post.type=="announcement" ? "bg-white" : ""}`}
      >
        <div className="p-4 md:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3"
              />
              <div>
                <div className="flex items-center">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    {post.author.name}
                  </h3>
                  <span className="ml-2 px-2 py-0.5 bg-gold-light text-white text-xs rounded-full">
                    {post.author.role}
                  </span>
                </div>
                <p className="text-gray-500 text-xs md:text-sm">{post.date}</p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                typeColors[post.type].bg
              } ${typeColors[post.type].text}`}
            >
              {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
            </span>
          </div>

          <h2
            className={`text-lg md:text-xl font-bold mb-3 ${
              featured ? "text-gold-DEFAULT" : "text-royal-DEFAULT"
            }`}
          >
            {post.title}
          </h2>

          <p className="text-gray-700 mb-4 text-sm md:text-base">
            {post.content}
          </p>

          {post.images && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {post.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="w-full h-32 md:h-40 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCommentClick}
                className={`flex items-center ${
                  showComments ? "text-royal-DEFAULT" : "text-gray-500"
                } hover:text-royal-DEFAULT`}
              >
                <FaComment className="mr-1" />
                <span className="text-sm">Comments: {commentsCount}</span>
              </button>
            </div>

            <button className="text-gray-500 hover:text-royal-DEFAULT">
              <FaEllipsisVertical />
            </button>
          </div>

          {showComments && (
            <CommentsSection
              postId={post._id as string}
              initialCommentsCount={commentsCount}
              onCommentAdded={() => setCommentsCount((prev) => prev + 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
