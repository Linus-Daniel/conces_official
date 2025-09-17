"use client";
// app/(admin)/mentor-requests/page.tsx
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Loader2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import Image from "next/image";
import api from "@/lib/axiosInstance";

interface UserInfo {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  chapter?: string;
  year?: string;
}

interface MentorRequest {
  _id: string;
  userId: UserInfo;
  primaryExpertise: string;
  skills: string[];
  style: string;
  preferredTimes: string;
  motivation: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export default function MentorRequestsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<MentorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MentorRequest | null>(
    null
  );
  const [selectedAction, setSelectedAction] = useState<"approved" | "rejected">(
    "approved"
  );
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [detailedRequest, setDetailedRequest] = useState<MentorRequest | null>(
    null
  );

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await api.get("/mentor/request?populate=userId");
        const data = response.data.data;

        // Enhance requests with avatar URLs if userId info exists
        const enhancedRequests = data.map((request: MentorRequest) => {
          if (request.userId) {
            return {
              ...request,
              userId: {
                ...request.userId,
                avatar: `https://api.dicebear.com/8.x/avataaars/png?seed=${
                  request.userId.email || request.userId._id
                }`,
              },
            };
          }
          return request;
        });

        setRequests(enhancedRequests);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to fetch requests"
        );
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchRequests();
    }
  }, [status, session]);

  const handleActionClick = (
    request: MentorRequest,
    action: "approved" | "rejected"
  ) => {
    setSelectedRequest(request);
    setSelectedAction(action);
    setOpenDialog(true);
  };

  const handleViewClick = (request: MentorRequest) => {
    setDetailedRequest(request);
    setViewModalOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedRequest) return;

    try {
      setUpdatingId(selectedRequest._id);

      const res = await api.patch(
        `/mentor/request/${selectedRequest._id}/approve`,
        {
          status: selectedAction,
        }
      );

      const updatedStatus =
        selectedAction === "approved" ? "approved" : "rejected";

      setRequests((prev) =>
        prev.map((request) =>
          request._id === selectedRequest._id
            ? { ...request, status: updatedStatus }
            : request
        )
      );

      toast.success(`Request ${updatedStatus} successfully`);
    } catch (error: any) {
      const errMessage = error?.response?.data?.error || error.message;
      toast.error(`Failed to ${selectedAction} request: ${errMessage}`);
    } finally {
      setUpdatingId(null);
      setOpenDialog(false);
      setSelectedRequest(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (session?.user?.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Unauthorized</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mentor Requests</h1>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">User</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Skills
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No pending mentor requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    requests.map((request) => (
                      <TableRow key={request._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {request.userId ? (
                              <>
                                <Image
                                  src={
                                    request.userId.avatar ||
                                    `https://api.dicebear.com/8.x/avataaars/png?seed=${request.userId._id}`
                                  }
                                  alt={request.userId.fullName}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                                <div>
                                  <div className="font-medium">
                                    {request.userId.fullName}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {request.userId.email}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="text-muted-foreground">
                                User not found
                              </div>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="font-medium">
                          {request.primaryExpertise}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {request.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                            {request.skills.length > 3 && (
                              <Badge variant="outline">
                                +{request.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant={
                              request.status === "pending"
                                ? "secondary"
                                : request.status === "approved"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleViewClick(request)}
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleActionClick(request, "approved")
                                  }
                                  disabled={updatingId === request._id}
                                >
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleActionClick(request, "rejected")
                                  }
                                  disabled={updatingId === request._id}
                                  className="text-red-600"
                                >
                                  Reject
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedAction === "approved"
                ? "Approve Mentor Request?"
                : "Reject Mentor Request?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedAction === "approved"
                ? "This will approve the userId as a mentor."
                : "This will reject the mentor request."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              disabled={updatingId === selectedRequest?._id}
            >
              {updatingId === selectedRequest?._id ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Mentor Request Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mentor Request Details</DialogTitle>
          </DialogHeader>
          {detailedRequest && (
            <div className="grid gap-6 py-4">
              {/* User Profile Section */}
              {detailedRequest.userId && (
                <div className="flex items-center gap-4">
                  <Image
                    src={
                      detailedRequest.userId.avatar ||
                      `https://api.dicebear.com/8.x/avataaars/png?seed=${detailedRequest.userId._id}`
                    }
                    alt={detailedRequest.userId.fullName}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {detailedRequest.userId.fullName}
                    </h2>
                    <p className="text-muted-foreground">
                      {detailedRequest.userId.email}
                    </p>
                    {detailedRequest.userId.chapter && (
                      <p className="text-sm mt-1">
                        <span className="font-medium">Chapter:</span>{" "}
                        {detailedRequest.userId.chapter}
                      </p>
                    )}
                    {detailedRequest.userId.year && (
                      <p className="text-sm">
                        <span className="font-medium">Year:</span>{" "}
                        {detailedRequest.userId.year}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Primary Expertise
                  </h3>
                  <p className="text-sm mt-1">
                    {detailedRequest.primaryExpertise}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Mentoring Style
                  </h3>
                  <p className="text-sm mt-1">{detailedRequest.style}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {detailedRequest.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Preferred Times
                </h3>
                <p className="text-sm mt-1">{detailedRequest.preferredTimes}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Motivation
                </h3>
                <p className="text-sm mt-2 whitespace-pre-line">
                  {detailedRequest.motivation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h3>
                  <Badge
                    variant={
                      detailedRequest.status === "pending"
                        ? "secondary"
                        : detailedRequest.status === "approved"
                        ? "default"
                        : "destructive"
                    }
                    className="mt-1"
                  >
                    {detailedRequest.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Submitted
                  </h3>
                  <p className="text-sm mt-1">
                    {format(
                      new Date(detailedRequest.createdAt),
                      "MMM dd, yyyy HH:mm"
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
