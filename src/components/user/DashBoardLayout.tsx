"use client";
import {
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaChalkboardTeacher,
  FaPrayingHands,
  FaNetworkWired,
  FaBriefcase,
  FaGraduationCap,
  FaTrophy,
  FaHandsHelping,
  FaComments,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import {SocketProvider} from "../../context/SocketContext";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: <FaUser />, name: "Dashboard", link: "" },
    { icon: <FaCalendarAlt />, name: "Events", link: "events" },
    { icon: <FaBook />, name: "Resources", link: "resources" },
    { icon: <FaChalkboardTeacher />, name: "Mentorship", link: "mentorship" },
    { icon: <FaPrayingHands />, name: "Prayer Wall", link: "prayer" },
    { icon: <FaNetworkWired />, name: "Alumni Network", link: "network" },
    { icon: <FaBriefcase />, name: "Career Hub", link: "career" },
    {
      icon: <FaGraduationCap />,
      name: "Certifications",
      link: "certifications",
    },
    { icon: <FaTrophy />, name: "Competitions", link: "competitions" },
    { icon: <FaHandsHelping />, name: "Community Service", link: "service" },
    { icon: <FaComments />, name: "Forums", link: "forums" },
  ];

  const NavLink = ({ item }: { item: (typeof navItems)[0] }) => (
    <Link key={item.name} href={`/user/${item.link}`}>
      <div
        className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-conces-blue-dark transition-colors ${
          pathname === `/user/${item.link}`
            ? "bg-conces-blue-dark text-white"
            : "text-gray-200"
        }`}
      >
        <div className="text-xl mr-3">{item.icon}</div>
        <span className="text-sm">{item.name}</span>
      </div>
    </Link>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-conces-blue z-50 flex items-center justify-between px-4 py-3 text-white">
        <div className="text-lg font-bold">CONCES</div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Menu"
        >
          {sidebarOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64 bg-conces-blue text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="hidden lg:flex p-4 items-center space-x-2 border-b border-conces-blue-dark">
          <div className="text-2xl font-bold">CONCES</div>
          <span className="text-xs bg-conces-gold text-conces-blue-dark px-2 py-1 rounded-full">
            MVP
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>
        </div>

        {/* Settings & Logout */}
        <div className="p-4 border-t border-conces-blue-dark space-y-2">
          <Link href="/user/settings">
            <div
              className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-conces-blue-dark transition-colors ${
                pathname === "/user/settings"
                  ? "bg-conces-blue-dark text-white"
                  : "text-gray-200"
              }`}
            >
              <FaCog className="text-xl mr-3" />
              <span className="text-sm">Settings</span>
            </div>
          </Link>
          <Link href="/user/logout">
            <div
              className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-conces-blue-dark transition-colors ${
                pathname === "/user/logout"
                  ? "bg-conces-blue-dark text-white"
                  : "text-gray-200"
              }`}
            >
              <FaSignOutAlt className="text-xl mr-3" />
              <span className="text-sm">Logout</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-1 pt-20 lg:pt-6">
        <div className="bg-white text-gray-900 shadow p-4 rounded-lg min-h-[300px]">
          <SessionProvider>
            <SocketProvider>{children}</SocketProvider>
          </SessionProvider>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
