"use client";
import {
  ChartBarIcon,
  CogIcon,
  LogOut,
  MenuIcon,
  ShoppingBagIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import AdminSideBar from "./AdminSideBar";

type Props = {
    children:ReactNode
}
export default function AdminLayout({ children }:Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Admin Dashboard - NascomSoft Embedded</title>
      </Head>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40">
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 ${
              sidebarOpen ? "block" : "hidden"
            }`}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div
            className={`fixed inset-y-0 left-0 w-64 bg-white transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-50`}
          >
            <div className="flex items-center justify-between h-16 px-4 bg-primary text-white">
              <span className="text-xl font-semibold">NascomSoft</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <AdminSideBar
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-center h-16 px-4 bg-primary text-white mb-6">
            <span className="text-xl font-semibold">NascomSoft</span>
          </div>
          <AdminSideBar
            handleLogout={handleLogout}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-600"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <main className="py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {activeTab === "dashboard" ? "Dashboard Overview" : activeTab}
            </h1>
            <div className="mt-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
