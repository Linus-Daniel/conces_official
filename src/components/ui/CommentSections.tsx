// components/ui/CommentsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axiosInstance";

interface Comment {
  _id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

interface CommentsSectionProps {
  postId: string;
  initialCommentsCount: number;
  onCommentAdded: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  initialCommentsCount,
  onCommentAdded,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `/community/posts/comments?postId=${postId}`
      );
      setComments(
        response.data.map((comment: Comment) => ({
          ...comment,
          isLiked: false,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSending(true);
    try {
      const tempId = Date.now().toString();
      const user = {
        id: "temp-user",
        name: "You",
        avatar: "/default-avatar.png",
        role: "user",
      };

      const optimisticComment: Comment = {
        _id: tempId,
        postId,
        content: newComment,
        author: user,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };

      setComments((prev) => [...prev, optimisticComment]);
      setCommentsCount((prev) => prev + 1);
      setNewComment("");

      const response = await api.post("/community/posts/comments", {
        postId,
        content: newComment,
      });

      setComments((prev) => [
        ...prev.filter((comment) => comment._id !== tempId),
        { ...response.data, isLiked: false },
      ]);

      onCommentAdded();
    } catch (err) {
      console.error("Failed to post comment:", err);
      setComments((prev) =>
        prev.filter((comment) => comment._id !== Date.now().toString())
      );
      setCommentsCount((prev) => prev - 1);
    } finally {
      setIsSending(false);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLike = async (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment._id === commentId) {
          const isLiked = !comment.isLiked;
          return {
            ...comment,
            likes: isLiked ? comment.likes + 1 : comment.likes - 1,
            isLiked,
          };
        }
        return comment;
      })
    );

    try {
      await api.patch(`/community/posts/comments/like`, { commentId });
    } catch (err) {
      console.error("Failed to like comment:", err);
      // Rollback like
      setComments((prev) =>
        prev.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            };
          }
          return comment;
        })
      );
    }
  };

  return (
    <div className="mt-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Comments ({commentsCount})</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleComments}
            className="text-muted-foreground"
          >
            {showComments ? 'Hide' : 'Show'} comments
          </Button>
        </div>

        {isLoading && !comments.length ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-primary h-6 w-6" />
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="p-4 rounded-lg bg-background border transition-all hover:shadow-sm"
              >
                <div className="flex justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>
                        {comment.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">
                          {comment.author.name}
                        </h4>
                        {comment.author.role === "admin" && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FaEllipsisVertical className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <p className="mt-3 text-sm pl-12">{comment.content}</p>
               
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmitComment} className="pt-4 border-t">
          <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9 mt-1">
              <AvatarImage src="/default-avatar.png" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="min-h-[80px] resize-none bg-muted/50 border-none focus:bg-background transition-colors"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNewComment('')}
                  disabled={!newComment.trim()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSending || !newComment.trim()}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Post"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsSection;