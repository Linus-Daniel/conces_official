"use client"

import { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { 
  FaBuilding, 
  FaUsers,
  FaCalendarDays,
  FaChartLine,
  FaBullhorn,
  FaFileLines,
  FaGear,
  FaUserShield,
  FaBell,
  FaEnvelope, 
  FaCircleDot, 
  FaChartSimple, 
  FaTableCellsLarge, 
  FaList, 
  FaDownload, 
  FaPlus,
  FaTrophy, 
  FaBatteryQuarter,
  FaEllipsisVertical,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown
} from 'react-icons/fa6';


const CONCESAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const branches = [
    {
      id: 1,
      name: 'UNILAG Branch',
      location: 'University of Lagos, Lagos',
      status: 'Active',
      activity: 'High Activity',
      leader: {
        name: 'Sarah Okonkwo',
        email: 'sarahokonkwo@gmail.com',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
      },
      members: 124,
      events: 8,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'OAU Branch',
      location: 'Obafemi Awolowo University, Osun',
      status: 'Active',
      activity: 'High Activity',
      leader: {
        name: 'David Adekunle',
        email: 'davidadekunle@gmail.com',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      },
      members: 98,
      events: 6,
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'UNIBEN Branch',
      location: 'University of Benin, Edo',
      status: 'Active',
      activity: 'Medium Activity',
      leader: {
        name: 'Blessing Igwe',
        email: 'blessingigwe@gmail.com',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
      },
      members: 76,
      events: 4,
      lastActivity: '3 days ago'
    },
    {
      id: 4,
      name: 'UI Branch',
      location: 'University of Ibadan, Oyo',
      status: 'Active',
      activity: 'Medium Activity',
      leader: {
        name: 'Emmanuel Olatunji',
        email: 'emmaolatunji@gmail.com',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
      },
      members: 82,
      events: 5,
      lastActivity: '2 days ago'
    },
    {
      id: 5,
      name: 'FUTO Branch',
      location: 'Federal University of Technology, Owerri',
      status: 'Active',
      activity: 'Low Activity',
      leader: {
        name: 'Chukwudi Eze',
        email: 'chukwudieze@gmail.com',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
      },
      members: 32,
      events: 1,
      lastActivity: '2 weeks ago'
    },
    {
      id: 6,
      name: 'UNIZIK Branch',
      location: 'Nnamdi Azikiwe University, Anambra',
      status: 'No Leader',
      activity: 'Low Activity',
      leader: null,
      members: 28,
      events: 0,
      lastActivity: '1 month ago'
    }
  ];

  const summaryCards = [
    {
      title: 'Total Branches',
      value: 42,
      icon: <FaBuilding className="text-primary-600 text-xl" />,
      bgColor: 'bg-primary-100'
    },
    {
      title: 'Active Branches',
      value: 36,
      change: '+86%',
      icon: <FaCheckCircle className="text-green-600 text-xl" />,
      bgColor: 'bg-green-100',
      changeColor: 'text-green-600'
    },
    {
      title: 'Branches w/o Leaders',
      value: 4,
      change: '-9.5%',
      icon: <FaExclamationCircle className="text-red-600 text-xl" />,
      bgColor: 'bg-red-100',
      changeColor: 'text-red-600'
    },
    {
      title: 'Top Performing',
      value: 'UNILAG Branch',
      icon: <FaTrophy className="text-yellow-600 text-xl" />,
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Least Active',
      value: 'FUTO Branch',
      icon: <FaBatteryQuarter className="text-gray-600 text-xl" />,
      bgColor: 'bg-gray-100'
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-primary-800">CONCES Admin</h1>
            </div>
            <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
              <div className="space-y-1">
                <span className="flex items-center px-2 py-2 text-sm font-medium text-primary-800 bg-primary-50 rounded-md cursor-pointer">
                  <FaBuilding className="mr-3 text-primary-600" />
                  Branch Oversight
                </span>
                <span className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                  <FaUsers className="mr-3 text-gray-500" />
                  Members
                </span>
                <span className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                  <FaCalendarDays className="mr-3 text-gray-500" />
                  Events
                </span>
                <span className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                  <FaChartLine className="mr-3 text-gray-500" />
                  Analytics
                </span>
                <span className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                  <FaBullhorn className="mr-3 text-gray-500" />
                  Announcements
                </span>
                <span className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                  <FaFileLines className="mr-3 text-gray-500" />
                  Reports
                </span>
              </div>
              <div className="mt-8">
                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin Tools</h3>
                <div className="mt-2 space-y-1">
                  <span className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <FaGear className="mr-3 text-gray-500" />
                    Settings
                  </span>
                  <span className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <FaUserShield className="mr-3 text-gray-500" />
                    User Roles
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Admin" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">John Adebayo</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-500">
                  <FaEllipsisVertical />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Navigation */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <button 
                    type="button" 
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    onClick={toggleSidebar}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <h1 className="ml-2 md:ml-0 text-xl font-semibold text-gray-800">Branch Oversight</h1>
                </div>
                <div className="flex items-center">
                  <button className="p-1 text-gray-400 rounded-full hover:text-gray-500">
                    <FaBell />
                  </button>
                  <button className="p-1 ml-3 text-gray-400 rounded-full hover:text-gray-500">
                    <FaEnvelope />
                  </button>
                  <div className="relative ml-3 md:hidden">
                    <div>
                      <button type="button" className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none">
                        <img className="h-8 w-8 rounded-full" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="User" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              {/* Branch Summary Overview Panel */}
              <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {summaryCards.map((card, index) => (
                  <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 ${card.bgColor} rounded-md p-3`}>
                          {card.icon}
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{card.title}</dt>
                            <dd className="flex items-baseline">
                              <div className={`text-2xl font-semibold ${card.value === 'UNILAG Branch' || card.value === 'FUTO Branch' ? 'text-lg' : 'text-gray-900'}`}>
                                {card.value}
                              </div>
                              {card.change && (
                                <div className={`ml-2 text-sm ${card.changeColor}`}>
                                  {card.change}
                                </div>
                              )}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Search & Filters */}
              <div className="mb-6">
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" 
                      placeholder="Search branches, leaders, or locations..." 
                    />
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative inline-block text-left">
                      <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                        <FaMapMarkerAlt className="mr-2 text-gray-500" />
                        Region/Zone
                        <FaChevronDown className="ml-2 text-gray-500" />
                      </button>
                    </div>
                    <div className="relative inline-block text-left">
                      <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                        <FaCircleDot className="mr-2 text-gray-500" />
                        Status
                        <FaChevronDown className="ml-2 text-gray-500" />
                      </button>
                    </div>
                    <div className="relative inline-block text-left">
                      <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                        <FaChartSimple className="mr-2 text-gray-500" />
                        Engagement
                        <FaChevronDown className="ml-2 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Toggle & Admin Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="flex items-center mb-3 sm:mb-0">
                  <button className="bg-primary-50 text-primary-600 px-3 py-1.5 rounded-l-md border border-primary-200">
                    <FaTableCellsLarge />
                  </button>
                  <button className="bg-white text-gray-600 px-3 py-1.5 rounded-r-md border border-gray-300">
                    <FaList />
                  </button>
                  <span className="ml-3 text-sm text-gray-600">42 branches</span>
                </div>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <FaDownload className="mr-2" />
                    Export
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                    <FaPlus className="mr-2" />
                    Add Branch
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                    <FaBullhorn className="mr-2" />
                    Announcement
                  </button>
                </div>
              </div>

              {/* Branch Cards Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {branches.map((branch) => (
                  <div key={branch.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                          {branch.name}
                          <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                            branch.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {branch.status}
                          </span>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{branch.location}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          branch.activity === 'High Activity' ? 'bg-green-100 text-green-800' : 
                          branch.activity === 'Medium Activity' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {branch.activity}
                        </span>
                        <button className="ml-2 text-gray-400 hover:text-gray-500">
                          <FaEllipsisVertical />
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                      <div className="flex items-center mb-4">
                        {branch.leader ? (
                          <>
                            <img className="h-10 w-10 rounded-full" src={branch.leader.avatar} alt="Branch Leader" />
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">{branch.leader.name}</h4>
                              <p className="text-xs text-gray-500">Branch Leader • {branch.leader.email}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">No Leader Assigned</h4>
                              <button className="text-xs text-primary-600 font-medium">Assign Leader</button>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-xs text-gray-500">Members</p>
                          <p className="text-lg font-semibold">{branch.members}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-xs text-gray-500">Events</p>
                          <p className="text-lg font-semibold">{branch.events}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Last activity: <span className="text-gray-700">{branch.lastActivity}</span></span>
                        <button 
                          className="text-primary-600 hover:text-primary-800 font-medium"
                          onClick={toggleModal}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">42</span> branches
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <FaChevronLeft />
                      </button>
                      <button 
                        aria-current="page" 
                        className={`z-10 ${currentPage === 1 ? 'bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                        onClick={() => setCurrentPage(1)}
                      >
                        1
                      </button>
                      <button 
                        className={`z-10 ${currentPage === 2 ? 'bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                        onClick={() => setCurrentPage(2)}
                      >
                        2
                      </button>
                      <button 
                        className={`z-10 ${currentPage === 3 ? 'bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                        onClick={() => setCurrentPage(3)}
                      >
                        3
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                      <button 
                        className={`z-10 ${currentPage === 7 ? 'bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                        onClick={() => setCurrentPage(7)}
                      >
                        7
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <FaChevronRight />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button (Mobile) */}
        <div className="md:hidden fixed bottom-6 right-6">
          <button className="p-4 bg-primary-600 text-white rounded-full shadow-lg">
            <FaPlus />
          </button>
        </div>

        {/* Branch Detail Modal */}
        {modalOpen && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={toggleModal}></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        UNILAG Branch Details
                      </h3>
                      <div className="mt-4">
                        {/* Modal content would go here */}
                        <p className="text-sm text-gray-500">
                          Detailed information about this branch would be displayed here.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button 
                    type="button" 
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={toggleModal}
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CONCESAdminDashboard;