import React from 'react'
import { FaQuoteRight } from 'react-icons/fa6'

function Leaders() {
  return (
    <div>
          <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <span className="inline-block px-4 py-1 bg-royal-100 text-royal-700 font-medium rounded-full text-sm mb-4">Success Stories</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Member <span className="text-royal-700">Testimonials</span></h2>
                <div className="w-20 h-1 bg-gold-400 mx-auto mb-8"></div>
                <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                    Hear from students and alumni whose lives and careers have been transformed through CONCES.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div id="testimonial-1" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition relative">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 bg-royal-600 rounded-full flex items-center justify-center">
                        <FaQuoteRight className="fa-solid fa-quote-right text-white" />
                    </div>
                    <p className="text-gray-600 mb-6 italic">
                        "CONCES helped me integrate my faith with my engineering practice. The mentorship I received guided me to use my skills for kingdom impact while excelling professionally."
                    </p>
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Student" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <p className="font-bold">David Okafor</p>
                            <p className="text-sm text-gray-500">Computer Engineering, 2018 Graduate</p>
                        </div>
                    </div>
                </div>

                <div id="testimonial-2" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition relative">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 bg-royal-600 rounded-full flex items-center justify-center">
                        <FaQuoteRight className="fa-solid fa-quote-right text-white" />
                    </div>
                    <p className="text-gray-600 mb-6 italic">
                        "The prayer support and spiritual guidance I received through CONCES were invaluable during my challenging final year. I found both spiritual growth and academic excellence."
                    </p>
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Student" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <p className="font-bold">Amina Ibrahim</p>
                            <p className="text-sm text-gray-500">Petroleum Engineering, ABU Zaria</p>
                        </div>
                    </div>
                </div>

                <div id="testimonial-3" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition relative">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 bg-royal-600 rounded-full flex items-center justify-center">
                        <FaQuoteRight className="fa-solid fa-quote-right text-white" />
                    </div>
                    <p className="text-gray-600 mb-6 italic">
                        "As an alumnus, I've been able to give back by mentoring young engineers. CONCES creates a beautiful cycle of support that strengthens both faith and profession."
                    </p>
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="Student" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <p className="font-bold">Grace Adeyemi</p>
                            <p className="text-sm text-gray-500">Civil Engineering, Industry Professional</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
      
    </div>
  )
}

export default Leaders
