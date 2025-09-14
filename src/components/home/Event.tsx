import Link from "next/link";
import React from "react";

const eventsData = [
  {
    id: "event-1",
    title: "Renewable Energy Solutions Workshop",
    date: "Sep 15, 2025",
    time: "10:00 AM - 2:00 PM",
    type: "Workshop",
    description:
      "Learn practical skills for implementing sustainable energy solutions in underserved communities.",
    location: "University of Lagos",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/fe568f5f4b-6023f8bab46c6f7178f3.png",
    imageAlt:
      "engineering workshop in Nigerian university setting, students learning together",
    actionText: "Register Now",
    actionLink: "/register/renewable-energy-workshop",
  },
  {
    id: "event-2",
    title: "Engineers' Prayer & Bible Study",
    date: "Sep 20, 2023",
    time: "6:00 PM - 7:30 PM",
    type: "Devotional",
    description:
      "Weekly virtual gathering for prayer, Bible study, and fellowship focused on engineering challenges.",
    location: "Zoom Meeting",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/0233902786-78ce2c4f6bf1ee0ebab0.png",
    imageAlt:
      "prayer meeting in engineering lab, Nigerian students praying together",
    actionText: "Join Online",
    actionLink: "/join/prayer-study",
    isVirtual: true,
  },
  {
    id: "event-3",
    title: "Annual CONCES National Conference",
    date: "Oct 5-7, 2023",
    time: "3-Day Event",
    type: "Conference",
    description:
      "Join hundreds of Christian engineers for networking, learning, and spiritual growth.",
    location: "Covenant University",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/2aab9a5249-143fa64e0261f5d8ddb5.png",
    imageAlt:
      "engineering conference in Nigeria, professional setting with presentations",
    actionText: "Learn More",
    actionLink: "/conference/annual-conces-2023",
  },
];

const EventCard = ({ event }:{event:any}) => {
  return (
    <div
      id={event.id}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative h-48">
        <img
          className="w-full h-full object-cover"
          src={event.imageUrl}
          alt={event.imageAlt}
        />
        <div className="absolute top-4 left-4 bg-royal-700 text-white rounded-lg px-3 py-1 text-sm font-bold">
          {event.date}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="text-xs font-medium bg-royal-100 text-royal-700 px-2 py-1 rounded">
            {event.type}
          </span>
          <span className="text-xs text-gray-500 ml-auto">{event.time}</span>
        </div>
        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{event.description}</p>
        {!event.isVirtual && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{event.location}</span>
            <Link
              href={event.actionLink}
              className="text-royal-600 font-medium hover:text-royal-800 text-sm cursor-pointer"
            >
              {event.actionText}
            </Link>
          </div>
        )}
        {event.isVirtual && (
          <div className="text-center">
            <Link
              href={event.actionLink}
              className="text-royal-600 font-medium hover:text-royal-800 text-sm cursor-pointer"
            >
              {event.actionText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

function Event() {
  return (
    <div>
      <section id="events" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-royal-100 text-royal-700 font-medium rounded-full text-sm mb-4">
              Stay Updated
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming <span className="text-royal-700">Events</span> & News
            </h2>
            <div className="w-20 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              Stay connected with the latest happenings, workshops, conferences,
              and devotionals in the CONCES community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {eventsData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href={"/events"}
              className="inline-block px-6 py-3 bg-royal-600 text-white font-bold rounded-lg hover:bg-royal-700 transition shadow hover:shadow-lg cursor-pointer"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Event;
