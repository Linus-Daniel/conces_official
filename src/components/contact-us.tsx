"use client";
import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Loader,
  Star,
  Building,
  BookOpen,
  Briefcase,
  Heart,
  Globe,
  Camera,
  UserCheck,
  Newspaper,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    chapter: "",
    subject: "",
    customSubject: "",
    message: "",
    priority: "medium",
    contactMethod: "email",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const query = useSearchParams()
  const subject = query.get('subject')
console.log(subject)
  // Dynamic subject options with icons and descriptions

  useEffect(()=>{
    if(query){

      setFormData((prev)=>({
        ...prev,
        subject: subject || ""
      }))

    }

  },[])
  const subjectOptions = [
    {
      value: "general",
      label: "📋 General Inquiry",
      icon: <MessageCircle className="w-4 h-4" />,
      description: "General questions about CONCES",
    },
    {
      value: "membership",
      label: "👥 Membership Information",
      icon: <Users className="w-4 h-4" />,
      description: "Join CONCES or membership queries",
    },
    {
      value: "events",
      label: "📅 Event Planning",
      icon: <Calendar className="w-4 h-4" />,
      description: "Event organization and planning",
    },
    {
      value: "chapter",
      label: "🏢 Chapter Support",
      icon: <Building className="w-4 h-4" />,
      description: "Chapter-specific assistance",
    },
    {
      value: "alumni",
      label: "🎓 Alumni Services",
      icon: <UserCheck className="w-4 h-4" />,
      description: "Alumni network and services",
    },
    {
      value: "partnership",
      label: "🤝 Partnership Opportunities",
      icon: <Briefcase className="w-4 h-4" />,
      description: "Business partnerships and collaborations",
    },
    {
      value: "support",
      label: "❓ Technical Support",
      icon: <HelpCircle className="w-4 h-4" />,
      description: "Website or technical issues",
    },
    {
      value: "feedback",
      label: "💭 Feedback & Suggestions",
      icon: <Heart className="w-4 h-4" />,
      description: "Share your thoughts and ideas",
    },
    {
      value: "media",
      label: "📰 Media & Press",
      icon: <Newspaper className="w-4 h-4" />,
      description: "Press inquiries and media relations",
    },
    {
      value: "resources",
      label: "📚 Resources & Education",
      icon: <BookOpen className="w-4 h-4" />,
      description: "Educational materials and resources",
    },
    {
      value: "custom",
      label: "✏️ Other (Specify)",
      icon: <Mail className="w-4 h-4" />,
      description: "Custom subject matter",
    },
  ];

  const priorityLevels = [
    {
      value: "low",
      label: "Low Priority",
      color: "text-green-600 bg-green-50 border-green-200",
    },
    {
      value: "medium",
      label: "Medium Priority",
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      value: "high",
      label: "High Priority",
      color: "text-orange-600 bg-orange-50 border-orange-200",
    },
    {
      value: "urgent",
      label: "Urgent",
      color: "text-red-600 bg-red-50 border-red-200",
    },
  ];

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      contact: "contact@conces.org",
      time: "Response within 24 hours",
      description: "Best for detailed inquiries",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      contact: "+234 (0) 123-456-789",
      time: "Mon-Fri, 9AM-5PM WAT",
      description: "Direct support line",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      contact: "+234 (0) 123-456-789",
      time: "24/7 Available",
      description: "Quick responses",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (submitStatus === "error") {
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
      customSubject: value === "custom" ? prev.customSubject : "",
    }));
  };

  const generateEmailSubject = () => {
    const selectedOption = subjectOptions.find(
      (opt) => opt.value === formData.subject
    );
    if (formData.subject === "custom" && formData.customSubject) {
      return formData.customSubject;
    }
    return selectedOption
      ? selectedOption.label.replace(/^[^\s]+ /, "")
      : "General Inquiry";
  };

  const generateEmailBody = () => {
    const subject = generateEmailSubject();
    const priority =
      priorityLevels.find((p) => p.value === formData.priority)?.label ||
      "Medium Priority";

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #1a3a8f;">
          <h2 style="color: #1a3a8f; margin: 0;">New Contact Form Submission</h2>
          <p style="color: #6b7280; margin: 5px 0 0 0;">CONCES Website</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #374151; margin-bottom: 15px;">Contact Information</h3>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${
              formData.name
            }</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${
              formData.email
            }</p>
            ${
              formData.phone
                ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${formData.phone}</p>`
                : ""
            }
            ${
              formData.chapter
                ? `<p style="margin: 5px 0;"><strong>Chapter:</strong> ${formData.chapter}</p>`
                : ""
            }
            <p style="margin: 5px 0;"><strong>Preferred Contact:</strong> ${
              formData.contactMethod
            }</p>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #374151; margin-bottom: 15px;">Inquiry Details</h3>
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; border-left: 4px solid #4a89dc;">
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 5px 0;"><strong>Priority:</strong> <span style="padding: 2px 8px; border-radius: 12px; background-color: #e0f2fe; color: #0369a1; font-size: 12px;">${priority}</span></p>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #374151; margin-bottom: 15px;">Message</h3>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 6px; line-height: 1.6;">
            ${formData.message.replace(/\n/g, "<br>")}
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            This message was sent from the CONCES contact form<br>
            Submitted on ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill in all required fields");
      }

      if (!formData.subject) {
        throw new Error("Please select a subject");
      }

      if (formData.subject === "custom" && !formData.customSubject) {
        throw new Error("Please specify your custom subject");
      }

      // Send email via API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@conces.org",
          subject: `CONCES Contact Form: ${generateEmailSubject()}`,
          content: {
            type: "html",
            body: generateEmailBody(),
          },
          from: formData.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      setSubmitStatus("success");

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          chapter: "",
          subject: "",
          customSubject: "",
          message: "",
          priority: "medium",
          contactMethod: "email",
        });
        setSubmitStatus("idle");
      }, 3000);
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-royal-600 to-royal-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions about CONCES? We're here to help you connect, grow,
            and make an impact in your community.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  We'd love to hear from you. Fill out the form below and we'll
                  get back to you as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Phone and Chapter */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chapter (if applicable)
                    </label>
                    <input
                      type="text"
                      name="chapter"
                      value={formData.chapter}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Enter your chapter name"
                    />
                  </div>
                </div>

                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {subjectOptions.map((option) => (
                      <div key={option.value}>
                        <input
                          type="radio"
                          id={option.value}
                          name="subject"
                          value={option.value}
                          checked={formData.subject === option.value}
                          onChange={(e) => handleSubjectChange(e.target.value)}
                          className="hidden peer"
                        />
                        <label
                          htmlFor={option.value}
                          className="flex items-start p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="group-hover:text-primary peer-checked:text-primary">
                              {option.icon}
                            </div>
                            <div>
                              <span className="font-medium text-sm">
                                {option.label}
                              </span>
                              <p className="text-xs text-gray-500 mt-1">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Custom Subject Input */}
                  {formData.subject === "custom" && (
                    <div className="mt-4">
                      <input
                        type="text"
                        name="customSubject"
                        value={formData.customSubject}
                        onChange={handleInputChange}
                        placeholder="Please specify your subject"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  )}
                </div>

                {/* Priority and Contact Method */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    >
                      {priorityLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    >
                      <option value="email">📧 Email</option>
                      <option value="phone">📞 Phone Call</option>
                      <option value="whatsapp">💬 WhatsApp</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Be as detailed as possible</span>
                    <span>{formData.message.length}/2000</span>
                  </div>
                </div>

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitStatus === "success"}
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2
                    ${
                      submitStatus === "success"
                        ? "bg-green-500 text-white"
                        : isSubmitting
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-primary-dark text-white hover:bg-primary hover:shadow-lg hover:-translate-y-1"
                    }`}
                >
                  {submitStatus === "success" ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Other Ways to Reach Us
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-100 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-primary group-hover:text-primary-dark transition-colors mt-1">
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {method.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">
                          {method.description}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {method.contact}
                        </p>
                        <p className="text-xs text-gray-500">{method.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Information */}
            <div className="bg-gradient-to-tr from-30% from-royal-700 to-gold-500 text-white rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4">CONCES Headquarters</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1" />
                  <div>
                    <p className="font-medium">123 University Road</p>
                    <p className="text-sm opacity-90">Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 mt-1" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm opacity-90">
                      Mon-Fri: 9:00 AM - 5:00 PM WAT
                    </p>
                    <p className="text-sm opacity-90">Sat-Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Help
              </h3>
              <div className="space-y-2">
                {[
                  "How to join CONCES?",
                  "Chapter locations",
                  "Membership benefits",
                  "Event calendar",
                  "Alumni network",
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-sm text-primary hover:text-primary-dark hover:underline transition-colors"
                  >
                    • {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary-dark to-primary text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join CONCES?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Don't wait to be part of something bigger. Connect with like-minded
            individuals and make a difference in your community.
          </p>
          <button className="bg-white text-primary-dark px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Become a Member
          </button>
        </div>
      </section>
    </div>
  );
};

// Missing Calendar icon - let's add it
const Calendar = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export default ContactPage;
