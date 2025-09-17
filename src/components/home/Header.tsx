"use client";

import { Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { User as UserInfo } from "next-auth";
import useAuthStore from "@/zustand/authStore";
import Image from "next/image";

// ------------------ Config ------------------
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Events", href: "/events" },
  { name: "Community", href: "/community" },
  { name: "Resources", href: "/resources" },
  { name: "Alumni", href: "/alumni" },
  { name: "Testimony", href: "/testimony" },
  { name: "Gallery", href: "/gallery" },
  { name: "Executives", href: "/executives" },
];

const authLinks = [
  {
    name: "Login",
    href: "/auth?mode=login",
    className:
      "px-4 py-2 rounded-md text-sm font-medium text-primary-dark border border-primary-dark hover:bg-primary-light hover:text-white",
  },
  {
    name: "Join Now",
    href: "/auth?mode=signup",
    className:
      "px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-dark hover:bg-primary",
  },
];

const getDashboardUrl = (role?: string) => {
  const map: Record<string, string> = {
    admin: "/admin/",
    alumni: "/alumni/dashboard",
    "chapter-admin": "/chapter",
    student: "/user/",
  };
  return map[role ?? ""] || "/";
};

// ------------------ Header ------------------
function Header({ user }: { user: (UserInfo & { role?: string }) | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (openDropdown && !(e.target as Element).closest(".user-dropdown")) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-14 w-14 p-1 bg-primary-dark rounded-full flex items-center justify-center">
              <Image src="/images/logo.png" alt="logo" width={70} height={70} />
            </div>
            <span className="ml-2 text-xl font-bold text-primary-dark">
              CONCES
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href
                    ? "bg-primary-light text-white"
                    : "text-gray-900 hover:bg-primary-light hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth / User */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <User className="text-gray-700" />
                </button>
                {openDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm text-blue-500 font-medium">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      href={getDashboardUrl(user.role)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={link.className}
                >
                  {link.name}
                </Link>
              ))
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <Menu />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="flex flex-col h-full p-4 overflow-y-auto">
            <div className="mb-8 flex justify-between items-center">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="h-10 w-10 bg-primary-dark rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <span className="ml-2 text-xl font-bold text-primary-dark">
                  CONCES
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-medium mb-1 ${
                    pathname === link.href
                      ? "bg-primary-light text-white"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-4 border-t">
              {user ? (
                <>
                  <div className="px-4 py-3 flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="text-gray-700 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href={getDashboardUrl(user.role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 mt-2 rounded-md text-sm font-medium text-primary-dark border border-primary-dark hover:bg-primary-light hover:text-white"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2 mt-2 rounded-md text-sm font-medium text-white bg-primary-dark hover:bg-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                authLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full text-center mt-2 ${link.className}`}
                  >
                    {link.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-bzlack/50 backdrop-blur-[1px] z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
