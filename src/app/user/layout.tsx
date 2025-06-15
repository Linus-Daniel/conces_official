import DashboardLayout from "@/components/user/DashBoardLayout";
import "../(home)/globals.css";
export default function UserRootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="antialiased">
          {/* No Header or Footer here */}
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </body>
      </html>
    );
  }
  