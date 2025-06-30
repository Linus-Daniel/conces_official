import type { Metadata } from "next";
import "../../(home)/globals.css";
import AdminLayout from "@/components/admin/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
  title: "Conces",
  description: "faithful and committed to the cause of Christ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="antialiased">
          <AdminLayout>
            <ProtectedRoute expectedRole="admin">
              <main>{children}</main>
            </ProtectedRoute>
          </AdminLayout>
      </body>
    </html>
  );
}
