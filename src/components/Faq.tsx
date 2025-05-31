// pages/faq.js
"use client"
import { useState } from 'react';

const faqs = [
  {
    question: "Who can join CONCES?",
    answer: "CONCES is open to all Nigerian Christian engineering students and alumni. This includes current students in any engineering discipline and graduates working in engineering or related fields."
  },
  {
    question: "How do I become a member?",
    answer: "You can register on our website by creating an account. There's no membership fee for students. Alumni may have optional membership tiers with additional benefits."
  },
  {
    question: "Are there membership fees?",
    answer: "Membership is free for students. For alumni, we offer free basic membership with optional premium tiers that provide additional networking and professional development opportunities."
  },
  {
    question: "How can I start a CONCES chapter at my school?",
    answer: "Contact us through our website or email info@conces.org to express interest in starting a chapter. We'll guide you through the process and connect you with nearby chapter leaders for support."
  },
  {
    question: "What benefits do members receive?",
    answer: "Members get access to all our programs including hackathons, workshops, mentorship, career resources, faith integration content, and networking opportunities with students and alumni across Nigeria."
  },
  {
    question: "How can alumni get involved?",
    answer: "Alumni can participate as mentors, guest speakers, event sponsors, or by offering internship/job opportunities. You can also join our alumni network events and contribute to our resource library."
  },
  {
    question: "Do you offer certificates for workshops?",
    answer: "Yes, participants receive certificates for completing our workshops and training programs. These certificates are recognized by our partner organizations and can be added to your professional portfolio."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number|null>(null);

  const toggleFAQ = (index:number) => {
    setActiveIndex(activeIndex === index ? null : index as number);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-conces-blue mb-6">Frequently Asked Questions</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b last:border-b-0">
            <button
              className="w-full px-6 py-4 text-left hover:bg-conces-light focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-conces-blue">{faq.question}</h2>
                <svg
                  className={`w-5 h-5 text-conces-blue transform transition-transform ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-conces-light p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-conces-blue mb-4">Still have questions?</h2>
        <p className="mb-4">Contact us at <a href="mailto:info@conces.org" className="text-conces-blue underline">info@conces.org</a> or through our social media channels.</p>
        <button className="bg-conces-blue text-white px-4 py-2 rounded hover:bg-conces-blue-dark">
          Contact Support
        </button>
      </div>
    </div>
  );
}