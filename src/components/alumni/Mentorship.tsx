"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Calendar, Clock, LinkIcon, BookOpen } from "lucide-react";
import api from "@/lib/axiosInstance";
import { AlumniFormData } from "@/types/alumni";
import { IUser } from "@/models/User";
import { User } from "@/types";
import Link from "next/link";

export default function MentorshipSection({
  alumni,
  user
}: {
  alumni: AlumniFormData;
  user:User
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    mentorId: alumni._id,
    name: user.name, // <-- new field
    description: "",
    topics: [] as string[],
    schedule: {
      days: [] as string[],
      time: "",
      meetingLink: "",
      additionalNotes: "",
    },
  });
  
  const [currentTopic, setCurrentTopic] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleScheduleChange = (field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      schedule: { ...prev.schedule, [field]: value },
    }));
  };

  const toggleDay = (day: string) => {
    setForm((prev) => {
      const newDays = prev.schedule.days.includes(day)
        ? prev.schedule.days.filter((d) => d !== day)
        : [...prev.schedule.days, day];
      return {
        ...prev,
        schedule: { ...prev.schedule, days: newDays },
      };
    });
  };

  const addTopic = () => {
    if (currentTopic.trim() && !form.topics.includes(currentTopic.trim())) {
      setForm((prev) => ({
        ...prev,
        topics: [...prev.topics, currentTopic.trim()],
      }));
      setCurrentTopic("");
    }
  };

  const removeTopic = (topic: string) => {
    setForm((prev) => ({
      ...prev,
      topics: prev.topics.filter((t) => t !== topic),
    }));
  };

  const handleSubmit = async () => {
    if (!form.mentorId || !form.name || !form.description || form.topics.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }
    

    try {
      await api.post("/mentorships", form);
      toast.success("Mentorship created successfully!");
      setOpen(false);
      // Reset form
      setForm({
        mentorId: "",
        name:"",
        description: "",
        topics: [],
        schedule: {
          days: [],
          time: "",
          meetingLink: "",
          additionalNotes: "",
        },
      });
    } catch (error) {
      toast.error("Failed to create mentorship");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Mentorship Program
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage mentorship relationships and create new pairings
          </p>
        </div>
        <div className="flex gap-4">


        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Mentorship
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Mentorship</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Mentor Selection */}
              <div className="space-y-2">
                <Label htmlFor="mentor">Mentor *</Label>
                <p>
                  {user.name}
                </p>
                <p>
                  {user.email}
                </p>
              </div>
              <div className="space-y-2">
  <Label htmlFor="name">Name of Mentorship Program*</Label>
  <Input
    id="name"
    value={form.name}
    onChange={(e) => handleChange("name", e.target.value)}
    placeholder="Enter mentorship title or your full name"
  />
</div>
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe the purpose of this mentorship"
                  className="min-h-[100px]"
                  />
              </div>

              {/* Topics */}
              <div className="space-y-2">
                <Label>Topics *</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTopic}
                    onChange={(e) => setCurrentTopic(e.target.value)}
                    placeholder="Add a topic"
                    onKeyDown={(e) => e.key === "Enter" && addTopic()}
                    />
                  <Button variant="outline" onClick={addTopic}>
                    Add
                  </Button>
                </div>
                {form.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.topics.map((topic) => (
                      <div
                      key={topic}
                      className="flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
                      >
                        {topic}
                        <button
                          onClick={() => removeTopic(topic)}
                          className="text-muted-foreground hover:text-foreground"
                          >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Schedule Section */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule (Optional)
                </h3>

                {/* Meeting Days */}
                <div className="space-y-2">
                  <Label>Meeting Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => (
                      <Button
                      key={day}
                      variant={
                        form.schedule.days.includes(day)
                        ? "default"
                        : "outline"
                      }
                      size="sm"
                      onClick={() => toggleDay(day)}
                      >
                        {day.slice(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Meeting Time */}
                <div className="space-y-2">
                  <Label>Meeting Time</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="time"
                      value={form.schedule.time}
                      onChange={(e) =>
                        handleScheduleChange("time", e.target.value)
                      }
                      className="w-[150px]"
                      />
                  </div>
                </div>

                {/* Meeting LinkIcon */}
                <div className="space-y-2">
                  <Label>Meeting LinkIcon</Label>
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={form.schedule.meetingLink}
                      onChange={(e) =>
                        handleScheduleChange("meetingLink", e.target.value)
                      }
                      placeholder="Zoom, Google Meet, etc."
                      />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <Textarea
                      value={form.schedule.additionalNotes}
                      onChange={(e) =>
                        handleScheduleChange("additionalNotes", e.target.value)
                      }
                      placeholder="Any special instructions"
                      className="min-h-[80px]"
                      />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create Mentorship</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Link href="/alumni/mentorship/applications">
                      Applications
            </Link>
      </div>
                      </div>

      {/* Mentorship List */}
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Active Mentorships</h3>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filter mentorships..."
                className="max-w-[200px]"
              />
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {/* Example mentorship cards - in a real app these would be mapped from data */}
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="flex-1">
                <div className="font-medium">Dr. Sarah Johnson → Alex Chen</div>
                <div className="text-sm text-muted-foreground">
                  Topics: Research Methodology, Academic Writing
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Schedule: Wednesdays at 3:00 PM
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="flex-1">
                <div className="font-medium">
                  Prof. Michael Chen → Jamie Smith
                </div>
                <div className="text-sm text-muted-foreground">
                  Topics: Career Development, Interview Preparation
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Schedule: Mondays at 10:00 AM
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
