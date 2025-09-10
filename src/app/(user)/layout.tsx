import DashboardLayout from "@/components/user/DashBoardLayout";
import "../(home)/globals.css";
import ProtectedPage from "@/components/ProtectedRoute";
export default function UserRootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="antialiased">
          {/* No Header or Footer here */}
          <ProtectedPage expectedRole="student">

          <DashboardLayout>
            {children}
          </DashboardLayout>
          </ProtectedPage>
        </body>
      </html>
    );
  }
  