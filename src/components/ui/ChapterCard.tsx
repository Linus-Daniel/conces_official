import Link from "next/link";
import React from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

// More comprehensive type definitions
interface Leader {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role?: string;
}

interface Branch {
  _id: string;
  id?: number | string; // Support both number and string IDs
  branchName: string; // or 'name' depending on your API
  name?: string; // fallback
  status?: "Active" | "Inactive" | "No Leader" | "Pending";
  branchLocation: string; // or 'location'
  location?: string; // fallback
  leader?: Leader | null;
  branchAdmin?: Leader | null; // Alternative field name
  members?: number;
  totalMembers?: number; // Alternative field name
  events?: number;
  upcomingEvents?: number; // Alternative field name
  lastActivity?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  motto?: string;
  description?: string;
}

interface BranchCardProps {
  branch: Branch;
  onAssignLeader?: (branchId: string) => void;
}

const BranchCard: React.FC<BranchCardProps> = ({ branch, onAssignLeader }) => {
  // Data normalization - handle different field names
  const normalizedBranch = {
    id: branch._id || branch.id,
    name: branch.branchName || branch.name || "Unnamed Branch",
    location: branch.branchLocation || branch.location || "Location not set",
    status:
      branch.status ||
      (branch.leader || branch.branchAdmin ? "Active" : "No Leader"),
    leader: branch.leader || branch.branchAdmin || null,
    members: branch.members || branch.totalMembers || 0,
    events: branch.events || branch.upcomingEvents || 0,
    lastActivity:
      branch.lastActivity ||
      branch.updatedAt ||
      branch.createdAt ||
      "No recent activity",
    motto: branch.motto,
    description: branch.description,
  };

  // Status color helper
  const getStatusColor = (status: string) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800 border-green-200",
      Inactive: "bg-gray-100 text-gray-800 border-gray-200",
      "No Leader": "bg-red-100 text-red-800 border-red-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return (
      statusColors[status as keyof typeof statusColors] ||
      statusColors["Inactive"]
    );
  };

  // Format date helper
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "Never";

    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - dateObj.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return String(date);
    }
  };

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Safe image loader with fallback
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-royal-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-600 to-royal-700 px-5 py-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
          <div className="flex-1">
            <div className="flex items-start gap-2 flex-wrap">
              <h3 className="text-lg font-semibold text-white">
                {normalizedBranch.name}
              </h3>
              <span
                className={`px-2 py-0.5 text-xs rounded-full font-medium border ${getStatusColor(
                  normalizedBranch.status
                )}`}
              >
                {normalizedBranch.status}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <FaMapMarkerAlt className="text-white/70 text-xs" />
              <p className="text-sm text-white/90">
                {normalizedBranch.location}
              </p>
            </div>
            {normalizedBranch.motto && (
              <p className="text-xs text-white/70 mt-1 italic">
                "{normalizedBranch.motto}"
              </p>
            )}
          </div>
          <Link
            href={`/admin/chapters/${normalizedBranch.id}`}
            className="inline-flex items-center text-sm bg-white text-royal-600 font-medium px-4 py-1.5 rounded-full hover:bg-royal-50 transition-colors whitespace-nowrap"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-5 space-y-4">
        {/* Leader Info */}
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          {normalizedBranch.leader ? (
            <>
              {normalizedBranch.leader.avatar && !imageError ? (
                <img
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  src={normalizedBranch.leader.avatar}
                  alt={normalizedBranch.leader.name}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-royal-600 flex items-center justify-center text-white font-semibold ring-2 ring-white shadow-sm">
                  {getInitials(normalizedBranch.leader.name)}
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {normalizedBranch.leader.name}
                </p>
                <p className="text-xs text-gray-600">
                  {normalizedBranch.leader.email}
                </p>
                {normalizedBranch.leader.role && (
                  <p className="text-xs text-royal-600 font-medium mt-0.5">
                    {normalizedBranch.leader.role}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="text-gray-400 text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  No Leader Assigned
                </p>
                <button
                  onClick={() =>
                    onAssignLeader?.(normalizedBranch.id as string)
                  }
                  className="text-xs text-royal-600 hover:text-royal-700 font-medium hover:underline transition-colors"
                >
                  Assign Leader →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium">Members</p>
                <p className="text-2xl font-bold text-green-700">
                  {normalizedBranch.members.toLocaleString()}
                </p>
              </div>
              <FaUsers className="text-green-600 text-xl opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-royal-50 to-royal-100 p-3 rounded-lg border border-royal-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium">Events</p>
                <p className="text-2xl font-bold text-royal-700">
                  {normalizedBranch.events.toLocaleString()}
                </p>
              </div>
              <FaCalendarAlt className="text-royal-600 text-xl opacity-50" />
            </div>
          </div>
        </div>

        {/* Description if available */}
        {normalizedBranch.description && (
          <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
            <p className="line-clamp-2">{normalizedBranch.description}</p>
          </div>
        )}

        {/* Last Activity */}
        <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t border-gray-100">
          <FaClock className="text-gray-400" />
          <span>Last activity:</span>
          <span className="text-gray-700 font-medium">
            {formatDate(normalizedBranch.lastActivity)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Example usage with sample data
export const BranchCardExample = () => {
  // Sample data that matches your API structure
  const sampleBranches: Branch[] = [
    {
      _id: "1",
      branchName: "Lagos Main Branch",
      branchLocation: "Victoria Island, Lagos",
      status: "Active",
      leader: {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://example.com/avatar.jpg",
        role: "Branch President",
      },
      totalMembers: 245,
      upcomingEvents: 8,
      updatedAt: new Date().toISOString(),
      motto: "Unity in Faith",
      description: "Our flagship branch serving the Lagos community since 2010",
    },
    {
      _id: "2",
      branchName: "Abuja Branch",
      branchLocation: "Wuse II, Abuja",
      status: "No Leader",
      leader: null,
      totalMembers: 120,
      upcomingEvents: 3,
      updatedAt: "2024-01-15T10:30:00Z",
      motto: "Growing Together",
    },
  ];

  const handleAssignLeader = (branchId: string) => {
    console.log(`Assign leader for branch: ${branchId}`);
    // Handle leader assignment logic
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {sampleBranches.map((branch) => (
        <BranchCard
          key={branch._id}
          branch={branch}
          onAssignLeader={handleAssignLeader}
        />
      ))}
    </div>
  );
};

export default BranchCard;
