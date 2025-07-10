"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import api from "@/lib/axiosInstance";

interface MentorshipCardProps {
  mentorship: {
    _id: string;
    mentorId: string;
    mentorName: string;
    mentorExpertise: string[];
    description: string;
    topics: string[];
  };
  studentId: string;
}

export function MentorshipApplicationCard({
  mentorship,
  studentId,
}: MentorshipCardProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please write a message to the mentor");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post(`/mentorships/${mentorship._id}/apply`, {
        mentorshipId: mentorship._id,
        mentorId: mentorship.mentorId,
        studentId,
        message,
      });

      toast.success("Your mentorship request has been submitted successfully");
      setOpen(false);
      setMessage("");
    } catch (error) {
      toast.error("Failed to submit mentorship request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
            <span className="text-lg font-semibold">
              {/* {mentorship.mentorName.charAt(0)} */}
              Linus Daniel
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{mentorship.mentorName}</h3>
            <p className="text-sm text-muted-foreground">
              {mentorship.mentorExpertise}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-medium">Mentorship Focus</h4>
          <p className="text-sm text-muted-foreground">
            {mentorship.description}
          </p>
        </div>
        <div>
          <h4 className="font-medium">Topics Covered</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {mentorship.topics.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Apply for Mentorship</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                Apply to {mentorship.mentorName}'s Mentorship
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="message">
                  Your Message to {mentorship.mentorName}
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Tell ${mentorship.mentorName} why you're interested in their mentorship and what you hope to learn`}
                  className="min-h-[150px]"
                />
                <p className="text-sm text-muted-foreground">
                  This will be included in your application
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
