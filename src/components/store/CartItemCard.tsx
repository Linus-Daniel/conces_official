"use client";

import Image from "next/image";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import useCart from "@/zustand/useCart";



export default function CartItemCard({ item }:any) {
  const { updateQuantity, removeFromCart } = useCart();

  const increment = () => {
    if (item.quantity < item.product.stock) {
      updateQuantity(item.product._id, item.quantity + 1);
    }
  };

  const decrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product._id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.product._id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-200">
      <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
        <Image
          src={item.product.images?.[0] || "/images/fallback.jpg"}
          alt={item.product.name}
          width={150}
          height={150}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium text-royal-900">{item.product.name}</h3>
          <p className="text-lg font-bold text-royal-900">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="mt-4 flex items-center">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={decrement}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              <FaMinus />
            </button>
            <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
            <button
              onClick={increment}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              <FaPlus />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="ml-4 text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
          >
            <FaTrash /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}
