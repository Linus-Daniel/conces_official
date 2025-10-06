"use client";

import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
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

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      onAvatarChange(result.secure_url);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
          {uploading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <Loader2 className="w-8 h-8 animate-spin text-royal-DEFAULT" />
            </div>
          ) : (
            <img
              src={previewUrl || currentAvatar || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="absolute bottom-2 right-2 p-2 bg-royal-DEFAULT text-white rounded-full hover:bg-royal-600 transition-colors shadow-lg disabled:opacity-50"
        >
          <Camera className="w-4 h-4" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <p className="text-sm text-gray-500 mt-2 text-center">
        Click camera icon to upload new photo
        <br />
        <span className="text-xs">Max size: 5MB</span>
      </p>
    </div>
  );
};

const UserSettingsPage = () => {
  const { data: session, update: updateSession } = useSession();
  const queryClient = useQueryClient();
  const  user = session?.user

  // Fetch user profile
  const {
    data: userProfile,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserProfile();

  console.log(userProfile)
  // Form states
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    location: "",
    avatar: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  // Update form when user data loads
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
      const response = await api.put(`/users/${user?.id}`, data);
      return response.data.userProfile;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userProfile"], data);
      updateSession(); // Update NextAuth session
      alert("Profile updated successfully!");
    },
    onError: (error: any) => {
      console.error("Profile update error:", error);
      alert(error.response?.data?.message || "Failed to update profile");
    },
  });

  // Password change mutation
  const passwordMutation = useMutation({
    mutationFn: async (data: typeof passwordForm) => {
      const response = await api.put("/user/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      return response.data;
    },
    onSuccess: () => {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Password changed successfully!");
    },
    onError: (error: any) => {
      console.error("Password change error:", error);
      alert(error.response?.data?.message || "Failed to change password");
    },
  });

  // Verification email mutation
  const verificationMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/user/resend-verification");
      return response.data;
    },
    onSuccess: () => {
      alert("Verification email sent successfully!");
    },
    onError: (error: any) => {
      console.error("Verification error:", error);
      alert(
        error.response?.data?.message || "Failed to send verification email"
      );
    },
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    profileMutation.mutate(profileForm);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    passwordMutation.mutate(passwordForm);
  };

  const handleAvatarChange = (url: string) => {
    setProfileForm((prev) => ({ ...prev, avatar: url }));
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "chapter-admin":
        return "bg-purple-100 text-purple-800";
      case "alumni":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-royal-DEFAULT mx-auto mb-4" />
          <p className="text-gray-600">Loading your settings...</p>
        </div>
      </div>
    );
  }

  if (isError || !userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to Load Settings
          </h2>
          <p className="text-gray-600 mb-6">
            {error?.message || "Unable to load your profile settings"}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-royal-DEFAULT text-white px-6 py-3 rounded-lg hover:bg-royal-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your profile information and account security
          </p>
        </div>

        {/* Verification Status Alert */}
        {!userProfile.verified && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-yellow-800 font-medium">
                  Email Not Verified
                </h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Please verify your email address to access all features.
                </p>
                <button
                  onClick={() => verificationMutation.mutate()}
                  disabled={verificationMutation.isPending}
                  className="mt-3 text-sm bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {verificationMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  Resend Verification Email
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <AvatarUpload
                  currentAvatar={profileForm.avatar}
                  onAvatarChange={handleAvatarChange}
                />
                <h3 className="text-lg font-semibold text-gray-900 mt-4">
                  {userProfile.fullName}
                </h3>
                <p className="text-gray-600">{userProfile.email}</p>

                {/* Role and Status Badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                 
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      userProfile.verified
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {userProfile.verified ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <X className="w-3 h-3" />
                        Unverified
                      </span>
                    )}
                  </span>
                </div>

                {/* Chapter Info */}
                {userProfile.chapter && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Chapter</p>
                    <p className="font-medium text-gray-900">
                      {userProfile.chapter.chapterName}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "profile"
                      ? "bg-royal-100 text-royal-700 border border-royal-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile Information
                </button>

                <button
                  onClick={() => setActiveTab("password")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === "password"
                      ? "bg-royal-100 text-royal-700 border border-royal-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  Password & Security
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Profile Information
                    </h2>
                    <button
                      onClick={() => refetch()}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={profileForm.fullName}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                fullName: e.target.value,
                              })
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            required
                            value={profileForm.email}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                email: e.target.value,
                              })
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                phone: e.target.value,
                              })
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>

                      {/* Institution */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution
                        </label>
                        <div className="relative">
                          <School className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={profileForm.institution}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                institution: e.target.value,
                              })
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                            placeholder="Enter your institution"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileForm.location}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              location: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                          placeholder="Enter your location"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={profileMutation.isPending}
                        className="flex items-center gap-2 bg-royal-DEFAULT text-white px-6 py-3 rounded-lg hover:bg-royal-600 transition-colors disabled:opacity-50"
                      >
                        {profileMutation.isPending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Save className="w-5 h-5" />
                        )}
                        {profileMutation.isPending
                          ? "Saving..."
                          : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Change Password
                  </h2>

                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          required
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                          placeholder="Enter your current password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords({
                              ...showPasswords,
                              current: !showPasswords.current,
                            })
                          }
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          required
                          minLength={6}
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                          placeholder="Enter your new password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords({
                              ...showPasswords,
                              new: !showPasswords.new,
                            })
                          }
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.new ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Password must be at least 6 characters long
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          required
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                          placeholder="Confirm your new password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords({
                              ...showPasswords,
                              confirm: !showPasswords.confirm,
                            })
                          }
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={passwordMutation.isPending}
                        className="flex items-center gap-2 bg-royal-DEFAULT text-white px-6 py-3 rounded-lg hover:bg-royal-600 transition-colors disabled:opacity-50"
                      >
                        {passwordMutation.isPending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Shield className="w-5 h-5" />
                        )}
                        {passwordMutation.isPending
                          ? "Updating..."
                          : "Update Password"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
