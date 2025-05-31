"use client"
// import { useState } from 'react';
// import { FaUser, FaCalendarAlt, FaChalkboardTeacher, FaPrayingHands, FaNetworkWired, FaBook, FaBriefcase, FaGraduationCap, FaTrophy, FaHandsHelping, FaComments, FaBell, FaSearch, FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';

// const UserDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [prayerRequests, setPrayerRequests] = useState([
//     { id: 1, title: 'Upcoming exams', content: 'Pray for wisdom and understanding as I prepare for my final exams', author: 'Emmanuel K.', date: '2 hours ago', likes: 5, comments: 2 },
//     { id: 2, title: 'Job interview', content: 'I have an important engineering job interview next week. Pray for favor', author: 'Sarah O.', date: '1 day ago', likes: 12, comments: 4 }
//   ]);
//   const [events, setEvents] = useState([
//     { id: 1, title: 'Engineering Ethics Workshop', date: 'May 15, 2023', time: '3:00 PM', location: 'Virtual', type: 'workshop' },
//     { id: 2, title: 'Tech Hackathon', date: 'June 2-4, 2023', time: 'All day', location: 'University of Lagos', type: 'hackathon' },
//     { id: 3, title: 'Alumni Career Panel', date: 'June 10, 2023', time: '5:30 PM', location: 'Virtual', type: 'career' }
//   ]);
//   const [resources, setResources] = useState([
//     { id: 1, title: 'Faith & Engineering eBook', type: 'ebook', category: 'faith' },
//     { id: 2, title: 'Python for Engineers Tutorial', type: 'tutorial', category: 'technical' },
//     { id: 3, title: 'Resume Template Pack', type: 'template', category: 'career' }
//   ]);

//   const renderTabContent = () => {
//     switch(activeTab) {
//       case 'dashboard':
//         return <DashboardContent />;
//       case 'events':
//         return <EventsContent events={events} />;
//       case 'resources':
//         return <ResourcesContent resources={resources} />;
//       case 'prayer':
//         return <PrayerContent prayerRequests={prayerRequests} setPrayerRequests={setPrayerRequests} />;
//       case 'network':
//         return <NetworkContent />;
//       case 'profile':
//         return <ProfileContent />;
//       default:
//         return <DashboardContent />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar Navigation */}
//       <div className="w-64 bg-conces-blue text-white flex flex-col">
//         <div className="p-4 flex items-center space-x-2 border-b border-conces-blue-dark">
//           <div className="text-2xl font-bold">CONCES</div>
//           <span className="text-xs bg-conces-gold text-conces-blue-dark px-2 py-1 rounded-full">MVP</span>
//         </div>
        
//         <div className="flex-1 overflow-y-auto py-4">
//           <nav>
//             <NavItem 
//               icon={<FaUser />} 
//               text="Dashboard" 
//               active={activeTab === 'dashboard'} 
//               onClick={() => setActiveTab('dashboard')} 
//             />
//             <NavItem 
//               icon={<FaCalendarAlt />} 
//               text="Events" 
//               active={activeTab === 'events'} 
//               onClick={() => setActiveTab('events')} 
//             />
//             <NavItem 
//               icon={<FaBook />} 
//               text="Resources" 
//               active={activeTab === 'resources'} 
//               onClick={() => setActiveTab('resources')} 
//             />
//             <NavItem 
//               icon={<FaChalkboardTeacher />} 
//               text="Mentorship" 
//               active={activeTab === 'mentorship'} 
//               onClick={() => setActiveTab('mentorship')} 
//             />
//             <NavItem 
//               icon={<FaPrayingHands />} 
//               text="Prayer Wall" 
//               active={activeTab === 'prayer'} 
//               onClick={() => setActiveTab('prayer')} 
//             />
//             <NavItem 
//               icon={<FaNetworkWired />} 
//               text="Alumni Network" 
//               active={activeTab === 'network'} 
//               onClick={() => setActiveTab('network')} 
//             />
//             <NavItem 
//               icon={<FaBriefcase />} 
//               text="Career Hub" 
//               active={activeTab === 'career'} 
//               onClick={() => setActiveTab('career')} 
//             />
//             <NavItem 
//               icon={<FaGraduationCap />} 
//               text="Certifications" 
//               active={activeTab === 'certifications'} 
//               onClick={() => setActiveTab('certifications')} 
//             />
//             <NavItem 
//               icon={<FaTrophy />} 
//               text="Competitions" 
//               active={activeTab === 'competitions'} 
//               onClick={() => setActiveTab('competitions')} 
//             />
//             <NavItem 
//               icon={<FaHandsHelping />} 
//               text="Community Service" 
//               active={activeTab === 'service'} 
//               onClick={() => setActiveTab('service')} 
//             />
//             <NavItem 
//               icon={<FaComments />} 
//               text="Forums" 
//               active={activeTab === 'forums'} 
//               onClick={() => setActiveTab('forums')} 
//             />
//           </nav>
//         </div>
        
//         <div className="p-4 border-t border-conces-blue-dark">
//           <NavItem 
//             icon={<FaCog />} 
//             text="Settings" 
//             active={activeTab === 'settings'} 
//             onClick={() => setActiveTab('settings')} 
//           />
//           <NavItem 
//             icon={<FaSignOutAlt />} 
//             text="Logout" 
//             onClick={() => console.log('Logout')} 
//           />
//         </div>
//       </div>
      
//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Header */}
//         <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <h1 className="text-xl font-semibold text-gray-800">
//               {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//             </h1>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search CONCES..."
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//               />
//               <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             </div>
            
//             <button className="relative text-gray-600 hover:text-conces-blue">
//               <FaBell size={20} />
//               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
            
//             <button className="relative text-gray-600 hover:text-conces-blue">
//               <FaEnvelope size={20} />
//               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
            
//             <div className="flex items-center space-x-2">
//               <img 
//                 src="https://randomuser.me/api/portraits/men/32.jpg" 
//                 alt="User" 
//                 className="w-8 h-8 rounded-full"
//               />
//               <span className="text-sm font-medium">John D.</span>
//             </div>
//           </div>
//         </header>
        
//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
//           {renderTabContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// // Component for navigation items
// const NavItem = ({ icon, text, active = false, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center w-full px-4 py-3 text-left transition-colors ${active ? 'bg-conces-blue-dark text-white' : 'hover:bg-conces-blue-dark hover:bg-opacity-50'}`}
//   >
//     <span className="mr-3">{icon}</span>
//     <span>{text}</span>
//   </button>
// );

// // Dashboard Content Component
// const DashboardContent = () => (
//   <div>
//     <div className="mb-8">
//       <h2 className="text-2xl font-bold text-conces-blue mb-4">Welcome back, John!</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <DashboardCard 
//           title="Upcoming Events" 
//           count={3} 
//           icon={<FaCalendarAlt className="text-conces-blue" />}
//           link="#"
//         />
//         <DashboardCard 
//           title="New Resources" 
//           count={5} 
//           icon={<FaBook className="text-conces-gold" />}
//           link="#"
//         />
//         <DashboardCard 
//           title="Prayer Requests" 
//           count={12} 
//           icon={<FaPrayingHands className="text-conces-blue" />}
//           link="#"
//         />
//       </div>
//     </div>
    
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       <div className="lg:col-span-2">
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Recent Announcements</h3>
//             <button className="text-sm text-conces-blue hover:underline">View All</button>
//           </div>
          
//           <div className="space-y-4">
//             <AnnouncementItem 
//               title="2023 Engineering Hackathon Registration Open"
//               content="Register now for our annual hackathon focusing on sustainable engineering solutions."
//               date="May 1, 2023"
//               category="competition"
//             />
//             <AnnouncementItem 
//               title="New Faith & Engineering Blog Series"
//               content="Check out our new blog series exploring how Christian values intersect with engineering practice."
//               date="April 25, 2023"
//               category="blog"
//             />
//             <AnnouncementItem 
//               title="Alumni Mentorship Program Launch"
//               content="Sign up to be paired with an experienced engineering alumni mentor."
//               date="April 18, 2023"
//               category="mentorship"
//             />
//           </div>
//         </div>
//       </div>
      
//       <div>
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Quick Links</h3>
//           </div>
          
//           <div className="space-y-3">
//             <QuickLinkItem 
//               title="Submit Your Project"
//               description="Enter your engineering project for review and potential awards"
//               icon={<FaTrophy className="text-conces-gold" />}
//             />
//             <QuickLinkItem 
//               title="Find an Internship"
//               description="Browse available internship opportunities"
//               icon={<FaBriefcase className="text-conces-blue" />}
//             />
//             <QuickLinkItem 
//               title="Join a Study Group"
//               description="Connect with peers for collaborative learning"
//               icon={<FaChalkboardTeacher className="text-conces-gold" />}
//             />
//             <QuickLinkItem 
//               title="Upcoming Workshops"
//               description="View schedule of technical and faith-based workshops"
//               icon={<FaCalendarAlt className="text-conces-blue" />}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Events Content Component
// const EventsContent = ({ events }) => (
//   <div>
//     <div className="flex justify-between items-center mb-6">
//       <h2 className="text-2xl font-bold text-conces-blue">Upcoming Events</h2>
//       <button className="bg-conces-blue text-white px-4 py-2 rounded-lg hover:bg-conces-blue-dark transition-colors">
//         Create Event
//       </button>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {events.map(event => (
//         <EventCard key={event.id} event={event} />
//       ))}
//     </div>
    
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold mb-4">Event Categories</h3>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <CategoryCard 
//           title="Workshops" 
//           count={12} 
//           color="bg-blue-100 text-blue-800"
//         />
//         <CategoryCard 
//           title="Hackathons" 
//           count={3} 
//           color="bg-purple-100 text-purple-800"
//         />
//         <CategoryCard 
//           title="Career" 
//           count={8} 
//           color="bg-green-100 text-green-800"
//         />
//         <CategoryCard 
//           title="Faith" 
//           count={5} 
//           color="bg-yellow-100 text-yellow-800"
//         />
//       </div>
//     </div>
//   </div>
// );

// // Resources Content Component
// const ResourcesContent = ({ resources }) => (
//   <div>
//     <div className="flex justify-between items-center mb-6">
//       <h2 className="text-2xl font-bold text-conces-blue">Learning Resources</h2>
//       <div className="flex space-x-2">
//         <button className="border border-conces-blue text-conces-blue px-4 py-2 rounded-lg hover:bg-conces-blue hover:text-white transition-colors">
//           Upload Resource
//         </button>
//         <button className="bg-conces-blue text-white px-4 py-2 rounded-lg hover:bg-conces-blue-dark transition-colors">
//           Request Resource
//         </button>
//       </div>
//     </div>
    
//     <div className="mb-6">
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Search resources..."
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//         />
//         <FaSearch className="absolute left-3 top-3 text-gray-400" />
//       </div>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {resources.map(resource => (
//         <ResourceCard key={resource.id} resource={resource} />
//       ))}
//     </div>
    
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold mb-4">Resource Categories</h3>
//       <div className="flex flex-wrap gap-2">
//         <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Technical</span>
//         <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Faith</span>
//         <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Career</span>
//         <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Leadership</span>
//         <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Research</span>
//         <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Tutorials</span>
//       </div>
//     </div>
//   </div>
// );

// // Prayer Content Component
// const PrayerContent = ({ prayerRequests, setPrayerRequests }) => {
//   const [newRequest, setNewRequest] = useState({ title: '', content: '' });
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newId = prayerRequests.length > 0 ? Math.max(...prayerRequests.map(r => r.id)) + 1 : 1;
//     setPrayerRequests([
//       {
//         id: newId,
//         title: newRequest.title,
//         content: newRequest.content,
//         author: 'You',
//         date: 'Just now',
//         likes: 0,
//         comments: 0
//       },
//       ...prayerRequests
//     ]);
//     setNewRequest({ title: '', content: '' });
//   };
  
//   return (
//     <div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-conces-blue">Prayer Wall</h2>
//         <p className="text-gray-600">Share your prayer requests and pray for others</p>
//       </div>
      
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <h3 className="text-lg font-semibold mb-4">Submit a Prayer Request</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//             <input
//               type="text"
//               id="title"
//               value={newRequest.title}
//               onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//               placeholder="Brief title for your request"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Request Details</label>
//             <textarea
//               id="content"
//               value={newRequest.content}
//               onChange={(e) => setNewRequest({...newRequest, content: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//               rows={4}
//               placeholder="Share your prayer request details..."
//               required
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="bg-conces-blue text-white px-4 py-2 rounded-lg hover:bg-conces-blue-dark transition-colors"
//           >
//             Submit Request
//           </button>
//         </form>
//       </div>
      
//       <div className="space-y-4">
//         {prayerRequests.map(request => (
//           <PrayerRequestCard key={request.id} request={request} />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Network Content Component
// const NetworkContent = () => (
//   <div>
//     <div className="mb-6">
//       <h2 className="text-2xl font-bold text-conces-blue">Alumni Network</h2>
//       <p className="text-gray-600">Connect with CONCES alumni from various institutions and industries</p>
//     </div>
    
//     <div className="bg-white rounded-lg shadow p-6 mb-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <div className="mb-4 md:mb-0">
//           <h3 className="text-lg font-semibold">Find Alumni</h3>
//           <p className="text-sm text-gray-600">Search by name, institution, or industry</p>
//         </div>
//         <div className="flex space-x-2">
//           <div className="relative flex-1">
//             <input
//               type="text"
//               placeholder="Search alumni..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//             />
//             <FaSearch className="absolute left-3 top-3 text-gray-400" />
//           </div>
//           <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue">
//             <option>All Industries</option>
//             <option>Software Engineering</option>
//             <option>Civil Engineering</option>
//             <option>Mechanical Engineering</option>
//             <option>Electrical Engineering</option>
//           </select>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <AlumniCard 
//           name="Dr. Adeola Johnson"
//           position="Senior Engineer at TechSolutions Ltd."
//           institution="University of Lagos (2015)"
//           industry="Software Engineering"
//           skills={['JavaScript', 'React', 'Node.js']}
//         />
//         <AlumniCard 
//           name="Engr. Michael Adebayo"
//           position="Project Manager at CivilWorks Inc."
//           institution="University of Ibadan (2012)"
//           industry="Civil Engineering"
//           skills={['Project Management', 'Structural Design', 'AutoCAD']}
//         />
//         <AlumniCard 
//           name="Sarah Okafor"
//           position="Product Designer at InnovateNG"
//           institution="Federal University of Technology, Minna (2018)"
//           industry="Mechanical Engineering"
//           skills={['Product Design', '3D Modeling', 'Prototyping']}
//         />
//       </div>
//     </div>
    
//     <div className="bg-white rounded-lg shadow p-6">
//       <h3 className="text-lg font-semibold mb-4">Mentorship Opportunities</h3>
//       <p className="text-gray-600 mb-4">Connect with experienced alumni who can guide you in your career journey</p>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <MentorshipOpportunity 
//           title="Career Transition Guidance"
//           description="Get advice on transitioning from academia to industry"
//           alumni="Dr. Femi Oladeji (Google)"
//           availability="2 slots available"
//         />
//         <MentorshipOpportunity 
//           title="Technical Interview Prep"
//           description="Practice for engineering technical interviews"
//           alumni="Engr. Chika Nwosu (Microsoft)"
//           availability="5 slots available"
//         />
//       </div>
//     </div>
//   </div>
// );

// // Profile Content Component
// const ProfileContent = () => (
//   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//     <div className="lg:col-span-1">
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="flex flex-col items-center">
//           <img 
//             src="https://randomuser.me/api/portraits/men/32.jpg" 
//             alt="Profile" 
//             className="w-32 h-32 rounded-full mb-4"
//           />
//           <h2 className="text-xl font-bold">John Doe</h2>
//           <p className="text-conces-blue">Student Member</p>
//           <p className="text-gray-600 text-sm mt-1">University of Lagos</p>
          
//           <div className="mt-4 w-full">
//             <div className="flex justify-between text-sm mb-1">
//               <span className="text-gray-600">Profile Completion</span>
//               <span className="font-medium">75%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div className="bg-conces-blue h-2 rounded-full" style={{ width: '75%' }}></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Contact Information</h3>
//           <p className="text-sm text-gray-600 mb-1">john.doe@student.unilag.edu.ng</p>
//           <p className="text-sm text-gray-600">+234 812 345 6789</p>
//         </div>
        
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Engineering Discipline</h3>
//           <p className="text-sm text-gray-600">Computer Engineering</p>
//         </div>
        
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Member Since</h3>
//           <p className="text-sm text-gray-600">January 2021</p>
//         </div>
//       </div>
//     </div>
    
//     <div className="lg:col-span-2">
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <h2 className="text-xl font-bold mb-4">Update Your Profile</h2>
        
//         <form>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//                 defaultValue="John"
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//                 defaultValue="Doe"
//               />
//             </div>
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
//             <select
//               id="institution"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//             >
//               <option>University of Lagos</option>
//               <option>University of Ibadan</option>
//               <option>University of Nigeria, Nsukka</option>
//               <option>Obafemi Awolowo University</option>
//               <option>Other</option>
//             </select>
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="discipline" className="block text-sm font-medium text-gray-700 mb-1">Engineering Discipline</label>
//             <select
//               id="discipline"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//             >
//               <option>Computer Engineering</option>
//               <option>Electrical Engineering</option>
//               <option>Mechanical Engineering</option>
//               <option>Civil Engineering</option>
//               <option>Chemical Engineering</option>
//               <option>Other</option>
//             </select>
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
//             <textarea
//               id="bio"
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//               placeholder="Tell us about yourself and your engineering interests..."
//             ></textarea>
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
//             <input
//               type="text"
//               id="skills"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
//               placeholder="Add your technical skills separated by commas"
//             />
//           </div>
          
//           <button
//             type="submit"
//             className="bg-conces-blue text-white px-4 py-2 rounded-lg hover:bg-conces-blue-dark transition-colors"
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
      
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-xl font-bold mb-4">Your CONCES Activity</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <ActivityMetric 
//             title="Events Attended"
//             value={8}
//             icon={<FaCalendarAlt className="text-conces-blue" />}
//           />
//           <ActivityMetric 
//             title="Resources Downloaded"
//             value={15}
//             icon={<FaBook className="text-conces-gold" />}
//           />
//           <ActivityMetric 
//             title="Forum Posts"
//             value={23}
//             icon={<FaComments className="text-conces-blue" />}
//           />
//         </div>
        
//         <h3 className="font-semibold mb-2">Recent Achievements</h3>
//         <div className="space-y-3">
//           <AchievementItem 
//             title="2022 Hackathon Finalist"
//             date="December 2022"
//             description="Reached finals of the annual CONCES Engineering Hackathon"
//           />
//           <AchievementItem 
//             title="Mentorship Program Completion"
//             date="October 2022"
//             description="Completed 3-month mentorship with Engr. Adeola Johnson"
//           />
//           <AchievementItem 
//             title="Faith & Engineering Blog Contributor"
//             date="August 2022"
//             description="Published article on 'Ethical Decision Making in Engineering'"
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Reusable Card Components
// const DashboardCard = ({ title, count, icon, link }) => (
//   <div className="bg-white rounded-lg shadow p-6 flex items-center">
//     <div className="mr-4 p-3 bg-gray-100 rounded-full">
//       {icon}
//     </div>
//     <div>
//       <p className="text-sm text-gray-600">{title}</p>
//       <p className="text-2xl font-bold">{count}</p>
//       <a href={link} className="text-sm text-conces-blue hover:underline">View all</a>
//     </div>
//   </div>
// );

// const AnnouncementItem = ({ title, content, date, category }) => (
//   <div className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
//     <h4 className="font-medium text-conces-blue">{title}</h4>
//     <p className="text-sm text-gray-600 my-2">{content}</p>
//     <div className="flex justify-between items-center">
//       <span className="text-xs text-gray-500">{date}</span>
//       <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">{category}</span>
//     </div>
//   </div>
// );

// const QuickLinkItem = ({ title, description, icon }) => (
//   <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//     <div className="mr-3 mt-1">
//       {icon}
//     </div>
//     <div>
//       <h4 className="font-medium text-conces-blue">{title}</h4>
//       <p className="text-sm text-gray-600">{description}</p>
//     </div>
//   </div>
// );

// const EventCard = ({ event }) => (
//   <div className="bg-white rounded-lg shadow overflow-hidden">
//     <div className={`h-2 ${getEventColor(event.type)}`}></div>
//     <div className="p-4">
//       <h3 className="font-bold text-lg mb-2">{event.title}</h3>
//       <div className="flex items-center text-sm text-gray-600 mb-1">
//         <FaCalendarAlt className="mr-2" />
//         <span>{event.date}</span>
//       </div>
//       <div className="flex items-center text-sm text-gray-600 mb-1">
//         <FaClock className="mr-2" />
//         <span>{event.time}</span>
//       </div>
//       <div className="flex items-center text-sm text-gray-600 mb-4">
//         <FaMapMarkerAlt className="mr-2" />
//         <span>{event.location}</span>
//       </div>
//       <button className="w-full bg-conces-blue text-white py-2 rounded-lg hover:bg-conces-blue-dark transition-colors">
//         Register
//       </button>
//     </div>
//   </div>
// );

// const CategoryCard = ({ title, count, color }) => (
//   <div className={`p-4 rounded-lg ${color}`}>
//     <h4 className="font-medium">{title}</h4>
//     <p className="text-2xl font-bold">{count}</p>
//   </div>
// );

// const ResourceCard = ({ resource }) => (
//   <div className="bg-white rounded-lg shadow overflow-hidden">
//     <div className="p-4">
//       <div className="flex items-start">
//         <div className="mr-4 p-2 bg-gray-100 rounded-lg">
//           <FaBook className="text-conces-blue" />
//         </div>
//         <div>
//           <h3 className="font-bold mb-1">{resource.title}</h3>
//           <div className="flex items-center text-sm text-gray-600">
//             <span className="mr-2">{resource.type}</span>
//             <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">{resource.category}</span>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4 flex justify-between">
//         <button className="text-sm text-conces-blue hover:underline">View Details</button>
//         <button className="text-sm bg-conces-blue text-white px-3 py-1 rounded hover:bg-conces-blue-dark transition-colors">
//           Download
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const PrayerRequestCard = ({ request }) => (
//   <div className="bg-white rounded-lg shadow p-4">
//     <div className="flex justify-between items-start mb-2">
//       <h3 className="font-medium text-conces-blue">{request.title}</h3>
//       <span className="text-xs text-gray-500">{request.date}</span>
//     </div>
//     <p className="text-gray-700 mb-3">{request.content}</p>
//     <div className="flex justify-between items-center text-sm text-gray-600">
//       <span>Posted by {request.author}</span>
//       <div className="flex space-x-4">
//         <button className="flex items-center hover:text-conces-blue">
//           <FaThumbsUp className="mr-1" />
//           <span>{request.likes}</span>
//         </button>
//         <button className="flex items-center hover:text-conces-blue">
//           <FaComment className="mr-1" />
//           <span>{request.comments}</span>
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const AlumniCard = ({ name, position, institution, industry, skills }) => (
//   <div className="bg-white rounded-lg shadow p-6">
//     <div className="flex items-center mb-4">
//       <img 
//         src="https://randomuser.me/api/portraits/men/1.jpg" 
//         alt={name} 
//         className="w-12 h-12 rounded-full mr-3"
//       />
//       <div>
//         <h3 className="font-bold">{name}</h3>
//         <p className="text-sm text-gray-600">{position}</p>
//       </div>
//     </div>
//     <div className="mb-4">
//       <p className="text-sm text-gray-600 mb-1">{institution}</p>
//       <p className="text-sm text-gray-600">{industry}</p>
//     </div>
//     <div className="mb-4">
//       <h4 className="text-xs font-semibold text-gray-500 mb-2">SKILLS</h4>
//       <div className="flex flex-wrap gap-2">
//         {skills.map((skill, index) => (
//           <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">{skill}</span>
//         ))}
//       </div>
//     </div>
//     <button className="w-full bg-conces-blue text-white py-2 rounded-lg hover:bg-conces-blue-dark transition-colors">
//       Connect
//     </button>
//   </div>
// );

// const MentorshipOpportunity = ({ title, description, alumni, availability }) => (
//   <div className="bg-white border border-gray-200 rounded-lg p-4">
//     <h3 className="font-bold text-conces-blue mb-2">{title}</h3>
//     <p className="text-sm text-gray-600 mb-3">{description}</p>
//     <div className="flex justify-between items-center text-sm">
//       <span className="text-gray-600">Mentor: {alumni}</span>
//       <span className="text-conces-blue">{availability}</span>
//     </div>
//   </div>
// );

// const ActivityMetric = ({ title, value, icon }) => (
//   <div className="bg-gray-50 rounded-lg p-4 flex items-center">
//     <div className="mr-3 p-2 bg-conces-blue bg-opacity-10 rounded-full">
//       {icon}
//     </div>
//     <div>
//       <p className="text-sm text-gray-600">{title}</p>
//       <p className="text-xl font-bold">{value}</p>
//     </div>
//   </div>
// );

// const AchievementItem = ({ title, date, description }) => (
//   <div className="flex items-start">
//     <div className="mr-3 mt-1">
//       <FaTrophy className="text-conces-gold" />
//     </div>
//     <div>
//       <h4 className="font-medium">{title}</h4>
//       <p className="text-sm text-gray-600 mb-1">{description}</p>
//       <p className="text-xs text-gray-500">{date}</p>
//     </div>
//   </div>
// );

// // Helper functions
// const getEventColor = (type) => {
//   switch(type) {
//     case 'workshop': return 'bg-blue-500';
//     case 'hackathon': return 'bg-purple-500';
//     case 'career': return 'bg-green-500';
//     default: return 'bg-conces-blue';
//   }
// };

// // Missing icon component
// const FaMapMarkerAlt = () => <span>📍</span>;
// const FaThumbsUp = () => <span>👍</span>;

// export default UserDashboard;

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