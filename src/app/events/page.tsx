"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaCalendarDay,
  FaComment,
  FaLocationDot,
  FaPen,
  FaPlus,
  FaTrash,
  FaUserCheck,
  FaVideo,
  FaXmark,
} from "react-icons/fa6";
import EventCard from "@/components/EventCard";

interface Event {
  id: string;
  title: string;
  category: string;
  branch: string;
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription: string;
  rsvps: number;
  comments: number;
  featured: boolean;
  image: string;
  registrationLink: string;
}

const EventsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">("upcoming");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const events: Event[] = [
    {
      id: "annual-engineering-prayer-summit",
      title: "Annual Engineering Prayer Summit",
      category: "spiritual",
      branch: "lagos",
      date: "2025-05-15",
      time: "10:00 AM - 4:00 PM",
      location: "University of Lagos, Engineering Auditorium",
      description:
        "A day of spiritual refreshing and prayer for all Christian engineers. Join us as we seek God's guidance for our profession and nation.",
      longDescription: `
        <p>The Annual Engineering Prayer Summit is our flagship spiritual event that brings together Christian engineers from across Nigeria for a day of prayer, worship, and spiritual renewal.</p>
        <p class="mt-4">This year's theme is "Building with Wisdom: Engineering for God's Glory" based on Proverbs 24:3-4. We'll explore how to integrate our faith with our engineering practice.</p>
        <p class="mt-4">Featured speakers include:</p>
        <ul class="list-disc pl-5 mt-2">
          <li>Engr. Adeola Johnson - CEO, Kingdom Engineering Solutions</li>
          <li>Pastor David Oke - Director, Christian Professionals Network</li>
          <li>Dr. Ngozi Okonjo - Professor of Civil Engineering, UNILAG</li>
        </ul>
        <p class="mt-4">The event will include:</p>
        <ul class="list-disc pl-5 mt-2">
          <li>Powerful worship session</li>
          <li>Keynote addresses</li>
          <li>Breakout prayer sessions by engineering disciplines</li>
          <li>Networking lunch</li>
        </ul>
      `,
      rsvps: 68,
      comments: 12,
      featured: true,
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/b1ccf9ecdc-7cd960f58a3cc3d1cf2e.png",
      registrationLink: "https://forms.example.com/prayer-summit-2025",
    },
    {
      id: "renewable-energy-solutions-workshop",
      title: "Technical Workshop: Renewable Energy Solutions",
      category: "academic",
      branch: "abuja",
      date: "2025-06-08",
      time: "9:00 AM - 2:00 PM",
      location: "Online Event (Zoom)",
      description:
        "Learn about sustainable energy solutions and how Christian engineers can lead in developing eco-friendly technologies for Nigerian communities.",
      longDescription: `
        <p>This technical workshop will provide hands-on training in renewable energy technologies with a focus on practical applications for Nigerian communities.</p>
        <p class="mt-4">Workshop topics include:</p>
        <ul class="list-disc pl-5 mt-2">
          <li>Solar PV system design and installation</li>
          <li>Small-scale wind energy solutions</li>
          <li>Biomass energy conversion</li>
          <li>Energy efficiency in buildings</li>
          <li>Faith-based approach to sustainable development</li>
        </ul>
        <p class="mt-4">The workshop will be led by Engr. Musa Bello, a renewable energy expert with 15 years of experience implementing off-grid solutions across Africa.</p>
        <p class="mt-4">Participants will receive:</p>
        <ul class="list-disc pl-5 mt-2">
          <li>Certificate of participation</li>
          <li>Technical manual and design templates</li>
          <li>Access to the CONCES renewable energy network</li>
        </ul>
      `,
      rsvps: 42,
      comments: 8,
      featured: false,
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/33dac56dd4-c73e8ca7254638195768.png",
      registrationLink: "https://zoom.us/webinar/register/renewable-energy-2025",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "spiritual":
        return { bg: "bg-green-100", text: "text-green-800" };
      case "academic":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "career":
        return { bg: "bg-yellow-100", text: "text-yellow-800" };
      case "social":
        return { bg: "bg-purple-100", text: "text-purple-800" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const filteredEvents = events.filter((event) => {
    if (activeTab === "upcoming") {
      const eventDate = new Date(event.date);
      const today = new Date();
      if (eventDate < today) return false;
    } else if (activeTab === "past") {
      const eventDate = new Date(event.date);
      const today = new Date();
      if (eventDate >= today) return false;
    }
    if (selectedBranch && event.branch !== selectedBranch) return false;
    if (selectedCategory && event.category !== selectedCategory) return false;
    return true;
  });

  return (
    <>
      <Head>
        <title>Events | CONCES</title>
        <meta
          name="description"
          content="Upcoming and past events for Nigerian Christian Engineering Students"
        />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600 mt-1">
              "Equipping the saints for the work of ministry" - Ephesians 4:12
            </p>
          </div>
          <Link
            href="/events/create"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-500 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
          >
            <FaPlus className="mr-2" />
            Create New Event
          </Link>
        </div>

        {/* Filters and Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "upcoming"
                    ? "text-white bg-royal-700"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "past"
                    ? "text-white bg-royal-700"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Past
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "all"
                    ? "text-white bg-royal-700"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                All
              </button>
            </div>

            <div className="flex space-x-4">
              <select
                aria-label="Filter by branch"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-royal-500 focus:ring-1 focus:ring-royal-500"
              >
                <option value="">All Branches</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="port-harcourt">Port Harcourt</option>
              </select>

              <select
                aria-label="Filter by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-royal-500 focus:ring-1 focus:ring-royal-500"
              >
                <option value="">All Categories</option>
                <option value="spiritual">Spiritual</option>
                <option value="academic">Academic</option>
                <option value="career">Career</option>
                <option value="social">Social</option>
              </select>
            </div>
          </div>
        </div>

        {/* Event List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No events found.
            </p>
          )}
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event}  />
          ))}
        </div>
      </main>
    </>
  );
};

export default EventsPage;
