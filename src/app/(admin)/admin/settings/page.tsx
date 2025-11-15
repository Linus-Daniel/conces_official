"use client";
import React, { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Settings,
  Users,
  Mail,
  Shield,
  Building,
  FileText,
  BarChart3,
  Globe,
  Bell,
  Database,
  Save,
  RefreshCw,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  X,
  Check,
  AlertTriangle,
  Info,
  User,
  Phone,
  MapPin,
  School,
  Camera,
  Lock,
  Eye,
  EyeOff,
  Loader2,
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

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploading(true);

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
            <AlertTriangle className="w-4 h-4" />
          )}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-royal-700 mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPasswords.current ? "text" : "password"}
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 pr-10"
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
        <label className="block text-sm font-medium text-royal-700 mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPasswords.new ? "text" : "password"}
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 pr-10"
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
        <label className="block text-sm font-medium text-royal-700 mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showPasswords.confirm ? "text" : "password"}
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 pr-10"
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

      <button
        type="submit"
        disabled={isChanging}
        className="w-full bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
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

const AdminSettings = () => {
  const { data: session, update: updateSession } = useSession();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const { data: userProfile, isLoading: profileLoading, error: profileError, refetch } = useUserProfile();

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    location: "",
    avatar: "",
  });

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
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 3000);
    },
    onError: (error: any) => {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 5000);
    },
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    profileMutation.mutate(profileForm);
  };

  const handleAvatarChange = (url: string) => {
    setProfileForm({ ...profileForm, avatar: url });
  };

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "CONCES",
    siteDescription:
      "Christian Organization of Nigerian Civil, Electrical and Systems Engineers",
    siteUrl: "https://conces.org",
    adminEmail: "admin@conces.org",
    timezone: "Africa/Lagos",
    language: "en",
    maintenanceMode: false,
    registrationEnabled: true,

    // Email Settings
    emailService: "gmail",
    emailUser: "",
    emailPassword: "",
    emailFrom: "noreply@conces.org",
    emailFromName: "CONCES",

    // Security Settings
    sessionTimeout: 30,
    passwordMinLength: 6,
    requireEmailVerification: true,
    enableTwoFactor: false,
    loginAttempts: 5,
    lockoutDuration: 15,

    // Chapter Settings
    autoApproveChapters: false,
    maxChaptersPerRegion: 10,
    chapterCreationEnabled: true,

    // Content Settings
    autoApproveEvents: false,
    autoApproveResources: false,
    autoApproveProducts: false,
    maxFileSize: 10,
    allowedFileTypes: ["pdf", "doc", "docx", "jpg", "png"],

    // Notification Settings
    emailNotifications: true,
    newUserNotifications: true,
    eventNotifications: true,
    systemAlerts: true,
    weeklyReports: false,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
    {
      id: "users",
      label: "User Management",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "email",
      label: "Email Settings",
      icon: <Mail className="w-4 h-4" />,
    },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
    {
      id: "chapters",
      label: "Chapters",
      icon: <Building className="w-4 h-4" />,
    },
    { id: "content", label: "Content", icon: <FileText className="w-4 h-4" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    { id: "system", label: "System", icon: <Database className="w-4 h-4" /> },
  ];

  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async (section?: string) => {
    setIsLoading(true);
    setSaveStatus("saving");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Test email sent successfully!");
    } catch (error) {
      alert("Failed to send test email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      alert("Backup created successfully!");
    } catch (error) {
      alert("Backup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Site Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleInputChange("siteName", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleInputChange("adminEmail", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Site URL
            </label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => handleInputChange("siteUrl", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => handleInputChange("timezone", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-royal-700 mb-2">
            Site Description
          </label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) =>
              handleInputChange("siteDescription", e.target.value)
            }
            rows={3}
            className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Site Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-royal-50 rounded-lg">
            <div>
              <h4 className="font-medium text-royal-900">Maintenance Mode</h4>
              <p className="text-sm text-royal-600">
                Put the site in maintenance mode
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  handleInputChange("maintenanceMode", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-royal-50 rounded-lg">
            <div>
              <h4 className="font-medium text-royal-900">User Registration</h4>
              <p className="text-sm text-royal-600">
                Allow new users to register
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.registrationEnabled}
                onChange={(e) =>
                  handleInputChange("registrationEnabled", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          SMTP Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Email Service
            </label>
            <select
              value={settings.emailService}
              onChange={(e) =>
                handleInputChange("emailService", e.target.value)
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="gmail">Gmail</option>
              <option value="outlook">Outlook</option>
              <option value="custom">Custom SMTP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              From Email
            </label>
            <input
              type="email"
              value={settings.emailFrom}
              onChange={(e) => handleInputChange("emailFrom", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              From Name
            </label>
            <input
              type="text"
              value={settings.emailFromName}
              onChange={(e) =>
                handleInputChange("emailFromName", e.target.value)
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Email User
            </label>
            <input
              type="email"
              value={settings.emailUser}
              onChange={(e) => handleInputChange("emailUser", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Email Password
            </label>
            <input
              type="password"
              value={settings.emailPassword}
              onChange={(e) =>
                handleInputChange("emailPassword", e.target.value)
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              placeholder="Enter app password"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleTestEmail}
            disabled={isLoading}
            className="bg-conces-blue hover:bg-primary text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Send Test Email
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Authentication Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) =>
                handleInputChange("sessionTimeout", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Minimum Password Length
            </label>
            <input
              type="number"
              value={settings.passwordMinLength}
              onChange={(e) =>
                handleInputChange("passwordMinLength", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Max Login Attempts
            </label>
            <input
              type="number"
              value={settings.loginAttempts}
              onChange={(e) =>
                handleInputChange("loginAttempts", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Lockout Duration (minutes)
            </label>
            <input
              type="number"
              value={settings.lockoutDuration}
              onChange={(e) =>
                handleInputChange("lockoutDuration", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Security Options
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-royal-50 rounded-lg">
            <div>
              <h4 className="font-medium text-royal-900">
                Email Verification Required
              </h4>
              <p className="text-sm text-royal-600">
                Require email verification for new accounts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) =>
                  handleInputChange(
                    "requireEmailVerification",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-royal-50 rounded-lg">
            <div>
              <h4 className="font-medium text-royal-900">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-royal-600">
                Enable 2FA for admin accounts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableTwoFactor}
                onChange={(e) =>
                  handleInputChange("enableTwoFactor", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Database Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleBackup}
            disabled={isLoading}
            className="flex items-center justify-center p-4 border-2 border-conces-blue text-conces-blue rounded-lg hover:bg-conces-blue hover:text-white transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Download className="w-5 h-5 mr-2" />
            )}
            Create Backup
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
            <Upload className="w-5 h-5 mr-2" />
            Restore Backup
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
            <Trash2 className="w-5 h-5 mr-2" />
            Clear Cache
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          System Information
        </h3>
        <div className="bg-royal-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Server Status:</span>
              <span className="text-green-600 font-medium flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Online
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Database Status:</span>
              <span className="text-green-600 font-medium flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Connected
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Total Users:</span>
              <span className="text-royal-900 font-medium">2,847</span>
            </div>
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Active Sessions:</span>
              <span className="text-royal-900 font-medium">127</span>
            </div>
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Storage Used:</span>
              <span className="text-royal-900 font-medium">2.3 GB</span>
            </div>
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Last Backup:</span>
              <span className="text-royal-900 font-medium">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Danger Zone
        </h3>
        <div className="border border-red-200 rounded-lg p-6 bg-red-50">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-900 mb-2">
                Reset Application
              </h4>
              <p className="text-red-700 text-sm mb-4">
                This will reset all application settings to defaults. This
                action cannot be undone.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileContent = () => {
    if (profileLoading) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-6 h-6 animate-spin text-gold-600" />
            <span className="text-royal-600">Loading profile...</span>
          </div>
        </div>
      );
    }

    if (profileError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-lg font-medium text-red-900">
                Error loading profile
              </h3>
              <p className="text-red-700">
                Failed to load your profile. Please try again.
              </p>
              <button
                onClick={() => refetch()}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            {saveStatus && (
              <div
                className={`p-4 rounded-lg flex items-center space-x-3 ${
                  saveStatus === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {saveStatus === "success" ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
                <span>
                  {saveStatus === "success" 
                    ? "Profile updated successfully!" 
                    : "Failed to update profile"}
                </span>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-royal-800">
                Admin Profile Information
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-royal-700 mb-2">
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
                    className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-royal-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-royal-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-royal-700 mb-2">
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
                    className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-royal-700 mb-2">
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
                    className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={profileMutation.isPending}
                  className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center"
                >
                  {profileMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Avatar and Account Info */}
        <div className="space-y-6">
          <div className="bg-royal-50 rounded-lg p-6">
            <h3 className="font-medium text-royal-800 mb-4">Profile Photo</h3>
            <AvatarUpload
              currentAvatar={profileForm.avatar}
              onAvatarChange={handleAvatarChange}
            />
          </div>

          {/* Password Change */}
          <div className="bg-royal-50 rounded-lg p-6">
            <h3 className="font-medium text-royal-800 mb-4">Change Password</h3>
            <PasswordChangeForm />
          </div>

          {/* Account Info */}
          <div className="bg-royal-50 rounded-lg p-6 space-y-3">
            <h3 className="font-medium text-royal-800">Account Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-royal-600">Role:</span>
                <span className="text-royal-900 capitalize font-medium">
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
                <span className="text-royal-600">Admin since:</span>
                <span className="text-royal-900">
                  {new Date(userProfile?.createdAt || "").toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileContent();
      case "general":
        return renderGeneralSettings();
      case "email":
        return renderEmailSettings();
      case "security":
        return renderSecuritySettings();
      case "system":
        return renderSystemSettings();
      case "users":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-royal-900">
              User Management Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-royal-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-royal-900">
                    Auto-approve Students
                  </h4>
                  <p className="text-sm text-royal-600">
                    Automatically approve student registrations
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-royal-900">
              Settings for {activeTab}
            </h3>
            <p className="text-royal-600">
              Settings content for {activeTab} will be implemented here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-royal-900">
                Admin Settings
              </h1>
              <p className="text-royal-600 mt-1">
                Manage your CONCES platform configuration
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {saveStatus && (
                <div
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    saveStatus === "success"
                      ? "bg-green-100 text-green-800"
                      : saveStatus === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {saveStatus === "success" && <Check className="w-4 h-4" />}
                  {saveStatus === "error" && <X className="w-4 h-4" />}
                  {saveStatus === "saving" && (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  )}
                  <span className="text-sm font-medium">
                    {saveStatus === "success" && "Settings saved"}
                    {saveStatus === "error" && "Save failed"}
                    {saveStatus === "saving" && "Saving..."}
                  </span>
                </div>
              )}
              <button
                onClick={() => handleSave()}
                disabled={isLoading}
                className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-royal-900">Settings</h3>
              </div>
              <nav className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-gold-100 text-gold-800 border border-gold-200"
                        : "text-royal-700 hover:bg-royal-50"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
