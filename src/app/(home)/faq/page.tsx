"use client"
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Users,
  Award,
  Shield,
} from "lucide-react";

const FAQPage = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleItem = (index:number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const faqData = [
    {
      question: "We already have a local group. Why join CONCES?",
      answer:
        "To access national visibility, leadership programs, funding, and a wider Christian engineering network.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      question: "Do we have to change our name to join?",
      answer:
        "No. You can retain your name and still affiliate with CONCES. Flexibility is allowed.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      question: "Can we join even if we're departmental-level only?",
      answer:
        "Yes. We'll support your growth to faculty-level if that's your aim. You're welcome as you are.",
      icon: <Award className="w-5 h-5" />,
    },
    {
      question: "Do CONCES chapters receive financial support?",
      answer:
        "Yes, through grants, zero-interest loans, and participation in national fundraising campaigns.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      question: "Will alumni or mentors support us?",
      answer:
        "Absolutely. We are building structured mentorship and alumni-student collaborations.",
      icon: <Award className="w-5 h-5" />,
    },
    {
      question: "Is there any legal risk in joining?",
      answer:
        "No. CONCES is CAC-registered and structured to protect local chapter autonomy.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      question: "Why trust CONCES?",
      answer:
        "We have 27 years of legacy and are building new, tech-driven, alumni-supported systems that last.",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <div
    
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      {/* Header Section */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-conces-blue)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-64 h-64 rounded-full"
            style={{ backgroundColor: "var(--color-conces-gold)" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
            style={{ backgroundColor: "var(--color-primary-light)" }}
          ></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div
                className="p-4 rounded-full"
                style={{ backgroundColor: "var(--color-conces-gold)" }}
              >
                <HelpCircle
                  className="w-12 h-12"
                  style={{ color: "var(--color-conces-blue)" }}
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              FAQ
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Questions You May Have
            </p>

            <div className="mt-8 flex justify-center">
              <div
                className="h-1 w-24 rounded-full"
                style={{ backgroundColor: "var(--color-conces-gold)" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-blue-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-primary-light)",
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--color-conces-blue)" }}
                  >
                    {item.question}
                  </h3>
                </div>

                <div
                  className="p-2 rounded-full transition-transform duration-200"
                  style={{
                    backgroundColor: expandedItems.has(index)
                      ? "var(--color-conces-gold)"
                      : "var(--color-primary-light)",
                    transform: expandedItems.has(index)
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  <ChevronDown
                    className="w-5 h-5"
                    style={{
                      color: expandedItems.has(index)
                        ? "var(--color-conces-blue)"
                        : "white",
                    }}
                  />
                </div>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: expandedItems.has(index) ? "200px" : "0px",
                  opacity: expandedItems.has(index) ? "1" : "0",
                }}
              >
                <div className="px-8 pb-6">
                  <div
                    className="pl-12 border-l-4 py-2"
                    style={{ borderColor: "var(--color-conces-gold)" }}
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div
            className="inline-block px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: "var(--color-conces-blue)" }}
          >
            <h3 className="text-xl mb-2">Still have questions?</h3>
            <p className="text-blue-100">
              Contact us for more information about joining CONCES
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div
              className="inline-block p-3 rounded-full mb-4"
              style={{ backgroundColor: "var(--color-primary-light)" }}
            >
              <Award className="w-6 h-6 text-white" />
            </div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--color-conces-blue)" }}
            >
              27 Years Legacy
            </h4>
            <p className="text-gray-600 text-sm">
              Trusted experience in Christian engineering
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div
              className="inline-block p-3 rounded-full mb-4"
              style={{ backgroundColor: "var(--color-conces-gold)" }}
            >
              <Shield
                className="w-6 h-6"
                style={{ color: "var(--color-conces-blue)" }}
              />
            </div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--color-conces-blue)" }}
            >
              CAC Registered
            </h4>
            <p className="text-gray-600 text-sm">
              Legally compliant and structured
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div
              className="inline-block p-3 rounded-full mb-4"
              style={{ backgroundColor: "var(--color-primary-DEFAULT)" }}
            >
              <Users className="w-6 h-6 text-white" />
            </div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--color-conces-blue)" }}
            >
              National Network
            </h4>
            <p className="text-gray-600 text-sm">
              Connect with Christian engineers nationwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
