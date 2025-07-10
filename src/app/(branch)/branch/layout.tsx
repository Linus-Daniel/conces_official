import type { Metadata } from "next";
import BranchLayout from "@/components/layout/BranchLayout";
import "../../(home)/globals.css";

export const metadata: Metadata = {
  title: "CONCES Branch Dashboard",
  description: "Dashboard for CONCES branch management",
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="antialiased">
        <BranchLayout>{children}</BranchLayout>
      </body>
    </html>
  );
}
