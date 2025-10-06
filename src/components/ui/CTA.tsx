import Link from 'next/link'
import React from 'react'

function CTA() {
  return (
    <div>

<section id="cta" className="py-20 bg-gradient-to-br from-royal-900 via-royal-800 to-royal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7d01d9812e-90cf18bf361344c5a8f3.png" alt="abstract pattern with light rays and engineering symbols, spiritual atmosphere"/>
        </div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute -right-10 -top-10 w-72 h-72 bg-gold-400 rounded-full filter blur-3xl"></div>
            <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-royal-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Start Your Journey with CONCES Today</h2>
                <p className="text-xl text-gray-200 mb-10">
                    Join a community of Christian engineers committed to excellence in faith and profession.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                   <Link href={`/auth?mode=signup`}className="px-8 py-4 bg-gold-500 text-royal-900 font-bold rounded-lg hover:bg-gold-400 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg cursor-pointer">
                        Create Your Free Account
                    </Link>
                    <Link href={`/about`} className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/30 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg cursor-pointer">
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    </section>

      
    </div>
  )
}

export default CTA
