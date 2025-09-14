import AuthForm from "@/components/AuthForm";
import api from "@/lib/axiosInstance";
import React, { Suspense } from "react";

async function getBranches(){
  try{
    const response = await  api.get("/chapters");
    console.log("Branches fetched successfully:", response.data.branches);
    return response.data.branches;
  }
  catch(error) {
    console.error("Error fetching branches:", error);
    return [];

  }
}

async function page() {
  const branches = await getBranches();
  return (
    <div>
      <Suspense>
        <AuthForm branches={branches} />
      </Suspense>
    </div>
  );
}

export default page;
