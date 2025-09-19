"use client";

import Image from "next/image";
import {
  CalendarDays,
  Video,
  PenSquare,
  Trash2,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import { IEvent } from "@/types";

const EventCard = (event: IEvent) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-64 h-48 md:h-auto relative">
          <Image
            className="w-full h-full object-cover"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/33dac56dd4-c73e8ca7254638195768.png"
            alt="Nigerian engineering workshop"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-1">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium mr-2">
                  {event.category}
                </span>
                <span className="bg-royal-100 text-royal-800 text-xs px-2 py-1 rounded-full font-medium">
                  {event.chapter.chapterName}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {event.title}
              </h3>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarDays className="w-4 h-4 mr-2 text-royal-600" />
                <span>{}</span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Video className="w-4 h-4 mr-2 text-royal-600" />
                <span>Online Event (Zoom)</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <PenSquare className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="mt-3 text-gray-600 line-clamp-2">
            Learn about sustainable energy solutions and how Christian engineers
            can lead in developing eco-friendly technologies for Nigerian
            communities.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <UserCheck className="w-4 h-4 mr-1 text-royal-600" />
                <span className="text-sm font-medium">{event.rsvps}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1 text-royal-600" />
                <span className="text-sm font-medium">{event.comments}</span>
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
};

export default EventCard;
