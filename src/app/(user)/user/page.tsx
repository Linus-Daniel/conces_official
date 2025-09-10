// import AnnouncementItem from "@/components/user/AnnouncementItem";
// import DashboardCard from "@/components/user/DashBoardCard";
// import QuickLinkItem from "@/components/user/QuickLink";
// import { getServerSession } from "next-auth";
// import {
//   FaCalendarAlt,
//   FaChalkboardTeacher,
//   FaPrayingHands,
//   FaBook,
//   FaBriefcase,
//   FaTrophy,
//   FaBell,
//   FaSearch,
//   FaEnvelope,
// } from "react-icons/fa";
// import { authOptions } from "@/lib/next-auth";

// const UserDashboard = async () => {
//   const response = await getServerSession(authOptions);
//   const user = response?.user;

//   return (
//     <div className="flex h-screen">
//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Header */}
//         <header className="bg-white border-b border-gray-200 p-1 flex items-center justify-between">
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
//               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full">  </span>
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
//               <span className="text-sm font-medium">{user?.name}</span>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-1 sm:p-6 bg-gray-50">
//           <div>
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-conces-blue mb-4">
//                 Welcome back, John!
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                 <DashboardCard
//                   title="Upcoming Events"
//                   count={3}
//                   icon={<FaCalendarAlt className="text-conces-blue" />}
//                   link="#"
//                 />
//                 <DashboardCard
//                   title="New Resources"
//                   count={5}
//                   icon={<FaBook className="text-conces-gold" />}
//                   link="#"
//                 />
//                 <DashboardCard
//                   title="Prayer Requests"
//                   count={12}
//                   icon={<FaPrayingHands className="text-conces-blue" />}
//                   link="#"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-2">
//                 <div className="bg-white rounded-lg shadow p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">
//                       Recent Announcements
//                     </h3>
//                     <button className="text-sm text-conces-blue hover:underline">
//                       View All
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     <AnnouncementItem
//                       title="2023 Engineering Hackathon Registration Open"
//                       content="Register now for our annual hackathon focusing on sustainable engineering solutions."
//                       date="May 1, 2023"
//                       category="competition"
//                     />
//                     <AnnouncementItem
//                       title="New Faith & Engineering Blog Series"
//                       content="Check out our new blog series exploring how Christian values intersect with engineering practice."
//                       date="April 25, 2023"
//                       category="blog"
//                     />
//                     <AnnouncementItem
//                       title="Alumni Mentorship Program Launch"
//                       content="Sign up to be paired with an experienced engineering alumni mentor."
//                       date="April 18, 2023"
//                       category="mentorship"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <div className="bg-white rounded-lg shadow p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">Quick Links</h3>
//                   </div>

//                   <div className="space-y-3">
//                     <QuickLinkItem
//                       title="Submit Your Project"
//                       description="Enter your engineering project for review and potential awards"
//                       icon={<FaTrophy className="text-conces-gold" />}
//                     />
//                     <QuickLinkItem
//                       title="Find an Internship"
//                       description="Browse available internship opportunities"
//                       icon={<FaBriefcase className="text-conces-blue" />}
//                     />
//                     <QuickLinkItem
//                       title="Join a Study Group"
//                       description="Connect with peers for collaborative learning"
//                       icon={
//                         <FaChalkboardTeacher className="text-conces-gold" />
//                       }
//                     />
//                     <QuickLinkItem
//                       title="Upcoming Workshops"
//                       description="View schedule of technical and faith-based workshops"
//                       icon={<FaCalendarAlt className="text-conces-blue" />}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;import Posts from '@/components/Community'
import Posts from '@/components/Community';
import api from '@/lib/axiosInstance';
import React from 'react'

async function page() {
  let posts= [];
  try{
    const response = api.get("/community/posts");
    const postDatas = (await response).data;
    console.log(postDatas);
    posts = postDatas;
  }
  catch(error){
    console.log(error);
  }
  return (
    <div>
      <Posts posts={posts} onlyPost/>
    </div>
  )
}

export default page