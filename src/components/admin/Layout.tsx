"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./Header";
import { SessionProvider } from "next-auth/react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider>
      <div className="flex h-screen bg-gray-50 font-poppins">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="flex-1 overflow-y-auto p-1 sm:p-2 md:p-4 bg-gray-100">
            <SessionProvider>{children}</SessionProvider>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
