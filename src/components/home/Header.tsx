"use client";

import { Menu, User, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { User as UserInfo } from "next-auth";
import useAuthStore from "@/zustand/authStore";
import Image from "next/image";

// ------------------ Types ------------------
interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

interface DropdownSection {
  name: string;
  items: NavLink[];
}

interface AuthLink extends NavLink {
  className: string;
}

interface ExtendedUser extends UserInfo {
  role: string;
}

// ------------------ Constants ------------------
const MAIN_NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  {name:"Contact us",href:"/contact-us"}
];

const DROPDOWN_SECTIONS: DropdownSection[] = [
  {
    name: "Community",
    items: [
      { name: "Community Hub", href: "/community" },
      { name: "Blog", href: "/blog" },
      { name: "Testimony", href: "/testimony" },
      { name: "Gallery", href: "/gallery" },
    ],
  },
  {
    name: "Members",
    items: [
      { name: "Alumni", href: "/alumni" },
      { name: "Executives", href: "/executives" },
      {
        name: "Talent Hub",
        href: "https://www.talenthub.conces.org",
        external: true,
      },
    ],
  },
  {
    name: "Resources",
    items: [
      { name: "Resources", href: "/resources" },
      { name: "FAQs", href: "/faq" },
    ],
  },
];

const AUTH_LINKS: AuthLink[] = [
  {
    name: "Login",
    href: "/auth?mode=login",
    className: "btn-outline",
  },
  {
    name: "Join Now",
    href: "/auth?mode=signup",
    className: "btn-primary",
  },
];

const ROLE_DASHBOARD_MAP: Record<string, string> = {
  admin: "/admin/",
  alumni: "/alumni/dashboard",
  "chapter-admin": "/chapter",
  student: "/user/",
};

// ------------------ Utils ------------------
const getDashboardUrl = (role?: string): string => {
  return ROLE_DASHBOARD_MAP[role ?? ""] || "/";
};

const isActiveLink = (pathname: string, href: string): boolean => {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};

const isDropdownActive = (pathname: string, items: NavLink[]): boolean => {
  return items.some((item) => isActiveLink(pathname, item.href));
};

// ------------------ Sub Components ------------------
const Logo: React.FC = () => (
  <Link href="/" className="flex items-center group">
    <div className="h-14 w-14 p-1 bg-primary-dark rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-200">
      <Image
        src="/images/logo.png"
        alt="CONCES Logo"
        width={70}
        height={70}
        className="object-contain"
        priority
      />
    </div>
    <span className="ml-2 text-xl font-bold text-primary-dark group-hover:text-primary transition-colors duration-200">
      CONCES
    </span>
  </Link>
);

interface DropdownProps {
  section: DropdownSection;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  section,
  pathname,
  isOpen,
  onToggle,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isActive = isDropdownActive(pathname, section.items);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent, href: string, external?: boolean) => {
      if (external) {
        // For external links, close immediately and let default behavior handle the navigation
        onClose();
        return;
      }

      // For internal links, prevent default and handle navigation manually
      e.preventDefault();

      // Close dropdown with a slight delay to ensure smooth animation
      setTimeout(() => {
        onClose();
      }, 100);

      // Navigate after dropdown starts closing
      setTimeout(() => {
        router.push(href);
      }, 50);
    },
    [router, onClose]
  );

  // Enhanced click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Don't close if clicking within the dropdown
      if (dropdownRef.current?.contains(target)) {
        return;
      }

      // Don't close if clicking on a link that's still navigating
      if (target.closest("a[href]")) {
        return;
      }

      if (isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      // Add delay to avoid immediate closing
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-primary-light text-white"
            : "text-gray-900 hover:bg-primary-light hover:text-white"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {section.name}
        <ChevronDown
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200">
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...(item.external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              onClick={(e) => handleLinkClick(e, item.href, item.external)}
              className={`block px-4 py-2 text-sm transition-colors duration-150 ${
                isActiveLink(pathname, item.href)
                  ? "bg-primary-light text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center justify-between">
                {item.name}
                {item.external && <span className="text-xs opacity-70">↗</span>}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

interface DesktopNavProps {
  pathname: string;
  openDropdown: string | null;
  onDropdownToggle: (name: string) => void;
  onDropdownClose: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  pathname,
  openDropdown,
  onDropdownToggle,
  onDropdownClose,
}) => (
  <nav className="hidden lg:flex items-center space-x-1" role="navigation">
    {/* Main navigation links */}
    {MAIN_NAV_LINKS.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          isActiveLink(pathname, link.href)
            ? "bg-primary-light text-white"
            : "text-gray-900 hover:bg-primary-light hover:text-white"
        }`}
        aria-current={isActiveLink(pathname, link.href) ? "page" : undefined}
      >
        {link.name}
      </Link>
    ))}

    {/* Dropdown sections */}
    {DROPDOWN_SECTIONS.map((section) => (
      <Dropdown
        key={section.name}
        section={section}
        pathname={pathname}
        isOpen={openDropdown === section.name}
        onToggle={() => onDropdownToggle(section.name)}
        onClose={onDropdownClose}
      />
    ))}
  </nav>
);

interface UserDropdownProps {
  user: ExtendedUser;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  user,
  isOpen,
  onToggle,
  onClose,
}) => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = useCallback(() => {
    onClose();
    logout();
  }, [logout, onClose]);

  const handleProfileClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      setTimeout(() => {
        onClose();
      }, 100);

      setTimeout(() => {
        router.push(getDashboardUrl(user.role));
      }, 50);
    },
    [router, user.role, onClose]
  );

  // Enhanced click outside detection for user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (dropdownRef.current?.contains(target)) {
        return;
      }

      if (isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  return (
    <div className="relative user-dropdown" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <User className="h-5 w-5 text-gray-700" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-primary font-medium truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <Link
            href={getDashboardUrl(user.role)}
            onClick={handleProfileClick}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

interface DesktopAuthProps {
  user: ExtendedUser | null;
  dropdownOpen: boolean;
  onDropdownToggle: () => void;
  onDropdownClose: () => void;
}

const DesktopAuth: React.FC<DesktopAuthProps> = ({
  user,
  dropdownOpen,
  onDropdownToggle,
  onDropdownClose,
}) => (
  <div className="hidden lg:flex items-center space-x-3">
    {user ? (
      <UserDropdown
        user={user}
        isOpen={dropdownOpen}
        onToggle={onDropdownToggle}
        onClose={onDropdownClose}
      />
    ) : (
      AUTH_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            link.className === "btn-outline"
              ? "text-primary-dark border border-primary-dark hover:bg-primary-light hover:text-white"
              : "text-white bg-primary-dark hover:bg-primary hover:shadow-md transform hover:scale-105"
          }`}
        >
          {link.name}
        </Link>
      ))
    )}
  </div>
);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  user: ExtendedUser | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  pathname,
  user,
}) => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null
  );

  const handleLogout = useCallback(() => {
    onClose();
    logout();
  }, [logout, onClose]);

  const handleMobileSectionToggle = (sectionName: string) => {
    setOpenMobileSection((prev) => (prev === sectionName ? null : sectionName));
  };

  const handleMobileLinkClick = useCallback(
    (e: React.MouseEvent, href: string, external?: boolean) => {
      if (external) {
        onClose();
        return;
      }

      e.preventDefault();

      // Close mobile section and menu
      setOpenMobileSection(null);

      setTimeout(() => {
        onClose();
      }, 100);

      setTimeout(() => {
        router.push(href);
      }, 200);
    },
    [router, onClose]
  );

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Reset mobile section state when menu closes
  useEffect(() => {
    if (!isOpen) {
      setOpenMobileSection(null);
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full p-4 overflow-y-auto">
          {/* Header */}
          <div className="mb-6 flex justify-between items-center">
            <Logo />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1" role="navigation">
            {/* Main navigation links */}
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleMobileLinkClick(e, link.href)}
                className={`block px-4 py-3 rounded-md text-sm font-medium mb-1 transition-all duration-200 ${
                  isActiveLink(pathname, link.href)
                    ? "bg-primary-light text-white"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
                aria-current={
                  isActiveLink(pathname, link.href) ? "page" : undefined
                }
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile dropdown sections */}
            {DROPDOWN_SECTIONS.map((section) => {
              const sectionActive = isDropdownActive(pathname, section.items);
              const isExpanded = openMobileSection === section.name;

              return (
                <div key={section.name} className="mb-1">
                  <button
                    onClick={() => handleMobileSectionToggle(section.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      sectionActive
                        ? "bg-primary-light text-white"
                        : "text-gray-900 hover:bg-gray-100"
                    }`}
                    aria-expanded={isExpanded}
                  >
                    {section.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-1 duration-200">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          {...(item.external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                          onClick={(e) =>
                            handleMobileLinkClick(e, item.href, item.external)
                          }
                          className={`block px-4 py-2 rounded-md text-sm transition-all duration-200 ${
                            isActiveLink(pathname, item.href)
                              ? "bg-primary text-white"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          aria-current={
                            isActiveLink(pathname, item.href)
                              ? "page"
                              : undefined
                          }
                        >
                          <span className="flex items-center justify-between">
                            {item.name}
                            {item.external && (
                              <span className="text-xs opacity-70">↗</span>
                            )}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            {user ? (
              <>
                <div className="px-4 py-3 flex items-center space-x-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="text-gray-700 h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Link
                  href={getDashboardUrl(user.role)}
                  onClick={(e) =>
                    handleMobileLinkClick(e, getDashboardUrl(user.role))
                  }
                  className="block w-full text-center px-4 py-2 mb-2 rounded-md text-sm font-medium text-primary-dark border border-primary-dark hover:bg-primary-light hover:text-white transition-all duration-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-dark hover:bg-primary transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              AUTH_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileLinkClick(e, link.href)}
                  className={`block w-full text-center mb-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    link.className === "btn-outline"
                      ? "text-primary-dark border border-primary-dark hover:bg-primary-light hover:text-white"
                      : "text-white bg-primary-dark hover:bg-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ------------------ Main Component ------------------
interface HeaderProps {
  user: ExtendedUser | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [openNavDropdown, setOpenNavDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleUserDropdownToggle = useCallback(() => {
    setUserDropdownOpen((prev) => !prev);
    // Close nav dropdown when user dropdown opens
    if (!userDropdownOpen) {
      setOpenNavDropdown(null);
    }
  }, [userDropdownOpen]);

  const handleUserDropdownClose = useCallback(() => {
    setUserDropdownOpen(false);
  }, []);

  const handleNavDropdownToggle = useCallback((name: string) => {
    setOpenNavDropdown((prev) => (prev === name ? null : name));
    // Close user dropdown when nav dropdown opens
    setUserDropdownOpen(false);
  }, []);

  const handleNavDropdownClose = useCallback(() => {
    setOpenNavDropdown(null);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenNavDropdown(null);
    setUserDropdownOpen(false);
  }, [pathname]);

  // Global click outside handler with improved logic
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as Element;

      // Don't interfere with dropdown internal handling
      if (target.closest(".relative")) {
        return;
      }

      // Close all dropdowns if clicking outside any dropdown area
      if (
        !target.closest('[role="navigation"]') &&
        !target.closest(".user-dropdown")
      ) {
        setUserDropdownOpen(false);
        setOpenNavDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleGlobalClick);
    return () => document.removeEventListener("mousedown", handleGlobalClick);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />

          <DesktopNav
            pathname={pathname}
            openDropdown={openNavDropdown}
            onDropdownToggle={handleNavDropdownToggle}
            onDropdownClose={handleNavDropdownClose}
          />

          <DesktopAuth
            user={user}
            dropdownOpen={userDropdownOpen}
            onDropdownToggle={handleUserDropdownToggle}
            onDropdownClose={handleUserDropdownClose}
          />

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={handleMobileMenuToggle}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        pathname={pathname}
        user={user}
      />
    </header>
  );
};

export default Header;
