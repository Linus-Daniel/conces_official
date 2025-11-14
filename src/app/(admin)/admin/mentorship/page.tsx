import MentorshipManagementPage from "@/components/admin/client_pages/Mentorshhippage";
import api from "@/lib/axiosInstance";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

async function page() {
  async function fetchMentorshipRequests() {
    const cookieStore = await cookies();
    try {
      const response = await api.get("/mentorships", {
        headers: { cookie: cookieStore.toString() },
      });
      const data = response.data;
      console.log(data,"Data from mentorship requests");
      
      return data.mentorships;
    } catch (error) {
      console.error("Error fetching mentorship requests:", error);
    }
  }
  const mentorships = await fetchMentorshipRequests();
  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Mentorship Requests</h1>
        <Link
          href={"/admin/mentorship/requests"}
          className="border-[2px] px-2 py-1 border-conces-blue bg-royal-900 text-white rounded-md"
        >
          View Request
        </Link>
      </div>
    <div>
     <MentorshipManagementPage mentorships={mentorships} />

      </div>
    </main>
  );
}

export default page;
