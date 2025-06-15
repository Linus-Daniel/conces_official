// components/ProtectedRoute.tsx

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ProtectedRouteProps = {
  expectedRole: string;
  children: React.ReactNode;
};

export default function ProtectedRoute({ expectedRole, children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth");
    } else if (session.user.role !== expectedRole) {
      router.push("/unauthorized"); // You can customize this page
    }
  }, [status, session, expectedRole, router]);

  if (status === "loading" || !session || session.user.role !== expectedRole) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
