"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { IEvent } from "@/types";
import EventCard from "@/components/ui/EventCard";
import {
  FaFilter,
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTags,
} from "react-icons/fa";
import api from "@/lib/axiosInstance";
import { fi } from "zod/dist/types/v4/locales";

interface EventsComponentProps {
  chapter: string; // User's chapter to filter events initially
  showFilters?: boolean; // Option to show/hide filters
  limit?: number; // Option to limit number of events shown
}

const EventsComponent = ({
  chapter,
  showFilters = true,
  limit,
}: EventsComponentProps) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">(
    "upcoming"
  );
  const [selectedChapter, setSelectedChapter] = useState<string>(chapter || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/events");
        setEvents(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Get unique chapteres and categories from events
  const chapteres = Array.from(
    new Set(events.map((event) => event.chapter))
  ).filter(Boolean);
  const categories = Array.from(
    new Set(events.map((event) => event.category))
  ).filter(Boolean);

  const filteredEvents = events
    .filter((event) => {
      // Filter by active tab
      const eventDate = new Date(event.date);
      const today = new Date();

      if (activeTab === "upcoming" && eventDate < today) return false;
      if (activeTab === "past" && eventDate >= today) return false;

      // Filter by selected chapter
      if (selectedChapter && event.chapter.name !== selectedChapter)
        return false;

      // Filter by selected category
      if (selectedCategory && event.category !== selectedCategory) return false;

      return true;
    })
    .slice(0, limit); // Apply limit if provided

  const clearFilters = () => {
    setSelectedChapter(chapter || "");
    setSelectedCategory("");
  };

  const hasActiveFilters =
    selectedChapter !== (chapter || "") || selectedCategory !== "";

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-conces-blue"></div>
        </div>
      </div>
    );
  }

  console.log(filteredEvents);
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-conces-blue">
              CONCES Events
            </h1>
            <p className="text-royal-700 mt-2 italic">
              "Equipping the saints for the work of ministry" - Ephesians 4:12
            </p>
          </div>

          {showFilters && (
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-conces-blue text-white rounded-lg hover:bg-royal-dark transition-colors"
            >
              <FaFilter />
              Filters
            </button>
          )}
        </div>

        {/* Filters and Tabs - Only show if showFilters is true */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-royal-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex space-x-2 mb-4 md:mb-0">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeTab === "upcoming"
                      ? "text-white bg-conces-blue shadow-md"
                      : "text-royal-700 bg-royal-50 hover:bg-royal-100"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeTab === "past"
                      ? "text-white bg-conces-blue shadow-md"
                      : "text-royal-700 bg-royal-50 hover:bg-royal-100"
                  }`}
                >
                  Past
                </button>
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeTab === "all"
                      ? "text-white bg-conces-blue shadow-md"
                      : "text-royal-700 bg-royal-50 hover:bg-royal-100"
                  }`}
                >
                  All
                </button>
              </div>

              <div className="hidden md:flex space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-royal-500">
                    <FaMapMarkerAlt className="text-sm" />
                  </div>
                  <select
                    aria-label="Filter by chapter"
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="pl-10 pr-8 py-2 rounded-lg border-royal-200 text-royal-800 bg-royal-50 focus:border-conces-blue focus:ring-2 focus:ring-conces-blue/20 outline-none appearance-none"
                  >
                    <option value="">All Chapters</option>
                    {chapteres.map((chapter, index) => (
                      <option key={index} value={chapter.name as string}>
                        {chapter.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-royal-500">
                    <FaTags className="text-sm" />
                  </div>
                  <select
                    aria-label="Filter by category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-2 rounded-lg border-royal-200 text-royal-800 bg-royal-50 focus:border-conces-blue focus:ring-2 focus:ring-conces-blue/20 outline-none appearance-none"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-conces-blue hover:text-royal-dark px-3 py-2 bg-royal-50 rounded-lg hover:bg-royal-100 transition-colors"
                  >
                    <FaTimes className="text-xs" />
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Mobile filters */}
            {(showMobileFilters || !showFilters) && (
              <div className="md:hidden mt-4 pt-4 border-t border-royal-200">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-1 flex items-center gap-2">
                      <FaMapMarkerAlt />
                      Chapter
                    </label>
                    <select
                      value={selectedChapter}
                      onChange={(e) => setSelectedChapter(e.target.value)}
                      className="w-full rounded-lg border-royal-200 py-2 px-3 text-royal-800 bg-royal-50 focus:border-conces-blue focus:ring-2 focus:ring-conces-blue/20 outline-none"
                    >
                      <option value="">All Chapters</option>
                      {chapteres.map((chapter, index) => (
                        <option key={index} value={chapter.name}>
                          {chapter.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-1 flex items-center gap-2">
                      <FaTags />
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full rounded-lg border-royal-200 py-2 px-3 text-royal-800 bg-royal-50 focus:border-conces-blue focus:ring-2 focus:ring-conces-blue/20 outline-none"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center justify-center gap-1 text-sm text-conces-blue hover:text-royal-dark py-2 bg-royal-50 rounded-lg hover:bg-royal-100 transition-colors"
                    >
                      <FaTimes className="text-xs" />
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-royal-700 text-sm font-medium">
            {filteredEvents.length}{" "}
            {filteredEvents.length === 1 ? "event" : "events"} found
            {selectedChapter &&
              selectedChapter !== "" &&
              ` in ${selectedChapter}`}
          </p>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-conces-blue hover:text-royal-dark font-medium flex items-center gap-1"
            >
              <FaTimes className="text-xs" />
              Clear filters
            </button>
          )}
        </div>

        {/* Event List */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-royal-100">
            <div className="text-royal-400 mb-4">
              <FaCalendarAlt className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-royal-800 mb-2">
              No events found
            </h3>
            <p className="text-royal-600">
              {hasActiveFilters
                ? "Try adjusting your filters to see more events"
                : "There are no events scheduled at the moment"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 text-conces-blue hover:text-royal-dark font-medium flex items-center justify-center gap-1 mx-auto"
              >
                <FaTimes className="text-xs" />
                Clear all filters
              </button>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default EventsComponent;
