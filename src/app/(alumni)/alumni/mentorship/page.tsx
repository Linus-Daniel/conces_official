import MentorshipPage from "@/components/alumni/Mentorship";
import api from "@/lib/axiosInstance";
import { authOptions } from "@/lib/next-auth";
import { User } from "@/types";
import { AlumniFormData } from "@/types/alumni";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
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
    <MentorshipPage user={user as User} alumni={alumni} />
  );
}

export default page;
