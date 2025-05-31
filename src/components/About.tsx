import React from 'react'
import { FaCross, FaGear, FaHandshake, FaUser } from 'react-icons/fa6'

function About() {
  return (
    <div>
            <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <span className="inline-block px-4 py-1 bg-royal-100 text-royal-700 font-medium rounded-full text-sm mb-4">About Us</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What is <span className="text-royal-700">CONCES</span>?</h2>
                <div className="w-20 h-1 bg-gold-400 mx-auto mb-8"></div>
                <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                    The Conference of Nigerian Christian Engineering Students and Alumni is a faith-based professional network that bridges spiritual values with engineering excellence.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1">
                    <div className="bg-royal-50 p-6 rounded-xl mb-6">
                        <h3 className="text-xl font-bold text-royal-800 mb-3">Our Mission</h3>
                        <p className="text-gray-700">
                            To raise a generation of engineering professionals who integrate Christian values into their practice, fostering innovation that honors God and serves humanity.
                        </p>
                    </div>
                    <div className="bg-royal-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-royal-800 mb-3">Our Vision</h3>
                        <p className="text-gray-700">
                            To be the premier network for Nigerian Christian engineers, renowned for excellence, integrity, and transformative impact in the engineering field and society at large.
                        </p>
                    </div>
                </div>
                <div className="order-1 md:order-2 relative">
                    <div className="relative rounded-xl overflow-hidden shadow-xl h-80">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/717f9f89f0-53fd5e7f247ae9d959aa.png" alt="diverse group of Nigerian engineering students in a university setting, studying together with an open Bible nearby, professional atmosphere"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-royal-900/70 to-transparent flex items-end">
                            <div className="p-6">
                                <span className="text-white font-semibold">Building tomorrow's Christian engineers today</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                <div id="pillar-faith" className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-gold-500">
                    <div className="w-16 h-16 bg-royal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCross className="fa-solid fa-cross text-royal-700 text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Faith</h3>
                    <p className="text-gray-600 text-sm">Grounding engineering practice in Biblical principles</p>
                </div>
                <div id="pillar-engineering" className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-gold-500">
                    <div className="w-16 h-16 bg-royal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaGear className="text-royal-700 text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Engineering</h3>
                    <p className="text-gray-600 text-sm">Pursuing technical excellence and innovation</p>
                </div>
                <div id="pillar-mentorship" className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-gold-500">
                    <div className="w-16 h-16 bg-royal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUser className="fa-solid fa-users text-royal-700 text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Mentorship</h3>
                    <p className="text-gray-600 text-sm">Guiding the next generation of Christian engineers</p>
                </div>
                <div id="pillar-community" className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-gold-500">
                    <div className="w-16 h-16 bg-royal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaHandshake className="fa-solid fa-handshake text-royal-700 text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Community</h3>
                    <p className="text-gray-600 text-sm">Building lifelong connections and support networks</p>
                </div>
            </div>
        </div>
    </section>
      
    </div>
  )
}

export default About
