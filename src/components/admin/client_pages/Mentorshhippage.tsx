"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Archive,
  Activity,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axiosInstance";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MentorshipApplicationCard } from "@/components/MentorshipCard";

interface Mentorship {
  _id: string;
  mentorId: string;
  description: string;
  topics: string[];
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
}

export default function MentorshipManagementPage({mentorships}:{mentorships: Mentorship[]}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] =useState<boolean>(false)
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMentorship, setCurrentMentorship] = useState<Mentorship | null>(
    null
  );

  // Delete mentorship mutation
  const deleteMentorship = ()=>{
    console.log("Deleted a Mentorship")
  }

  // Update mentorship status mutation
  const updateMentorshipStatus = ()=>{
    console.log("Updated a Mentorship Status");
  }

  const handleEdit = (mentorship: Mentorship) => {
    setCurrentMentorship(mentorship);
    setOpenDialog(true);
  };

  const handleCreateNew = () => {
    setCurrentMentorship(null);
    setOpenDialog(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
  };

  console.log(mentorships)

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mentorship Management</h1>
          <p className="text-muted-foreground">
            View and manage all mentorship relationships
          </p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Create Mentorship
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Mentorships</CardTitle>
              <CardDescription>
                {isLoading
                  ? "Loading..."
                  : `Showing ${mentorships?.length || 0} mentorships`}
              </CardDescription>
            </div>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mentorships..."
                  className="pl-9 w-[200px] md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </form>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : error ? (
            <div className="text-destructive">
              Error loading mentorships data
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentor ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Topics</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentorships?.map((mentorship) => (
                  <TableRow key={mentorship._id}>

                    <TableCell className="font-medium">
                      {mentorship.mentorId}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {mentorship.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {mentorship.topics.slice(0, 2).map((topic) => (
                          <Badge
                            key={topic}
                            variant="outline"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                        {mentorship.topics.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{mentorship.topics.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          mentorship.status === "active" ? "default" : "secondary"
                        }
                      >
                        {mentorship.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(mentorship.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEdit(mentorship)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={ updateMentorshipStatus
                            }
                          >
                            {mentorship.status === "active" ? (
                              <>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                              </>
                            ) : (
                              <>
                                <Activity className="mr-2 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteMentorship()}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <div className="flex items-center justify-end gap-4 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={mentorships && mentorships.length < 10}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Mentorship Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentMentorship ? "Edit Mentorship" : "Create New Mentorship"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="mentorId">Mentor ID *</Label>
              <Input
                id="mentorId"
                value={currentMentorship?.mentorId || ""}
                onChange={(e) =>
                  setCurrentMentorship({
                    ...(currentMentorship || {
                      _id: "",
                      mentorId: "",
                      description: "",
                      topics: [],
                      status: "active",
                      createdAt: "",
                      updatedAt: "",
                    }),
                    mentorId: e.target.value,
                  })
                }
                placeholder="Enter mentor ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={currentMentorship?.description || ""}
                onChange={(e) =>
                  setCurrentMentorship({
                    ...(currentMentorship || {
                      _id: "",
                      mentorId: "",
                      description: "",
                      topics: [],
                      status: "active",
                      createdAt: "",
                      updatedAt: "",
                    }),
                    description: e.target.value,
                  })
                }
                placeholder="Describe the mentorship"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Topics *</Label>
              <div className="flex flex-wrap gap-2">
                {currentMentorship?.topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                    <button
                      onClick={() =>
                        setCurrentMentorship({
                          ...currentMentorship,
                          topics: currentMentorship.topics.filter(
                            (t) => t !== topic
                          ),
                        })
                      }
                      className="ml-2"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a topic"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      e.preventDefault();
                      setCurrentMentorship({
                        ...(currentMentorship || {
                          _id: "",
                          mentorId: "",
                          description: "",
                          topics: [],
                          status: "active",
                          createdAt: "",
                          updatedAt: "",
                        }),
                        topics: [
                          ...(currentMentorship?.topics || []),
                          e.currentTarget.value,
                        ],
                      });
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Button
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    if (input.value) {
                      setCurrentMentorship({
                        ...(currentMentorship || {
                          _id: "",
                          mentorId: "",
                          description: "",
                          topics: [],
                          status: "active",
                          createdAt: "",
                          updatedAt: "",
                        }),
                        topics: [
                          ...(currentMentorship?.topics || []),
                          input.value,
                        ],
                      });
                      input.value = "";
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={currentMentorship?.status || "active"}
                onValueChange={(value: "active" | "archived") =>
                  setCurrentMentorship({
                    ...(currentMentorship || {
                      _id: "",
                      mentorId: "",
                      description: "",
                      topics: [],
                      status: "active",
                      createdAt: "",
                      updatedAt: "",
                    }),
                    status: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!currentMentorship?.mentorId || !currentMentorship?.description || currentMentorship?.topics.length === 0) {
                  toast.error("Please fill all required fields");
                  return;
                }

                try {
                  if (currentMentorship._id) {
                    // Update existing
                    await api.put(
                      `/api/mentorships/${currentMentorship._id}`,
                      currentMentorship
                    );
                    toast.success("Mentorship updated successfully");
                  } else {
                    // Create new
                    await api.post("/api/mentorships", currentMentorship);
                    toast.success("Mentorship created successfully");
                  }
                //   queryClient.invalidateQueries({ queryKey: ["mentorships"] });
                  setOpenDialog(false);
                } catch (error) {
                  toast.error(
                    `Failed to ${currentMentorship._id ? "update" : "create"} mentorship`
                  );
                }
              }}
            >
              {currentMentorship?._id ? "Save Changes" : "Create Mentorship"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}