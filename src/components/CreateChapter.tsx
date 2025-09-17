"use client";

import api from "@/lib/axiosInstance";
import { useState } from "react";
import {
  FiX,
  FiMapPin,
  FiHome,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiImage,
  FiTarget,
  FiLink,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";

interface SocialLink {
  name: string;
  url: string;
}

interface CreateChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (chapter: any) => void;
}

const CreateChapterModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateChapterModalProps) => {
  // Chapter fields
  const [chapterName, setChapterName] = useState("");
  const [chapterLocation, setChapterLocation] = useState("");
  const [motto, setMotto] = useState("");
  const [banner, setBanner] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  // Admin fields
  const [adminFullName, setAdminFullName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"chapter" | "admin">("chapter");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation
  const validateChapterData = () => {
    const newErrors: Record<string, string> = {};

    if (!chapterName.trim()) {
      newErrors.chapterName = "Chapter name is required";
    }

    if (!chapterLocation.trim()) {
      newErrors.chapterLocation = "Chapter location is required";
    }

    // Validate social links
    socialLinks.forEach((link, index) => {
      if (link.name && !link.url) {
        newErrors[`socialLink${index}`] = "URL is required for social link";
      }
      if (link.url && !link.url.match(/^https?:\/\/.+/)) {
        newErrors[`socialLink${index}`] = "Invalid URL format";
      }
    });

    if (banner && !banner.match(/^https?:\/\/.+/)) {
      newErrors.banner = "Banner must be a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAdminData = () => {
    const newErrors: Record<string, string> = {};

    if (!adminFullName.trim()) {
      newErrors.adminFullName = "Admin name is required";
    }

    if (!adminEmail.trim()) {
      newErrors.adminEmail = "Admin email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
      newErrors.adminEmail = "Invalid email format";
    }

    if (!adminPhone.trim()) {
      newErrors.adminPhone = "Admin phone is required";
    }

    if (!adminPassword) {
      newErrors.adminPassword = "Password is required";
    } else if (adminPassword.length < 6) {
      newErrors.adminPassword = "Password must be at least 6 characters";
    }

    if (adminPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate based on active tab
    if (activeTab === "chapter" && !validateChapterData()) {
      return;
    }

    if (activeTab === "admin" && !validateAdminData()) {
      return;
    }

    // If on chapter tab, move to admin tab
    if (activeTab === "chapter") {
      setActiveTab("admin");
      return;
    }

    // Final submission from admin tab
    setLoading(true);
    setErrors({});

    try {
      // Combine chapter + admin into one payload
      const payload = {
        chapterName: chapterName.trim(),
        chapterLocation: chapterLocation.trim(),
        motto: motto.trim() || undefined,
        banner: banner.trim() || undefined,
        socialLinks:
          socialLinks.filter((link) => link.name && link.url).length > 0
            ? socialLinks.filter((link) => link.name && link.url)
            : undefined,

        admin: {
          adminFullName,
          adminEmail,
          adminPhone,
          adminPassword,
          role: "chapter-admin",
        },
      };

      const response = await api.post("/chapters", payload);

      if (!response.data || !response.data.chapter) {
        throw new Error("Failed to create chapter & admin");
      }

      // Success
      toast.success("Chapter and admin created successfully!");

      // Call success callback
      if (onSuccess) {
        onSuccess(response.data.chapter);
      }

      // Reset form
      resetForm();

      // Close modal after short delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error("Error creating chapter:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setChapterName("");
    setChapterLocation("");
    setMotto("");
    setBanner("");
    setSocialLinks([]);
    setAdminFullName("");
    setAdminEmail("");
    setAdminPhone("");
    setAdminPassword("");
    setConfirmPassword("");
    setActiveTab("chapter");
    setErrors({});
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { name: "", url: "" }]);
  };

  const updateSocialLink = (
    index: number,
    field: "name" | "url",
    value: string
  ) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);

    // Clear error for this social link
    if (errors[`socialLink${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`socialLink${index}`];
      setErrors(newErrors);
    }
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Create New Chapter
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Step {activeTab === "chapter" ? "1" : "2"} of 2:{" "}
              {activeTab === "chapter" ? "Chapter Details" : "Admin Account"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={loading}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            type="button"
            onClick={() => setActiveTab("chapter")}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === "chapter"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
            disabled={loading}
          >
            1. Chapter Details
          </button>
          <button
            type="button"
            onClick={() => {
              if (validateChapterData()) {
                setActiveTab("admin");
              }
            }}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === "admin"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
            disabled={loading}
          >
            2. Admin Account
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]"
        >
          {/* Chapter Details Tab */}
          {activeTab === "chapter" && (
            <div className="space-y-4">
              {/* Chapter Name */}
              <div>
                <label
                  htmlFor="chapterName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Chapter Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiHome className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="chapterName"
                    value={chapterName}
                    onChange={(e) => {
                      setChapterName(e.target.value);
                      if (errors.chapterName) {
                        const newErrors = { ...errors };
                        delete newErrors.chapterName;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2 ${
                      errors.chapterName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="e.g. UNILAG Chapter"
                    disabled={loading}
                  />
                </div>
                {errors.chapterName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.chapterName}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="chapterLocation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="chapterLocation"
                    value={chapterLocation}
                    onChange={(e) => {
                      setChapterLocation(e.target.value);
                      if (errors.chapterLocation) {
                        const newErrors = { ...errors };
                        delete newErrors.chapterLocation;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2 ${
                      errors.chapterLocation
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="e.g. University of Lagos, Lagos"
                    disabled={loading}
                  />
                </div>
                {errors.chapterLocation && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.chapterLocation}
                  </p>
                )}
              </div>

              {/* Motto */}
              <div>
                <label
                  htmlFor="motto"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Motto <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiTarget className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="motto"
                    value={motto}
                    onChange={(e) => setMotto(e.target.value)}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2"
                    placeholder="e.g. Unity in Faith"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Banner URL */}
              <div>
                <label
                  htmlFor="banner"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Banner Image URL{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiImage className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="banner"
                    value={banner}
                    onChange={(e) => {
                      setBanner(e.target.value);
                      if (errors.banner) {
                        const newErrors = { ...errors };
                        delete newErrors.banner;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2 ${
                      errors.banner ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="https://example.com/banner.jpg"
                    disabled={loading}
                  />
                </div>
                {errors.banner && (
                  <p className="mt-1 text-sm text-red-600">{errors.banner}</p>
                )}
              </div>

              {/* Social Links */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Social Links{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    disabled={loading}
                  >
                    <FiPlus /> Add Link
                  </button>
                </div>

                {socialLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) =>
                        updateSocialLink(index, "name", e.target.value)
                      }
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2"
                      placeholder="Platform (e.g. Facebook)"
                      disabled={loading}
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) =>
                        updateSocialLink(index, "url", e.target.value)
                      }
                      className="flex-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2"
                      placeholder="URL"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="text-red-500 hover:text-red-700"
                      disabled={loading}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
                {Object.keys(errors)
                  .filter((key) => key.startsWith("socialLink"))
                  .map((key) => (
                    <p key={key} className="text-sm text-red-600">
                      {errors[key]}
                    </p>
                  ))}
              </div>
            </div>
          )}

          {/* Admin Details Tab */}
          {activeTab === "admin" && (
            <div className="space-y-4">
              {/* Admin Full Name */}
              <div>
                <label
                  htmlFor="adminFullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="adminFullName"
                    value={adminFullName}
                    onChange={(e) => {
                      setAdminFullName(e.target.value);
                      if (errors.adminFullName) {
                        const newErrors = { ...errors };
                        delete newErrors.adminFullName;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2 ${
                      errors.adminFullName
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Admin's full name"
                    disabled={loading}
                  />
                </div>
                {errors.adminFullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.adminFullName}
                  </p>
                )}
              </div>

              {/* Admin Email */}
              <div>
                <label
                  htmlFor="adminEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="adminEmail"
                    value={adminEmail}
                    onChange={(e) => {
                      setAdminEmail(e.target.value);
                      if (errors.adminEmail) {
                        const newErrors = { ...errors };
                        delete newErrors.adminEmail;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2 ${
                      errors.adminEmail ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="admin@example.com"
                    disabled={loading}
                  />
                </div>
                {errors.adminEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.adminEmail}
                  </p>
                )}
              </div>

              {/* Admin Phone */}
              <div>
                <label
                  htmlFor="adminPhone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="adminPhone"
                    value={adminPhone}
                    onChange={(e) => {
                      setAdminPhone(e.target.value);
                      if (errors.adminPhone) {
                        const newErrors = { ...errors };
                        delete newErrors.adminPhone;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2 ${
                      errors.adminPhone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="+234 XXX XXX XXXX"
                    disabled={loading}
                  />
                </div>
                {errors.adminPhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.adminPhone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="adminPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="adminPassword"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      if (errors.adminPassword) {
                        const newErrors = { ...errors };
                        delete newErrors.adminPassword;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2 ${
                      errors.adminPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Min. 6 characters"
                    disabled={loading}
                  />
                </div>
                {errors.adminPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.adminPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) {
                        const newErrors = { ...errors };
                        delete newErrors.confirmPassword;
                        setErrors(newErrors);
                      }
                    }}
                    className={`pl-10 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2 ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Re-enter password"
                    disabled={loading}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* General error message */}
          {errors.submit && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
              {errors.submit}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
          <button
            type="button"
            onClick={() => {
              if (activeTab === "admin") {
                setActiveTab("chapter");
              } else {
                onClose();
              }
            }}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {activeTab === "admin" ? "Back" : "Cancel"}
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Creating...
              </span>
            ) : activeTab === "chapter" ? (
              "Next: Admin Details"
            ) : (
              "Create Chapter & Admin"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChapterModal;
