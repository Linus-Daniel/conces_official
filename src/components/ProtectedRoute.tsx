import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth"; // your NextAuth config
import { redirect } from "next/navigation";

type ProtectedPageProps = {
  expectedRole: string | string[];
  children: React.ReactNode;
};

export default async function ProtectedPage({
  expectedRole,
  children,
}: ProtectedPageProps) {
  const session = await getServerSession(authOptions);
  console.log(session?.user.role,"Current user Role")
  
  // Support both single role and multiple roles
  const allowedRoles = Array.isArray(expectedRole) ? expectedRole : [expectedRole];
  const authorized = session?.user?.role && allowedRoles.includes(session.user.role);
  console.log(authorized,"Authorized")

  if (!session) {
    redirect("/auth");
  }
  
  if (!authorized) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
