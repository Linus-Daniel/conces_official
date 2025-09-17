// components/EventTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/models/Events";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, Clock, Star, Users } from "lucide-react";
import { format } from "date-fns";
import { useState, useMemo } from "react";
import {
  ApprovalSystem,
  createApprovalComponents,
} from "@/components/admin/ApprovalSystem";
import { useApprovalSystem } from "@/hooks/useApprove";

interface ApprovalableIEvent extends IEvent {
  _id: string;
  approved: boolean;
}

interface EventTableProps {
  events: ApprovalableIEvent[];
  userRole: string;
}

export default function EventTable({
  events: initialEvents,
  userRole,
}: EventTableProps) {
  const [events, setEvents] = useState<ApprovalableIEvent[]>(initialEvents);

  // 🔥 ONE hook handles all approval logic
  const approvalSystem = useApprovalSystem({
    items: events,
    setItems: setEvents,
    entity: "events",
    userRole,
  });

  // 🔥 Create reusable table components
  const { ApprovalBadge, ApprovalActions, SelectAllCheckbox, ItemCheckbox } =
    createApprovalComponents<ApprovalableIEvent>(approvalSystem);

  // Custom filters state
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Apply custom filters to already approval-filtered items
  const finalFilteredItems = useMemo(() => {
    return approvalSystem.filteredItems.filter((event) => {
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "upcoming" && new Date(event.date) > new Date()) ||
        (statusFilter === "past" && new Date(event.date) <= new Date()) ||
        (statusFilter === "featured" && event.featured);

      return matchesCategory && matchesStatus;
    });
  }, [approvalSystem.filteredItems, categoryFilter, statusFilter]);

  const clearAllFilters = () => {
    approvalSystem.clearFilters();
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "spiritual":
        return "bg-faith-100 text-faith-800 border-faith-200";
      case "academic":
        return "bg-primary-100 text-primary-800 border-primary-200";
      case "career":
        return "bg-gold-100 text-gold-800 border-gold-200";
      default:
        return "bg-royal-100 text-royal-800 border-royal-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* 🔥 ALL filters, search, and batch actions in ONE component */}
      <ApprovalSystem
        {...approvalSystem}
        totalItems={events.length}
        searchFields={["title", "description", "location"]}
        searchPlaceholder="Search events..."
        additionalFilters={
          <>
            {/* Category Filter */}
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-500 focus:border-transparent"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="spiritual">Spiritual</option>
              <option value="academic">Academic</option>
              <option value="career">Career</option>
              <option value="social">Social</option>
            </select>

            {/* Status Filter */}
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="featured">Featured</option>
            </select>
          </>
        }
      />

      {/* Override the clear filters to include our custom filters */}
      <div className="px-4">
        <button
          onClick={clearAllFilters}
          className="text-sm text-royal-600 hover:text-royal-800 underline"
        >
          Clear All Filters
        </button>
      </div>

      {/* Results count */}
      <div className="px-4 text-sm text-gray-600">
        Showing {finalFilteredItems.length} of {events.length} events
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table className="min-w-[800px]">
          <TableHeader className="bg-royal-50">
            <TableRow>
              {approvalSystem.canApprove && (
                <TableHead className="w-12 text-royal-800">
                  <SelectAllCheckbox />
                </TableHead>
              )}
              <TableHead className="w-[300px] text-royal-800">Event</TableHead>
              <TableHead className="text-royal-800">Date & Time</TableHead>
              <TableHead className="text-royal-800">Category</TableHead>
              <TableHead className="text-royal-800">RSVPs</TableHead>
              <TableHead className="text-royal-800">Status</TableHead>
              <TableHead className="text-royal-800">Approval</TableHead>
              <TableHead className="text-right text-royal-800">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {finalFilteredItems.map((event) => (
              <TableRow key={event.id} className="hover:bg-royal-50/50">
                {approvalSystem.canApprove && (
                  <TableCell>
                    <ItemCheckbox item={event} />
                  </TableCell>
                )}
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium line-clamp-1">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.chapter}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-royal-600" />
                    <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-royal-600" />
                    <span className="text-sm text-gray-500">{event.time}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getCategoryBadgeClass(event.category)}
                  >
                    {event.category.charAt(0).toUpperCase() +
                      event.category.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-royal-600" />
                    <span>{event.rsvps}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        new Date(event.date) > new Date()
                          ? "default"
                          : "secondary"
                      }
                      className={
                        new Date(event.date) > new Date()
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {new Date(event.date) > new Date() ? "Upcoming" : "Past"}
                    </Badge>
                    {event.featured && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Star className="h-4 w-4 text-gold-600 fill-gold-300" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Featured Event</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <ApprovalBadge approved={event.approved} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/events/${event.id}`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                    <ApprovalActions item={event} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {finalFilteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No events found matching your filters
        </div>
      )}
    </div>
  );
}
