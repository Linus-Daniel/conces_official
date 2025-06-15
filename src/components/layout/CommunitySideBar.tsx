import React from "react";
import { FaPray, FaCommentDots, FaLightbulb, FaPlus } from "react-icons/fa";
import { PrayerWallItem,EventItem } from "@/app/(home)/community/page";

type SidebarProps = {
  prayerWallItems: PrayerWallItem[];
  upcomingEvents: EventItem[];
  onCreatePost: () => void;
};

export default function Sidebar({ prayerWallItems, upcomingEvents, onCreatePost }: SidebarProps) {
  return (
    <div className="w-full md:w-1/4 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <button
          onClick={onCreatePost}
          className="w-full bg-royal-DEFAULT text-white py-2 md:py-3 rounded-lg font-medium hover:bg-royal-dark transition duration-300 flex items-center justify-center"
        >
          <FaPlus className="mr-2" />
          Create New Post
        </button>
        <div className="flex flex-col space-y-3 mt-4">
          <button className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center text-sm">
            <FaCommentDots className="text-royal-DEFAULT mr-2" />
            Start Discussion
          </button>
          <button className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center text-sm">
            <FaPray className="text-royal-DEFAULT mr-2" />
            Submit Prayer Request
          </button>
          <button className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center text-sm">
            <FaLightbulb className="text-royal-DEFAULT mr-2" />
            Share Project Update
          </button>
        </div>
      </div>

      <PrayerWall items={prayerWallItems} />
      <UpcomingEvents events={upcomingEvents} />
      
      <div className="bg-gradient-to-r from-royal-DEFAULT to-royal-dark rounded-lg p-4 md:p-5 text-white">
        <h3 className="font-bold text-lg mb-2">Join Mentorship Program</h3>
        <p className="text-sm mb-4 text-gray-100">
          Connect with experienced Christian engineers who can guide your
          spiritual and professional growth.
        </p>
        <button className="bg-gold hover:bg-gold-dark text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
          Apply Now
        </button>
      </div>
    </div>
  );
}

function PrayerWall({ items }: { items: PrayerWallItem[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-royal-DEFAULT text-white p-3 md:p-4 flex items-center justify-between">
        <h3 className="font-semibold">Prayer Wall</h3>
        <span className="text-gold-light text-sm hover:underline cursor-pointer">
          View All
        </span>
      </div>
      <div className="p-3 md:p-4 space-y-4 max-h-[300px] overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="border-b border-gray-100 pb-3 last:border-0">
            <div className="flex items-center mb-2">
              <img
                src={item.author.avatar}
                alt={item.author.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <p className="text-sm font-medium">{item.author.name}</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">{item.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{item.date}</span>
              <button className="text-xs text-royal-DEFAULT hover:underline">
                I've prayed ({item.prayed})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingEvents({ events }: { events: EventItem[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-royal-DEFAULT text-white p-3 md:p-4 flex items-center justify-between">
        <h3 className="font-semibold">Upcoming Events</h3>
        <span className="text-gold-light text-sm hover:underline cursor-pointer">
          View All
        </span>
      </div>
      <div className="p-3 md:p-4 space-y-4">
        {events.map(event => (
          <div key={event.id} className="flex items-start">
            <div className="bg-gray-100 rounded-lg p-2 text-center mr-3 w-12 flex-shrink-0">
              <div className="text-lg font-semibold text-royal-DEFAULT">
                {event.date.split(' ')[0]}
              </div>
              <div className="text-xs uppercase text-gray-500">{event.date.split(' ')[1]}</div>
            </div>
            <div>
              <h4 className="font-medium text-royal-DEFAULT text-sm md:text-base">
                {event.title}
              </h4>
              <p className="text-sm text-gray-600">{event.time}</p>
              <p className="text-xs text-gray-500 mt-1">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}