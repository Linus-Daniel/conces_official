"use client"
import React from "react";
import { FaPray, FaCheck, FaTimes, FaEllipsisV, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { Prayer } from "@/types";

interface PrayerCardProps {
  prayer: Prayer;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  avatar?: string; // Added avatar prop
}

const PrayerCard: React.FC<PrayerCardProps> = ({ 
  prayer, 
  onApprove, 
  onReject, 
  onEdit, 
  onDelete,
  avatar 
}) => {
  const statusColors = {
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800"
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          {/* User Avatar */}

          <div className="flex-1">
            <div className="flex items-center gap-2">


          <div className="flex-shrink-0">
            {avatar ? (
              <img 
                src={avatar}
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="text-gray-400" />
              </div>
            )}
          </div>

                <h3 className="text-md md:text-lg text-gray-900 font-semibold">{prayer.title}</h3>

          </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">
                  {prayer.creator.fullName || 'Anonymous'} • {new Date(prayer.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* <span className={`px-2 py-1 text-xs rounded-full ${statusColors[prayer.status]}`}>
                  {prayer.status.charAt(0).toUpperCase() + prayer.status.slice(1)}
                </span> */}
                
                <div className="dropdown relative">
                  <button 
                    className="text-gray-500 hover:text-royal-DEFAULT"
                    aria-label="Prayer options"
                  >
                    <FaEllipsisV />
                  </button>
                  <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
                    <div className="py-1">
                      {onEdit && (
                        <button 
                          onClick={() => onEdit(prayer._id)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <FaEdit className="mr-2" /> Edit
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          onClick={() => onDelete(prayer._id)}
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 my-3">{prayer.content}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-600">
                <FaPray className="mr-1 text-royal-600" />
                <span>{prayer.prayedCount} people prayed</span>
              </div>

              {/* <div className="flex gap-2">
                {prayer.status !== "approved" && onApprove && (
                  <button 
                    onClick={() => onApprove(prayer.id)}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm flex items-center hover:bg-green-200 transition-colors"
                    aria-label="Approve prayer"
                  >
                    <FaCheck className="mr-1" /> Approve
                  </button>
                )}
                {prayer.status !== "rejected" && onReject && (
                  <button 
                    onClick={() => onReject(prayer.id)}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-sm flex items-center hover:bg-red-200 transition-colors"
                    aria-label="Reject prayer"
                  >
                    <FaTimes className="mr-1" /> Reject
                  </button>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerCard;