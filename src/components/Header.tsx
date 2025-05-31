"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Events", href: "/events" },
  {
    name:"Community",
    href:"/community"
  },

  { name: "Resources", href: "/resources" },

  {
    name: "Alumni",
    href: "/alumni",
  },
];
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAdmin,setIsAdmin] = useState(false)
  const pathname = usePathname()
  const [path, setPath] = useState(false)

  useEffect(()=>{

    const admin = pathname.startsWith("/admin");
    if(admin){
      setIsAdmin(true)
    }
    const home = pathname === "/";
    if(home){
      setPath(true)}



  },[pathname])
  
   const notHome = pathname.length >2

    console.log(notHome)


  return (
    <header className={` bg-white ${path && "bg-royal-DEFAULT"} shadow-md sticky top-0 z-50 ${isAdmin ? "hidden" : ""}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="flex items-center cursor-pointer">
              <div className="h-10 w-10 bg-primary-dark rounded-full flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="ml-2 text-xl font-bold text-primary-dark">
                CONCES
              </span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`px-3 py-2 rounded-md ${pathname == link.href? "bg-primary-light":""} text-sm font-medium text-gray-900 hover:bg-primary-light hover:text-white cursor-pointer`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="/auth"
              className="px-4 py-2 rounded-md text-sm font-medium text-primary-dark border border-primary-dark hover:bg-primary-light hover:text-white hover:border-primary-light cursor-pointer"
            >
              Login
            </a>
            <a
              href="/auth"
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-dark hover:bg-primary cursor-pointer"
            >
              Join Now
            </a>
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
        {mobileMenuOpen && (
          <div className="mt-4 lg:hidden bg-white border-t pt-4 space-y-2">
            {navLinks.map((link, index) => (
              <div key={index} className="px-2">
               { (
                  <Link
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="mt-4 flex flex-col items-stretch space-y-2 px-2">
              <a
                href="/auth"
                className="text-primary-dark border border-primary-dark px-4 py-2 rounded-md text-sm text-center"
              >
                Login
              </a>
              <a
                href="/auth"
                className="bg-primary-dark text-white px-4 py-2 rounded-md text-sm text-center"
              >
                Join Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
