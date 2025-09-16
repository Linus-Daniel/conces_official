"use client"
import { useState } from "react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-conces-blue to-royal-DEFAULT text-white py-20 md:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              About CONCES
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95 leading-relaxed">
              Connecting Christian Engineering and Technology Students across
              Nigeria since 1997
            </p>
          </div>
        </div>
      </section>

      {/* Content Navigation */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide -mb-px">
            {["history", "mission", "pillars", "team"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 py-4 text-sm md:text-base font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-conces-blue text-conces-blue"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "history" && "Our History"}
                {tab === "mission" && "Mission & Vision"}
                {tab === "pillars" && "Our Pillars"}
                {tab === "team" && "Our Team"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* History Section */}
        {activeTab === "history" && (
          <section className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-conces-blue mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From independent campus fellowships to a unified national
                movement
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Conference of Nigerian Christian Engineering Students
                  (CONCES) grew out of independent Christian fellowships formed
                  by engineering students across Nigeria's higher institutions —
                  often without any knowledge of similar groups in other
                  schools.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Some of these fellowships had existed for years under
                  different names, shaped by their local campus contexts and
                  student leadership. Over time, a shared desire emerged: to
                  connect Christian engineering students across campuses,
                  encourage one another, and unite around a higher purpose —
                  both spiritually and professionally.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  That desire led to intentional outreach, inter-campus
                  collaboration, and the vision for a national platform that
                  would unify these pockets of student-led fellowships.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-conces-blue mb-6 pb-3 border-b border-gray-200">
                  Key Milestones
                </h3>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-z-10 before:h-full before:w-0.5 before:bg-conces-blue/20">
                  <div className="relative flex items-start">
                    <div className="absolute left-0 mt-1.5">
                      <div className="h-3 w-3 rounded-full bg-conces-blue border-4 border-white shadow"></div>
                    </div>
                    <div className="ml-10">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Pre-1999
                      </h4>
                      <p className="mt-1 text-gray-600">
                        Independent Christian engineering fellowships emerge
                        across Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="absolute left-0 mt-1.5">
                      <div className="h-3 w-3 rounded-full bg-conces-blue border-4 border-white shadow"></div>
                    </div>
                    <div className="ml-10">
                      <h4 className="text-lg font-semibold text-gray-900">
                        1999
                      </h4>
                      <p className="mt-1 text-gray-600">
                        Name "CONCES" adopted; first national conference held at
                        University of Ilorin
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="absolute left-0 mt-1.5">
                      <div className="h-3 w-3 rounded-full bg-conces-blue border-4 border-white shadow"></div>
                    </div>
                    <div className="ml-10">
                      <h4 className="text-lg font-semibold text-gray-900">
                        2012
                      </h4>
                      <p className="mt-1 text-gray-600">
                        Registered with CAC as AONCES (Association of Nigerian
                        Christian Engineers and Engineering Students)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-conces-blue/5 p-6 md:p-8 rounded-2xl mt-10 border border-conces-blue/10">
              <div className="flex items-start">
                <div className="bg-conces-blue text-white p-3 rounded-lg flex-shrink-0 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-conces-blue font-medium">
                  While some institutions have retained their historical names
                  due to registration or internal policies, they continue to be
                  part of the wider CONCES network. This flexibility is a
                  strength — allowing schools to preserve their local identity
                  while embracing the national vision.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Mission & Vision Section */}
        {activeTab === "mission" && (
          <section className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-conces-blue mb-4">
                Our Purpose
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Guided by faith, driven by purpose, committed to excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-conces-blue hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-conces-blue/10 p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-conces-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-conces-blue">
                    Our Vision
                  </h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-conces-gold mr-3 mt-1">•</span>
                    <span className="text-gray-700">
                      Promote unity and oneness in Christ (Hebrews 12:2)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-conces-gold mr-3 mt-1">•</span>
                    <span className="text-gray-700">
                      Sharpen members spiritually, academically and
                      technologically
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-conces-gold mr-3 mt-1">•</span>
                    <span className="text-gray-700">
                      Correct ineffectiveness in engineering students and young
                      graduates
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-conces-gold mr-3 mt-1">•</span>
                    <span className="text-gray-700">
                      Yield our engineering skills to the Lord for His Glory
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-conces-gold mr-3 mt-1">•</span>
                    <span className="text-gray-700">
                      Move our nation forward through creative inspirations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-conces-gold mr-3 mt-1">•</span>
                    <span className="text-gray-700">
                      Evangelize through engineering and engineer through
                      missions
                    </span>
                  </li>
                </ul>
              </div>

              {/* Mission Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-conces-gold hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-conces-gold/10 p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-conces-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-conces-blue">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-700 mb-6">
                  CONCES is a socio-religious-academic body that operates in an
                  atmosphere of spiritual communion and worship to:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-conces-blue mr-3 mt-1">•</span>
                    <span className="text-gray-700">
                      Enhance academic performance of members
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-conces-blue mr-3 mt-1">•</span>
                    <span className="text-gray-700">
                      Inspire professional excellence
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-conces-blue mr-3 mt-1">•</span>
                    <span className="text-gray-700">
                      Evangelize the Faculty of Engineering
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-conces-blue mr-3 mt-1">•</span>
                    <span className="text-gray-700">
                      Provide spiritual exploration, expansion and growth
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Pillars Section */}
        {activeTab === "pillars" && (
          <section className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-conces-blue mb-4">
                Our Pillars
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Four foundational principles that guide our activities and
                programs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-conces-blue group">
                <div className="bg-conces-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-conces-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Challenging Students
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hackathons, innovation challenges, workshops, and research
                  opportunities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-conces-gold group">
                <div className="bg-conces-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-conces-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Life Preparation
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Career workshops, leadership training, internship programs,
                  and alumni talks.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-conces-blue group">
                <div className="bg-conces-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-conces-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Faith Integration
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Devotionals, faith-based workshops, prayer support, and
                  faith-engineering blog.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-conces-gold group">
                <div className="bg-conces-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-conces-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Alumni Network
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mentorship programs, guest lectures, alumni events, and
                  professional networking.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Team Section */}
        {activeTab === "team" && (
          <section className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-conces-blue mb-4">
                Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Dedicated professionals and volunteers passionate about
                engineering education and Christian values
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    CONCES is led by a team of dedicated professionals and
                    volunteers who are passionate about engineering education
                    and Christian values. Our team includes chapter leaders
                    across various institutions, alumni mentors, and an
                    executive board.
                  </p>
                  <button className="bg-conces-blue hover:bg-conces-dark-blue text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Meet the Team
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-6 text-center">
                <p className="text-gray-500">
                  Interested in joining our team?{" "}
                  <a
                    href="#"
                    className="text-conces-blue font-medium hover:underline"
                  >
                    Contact us
                  </a>{" "}
                  to learn about volunteer opportunities.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
