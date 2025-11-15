"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaClock,
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaShare,
  FaBookOpen,
  FaFacebook,
  FaLinkedin,
  FaLink,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import api from "@/lib/axiosInstance";

// Define TypeScript interfaces for our blog data
interface BlogAuthor {
  name: string;
  avatar: string;
  role: string;
  bio: string;
  userId: string;
}

interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featured: boolean;
  published: boolean;
  publishedAt: string;
  readTime: number;
  author: BlogAuthor;
  metaTitle: string;
  metaDescription: string;
  views: number;
  likes: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const BlogPostPage = () => {
  const router = useRouter();
  const param = useParams();
  const slug = param.slug;

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch blog post from API
  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await api.get(`/blog/${slug}`);

        const data = response.data.blog;
        setBlogPost(data);
        setRelatedPosts(data.relatedPosts || []);

        // Check if user has liked this post
        const likedPosts = JSON.parse(
          localStorage.getItem("likedPosts") || "[]"
        );
        setIsLiked(likedPosts.includes(data.post?._id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  const handleLike = async () => {
    if (!blogPost) return;

    try {
      // Optimistic UI update
      setIsLiked(!isLiked);
      const newLikes = isLiked ? blogPost.likes - 1 : blogPost.likes + 1;
      setBlogPost({ ...blogPost, likes: newLikes });

      // Update localStorage
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
      if (isLiked) {
        localStorage.setItem(
          "likedPosts",
          JSON.stringify(
            likedPosts.filter((id: string) => id !== blogPost?._id)
          )
        );
      } else {
        localStorage.setItem(
          "likedPosts",
          JSON.stringify([...likedPosts, blogPost?._id])
        );
      }

      // Send like to API
      await api.post(`/blog/${slug}/like`, { liked: !isLiked });
    } catch (err) {
      console.error("Error updating like:", err);
      // Revert on error
      setIsLiked(!isLiked);
      setBlogPost({ ...blogPost, likes: blogPost.likes });
    }
  };

  const sharePost = (platform: string) => {
    if (!blogPost) return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blogPost.title);
    const text = encodeURIComponent(blogPost.excerpt);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "copy":
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "spiritual":
        return "bg-green-100 text-green-800";
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "career":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Content
          </h2>
          <p className="text-gray-600 mb-4">{error || "Blog post not found"}</p>
          <Link
            href="/blog"
            className="px-4 py-2 bg-royal-600 text-white rounded-md hover:bg-royal-700 inline-flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{blogPost.metaTitle || blogPost.title} | CONCES</title>
        <meta
          name="description"
          content={blogPost.metaDescription || blogPost.excerpt}
        />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:image" content={blogPost.featuredImage} />
        <meta property="og:type" content="article" />
      </Head>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-royal-600 hover:text-royal-800 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <span
              className={`${getCategoryColor(
                blogPost.category
              )} text-xs px-3 py-1 rounded-full font-medium`}
            >
              {blogPost.category.charAt(0).toUpperCase() +
                blogPost.category.slice(1)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blogPost.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">{blogPost.excerpt}</p>

          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-6">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full mr-3"
                src={blogPost.author.avatar}
                alt={blogPost.author.name}
              />
              <div>
                <p className="font-medium text-gray-900">
                  {blogPost.author.name}
                </p>
                <p>{blogPost.author.role}</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaCalendarAlt className="mr-1" />
              {formatDate(blogPost.publishedAt)}
            </div>

            <div className="flex items-center">
              <FaClock className="mr-1" />
              {blogPost.readTime} min read
            </div>

            <div className="flex items-center">
              <FaEye className="mr-1" />
              {blogPost.views} views
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src={blogPost.featuredImage}
              alt={blogPost.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </div>

        {/* Tags */}
        {blogPost.tags && blogPost.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 py-6 border-t border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isLiked
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaHeart className={isLiked ? "fill-current" : ""} />
              <span>{blogPost.likes} Likes</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">Share:</span>
            <button
              onClick={() => sharePost("facebook")}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Share on Facebook"
            >
              <FaFacebook size={18} />
            </button>
            <button
              onClick={() => sharePost("twitter")}
              className="p-2 text-gray-600 hover:text-blue-400 transition-colors"
              aria-label="Share on Twitter"
            >
              <FaXTwitter size={18} />
            </button>
            <button
              onClick={() => sharePost("linkedin")}
              className="p-2 text-gray-600 hover:text-blue-700 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin size={18} />
            </button>
            <button
              onClick={() => sharePost("copy")}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Copy link"
            >
              <FaLink size={18} />
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            About the Author
          </h3>
          <div className="flex items-start">
            <img
              className="h-16 w-16 rounded-full mr-4"
              src={blogPost.author.avatar}
              alt={blogPost.author.name}
            />
            <div>
              <h4 className="font-medium text-gray-900">
                {blogPost.author.name}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {blogPost.author.role}
              </p>
              <p className="text-gray-700">{blogPost.author.bio}</p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md cursor-pointer">
                    <div className="h-40 overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        src={post.featuredImage}
                        alt={post.title}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center mt-3 text-xs text-gray-500">
                        <FaClock className="mr-1" size={10} />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default BlogPostPage;
