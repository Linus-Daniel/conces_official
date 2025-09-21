import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth"; // your NextAuth config
import { redirect } from "next/navigation";

type ProtectedPageProps = {
  expectedRole: string;
  children: React.ReactNode;
};

export default async function ProtectedPage({
  expectedRole,
  children,
}: ProtectedPageProps) {
  const session = await getServerSession(authOptions);
  console.log(session?.user.role,"Current user Role")
  const authorized = session?.user.role === expectedRole;
  console.log(authorized,"Authorized")

  if (!session) {
    redirect("/auth");
  }
  if (session.user.role !== expectedRole) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
