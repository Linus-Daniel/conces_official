"use client";
import React from "react";
import {
  FaLocationDot,
  FaUserCheck,
  FaComments,
  FaPen,
  FaTrash,
} from "react-icons/fa6";
import { IEvent } from "@/types";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

interface EventCardProps {
  event: IEvent;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
  };

  const categoryColors = {
    spiritual: "bg-purple-100 text-purple-800",
    academic: "bg-blue-100 text-blue-800",
    career: "bg-green-100 text-green-800",
    social: "bg-yellow-100 text-yellow-800",
    default: "bg-gray-100 text-gray-800",
  };

  const getCategoryColor = (category: string) => {
    return (
      categoryColors[category as keyof typeof categoryColors] ||
      categoryColors.default
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {event.image && (
        <div className="relative h-48 w-full">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {event.featured && (
            <span className="absolute top-2 left-2 bg-royal-800 text-white px-2 py-1 text-xs font-semibold rounded">
              FEATURED
            </span>
          )}
        </div>
      )}

      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-wrap gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(
                event.category
              )}`}
            >
              {event.category}
            </span>
            <span className="bg-royal-100 text-royal-800 text-xs px-2 py-1 rounded-full font-medium">
              {event.chapter.chapterName}
            </span>
          </div>

          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(event.id)}
                className="text-gray-500 hover:text-royal-600 transition-colors"
                aria-label="Edit event"
              >
                <FaPen size={14} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(event.id)}
                className="text-gray-500 hover:text-red-600 transition-colors"
                aria-label="Delete event"
              >
                <FaTrash size={14} />
              </button>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {event.title}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-1">
          <FaCalendarAlt className="mr-2 text-royal-600" />
          <span>
            {event.date} • {event.time}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <FaLocationDot className="mr-2 text-royal-600" />
          <span>{event.location}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaUserCheck className="mr-1 text-royal-600" />
              <span>{event.rsvps} RSVPs</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaComments className="mr-1 text-royal-600" />
              <span>{event.comments} Comments</span>
            </div>
          </div>

          <div className="flex gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                statusColors[event.status]
              }`}
            >
              {/* {event.status.charAt(0).toUpperCase() + event.status.slice(1)} */}
            </span>
            <Link
              href={`/events/${event._id}`}
              className="inline-flex text-white text-royal-white items-center px-3 py-1.5  border border-transparent rounded-md shadow-sm text-xs font-medium  bg-royal-600 hover:bg-royal-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
