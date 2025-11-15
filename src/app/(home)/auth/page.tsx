import AuthForm from "@/components/AuthForm";
import api from "@/lib/axiosInstance";
import React, { Suspense } from "react";

async function getChapters() {
  try {
    const response = await api.get("/chapters");
    return response.data.chapters;
  } catch (error) {
    console.error("Error fetching chapters:", error instanceof Error ? error.message : "Unknown error");
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
