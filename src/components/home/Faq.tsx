"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Users,
  Building,
  DollarSign,
  BookOpen,
  HelpCircle,
  MessageCircle,
  Filter,
  X,
} from "lucide-react";
import Link from "next/link";

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Combined FAQ data with categories
  const faqData = [
    // Joining and Membership
    {
      id: 1,
      category: "joining",
      question: "Who can join CONCES?",
      answer:
        "CONCES is open to all Nigerian Christian engineering students and alumni. This includes current students in any engineering discipline and graduates working in engineering or related fields.",
    },
    {
      id: 2,
      category: "joining",
      question: "How do I become a member?",
      answer:
        "You can register on our website by creating an account. There's no membership fee for students. Alumni may have optional membership tiers with additional benefits.",
    },
    {
      id: 3,
      category: "joining",
      question: "Are there membership fees?",
      answer:
        "Membership is free for students. For alumni, we offer free basic membership with optional premium tiers that provide additional networking and professional development opportunities.",
    },
    {
      id: 4,
      category: "joining",
      question: "We already have a local group. Why join CONCES?",
      answer:
        "To access national visibility, leadership programs, funding, and a wider Christian engineering network. CONCES provides resources and connections that local groups typically cannot access independently.",
    },
    {
      id: 5,
      category: "joining",
      question: "Do we have to change our name to join?",
      answer:
        "No. You can retain your name and still affiliate with CONCES. Flexibility is allowed - we understand the value of established local identities.",
    },
    // Chapters and Organization
    {
      id: 6,
      category: "chapters",
      question: "How can I start a CONCES chapter at my school?",
      answer:
        "Contact us through our website or email info@conces.org to express interest in starting a chapter. We'll guide you through the process and connect you with nearby chapter leaders for support.",
    },
    {
      id: 7,
      category: "chapters",
      question: "Can we join even if we're departmental-level only?",
      answer:
        "Yes. We'll support your growth to faculty-level if that's your aim. You're welcome as you are - we believe in meeting chapters where they are and helping them grow.",
    },
    {
      id: 8,
      category: "chapters",
      question: "Do CONCES chapters receive financial support?",
      answer:
        "Yes, through grants, zero-interest loans, and participation in national fundraising campaigns. We provide various funding opportunities to help chapters achieve their goals.",
    },
    {
      id: 9,
      category: "chapters",
      question: "Is there any legal risk in joining?",
      answer:
        "No. CONCES is CAC-registered and structured to protect local chapter autonomy. Our legal framework is designed to support chapters while maintaining their independence.",
    },
    // Benefits and Programs
    {
      id: 10,
      category: "benefits",
      question: "What benefits do members receive?",
      answer:
        "Members get access to all our programs including hackathons, workshops, mentorship, career resources, faith integration content, and networking opportunities with students and alumni across Nigeria.",
    },
    {
      id: 11,
      category: "benefits",
      question: "Will alumni or mentors support us?",
      answer:
        "Absolutely. We are building structured mentorship and alumni-student collaborations. Our alumni network actively participates in mentoring current students.",
    },
    {
      id: 12,
      category: "benefits",
      question: "How can alumni get involved?",
      answer:
        "Alumni can participate as mentors, guest speakers, event sponsors, or by offering internship/job opportunities. You can also join our alumni network events and contribute to our resource library.",
    },
    {
      id: 13,
      category: "benefits",
      question: "Do you offer certificates for workshops?",
      answer:
        "Yes, participants receive certificates for completing our workshops and training programs. These certificates are recognized by our partner organizations and can be added to your professional portfolio.",
    },
    // Trust and Credibility
    {
      id: 14,
      category: "about",
      question: "Why trust CONCES?",
      answer:
        "We have 27 years of legacy and are building new, tech-driven, alumni-supported systems that last. Our track record demonstrates consistent commitment to supporting Christian engineers in Nigeria.",
    },
  ];

  // Categories for filtering
  const categories = [
    {
      value: "all",
      label: "All Questions",
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      value: "joining",
      label: "Joining & Membership",
      icon: <Users className="w-4 h-4" />,
    },
    {
      value: "chapters",
      label: "Chapters & Organization",
      icon: <Building className="w-4 h-4" />,
    },
    {
      value: "benefits",
      label: "Benefits & Programs",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      value: "about",
      label: "About CONCES",
      icon: <MessageCircle className="w-4 h-4" />,
    },
  ];

  // Filter FAQ items based on search and category
  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Toggle FAQ item open/closed
  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Get category count
  const getCategoryCount = (categoryValue: string) => {
    if (categoryValue === "all") return faqData.length;
    return faqData.filter((item) => item.category === categoryValue).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-conces-blue via-primary to-primary-light text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Find answers to common questions about CONCES, our programs,
              membership, and how we support Christian engineers across Nigeria.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories and Search */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Search */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-royal-900 mb-4">
                  Search FAQs
                </h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-royal-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-royal-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-royal-900 placeholder-royal-400"
                    placeholder="Search questions..."
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-royal-400 hover:text-royal-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-bold text-royal-900 mb-4 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                        selectedCategory === category.value
                          ? "bg-gold-100 text-gold-800 border border-gold-200"
                          : "text-royal-700 hover:bg-royal-50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={
                            selectedCategory === category.value
                              ? "text-gold-600"
                              : "text-royal-400"
                          }
                        >
                          {category.icon}
                        </div>
                        <span className="font-medium text-sm">
                          {category.label}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          selectedCategory === category.value
                            ? "bg-gold-200 text-gold-800"
                            : "bg-royal-100 text-royal-600"
                        }`}
                      >
                        {getCategoryCount(category.value)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Help */}
              {/* <div className="mt-8 p-4 bg-gradient-to-r from-conces-blue to-primary rounded-xl text-white">
                <h4 className="font-bold mb-2">Still have questions?</h4>
                <p className="text-sm text-white/90 mb-3">
                  Can't find what you're looking for? We're here to help.
                </p>
                <button className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                  Contact Support
                </button>
              </div> */}
            </div>
          </div>

          {/* Main Content - FAQ Items */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-royal-900">
                  {selectedCategory === "all"
                    ? "All Questions"
                    : categories.find((cat) => cat.value === selectedCategory)
                        ?.label}
                </h2>
                <div className="text-sm text-royal-600">
                  {filteredFAQs.length}{" "}
                  {filteredFAQs.length === 1 ? "question" : "questions"}
                  {searchQuery && ` matching "${searchQuery}"`}
                </div>
              </div>

              {searchQuery && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>Search results for:</strong> "{searchQuery}"
                  </p>
                </div>
              )}
            </div>

            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-royal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-royal-400" />
                </div>
                <h3 className="text-lg font-semibold text-royal-900 mb-2">
                  No questions found
                </h3>
                <p className="text-royal-600 mb-4">
                  {searchQuery
                    ? `No questions match your search "${searchQuery}"`
                    : "No questions in this category"}
                </p>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="text-gold-600 hover:text-gold-700 font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-semibold text-royal-900 leading-relaxed">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        {openItems.includes(faq.id) ? (
                          <ChevronDown className="w-5 h-5 text-gold-600 transition-transform" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-royal-400 transition-transform" />
                        )}
                      </div>
                    </button>

                    {openItems.includes(faq.id) && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-royal-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="text-lg font-bold text-royal-900 mb-2">
                  Need More Help?
                </h3>
                <p className="text-royal-600 mb-4 text-sm">
                  Get personalized assistance from our support team
                </p>
                <Link href={"/contact-us"} className="bg-gold-600 hover:bg-gold-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Contact Us
                </Link>
              </div>

              <div className="bg-gradient-to-r from-conces-blue to-primary rounded-2xl shadow-lg p-6 text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Join Our Community</h3>
                <p className="text-white/90 mb-4 text-sm">
                  Connect with thousands of Christian engineers
                </p>
                <button className="bg-gold-600 hover:bg-gold-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FAQPage;
