"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

import api from "@/lib/axiosInstance";
import { IEvent } from "@/types";
import EventCard from "@/components/ui/EventCard";



const EventsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">("upcoming");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [events, setEvents] = useState<IEvent[]>([]);


  useEffect(()=>{
    const fetchEvents = async () => {
      try{
        const response = await api.get("/events");
        setEvents(response.data); 

      }catch(error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  },[])


 

  console.log("Events:", events);
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
          {/* {filteredEvents.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No events found.
            </p>
          )} */}
          {events.map((event) => (
            <EventCard key={event.id} event={event}  />
          ))}
        </div>
      </main>
    </>
  );
};

export default EventsPage;
