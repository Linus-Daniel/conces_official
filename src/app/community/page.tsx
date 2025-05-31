"use client";
import React, { useEffect, useState } from "react";
import { FaPray, FaSearch, FaShareSquare } from "react-icons/fa";
import { FaCableCar, FaChevronDown, FaCloudArrowDown, FaCloudArrowUp, FaComment, FaCommentDots, FaEllipsis, FaEllipsisVertical, FaHeart, FaLightbulb, FaPlus, FaShare, FaXmark } from "react-icons/fa6";

function page() {
  const [createPost, setCreatePost] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("keydown", (key) => {
      if (key.key && createPost) {
        console.log(key.key);
        setCreatePost(false);
      }
    });
  }, [createPost]);


  return (
    <div className="bg-gray-50 font-poppins">
      <section id="page-title" className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-royal-DEFAULT">
              Community Hub
            </h1>
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search discussions, prayer requests, projects…"
                className="w-full pl-5 pr-2 placeholder:text-sm text-conces-blue py-2 placeholder:text-gray-500 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
              />
              <FaSearch className="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="filter-tabs"
        className="bg-white sticky top-[61px] z-40 shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2 space-x-2 md:space-x-4">
            <button className="px-4 py-2 bg-royal-DEFAULT text-white rounded-full whitespace-nowrap text-sm font-medium">
              All Posts
            </button>
            <button className="px-4 py-2 bg-white text-royal-DEFAULT border border-royal-DEFAULT rounded-full whitespace-nowrap text-sm font-medium hover:bg-gray-50">
              Discussions
            </button>
            <button className="px-4 py-2 bg-white text-royal-DEFAULT border border-royal-DEFAULT rounded-full whitespace-nowrap text-sm font-medium hover:bg-gray-50">
              Prayer Requests
            </button>
            <button className="px-4 py-2 bg-white text-royal-DEFAULT border border-royal-DEFAULT rounded-full whitespace-nowrap text-sm font-medium hover:bg-gray-50">
              Project Updates
            </button>
            <button className="px-4 py-2 bg-white text-royal-DEFAULT border border-royal-DEFAULT rounded-full whitespace-nowrap text-sm font-medium hover:bg-gray-50">
              Announcements
            </button>
          </div>
        </div>
      </section>

      <main
        id="main-content"
        className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6"
      >
        <div id="community-feed" className="w-full md:w-3/4">
          <div
            id="featured-post"
            className="bg-gradient-to-r from-royal-light to-royal-DEFAULT rounded-xl p-1 mb-6"
          >
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold text-lg">
                        Emmanuel Okonkwo
                      </h3>
                      <span className="ml-2 px-2 py-0.5 bg-gold text-white text-xs rounded-full">
                        Admin
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">Posted 2 hours ago</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-royal-DEFAULT text-white text-xs rounded-full">
                  Announcement
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3 text-royal-DEFAULT">
                Welcome to our revamped Community Hub!
              </h2>
              <p className="text-gray-700 mb-4">
                Dear CONCES members, we're excited to introduce our new
                community platform where you can connect, share ideas, and grow
                together in faith and engineering excellence. Let's build a
                supportive community!
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                    <FaHeart className="fa-regular fa-heart mr-1" />
                    <span>42</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                    <FaComment className="fa-regular fa-comment mr-1" />
                    <span>15</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                    <FaShare className="fa-regular fa-share-from-square mr-1" />
                  </button>
                </div>
                <button className="text-royal-DEFAULT hover:text-royal-dark">
                  <FaEllipsis className="fa-solid fa-ellipsis-vertical" />
                </button>
              </div>
            </div>
          </div>

          <div
            id="post-1"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold">Chioma Nwachukwu</h3>
                    <span className="ml-2 px-2 py-0.5 bg-gold-light text-white text-xs rounded-full">
                      Student
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">Posted yesterday</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                Discussion
              </span>
            </div>
            <h2 className="text-lg font-bold mb-3">
              Applying engineering principles to community development
            </h2>
            <p className="text-gray-700 mb-4">
              I've been thinking about how we can use our engineering skills to
              solve problems in our local communities. Has anyone been involved
              in projects that address infrastructure challenges in rural areas?
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaHeart className="fa-regular fa-heart mr-1" />
                  <span>24</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaComment className="fa-regular fa-comment mr-1" />
                  <span>8</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaShareSquare className="fa-regular fa-share-from-square mr-1" />
                </button>
              </div>
              <button className="text-gray-500 hover:text-royal-DEFAULT">
                <FaEllipsisVertical className="fa-solid fa-ellipsis-vertical" />
              </button>
            </div>
          </div>

          <div
            id="post-2"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold">Daniel Adegoke</h3>
                    <span className="ml-2 px-2 py-0.5 bg-royal-light text-white text-xs rounded-full">
                      Alumni
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">Posted 3 days ago</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Prayer Request
              </span>
            </div>
            <h2 className="text-lg font-bold mb-3">
              Prayer for upcoming final exams
            </h2>
            <p className="text-gray-700 mb-4">
              Please join me in prayer for all the final year students preparing
              for their exams. May God grant them wisdom, focus, and peace
              during this crucial time. "For I know the plans I have for you,"
              declares the LORD. - Jeremiah 29:11
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaHeart className="fa-regular fa-heart mr-1" />
                  <span>56</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaComment className="fa-regular fa-comment mr-1" />
                  <span>12</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaShareSquare className="fa-regular fa-share-from-square mr-1" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">23 prayed</span>
                <button className="px-3 py-1 text-xs bg-gold-light text-white rounded-full hover:bg-gold">
                  <FaPray className="fa-solid fa-pray mr-1" /> I've prayed
                </button>
              </div>
            </div>
          </div>

          <div
            id="post-3"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold">Oluwaseun Adeleke</h3>
                    <span className="ml-2 px-2 py-0.5 bg-royal-light text-white text-xs rounded-full">
                      Alumni
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">Posted 4 days ago</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Project Update
              </span>
            </div>
            <h2 className="text-lg font-bold mb-3">
              Solar-powered water purification system
            </h2>
            <p className="text-gray-700 mb-4">
              Excited to share progress on our team's project to develop
              affordable solar-powered water purification systems for rural
              communities. We've completed the prototype and will begin field
              testing next month!
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <img
                className="w-full h-40 object-cover rounded-lg"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9d9dcf75c1-63dc996275ee3b11cd38.png"
                alt="solar panel installation on small water purification system in rural Nigeria, engineering project"
              />
              <img
                className="w-full h-40 object-cover rounded-lg"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d832446774-6d09307617380247923b.png"
                alt="engineers testing water purification system with local community members in rural Nigeria"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaHeart className="fa-regular fa-heart mr-1" />
                  <span>38</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaComment className="fa-regular fa-comment mr-1" />
                  <span>16</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaShareSquare className="fa-regular fa-share-from-square mr-1" />
                </button>
              </div>
              <button className="text-gray-500 hover:text-royal-DEFAULT">
                <FaEllipsisVertical className="fa-solid fa-ellipsis-vertical" />
              </button>
            </div>
          </div>

          <div
            id="post-4"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold">Blessing Okafor</h3>
                    <span className="ml-2 px-2 py-0.5 bg-gold-light text-white text-xs rounded-full">
                      Student
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">Posted 5 days ago</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                Discussion
              </span>
            </div>
            <h2 className="text-lg font-bold mb-3">
              Balancing faith and science as Christian engineers
            </h2>
            <p className="text-gray-700 mb-4">
              How do you navigate the intersection of faith and science in your
              engineering studies and career? I sometimes find it challenging to
              reconcile certain scientific theories with biblical teachings.
              Would love to hear others' perspectives!
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaHeart className="fa-regular fa-heart mr-1" />
                  <span>32</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaComment className="fa-regular fa-comment mr-1" />
                  <span>27</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-royal-DEFAULT">
                  <FaShareSquare className="fa-regular fa-share-from-square mr-1" />
                </button>
              </div>
              <button className="text-gray-500 hover:text-royal-DEFAULT">
                <FaEllipsisVertical className="fa-solid fa-ellipsis-vertical" />
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <button className="px-6 py-2 bg-white text-royal-DEFAULT border border-royal-DEFAULT rounded-full hover:bg-royal-DEFAULT hover:text-white transition duration-300">
              Load More
              <FaChevronDown className="fa-solid fa-chevron-down ml-1" />
            </button>
          </div>
        </div>

        <div id="sidebar" className="w-full md:w-1/4 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <button
              onClick={() => setCreatePost(!createPost)}
              id="create-post-btn"
              className="w-full bg-royal-DEFAULT text-white py-3 rounded-lg font-medium hover:bg-royal-dark transition duration-300 flex items-center justify-center"
            >
              <FaPlus className="fa-solid fa-plus mr-2" />
              Create New Post
            </button>
            <div className="flex flex-col space-y-3 mt-4">
              <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center">
                <FaCommentDots className="fa-solid fa-comment-dots text-royal-DEFAULT mr-2" />
                Start Discussion
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center">
                <FaPray className="fa-solid fa-pray text-royal-DEFAULT mr-2" />
                Submit Prayer Request
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center">
                <FaLightbulb className="fa-solid fa-lightbulb text-royal-DEFAULT mr-2" />
                Share Project Update
              </button>
            </div>
          </div>

          <div
            id="prayer-wall"
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="bg-royal-DEFAULT text-white p-4 flex items-center justify-between">
              <h3 className="font-semibold">Prayer Wall</h3>
              <span className="text-gold-light text-sm hover:underline cursor-pointer">
                View All
              </span>
            </div>
            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center mb-2">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="text-sm font-medium">Faith Nwosu</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Please pray for my brother's surgery tomorrow. 🙏
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">2 hours ago</span>
                  <button className="text-xs text-royal-DEFAULT hover:underline">
                    I've prayed (18)
                  </button>
                </div>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center mb-2">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="text-sm font-medium">Joshua Eze</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Praying for all those preparing for interviews this week. May
                  God's favor be upon you!
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">5 hours ago</span>
                  <button className="text-xs text-royal-DEFAULT hover:underline">
                    I've prayed (32)
                  </button>
                </div>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center mb-2">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="text-sm font-medium">Grace Adeyemi</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Thanksgiving for my new job at the engineering firm! God is
                  faithful.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Yesterday</span>
                  <button className="text-xs text-royal-DEFAULT hover:underline">
                    I've prayed (45)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            id="upcoming-events"
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="bg-royal-DEFAULT text-white p-4 flex items-center justify-between">
              <h3 className="font-semibold">Upcoming Events</h3>
              <span className="text-gold-light text-sm hover:underline cursor-pointer">
                View All
              </span>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-lg p-2 text-center mr-3 w-12 flex-shrink-0">
                  <div className="text-lg font-semibold text-royal-DEFAULT">
                    12
                  </div>
                  <div className="text-xs uppercase text-gray-500">JUN</div>
                </div>
                <div>
                  <h4 className="font-medium text-royal-DEFAULT">
                    Monthly Prayer Meeting
                  </h4>
                  <p className="text-sm text-gray-600">7:00 PM - 8:30 PM</p>
                  <p className="text-xs text-gray-500 mt-1">Virtual (Zoom)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-lg p-2 text-center mr-3 w-12 flex-shrink-0">
                  <div className="text-lg font-semibold text-royal-DEFAULT">
                    18
                  </div>
                  <div className="text-xs uppercase text-gray-500">JUN</div>
                </div>
                <div>
                  <h4 className="font-medium text-royal-DEFAULT">
                    Tech Talk: Faith & AI
                  </h4>
                  <p className="text-sm text-gray-600">5:30 PM - 7:00 PM</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Lagos Chapter Office
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-lg p-2 text-center mr-3 w-12 flex-shrink-0">
                  <div className="text-lg font-semibold text-royal-DEFAULT">
                    25
                  </div>
                  <div className="text-xs uppercase text-gray-500">JUN</div>
                </div>
                <div>
                  <h4 className="font-medium text-royal-DEFAULT">
                    Mentorship Meetup
                  </h4>
                  <p className="text-sm text-gray-600">2:00 PM - 4:00 PM</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Abuja Chapter Office
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-royal-DEFAULT to-royal-dark rounded-lg p-5 text-white">
            <h3 className="font-bold text-lg mb-2">Join Mentorship Program</h3>
            <p className="text-sm mb-4 text-gray-100">
              Connect with experienced Christian engineers who can guide your
              spiritual and professional growth.
            </p>
            <button className="bg-gold hover:bg-gold-dark text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
              Apply Now
            </button>
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 md:hidden">
        <button className="bg-royal-DEFAULT text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-royal-dark transition duration-300">
          <FaPlus className="fa-solid fa-plus text-xl" />
        </button>
      </div>

      {createPost && (
        <div
        onClick={(e)=>console.log(e.target)}
          id="post-modal"
          className="fixed inset-0 bg-black/30 backdrop-blur-sm w-full h-full flex z-50  items-center justify-center p-4"
        >
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-royal-DEFAULT">
                  Create New Post
                </h3>
                <button
                  id="close-modal"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaXmark className="fa-solid fa-xmark text-xl" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="post-title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                    placeholder="Enter a descriptive title"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="post-category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="discussion">Discussion</option>
                    <option value="prayer">Prayer Request</option>
                    <option value="project">Project Update</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    id="post-content"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                    placeholder="Share your thoughts, questions, or prayer requests..."
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments (Optional)
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FaCloudArrowUp className="fa-solid fa-cloud-arrow-up text-gray-400 text-2xl mb-2" />
                    <p className="text-sm text-gray-500">
                      Drag files here or click to upload
                    </p>
                    <input type="file" className="hidden" id="file-upload" />
                    <button
                      type="button"
                      className="mt-2 text-royal-DEFAULT text-sm hover:underline"
                    >
                      Browse files
                    </button>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    id="cancel-post"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-dark"
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
