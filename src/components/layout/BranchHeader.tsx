'use client';

import { useEffect, useState } from 'react';
import { Bell, Building, ChevronDown, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import api from '@/lib/axiosInstance';

interface Branch {
  _id: string;
  branchName: string;
  location?: string;
  // Add other fields if needed
}

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [branch, setBranch] = useState<Branch | null>(null);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    let isMounted = true;

    const fetchBranch = async () => {
      if (!user?.branch) return;

      try {
        const response = await api.get(`/branch/${user.branch}`);
        const branchusers = await api.get(`branch-users/branch?branch=default-branch`)
        console.log(branchusers.data)
        if (isMounted) {
          setBranch(response.data.branch); // Assumes response shape: { branch: {...} }
        }
      } catch (error) {
        console.error('Error fetching branch:', error);
      }
    };

    fetchBranch();

    return () => {
      isMounted = false;
    };
  }, [user?.branch]);

  console.log(branch)

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between gap-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center mr-2">
            <Building className="text-white w-3.5 h-3.5" />
          </div>
          <h1 className="text-lg font-bold text-gray-800">
            {branch?.branchName}
          </h1>
        </div>
      </div>

      {/* Center Section */}
      <div className="hidden md:flex items-center px-4 py-2 bg-blue-800/10 rounded-full text-blue-800 text-sm">
        "For we are God's handiwork" - Ephesians 2:10
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            className="flex items-center gap-2"
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100">
              <Image
                src="/images/avatar.jpg"
                alt="Profile Avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700">
              {user?.name || 'Engr. Chinedu'}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-gray-500 transition-transform ${
                isProfileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
              <div className="py-1">
                {['Profile', 'Settings', 'Logout'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
