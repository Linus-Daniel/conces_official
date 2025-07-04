"use client"
import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaBriefcase, FaCommentDots, FaEnvelope, FaGraduationCap, FaHandshake, FaLinkedin, FaLocationDot, FaTwitter, FaUser, FaUserGraduate, FaXmark } from 'react-icons/fa6';
import { FaHandsHelping } from 'react-icons/fa';


type Props ={
    isOpen: boolean;
    onClose: () => void;
    alumniId: number; // Assuming you pass the alumni ID to fetch their profile
}


export interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  currentRole: string;
  specialization: string;
  location: string;
  avatar: string;
  availableForMentorship: boolean;
  bio: string;
  contact: string;
  linkedin?: string;
  twitter?: string;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  experience: {
    position: string;
    company: string;
    duration: string;
    description: string;
  }[];
  mentorshipDetails: {
    availability: string;
    areas: string[];
    style: string;
    commitment: string;
  };
  testimonials: {
    name: string;
    role: string;
    text: string;
    date: string;
  }[];
}


const AlumniProfileModal = ({ isOpen, onClose, alumniId }:Props) => {
  const [alumni, setAlumni] = useState<Alumni>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample alumni data - in a real app, you'd fetch this based on alumniId
  const alumniList: Alumni[] = 
  [{
    id: 1,
    name: "Dr. Adebayo Ogunlesi",
    graduationYear: 1995,
    currentRole: "Principal Engineer at Chevron",
    specialization: "Petroleum Engineering",
    location: "Houston, TX",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    availableForMentorship: true,
    bio: "15+ years experience in offshore drilling operations. Passionate about mentoring young engineers and helping them navigate the energy sector with Christian values.",
    contact: "a.ogunlesi@example.com",
    linkedin: "https://linkedin.com/in/aogunlesi",
    twitter: "https://twitter.com/aogunlesi",
    education: [
      {
        degree: "PhD Petroleum Engineering",
        institution: "University of Texas at Austin",
        year: 2002
      },
      {
        degree: "MSc Chemical Engineering",
        institution: "University of Lagos",
        year: 1998
      },
      {
        degree: "BSc Chemical Engineering",
        institution: "University of Lagos",
        year: 1995
      }
    ],
    experience: [
      {
        position: "Principal Engineer",
        company: "Chevron Corporation",
        duration: "2015-Present",
        description: "Lead technical teams in offshore drilling operations. Responsible for safety protocols and efficiency improvements."
      },
      {
        position: "Senior Drilling Engineer",
        company: "Shell Nigeria",
        duration: "2008-2015",
        description: "Managed drilling projects in the Niger Delta region. Implemented environmental protection measures."
      }
    ],
    mentorshipDetails: {
      availability: "2 slots available",
      areas: [
        "Career transition to oil & gas",
        "Offshore operations",
        "Engineering leadership",
        "Faith in the workplace"
      ],
      style: "Monthly video calls + email support",
      commitment: "6 month minimum"
    },
    testimonials: [
      {
        name: "Engr. Chika Nwosu",
        role: "Drilling Engineer at ExxonMobil",
        text: "Dr. Ogunlesi's guidance was instrumental in my career development. His spiritual perspective on engineering ethics is truly inspiring.",
        date: "March 2024"
      },
      {
        name: "Engr. Femi Adekunle",
        role: "Graduate Student",
        text: "The mentorship I received helped me secure my first internship and understand how to integrate my faith with technical work.",
        date: "January 2024"
      }
    ]
  },

     {
      id: 1,
      name: "Dr. Adebayo Ogunlesi",
      graduationYear: 1995,
      currentRole: "Principal Engineer at Chevron",
      specialization: "Petroleum Engineering",
      location: "Houston, TX",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      availableForMentorship: true,
      bio: "15+ years experience in offshore drilling operations. Passionate about mentoring young engineers and helping them navigate the energy sector with Christian values.",
      contact: "a.ogunlesi@example.com",
      linkedin: "https://linkedin.com/in/aogunlesi",
      twitter: "https://twitter.com/aogunlesi",
      education: [
        {
          degree: "PhD Petroleum Engineering",
          institution: "University of Texas at Austin",
          year: 2002
        },
        {
          degree: "MSc Chemical Engineering",
          institution: "University of Lagos",
          year: 1998
        },
        {
          degree: "BSc Chemical Engineering",
          institution: "University of Lagos",
          year: 1995
        }
      ],
      experience: [
        {
          position: "Principal Engineer",
          company: "Chevron Corporation",
          duration: "2015-Present",
          description: "Lead technical teams in offshore drilling operations. Responsible for safety protocols and efficiency improvements."
        },
        {
          position: "Senior Drilling Engineer",
          company: "Shell Nigeria",
          duration: "2008-2015",
          description: "Managed drilling projects in the Niger Delta region. Implemented environmental protection measures."
        }
      ],
      mentorshipDetails: {
        availability: "2 slots available",
        areas: [
          "Career transition to oil & gas",
          "Offshore operations",
          "Engineering leadership",
          "Faith in the workplace"
        ],
        style: "Monthly video calls + email support",
        commitment: "6 month minimum"
      },
      testimonials: [
        {
          name: "Engr. Chika Nwosu",
          role: "Drilling Engineer at ExxonMobil",
          text: "Dr. Ogunlesi's guidance was instrumental in my career development. His spiritual perspective on engineering ethics is truly inspiring.",
          date: "March 2024"
        },
        {
          name: "Engr. Femi Adekunle",
          role: "Graduate Student",
          text: "The mentorship I received helped me secure my first internship and understand how to integrate my faith with technical work.",
          date: "January 2024"
        }
      ]
    },
    {
      id: 2,
      name: "Engr. Grace Okonkwo",
      graduationYear: 2010,
      currentRole: "Senior Software Engineer at Microsoft",
      specialization: "Computer Engineering",
      location: "Seattle, WA",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      availableForMentorship: true,
      bio: "Software engineer passionate about AI and cloud computing. Advocates for women in tech and faith-based tech communities.",
      contact: "grace.okonkwo@example.com",
      linkedin: "https://linkedin.com/in/graceokonkwo",
      twitter: "https://twitter.com/enggraceo",
      education: [
        {
          degree: "MSc Computer Science",
          institution: "Stanford University",
          year: 2013
        },
        {
          degree: "BEng Computer Engineering",
          institution: "University of Nigeria, Nsukka",
          year: 2010
        }
      ],
      experience: [
        {
          position: "Senior Software Engineer",
          company: "Microsoft",
          duration: "2016-Present",
          description: "Working on distributed systems and Azure services."
        },
        {
          position: "Software Engineer",
          company: "Andela",
          duration: "2013-2016",
          description: "Built scalable web applications for global clients."
        }
      ],
      mentorshipDetails: {
        availability: "1 slot available",
        areas: [
          "Breaking into tech",
          "Faith and leadership",
          "Building tech communities",
          "Women in STEM"
        ],
        style: "Bi-weekly Zoom calls",
        commitment: "3-6 months"
      },
      testimonials: [
        {
          name: "Adaeze Onuoha",
          role: "Frontend Developer at Paystack",
          text: "Grace’s mentorship helped me get into coding and build confidence as a Christian woman in tech.",
          date: "February 2024"
        }
      ]
    },
    {
      id: 3,
      name: "Engr. Musa Abdullahi",
      graduationYear: 2008,
      currentRole: "Project Manager at Siemens",
      specialization: "Electrical Engineering",
      location: "Berlin, Germany",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      availableForMentorship: false,
      bio: "Project manager with 10+ years experience leading energy projects across Europe and Africa. Enjoys supporting young engineers via speaking engagements.",
      contact: "musa.abdullahi@example.com",
      linkedin: "https://linkedin.com/in/engrmusa",
      twitter: "",
      education: [
        {
          degree: "MEng Electrical Systems",
          institution: "TU Berlin",
          year: 2012
        },
        {
          degree: "BEng Electrical Engineering",
          institution: "Ahmadu Bello University",
          year: 2008
        }
      ],
      experience: [
        {
          position: "Project Manager",
          company: "Siemens AG",
          duration: "2014-Present",
          description: "Lead cross-border electrical infrastructure projects."
        },
        {
          position: "Electrical Engineer",
          company: "PHCN",
          duration: "2008-2012",
          description: "Worked on national grid power distribution in northern Nigeria."
        }
      ],
      mentorshipDetails: {
        availability: "Currently unavailable",
        areas: [],
        style: "",
        commitment: ""
      },
      testimonials: []
    }
  
  





];

  useEffect(() => {
    // Simulate API fetch
    const alumni = alumniList.find(a => a.id === alumniId);
    if (isOpen) {
      setIsLoading(true);
      setTimeout(() => {
        setAlumni(alumni);
        setIsLoading(false);
      }, 500);
    }
  }, [isOpen, alumniId]);

  isOpen && console.log(`Alumni Profile Modal opened for ID: ${alumniId}`);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {isLoading ? (
                  <div className="p-8 flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-royal-600"></div>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <div className="absolute top-4 right-4">
                        <button
                          type="button"
                          className="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close</span>
                          <FaXmark className="fa-solid fa-xmark h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                      {/* Header Section */}
                      <div className="px-6 py-5 sm:px-8 sm:py-7">
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="flex-shrink-0">
                            <img
                              className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
                              src={alumni?.avatar}
                              alt={alumni?.name}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <Dialog.Title
                                  as="h3"
                                  className="text-xl font-bold leading-6 text-gray-900 sm:text-2xl"
                                >
                                  {alumni?.name}
                                </Dialog.Title>
                                <p className="text-sm text-gray-600 mt-1">
                                  {alumni?.currentRole}
                                </p>
                              </div>
                              <div className="flex space-x-3">
                                {alumni?.linkedin && (
                                  <a
                                    href={alumni?.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-600"
                                  >
                                    <FaLinkedin className="fa-brands fa-linkedin-in text-lg" />
                                  </a>
                                )}
                                {alumni?.twitter && (
                                  <a
                                    href={alumni?.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-400"
                                  >
                                    <FaTwitter className="fa-brands fa-twitter text-lg" />
                                  </a>
                                )}
                                <a
                                  href={`mailto:${alumni?.contact}`}
                                  className="text-gray-400 hover:text-royal-600"
                                >
                                  <FaEnvelope className="fa-solid fa-envelope text-lg" />
                                </a>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-royal-100 text-royal-800">
                                <FaGraduationCap className="fa-solid fa-graduation-cap mr-1" />
                                Class of {alumni?.graduationYear}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <FaBriefcase className="fa-solid fa-briefcase mr-1" />
                                {alumni?.specialization}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <FaLocationDot  className="fa-solid fa-location-dot mr-1" />
                                {alumni?.location}
                              </span>
                              {alumni?.availableForMentorship && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  <FaHandsHelping className="fa-solid fa-hands-helping mr-1" />
                                  Available for Mentorship
                                </span>
                              )}
                            </div>

                            <p className="mt-4 text-sm text-gray-600">
                              {alumni?.bio}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tab Navigation */}
                      <div className="px-6 sm:px-8">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto">
                          <button
                            onClick={() => setActiveTab('overview')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                              activeTab === 'overview'
                                ? 'border-royal-500 text-royal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            Overview
                          </button>
                          <button
                            onClick={() => setActiveTab('experience')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                              activeTab === 'experience'
                                ? 'border-royal-500 text-royal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            Experience
                          </button>
                          <button
                            onClick={() => setActiveTab('education')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                              activeTab === 'education'
                                ? 'border-royal-500 text-royal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            Education
                          </button>
                          {alumni?.availableForMentorship && (
                            <button
                              onClick={() => setActiveTab('mentorship')}
                              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'mentorship'
                                  ? 'border-royal-500 text-royal-600'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                              }`}
                            >
                              Mentorship
                            </button>
                          )}
                          <button
                            onClick={() => setActiveTab('testimonials')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                              activeTab === 'testimonials'
                                ? 'border-royal-500 text-royal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            Testimonials
                          </button>
                        </nav>
                      </div>

                      {/* Tab Content */}
                      <div className="px-6 py-5 sm:px-8 sm:py-7">
                        {activeTab === 'overview' && (
                          <div className="prose prose-sm max-w-none">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h3>
                            <p className="text-gray-600">
                              {alumni?.bio}
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Key Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Offshore Drilling
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Project Management
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Safety Compliance
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Team Leadership
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Technical Training
                              </span>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Contact Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex items-start">
                                <div className="flex-shrink-0 pt-1">
                                  <FaEnvelope className="fa-solid fa-envelope text-royal-600" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">Email</p>
                                  <a
                                    href={`mailto:${alumni?.contact}`}
                                    className="text-sm text-royal-600 hover:text-royal-800 break-all"
                                  >
                                    {alumni?.contact}
                                  </a>
                                </div>
                              </div>
                              {alumni?.linkedin && (
                                <div className="flex items-start">
                                  <div className="flex-shrink-0 pt-1">
                                    <FaLinkedin className="fa-brands fa-linkedin-in text-royal-600" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                                    <a
                                      href={alumni?.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-royal-600 hover:text-royal-800 break-all"
                                    >
                                      {alumni?.linkedin.replace('https://', '')}
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {activeTab === 'experience' && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Experience</h3>
                            {alumni?.experience.map((exp, index) => (
                              <div key={index} className="border-l-4 border-royal-200 pl-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                  <h4 className="text-base font-medium text-gray-900">{exp.position}</h4>
                                  <p className="text-sm text-gray-500">{exp.duration}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-700">{exp.company}</p>
                                <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeTab === 'education' && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Education Background</h3>
                            {alumni?.education.map((edu, index) => (
                              <div key={index} className="border-l-4 border-royal-200 pl-4">
                                <h4 className="text-base font-medium text-gray-900">{edu.degree}</h4>
                                <p className="text-sm font-medium text-gray-700">{edu.institution}</p>
                                <p className="text-sm text-gray-500">Graduated {edu.year}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeTab === 'mentorship' && alumni?.availableForMentorship && (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mentorship Availability</h3>
                              <p className="text-sm text-gray-600">
                                {alumni?.mentorshipDetails.availability}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">Areas of Mentorship</h3>
                              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                                {alumni?.mentorshipDetails.areas.map((area, index) => (
                                  <li key={index}>{area}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mentorship Style</h3>
                              <p className="text-sm text-gray-600">
                                {alumni?.mentorshipDetails.style}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">Commitment</h3>
                              <p className="text-sm text-gray-600">
                                {alumni?.mentorshipDetails.commitment}
                              </p>
                            </div>

                            <div className="pt-4">
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gold-500 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
                              >
                                <FaHandshake className="fa-solid fa-handshake mr-2" />
                                Request Mentorship
                              </button>
                            </div>
                          </div>
                        )}

                        {activeTab === 'testimonials' && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Testimonials</h3>
                            {Array.isArray(alumni?.testimonials) && alumni.testimonials.length> 0 ? (
                              alumni?.testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm italic text-gray-600 mb-3">"{testimonial.text}"</p>
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <FaUser className="fa-solid fa-user text-gray-400" />
                                      </div>
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                                      <p className="text-xs text-gray-500">{testimonial.role} • {testimonial.date}</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8">
                                <FaCommentDots className="fa-solid fa-comment-dots text-4xl text-gray-300 mb-3" />
                                <p className="text-sm text-gray-500">No testimonials available yet</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="px-6 py-4 sm:px-8 bg-gray-50 flex justify-between">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
                          onClick={onClose}
                        >
                          Close
                        </button>
                        <div className="space-x-3">
                          <a
                            href={`mailto:${alumni?.contact}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
                          >
                            <FaEnvelope className="fa-solid fa-envelope mr-2" />
                            Contact
                          </a>
                          {alumni?.availableForMentorship && (
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gold-500 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
                            >
                              <FaUserGraduate className="fa-solid fa-user-graduate mr-2" />
                              Request Mentorship
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AlumniProfileModal;