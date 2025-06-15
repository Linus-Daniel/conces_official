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
  activity: string;
  leader: Leader | null;
  members: number;
  events: number;
  lastActivity: string;
}

const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'No Leader':
        return { bg: 'bg-red-100', text: 'text-red-800' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  const getActivityColor = (activity: string) => {
    if (activity.includes('High')) return { bg: 'bg-green-100', text: 'text-green-800' };
    if (activity.includes('Medium')) return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
    return { bg: 'bg-red-100', text: 'text-red-800' };
  };

  const statusColors = getStatusColor(branch.status);
  const activityColors = getActivityColor(branch.activity);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Header */}
      <div className="px-4 bg-royal-600 text-white rounded-t-md py-4 sm:px-6 flex flex-col sm:flex-row justify-between sm:items-start gap-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center">
            {branch.name}
            <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${statusColors.bg} ${statusColors.text}`}>
              {branch.status}
            </span>
          </h3>
          <p className="mt-1 text-sm text-white">{branch.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${activityColors.bg} ${activityColors.text}`}>
            {branch.activity}
          </span>
          <button className="text-gray-400 hover:text-gray-500">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="border-t border-gray-200 px-4 py-4 sm:p-6">
        {/* Leader Info */}
        <div className="flex items-center mb-4">
          {branch.leader ? (
            <>
              <img className="h-10 w-10 rounded-full object-cover" src={branch.leader.avatar} alt="Leader" />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">{branch.leader.name}</h4>
                <p className="text-xs text-gray-500">Branch Leader • {branch.leader.email}</p>
              </div>
            </>
          ) : (
            <>
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <i className="fa-solid fa-user text-gray-400"></i>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">No Leader Assigned</h4>
                <button className="text-xs text-primary-600 hover:underline font-medium">Assign Leader</button>
              </div>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-100 p-3 rounded-md text-center">
            <p className="text-xs text-gray-800">Members</p>
            <p className="text-lg font-semibold text-green-500">{branch.members}</p>
          </div>
          <div className="bg-slate-100 p-3 rounded-md text-center">
            <p className="text-xs text-gray-800">Events</p>
            <p className="text-lg text-royal-500 font-semibold">{branch.events}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2">
          <span className="text-gray-500">
            Last activity: <span className="text-gray-700">{branch.lastActivity}</span>
          </span>
          <Link href={`/admin/branches/${branch.id}`} className="text-primary-600 hover:text-primary-800 font-medium">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
