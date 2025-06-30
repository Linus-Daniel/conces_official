"use client";

import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '@/zustand/useCart';

export default function CartIcon() {
  const { cart } = useCart();
  const itemCount = cart?.items?.length || 0;

  return (
    <Link href="/store/cart" className="relative inline-block p-2">
      <FaShoppingCart className="text-2xl text-gray-700 hover:text-royal-DEFAULT" />
      <span
        className={`absolute top-1 right-2 transform translate-x-1/2 -translate-y-1/2
          text-white text-[0.65rem] font-medium rounded-full h-5 w-5 flex items-center justify-center
          ${itemCount > 0 ? 'bg-royal-DEFAULT' : 'bg-gray-300'}`}
      >
        {itemCount}
      </span>
    </Link>
  );
}
