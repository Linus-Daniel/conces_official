"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { IEvent } from "@/types";
import EventCard from "../ui/EventCard";
import api from "@/lib/axiosInstance";

// Constants
const EVENTS_TO_DISPLAY = 4;
const QUERY_STALE_TIME = 5 * 60 * 1000; // 5 minutes

// Extract API call outside component
async function fetchEvents(): Promise<IEvent[]> {
  const { data } = await api.get<IEvent[]>("/events");
  return data;
}

// Loading skeleton component
function EventCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

// Error component
function ErrorState({ error }: { error: Error }) {
  return (
    <div className="text-center py-12">
      <div className="text-red-500 mb-4">
        <svg
          className="w-12 h-12 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Unable to load events</h3>
      <p className="text-gray-600 text-sm">
        { "Please try again later"}
      </p>
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">No events scheduled</h3>
      <p className="text-gray-600">Check back later for upcoming events</p>
    </div>
  );
}

function Events() {
  const {
    data: events = [],
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: QUERY_STALE_TIME,
    gcTime: QUERY_STALE_TIME * 2, // formerly cacheTime
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Get limited events for display
  const displayEvents = events.slice(0, EVENTS_TO_DISPLAY);

  return (
    <section id="events" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
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

        {/* Events Grid */}
        <div className="min-h-[200px]">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {[...Array(EVENTS_TO_DISPLAY)].map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <ErrorState error={error as Error} />
          ) : displayEvents.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-12">
              {displayEvents.map((event) => (
                <EventCard key={event.id || event._id} event={event} />
              ))}
            </div>
          )}
        </div>

        {/* View All Button - Only show if there are events */}
        {!isLoading && !isError && displayEvents.length > 0 && (
          <div className="text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-royal-600 text-white font-bold rounded-lg hover:bg-royal-700 transition-all duration-200 shadow hover:shadow-lg transform hover:-translate-y-0.5"
            >
              View All Events
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Events;
