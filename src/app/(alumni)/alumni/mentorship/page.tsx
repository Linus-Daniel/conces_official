import MentorshipPage from "@/components/alumni/Mentorship";
import api from "@/lib/axiosInstance";
import { AlumniFormData } from "@/types/alumni";
import { cookies } from "next/headers";
import React from "react";

async function page() {
  const getAlumni = async () => {
    const cookieStore = await cookies();
    const cookieString =  cookieStore.toString();

    const response = await api.get("/alumni/profile", {
      headers: {
        cookie: cookieString,
      },
    });
    return response.data?.profile || {};
  };

  const alumni = await getAlumni() as AlumniFormData;

  return (
    <MentorshipPage  alumni={alumni} />
  );
}

export default page;
