import AuthForm from "@/components/AuthForm";
import api from "@/lib/axiosInstance";
import React, { Suspense } from "react";

async function getChapters() {
  try {
    const response = await api.get("/chapters");
    console.log("Chapters fetched successfully:", response.data.chapteres);
    return response.data.chapteres;
  } catch (error) {
    console.error("Error fetching chapteres:", error);
    return [];
  }
}

async function page() {
  const chapters = await getChapters();
  return (
    <div>
      <Suspense>
        <AuthForm chapters={chapters} />
      </Suspense>
    </div>
  );
}

export default page;
