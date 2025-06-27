"use client";
import CheckoutForm, { formSchema } from '@/components/checkoutForm';
import OrderSummary from '@/components/OrderSummary';
import api from '@/lib/axiosInstance';
import { useState } from 'react';
import { z } from 'zod';

type OrderDetails = {
  orderNumber: string;
  customer: {
    email: string;
  };
};

export default function CheckoutPage() {
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await api.post('/store/payment', {
        shippingDetails: data,
      });

      const { authorizationUrl } = res.data;

      if (authorizationUrl) {
        window.location.href = authorizationUrl;
      } else {
        alert('Authorization URL not found');
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error || 'Something went wrong';
      alert(message);
      console.error('Checkout error:', error);
    }
  }

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
