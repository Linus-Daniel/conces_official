import Link from 'next/link'
import React from 'react'

function Event() {
  return (
    <div>
        <section id="events" className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <span className="inline-block px-4 py-1 bg-royal-100 text-royal-700 font-medium rounded-full text-sm mb-4">Stay Updated</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming <span className="text-royal-700">Events</span> & News</h2>
                <div className="w-20 h-1 bg-gold-400 mx-auto mb-8"></div>
                <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                    Stay connected with the latest happenings, workshops, conferences, and devotionals in the CONCES community.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div id="event-1" className="bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden">
                    <div className="relative h-48">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/fe568f5f4b-6023f8bab46c6f7178f3.png" alt="engineering workshop in Nigerian university setting, students learning together"/>
                        <div className="absolute top-4 left-4 bg-royal-700 text-white rounded-lg px-3 py-1 text-sm font-bold">
                            Sep 15, 2025
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center mb-3">
                            <span className="text-xs font-medium bg-royal-100 text-royal-700 px-2 py-1 rounded">Workshop</span>
                            <span className="text-xs text-gray-500 ml-auto">10:00 AM - 2:00 PM</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Renewable Energy Solutions Workshop</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Learn practical skills for implementing sustainable energy solutions in underserved communities.
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">University of Lagos</span>
                            <span className="text-royal-600 font-medium hover:text-royal-800 text-sm cursor-pointer">Register Now</span>
                        </div>
                    </div>
                </div>

                <div id="event-2" className="bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden">
                    <div className="relative h-48">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0233902786-78ce2c4f6bf1ee0ebab0.png" alt="prayer meeting in engineering lab, Nigerian students praying together"/>
                        <div className="absolute top-4 left-4 bg-royal-700 text-white rounded-lg px-3 py-1 text-sm font-bold">
                            Sep 20, 2023
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center mb-3">
                            <span className="text-xs font-medium bg-royal-100 text-royal-700 px-2 py-1 rounded">Devotional</span>
                            <span className="text-xs text-gray-500 ml-auto">6:00 PM - 7:30 PM</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Engineers' Prayer & Bible Study</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Weekly virtual gathering for prayer, Bible study, and fellowship focused on engineering challenges.
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Zoom Meeting</span>
                            <span className="text-royal-600 font-medium hover:text-royal-800 text-sm cursor-pointer">Join Online</span>
                        </div>
                    </div>
                </div>

                <div id="event-3" className="bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden">
                    <div className="relative h-48">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2aab9a5249-143fa64e0261f5d8ddb5.png" alt="engineering conference in Nigeria, professional setting with presentations"/>
                        <div className="absolute top-4 left-4 bg-royal-700 text-white rounded-lg px-3 py-1 text-sm font-bold">
                            Oct 5-7, 2023
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center mb-3">
                            <span className="text-xs font-medium bg-royal-100 text-royal-700 px-2 py-1 rounded">Conference</span>
                            <span className="text-xs text-gray-500 ml-auto">3-Day Event</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Annual CONCES National Conference</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Join hundreds of Christian engineers for networking, learning, and spiritual growth.
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Covenant University</span>
                            <span className="text-royal-600 font-medium hover:text-royal-800 text-sm cursor-pointer">Learn More</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <Link href={"/events"} className="inline-block px-6 py-3 bg-royal-600 text-white font-bold rounded-lg hover:bg-royal-700 transition shadow hover:shadow-lg cursor-pointer">
                    View All Events
                </Link>
            </div>
        </div>
    </section>

    </div>
  )
}

export default Event
