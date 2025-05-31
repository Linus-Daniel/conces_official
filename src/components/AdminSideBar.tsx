import { ChartBarIcon, CogIcon, LogOut, ShoppingBagIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {
    handleLogout:()=>void
}


const AdminSideBar = ({ handleLogout }:Props) => {

const pathname = usePathname()
  const navItems = [
    { name: "Dashboard", icon: ChartBarIcon, link: "/admin/store" },
    { name: "Products", icon: ShoppingBagIcon, link: "/admin/store/products" },
    { name: "Orders", icon: ShoppingBagIcon, link: "/admin/store/orders" },
    { name: "Customers", icon: UsersIcon, link: "/admin/store/customers" },
    { name: "Settings", icon: CogIcon, link: "/admin/store/settings" },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => (
          <Link href={item.link}
            key={item.name}
            className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full ${
              pathname=== item.link
                ? "bg-royal-DEFAULT/10 text-royal-DEFAULT"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon
              className={`mr-3 h-5 w-5 ${
                pathname === item.link
                  ? "text-royal-DEFAULT"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="px-2 py-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar