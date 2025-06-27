"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RoyalCartPage() {
  const [quantities, setQuantities] = useState([1, 2, 1]);

  const updateQuantity = (index: number, delta: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.max(1, newQuantities[index] + delta);
      return newQuantities;
    });
  };

  return (
    <div className="min-h-screen bg-royal-50">
     

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-royal-900">
                  Your Cart (3 items)
                </h2>
                <Link href="#" className="text-gold-600 hover:text-gold-800 font-medium">
                  Continue Shopping
                </Link>
              </div>
              {["Royal Blue Velvet Cushion", "Gold Embroidered Throw Pillow", "Regal Table Runner"].map((title, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row gap-4 py-6 ${i < 2 ? "border-b border-gray-200" : ""}`}
                >
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src="https://via.placeholder.com/150"
                      alt="Product"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-royal-900">{title}</h3>
                      <p className="text-lg font-bold text-royal-900">
                        ${[49.99, 59.99, 39.99][i]}
                      </p>
                    </div>
                    <p className="text-gray-600 mt-1">
                      Color: {["Royal Blue", "Gold", "Royal Blue & Gold"][i]}
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => updateQuantity(i, -1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300">
                          {quantities[i]}
                        </span>
                        <button
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => updateQuantity(i, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button className="ml-4 text-royal-600 hover:text-royal-800">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-royal-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">$199.96</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$9.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$15.99</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-royal-900">Total</span>
                  <span className="text-lg font-bold text-royal-900">$225.94</span>
                </div>
              </div>
              <Link href={"/store/checkout"} className="mt-6 flex items-center justify-center w-full bg-gold-DEFAULT hover:bg-gold-600 text-white font-bold py-3 px-4 rounded-md transition duration-200">
                Proceed to Checkout
              </Link>
              <div className="mt-4 text-center text-sm text-gray-500">
                or <Link href="/" className="text-royal-600 hover:text-royal-800">continue shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
