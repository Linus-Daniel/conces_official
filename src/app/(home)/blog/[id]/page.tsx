"use client"
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { FaAccessibleIcon, FaArrowLeft, FaFacebook, FaLinkedin, FaReply, FaThumbsUp, FaTwitter, FaWhatsapp } from 'react-icons/fa6';

const Blog = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string

  // Sample blog post data - in a real app, you'd fetch this based on the id
  const post = {
    id: 'faith-in-engineering',
    title: "Integrating Faith with Engineering Practice",
    excerpt: "How Christian engineers can maintain their spiritual values while excelling in the professional world.",
    category: "spiritual",
    date: "2025-04-15",
    readTime: "5 min read",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/faith-engineering.jpg",
    content: `
      <h2 class="text-xl font-semibold mb-4">Finding Purpose in Our Work</h2>
      <p class="mb-4">As Christian engineers, we have the unique opportunity to view our work as more than just a career - it's a calling. The Bible reminds us in Colossians 3:23-24: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters... It is the Lord Christ you are serving."</p>
      
      <h2 class="text-xl font-semibold mb-4 mt-6">Practical Ways to Integrate Faith</h2>
      <p class="mb-4">Here are five practical ways to maintain your Christian witness in the engineering workplace:</p>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><strong>Begin with prayer:</strong> Start each workday with prayer, dedicating your projects and interactions to God.</li>
        <li><strong>Ethical decision-making:</strong> Let biblical principles guide your technical and business decisions.</li>
        <li><strong>Serve others:</strong> Look for opportunities to use your skills to serve your colleagues and community.</li>
        <li><strong>Professional excellence:</strong> View quality work as worship to God.</li>
        <li><strong>Authentic relationships:</strong> Build genuine connections that allow for natural spiritual conversations.</li>
      </ol>
      
      <blockquote class="border-l-4 border-royal-600 pl-4 italic text-gray-600 my-6">
        "The engineer's mind, when guided by Christian principles, becomes an instrument for God's creative and redemptive work in the world."
      </blockquote>
      
      <h2 class="text-xl font-semibold mb-4 mt-6">Overcoming Challenges</h2>
      <p class="mb-4">Many Christian engineers face challenges like:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Pressure to compromise ethical standards</li>
        <li>Work-life balance struggles</li>
        <li>Feeling isolated in secular environments</li>
        <li>Difficulty seeing spiritual significance in technical work</li>
      </ul>
      <p class="mb-4">These challenges can be addressed through prayer, Christian fellowship with other engineers, and regular reflection on how your work contributes to human flourishing.</p>
      
      <h2 class="text-xl font-semibold mb-4 mt-6">Case Study: Bridge Project</h2>
      <p class="mb-4">Consider the story of a Christian civil engineer working on a rural bridge project in Nigeria. By:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Ensuring quality materials were used despite budget pressures</li>
        <li>Treating local workers with dignity and fair wages</li>
        <li>Organizing a simple dedication prayer with the community</li>
      </ul>
      <p class="mb-4">This engineer transformed a technical project into a ministry opportunity that blessed an entire community.</p>
      
      <div class="bg-royal-50 p-4 rounded-lg my-6">
        <h3 class="font-semibold mb-2">Key Takeaways</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li>Your engineering work has eternal significance</li>
          <li>Every project is an opportunity to demonstrate Christ's love</li>
          <li>Technical excellence and spiritual integrity can coexist</li>
        </ul>
      </div>
    `,
    author: {
      name: "Engr. David Okafor",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Senior Civil Engineer",
      bio: "David has 15 years of experience in civil engineering projects across West Africa. He leads the CONCES Lagos branch Bible study for professionals."
    },
    relatedPosts: [
      {
        id: 4,
        _id: 'bible-study-for-engineers',
        title: "Bible Study Series: Proverbs for Engineers",
        date: "2025-02-22",
        readTime: "4 min read"
      },
      {
        id: 6,
        _id: 'work-life-balance',
        title: "Achieving Work-Life Balance as a Christian Engineer",
        date: "2025-01-30",
        readTime: "5 min read"
      }
    ]
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <>
      <Head>
        <title>{post.title} | CONCES Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/blog" className="inline-flex items-center text-royal-600 hover:text-royal-800">
            <FaArrowLeft className="fa-solid fa-arrow-left mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium mb-4">
            Spiritual Growth
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center mb-6">
            <img
              className="h-10 w-10 rounded-full mr-3"
              src={post.author.avatar}
              alt={post.author.name}
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-500">
                {formatDate(post.date)} • {post.readTime}
              </p>
            </div>
          </div>
          <img
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
            src={post.image}
            alt={post.title}
          />
        </div>

        {/* Article Content */}
        <article className="prose text-gray-900 max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Author Bio */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <div className="flex items-start">
            <img
              className="h-16 w-16 rounded-full mr-4"
              src={post.author.avatar}
              alt={post.author.name}
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">About the Author</h3>
              <p className="text-sm font-medium text-gray-700 mb-1">{post.author.name}, {post.author.role}</p>
              <p className="text-sm text-gray-600">{post.author.bio}</p>
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mb-12">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Share this article</h3>
          <div className="flex space-x-4">
            <a
              href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
            >
              <FaFacebook className="fa-brands fa-facebook-f" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500"
            >
              <FaTwitter className="fa-brands fa-twitter" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800"
            >
              <FaLinkedin className="fa-brands fa-linkedin-in" />
            </a>
            <a
              href={`whatsapp://send?text=${encodeURIComponent(`${post.title} - ${window.location.href}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
            >
              <FaWhatsapp className="fa-brands fa-whatsapp" />
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {post.relatedPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="border border-gray-200 rounded-lg p-4 hover:border-royal-300">
                  <Link href={`/blog/${relatedPost.id}`} className="block">
                    <h4 className="text-lg font-medium text-gray-900 mb-1 hover:text-royal-600">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(relatedPost.date)} • {relatedPost.readTime}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Discussion</h3>
          <div className="space-y-6">
            {/* Sample comment */}
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="User avatar"
                />
              </div>
              <div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-900 mr-2">Engr. Amina Yusuf</span>
                    <span className="text-xs text-gray-500">April 16, 2025</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    This article resonates deeply with me. I've struggled with feeling like my faith and engineering work
                    were separate spheres. The practical suggestions here are so helpful!
                  </p>
                </div>
                <div className="mt-2 flex space-x-4">
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    <FaReply className="fa-solid fa-reply mr-1" />
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    <FaThumbsUp className="fa-regular fa-thumbs-up mr-1" /> Like (3)
                  </button>
                </div>
              </div>
            </div>

            {/* Comment form */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Leave a comment</h4>
              <form>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
                  placeholder="Share your thoughts..."
                ></textarea>
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-royal-600 text-white text-sm font-medium rounded-md hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;