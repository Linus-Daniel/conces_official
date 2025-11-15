"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { Search, Filter, Plus, User, Clock, Users, Calendar, Loader2 } from "lucide-react";
import api from "@/lib/axiosInstance";

interface MentorshipProgram {
  _id: string;
  title: string;
  description: string;
  category: string;
  topics: string[];
  mentorshipStyle: string;
  duration: string;
  timeCommitment: string;
  schedule: string;
  maxParticipants: number;
  currentParticipants: number;
  prerequisites?: string;
  objectives: string[];
  applicationDeadline?: string;
  programStartDate?: string;
  tags: string[];
  mentorId: {
    _id: string;
    userId: {
      fullName: string;
      avatar?: string;
    };
  };
}

export default function MentorshipBrowsePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [programs, setPrograms] = useState<MentorshipProgram[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<MentorshipProgram[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [styleFilter, setStyleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<MentorshipProgram | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const [applicationForm, setApplicationForm] = useState({
    message: "",
    motivation: "",
    goals: "",
    experience: "",
    availability: "",
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, categoryFilter, styleFilter, programs]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await api.get("/mentorship-programs");
      const data = response.data;
      setPrograms(data.programs || []);
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast.error("Failed to load mentorship programs");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = programs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (program) =>
          program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
          program.mentorId.userId.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(program => program.category === categoryFilter);
    }

    // Style filter
    if (styleFilter !== "all") {
      filtered = filtered.filter(program => program.mentorshipStyle === styleFilter);
    }

    setFilteredPrograms(filtered);
  };

  const categories = ["all", ...Array.from(new Set(programs.map(p => p.category)))];
  const styles = ["all", "individual", "group", "hybrid"];

  const handleApplicationSubmit = async () => {
    if (!selectedProgram || !applicationForm.message || !applicationForm.motivation || 
        !applicationForm.goals || !applicationForm.availability) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsApplying(true);
    try {
      await api.post("/mentorship-applications", {
        programId: selectedProgram._id,
        message: applicationForm.message,
        motivation: applicationForm.motivation,
        goals: applicationForm.goals.split(",").map(g => g.trim()).filter(g => g),
        experience: applicationForm.experience,
        availability: applicationForm.availability,
      });

      toast.success("Application submitted successfully!");
      setShowApplicationModal(false);
      setApplicationForm({
        message: "",
        motivation: "",
        goals: "",
        experience: "",
        availability: "",
      });
      setSelectedProgram(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to submit application";
      toast.error(errorMessage);
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading mentorship programs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Mentorship Programs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find the perfect mentor to guide your professional journey
          </p>
        </div>

        {session?.user && (
          <Button
            onClick={() => router.push("/user/mentorship/applications")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            My Applications
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search programs, mentors, or topics..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={styleFilter} onValueChange={setStyleFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent>
              {styles.map((style) => (
                <SelectItem key={style} value={style}>
                  {style === "all" ? "All Styles" : 
                   style.charAt(0).toUpperCase() + style.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Programs Grid */}
      {filteredPrograms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
            No programs found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
              setStyleFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <Card key={program._id} className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                      {program.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      by {program.mentorId.userId.fullName}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {program.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {program.mentorshipStyle}
                  </Badge>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {program.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{program.duration} • {program.timeCommitment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {program.currentParticipants} / {program.maxParticipants} participants
                    </span>
                  </div>
                  {program.applicationDeadline && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Apply by {new Date(program.applicationDeadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {program.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {program.topics.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{program.topics.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Dialog 
                  open={showApplicationModal && selectedProgram?._id === program._id} 
                  onOpenChange={(open) => {
                    setShowApplicationModal(open);
                    if (!open) setSelectedProgram(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full"
                      disabled={
                        program.currentParticipants >= program.maxParticipants ||
                        (program.applicationDeadline && new Date() > new Date(program.applicationDeadline))
                      }
                      onClick={() => setSelectedProgram(program)}
                    >
                      {program.currentParticipants >= program.maxParticipants 
                        ? "Program Full" 
                        : "Apply Now"}
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Apply to "{program.title}"</DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="message">Message to Mentor *</Label>
                        <Textarea
                          id="message"
                          value={applicationForm.message}
                          onChange={(e) => setApplicationForm({...applicationForm, message: e.target.value})}
                          placeholder="Introduce yourself and explain why you're interested in this program"
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivation">Motivation *</Label>
                        <Textarea
                          id="motivation"
                          value={applicationForm.motivation}
                          onChange={(e) => setApplicationForm({...applicationForm, motivation: e.target.value})}
                          placeholder="What motivates you to seek mentorship in this area?"
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="goals">Learning Goals *</Label>
                        <Textarea
                          id="goals"
                          value={applicationForm.goals}
                          onChange={(e) => setApplicationForm({...applicationForm, goals: e.target.value})}
                          placeholder="What specific goals do you want to achieve? (comma-separated)"
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Relevant Experience</Label>
                        <Textarea
                          id="experience"
                          value={applicationForm.experience}
                          onChange={(e) => setApplicationForm({...applicationForm, experience: e.target.value})}
                          placeholder="Briefly describe your background and relevant experience"
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability *</Label>
                        <Textarea
                          id="availability"
                          value={applicationForm.availability}
                          onChange={(e) => setApplicationForm({...applicationForm, availability: e.target.value})}
                          placeholder="When are you available for mentorship sessions?"
                          className="min-h-[60px]"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowApplicationModal(false);
                          setSelectedProgram(null);
                        }}
                        disabled={isApplying}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleApplicationSubmit}
                        disabled={isApplying}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isApplying ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}