import CategoryCard from "@/components/ui/CategoryCard";
import ResourceCard from "@/components/ui/ResourceCard";
import { categories } from "@/constant";
import { Resources } from "@/types";
import React from "react";
import { FaBible, FaExternalLinkAlt, FaPhotoVideo, FaPray, FaSearch, FaTools } from "react-icons/fa";
import { FaBars, FaBook, FaBookmark, FaBookOpen, FaBorderAll, FaBriefcase, FaDownload, FaEye, FaFileExcel, FaFilePdf, FaPlay, FaShare, FaUpload, FaUsers, FaVideo } from "react-icons/fa6";






const mockResources:Resources[] = [
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
    downloads: 892
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
    views: 876
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
    downloads: 1204
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
    views: 654
  }
]


function page() {
  return (
    <div>
      <section
        id="hero-section"
        className="bg-gradient-to-r from-royal-DEFAULT to-conces-blue text-white py-10"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Resources Hub
              </h1>
              <p className="text-white text-opacity-90 max-w-xl">
                Discover learning materials, spiritual growth tools, and career
                resources tailored for Nigerian Christian engineering students
                and alumni.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="bg-white rounded-lg p-1 flex items-center">
                <FaSearch className="fa-solid fa-search text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search articles, courses, devotionals..."
                  className="px-3 py-2 w-full md:w-80 outline-none text-gray-700 rounded-lg"
                />
                <button className="bg-conces-gold hover:bg-conces-gold-light text-conces-blue font-medium px-4 py-2 rounded-lg transition">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="filter-tabs"
        className="bg-white border-b border-gray-200 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 -mx-4 px-4 md:px-0 md:justify-center">
            <button className="flex items-center justify-center px-4 py-2 mx-1 bg-conces-blue text-white font-medium rounded-full whitespace-nowrap">
              <FaBorderAll className="fa-solid fa-border-all mr-2" /> All
            </button>
            <button className="flex items-center justify-center px-4 py-2 mx-1 bg-white text-gray-700 hover:bg-gray-100 font-medium rounded-full whitespace-nowrap">
              <FaBook className="fa-solid fa-book mr-2" /> Academic
            </button>
            <button className="flex items-center justify-center px-4 py-2 mx-1 bg-white text-gray-700 hover:bg-gray-100 font-medium rounded-full whitespace-nowrap">
              <FaPray className="fa-solid fa-pray mr-2" /> Spiritual
            </button>
            <button className="flex items-center justify-center px-4 py-2 mx-1 bg-white text-gray-700 hover:bg-gray-100 font-medium rounded-full whitespace-nowrap">
              <FaBriefcase className="fa-solid fa-briefcase mr-2" /> Career
            </button>
            <button className="flex items-center justify-center px-4 py-2 mx-1 bg-white text-gray-700 hover:bg-gray-100 font-medium rounded-full whitespace-nowrap">
              <FaPhotoVideo className="fa-solid fa-photo-video mr-2" /> Media
            </button>
          </div>
        </div>
      </section>

      <main id="main-content" className="container mx-auto px-4 py-8">
        <section id="featured-resource" className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Resource of the Week
            </h2>
            <span className="text-conces-blue hover:underline text-sm font-medium cursor-pointer">
              View all featured
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative">
                <img
                  className="w-full h-full object-cover"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/fe244c0af1-024afcead534a6c983ee.png"
                  alt="professional engineering textbook or study material with Nigerian engineering students in a modern classNameroom setting, professional photo"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-conces-gold text-conces-blue text-xs font-bold px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                </div>
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    PDF Guide
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Academic
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Advanced Engineering Mathematics for Nigerian Students
                </h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide to advanced mathematical concepts
                  essential for engineering students, with practical examples
                  relevant to the Nigerian context.
                </p>
                <div className="flex items-center mb-4">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                    alt="Author"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-sm font-medium">Dr. Emmanuel Okonkwo</p>
                    <p className="text-xs text-gray-500">
                      Uploaded on May 15, 2023
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center bg-conces-blue hover:bg-royal-light text-white px-4 py-2 rounded-lg transition">
                    <FaDownload className="fa-solid fa-download mr-2" /> Download
                  </button>
                  <button className="flex items-center bg-white border border-conces-blue text-conces-blue hover:bg-gray-50 px-4 py-2 rounded-lg transition">
                    <FaEye className="fa-solid fa-eye mr-2" /> Preview
                  </button>
                  <button className="flex items-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition">
                    <FaBookmark className="fa-regular fa-bookmark mr-2"/> Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories-section" className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Browse by Category
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {
              categories.map((category, index) => (<CategoryCard {...category} key={index} />))
            }
            </div>
        </section>

        <section id="engineering-resources" className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Engineering Learning Resources
            </h2>
            <span className="text-conces-blue hover:underline text-sm font-medium cursor-pointer">
              View all
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         
            {mockResources
              .map((item, index) => (
                <ResourceCard resource={item} key={index} />
              ))}
          </div>
        </section>

        <section id="devotionals" className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Devotionals & Faith Articles
            </h2>
            <span className="text-conces-blue hover:underline text-sm font-medium cursor-pointer">
              View all
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              id="devotional-card-1"
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200 relative">
                <img
                  className="w-full h-full object-cover"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8999cd9317-7df6a14b015d8d36bd18.png"
                  alt="open Bible with engineering notebook and pen, inspirational study setting"
                />
                <div className="absolute top-3 right-3">
                  <button className="bg-white text-gray-600 hover:text-conces-blue p-2 rounded-full">
                    <FaBookmark className="fa-regular fa-bookmark" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Devotional
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Weekly
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Faith and Engineering: Divine Wisdom
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Exploring how biblical principles can guide engineering ethics
                  and practice.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                      alt="Author"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-xs text-gray-500">Pastor Chioma</span>
                  </div>
                  <span className="text-xs text-gray-500">Jun 12, 2023</span>
                </div>
                <div className="flex justify-between">
                  <button className="flex items-center bg-conces-blue hover:bg-royal-light text-white px-3 py-1.5 rounded-lg text-sm transition">
                    <FaBookOpen className="fa-solid fa-book-open mr-1" /> Read
                  </button>
                  <button className="flex items-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm transition">
                    <FaShare className="fa-solid fa-share mr-1" /> Share
                  </button>
                </div>
              </div>
            </div>

            <div
              id="devotional-card-2"
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200 relative">
                <img
                  className="w-full h-full object-cover"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d4e03037c0-65efb4e412e4388a4299.png"
                  alt="person praying in engineering laboratory, spiritual moment in technical setting"
                />
                <div className="absolute top-3 right-3">
                  <button className="bg-white text-gray-600 hover:text-conces-blue p-2 rounded-full">
                    <FaBookmark className="fa-regular fa-bookmark" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Testimony
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  God's Hand in My Engineering Journey
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  A personal testimony of divine intervention during challenging
                  academic periods.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                      alt="Author"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-xs text-gray-500">Bro. Taiwo</span>
                  </div>
                  <span className="text-xs text-gray-500">May 28, 2023</span>
                </div>
                <div className="flex justify-between">
                  <button className="flex items-center bg-conces-blue hover:bg-royal-light text-white px-3 py-1.5 rounded-lg text-sm transition">
                    <FaBookOpen className="fa-solid fa-book-open mr-1" /> Read
                  </button>
                  <button className="flex items-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm transition">
                    <FaShare className="fa-solid fa-share mr-1" /> Share
                  </button>
                </div>
              </div>
            </div>

            <div
              id="devotional-card-3"
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200 relative">
                <img
                  className="w-full h-full object-cover"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b5125ec1bd-ea9bd6e59e1a1ec25ddc.png"
                  alt="group Bible study with Nigerian engineering students, inspirational setting"
                />
                <div className="absolute top-3 right-3">
                  <button className="bg-white text-conces-gold p-2 rounded-full">
                    <FaBookmark className="fa-solid fa-bookmark" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Bible Study
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Series
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Proverbs for Professional Excellence
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  A 7-part Bible study series on applying wisdom from Proverbs
                  to your engineering career.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                      alt="Author"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-xs text-gray-500">Sis. Blessing</span>
                  </div>
                  <span className="text-xs text-gray-500">Jun 1, 2023</span>
                </div>
                <div className="flex justify-between">
                  <button className="flex items-center bg-conces-blue hover:bg-royal-light text-white px-3 py-1.5 rounded-lg text-sm transition">
                    <FaBookOpen className="fa-solid fa-book-open mr-1" /> Read
                  </button>
                  <button className="flex items-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm transition">
                    <FaShare className="fa-solid fa-share mr-1" /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="upload-section"
          className="mb-10 bg-gradient-to-r from-royal-light to-conces-blue rounded-xl overflow-hidden shadow-md"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-8">
              <div className="inline-block bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full mb-4">
                Alumni & Admin Feature
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Share Your Knowledge
              </h2>
              <p className="text-white text-opacity-90 mb-6">
                As an alumni or administrator, you can contribute valuable
                resources to help current students and fellow graduates grow in
                their faith and engineering career.
              </p>
              <button className="bg-white text-conces-blue hover:bg-gray-100 font-medium px-6 py-3 rounded-lg transition flex items-center">
                <FaUpload className="fa-solid fa-upload mr-2" /> Upload New Resource
              </button>
            </div>
            <div className="md:w-1/3 relative hidden md:block">
              <img
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/34ce8892b8-b213797673b80ccc1620.png"
                alt="Nigerian engineering alumni sharing knowledge with students, professional collaborative setting"
              />
            </div>
          </div>
        </section>

        <section id="career-resources" className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Career Resources
            </h2>
            <span className="text-conces-blue hover:underline text-sm font-medium cursor-pointer">
              View all
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              id="career-card-1"
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200 relative">
                <img
                  className="w-full h-full object-cover"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e1ced3dcf3-261a00279a56a0e376ec.png"
                  alt="professional resume template with engineering focus, Nigerian context"
                />
                <div className="absolute top-3 right-3">
                  <button className="bg-white text-gray-600 hover:text-conces-blue p-2 rounded-full">
                    <FaBookmark className="fa-regular fa-bookmark" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Template
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Engineering Resume Templates
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Professional resume templates specifically designed for
                  Nigerian engineering graduates.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
                      alt="Author"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-xs text-gray-500">Career Team</span>
                  </div>
                  <span className="text-xs text-gray-500">May 15, 2023</span>
                </div>
                <button className="w-full flex items-center justify-center bg-conces-blue hover:bg-royal-light text-white px-3 py-1.5 rounded-lg text-sm transition">
                  <FaDownload className="fa-solid fa-download mr-1" /> Download
                  Templates
                </button>
              </div>
            </div>

            <div
              id="career-card-2"
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200 relative">
                <img
                  className="w-full h-full object-cover"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/27c9627f13-42f2196138c88b27ca61.png"
                  alt="professional job interview with Nigerian engineers in office setting"
                />
                <div className="absolute top-3 right-3">
                  <button className="bg-white text-gray-600 hover:text-conces-blue p-2 rounded-full">
                    <FaBookmark className="fa-regular fa-bookmark" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Guide
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Engineering Interview Preparation
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Comprehensive guide to acing technical interviews at top
                  Nigerian engineering firms.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                      alt="Author"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-xs text-gray-500">
                      Engr. Oluwaseun
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">Jun 2, 2023</span>
                </div>
                <button className="w-full flex items-center justify-center bg-conces-blue hover:bg-royal-light text-white px-3 py-1.5 rounded-lg text-sm transition">
                  <FaBookOpen className="fa-solid fa-book-open mr-1" /> Read Guide
                </button>
              </div>
            </div>

            <div
              id="career-card-3"
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200 relative">
                <img
                  className="w-full h-full object-cover"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9a16f05562-2b29b772e93d3ac36bbc.png"
                  alt="job listings board with engineering opportunities in Nigeria"
                />
                <div className="absolute top-3 right-3">
                  <button className="bg-white text-conces-gold p-2 rounded-full">
                    <FaBookmark className="fa-solid fa-bookmark"/>
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Opportunities
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Updated Weekly
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Engineering Internship Listings
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Current internship and entry-level job opportunities for
                  Nigerian engineering students.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg"
                      alt="Author"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-xs text-gray-500">
                      Placement Office
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">Jun 14, 2023</span>
                </div>
                <button className="w-full flex items-center justify-center bg-conces-blue hover:bg-royal-light text-white px-3 py-1.5 rounded-lg text-sm transition">
                  <FaExternalLinkAlt className="fa-solid fa-external-link-alt mr-1" /> View
                  Listings
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="recent-uploads" className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Recently Added Resources
            </h2>
            <span className="text-conces-blue hover:underline text-sm font-medium cursor-pointer">
              View all
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Resource
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Added By
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FaFilePdf className="fa-solid fa-file-pdf text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Nigerian Engineering Standards Guide
                          </div>
                          <div className="text-xs text-gray-500">
                            Civil Engineering
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        PDF Guide
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                          alt="Author"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <div className="text-sm text-gray-900">
                          Dr. Emmanuel
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Jun 15, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-conces-blue hover:text-royal-light mr-3">
                        <FaDownload className="fa-solid fa-download" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FaEye className="fa-solid fa-eye" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FaBible className="fa-solid fa-bible text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Daily Faith Reflections for Engineers
                          </div>
                          <div className="text-xs text-gray-500">
                            Spiritual Growth
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        Devotional
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                          alt="Author"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <div className="text-sm text-gray-900">
                          Pastor Chioma
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Jun 14, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-conces-blue hover:text-royal-light mr-3">
                        <FaBookOpen className="fa-solid fa-book-open" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FaShare className="fa-solid fa-share" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FaVideo className="fa-solid fa-video text-red-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Workshop: Faith-Based Leadership in Engineering
                          </div>
                          <div className="text-xs text-gray-500">
                            Professional Development
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Video
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                          alt="Author"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <div className="text-sm text-gray-900">
                          Prof. Adeyemi
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Jun 12, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-conces-blue hover:text-royal-light mr-3">
                        <FaPlay className="fa-solid fa-play" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FaShare className="fa-solid fa-share" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FaFileExcel className="fa-solid fa-file-excel text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Engineering Salary Survey 2023
                          </div>
                          <div className="text-xs text-gray-500">
                            Career Development
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Spreadsheet
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                          alt="Author"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <div className="text-sm text-gray-900">Career Team</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Jun 10, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-conces-blue hover:text-royal-light mr-3">
                        <FaDownload className="fa-solid fa-download" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FaEye className="fa-solid fa-eye" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button className="bg-conces-blue text-white p-4 rounded-full shadow-lg">
          <FaBars className="fa-solid fa-bars" />
        </button>
      </div>
    </div>
  );
}

export default page;
