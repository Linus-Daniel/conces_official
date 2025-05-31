"use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AlumniProfileModal from '@/components/AlumniModal';
import { FaArrowRight, FaCalendar, FaChalkboardUser, FaClock, FaEnvelope, FaGraduationCap, FaLocationDot, FaMagnifyingGlass, FaPlus, FaUser, FaUserGraduate, FaUserGroup, FaVideo } from 'react-icons/fa6';
import { FaHandsHelping, FaSearch } from 'react-icons/fa';

const AlumniPage = () => {
  const [activeTab, setActiveTab] = useState('network');
  const [selectedAlumni, setSelectedAlumni] = useState<number|null>(null);


  // Sample alumni data
  const alumni = [
    {
      id: 1,
      name: "Dr. Adebayo Ogunlesi",
      graduationYear: 1995,
      currentRole: "Principal Engineer at Chevron",
      specialization: "Petroleum Engineering",
      location: "Houston, TX",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      availableForMentorship: true,
      bio: "15+ years experience in offshore drilling operations. Passionate about mentoring young engineers.",
      contact: "a.ogunlesi@example.com"
    },
    {
      id: 2,
      name: "Engr. Ngozi Eze",
      graduationYear: 2008,
      currentRole: "CTO at TechBridge Africa",
      specialization: "Computer Engineering",
      location: "Lagos, Nigeria",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      availableForMentorship: true,
      bio: "Technology entrepreneur building solutions for African markets. Regular speaker at engineering conferences.",
      contact: "ngozi.eze@techbridge.africa"
    },
    {
      id: 3,
      name: "Prof. Ibrahim Mohammed",
      graduationYear: 1990,
      currentRole: "Professor of Civil Engineering, UNILAG",
      specialization: "Structural Engineering",
      location: "Lagos, Nigeria",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      availableForMentorship: false,
      bio: "Leading researcher in sustainable building materials. Author of 3 textbooks on structural design.",
      contact: "ibrahim.m@unilag.edu.ng"
    },
    {
      id: 4,
      name: "Engr. Fatima Abdullahi",
      graduationYear: 2015,
      currentRole: "Renewable Energy Consultant",
      specialization: "Electrical Engineering",
      location: "Abuja, Nigeria",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      availableForMentorship: true,
      bio: "Specializes in solar microgrid solutions for rural communities. CONCES Abuja branch coordinator.",
      contact: "fatima.a@greenpower.ng"
    }
  ];

  // Sample mentorship requests
  const mentorshipRequests = [
    {
      id: 1,
      studentName: "Chinedu Okoro",
      studentYear: "3rd Year",
      specialization: "Mechanical Engineering",
      requestDate: "2025-05-15",
      topics: ["Career guidance", "Internship opportunities", "Graduate school advice"],
      status: "Pending"
    },
    {
      id: 2,
      studentName: "Amina Yusuf",
      studentYear: "Final Year",
      specialization: "Computer Engineering",
      requestDate: "2025-05-10",
      topics: ["Tech entrepreneurship", "Interview preparation"],
      status: "Accepted"
    }
  ];

  console.log(selectedAlumni)

  // Sample upcoming talks
  const upcomingTalks = [
    {
      id: 1,
      title: "Engineering Leadership in the 21st Century",
      speaker: "Engr. Ngozi Eze",
      date: "2025-06-15",
      time: "4:00 PM WAT",
      format: "Virtual (Zoom)",
      description: "Strategies for emerging engineering leaders to navigate complex technical organizations."
    },
    {
      id: 2,
      title: "Sustainable Infrastructure for Nigerian Cities",
      speaker: "Prof. Ibrahim Mohammed",
      date: "2025-07-22",
      time: "10:00 AM WAT",
      format: "Hybrid (UNILAG + Online)",
      description: "Case studies of resilient urban infrastructure projects across Africa."
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'network':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumni.map(person => (
              <div key={person.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      className="h-16 w-16 rounded-full mr-4"
                      src={person.avatar}
                      alt={person.name}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                      <p className="text-sm text-gray-600">{person.currentRole}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-gray-600">
                      <FaGraduationCap className="fa-solid fa-graduation-cap mr-2 text-royal-600" />
                      Class of {person.graduationYear}, {person.specialization}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FaLocationDot className="fa-solid fa-location-dot mr-2 text-royal-600" />
                      {person.location}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FaUserGraduate className="fa-solid fa-user-graduate mr-2 text-royal-600" />
                      {person.availableForMentorship ? (
                        <span className="text-green-600">Available for mentorship</span>
                      ) : (
                        <span className="text-gray-500">Not currently mentoring</span>
                      )}
                    </p>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 line-clamp-3">{person.bio}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <a
                      href={`mailto:${person.contact}`}
                      className="text-sm text-royal-600 hover:text-royal-800"
                    >
                      <FaEnvelope className="fa-solid fa-envelope mr-1" /> Contact
                    </a>
                    <button
                        onClick={() => {setSelectedAlumni(person.id)}}
                      className="text-sm cursor-pointer font-medium text-royal-600 hover:text-royal-800"
                    >
                      View profile <FaArrowRight className="fa-solid fa-arrow-right ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'talks':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Alumni Talks</h2>
                <div className="space-y-4">
                  {upcomingTalks.map(talk => (
                    <div key={talk.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <h3 className="text-lg font-medium text-gray-900">{talk.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-y-1">
                        <span className="flex items-center mr-4">
                          <FaUser className="fa-solid fa-user mr-2 text-royal-600" />
                          {talk.speaker}
                        </span>
                        <span className="flex items-center mr-4">
                          <FaCalendar className="fa-solid fa-calendar-day mr-2 text-royal-600" />
                          {new Date(talk.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="fa-solid fa-clock mr-2 text-royal-600" />
                          {talk.time}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{talk.description}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-royal-100 text-royal-800">
                          {talk.format}
                        </span>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500">
                          Register <FaArrowRight className="fa-solid fa-arrow-right ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Talks Archive</h2>
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-b border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Topic
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Speaker
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                <a href="#" className="text-royal-600 hover:text-royal-800">
                                  <FaVideo className="fa-solid fa-video mr-1" /> Watch
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
                                <a href="#" className="text-royal-600 hover:text-royal-800">
                                  <FaVideo className="fa-solid fa-video mr-1" /> Watch
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
      case 'mentorship':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Mentorship Program</h2>
                <div className="prose max-w-none text-gray-600 mb-6">
                  <p>
                    The CONCES Alumni Mentorship Program connects current engineering students with experienced alumni 
                    for guidance, career advice, and professional development. Our mentors are committed to helping 
                    the next generation of Christian engineers navigate their academic and professional journeys.
                  </p>
                  <p className="mt-4">
                    Whether you're seeking career advice, internship opportunities, or spiritual guidance for your 
                    engineering practice, our mentors can provide valuable insights from their professional experience.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/alumni/mentorship/become-a-mentor"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
                  >
                    <FaUserGraduate className="fa-solid fa-user-graduate mr-2" /> Become a Mentor
                  </Link>
                  <Link
                    href="/alumni/mentorship/find-a-mentor"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-royal-700 bg-royal-100 hover:bg-royal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
                  >
                    <FaSearch className="fa-solid fa-search mr-2"/>Find a Mentor
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Your Mentorship Requests</h2>
                  <Link
                    href="/alumni/mentorship/new-request"
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gold-500 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
                  >
                    <FaPlus className="fa-solid fa-plus mr-1" /> New Request
                  </Link>
                </div>

 
                
                {mentorshipRequests.length > 0 ? (
                  <div className="space-y-4">
                    {mentorshipRequests.map(request => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{request.studentName}</h3>
                            <p className="text-sm text-gray-600">
                              {request.studentYear} • {request.specialization}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.status === 'Accepted' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Topics:</h4>
                          <div className="flex flex-wrap gap-2">
                            {request.topics.map((topic, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-royal-100 text-royal-800">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <p className="text-xs text-gray-500">
                            Requested on {new Date(request.requestDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <div className="space-x-2">
                            <button className="text-xs font-medium text-royal-600 hover:text-royal-800">
                              View Details
                            </button>
                            {request.status === 'Pending' && (
                              <button className="text-xs font-medium text-red-600 hover:text-red-800">
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaUserGraduate className="fa-solid fa-user-graduate text-4xl text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No active mentorship requests</h3>
                    <p className="text-sm text-gray-500 mb-4">You haven't submitted any mentorship requests yet.</p>
                    <Link
                      href="/alumni/mentorship/new-request"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
                    >
                      <FaPlus className="fa-solid fa-plus mr-2" /> Request Mentorship
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
        <meta name="description" content="Connect with CONCES alumni for networking, mentorship, and professional development" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Alumni Network</h1>
          <p className="text-gray-600 mt-1">
            "Connecting generations of Christian engineers for mentorship, professional growth, and spiritual encouragement"
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('network')}
              className={`whitespace-nowrap flex items-center  py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'network'
                  ? 'border-royal-500 text-royal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaUserGroup className="fa-solid fa-user-group mr-2" />
              Network
            </button>
            <button
              onClick={() => setActiveTab('talks')}
              className={`whitespace-nowrap flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'talks'
                  ? 'border-royal-500 text-royal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaChalkboardUser  className="fa-solid fa-chalkboard-user mr-2" />
              Talks
            </button>
            <button
              onClick={() => setActiveTab('mentorship')}
              className={`whitespace-nowrap py-4 px-1 flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'mentorship'
                  ? 'border-royal-500 text-royal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-royal-500 focus:border-royal-500 sm:text-sm"
                placeholder={`Search ${activeTab === 'network' ? 'alumni' : activeTab === 'talks' ? 'talks' : 'mentors'}`}
              />
            </div>
            <div className="flex space-x-3">
              <select
                className="block w-full pl-3 pr-10 py-2 text-gray-900 text-base border border-gray-300 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm rounded-md"
                defaultValue=""
              >
                <option className='text-gray-900' value="">All Specializations</option>
                <option className='text-gray-900' value="civil">Civil Engineering</option>
                <option className='text-gray-900' value="mechanical">Mechanical Engineering</option>
                <option className='text-gray-900' value="electrical">Electrical Engineering</option>
                <option className='text-gray-900' value="computer">Computer Engineering</option>
                <option className='text-gray-900' value="petroleum">Petroleum Engineering</option>
              </select>
              <select
                className="block w-full pl-3 pr-10 py-2 text-gray-900 text-base border border-gray-300 focus:outline-none focus:ring-royal-500 focus:border-royal-500 sm:text-sm rounded-md"
                defaultValue=""
              >
                <option className='text-gray-900' value="">All Locations</option>
                <option className='text-gray-900' value="nigeria">Nigeria</option>
                <option className='text-gray-900' value="africa">Africa</option>
                <option className='text-gray-900' value="europe">Europe</option>
                <option className='text-gray-900' value="americas">Americas</option>
                <option className='text-gray-900' value="asia">Asia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {renderContent()}

        {/* Alumni Success Stories */}
        {activeTab === 'network' && (
          <div className="mt-12 bg-royal-50 rounded-lg p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Alumni Success Stories</h2>
              <div className="mb-6">
                <blockquote className="text-lg text-gray-700">
                  "The CONCES alumni network connected me with mentors who guided me through my early career decisions. 
                  Today, I'm proud to give back by mentoring current students."
                </blockquote>
                <div className="mt-4 flex items-center justify-center">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://randomuser.me/api/portraits/women/33.jpg"
                    alt="Dr. Funmi Adeleke"
                  />
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900">Dr. Funmi Adeleke</p>
                    <p className="text-sm text-gray-600">Class of 2010, Director at NNPC</p>
                  </div>
                </div>
              </div>
              <Link
                href="/alumni/stories"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-royal-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
              >
                Read More Stories <FaArrowRight className="fa-solid fa-arrow-right ml-1"/>
              </Link>
            </div>
          </div>
        )}

<AlumniProfileModal 
  isOpen={selectedAlumni !== null}
  onClose={() => setSelectedAlumni(null)}
  alumniId={selectedAlumni as number}
/>
      </main>
    </>
  );
};

export default AlumniPage;