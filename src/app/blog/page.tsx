"use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa6';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      slug: 'faith-in-engineering',
      title: "Integrating Faith with Engineering Practice",
      excerpt: "How Christian engineers can maintain their spiritual values while excelling in the professional world.",
      category: "spiritual",
      date: "2025-04-15",
      readTime: "5 min read",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/faith-engineering.jpg",
      featured: true,
      author: {
        name: "Engr. David Okafor",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "Senior Civil Engineer"
      }
    },
    {
      id: 2,
      slug: 'renewable-energy-solutions',
      title: "Sustainable Energy Solutions for Nigerian Communities",
      excerpt: "Practical approaches to implementing renewable energy projects in rural areas.",
      category: "technical",
      date: "2025-03-28",
      readTime: "8 min read",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/renewable-energy.jpg",
      featured: true,
      author: {
        name: "Engr. Amina Yusuf",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        role: "Energy Consultant"
      }
    },
    {
      id: 3,
      slug: 'career-growth-tips',
      title: "5 Essential Career Growth Tips for Young Engineers",
      excerpt: "Strategies to advance your engineering career while maintaining Christian values.",
      category: "career",
      date: "2025-03-10",
      readTime: "6 min read",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/career-growth.jpg",
      featured: false,
      author: {
        name: "Engr. Michael Johnson",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        role: "Engineering Manager"
      }
    },
    {
      id: 4,
      slug: 'bible-study-for-engineers',
      title: "Bible Study Series: Proverbs for Engineers",
      excerpt: "Applying biblical wisdom to engineering challenges and decision-making.",
      category: "spiritual",
      date: "2025-02-22",
      readTime: "4 min read",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/bible-study.jpg",
      featured: false,
      author: {
        name: "Pastor Sarah Williams",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        role: "Campus Minister"
      }
    },
    {
      id: 5,
      slug: 'ai-in-engineering',
      title: "Ethical Use of AI in Engineering Projects",
      excerpt: "Balancing technological advancement with Christian ethical principles.",
      category: "technical",
      date: "2025-02-15",
      readTime: "7 min read",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ai-engineering.jpg",
      featured: false,
      author: {
        name: "Engr. Daniel Chukwu",
        avatar: "https://randomuser.me/api/portraits/men/81.jpg",
        role: "AI Specialist"
      }
    },
    {
      id: 6,
      slug: 'work-life-balance',
      title: "Achieving Work-Life Balance as a Christian Engineer",
      excerpt: "Practical tips for maintaining spiritual health amid demanding engineering careers.",
      category: "career",
      date: "2025-01-30",
      readTime: "5 min read",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/work-balance.jpg",
      featured: false,
      author: {
        name: "Dr. Grace Okonkwo",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        role: "Industrial Psychologist"
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'spiritual', name: 'Spiritual Growth' },
    { id: 'technical', name: 'Technical Insights' },
    { id: 'career', name: 'Career Development' }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts.filter(post => !post.featured)
    : blogPosts.filter(post => post.category === activeCategory && !post.featured);

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
      

  const getCategoryColor = (category:string) => {
    switch (category) {
      case 'spiritual':
        return 'bg-green-100 text-green-800';
      case 'technical':
        return 'bg-blue-100 text-blue-800';
      case 'career':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head>
        <title>Blog | CONCES - Christian Engineering Resources</title>
        <meta name="description" content="Articles and resources for Nigerian Christian engineering students and professionals" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CONCES Blog</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters" - Colossians 3:23
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={post.image}
                      alt={post.title}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className={`${getCategoryColor(post.category)} text-xs px-2 py-1 rounded-full font-medium`}>
                        {categories.find(cat => cat.id === post.category)?.name}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-royal-600">
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
                        <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.author.role}</p>
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
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category.id
                    ? 'bg-royal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={post.image}
                    alt={post.title}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className={`${getCategoryColor(post.category)} text-xs px-2 py-1 rounded-full font-medium`}>
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-royal-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full mr-2"
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                      <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <FaBookOpen className="fa-solid fa-book-open text-4xl text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No articles found</h3>
              <p className="mt-1 text-gray-500">There are currently no articles in this category.</p>
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-royal-50 rounded-lg p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to receive new articles, event updates, and resources for Christian engineers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
              />
              <button className="px-6 py-2 bg-royal-600 text-white font-medium rounded-md hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500">
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