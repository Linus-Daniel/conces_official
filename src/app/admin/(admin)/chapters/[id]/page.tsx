"use client"
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import { FiArrowLeft, FiUsers, FiCalendar, FiBox, FiFileText } from 'react-icons/fi';

const BranchDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id =  params.id as string;

  // Mock data - in a real app, you'd fetch this based on the id
  const branch = {
    id: id,
    name: "UNILAG Branch",
    status: "Active",
    location: "University of Lagos, Lagos",
    institution: "University of Lagos",
    leader: {
      name: "Sarah Okonkwo",
      email: "sarahokonkwo@gmail.com",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    },
    members: 124,
    events: 8,
    products: 15,
    contents: 23,
    lastActivity: "2 hours ago",
    description: "The UNILAG branch is one of our most active branches with regular events and a growing membership base."
  };

  const stats = [
    { name: 'Total Users', value: branch.members, icon: FiUsers },
    { name: 'Branch Products', value: branch.products, icon: FiBox },
    { name: 'Contents', value: branch.contents, icon: FiFileText },
    { name: 'Events', value: branch.events, icon: FiCalendar },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>{branch.name} | CONCES Admin</title>
        <meta name="description" content="Branch details" />
      </Head>

      <main className="flex-1 overflow-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-blue-600 mb-4"
          >
            <FiArrowLeft className="mr-2" /> Back to branches
          </button>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{branch.name}</h1>
            <p className="text-gray-600">{branch.location}</p>
            <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
              branch.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {branch.status}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Branch Details */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Branch Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Institution</p>
                <p className="text-gray-900">{branch.institution}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Branch Leader</p>
                <div className="flex items-center mt-1">
                  <img 
                    src={branch.leader.avatar} 
                    alt={branch.leader.name} 
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-gray-900">{branch.leader.name}</p>
                    <p className="text-sm text-gray-500">{branch.leader.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-900">{branch.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Activity</p>
                <p className="text-gray-900">{branch.lastActivity}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            <p className="text-gray-500">Activity feed would go here...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BranchDetail;