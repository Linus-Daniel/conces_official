"use client"
import { useSession } from "next-auth/react";
import React from "react";
import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

type AdminHeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function AdminHeader({
  sidebarOpen,
  setSidebarOpen,
}: AdminHeaderProps) {

  const {data:session} = useSession()
  const user = session?.user


  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className=" text-gray-500 lg:hidden hover:text-royal-DEFAULT mr-4"
          >
            <FaBars className="text-xl" />
          </button>
          <h1 className="text-xl font-bold text-royal-DEFAULT hidden md:block">
            CONCES Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaUserCircle className="text-royal-DEFAULT text-2xl mr-2" />
            <div className="hidden md:block">
              <p className="text-gray-600">{user?.name}</p>
              {/* <p className="text-sm text-gray-500">{user?.role}</p> */}
            </div>
          </div>
          <button className="text-gray-500 hover:text-red-500">
            <FaSignOutAlt className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
