"use client";
import React from "react";
import { FaLocationDot, FaUserCheck, FaComments } from "react-icons/fa6";
import { IEvent } from "@/types";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

interface EventCardProps {
  event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Image Section - Fixed Height */}
      <div className="relative h-48 w-full bg-gray-100">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-royal-50 to-royal-100">
            <span className="text-6xl opacity-20 text-royal-600">📅</span>
          </div>
        )}
        {event.featured && (
          <span className="absolute top-2 left-2 bg-royal-800 text-white px-2 py-1 text-xs font-semibold rounded">
            FEATURED
          </span>
        )}
      </div>

      {/* Content Section - Flex Grow */}
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        {/* Tags Section - Fixed Height */}
        <div className="flex flex-wrap gap-2 mb-3 min-h-[28px]">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(
              event.category
            )}`}
          >
            {event.category}
          </span>
          {event.chapter?.chapterName && (
            <span className="bg-royal-100 text-royal-800 text-xs px-2 py-1 rounded-full font-medium">
              {event.chapter.chapterName}
            </span>
          )}
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ml-auto ${
              statusColors[event.status]
            }`}
          >
            {event.status}
          </span>
        </div>

        {/* Title - Fixed Min Height */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[56px]">
          {event.title}
        </h3>

        {/* Date & Location */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <FaCalendarAlt className="mr-2 text-royal-600 flex-shrink-0" />
            <span className="truncate">
              {event.date} • {event.time}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaLocationDot className="mr-2 text-royal-600 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Description - Fixed Height */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {event.description}
        </p>

        {/* Spacer - Pushes bottom content down */}
        <div className="flex-grow"></div>

        {/* Stats Section - Always at Bottom */}
        <div className="pt-4 mt-auto border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaUserCheck className="mr-1 text-royal-600" />
                <span>{event.rsvps || 0} RSVPs</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaComments className="mr-1 text-royal-600" />
                <span>{event.comments || 0} Comments</span>
              </div>
            </div>
          </div>

          {/* Button - Always Full Width at Bottom */}
          <Link
            href={`/events/${event._id}`}
            className="block w-full text-center px-4 py-2 bg-royal-600 text-white font-medium rounded-md shadow-sm hover:bg-royal-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
