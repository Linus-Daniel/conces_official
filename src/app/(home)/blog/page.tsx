"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaBookOpen, FaClock, FaUser } from "react-icons/fa";
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

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/blog");  
        const data = response.data.blogs;
        setBlogPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const categories = [
    { id: "all", name: "All Articles" },
    { id: "spiritual", name: "Spiritual Growth" },
    { id: "technical", name: "Technical Insights" },
    { id: "career", name: "Career Development" },
  ];

  const featuredPosts = blogPosts.filter(
    (post) => post.featured && post.published
  );
  const filteredPosts =
    activeCategory === "all"
      ? blogPosts.filter((post) => !post.featured && post.published)
      : blogPosts.filter(
          (post) =>
            post.category === activeCategory && !post.featured && post.published
        );

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Content
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-royal-600 text-white rounded-md hover:bg-royal-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Blog | CONCES - Christian Engineering Resources</title>
        <meta
          name="description"
          content="Articles and resources for Nigerian Christian engineering students and professionals"
        />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CONCES Blog</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            "Whatever you do, work at it with all your heart, as working for the
            Lord, not for human masters" - Colossians 3:23
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div
                  key={post.slug}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      src={post.featuredImage}
                      alt={post.title}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span
                        className={`${getCategoryColor(
                          post.category
                        )} text-xs px-2 py-1 rounded-full font-medium`}
                      >
                        {
                          categories.find((cat) => cat.id === post.category)
                            ?.name
                        }
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaClock className="mr-1" size={12} />
                        {post.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-royal-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full mr-3"
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {post.author.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-royal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    src={post.featuredImage}
                    alt={post.title}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span
                      className={`${getCategoryColor(
                        post.category
                      )} text-xs px-2 py-1 rounded-full font-medium`}
                    >
                      {categories.find((cat) => cat.id === post.category)?.name}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-royal-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full mr-2"
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {post.author.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center">
                      <FaClock className="mr-1" size={10} />
                      {post.readTime} min
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <FaBookOpen className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No articles found
              </h3>
              <p className="mt-1 text-gray-500">
                There are currently no articles in this category.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-royal-50 rounded-lg p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to receive new articles, event
              updates, and resources for Christian engineers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
              />
              <button className="px-6 py-2 bg-royal-600 text-white font-medium rounded-md hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogPage;
