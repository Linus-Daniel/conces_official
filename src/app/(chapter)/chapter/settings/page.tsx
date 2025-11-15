"use client";

import React, { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  User,
  Mail,
  Phone,
  MapPin,
  School,
  Camera,
  Lock,
  Save,
  Check,
  X,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Shield,
  RefreshCw,
  Bell,
  Building,
} from "lucide-react";
import api from "@/lib/axiosInstance";

interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  role: "student" | "alumni" | "chapter-admin" | "admin";
  avatar?: string;
  location?: string;
  verified: boolean;
  chapter?: {
    _id: string;
    chapterName: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Custom hook for fetching user profile
const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await api.get("/users/profile");
      return response.data.userProfile as UserProfile;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// Avatar upload component
const AvatarUpload = ({
  currentAvatar,
  onAvatarChange,
}: {
  currentAvatar?: string;
  onAvatarChange: (url: string) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "avatars");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onAvatarChange(data.secure_url);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Avatar upload error:", error);
      alert("Failed to upload avatar");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
          {previewUrl || currentAvatar ? (
            <img
              src={previewUrl || currentAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-blue-400" />
          )}
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Camera className="w-4 h-4" />
          )}
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <p className="text-sm text-gray-600">Click camera to upload new photo</p>
    </div>
  );
};

// Password change form
const PasswordChangeForm = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isChanging, setIsChanging] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const validatePasswords = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setMessage({ type: "error", text: "All fields are required" });
      return false;
    }
    if (passwords.new.length < 6) {
      setMessage({
        type: "error",
        text: "New password must be at least 6 characters",
      });
      return false;
    }
    if (passwords.new !== passwords.confirm) {
      setMessage({ type: "error", text: "New passwords don't match" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    setIsChanging(true);
    setMessage(null);

    try {
      await api.put("/user/change-password", {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });

      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.error || "Failed to change password",
      });
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div
          className={`p-3 rounded-lg flex items-center space-x-2 ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPasswords.current ? "text" : "password"}
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
            required
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords({
                ...showPasswords,
                current: !showPasswords.current,
              })
            }
            className="absolute right-3 top-3"
          >
            {showPasswords.current ? (
              <EyeOff className="w-4 h-4 text-gray-400" />
            ) : (
              <Eye className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPasswords.new ? "text" : "password"}
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords({ ...showPasswords, new: !showPasswords.new })
            }
            className="absolute right-3 top-3"
          >
            {showPasswords.new ? (
              <EyeOff className="w-4 h-4 text-gray-400" />
            ) : (
              <Eye className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showPasswords.confirm ? "text" : "password"}
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords({
                ...showPasswords,
                confirm: !showPasswords.confirm,
              })
            }
            className="absolute right-3 top-3"
          >
            {showPasswords.confirm ? (
              <EyeOff className="w-4 h-4 text-gray-400" />
            ) : (
              <Eye className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isChanging}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
      >
        {isChanging ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Changing Password...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </>
        )}
      </button>
    </form>
  );
};

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState("profile");

  const { data: userProfile, isLoading, error, refetch } = useUserProfile();

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    location: "",
    avatar: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Update form when profile data loads
  React.useEffect(() => {
    if (userProfile) {
      setProfileForm({
        fullName: userProfile.fullName || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        institution: userProfile.institution || "",
        location: userProfile.location || "",
        avatar: userProfile.avatar || "",
      });
    }
  }, [userProfile]);

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: async (data: typeof profileForm) => {
      const response = await api.put(`/users/${userProfile?._id}`, data);
      return response.data.user;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userProfile"], data);
      updateSession();
      setSaveMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setSaveMessage(null), 5000);
    },
    onError: (error: any) => {
      setSaveMessage({
        type: "error",
        text: error.response?.data?.error || "Failed to update profile",
      });
      setTimeout(() => setSaveMessage(null), 5000);
    },
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    profileMutation.mutate(profileForm);
  };

  const handleAvatarChange = (url: string) => {
    setProfileForm({ ...profileForm, avatar: url });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="text-lg font-medium text-red-900">
              Error loading profile
            </h3>
            <p className="text-red-700">
              Failed to load your profile. Please try again.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Chapter Admin Settings</h1>
            <p className="text-gray-600">Manage your chapter admin profile and preferences</p>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200">
              <nav className="py-4">
                <button
                  onClick={() => setActiveSection("profile")}
                  className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
                    activeSection === "profile"
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveSection("password")}
                  className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
                    activeSection === "password"
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Lock className="w-4 h-4 mr-3" />
                  Password
                </button>
                <button
                  onClick={() => setActiveSection("notifications")}
                  className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
                    activeSection === "notifications"
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Bell className="w-4 h-4 mr-3" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveSection("chapter")}
                  className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
                    activeSection === "chapter"
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Building className="w-4 h-4 mr-3" />
                  Chapter Settings
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {/* Profile Section */}
              {activeSection === "profile" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      {saveMessage && (
                        <div
                          className={`p-4 rounded-lg flex items-center space-x-3 ${
                            saveMessage.type === "success"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {saveMessage.type === "success" ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <AlertCircle className="w-5 h-5" />
                          )}
                          <span>{saveMessage.text}</span>
                        </div>
                      )}

                      <div className="space-y-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Chapter Admin Profile
                        </h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={profileForm.fullName}
                              onChange={(e) =>
                                setProfileForm({
                                  ...profileForm,
                                  fullName: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={profileForm.email}
                              onChange={(e) =>
                                setProfileForm({ ...profileForm, email: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              value={profileForm.phone}
                              onChange={(e) =>
                                setProfileForm({ ...profileForm, phone: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Institution
                            </label>
                            <input
                              type="text"
                              value={profileForm.institution}
                              onChange={(e) =>
                                setProfileForm({
                                  ...profileForm,
                                  institution: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              value={profileForm.location}
                              onChange={(e) =>
                                setProfileForm({
                                  ...profileForm,
                                  location: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="City, Country"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-6">
                          <button
                            type="submit"
                            disabled={profileMutation.isPending}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center"
                          >
                            {profileMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Avatar and Account Info */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium text-gray-900 mb-4">Profile Photo</h3>
                      <AvatarUpload
                        currentAvatar={profileForm.avatar}
                        onAvatarChange={handleAvatarChange}
                      />
                    </div>

                    {/* Account Info */}
                    <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                      <h3 className="font-medium text-gray-900">Account Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Role:</span>
                          <span className="text-gray-900 capitalize">
                            {userProfile?.role}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              userProfile?.verified
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {userProfile?.verified ? "Verified" : "Pending"}
                          </span>
                        </div>
                        {userProfile?.chapter && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Chapter:</span>
                            <span className="text-gray-900">
                              {userProfile.chapter.chapterName}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Admin since:</span>
                          <span className="text-gray-900">
                            {new Date(userProfile?.createdAt || "").toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Password Section */}
              {activeSection === "password" && (
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
                    <PasswordChangeForm />
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-600">
                          Receive important chapter updates via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Chapter Member Requests</h4>
                        <p className="text-sm text-gray-600">
                          Get notified when new members request to join
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Event Notifications</h4>
                        <p className="text-sm text-gray-600">
                          Receive updates about chapter events and activities
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Chapter Settings Section */}
              {activeSection === "chapter" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Chapter Management Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Auto-approve Members</h4>
                        <p className="text-sm text-gray-600">
                          Automatically approve new member applications
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Public Chapter Profile</h4>
                        <p className="text-sm text-gray-600">
                          Make chapter information visible to public
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Event Creation</h4>
                        <p className="text-sm text-gray-600">
                          Allow chapter members to create events
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}