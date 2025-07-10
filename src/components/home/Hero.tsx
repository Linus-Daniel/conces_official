"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
     
    <section id="hero" className="relative pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden bg-gradient-to-br from-royal-900 via-royal-800 to-royal-700">
        <div className="absolute inset-0 opacity-10">
            <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/856b1ebcc9-360a76c7ac3243855703.png" alt="abstract pattern with Nigerian university campus, subtle cross symbols, and engineering icons in blue and gold color scheme"/>
        </div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute -right-10 -top-10 w-72 h-72 bg-gold-400 rounded-full filter blur-3xl"></div>
            <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-royal-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <div className="inline-block mb-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-gold-300 font-semibold text-sm">Conference of Nigerian Christian Engineering Students and Alumni</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                        Uniting <span className="text-gold-400">Faith</span>, <span className="text-gold-400">Engineering</span> & <span className="text-gold-400">Purpose</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
                        Where spiritual growth meets technical excellence. Join a community that nurtures both your faith and engineering career.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                        <span className="px-8 py-3 bg-gold-500 text-royal-900 font-bold rounded-lg hover:bg-gold-400 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                            Join as Student
                        </span>
                        <span className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/30 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                            Join as Alumnus
                        </span>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-80 h-80 animate-float">
                        <Image width={500} height={500} className="w-full rounded-full h-full object-contain" src="/images/logo.png" alt="modern logo for CONCES with cross symbol integrated with engineering gear icon, blue and gold colors, transparent background"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
                <path fill="#ffffff" fill-opacity="1" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,170.7C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg> */}
        </div>
    </section>
  )
}