"use client";

import useCart from "@/zustand/useCart";
import CartItemCard from "@/components/store/CartItemCard";
import Link from "next/link";

export default function RoyalCartPage() {
  const { cart } = useCart();
  const { items, total } = cart;

  const shipping = 9.99;
  const tax = 15.99;
  const grandTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-royal-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-royal-900">
                  Your Cart ({items.length})
                </h2>
                <Link
                  href="/store"
                  className="text-gold-600 hover:text-gold-800 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
              {items.length > 0 ? (
                items.map((item) => <CartItemCard key={item.product._id} item={item} />)
              ) : (
                <p className="text-gray-500">Your cart is empty.</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-royal-900 mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-royal-900">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/store/checkout"
                className="mt-6 block w-full bg-gold-DEFAULT hover:bg-gold-600 text-white font-bold py-3 px-4 rounded-md text-center transition duration-200"
              >
                Proceed to Checkout
              </Link>
              <div className="mt-4 text-center text-sm text-gray-500">
                or{" "}
                <Link
                  href="/store"
                  className="text-royal-600 hover:text-royal-800"
                >
                  continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
