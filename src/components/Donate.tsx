import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa6'

function Donate() {
  return (
    <div>
      
      <section
        id="donate"
        className="py-20 bg-gradient-to-br from-royal-900 via-royal-800 to-royal-700 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <img
            className="w-full h-full object-cover"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7d9fb80c7f-62f64381ade9f0b4abd2.png"
            alt="abstract pattern with subtle cross symbols and light rays, blue background"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full text-sm mb-4">
              Support Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Support the Mission.{" "}
              <span className="text-gold-400">Empower</span> the Next
              Generation.
            </h2>
            <div className="w-20 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-gray-200 text-lg">
              Your generosity enables us to provide resources, organize events,
              and create opportunities for Christian engineering students across
              Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  Choose Amount
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button className="py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition">
                    ₦500
                  </button>
                  <button className="py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition">
                    ₦1,000
                  </button>
                  <button className="py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition">
                    ₦2,000
                  </button>
                  <button className="py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition">
                    ₦5,000
                  </button>
                  <button className="py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition">
                    ₦10,000
                  </button>
                  <button className="py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition">
                    Custom
                  </button>
                </div>
                <div className="flex space-x-4 mb-6">
                  <button className="flex-1 py-3 bg-gold-500 text-royal-900 font-bold rounded-lg hover:bg-gold-400 transition">
                    Give Once
                  </button>
                  <button className="flex-1 py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition">
                    Give Monthly
                  </button>
                </div>
                <button className="w-full py-3 bg-royal-600 text-white font-bold rounded-lg hover:bg-royal-700 transition">
                  Donate Now
                </button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-start">
                  <FaQuoteLeft className="fa-solid fa-quote-left text-gold-400 text-3xl mr-4 mt-1" />
                  <div>
                    <p className="text-gray-200 italic mb-4">
                      "The scholarship I received from CONCES helped me complete
                      my final year project, which is now being used by my local
                      church for community development."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
                          alt="Student"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          Oluwaseun Adeyemi
                        </p>
                        <p className="text-gray-300 text-sm">
                          Electrical Engineering, UNILAG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl h-80">
                <img
                  className="w-full h-full object-cover"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/18d6a41269-8688190f13a2398e8d2b.png"
                  alt="Nigerian engineering students working on a community project, helping others, Christian service context"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-900/70 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="text-white font-semibold">
                      Your donations fund community impact projects
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Donate
