// app/protected/page.tsx or wherever your protected page is

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";// your NextAuth config
import { redirect } from "next/navigation";

type ProtectedPageProps = {
  expectedRole: string;
  children: React.ReactNode;
};

export default async function ProtectedPage({ expectedRole, children }: ProtectedPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  if (session.user.role !== expectedRole) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
