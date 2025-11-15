"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, Plus, X, Loader2 } from "lucide-react";
import api from "@/lib/axiosInstance";

interface AlumniProfile {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
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

export default function AlumniProfilePage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    graduationYear: new Date().getFullYear(),
    specialization: "",
    currentRole: "",
    bio: "",
    skills: [] as string[],
    availableForMentorship: false,
    isMentor: false,
    socialLinks: {
      linkedin: "",
      twitter: "",
      github: "",
    },
    education: [{
      schoolName: "",
      course: "",
      startDate: "",
      endDate: "",
    }],
    workExperience: [{
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    }],
  });
  const [newSkill, setNewSkill] = useState("");

  // Fetch alumni profile
  const { data: alumniProfile, isLoading } = useQuery({
    queryKey: ["alumniProfile"],
    queryFn: async () => {
      const response = await api.get("/alumni/profile");
      return response.data.profile as AlumniProfile;
    },
    retry: 1,
  });

  useEffect(() => {
    if (alumniProfile) {
      setProfileForm({
        fullName: alumniProfile.userId.fullName || "",
        email: alumniProfile.userId.email || "",
        phone: alumniProfile.userId.phone || "",
        graduationYear: alumniProfile.graduationYear || new Date().getFullYear(),
        specialization: alumniProfile.specialization || "",
        currentRole: alumniProfile.currentRole || "",
        bio: alumniProfile.bio || "",
        skills: alumniProfile.skills || [],
        availableForMentorship: alumniProfile.availableForMentorship || false,
        isMentor: alumniProfile.isMentor || false,
        socialLinks: {
          linkedin: alumniProfile.socialLinks?.linkedin || "",
          twitter: alumniProfile.socialLinks?.twitter || "",
          github: alumniProfile.socialLinks?.github || "",
        },
        education: alumniProfile.education?.length ? alumniProfile.education : [{
          schoolName: "",
          course: "",
          startDate: "",
          endDate: "",
        }],
        workExperience: alumniProfile.workExperience?.length ? alumniProfile.workExperience : [{
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        }],
      });
    }
  }, [alumniProfile]);

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: async (data: typeof profileForm) => {
      // Update user profile
      await api.put(`/users/${session?.user?.id}`, {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
      });

      // Update alumni profile
      const response = await api.patch("/alumni/profile", {
        graduationYear: data.graduationYear,
        specialization: data.specialization,
        currentRole: data.currentRole,
        bio: data.bio,
        skills: data.skills,
        availableForMentorship: data.availableForMentorship,
        isMentor: data.isMentor,
        socialLinks: data.socialLinks,
        education: data.education.filter(edu => edu.schoolName || edu.course),
        workExperience: data.workExperience.filter(exp => exp.company || exp.position),
      });

      return response.data.profile;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["alumniProfile"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to update profile");
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
      
      await api.put(`/users/${session?.user?.id}`, {
        avatar: uploadData.url,
      });

      return uploadData.url;
    },
    onSuccess: () => {
      toast.success("Avatar updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["alumniProfile"] });
      setUploadingAvatar(false);
    },
    onError: () => {
      toast.error("Failed to upload avatar");
      setUploadingAvatar(false);
    },
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!profileForm.specialization || !profileForm.currentRole || !profileForm.graduationYear) {
      toast.error("Please fill in all required fields");
      return;
    }
    profileMutation.mutate(profileForm);
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileForm.skills.includes(newSkill.trim())) {
      setProfileForm({
        ...profileForm,
        skills: [...profileForm.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileForm({
      ...profileForm,
      skills: profileForm.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addEducation = () => {
    setProfileForm({
      ...profileForm,
      education: [...profileForm.education, {
        schoolName: "",
        course: "",
        startDate: "",
        endDate: "",
      }]
    });
  };

  const addWorkExperience = () => {
    setProfileForm({
      ...profileForm,
      workExperience: [...profileForm.workExperience, {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      }]
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-royal-900"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-royal-900">Your Profile</h1>
        <Button 
          type="submit" 
          disabled={profileMutation.isPending}
          className="bg-gold-600 hover:bg-gold-700 text-royal-900"
        >
          {profileMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="fullName" className="text-royal-700">
                  Full Name *
                </Label>
                <Input 
                  id="fullName" 
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({...profileForm, fullName: e.target.value})}
                  className="border-royal-300" 
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-royal-700">
                  Email *
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  className="border-royal-300" 
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-royal-700">
                  Phone
                </Label>
                <Input 
                  id="phone" 
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                  className="border-royal-300" 
                />
              </div>
              <div>
                <Label htmlFor="graduationYear" className="text-royal-700">
                  Graduation Year *
                </Label>
                <Input 
                  id="graduationYear" 
                  type="number"
                  min="1950"
                  max="2030"
                  value={profileForm.graduationYear}
                  onChange={(e) => setProfileForm({...profileForm, graduationYear: parseInt(e.target.value)})}
                  className="border-royal-300" 
                  required
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
              Professional Information
            </h2>
            <div>
              <Label htmlFor="specialization" className="text-royal-700">
                Specialization *
              </Label>
              <Input 
                id="specialization" 
                value={profileForm.specialization}
                onChange={(e) => setProfileForm({...profileForm, specialization: e.target.value})}
                className="border-royal-300" 
                placeholder="e.g., Software Engineering"
                required
              />
            </div>
            <div>
              <Label htmlFor="currentRole" className="text-royal-700">
                Current Role *
              </Label>
              <Input 
                id="currentRole" 
                value={profileForm.currentRole}
                onChange={(e) => setProfileForm({...profileForm, currentRole: e.target.value})}
                className="border-royal-300" 
                placeholder="e.g., Senior Software Engineer"
                required
              />
            </div>
            <div>
              <Label htmlFor="bio" className="text-royal-700">
                Bio
              </Label>
              <Textarea 
                id="bio" 
                value={profileForm.bio}
                onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                className="border-royal-300 min-h-[120px]" 
                placeholder="Tell us about yourself, your experience, and what you're passionate about..."
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
              Skills
            </h2>
            <div className="flex gap-2">
              <Input 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="border-royal-300"
              />
              <Button type="button" onClick={addSkill} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileForm.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-royal-100 text-royal-800">
                  {skill}
                  <button 
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
              Profile Photo
            </h2>
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-32 w-32 rounded-full border-2 border-royal-300 overflow-hidden">
                  {alumniProfile?.userId.avatar ? (
                    <img 
                      src={alumniProfile.userId.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-royal-100 flex items-center justify-center">
                      <span className="text-royal-500 text-sm">No Photo</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute bottom-0 right-0 bg-royal-600 text-white p-2 rounded-full hover:bg-royal-700 disabled:opacity-50"
                >
                  {uploadingAvatar ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
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
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
              Social Links
            </h2>
            <div className="space-y-3">
              <div>
                <Label htmlFor="linkedin" className="text-royal-700">
                  LinkedIn
                </Label>
                <Input 
                  id="linkedin" 
                  value={profileForm.socialLinks.linkedin}
                  onChange={(e) => setProfileForm({
                    ...profileForm, 
                    socialLinks: {...profileForm.socialLinks, linkedin: e.target.value}
                  })}
                  className="border-royal-300" 
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label htmlFor="twitter" className="text-royal-700">
                  Twitter
                </Label>
                <Input 
                  id="twitter" 
                  value={profileForm.socialLinks.twitter}
                  onChange={(e) => setProfileForm({
                    ...profileForm, 
                    socialLinks: {...profileForm.socialLinks, twitter: e.target.value}
                  })}
                  className="border-royal-300" 
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div>
                <Label htmlFor="github" className="text-royal-700">
                  GitHub
                </Label>
                <Input 
                  id="github" 
                  value={profileForm.socialLinks.github}
                  onChange={(e) => setProfileForm({
                    ...profileForm, 
                    socialLinks: {...profileForm.socialLinks, github: e.target.value}
                  })}
                  className="border-royal-300" 
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          {/* Mentorship Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
              Mentorship
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  id="availableForMentorship"
                  type="checkbox"
                  checked={profileForm.availableForMentorship}
                  onChange={(e) => setProfileForm({...profileForm, availableForMentorship: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="availableForMentorship" className="text-royal-700">
                  Available for mentorship
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="isMentor"
                  type="checkbox"
                  checked={profileForm.isMentor}
                  onChange={(e) => setProfileForm({...profileForm, isMentor: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="isMentor" className="text-royal-700">
                  I am a mentor
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}