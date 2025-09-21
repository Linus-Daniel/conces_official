"use client";
import { useState } from "react";
import Sidebar from "./ChapterSideBar";
import MobileSidebar from "./MobileNav";
import Header from "./ChapterHeader";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" richColors closeButton />
      <div className="flex h-screen overflow-hidden">
        <div className="hidden md:flex md:flex-shrink-0 h-full w-64">
          <Sidebar />
        </div>
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
          </QueryClientProvider>
    </SessionProvider>
  );
}
