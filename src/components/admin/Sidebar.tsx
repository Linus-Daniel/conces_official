"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUsers,
  FaPray,
  FaStore,
  FaMapMarkerAlt,
  FaBook,
  FaCalendarAlt,
  FaCog,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaCrown,
  FaUserGraduate,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { IoLibrarySharp } from "react-icons/io5";
import { GiBrain } from "react-icons/gi";
import { LucideBrainCircuit } from "lucide-react";

type AdminSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const menuItems = [
  { link: "/admin", label: "Dashboard", icon: FaHome },
  { link: "/admin/users", label: "Users", icon: FaUsers },
  { link: "/admin/alumni", label: "Alumni", icon: FaUserGraduate },

  { link: "/admin/prayers", label: "Prayer Wall", icon: FaPray },
  {
    label: "Store",
    icon: FaStore,
    subItems: [
      { link: "/admin/store/shop", label: "Shop" },

      { link: "/admin/store/products", label: "Products" },
      { link: "/admin/store/categories", label: "Categories" },
      { link: "/admin/store/orders", label: "Orders" },
    ],
  },
  {
    label: "Talent Hub",
    icon:GiBrain,
    subItems: [
      { link: "/admin/hub/overview", label: "Dashboard" },

      { link: "/admin/hub/users", label: "Talent " },
      { link: "/admin/hub/skills", label: "Skills" },
    ],
  },
  { link: "/admin/chapters", label: "Chapters", icon: FaMapMarkerAlt },
  { link: "/admin/resources", label: "Resources", icon: IoLibrarySharp },
  { link: "/admin/mentorship", label: "Mentorship", icon: FaBook },
  { link: "/admin/executives", label: "Executives", icon: FaCrown },

  { link: "/admin/events", label: "Events", icon: FaCalendarAlt },
  { link: "/admin/settings", label: "Settings", icon: FaCog },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Fix hydration by checking client-side only
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isActive = (link: string) => pathname === link;
  const isStoreActive = menuItems.find(
    (item) =>
      item.link === "/admin/store" ||
      (item.subItems && item.subItems.some((subItem) => isActive(subItem.link)))
  );

  if (!isClient) return null;

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-30 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-royal-DEFAULT">CONCES Admin</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-royal-DEFAULT"
            aria-label="Close Sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-royal-DEFAULT text-white p-2 rounded-full">
              <FaUsers className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-800 font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isCurrentOpen = openDropdown === item.label;
              const isItemActive = item.link
                ? isActive(item.link)
                : item.subItems &&
                  item.subItems.some((subItem) => isActive(subItem.link));

              if (hasSubItems) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition ${
                        isItemActive
                          ? "bg-royal-DEFAULT text-white"
                          : "text-gray-700 hover:bg-royal-50 hover:text-royal-DEFAULT"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="text-lg" />
                        <span>{item.label}</span>
                      </div>
                      {isCurrentOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    {isCurrentOpen && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.subItems?.map((subItem) => (
                          <li key={subItem.link}>
                            <Link
                              href={subItem.link}
                              onClick={() => setSidebarOpen(false)}
                              className={`block px-3 py-2 text-sm rounded transition ${
                                isActive(subItem.link)
                                  ? "text-royal-DEFAULT font-medium"
                                  : "text-gray-600 hover:text-royal-DEFAULT"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.link}>
                  <Link
                    href={item.link!}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition w-full ${
                      isActive(item.link!)
                        ? "bg-royal-DEFAULT text-white"
                        : "text-gray-700 hover:bg-royal-50 hover:text-royal-DEFAULT"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
