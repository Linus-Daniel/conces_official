"use client"
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowLeft, FaCalendar, FaCalendarCheck, FaCalendarDay, FaClipboardList, FaEnvelope, FaFacebook, FaLocationDot, FaShareNodes, FaTwitter, FaUsers, FaVideo, FaWhatsapp } from 'react-icons/fa6';

const EventPage = () => {
  const router = useRouter();
  const params= useParams()
  const id = params.id as string

  // Sample event data - in a real app, you'd fetch this based on the id
  const event = {
    id: 'annual-engineering-prayer-summit',
    title: "Annual Engineering Prayer Summit",
    category: "spiritual",
    branch: "lagos",
    date: "2025-05-15",
    time: "10:00 AM - 4:00 PM",
    location: "University of Lagos, Engineering Auditorium",
    description: "A day of spiritual refreshing and prayer for all Christian engineers. Join us as we seek God's guidance for our profession and nation.",
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
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b1ccf9ecdc-7cd960f58a3cc3d1cf2e.png",
    registrationLink: "https://forms.example.com/prayer-summit-2025",
    contactEmail: "prayer-summit@conces.org",
    contactPhone: "+234 800 123 4567",
    requirements: "Bring your Bible and a notebook. Business casual attire recommended."
  };

  const getCategoryColor = (category:string) => {
    switch (category) {
      case 'spiritual':
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'academic':
        return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'career':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case 'social':
        return { bg: 'bg-purple-100', text: 'text-purple-800' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const categoryColor = getCategoryColor(event.category);

  return (
    <>
      <Head>
        <title>{event.title} | CONCES</title>
        <meta name="description" content={event.description} />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/events" className="inline-flex items-center text-royal-600 hover:text-royal-800">
            <FaArrowLeft className="fa-solid fa-arrow-left mr-2" />
            Back to Events
          </Link>
        </div>

        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative">
            <img
              className="w-full h-64 object-cover"
              src={event.image}
              alt={event.title}
            />
            {event.featured && (
              <div className="absolute top-4 left-4 bg-royal-800 text-white px-3 py-1 text-xs font-semibold rounded">
                FEATURED
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <span className={`${categoryColor.bg} ${categoryColor.text} text-xs px-2 py-1 rounded-full font-medium mr-2`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                  <span className="bg-royal-100 text-royal-800 text-xs px-2 py-1 rounded-full font-medium">
                    {event.branch.charAt(0).toUpperCase() + event.branch.slice(1)} Branch
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-500 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
                >
                  <FaCalendarCheck className="fa-solid fa-calendar-check mr-2" />
                  Register Now
                </a>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 pt-1">
                    <FaCalendarDay className="fa-solid fa-calendar-day text-royal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                    <p className="text-sm text-gray-900 mt-1">
                      {formatDate(event.date)}<br />
                      {event.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 pt-1">
                    {event.location.includes('Online') ? (
                      <FaVideo className="fa-solid fa-video text-royal-600" />
                    ) : (
                      <FaLocationDot className="fa-solid fa-location-dot text-royal-600" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="text-sm text-gray-900 mt-1">{event.location}</p>
                    {!event.location.includes('Online') && (
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-royal-600 hover:text-royal-800 text-xs mt-1"
                      >
                        <FaLocationDot className="fa-solid fa-map-location-dot mr-1" />
                        View on map
                      </a>
                    )}
                  </div>
                </div>

                {event.requirements && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <FaClipboardList className="fa-solid fa-clipboard-list text-royal-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Requirements</h3>
                      <p className="text-sm text-gray-900 mt-1">{event.requirements}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 pt-1">
                    <FaUsers className="fa-solid fa-users text-royal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Attendees</h3>
                    <p className="text-sm text-gray-900 mt-1">{event.rsvps} people registered</p>
                  </div>
                </div>

                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 pt-1">
                    <FaEnvelope className="fa-solid fa-envelope text-royal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                    <p className="text-sm text-gray-900 mt-1">
                      <a href={`mailto:${event.contactEmail}`} className="text-royal-600 hover:text-royal-800">
                        {event.contactEmail}
                      </a>
                      <br />
                      {event.contactPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <FaShareNodes className="fa-solid fa-share-nodes text-royal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Share</h3>
                    <div className="flex space-x-4 mt-1">
                      <a
                        href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FaFacebook className="fa-brands fa-facebook-f" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(event.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FaTwitter className="fa-brands fa-twitter" />
                      </a>
                      <a
                        href={`whatsapp://send?text=${encodeURIComponent(`${event.title} - ${window.location.href}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FaWhatsapp className="fa-brands fa-whatsapp" />
                      </a>
                      <a
                        href={`mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(`${event.description}\n\n${window.location.href}`)}`}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FaEnvelope className="fa-solid fa-envelope" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
            <div
              className="prose max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: event.longDescription }}
            />
          </div>
        </div>

        {/* Registration CTA */}
        <div className="bg-royal-50 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Ready to join us?</h2>
            <p className="text-gray-600 mb-4">Register now to secure your spot at this event</p>
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gold-500 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
            >
              <FaCalendar className="fa-solid fa-calendar-check mr-2" />
              Register for Event
            </a>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Comments ({event.comments})</h2>
            <div className="space-y-4">
              {/* Sample comment */}
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User avatar"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Engr. John Adebayo</div>
                  <div className="text-xs text-gray-500 mb-2">May 5, 2025</div>
                  <p className="text-sm text-gray-600">
                    Looking forward to this event! I've attended the last three prayer summits and they've been
                    transformative for my engineering practice.
                  </p>
                </div>
              </div>

              {/* Comment form */}
              <div className="mt-6">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
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