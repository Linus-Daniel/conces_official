"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "@/lib/axiosInstance";

interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  institution?: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  role: string;
  chapter?: {
    _id: string;
    chapterName: string;
  };
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    institution: "",
    bio: "",
    skills: "",
  });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Fetch user profile
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await api.get("/users/profile");
      return response.data.userProfile as UserProfile;
    },
  });

  useEffect(() => {
    if (userProfile) {
      setProfileForm({
        fullName: userProfile.fullName || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        location: userProfile.location || "",
        institution: userProfile.institution || "",
        bio: userProfile.bio || "",
        skills: userProfile.skills?.join(", ") || "",
      });
    }
  }, [userProfile]);

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: async (data: typeof profileForm) => {
      const response = await api.put(`/users/${user?.id}`, {
        ...data,
        skills: data.skills.split(",").map(s => s.trim()).filter(s => s),
      });
      return response.data.userProfile;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userProfile"], data);
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  // Avatar upload mutation
  const avatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "avatars");

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadData = await uploadResponse.json();
      
      const response = await api.put(`/users/${user?.id}`, {
        avatar: uploadData.url,
      });
      return response.data.userProfile;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userProfile"], data);
      toast.success("Avatar updated successfully!");
      setUploadingAvatar(false);
    },
    onError: () => {
      toast.error("Failed to upload avatar");
      setUploadingAvatar(false);
    },
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploadingAvatar(true);
    avatarMutation.mutate(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    profileMutation.mutate(profileForm);
  };

  // Calculate profile completion
  const calculateProfileCompletion = () => {
    if (!userProfile) return 0;
    const fields = [
      userProfile.fullName,
      userProfile.email,
      userProfile.phone,
      userProfile.institution,
      userProfile.bio,
      userProfile.avatar,
      userProfile.skills?.length,
    ];
    const filledFields = fields.filter(field => field && field !== "").length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-conces-blue"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={userProfile?.avatar || "/default-avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-gray-200"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute bottom-2 right-2 bg-conces-blue text-white p-2 rounded-full hover:bg-conces-blue-dark disabled:opacity-50"
              >
                {uploadingAvatar ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            
            <h2 className="text-xl font-bold">{userProfile?.fullName}</h2>
            <p className="text-conces-blue capitalize">{userProfile?.role} Member</p>
            <p className="text-gray-600 text-sm mt-1">{userProfile?.institution}</p>

            <div className="mt-4 w-full">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-medium">{profileCompletion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-conces-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p className="text-sm text-gray-600 mb-1">{userProfile?.email}</p>
            {userProfile?.phone && (
              <p className="text-sm text-gray-600">{userProfile.phone}</p>
            )}
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Chapter</h3>
            <p className="text-sm text-gray-600">
              {userProfile?.chapter?.chapterName || "No chapter assigned"}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Member Since</h3>
            <p className="text-sm text-gray-600">
              {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : "Unknown"}
            </p>
          </div>

          {userProfile?.skills && userProfile.skills.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-conces-blue bg-opacity-10 text-conces-blue px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Update Your Profile</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                type="text"
                value={profileForm.institution}
                onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
                placeholder="e.g., University of Lagos"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                rows={3}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
                placeholder="Tell us about yourself and your engineering interests..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              <input
                type="text"
                value={profileForm.skills}
                onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
                placeholder="Add your technical skills separated by commas"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple skills with commas (e.g., JavaScript, Python, React)
              </p>
            </div>

            <button
              type="submit"
              disabled={profileMutation.isPending}
              className="bg-conces-blue text-white px-4 py-2 rounded-lg hover:bg-conces-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {profileMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}