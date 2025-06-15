"use client";
import { Resources } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  FaBible,
  FaBook,
  FaBookmark,
  FaBookOpen,
  FaDownload,
  FaExternalLinkAlt,
  FaEye,
  FaFileExcel,
  FaFilePdf,
  FaPlay,
  FaPray,
  FaSearch,
  FaShare,
  FaTools,
  FaVideo,
  FaUsers,
  FaPhotoVideo,
  FaBriefcase
} from 'react-icons/fa';

const mockResources: Resources[] = [
  {
    id: 'advanced-math',
    title: 'Advanced Engineering Mathematics for Nigerian Students',
    type: 'pdf',
    author: 'Dr. Emmanuel Okonkwo',
    date: 'May 15, 2023',
    description: 'A comprehensive guide to advanced mathematical concepts essential for engineering students, with practical examples relevant to the Nigerian context.',
    thumbnail: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/fe244c0af1-024afcead534a6c983ee.png',
    fileUrl: '/sample.pdf',
    tags: ['Academic', 'Engineering'],
    views: 1245,
    downloads: 892,
    relatedResources: ['engineering-standards', 'career-workshop']
  },
  {
    id: 'faith-engineering',
    title: 'Faith and Engineering: Divine Wisdom',
    type: 'devotional',
    author: 'Pastor Chioma',
    date: 'Jun 12, 2023',
    description: 'Exploring how biblical principles can guide engineering ethics and practice.',
    content: `
      <h2>Introduction</h2>
      <p>As Christian engineers, we have a unique opportunity to integrate our faith with our professional practice...</p>
      
      <h2>Biblical Foundations</h2>
      <p>Proverbs 2:6 reminds us that "For the Lord gives wisdom; from his mouth come knowledge and understanding."...</p>
      
      <h2>Practical Applications</h2>
      <p>In your daily work, consider how you can demonstrate integrity, excellence, and care for others...</p>
    `,
    thumbnail: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8999cd9317-7df6a14b015d8d36bd18.png',
    tags: ['Spiritual', 'Devotional'],
    views: 876,
    relatedResources: ['career-workshop']
  },
  {
    id: 'engineering-standards',
    title: 'Nigerian Engineering Standards Guide',
    type: 'pdf',
    author: 'Engr. Adebayo Williams',
    date: 'Jun 1, 2023',
    description: 'Latest engineering standards and regulations for Nigerian practitioners.',
    fileUrl: '/standards.pdf',
    thumbnail: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e1ced3dcf3-261a00279a56a0e376ec.png',
    tags: ['Professional', 'Reference'],
    views: 1532,
    downloads: 1204,
    relatedResources: ['advanced-math']
  },
  {
    id: 'career-workshop',
    title: 'Faith-Based Leadership in Engineering',
    type: 'video',
    author: 'Prof. Adeyemi',
    date: 'Jun 5, 2023',
    description: 'Workshop on integrating Christian leadership principles in engineering careers.',
    videoUrl: 'https://www.youtube.com/embed/example123',
    thumbnail: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/27c9627f13-42f2196138c88b27ca61.png',
    duration: '1:25:36',
    tags: ['Career', 'Workshop'],
    views: 654,
    relatedResources: ['faith-engineering', 'advanced-math']
  }
];

const ResourceViewPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [resource, setResource] = useState<Resources | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedResources, setRelatedResources] = useState<Resources[]>([]);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    if (id) {
      // Simulate API fetch
      setTimeout(() => {
        const foundResource = mockResources.find(res => res.id === id);
        if (foundResource) {
          setResource(foundResource);
          // Find related resources
          const related = mockResources.filter(res => 
            foundResource.relatedResources?.includes(res.id)
          );
          setRelatedResources(related);
          // Simulate checking if bookmarked
          setIsBookmarked(Math.random() > 0.5);
        }
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleDownload = () => {
    if (!resource?.fileUrl) return;
    
    // In a real app, you might track downloads here
    console.log(`Downloading ${resource.title}`);
    // For demo, just open in new tab
    window.open(resource.fileUrl, '_blank');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you would update the backend here
    console.log(`${isBookmarked ? 'Removed from' : 'Added to'} bookmarks`);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(resource?.title || 'Check out this resource')}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(resource?.title || '')}`;
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        setShowShareOptions(false);
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareOptions(false);
  };

  const renderResourceContent = () => {
    if (!resource) return null;

    switch (resource.type) {
      case 'pdf':
        return (
          <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
            <div className="max-w-md mx-auto">
              <FaFilePdf className="text-red-500 text-6xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{resource.title}</h3>
              <p className="text-gray-600 mb-6">{resource.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors"
                >
                  <FaDownload className="mr-2" /> Download PDF
                </button>
                <button
                  onClick={() => window.open(resource.fileUrl, '_blank')}
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg flex items-center justify-center transition-colors"
                >
                  <FaEye className="mr-2" /> Preview
                </button>
              </div>
              <div className="mt-6 text-sm text-gray-500 flex justify-center gap-4">
                <span><FaEye className="inline mr-1" /> {resource.views} views</span>
                <span><FaDownload className="inline mr-1" /> {resource.downloads} downloads</span>
              </div>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <div className="aspect-w-16 aspect-h-9 bg-black">
              <iframe
                src={resource.videoUrl}
                className="w-full h-96"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={resource.title}
              ></iframe>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                <div className="flex gap-2">
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Video
                  </span>
                  {resource.duration && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {resource.duration}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm flex items-center">
                    <FaEye className="mr-1" /> {resource.views} views
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
            </div>
          </div>
        );

      case 'devotional':
        return (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="h-64 bg-gray-200 relative">
              <img
                className="w-full h-full object-cover"
                src={resource.thumbnail}
                alt={resource.title}
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                <div className="flex gap-2">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Devotional
                  </span>
                  {resource.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm flex items-center">
                    <FaEye className="mr-1" /> {resource.views} views
                  </span>
                  <button
                    onClick={handleBookmark}
                    className={`p-2 rounded-full ${isBookmarked ? 'text-conces-gold' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    <FaBookmark className={isBookmarked ? 'fill-current' : ''} />
                  </button>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-6 text-gray-800">{resource.title}</h1>
              <div 
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: resource.content as string }} 
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">{resource.title}</h3>
            <p className="text-gray-600 mb-6">{resource.description}</p>
            <p className="text-gray-500">This resource type doesn't have a specific viewer yet.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-conces-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Resource Not Found</h2>
          <p className="text-gray-600 mb-6">The resource you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => router.push('/resources')}
            className="bg-conces-blue hover:bg-royal-light text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Resources
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => router.push('/resources')}
          className="text-conces-blue hover:text-royal-light hover:underline flex items-center transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Resources
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {renderResourceContent()}

          {/* Related Resources Section */}
          {relatedResources.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Related Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedResources.map((related) => (
                  <div 
                    key={related.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/resources/${related.id}`)}
                  >
                    <div className="h-40 bg-gray-200 relative">
                      <img
                        className="w-full h-full object-cover"
                        src={related.thumbnail}
                        alt={related.title}
                        loading="lazy"
                      />
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded-full">
                          {related.type === 'pdf' ? 'PDF' : 
                           related.type === 'video' ? 'Video' : 
                           related.type === 'devotional' ? 'Devotional' : 'Resource'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-1 line-clamp-1">{related.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{related.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4 border border-gray-200">
            <div className="flex items-center mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${resource.author.replace(' ', '+')}&background=random`}
                alt={resource.author}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-800">{resource.author}</p>
                <p className="text-sm text-gray-500">Published on {resource.date}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">About This Resource</h3>
              <p className="text-gray-600 text-sm">{resource.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <button 
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="w-full flex items-center justify-center bg-conces-blue hover:bg-royal-light text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaShare className="mr-2" /> Share
                </button>
                {showShareOptions && (
                  <div className="absolute bottom-full mb-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
                    <button 
                      onClick={() => handleShare('twitter')}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center"
                    >
                      <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </span>
                      Twitter
                    </button>
                    <button 
                      onClick={() => handleShare('facebook')}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center"
                    >
                      <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Facebook
                    </button>
                    <button 
                      onClick={() => handleShare('linkedin')}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center"
                    >
                      <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </span>
                      LinkedIn
                    </button>
                    <button 
                      onClick={() => handleShare('copy')}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center"
                    >
                      <span className="bg-gray-100 text-gray-800 p-1 rounded mr-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </span>
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
              
              {resource.type === 'pdf' && (
                <button 
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center bg-white border border-conces-blue text-conces-blue hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
                >
                  <FaDownload className="mr-2" /> Download
                </button>
              )}
              
              <button 
                onClick={handleBookmark}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${isBookmarked ? 'bg-conces-gold text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                <FaBookmark className="mr-2" /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceViewPage;