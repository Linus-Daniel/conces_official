"use client";
import { MentorshipApplicationCard } from "@/components/MentorshipCard";
import api from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function MentorshipBrowsePage() {
  const data = useSession();
  const user = data?.data?.user;
  console.log(user)
  const [mentorships, setMentorships] = useState<[]>([]);
  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        const response = await api.get("/mentorships");
        const data = response.data;
        setMentorships(data);
      } catch (error) {
        console.error("Error fetching mentorships:", error);
      }
    };

    fetchMentorships();
  }, []);

  console.log(mentorships)
  const studentId = "user123";

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentorships.map((mentorship: any) => (
          <MentorshipApplicationCard
            key={mentorship._id}
            mentorship={mentorship}
            studentId={user?.id as string}
          />
        ))}
      </div>
    </div>
  );
}
