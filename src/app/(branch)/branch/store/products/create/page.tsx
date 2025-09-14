// app/admin/products/new/page.tsx
import { authOptions } from "@/lib/next-auth";
import ProductForm from "@/components/admin/ProductForm";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import api from "@/lib/axiosInstance";
import { ICategory } from "@/models/Category";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userRole = session?.user.role as string;
  const branchId = session?.user.branch as string;
  
  console.log(branchId)

  let branchName;

  if (userRole === "branch-admin") {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore.toString(); // Convert cookies to header string

      const response = await api.get(`/chapters/${branchId}`, {
        headers: {
          Cookie: cookieHeader,
        },
      });
      console.log(response.data)

      branchName = response.data?.branch.branchName || "Unknown";
    } catch (error) {
      console.error("Failed to fetch branch with axios + cookies:", error);
    }
  }

  const categories: Partial<ICategory>[] = [
    { name: "Shirts", slug: "shirts" },
    { name: "Wrist bangle", slug: "wrist-band" },
    { name: "Umbrellas", slug: "umbrellas" },
    { name: "Shoes", slug: "shoes" },
    { name: "Holy books", slug: "bible" },
  ];

  return (
    <div>
      <ProductForm
        categories={categories}
        userRole={userRole}
        branch={branchName}
        url="branch"
        branchId={branchId}
      />
    </div>
  );
};

export default page;
