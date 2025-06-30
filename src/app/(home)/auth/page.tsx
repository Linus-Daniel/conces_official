import AuthForm from "@/components/AuthForm";
import React, { Suspense } from "react";

function page() {
  return (
    <div>
      <Suspense>
        <AuthForm />
      </Suspense>
    </div>
  );
}

export default page;
