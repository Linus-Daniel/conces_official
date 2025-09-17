"use client";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendar,
  FaCalendarCheck,
  FaCalendarDay,
  FaClipboardList,
  FaEnvelope,
  FaFacebook,
  FaLocationDot,
  FaShareNodes,
  FaTwitter,
  FaUsers,
  FaVideo,
  FaWhatsapp,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IEvent } from "@/types";
import api from "@/lib/axiosInstance";
import Image from "next/image";

const EventPage = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<IEvent | null>(null);
  const id = params.id as string;

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const getCategoryColor = (category: string) => {
    const colors = {
      spiritual: { bg: "bg-green-100", text: "text-green-800" },
      academic: { bg: "bg-blue-100", text: "text-blue-800" },
      career: { bg: "bg-yellow-100", text: "text-yellow-800" },
      social: { bg: "bg-purple-100", text: "text-purple-800" },
    };
    return (
      colors[category as keyof typeof colors] || {
        bg: "bg-gray-100",
        text: "text-gray-800",
      }
    );
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-royal-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Event not found
          </h2>
          <Link
            href="/events"
            className="mt-4 inline-flex items-center text-royal-600 hover:text-royal-800"
          >
            <FaArrowLeft className="mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const categoryColor = getCategoryColor(event.category);

  return (
    <>
      <Head>
        <title>{event.title} | CONCES</title>
        <meta name="description" content={event.description} />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Back button */}
        <div className="mb-4 md:mb-6">
          <Link
            href="/events"
            className="inline-flex items-center text-royal-600 hover:text-royal-800 text-sm md:text-base"
          >
            <FaArrowLeft className="mr-2" />
            Back to Events
          </Link>
        </div>

        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 md:mb-8">
          <div className="relative aspect-video w-full">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
            {event.featured && (
              <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-royal-800 text-white px-2 py-1 text-xs md:text-sm font-semibold rounded">
                FEATURED
              </div>
            )}
          </div>

          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`${categoryColor.bg} ${categoryColor.text} text-xs px-2 py-1 rounded-full font-medium`}
                  >
                    {event.category.charAt(0).toUpperCase() +
                      event.category.slice(1)}
                  </span>
                  <span className="bg-royal-100 text-royal-800 text-xs px-2 py-1 rounded-full font-medium">
                    {event.chapter
                      ? event.chapter.charAt(0).toUpperCase() +
                        event.chapter.slice(1)
                      : "National"}{" "}
                    Chapter
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {event.title}
                </h1>
              </div>
              <div className="mt-3 md:mt-0">
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-500 hover:bg-gold-600 focus:outline-none"
                >
                  <FaCalendarCheck className="mr-2" />
                  Register Now
                </a>
              </div>
            </div>

            <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <div className="flex items-start mb-3 md:mb-4">
                  <div className="flex-shrink-0 pt-1">
                    <FaCalendarDay className="text-royal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">
                      Date & Time
                    </h3>
                    <p className="text-sm text-gray-900 mt-1">
                      {formatDate(event.date)}
                      <br />
                      {event.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-3 md:mb-4">
                  <div className="flex-shrink-0 pt-1">
                    {event.location.includes("Online") ? (
                      <FaVideo className="text-royal-600" />
                    ) : (
                      <FaLocationDot className="text-royal-600" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">
                      Location
                    </h3>
                    <p className="text-sm text-gray-900 mt-1">
                      {event.location}
                    </p>
                    {!event.location.includes("Online") && (
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          event.location
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-royal-600 hover:text-royal-800 text-xs mt-1"
                      >
                        <FaLocationDot className="mr-1" />
                        View on map
                      </a>
                    )}
                  </div>
                </div>

                {event.requirements && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <FaClipboardList className="text-royal-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">
                        Requirements
                      </h3>
                      <p className="text-sm text-gray-900 mt-1">
                        {event.requirements}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-start mb-3 md:mb-4">
                  <div className="flex-shrink-0 pt-1">
                    <FaUsers className="text-royal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">
                      Attendees
                    </h3>
                    <p className="text-sm text-gray-900 mt-1">
                      {event.rsvps} people registered
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-3 md:mb-4">
                  <div className="flex-shrink-0 pt-1">
                    <FaEnvelope className="text-royal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">
                      Contact
                    </h3>
                    <p className="text-sm text-gray-900 mt-1">
                      <a
                        href={`mailto:${event.contactEmail}`}
                        className="text-royal-600 hover:text-royal-800"
                      >
                        {event.contactEmail}
                      </a>
                      <br />
                      {event.contactPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <FaShareNodes className="text-royal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Share</h3>
                    <div className="flex space-x-3 md:space-x-4 mt-1">
                      <a
                        href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                        aria-label="Share on Facebook"
                      >
                        <FaFacebook />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          window.location.href
                        )}&text=${encodeURIComponent(event.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                        aria-label="Share on Twitter"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href={`whatsapp://send?text=${encodeURIComponent(
                          `${event.title} - ${window.location.href}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                        aria-label="Share on WhatsApp"
                      >
                        <FaWhatsapp />
                      </a>
                      <a
                        href={`mailto:?subject=${encodeURIComponent(
                          event.title
                        )}&body=${encodeURIComponent(
                          `${event.description}\n\n${window.location.href}`
                        )}`}
                        className="text-gray-400 hover:text-gray-500"
                        aria-label="Share via Email"
                      >
                        <FaEnvelope />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 md:mb-8">
          <div className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">
              Event Details
            </h2>
            <div
              className="prose max-w-none text-gray-600 prose-sm md:prose-base"
              dangerouslySetInnerHTML={{ __html: event.longDescription }}
            />
          </div>
        </div>

        {/* Registration CTA */}
        <div className="bg-royal-50 rounded-lg shadow-sm overflow-hidden mb-6 md:mb-8">
          <div className="p-4 md:p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to join us?
            </h2>
            <p className="text-gray-600 mb-3 md:mb-4">
              Register now to secure your spot at this event
            </p>
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 border border-transparent rounded-md shadow-sm text-sm md:text-base font-medium text-white bg-gold-500 hover:bg-gold-600 focus:outline-none"
            >
              <FaCalendar className="mr-2" />
              Register for Event
            </a>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">
              Comments ({event.comments})
            </h2>
            <div className="space-y-3 md:space-y-4">
              {/* Sample comment */}
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <Image
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Engr. John Adebayo
                  </div>
                  <div className="text-xs text-gray-500 mb-1 md:mb-2">
                    May 5, 2025
                  </div>
                  <p className="text-sm text-gray-600">
                    Looking forward to this event! I've attended the last three
                    prayer summits and they've been transformative for my
                    engineering practice.
                  </p>
                </div>
              </div>

              {/* Comment form */}
              <div className="mt-4 md:mt-6">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-1 md:mb-2"
                >
                  Add your comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  className="shadow-sm focus:ring-royal-500 focus:border-royal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Share your thoughts about this event..."
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-royal-600 hover:bg-royal-700 focus:outline-none"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventPage;
