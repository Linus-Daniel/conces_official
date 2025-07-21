import MentorshipApplicationsPage from "@/components/ApplicationsTable";
import api from "@/lib/axiosInstance";
import { cookies } from "next/headers";
import React from "react";

const getApplications = async () => {
  const coonkieStorage = await cookies();
  try {
    const response = await api.get("/mentorships/application", {
      headers: {
        cookie: coonkieStorage.toString(),
      },
    });
    console.log(response.data.mentorships);
    return response.data.mentorships;
  } catch (error) {
    console.log(error);
  }
};
async function page() {
  const data = await getApplications();
  return (
    <div>
      <MentorshipApplicationsPage userType="mentor" data={data}/>
    </div>
  );
}

export default page;
