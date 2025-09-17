import type { Metadata } from "next";
import "../../(home)/globals.css";
import AlumniLayout from "@/components/alumni/AlumniLayout";
import { Navigation } from "@/components/alumni/Navigation";
import { cn } from "@/lib/utils";

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
        <AlumniLayout>
          <div className="flex flex-col min-h-screen md:flex-row">
            <Navigation />

            {/* Main content area */}
            <main className={cn("flex-1 pb-16 md:pb-0", "md:ml-64")}>
              <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
            </main>
          </div>
        </AlumniLayout>
      </body>
    </html>
  );
}
