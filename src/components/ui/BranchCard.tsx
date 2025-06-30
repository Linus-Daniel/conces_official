import Link from 'next/link';
import React from 'react';

interface Leader {
  name: string;
  email: string;
  avatar: string;
}

interface Branch {
  id: number;
  name: string;
  status: string;
  location: string;
  leader: Leader | null;
  members: number;
  events: number;
  lastActivity: string;
}

const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
  console.log(branch)
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'No Leader':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="px-5 py-4 bg-royal-600 text-white flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {branch.name}
            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getStatusColor(branch.status)}`}>
              {branch.status}
            </span>
          </h3>
          <p className="text-sm text-white/80">{branch.location}</p>
        </div>
        <Link
          href={`/admin/branches/${branch.id}`}
          className="text-sm bg-white text-royal-600 font-medium px-3 py-1.5 rounded-full hover:bg-gray-100 transition"
        >
          View Details
        </Link>
      </div>

      {/* Content */}
      <div className="px-5 py-5 space-y-4">
        {/* Leader Info */}
        <div className="flex items-center gap-4">
          {branch.leader ? (
            <>
              <img className="h-10 w-10 rounded-full object-cover" src={branch.leader.avatar} alt={branch.leader.name} />
              <div>
                <p className="text-sm font-medium text-gray-900">{branch.leader.name}</p>
                <p className="text-xs text-gray-500">{branch.leader.email}</p>
              </div>
            </>
          ) : (
            <>
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <i className="fa-solid fa-user text-gray-400"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">No Leader Assigned</p>
                <button className="text-xs text-royal-600 hover:underline font-medium">Assign Leader</button>
              </div>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-100 p-4 rounded-lg text-center">
            <p className="text-xs text-gray-500">Members</p>
            <p className="text-xl font-bold text-green-600">{branch.members}</p>
          </div>
          <div className="bg-slate-100 p-4 rounded-lg text-center">
            <p className="text-xs text-gray-500">Events</p>
            <p className="text-xl font-bold text-royal-600">{branch.events}</p>
          </div>
        </div>

        {/* Last activity */}
        <div className="text-sm text-gray-500">
          Last activity:{' '}
          <span className="text-gray-700 font-medium">{branch.lastActivity}</span>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
