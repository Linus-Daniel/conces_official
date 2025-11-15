"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import api from "@/lib/axiosInstance";

interface AlumniProfile {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    avatar?: string;
  };
  graduationYear: number;
  specialization: string;
  currentRole: string;
  bio?: string;
  skills?: string[];
  education?: Array<{
    schoolName: string;
    course: string;
    startDate: string;
    endDate: string;
  }>;
  workExperience?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description?: string;
  }>;
  availableForMentorship: boolean;
  isMentor: boolean;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

interface MentorshipProgram {
  _id: string;
  title: string;
  description: string;
  category: string;
  topics: string[];
  mentorshipStyle: string;
  duration: string;
  timeCommitment: string;
  maxParticipants: number;
  currentParticipants: number;
  mentorId: {
    _id: string;
    userId: {
      fullName: string;
      avatar?: string;
    };
  };
  applicationDeadline?: string;
}

interface Connection {
  _id: string;
  alumniId: string;
  connectedUserId: string;
  status: "pending" | "connected" | "declined";
  createdAt: string;
}

const AlumniCard = ({ 
  alumni, 
  onConnect, 
  isConnecting 
}: { 
  alumni: AlumniProfile; 
  onConnect: (id: string) => void;
  isConnecting: boolean;
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center mb-4">
      <img
        src={alumni.userId.avatar || "/default-avatar.png"}
        alt={alumni.userId.fullName}
        className="w-12 h-12 rounded-full mr-3 object-cover"
      />
      <div>
        <h3 className="font-bold">{alumni.userId.fullName}</h3>
        <p className="text-sm text-gray-600">{alumni.currentRole}</p>
      </div>
    </div>
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-1">
        {alumni.education?.[0]?.schoolName || "Institution not specified"} ({alumni.graduationYear})
      </p>
      <p className="text-sm text-gray-600">{alumni.specialization}</p>
    </div>
    {alumni.skills && alumni.skills.length > 0 && (
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-500 mb-2">SKILLS</h4>
        <div className="flex flex-wrap gap-2">
          {alumni.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full"
            >
              {skill}
            </span>
          ))}
          {alumni.skills.length > 4 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
              +{alumni.skills.length - 4} more
            </span>
          )}
        </div>
      </div>
    )}
    <button
      onClick={() => onConnect(alumni._id)}
      disabled={isConnecting}
      className="w-full bg-conces-blue text-white py-2 rounded-lg hover:bg-conces-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting ? "Connecting..." : "Connect"}
    </button>
  </div>
);

const MentorshipOpportunity = ({ 
  program 
}: { 
  program: MentorshipProgram 
}) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="font-semibold mb-2">{program.title}</h4>
    <p className="text-sm text-gray-600 mb-2">{program.description}</p>
    <p className="text-sm text-gray-500 mb-2">
      by {program.mentorId.userId.fullName}
    </p>
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-500">
        {program.currentParticipants}/{program.maxParticipants} participants
      </span>
      <button className="text-xs bg-conces-blue text-white px-3 py-1 rounded hover:bg-conces-blue-dark">
        Learn More
      </button>
    </div>
  </div>
);

export default function NetworkPage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [connectingId, setConnectingId] = useState<string | null>(null);

  // Fetch alumni profiles
  const { data: alumni = [], isLoading: alumniLoading } = useQuery({
    queryKey: ["alumni"],
    queryFn: async () => {
      const response = await api.get("/alumni");
      return response.data.alumni as AlumniProfile[];
    },
  });

  // Fetch mentorship programs
  const { data: mentorshipPrograms = [], isLoading: programsLoading } = useQuery({
    queryKey: ["mentorship-programs"],
    queryFn: async () => {
      const response = await api.get("/mentorship-programs");
      return response.data.programs as MentorshipProgram[];
    },
  });

  // Connect mutation
  const connectMutation = useMutation({
    mutationFn: async (alumniId: string) => {
      const response = await api.post("/alumni/connect", { alumniId });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Connection request sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["alumni"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to send connection request");
    },
    onSettled: () => {
      setConnectingId(null);
    },
  });

  const handleConnect = (alumniId: string) => {
    setConnectingId(alumniId);
    connectMutation.mutate(alumniId);
  };

  // Filter alumni
  const filteredAlumni = useMemo(() => {
    return alumni.filter(alum => {
      const matchesSearch = !searchTerm || 
        alum.userId.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.education?.some(edu => edu.schoolName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSpecialization = !selectedSpecialization || 
        alum.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase());

      return matchesSearch && matchesSpecialization;
    });
  }, [alumni, searchTerm, selectedSpecialization]);

  // Get unique specializations for filter
  const specializations = useMemo(() => {
    return Array.from(new Set(alumni.map(alum => alum.specialization))).filter(Boolean);
  }, [alumni]);

  // Get available mentorship programs
  const availablePrograms = mentorshipPrograms.filter(program => 
    program.currentParticipants < program.maxParticipants
  ).slice(0, 4);

  if (alumniLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-conces-blue"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-conces-blue">Alumni Network</h2>
        <p className="text-gray-600">
          Connect with CONCES alumni from various institutions and industries
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Find Alumni</h3>
            <p className="text-sm text-gray-600">
              Search by name, institution, or industry
            </p>
          </div>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search alumni..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select 
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
            >
              <option value="">All Specializations</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredAlumni.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FaSearch className="mx-auto text-4xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for new alumni profiles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alum) => (
              <AlumniCard
                key={alum._id}
                alumni={alum}
                onConnect={handleConnect}
                isConnecting={connectingId === alum._id}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Mentorship Opportunities</h3>
        <p className="text-gray-600 mb-4">
          Connect with experienced alumni who can guide you in your career journey
        </p>

        {programsLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-conces-blue"></div>
          </div>
        ) : availablePrograms.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No mentorship opportunities available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availablePrograms.map((program) => (
              <MentorshipOpportunity key={program._id} program={program} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}