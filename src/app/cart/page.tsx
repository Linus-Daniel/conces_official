"use client"
import React, { useState } from 'react';
import CartItem from '@/components/CartItems';
import Link from 'next/link';

interface CartItemType {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface CartType {
  items: CartItemType[];
  total: number;
}

export default function CartPage() {
  // Example initial cart state
  const [cart, setCart] = useState<CartType>({
    items: [
      { id: 1, name: 'Product 1', price: 29.99, quantity: 2 },
      { id: 2, name: 'Product 2', price: 15.5, quantity: 1 },
    ],
    total: 29.99 * 2 + 15.5 * 1,
  });

  // Update quantity handler
  function updateQuantity(id: string | number, newQuantity: number) {
    const updatedItems = cart.items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    setCart({ items: updatedItems, total: updatedTotal });
  }

  // Remove item handler
  function removeItem(id: string | number) {
    const filteredItems = cart.items.filter(item => item.id !== id);
    const updatedTotal = filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    setCart({ items: filteredItems, total: updatedTotal });
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-conces-blue mb-6">Your Cart</h1>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="mb-4">Your cart is empty</p>
          <Link href="/products" className="bg-conces-blue text-white px-4 py-2 rounded hover:bg-conces-blue-dark">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-conces-blue mb-6">Your Cart</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {cart.items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={(id,quantity) => updateQuantity(item.id, quantity)}
            onRemove={() => removeItem(item.id)}
          />
        ))}

        <div className="border-t mt-4 pt-4 flex justify-between items-center">
          <div className="text-lg font-semibold">
            Total: ${cart.total.toFixed(2)}
          </div>
          <Link href="/checkout" className="bg-conces-blue text-white px-6 py-2 rounded hover:bg-conces-blue-dark">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
