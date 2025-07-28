"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  User,
  Users,
  MessageSquare,
  Briefcase,
  Calendar,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/alumni", icon: Home },
  { name: "Profile", href: "/alumni/profile", icon: User },
  { name: "Mentorship", href: "/alumni/mentorship", icon: Briefcase },
  { name: "Talks", href: "/alumni/talks", icon: Calendar },
  { name: "Network", href: "/alumni/network", icon: Users },
  { name: "Messages", href: "/alumni/messages", icon: MessageSquare },
  { name: "Settings", href: "/alumni/settings", icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-royal-DEFAULT border-b border-gold-DEFAULT shadow-md md:hidden flex items-center justify-between px-4 h-14">
        <h1 className="text-xl font-bold text-gold-light">
          Alumni Portal
        </h1>
        <button onClick={() => setIsMobileNavOpen(true)}>
          <Menu className="h-6 w-6 text-gold-light" />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobileNavOpen && (
        <>
          <div
            className="fixed inset-0 bg-conces-blue bg-opacity-80 z-40"
            onClick={() => setIsMobileNavOpen(false)}
          ></div>
          <aside className="fixed z-50 top-0 left-0 w-64 h-full bg-royal-DEFAULT shadow-lg p-4 animate-slide-in transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gold-light">
                Menu
              </h2>
              <button onClick={() => setIsMobileNavOpen(false)}>
                <X className="h-5 w-5 text-gold-light" />
              </button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    pathname === item.href
                      ? "bg-gold-DEFAULT text-conces-blue"
                      : "text-white hover:bg-royal-light"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-gradient-to-b from-conces-blue to-royal-DEFAULT">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gold-DEFAULT">
          <h1 className="text-xl font-bold text-gold-light">
            Alumni Portal
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg text-sm font-medium mx-2",
                  pathname === item.href
                    ? "bg-gold-DEFAULT text-conces-blue font-bold"
                    : "text-white hover:bg-royal-light/80"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gold-DEFAULT">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gold-DEFAULT flex items-center justify-center">
              <span className="text-conces-blue font-bold">AU</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-gold-light">
                Alumni User
              </p>
              <p className="text-xs text-gold-light/80">View profile</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
