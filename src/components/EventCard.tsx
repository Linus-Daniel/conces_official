import React from "react";


export interface Event {
    id: string | number;
    title: string;
    category: string;
    branch: string;
    date: string; // e.g. "May 15, 2025"
    time: string; // e.g. "10:00 AM - 4:00 PM"
    location: string;
    description: string;
    imageUrl?: string;
    featured: boolean;
    rsvps: number;
    comments: number;
  }
  
  export interface EventCardProps {
    event: Event;
  }
function EventCard({ event }:EventCardProps) {
  // Destructure needed properties from the event object
  const {
    id,
    title,
    category,
    branch,
    date,
    time,
    location,
    description,
    imageUrl,
    featured,
    rsvps,
    comments,
  } = event;

  return (
    <div id={`event-card-${id}`} className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-64 h-48 md:h-auto relative">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={`${title} - ${branch} branch`}
          />
          {featured && (
            <div className="absolute top-0 left-0 bg-royal-800 text-white px-3 py-1 text-xs font-semibold">
              FEATURED
            </div>
          )}
        </div>
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-1">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium mr-2">
                  {category}
                </span>
                <span className="bg-royal-100 text-royal-800 text-xs px-2 py-1 rounded-full font-medium">
                  {branch} Branch
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <i className="fa-solid fa-calendar-day mr-2 text-royal-600"></i>
                <span>
                  {date} • {time}
                </span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <i className="fa-solid fa-location-dot mr-2 text-royal-600"></i>
                <span>{location}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <p className="mt-3 text-gray-600 line-clamp-2">{description}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <i className="fa-solid fa-user-check mr-1 text-royal-600"></i>
                <span className="text-sm font-medium">{rsvps} RSVPs</span>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-comments mr-1 text-royal-600"></i>
                <span className="text-sm font-medium">{comments} Comments</span>
              </div>
            </div>
            <button className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
