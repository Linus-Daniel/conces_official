"use client"
import React, { useState, useEffect } from 'react';
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    quote: "CONCES helped me integrate my faith with my engineering practice. The mentorship I received guided me to use my skills for kingdom impact while excelling professionally.",
    name: "David Okafor",
    role: "Computer Engineering, 2018 Graduate",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
  },
  {
    id: '2',
    quote: "The prayer support and spiritual guidance I received through CONCES were invaluable during my challenging final year. I found both spiritual growth and academic excellence.",
    name: "Amina Ibrahim",
    role: "Petroleum Engineering, ABU Zaria",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
  },
  {
    id: '3',
    quote: "As an alumnus, I've been able to give back by mentoring young engineers. CONCES creates a beautiful cycle of support that strengthens both faith and profession.",
    name: "Grace Adeyemi",
    role: "Civil Engineering, Industry Professional",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
  }
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-royal-100 text-royal-700 font-medium rounded-full text-xs md:text-sm mb-3">
            Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Member <span className="text-royal-700">Testimonials</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gold-400 mx-auto mb-6 md:mb-8"></div>
          <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg">
            Hear from students and alumni whose lives and careers have been transformed through CONCES.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden h-full">
          {/* Testimonials Track */}
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {testimonialsData.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="w-full flex-shrink-0 px-2 sm:px-4"
              >
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg relative h-full">
                  <div className="absolute top-5 right-5 -mt-4 -mr-4 w-10 h-10 sm:w-12 sm:h-12 bg-royal-600 rounded-full flex items-center justify-center">
                    <FaQuoteRight className="text-white text-sm sm:text-base" />
                  </div>
                  <p className="text-gray-600 mb-6 italic text-sm sm:text-base">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-royal-600" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-royal-600" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-royal-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;