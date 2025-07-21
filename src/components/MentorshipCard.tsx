"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { Loader2, User, BookOpen, MessageSquare, Calendar, Clock } from "lucide-react";
import api from "@/lib/axiosInstance";

interface MentorshipCardProps {
  mentorship: {
    _id: string;
    mentorId: string;
    mentorName: string;
    mentorExpertise: string[];
    description: string;
    topics: string[];
    availableSpots?: number;
    totalSpots?: number;
    duration?: string;
    timeCommitment?: string;
    category?: string;
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
  const isMentor = studentId === mentorship.mentorId;

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please write a message to the mentor");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post(`/mentorships/application/apply/${mentorship._id}`, {
        mentorship: mentorship._id,
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
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow border-royal-300 dark:border-royal-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-full bg-royal-100 dark:bg-royal-900 flex items-center justify-center">
              <User className="h-5 w-5 text-royal-600 dark:text-royal-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-royal-900 dark:text-royal-100">
              {mentorship.mentorName}
            </h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {mentorship.mentorExpertise?.slice(0, 3)?.map((expertise) => (
                <Badge 
                  key={expertise}
                  variant="outline"
                  className="text-xs bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-200"
                >
                  {expertise}
                </Badge>
              ))}
              {mentorship?.mentorExpertise?.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{mentorship.mentorExpertise.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-royal-800 dark:text-royal-200 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-royal-600" />
            Mentorship Focus
          </h4>
          <p className="text-sm text-foreground line-clamp-3">
            {mentorship.description}
          </p>
        </div>

        {mentorship.category && (
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-royal-700 dark:text-royal-300">Category:</span>
            <Badge variant="outline" className="text-xs">
              {mentorship.category}
            </Badge>
          </div>
        )}

        {mentorship.duration && mentorship.timeCommitment && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-royal-600" />
              <span>{mentorship.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-royal-600" />
              <span>{mentorship.timeCommitment}</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium text-royal-800 dark:text-royal-200">
            Topics Covered
          </h4>
          <div className="flex flex-wrap gap-2">
            {mentorship.topics.map((topic) => (
              <Badge 
                key={topic} 
                variant="outline"
                className="text-xs bg-royal-100 text-royal-800 dark:bg-royal-900 dark:text-royal-200"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {mentorship.availableSpots !== undefined && mentorship.totalSpots !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Available Spots</span>
              <span className="font-medium">
                {mentorship.availableSpots} / {mentorship.totalSpots}
              </span>
            </div>
            <Progress
              value={(mentorship.availableSpots / mentorship.totalSpots) * 100}
              className="h-2 bg-gold-200 dark:bg-gold-800"
            //   indicatorClassName="bg-gold-600"
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-royal-600 hover:bg-royal-700 text-white"
              disabled={mentorship.availableSpots === 0 && !isMentor}
            >
              {isMentor ? "View Details" : 
               mentorship.availableSpots === 0 ? "Program Full" : "Apply for Mentorship"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-royal-900 dark:text-royal-100">
                Apply to {mentorship.mentorName}'s Mentorship
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-3">
                <Label htmlFor="message" className="text-royal-800 dark:text-royal-200">
                  Your Message to {mentorship.mentorName}
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Tell ${mentorship.mentorName} why you're interested in their mentorship and what you hope to learn`}
                  className="min-h-[150px] border-royal-300 focus-visible:ring-royal-600"
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
                className="border-royal-300 text-royal-800 hover:bg-royal-50 dark:hover:bg-royal-900/30"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="bg-gold-600 hover:bg-gold-700 text-white"
              >
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