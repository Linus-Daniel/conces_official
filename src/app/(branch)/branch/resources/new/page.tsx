import AddResources from "@/components/addResources";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  const chapter = session?.user.chapter as string;
  return (
    <div>
      <AddResources chapter={chapter} />
    </div>
  );
}

export default page;
