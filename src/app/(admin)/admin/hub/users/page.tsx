// app/admin/hub/users/page.tsx
"use client";

import { useState } from "react";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus,
  FiUsers,
  FiMail,
  FiMapPin,
  FiBook,
  FiRefreshCw,
  FiAlertCircle,
  FiFilter,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import {
  useHubUsers,
  useUpdateUser,
  useDeleteUser,
  useBulkOperations,
} from "@/hooks/useHubData";
import { QueryParams } from "@/types/hub";
import { toast } from "react-hot-toast";

// Import shadcn components
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function UsersManagement() {
  const [params, setParams] = useState<QueryParams>({
    page: 1,
    limit: 10,
    search: "",
    status: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // React Query hooks
  const { data, isLoading, error, refetch, isFetching } = useHubUsers(params);

  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const { bulkDeleteUsers } = useBulkOperations();

  const users = data?.users || [];
  const pagination = data?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  };

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParams((prev) => ({ ...prev, search: searchInput, page: 1 }));
  };

  const handleStatusFilter = (status: string) => {
    setParams((prev) => ({ ...prev, status, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleStatusUpdate = async (userId: string, newStatus: string) => {
    updateUserMutation.mutate(
      {
        userId,
        userData: { status: newStatus },
      },
      {
        onSuccess: () => {
          toast.success(`User status updated to ${newStatus}`);
        },
      }
    );
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${userName}? This action cannot be undone.`
      )
    ) {
      return;
    }

    deleteUserMutation.mutate(userId);
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`
      )
    ) {
      return;
    }

    bulkDeleteUsers.mutate(selectedUsers, {
      onSuccess: () => {
        setSelectedUsers([]);
        toast.success(`${selectedUsers.length} users deleted successfully`);
      },
    });
  };

  const handleBulkStatusUpdate = (newStatus: string) => {
    if (selectedUsers.length === 0) return;

    // This would need to be implemented in your bulk operations hook
    // For now, we'll show a message
    toast.success(`Updating ${selectedUsers.length} users to ${newStatus}`);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      case "pending":
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  const clearFilters = () => {
    setSearchInput("");
    setParams({ page: 1, limit: 10, search: "", status: "" });
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl flex items-center">
                  <FiUsers className="mr-2 text-primary" /> Users Management
                </CardTitle>
                <CardDescription>
                  Manage all platform users ({pagination.total} total)
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                {selectedUsers.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex gap-1">
                        Bulk Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleBulkStatusUpdate("approved")}
                      >
                        Mark as Approved
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleBulkStatusUpdate("rejected")}
                      >
                        Mark as Rejected
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleBulkStatusUpdate("pending")}
                      >
                        Mark as Pending
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleBulkDelete}
                        className="text-destructive focus:text-destructive"
                      >
                        Delete Selected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                <Button
                  onClick={() => refetch()}
                  disabled={isFetching}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                >
                  <FiRefreshCw
                    className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                  />
                </Button>

                <Link href="/admin/hub/users/create">
                  <Button className="flex gap-1">
                    <FiPlus className="h-4 w-4" /> Add User
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search users by name, email, or institution..."
                    className="pl-9"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={isFetching}>
                  Search
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex gap-1"
                >
                  <FiFilter className="h-4 w-4" /> Filters
                </Button>
                {(params.search || params.status) && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={clearFilters}
                    className="flex gap-1"
                  >
                    <FiX className="h-4 w-4" /> Clear
                  </Button>
                )}
              </div>

              {isFilterOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select
                      value={params.status || ""}
                      onValueChange={handleStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {isFetching && (
                <div className="text-sm text-muted-foreground flex items-center">
                  <FiRefreshCw className="animate-spin mr-1 h-3 w-3" />
                  Refreshing data...
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6 flex items-center">
              <FiAlertCircle className="mr-2 text-destructive h-5 w-5" />
              <span className="text-destructive">{error.message}</span>
              <Button
                onClick={() => refetch()}
                variant="ghost"
                className="ml-auto"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center">
                <FiUsers className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No users found</h3>
                <p className="mt-2 text-muted-foreground">
                  {params.search || params.status
                    ? "Try adjusting your search criteria"
                    : "Get started by adding your first user"}
                </p>
                {(params.search || params.status) && (
                  <Button onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={
                            selectedUsers.length === users.length &&
                            users.length > 0
                          }
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Education
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Location
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Joined
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user._id)}
                            onCheckedChange={() =>
                              toggleUserSelection(user._id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.avatar || "/default-avatar.png"}
                              alt={user.fullname}
                            />
                            <div>
                              <div className="font-medium">{user.fullname}</div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <FiMail className="mr-1 h-3 w-3" /> {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <FiBook className="mr-1 h-3 w-3" />
                            {user.institution || "N/A"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.major || "N/A"}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center">
                            <FiMapPin className="mr-1 h-3 w-3" />
                            {user.location || "N/A"}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(user.status || "pending")}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <FiEye className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/hub/users/${user._id}`}>
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/hub/users/${user._id}/edit`}>
                                    Edit User
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>
                                  Update Status
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusUpdate(user._id, "approved")
                                  }
                                >
                                  Mark as Approved
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusUpdate(user._id, "rejected")
                                  }
                                >
                                  Mark as Rejected
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusUpdate(user._id, "pending")
                                  }
                                >
                                  Mark as Pending
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDelete(user._id, user.fullname)
                                  }
                                  className="text-destructive focus:text-destructive"
                                >
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="border-t p-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (pagination.page > 1) {
                                handlePageChange(pagination.page - 1);
                              }
                            }}
                            className={
                              pagination.page === 1
                                ? "pointer-events-none opacity-50"
                                : undefined
                            }
                          />
                        </PaginationItem>

                        {Array.from({
                          length: Math.min(pagination.pages, 5),
                        }).map((_, index) => {
                          let pageNum;
                          if (pagination.pages <= 5) {
                            pageNum = index + 1;
                          } else if (pagination.page <= 3) {
                            pageNum = index + 1;
                          } else if (pagination.page >= pagination.pages - 2) {
                            pageNum = pagination.pages - 4 + index;
                          } else {
                            pageNum = pagination.page - 2 + index;
                          }

                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(pageNum);
                                }}
                                isActive={pagination.page === pageNum}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}

                        {pagination.pages > 5 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (pagination.page < pagination.pages) {
                                handlePageChange(pagination.page + 1);
                              }
                            }}
                            className={
                              pagination.page === pagination.pages
                                ? "pointer-events-none opacity-50"
                                : undefined
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                    <div className="text-sm text-muted-foreground text-center mt-2">
                      Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                      {Math.min(
                        pagination.page * pagination.limit,
                        pagination.total
                      )}{" "}
                      of {pagination.total} results
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
