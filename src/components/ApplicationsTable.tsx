"use client";

import {
  Calendar,
  Mail,
  Check,
  X,
  Loader2,
  User,
  GraduationCap,
  Briefcase,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Select, SelectItem } from "./ui/select";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Table } from "./ui/table";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Input } from "./ui/input";
import api from "@/lib/axiosInstance";

// Interface definitions
export interface Application {
  _id: string;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "approved" | "rejected";
  message: string;
  mentorId: MentorProfile;
  studentId: StudentProfile;
  mentorship: MentorshipDetails;
  __v: number;
}

export interface MentorProfile {
  _id: string;
  userId: string;
  avatar: string;
  bio: string;
  currentRole: string;
  graduationYear: number;
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
  specialization: string;
  isMentor: boolean;
  availableForMentorship: boolean;
}

export interface StudentProfile {
  _id: string;
  fullName: string;
  email: string;
  institution: string;
  branch: string;
  role: "student" | string;
}

export interface MentorshipDetails {
  _id: string;
  name: string;
  description: string;
  topics: string[];
  duration: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface MentorshipApplicationsProps {
  userType: "mentor" | "student";
  data:Application[]
}

const MentorshipApplicationsPage = ({
  userType = "mentor",
  data
}: MentorshipApplicationsProps) => {
  // const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [applications,setApplications] = useState<Application[]>(data || []);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState<"approved" | "rejected">(
    "approved"
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");

  const stats = {
    totalApplications: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    accepted: applications.filter((app) => app.status === "approved").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    acceptanceRate:
      applications.length > 0
        ? Math.round(
            (applications.filter((app) => app.status === "approved").length /
              applications.length) *
              100
          )
        : 0,
  };

  const getApplications = async ()=>{
    try{
        const response = await api.get("/mentorships/application");
        console.log(response.data.mentorships, "applications data");
        return response.data.mentorships;
    }
    catch(error) {
      console.error("Error fetching applications:", error);
      // Optionally show an error toast or notification
    }
  }

  const handleViewApplication = (app: Application) => {
    setSelectedApplication(app);
    setIsViewModalOpen(true);
  };

  const openStatusConfirmation = (status: "approved" | "rejected") => {
    setStatusToUpdate(status);
    setIsConfirmDialogOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedApplication) return;

    try {
      setIsUpdating(true);
      // Simulate API call
      const response = await api.patch(`/mentorships/application/${selectedApplication._id}`, {
        status: statusToUpdate,
      })
      console.log(response)
      const newApplications = await getApplications();
      setApplications(newApplications);
    }
    catch(error){
      console.error("Error updating application status:", error);
      // Optionally show an error toast or notification
    }
     finally {
      setIsUpdating(false);
      setIsConfirmDialogOpen(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (statusFilter !== "all" && app.status !== statusFilter) return false;
    if (programFilter !== "all" && app.mentorship.name !== programFilter)
      return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {userType === "mentor"
                ? "Mentorship Applications"
                : "My Applications"}
            </h1>
            <p className="text-gray-600">
              {userType === "mentor"
                ? "Review and manage students applying to your mentorship programs"
                : "Track the status of your mentorship applications"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-blue-300 text-blue-700">
              Export Data
            </Button>
            {userType === "mentor" && (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Create New Program
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border border-blue-100 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Applications
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stats.totalApplications}
                  </h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600">
                <span className="text-green-600 font-medium">+12%</span> from
                last month
              </div>
            </div>
          </Card>

          <Card className="border border-blue-100 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Review
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stats.pending}
                  </h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Loader2 className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <Progress
                value={(stats.pending / stats.totalApplications) * 100}
                className="mt-3 h-2 bg-gray-200"
                // indicatorClassName="bg-yellow-500"
              />
            </div>
          </Card>

          <Card className="border border-blue-100 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Acceptance Rate
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stats.acceptanceRate}%
                  </h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600">
                <span className="text-green-600 font-medium">+5%</span> from
                last quarter
              </div>
            </div>
          </Card>

          <Card className="border border-blue-100 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg. Response Time
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    3.2 days
                  </h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600">
                <span className="text-green-600 font-medium">-1.1 days</span>{" "}
                improvement
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder={
                userType === "mentor"
                  ? "Search applicants by name, program, or skills"
                  : "Search by program or mentor name"
              }
              className="flex-1"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="AI Career Path">AI Career Path</SelectItem>
                <SelectItem value="Tech Product Management">
                  Product Management
                </SelectItem>
                <SelectItem value="Hardware Engineering">
                  Hardware Engineering
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              {userType === "mentor"
                ? "Recent Applications"
                : "My Applications"}
            </h2>
            <p className="text-sm text-gray-600">
              {filteredApplications.length} applications requiring your
              attention
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <Table>
              <thead className="bg-gray-50">
                <tr>
                  {userType === "mentor" ? (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                  ) : (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mentor
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skills
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {userType === "mentor"
                              ? app.studentId.fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : app.mentorId.currentRole
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {userType === "mentor"
                              ? app.studentId.fullName
                              : app.mentorId.currentRole}
                          </div>
                          <div className="text-sm text-gray-600">
                            {userType === "mentor"
                              ? app.studentId.institution
                              : app.mentorId.specialization}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {app.mentorship.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {app.mentorship.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {app.mentorship.topics.slice(0, 3).map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-700"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {app.mentorship.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{app.mentorship.topics.length - 3}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`text-xs ${getStatusColor(app.status)}`}
                      >
                        {app.status.charAt(0).toUpperCase() +
                          app.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 text-blue-700"
                          onClick={() => handleViewApplication(app)}
                        >
                          View
                        </Button>
                        {userType === "mentor" && app.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => {
                                setSelectedApplication(app);
                                openStatusConfirmation("approved");
                              }}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => {
                                setSelectedApplication(app);
                                openStatusConfirmation("rejected");
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      {/* View Application Modal */}
      {selectedApplication && (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <DialogTitle className="text-gray-900">
                Application Details
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {selectedApplication.mentorship.name} -{" "}
                {new Date(selectedApplication.createdAt).toLocaleDateString()}
              </DialogDescription>
            </AlertDialogHeader >

            <div className="space-y-6 mt-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {userType === "mentor"
                      ? selectedApplication.studentId.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : selectedApplication.mentorId.currentRole
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {userType === "mentor"
                      ? selectedApplication.studentId.fullName
                      : selectedApplication.mentorId.currentRole}
                  </h3>
                  <p className="text-gray-600">
                    {userType === "mentor"
                      ? selectedApplication.studentId.institution
                      : selectedApplication.mentorId.specialization}
                  </p>
                  <Badge
                    className={`mt-2 ${getStatusColor(
                      selectedApplication.status
                    )}`}
                  >
                    {selectedApplication.status.charAt(0).toUpperCase() +
                      selectedApplication.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                    Mentorship Program
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium">
                      {selectedApplication.mentorship.name}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {selectedApplication.mentorship.description}
                    </p>
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Duration:</span>{" "}
                      {selectedApplication.mentorship.duration}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
                    {userType === "mentor"
                      ? "Student Details"
                      : "Mentor Details"}
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium">
                      {userType === "mentor"
                        ? selectedApplication.studentId.fullName
                        : selectedApplication.mentorId.currentRole}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {userType === "mentor"
                        ? selectedApplication.studentId.email
                        : selectedApplication.mentorId.bio}
                    </p>
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Institution:</span>{" "}
                      {userType === "mentor"
                        ? selectedApplication.studentId.institution
                        : selectedApplication.mentorId.education[0]
                            ?.institution}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                  Skills & Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.mentorship.topics.map((skill) => (
                    <Badge key={skill} className="bg-blue-100 text-blue-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2 text-blue-600" />
                  Application Message
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800">{selectedApplication.message}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Application Date
                  </h4>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(
                      selectedApplication.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Last Updated
                  </h4>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(
                      selectedApplication.updatedAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {userType === "mentor" && (
                <AlertDialogFooter className="flex justify-end gap-2 pt-4">
                  {selectedApplication.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        className="border-red-300 text-red-700"
                        onClick={() => openStatusConfirmation("rejected")}
                        disabled={isUpdating}
                      >
                        {isUpdating && statusToUpdate === "rejected" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Reject Application"
                        )}
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => openStatusConfirmation("approved")}
                        disabled={isUpdating}
                      >
                        {isUpdating && statusToUpdate === "approved" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Accept Application"
                        )}
                      </Button>
                    </>
                  )}
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </AlertDialogFooter>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Status Update Confirmation Dialog */}
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {statusToUpdate === "approved"
                ? "Approve Application"
                : "Reject Application"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {statusToUpdate} this application?
              {statusToUpdate === "rejected" &&
                " This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStatusUpdate}
              disabled={isUpdating}
              className={
                statusToUpdate === "approved"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : statusToUpdate === "approved" ? (
                "Approve"
              ) : (
                "Reject"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MentorshipApplicationsPage;
