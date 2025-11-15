'use client';

import React, { useState, useEffect } from 'react';
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import api from '@/lib/axiosInstance';
import { TestimonialSkeleton } from '../ui/Skeletons';

type Testimonial = {
  _id: string;
  content: string;
  name: string;
  role: string;
  avatar: string;
};

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await api.get('/testimonies');
        setTestimonials(res.data || []);
      } catch (err) {
        console.error('Failed to fetch testimonies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSlidesToShow(3);
      else if (window.innerWidth >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev >= testimonials.length - slidesToShow ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials, slidesToShow]);

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev >= testimonials.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev <= 0 ? testimonials.length - slidesToShow : prev - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    else if (touchStart - touchEnd < -50) prevSlide();
  };

  // Loading state
  if (loading) {
    return (
      <section id="testimonials" className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <TestimonialSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // No testimonials case
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
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

        <div className="relative overflow-hidden h-full">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              width: `${testimonials.length * (100 / slidesToShow)}%`
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((t) => (
              <div
                key={t._id}
                className={`flex-shrink-0 px-2 sm:px-4 ${
                  slidesToShow === 1
                    ? 'w-full'
                    : slidesToShow === 2
                    ? 'w-1/2'
                    : 'w-1/3'
                }`}
              >
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg relative h-full">
                  <div className="absolute top-5 right-5 -mt-4 -mr-4 w-10 h-10 sm:w-12 sm:h-12 bg-royal-600 rounded-full flex items-center justify-center">
                    <FaQuoteRight className="text-white text-sm sm:text-base" />
                  </div>
                  <p className="text-gray-600 mb-6 italic text-sm sm:text-base">
                    {t.content}
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm sm:text-base">{t.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
          >
            <FaChevronLeft className="text-royal-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
          >
            <FaChevronRight className="text-royal-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: testimonials.length - slidesToShow + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-royal-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
