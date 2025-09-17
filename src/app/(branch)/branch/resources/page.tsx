import ResourceTable from "@/components/ResourceTable";
import api from "@/lib/axiosInstance";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import React from "react";

const getChapterResource = async (id: string) => {
  try {
    const response = await api.get(`/chapters/${id}/resources/`);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

async function page() {
  const session = await getServerSession(authOptions);
  const chapterId = session?.user.chapter as string;
  const resources = await getChapterResource(chapterId);
  return (
    <div>
      <ResourceTable resources={resources} />
    </div>
  );
}

export default page;
