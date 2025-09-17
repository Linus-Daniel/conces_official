import { authOptions } from "@/lib/next-auth";
import ProductForm from "@/components/admin/ProductForm";
import api from "@/lib/axiosInstance";
import { ICategory } from "@/models/Category";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userRole = session?.user.role as string;
  const chapterId = session?.user.chapter as string;
  let chapterName;
  if (userRole == "chapter-adming") {
    try {
      const response = await api.get("/chapteres");
      console.log(response.data);
      chapterName = response.data;
    } catch (error) {}
  }
  const categories: Partial<ICategory>[] = [
    {
      name: "Shirts",
      slug: "shirts",
    },
    {
      name: "Wrist bangle",
      slug: "wrist-band",
    },
    {
      name: "Umbrellas",
      slug: "umbrellas",
    },
    {
      name: "shoes",
      slug: "shoes",
    },
    {
      name: "Holy books",
      slug: "bible",
    },
  ];

  return (
    <div>
      <ProductForm
        chapterId={chapterId}
        categories={categories}
        userRole={userRole}
        chapter={chapterName}
        url="admin"
      />
    </div>
  );
};

export default page;
