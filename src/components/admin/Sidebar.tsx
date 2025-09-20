"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
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
  FaChevronRight,
  FaCrown,
  FaUserGraduate,
  FaBlog,
  FaSearch,
  FaBars,
  FaSignOutAlt,
  FaUserCircle,
  FaBell,
  FaShoppingCart,
  FaBox,
  FaTags,
  FaChartLine,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import { GiBrain } from "react-icons/gi";
import { FaPhotoFilm } from "react-icons/fa6";

// Types (same as before)
interface SubMenuItem {
  link: string;
  label: string;
  icon?: React.ElementType;
  badge?: number;
}

interface MenuItem {
  link?: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  subItems?: SubMenuItem[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// Menu configuration (same as before)
const menuItems: MenuItem[] = [
  {
    link: "/admin",
    label: "Dashboard",
    icon: FaHome,
    badge: 3,
  },
  {
    link: "/admin/users",
    label: "Users",
    icon: FaUsers,
  },
  {
    link: "/admin/alumni",
    label: "Alumni",
    icon: FaUserGraduate,
  },
  {
    link: "/admin/prayers",
    label: "Prayer Wall",
    icon: FaPray,
    badge: 7,
  },
  {
    label: "Store",
    icon: FaStore,
    subItems: [
      { link: "/admin/store/shop", label: "Shop", icon: FaShoppingCart },
      { link: "/admin/store/products", label: "Products", icon: FaBox },
      { link: "/admin/store/categories", label: "Categories", icon: FaTags },
      { link: "/admin/store/orders", label: "Orders", badge: 12 },
    ],
  },
  {
    label: "Talent Hub",
    icon: GiBrain,
    subItems: [
      { link: "/admin/hub/overview", label: "Dashboard", icon: FaChartLine },
      { link: "/admin/hub/users", label: "Talent Pool" },
      { link: "/admin/hub/skills", label: "Skills" },
    ],
  },
  { link: "/admin/chapters", label: "Chapters", icon: FaMapMarkerAlt },
  { link: "/admin/gallery", label: "Gallery", icon: FaPhotoFilm },
  { link: "/admin/resources", label: "Resources", icon: IoLibrarySharp },
  { link: "/admin/blogs", label: "Blogs", icon: FaBlog },
  { link: "/admin/mentorship", label: "Mentorship", icon: FaBook },
  { link: "/admin/executives", label: "Executives", icon: FaCrown },
  { link: "/admin/events", label: "Events", icon: FaCalendarAlt },
];

const bottomMenuItems: MenuItem[] = [
  { link: "/admin/settings", label: "Settings", icon: FaCog },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Auto-open active dropdowns on mount
  useEffect(() => {
    const activeDropdowns = new Set<string>();
    menuItems.forEach((item) => {
      if (item.subItems?.some((sub) => pathname.startsWith(sub.link))) {
        activeDropdowns.add(item.label);
      }
    });
    setOpenDropdowns(activeDropdowns);
  }, [pathname]);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const isActive = (link: string) => {
    if (link === "/admin") return pathname === "/admin";
    return pathname.startsWith(link);
  };

  const filteredMenuItems = useMemo(() => {
    if (!searchQuery) return menuItems;

    const query = searchQuery.toLowerCase();
    return menuItems.filter((item) => {
      const matchesMain = item.label.toLowerCase().includes(query);
      const matchesSub = item.subItems?.some((sub) =>
        sub.label.toLowerCase().includes(query)
      );
      return matchesMain || matchesSub;
    });
  }, [searchQuery]);

  const totalNotifications = menuItems.reduce((acc, item) => {
    const itemBadge = item.badge || 0;
    const subBadges =
      item.subItems?.reduce((subAcc, sub) => subAcc + (sub.badge || 0), 0) || 0;
    return acc + itemBadge + subBadges;
  }, 0);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? "4.5rem" : "16rem",
          x: sidebarOpen ? 0 : -256,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`
          fixed top-0 left-0 h-full z-50 
          bg-gradient-to-b from-royal-800 to-royal-900 
          shadow-2xl flex flex-col
          lg:translate-x-63 lg:static
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } p-4 border-b border-royal-700/50`}
        >
          {!isCollapsed && (
            <motion.div
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              className="flex items-center gap-2"
            >
              <h2 className="text-xl font-bold text-white">CONCES</h2>
              {totalNotifications > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalNotifications}
                </span>
              )}
            </motion.div>
          )}

          {/* Collapse/Expand Button - Always Visible */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`
              hidden lg:flex items-center justify-center
              text-royal-300 hover:text-white hover:bg-royal-700/50
              transition-all rounded-lg p-2
              ${isCollapsed ? "w-10 h-10" : "w-8 h-8"}
            `}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? (
              <FaAngleDoubleRight className="text-lg" />
            ) : (
              <FaAngleDoubleLeft className="text-lg" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-royal-300 hover:text-white transition-colors p-1"
            aria-label="Close Sidebar"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* User Section */}
        <div className="relative p-4 border-b border-royal-700/50">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`
              w-full flex items-center gap-3 
              hover:bg-royal-700/30 rounded-lg p-2 transition-colors
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-white text-2xl" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-royal-800"></div>
            </div>

            {!isCollapsed && (
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-royal-300">Administrator</p>
              </div>
            )}
          </button>
        </div>

        {/* Search Bar
        {!isCollapsed && (
          <div className="p-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-royal-400 text-sm" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-royal-700/50 text-white placeholder-royal-400 pl-9 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
              />
            </div>
          </div>
        )} */}

        {/* Main Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
          }}
        >
          <style jsx>{`
            nav::-webkit-scrollbar {
              width: 6px;
            }
            nav::-webkit-scrollbar-track {
              background: transparent;
            }
            nav::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.2);
              border-radius: 3px;
            }
            nav::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          `}</style>
          <ul className="space-y-1">
            {filteredMenuItems.map((item) => (
              <SidebarMenuItem
                key={item.label}
                item={item}
                isActive={isActive}
                isCollapsed={isCollapsed}
                isDropdownOpen={openDropdowns.has(item.label)}
                onToggleDropdown={() => toggleDropdown(item.label)}
                onCloseSidebar={() => setSidebarOpen(false)}
                pathname={pathname}
              />
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-royal-700/50 p-3">
          <ul className="space-y-1">
            {bottomMenuItems.map((item) => (
              <SidebarMenuItem
                key={item.label}
                item={item}
                isActive={isActive}
                isCollapsed={isCollapsed}
                isDropdownOpen={false}
                onToggleDropdown={() => {}}
                onCloseSidebar={() => setSidebarOpen(false)}
                pathname={pathname}
              />
            ))}
          </ul>
        </div>
      </motion.aside>
    </>
  );
}

// SidebarMenuItem component remains the same as before
function SidebarMenuItem({
  item,
  isActive,
  isCollapsed,
  isDropdownOpen,
  onToggleDropdown,
  onCloseSidebar,
  pathname,
}: {
  item: MenuItem;
  isActive: (link: string) => boolean;
  isCollapsed: boolean;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  onCloseSidebar: () => void;
  pathname: string;
}) {
  const Icon = item.icon;
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isItemActive = item.link
    ? isActive(item.link)
    : item.subItems?.some((sub) => isActive(sub.link));

  if (hasSubItems) {
    return (
      <li>
        <button
          onClick={onToggleDropdown}
          className={`
            relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
            ${isCollapsed ? "justify-center" : ""}
            ${
              isItemActive
                ? "bg-gold-400 text-royal-900 shadow-lg"
                : "text-royal-100 hover:bg-royal-700/50 hover:text-white"
            }
          `}
        >
          <Icon className="text-lg flex-shrink-0" />

          {!isCollapsed && (
            <>
              <span className="flex-1 text-left font-medium text-sm">
                {item.label}
              </span>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              <FaChevronRight
                className={`text-sm transition-transform ${
                  isDropdownOpen ? "rotate-90" : ""
                }`}
              />
            </>
          )}

          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-royal-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              {item.label}
            </div>
          )}
        </button>

        {/* Dropdown Items */}
        <AnimatePresence>
          {isDropdownOpen && !isCollapsed && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1 ml-4 pl-4 border-l-2 border-royal-700/50 space-y-1 overflow-hidden"
            >
              {item.subItems?.map((subItem) => {
                const SubIcon = subItem.icon;
                return (
                  <li key={subItem.link}>
                    <Link
                      href={subItem.link}
                      onClick={onCloseSidebar}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                        ${
                          isActive(subItem.link)
                            ? "bg-gold-400/20 text-gold-300 font-medium"
                            : "text-royal-300 hover:bg-royal-700/30 hover:text-white"
                        }
                      `}
                    >
                      {SubIcon && <SubIcon className="text-xs" />}
                      <span>{subItem.label}</span>
                      {subItem.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {subItem.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  }

  // Regular menu item
  return (
    <li>
      <Link
        href={item.link!}
        onClick={onCloseSidebar}
        className={`
          relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
          ${isCollapsed ? "justify-center" : ""}
          ${
            isActive(item.link!)
              ? "bg-gold-400 text-royal-900 shadow-lg font-medium"
              : "text-royal-100 hover:bg-royal-700/50 hover:text-white"
          }
        `}
      >
        <Icon className="text-lg flex-shrink-0" />

        {!isCollapsed && (
          <>
            <span className="flex-1 text-sm">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">
                {item.badge}
              </span>
            )}
          </>
        )}

        {/* Active indicator */}
        {isActive(item.link!) && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold-400 rounded-r"
          />
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-royal-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {item.label}
            {item.badge && (
              <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
        )}
      </Link>
    </li>
  );
}
