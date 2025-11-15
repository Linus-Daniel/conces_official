// app/admin/alumni/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiLinkedin,
  
  FiGithub,
  FiGlobe,
  FiMail,
  FiUser,

} from "react-icons/fi";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

interface Alumni {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
  };
  graduationYear: number;
  education: {
    schoolName: string;
    course: string;
    graduationYear: string;
  }[];
  workExperience: {
    title: string;
    organization: string;
    duration: string;
    description: string;
  }[];
  specialization: string;
  currentRole: string;
  bio?: string;
  avatar: string;
  availableForMentorship: boolean;
  isMentor: boolean;
  skills: string[];
  socialLinks: {
    linkedIn?: string;
    twitter?: string;
    github?: string;
    website: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AlumniProfileView() {
  const params = useParams();
  const router = useRouter();
  const [alumni, setAlumni] = useState<Alumni | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/alumni/${params.id}`);
        const data = await response.json();

        if (response.ok) {
          setAlumni(data.alumni);
        } else {
          setError(data.error || "Failed to fetch alumni profile");
        }
      } catch (err) {
        setError("Failed to fetch alumni profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAlumni();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !alumni) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 mb-4">{error || "Alumni not found"}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <FiArrowLeft className="mr-2" /> Back to Alumni
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Alumni Profile
              </h1>
              <p className="text-gray-600 mt-1">
                View alumni details and information
              </p>
            </div>
            <Link
              href={`/admin/alumni/${alumni._id}/edit`}
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <FiUser className="mr-2" /> Edit Profile
            </Link>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  className="h-32 w-32 rounded-full object-cover mx-auto md:mx-0"
                  src={alumni.avatar || "/default-avatar.png"}
                  alt={alumni.userId.fullName}
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {alumni.userId.fullName}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {alumni.currentRole}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {alumni.isMentor && (
                      <span className="inline-flex px-3 py-1 text-sm font-semibold leading-5 rounded-full bg-purple-100 text-purple-800">
                        Mentor
                      </span>
                    )}
                    {alumni.availableForMentorship && (
                      <span className="inline-flex px-3 py-1 text-sm font-semibold leading-5 rounded-full bg-green-100 text-green-800">
                        Available for Mentorship
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-4">
                  {alumni.bio || "No bio provided."}
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href={`mailto:${alumni.userId.email}`}
                    className="inline-flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <FiMail className="mr-1" /> {alumni.userId.email}
                  </a>

                  {alumni.socialLinks.linkedIn && (
                    <a
                      href={alumni.socialLinks.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <FiLinkedin className="mr-1" /> LinkedIn
                    </a>
                  )}

                  {alumni.socialLinks.twitter && (
                    <a
                      href={alumni.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-600 hover:text-blue-400"
                    >
                      <FaXTwitter className="mr-1" /> Twitter
                    </a>
                  )}

                  {alumni.socialLinks.github && (
                    <a
                      href={alumni.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <FiGithub className="mr-1" /> GitHub
                    </a>
                  )}

                  {alumni.socialLinks.website && (
                    <a
                      href={alumni.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <FiGlobe className="mr-1" /> Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Education
            </h3>
            <div className="space-y-4">
              {alumni.education.length > 0 ? (
                alumni.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 pl-4 py-1"
                  >
                    <h4 className="font-medium text-gray-900">{edu.course}</h4>
                    <p className="text-gray-600">{edu.schoolName}</p>
                    <p className="text-sm text-gray-500">
                      Graduated: {edu.graduationYear}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No education information available.
                </p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Skills & Specialization
            </h3>
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Specialization</h4>
              <p className="text-gray-600">
                {alumni.specialization || "Not specified"}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
              {alumni.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {alumni.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No skills listed.</p>
              )}
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Work Experience
          </h3>
          <div className="space-y-6">
            {alumni.workExperience.length > 0 ? (
              alumni.workExperience.map((exp, index) => (
                <div
                  key={index}
                  className="border-l-4 border-amber-500 pl-4 py-1"
                >
                  <h4 className="font-medium text-gray-900">{exp.title}</h4>
                  <p className="text-gray-600">{exp.organization}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No work experience information available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
