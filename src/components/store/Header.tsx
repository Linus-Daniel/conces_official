'use client';

import { FaUser, FaSearch, FaHeart, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import SearchInput from './Search';
import CartIcon from './CartIcon';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <p className="text-sm text-royal-DEFAULT font-medium">
              Free shipping on orders over $50
            </p>
          </div>
          <div className="hidden md:flex space-x-4 text-sm">
            <span className="flex items-center hover:text-royal-DEFAULT cursor-pointer">
              <FaUser className="mr-1" /> Login / Register
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-royal-DEFAULT mr-8">
              CONCES
            </Link>
            <nav className="hidden lg:flex space-x-6">
              <Link href="/" className="font-medium hover:text-royal-DEFAULT text-royal-dark">
                Home
              </Link>
              <Link href="/store" className="font-medium hover:text-royal-DEFAULT text-royal-dark">
                Apparel
              </Link>
              {/* Add other nav links */}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <SearchInput />
            </div>

            <button className="p-2">
              <FaHeart className="text-xl text-gray-700 hover:text-royal-DEFAULT" />
            </button>

            <CartIcon />

            <button className="lg:hidden">
              <FaBars className="text-xl text-gray-700" />
            </button>
          </div>
        </div>

        <div className="block md:hidden pb-4">
          <SearchInput mobile />
        </div>
      </div>
    </header>
  );
}