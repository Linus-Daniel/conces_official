"use client";
import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  FaArrowRight,
  FaCalendar,
  FaClock,
  FaEnvelope,
  FaGraduationCap,
  FaLocationDot,
  FaMagnifyingGlass,
  FaPlus,
  FaUser,
  FaUserGraduate,
  FaUserGroup,
  FaVideo,
  FaSpinner,
} from "react-icons/fa6";
import { FaHandsHelping, FaSearch } from "react-icons/fa";
import api from "@/lib/axiosInstance";
import { AlumniGridSkeleton, MentorshipProgramSkeleton, LoadingWithText } from "@/components/ui/Skeletons";

interface AlumniProfile {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    avatar?: string;
  };
  graduationYear: number;
  specialization: string;
  currentRole: string;
  bio?: string;
  skills?: string[];
  education?: Array<{
    schoolName: string;
    course: string;
  }>;
  availableForMentorship: boolean;
  isMentor: boolean;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

interface MentorshipProgram {
  _id: string;
  title: string;
  description: string;
  mentorId: {
    userId: {
      fullName: string;
    };
  };
  duration: string;
  timeCommitment: string;
  maxParticipants: number;
  currentParticipants: number;
  applicationDeadline?: string;
  programStartDate?: string;
}

const AlumniPage = () => {
  const [activeTab, setActiveTab] = useState("network");
  const [selectedAlumni, setSelectedAlumni] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Fetch alumni profiles
  const { data: alumni = [], isLoading: alumniLoading, error: alumniError } = useQuery({
    queryKey: ["alumni"],
    queryFn: async () => {
      const response = await api.get("/alumni");
      return response.data.alumni as AlumniProfile[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch mentorship programs  
  const { data: mentorshipPrograms = [], isLoading: programsLoading } = useQuery({
    queryKey: ["mentorship-programs"],
    queryFn: async () => {
      const response = await api.get("/mentorship-programs");
      return response.data.programs as MentorshipProgram[];
    },
    staleTime: 1000 * 60 * 5,
  });

  // Filter alumni based on search and filters
  const filteredAlumni = useMemo(() => {
    return alumni.filter(person => {
      const matchesSearch = !searchTerm || 
        person.userId.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.specialization.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialization = !specializationFilter || 
        person.specialization.toLowerCase().includes(specializationFilter.toLowerCase());

      const matchesLocation = !locationFilter || 
        person.education?.some(edu => edu.schoolName.toLowerCase().includes(locationFilter.toLowerCase()));

      return matchesSearch && matchesSpecialization && matchesLocation;
    });
  }, [alumni, searchTerm, specializationFilter, locationFilter]);

  // Get unique specializations and locations for filters
  const specializations = useMemo(() => {
    return Array.from(new Set(alumni.map(person => person.specialization))).filter(Boolean);
  }, [alumni]);

  // Get available mentorship programs
  const availableMentorshipPrograms = mentorshipPrograms.filter(program => 
    program.currentParticipants < program.maxParticipants &&
    (!program.applicationDeadline || new Date() <= new Date(program.applicationDeadline))
  );

  const handleContactAlumni = (email: string, name: string) => {
    const subject = encodeURIComponent(`CONCES - Connection Request from ${name}`);
    const body = encodeURIComponent(`Hello,\n\nI found your profile on the CONCES Alumni Network and would love to connect.\n\nBest regards`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  if (alumniError) {
    toast.error("Failed to load alumni data. Please try again later.");
  }

  const renderContent = () => {
    switch (activeTab) {
      case "network":
        if (alumniLoading) {
          return <AlumniGridSkeleton count={9} />;
        }

        if (filteredAlumni.length === 0) {
          return (
            <div className="text-center py-12">
              <FaUserGroup className="text-6xl text-gray-300 mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {alumni.length === 0 ? "No Alumni Profiles Found" : "No Alumni Match Your Search"}
              </h3>
              <p className="text-gray-600">
                {alumni.length === 0 
                  ? "There are currently no alumni profiles in the network." 
                  : "Try adjusting your search criteria to find more alumni."}
              </p>
            </div>
          );
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((person) => (
              <div
                key={person._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      className="h-16 w-16 rounded-full mr-4 object-cover"
                      src={person.userId.avatar || "/default-avatar.png"}
                      alt={person.userId.fullName}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {person.userId.fullName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {person.currentRole}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-gray-600">
                      <FaGraduationCap className="fa-solid fa-graduation-cap mr-2 text-royal-600" />
                      Class of {person.graduationYear}, {person.specialization}
                    </p>
                    {person.education && person.education[0] && (
                      <p className="flex items-center text-gray-600">
                        <FaLocationDot className="fa-solid fa-location-dot mr-2 text-royal-600" />
                        {person.education[0].schoolName}
                      </p>
                    )}
                    <p className="flex items-center text-gray-600">
                      <FaUserGraduate className="fa-solid fa-user-graduate mr-2 text-royal-600" />
                      {person.availableForMentorship ? (
                        <span className="text-green-600">
                          Available for mentorship
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          Not currently mentoring
                        </span>
                      )}
                    </p>
                  </div>
                  
                  {person.bio && (
                    <p className="mt-4 text-sm text-gray-600 line-clamp-3">
                      {person.bio}
                    </p>
                  )}
                  
                  {person.skills && person.skills.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {person.skills.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index}
                            className="inline-block bg-royal-100 text-royal-800 text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {person.skills.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{person.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => handleContactAlumni(person.userId.email, person.userId.fullName)}
                      className="text-sm text-royal-600 flex items-center hover:text-royal-800 transition-colors"
                    >
                      <FaEnvelope className="fa-solid fa-envelope mr-1" />
                      Contact
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAlumni(person._id);
                      }}
                      className="text-sm cursor-pointer flex items-center font-medium text-royal-600 hover:text-royal-800 transition-colors"
                    >
                      View profile
                      <FaArrowRight className="fa-solid fa-arrow-right ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "talks":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Upcoming Alumni Talks
                </h2>
                <div className="space-y-4">
                  {upcomingTalks.map((talk) => (
                    <div
                      key={talk.id}
                      className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    >
                      <h3 className="text-lg font-medium text-gray-900">
                        {talk.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-y-1">
                        <span className="flex items-center mr-4">
                          <FaUser className="fa-solid fa-user mr-2 text-royal-600" />
                          {talk.speaker}
                        </span>
                        <span className="flex items-center mr-4">
                          <FaCalendar className="fa-solid fa-calendar-day mr-2 text-royal-600" />
                          {new Date(talk.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="fa-solid fa-clock mr-2 text-royal-600" />
                          {talk.time}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {talk.description}
                      </p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-royal-100 text-royal-800">
                          {talk.format}
                        </span>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500">
                          Register{" "}
                          <FaArrowRight className="fa-solid fa-arrow-right ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Past Talks Archive
                </h2>
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-b border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Topic
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Speaker
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
                                Recording
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Ethics in Engineering Practice
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Dr. Adebayo Ogunlesi
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                March 15, 2025
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <a
                                  href="#"
                                  className="text-royal-600 hover:text-royal-800"
                                >
                                  <FaVideo className="fa-solid fa-video mr-1" />{" "}
                                  Watch
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Women in Engineering Leadership
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Engr. Fatima Abdullahi
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                February 28, 2025
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <a
                                  href="#"
                                  className="text-royal-600 hover:text-royal-800"
                                >
                                  <FaVideo className="fa-solid fa-video mr-1" />{" "}
                                  Watch
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    View All Past Talks
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "mentorship":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Mentorship Program
                </h2>
                <div className="prose max-w-none text-gray-600 mb-6">
                  <p>
                    The CONCES Alumni Mentorship Program connects current
                    engineering students with experienced alumni for guidance,
                    career advice, and professional development. Our mentors are
                    committed to helping the next generation of Christian
                    engineers navigate their academic and professional journeys.
                  </p>
                  <p className="mt-4">
                    Whether you're seeking career advice, internship
                    opportunities, or spiritual guidance for your engineering
                    practice, our mentors can provide valuable insights from
                    their professional experience.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/user/mentorship"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
                  >
                    <FaUserGraduate className="fa-solid fa-user-graduate mr-2" />
                    Become a Mentor
                  </Link>
                  <Link
                    href="/user/network"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-royal-700 bg-royal-100 hover:bg-royal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
                  >
                    <FaSearch className="fa-solid fa-search mr-2" />
                    Find a Mentor
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Available Mentorship Programs
                  </h2>
                </div>

                {programsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <MentorshipProgramSkeleton key={index} />
                    ))}
                  </div>
                ) : availableMentorshipPrograms.length > 0 ? (
                  <div className="space-y-4">
                    {availableMentorshipPrograms.map((program) => (
                      <div
                        key={program._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              {program.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              {program.description}
                            </p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <FaUser className="mr-2 text-royal-600" />
                                <span>{program.mentorId.userId.fullName}</span>
                              </div>
                              <div className="flex items-center">
                                <FaClock className="mr-2 text-royal-600" />
                                <span>{program.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <FaUserGroup className="mr-2 text-royal-600" />
                                <span>{program.currentParticipants}/{program.maxParticipants} participants</span>
                              </div>
                              {program.applicationDeadline && (
                                <div className="flex items-center">
                                  <FaCalendar className="mr-2 text-royal-600" />
                                  <span>Deadline: {new Date(program.applicationDeadline).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                Time commitment: {program.timeCommitment}
                              </span>
                              <div className="flex gap-2">
                                <Link
                                  href={`/user/mentorship/program/${program._id}`}
                                  className="inline-flex items-center px-3 py-1 border border-royal-600 text-xs font-medium rounded-md text-royal-600 hover:bg-royal-50 transition-colors"
                                >
                                  Learn More
                                </Link>
                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-royal-600 hover:bg-royal-700">
                                  Apply Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaUserGraduate className="fa-solid fa-user-graduate text-4xl text-gray-300 mb-3 mx-auto" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No mentorship programs available
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      There are currently no open mentorship programs. Check back later for new opportunities.
                    </p>
                    <Link
                      href="/user/network"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
                    >
                      <FaSearch className="fa-solid fa-search mr-2" />
                      Find Individual Mentors
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Alumni Network | CONCES</title>
        <meta
          name="description"
          content="Connect with CONCES alumni for networking, mentorship, and professional development"
        />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Alumni Network</h1>
          <p className="text-gray-600 mt-1">
            "Connecting generations of Christian engineers for mentorship,
            professional growth, and spiritual encouragement"
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("network")}
              className={`whitespace-nowrap flex items-center  py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "network"
                  ? "border-royal-500 text-royal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FaUserGroup className="fa-solid fa-user-group mr-2" />
              Network
            </button>
        
            <button
              onClick={() => setActiveTab("mentorship")}
              className={`whitespace-nowrap py-4 px-1 flex items-center border-b-2 font-medium text-sm ${
                activeTab === "mentorship"
                  ? "border-royal-500 text-royal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FaHandsHelping className="fa-solid fa-hands-helping mr-2" />
              Mentorship
            </button>
          </nav>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMagnifyingGlass className="fa-solid fa-magnifying-glass text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-royal-500 focus:border-royal-500 sm:text-sm"
                placeholder={`Search ${
                  activeTab === "network"
                    ? "alumni by name, role, or specialization..."
                    : activeTab === "mentorship"
                    ? "mentorship programs..."
                    : "content..."
                }`}
              />
            </div>
            {activeTab === "network" && (
              <div className="flex space-x-3">
                <select
                  value={specializationFilter}
                  onChange={(e) => setSpecializationFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-gray-900 text-base border border-gray-300 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm rounded-md"
                >
                  <option value="">All Specializations</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-gray-900 text-base border border-gray-300 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm rounded-md"
                >
                  <option value="">All Institutions</option>
                  {Array.from(new Set(
                    alumni.flatMap(person => 
                      person.education?.map(edu => edu.schoolName) || []
                    )
                  )).filter(Boolean).map((institution) => (
                    <option key={institution} value={institution}>
                      {institution}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {renderContent()}



        {/* Alumni profile modal can be added here if needed */}
      </main>
    </>
  );
};

export default AlumniPage;
