"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/zustand/authStore";
import {
  FaBars,
  FaSignOutAlt,
  FaUserCircle,
  FaBell,
  FaSearch,
  FaCog,
  FaChevronRight,
  FaHome,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import Image from "next/image";

type AdminHeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  time: string;
  read: boolean;
}

// Mock notifications - replace with real data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New User Registration",
    message: "John Doe just registered",
    type: "info",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Order Completed",
    message: "Order #12345 has been delivered",
    type: "success",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "System Update",
    message: "System maintenance scheduled",
    type: "warning",
    time: "2 hours ago",
    read: true,
  },
];

export default function AdminHeader({
  sidebarOpen,
  setSidebarOpen,
}: AdminHeaderProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      const href = "/" + paths.slice(0, index + 1).join("/");
      const label =
        path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      return { label, href, isLast: index === paths.length - 1 };
    });
  };

  const breadcrumbs = generateBreadcrumbs();
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex-row-reverse flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-royal-600 hover:bg-royal-50 transition-all lg:hidden"
              aria-label="Toggle Sidebar"
            >
              <FaBars className="text-xl" />
            </button>

            {/* Logo/Title for Mobile */}
            <div className="lg:hidden">
              <h1 className="text-lg font-bold text-royal-700">CONCES</h1>
            </div>

            {/* Greeting and Page Title for Desktop */}
            <div className="hidden lg:block">
              <p className="text-sm text-gray-500">
                {getGreeting()}, {user?.name?.split(" ")[0]}!
              </p>
            </div>
          </div>


        {/* Breadcrumb Navigation */}
        <div className="hidden lg:flex items-center gap-1 text-sm py-2 text-gray-600">
          <FaHome className="text-xs" />
          {breadcrumbs.map((crumb, index) => (
            <Fragment key={index}>
              <FaChevronRight className="text-xs mx-1" />
              {crumb.isLast ? (
                <span className="text-gray-900 font-medium">{crumb.label}</span>
              ) : (
                <button
                  onClick={() => router.push(crumb.href)}
                  className="hover:text-royal-600 transition-colors"
                >
                  {crumb.label}
                </button>
              )}
            </Fragment>
          ))}
        </div>
        </div>
      </div>
    </header>
  );
}

// Menu Item Component
function MenuItem({
  icon: Icon,
  label,
  badge,
  onClick,
  className = "",
}: {
  icon: React.ElementType;
  label: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors ${className}`}
    >
      <Icon className="text-gray-400" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}
