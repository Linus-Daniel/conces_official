import React from 'react'
import { FaPray } from 'react-icons/fa'
import { FaArrowRight, FaBookOpen, FaBrain, FaComment, FaComments, FaNetworkWired, FaScrewdriverWrench } from 'react-icons/fa6'

function Features() {
  return (
    <div>
      
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-royal-100 text-royal-700 font-medium rounded-full text-sm mb-4">
              Member Benefits
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You <span className="text-royal-700">Get</span>
            </h2>
            <div className="w-20 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              CONCES offers a comprehensive package of resources, opportunities,
              and community support to help you thrive in your faith and
              engineering career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              id="feature-mentorship"
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="h-40 bg-royal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaBookOpen className="fa-solid fa-brain text-white text-5xl"/>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-royal-600 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <FaBrain className="fa-solid fa-brain text-royal-600 mr-2"/>
                  Mentorship Programs
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with experienced Christian engineers who can guide
                  your spiritual and professional growth through one-on-one
                  mentoring.
                </p>
                <span className="text-royal-600 font-medium hover:text-royal-800 flex items-center cursor-pointer">
                  Learn more
                  <FaArrowRight className="fa-solid fa-arrow-right ml-2"/>
                </span>
              </div>
            </div>

            <div
              id="feature-workshops"
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="h-40 bg-royal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaBookOpen className="fa-solid fa-book-open text-white text-5xl"/>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-royal-600 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <FaBookOpen className="fa-solid fa-book-open text-royal-600 mr-2"/>
                  Workshops & Certification
                </h3>
                <p className="text-gray-600 mb-4">
                  Enhance your skills through specialized technical workshops
                  and faith-based professional development programs.
                </p>
                <span className="text-royal-600 font-medium hover:text-royal-800 flex items-center cursor-pointer">
                  Learn more
                  <FaArrowRight className="fa-solid fa-arrow-right ml-2"/>
                </span>
              </div>
            </div>

            <div
              id="feature-projects"
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="h-40 bg-royal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaScrewdriverWrench className="fa-solid fa-screwdriver-wrench text-white text-5xl"/>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-royal-600 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <FaScrewdriverWrench className="fa-solid fa-screwdriver-wrench text-royal-600 mr-2"/>
                  Projects & Hackathons
                </h3>
                <p className="text-gray-600 mb-4">
                  Apply your skills in real-world projects and competitions that
                  solve problems for churches, communities, and missions.
                </p>
                <span className="text-royal-600 font-medium hover:text-royal-800 flex items-center cursor-pointer">
                  Learn more
                  <FaArrowRight className="fa-solid fa-arrow-right ml-2"/>
                </span>
              </div>
            </div>

            <div
              id="feature-devotionals"
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="h-40 bg-royal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaPray className="fa-solid fa-pray text-white text-5xl"/>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-royal-600 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <FaPray className="fa-solid fa-pray text-royal-600 mr-2"/>
                  Devotionals & Prayer Wall
                </h3>
                <p className="text-gray-600 mb-4">
                  Strengthen your faith through engineering-themed devotionals
                  and a community prayer wall for support and encouragement.
                </p>
                <span className="text-royal-600 font-medium hover:text-royal-800 flex items-center cursor-pointer">
                  Learn more
                  <FaArrowRight className="fa-solid fa-arrow-right ml-2"/>
                </span>
              </div>
            </div>

            <div
              id="feature-alumni"
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="h-40 bg-royal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaNetworkWired className="fa-solid fa-network-wired text-white text-5xl"/>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-royal-600 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <FaNetworkWired className="fa-solid fa-network-wired text-royal-600 mr-2"/>
                  Alumni Network
                </h3>
                <p className="text-gray-600 mb-4">
                  Access a powerful network of Christian engineering
                  professionals across Nigeria and beyond for career
                  opportunities.
                </p>
                <span className="text-royal-600 font-medium hover:text-royal-800 flex items-center cursor-pointer">
                  Learn more
                  <FaArrowRight className="fa-solid fa-arrow-right ml-2"/>
                </span>
              </div>
            </div>

            <div
              id="feature-community"
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="h-40 bg-royal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaComment className="fa-solid fa-comments text-white text-5xl"/>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-royal-600 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <FaComments className="fa-solid fa-comments text-royal-600 mr-2"/>
                  Community Chat & Forums
                </h3>
                <p className="text-gray-600 mb-4">
                  Engage in discussions, seek advice, and share insights with
                  fellow Christian engineers through our digital platforms.
                </p>
                <span className="text-royal-600 font-medium hover:text-royal-800 flex items-center cursor-pointer">
                  Learn more
                  <FaArrowRight className="fa-solid fa-arrow-right ml-2"/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features
