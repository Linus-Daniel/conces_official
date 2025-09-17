import type { Metadata } from "next";
import ChapterLayout from "@/components/layout/ChapterLayout";
import "../../(home)/globals.css";
import ProtectedPage from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "CONCES Chapter Dashboard",
  description: "Dashboard for CONCES chapter management",
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="antialiased">
        <ProtectedPage expectedRole="chapter-admin">
          <ChapterLayout>{children}</ChapterLayout>
        </ProtectedPage>
      </body>
    </html>
  );
}
