"use client";

import CheckoutForm from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';
import { useState } from 'react';

type OrderDetails = {
  orderNumber: string;
  customer: {
    email: string;
  };
};

export default function CheckoutPage() {
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [], // replace with actual cart items
          customer: formData
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setOrderDetails(data);
        // clearCart(); // uncomment if you have a cart context
        setOrderComplete(true);
      } else {
        throw new Error(data.message || 'Checkout failed');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (orderComplete && orderDetails) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-conces-blue mb-6">Order Confirmed!</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Thank you for your order!</p>
          <p className="mb-4">Your order number is: <strong>{orderDetails.orderNumber}</strong></p>
          <p>A confirmation email has been sent to {orderDetails.customer.email}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-conces-blue mb-6">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <CheckoutForm onSubmit={handleSubmit} />
        </div>
        <div className="md:w-1/3">
          <OrderSummary items={[]} total={433} />
        </div>
      </div>
    </div>
  );
}
