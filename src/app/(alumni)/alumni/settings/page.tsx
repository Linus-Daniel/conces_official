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
} from "lucide-react";
import api from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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
        <div className="w-24 h-24 rounded-full bg-royal-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
          {previewUrl || currentAvatar ? (
            <img
              src={previewUrl || currentAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-royal-400" />
          )}
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="absolute -bottom-1 -right-1 bg-gold-600 hover:bg-gold-700 text-white rounded-full p-2 shadow-lg transition-colors disabled:opacity-50"
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
      <p className="text-sm text-royal-600">Click camera to upload new photo</p>
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
        <Label htmlFor="currentPassword" className="text-royal-700">
          Current Password
        </Label>
        <div className="relative">
          <Input
            id="currentPassword"
            type={showPasswords.current ? "text" : "password"}
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="border-royal-300 pr-10"
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
              <EyeOff className="w-4 h-4 text-royal-400" />
            ) : (
              <Eye className="w-4 h-4 text-royal-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <Label htmlFor="newPassword" className="text-royal-700">
          New Password
        </Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPasswords.new ? "text" : "password"}
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            className="border-royal-300 pr-10"
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
              <EyeOff className="w-4 h-4 text-royal-400" />
            ) : (
              <Eye className="w-4 h-4 text-royal-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="text-royal-700">
          Confirm New Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPasswords.confirm ? "text" : "password"}
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            className="border-royal-300 pr-10"
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
              <EyeOff className="w-4 h-4 text-royal-400" />
            ) : (
              <Eye className="w-4 h-4 text-royal-400" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isChanging}
        className="w-full bg-gold-600 hover:bg-gold-700 text-royal-900"
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
      </Button>
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
          <Loader2 className="w-6 h-6 animate-spin text-gold-600" />
          <span className="text-royal-600">Loading profile...</span>
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
            <Button
              onClick={() => refetch()}
              className="mt-3 bg-red-600 hover:bg-red-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-royal-900">Account Settings</h1>
        <p className="text-royal-600">
          Manage your account preferences and privacy settings
        </p>
      </div>

      {/* Section Tabs */}
      <div className="flex space-x-6 border-b border-royal-200">
        <button
          onClick={() => setActiveSection("profile")}
          className={`pb-4 px-2 border-b-2 transition-colors ${
            activeSection === "profile"
              ? "border-gold-600 text-gold-600"
              : "border-transparent text-royal-600 hover:text-royal-900"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveSection("password")}
          className={`pb-4 px-2 border-b-2 transition-colors ${
            activeSection === "password"
              ? "border-gold-600 text-gold-600"
              : "border-transparent text-royal-600 hover:text-royal-900"
          }`}
        >
          Password
        </button>
        <button
          onClick={() => setActiveSection("privacy")}
          className={`pb-4 px-2 border-b-2 transition-colors ${
            activeSection === "privacy"
              ? "border-gold-600 text-gold-600"
              : "border-transparent text-royal-600 hover:text-royal-900"
          }`}
        >
          Privacy
        </button>
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
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
                <h2 className="text-xl font-semibold text-royal-800">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName" className="text-royal-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={profileForm.fullName}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          fullName: e.target.value,
                        })
                      }
                      className="border-royal-300"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-royal-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, email: e.target.value })
                      }
                      className="border-royal-300"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-royal-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, phone: e.target.value })
                      }
                      className="border-royal-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="institution" className="text-royal-700">
                      Institution
                    </Label>
                    <Input
                      id="institution"
                      value={profileForm.institution}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          institution: e.target.value,
                        })
                      }
                      className="border-royal-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="location" className="text-royal-700">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profileForm.location}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          location: e.target.value,
                        })
                      }
                      className="border-royal-300"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    disabled={profileMutation.isPending}
                    className="bg-gold-600 hover:bg-gold-700 text-royal-900"
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
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Avatar Section */}
          <div className="space-y-6">
            <div className="bg-royal-50 rounded-lg p-6">
              <h3 className="font-medium text-royal-800 mb-4">Profile Photo</h3>
              <AvatarUpload
                currentAvatar={profileForm.avatar}
                onAvatarChange={handleAvatarChange}
              />
            </div>

            {/* Account Info */}
            <div className="bg-royal-50 rounded-lg p-6 space-y-3">
              <h3 className="font-medium text-royal-800">Account Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-royal-600">Role:</span>
                  <span className="text-royal-900 capitalize">
                    {userProfile?.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-royal-600">Status:</span>
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
                    <span className="text-royal-600">Chapter:</span>
                    <span className="text-royal-900">
                      {userProfile.chapter.chapterName}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-royal-600">Member since:</span>
                  <span className="text-royal-900">
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
          <div className="bg-royal-50 rounded-lg p-6">
            <h3 className="font-medium text-royal-800 mb-4">Change Password</h3>
            <PasswordChangeForm />
          </div>
        </div>
      )}

      {/* Privacy Section */}
      {activeSection === "privacy" && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800">
              Privacy Settings
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label htmlFor="profile-visible" className="text-royal-700">
                    Make profile public
                  </Label>
                  <p className="text-sm text-royal-500">
                    Allow other alumni to view your profile
                  </p>
                </div>
                <Switch
                  id="profile-visible"
                  className="data-[state=checked]:bg-gold-600"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label htmlFor="contact-visible" className="text-royal-700">
                    Show contact information
                  </Label>
                  <p className="text-sm text-royal-500">
                    Display email and phone on your public profile
                  </p>
                </div>
                <Switch
                  id="contact-visible"
                  className="data-[state=checked]:bg-gold-600"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label
                    htmlFor="mentorship-visible"
                    className="text-royal-700"
                  >
                    Available for mentorship
                  </Label>
                  <p className="text-sm text-royal-500">
                    Appear in mentor searches and listings
                  </p>
                </div>
                <Switch
                  id="mentorship-visible"
                  className="data-[state=checked]:bg-gold-600"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-royal-200" />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800">
              Notifications
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label
                    htmlFor="email-notifications"
                    className="text-royal-700"
                  >
                    Email notifications
                  </Label>
                  <p className="text-sm text-royal-500">
                    Receive important updates via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  className="data-[state=checked]:bg-gold-600"
                  defaultChecked
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label
                    htmlFor="mentorship-requests"
                    className="text-royal-700"
                  >
                    Mentorship requests
                  </Label>
                  <p className="text-sm text-royal-500">
                    Get notified about new mentorship requests
                  </p>
                </div>
                <Switch
                  id="mentorship-requests"
                  className="data-[state=checked]:bg-gold-600"
                  defaultChecked
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label htmlFor="event-reminders" className="text-royal-700">
                    Event reminders
                  </Label>
                  <p className="text-sm text-royal-500">
                    Receive reminders for upcoming events
                  </p>
                </div>
                <Switch
                  id="event-reminders"
                  className="data-[state=checked]:bg-gold-600"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
