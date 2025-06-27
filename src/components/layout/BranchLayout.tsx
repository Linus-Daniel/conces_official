"use client";

import { useState } from "react";
import Sidebar from "./BranchSideBar";
import MobileSidebar from "./MobileNav";
import Header from "./BranchHeader";
import { SessionProvider } from "next-auth/react";

export default function BranchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Left */}
        <div className="hidden md:flex md:flex-shrink-0 h-full w-64">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content - Right */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Header */}
          <Header onMenuClick={() => setSidebarOpen(true)} />

          {/* Scrollable Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
