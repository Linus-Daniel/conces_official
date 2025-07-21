"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Clock, User, BookOpen, MessageSquare, BadgeCheck } from "lucide-react";
import api from "@/lib/axiosInstance";

export default function ViewMentorshipPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [mentorship, setMentorship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentorship = async () => {
      try {
        const response = await api.get(`/mentorships/${id}`);
        setMentorship(response.data);
      } catch (err) {
        setError("Failed to fetch mentorship details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorship();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="animate-pulse text-royal-600">Loading mentorship details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-destructive">{error}</div>
      </div>
    );
  }

  if (!mentorship) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-foreground">Mentorship not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-royal-900 dark:text-royal-100">
          Mentorship Program: {mentorship.title}
        </h1>
        {session?.user?.id === mentorship.mentor._id && (
          <Button
            variant="outline"
            className="bg-royal-600 text-white hover:bg-royal-700"
            onClick={() => router.push(`/mentorships/${id}/edit`)}
          >
            Edit Program
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-royal-300">
            <CardHeader>
              <CardTitle className="text-royal-800 dark:text-royal-200">
                Program Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <User className="h-5 w-5 text-royal-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mentor</p>
                    <p className="font-medium">{mentorship.mentor.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <BookOpen className="h-5 w-5 text-royal-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{mentorship.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-royal-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{mentorship.duration} weeks</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-royal-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time Commitment</p>
                    <p className="font-medium">{mentorship.timeCommitment} hours/week</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4 bg-royal-200 dark:bg-royal-800" />

              <div>
                <h3 className="font-medium text-royal-700 dark:text-royal-300 mb-2">Description</h3>
                <p className="text-foreground">{mentorship.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-royal-300">
            <CardHeader>
              <CardTitle className="text-royal-800 dark:text-royal-200">
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mentorship.learningObjectives.map((obj: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <BadgeCheck className="h-5 w-5 text-gold-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-royal-300">
            <CardHeader>
              <CardTitle className="text-royal-800 dark:text-royal-200">
                Program Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-royal-700 dark:text-royal-300 mb-2">
                    Sessions
                  </h4>
                  <p>{mentorship.sessionDetails}</p>
                </div>

                <div>
                  <h4 className="font-medium text-royal-700 dark:text-royal-300 mb-2">
                    Communication
                  </h4>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-royal-600" />
                    <span>{mentorship.communicationMethod}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-gold-300 bg-gold-50 dark:bg-gold-900/20">
            <CardHeader>
              <CardTitle className="text-gold-800 dark:text-gold-200">Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Available Spots</p>
                  <p className="font-medium">
                    {mentorship.availableSpots} of {mentorship.totalSpots}
                  </p>
                  <Progress
                    value={(mentorship.availableSpots / mentorship.totalSpots) * 100}
                    className="h-2 mt-2 bg-gold-200 dark:bg-gold-800"
                    // indicatorClassName="bg-gold-600"
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">
                    {/* {new Date(mentorship.startDate).toLocaleDateString()} */}
                    Hello
                  </p>
                </div>

                <div>
                  {/* <p className="text-sm text-muted-foreground">Prerequisites</p>
                  <p className="font-medium">
                    {mentorship.prerequisites.length > 0
                      ? mentorship.prerequisites.join(", ")
                      : "None"}
                  </p> */}
                </div>

                <Button
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white"
                  disabled={mentorship.availableSpots === 0}
                >
                  {mentorship.availableSpots === 0
                    ? "Program Full"
                    : "Apply for Mentorship"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-royal-300">
            <CardHeader>
              <CardTitle className="text-royal-800 dark:text-royal-200">Mentor Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-royal-100 dark:bg-royal-800 flex items-center justify-center">
                    <User className="h-6 w-6 text-royal-600 dark:text-royal-400" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">{mentorship.mentor.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {mentorship.mentor.title}
                  </p>
                  <p className="mt-2 text-foreground">
                    {mentorship.mentor.bio || "No bio provided."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}