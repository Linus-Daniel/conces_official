


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





// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import CheckoutForm from '@/components/checkout/CheckoutForm';
// import CartSummary from '@/components/checkout/CartSummary';
// import { useCart } from '@/hooks/useCart';
// import { Loader2 } from 'lucide-react';

// export default function CheckoutPage() {
//   const { cart, isLoading } = useCart();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (values: any) => {
//     setIsProcessing(true);
    
//     try {
//       const response = await fetch('/api/payment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           shippingDetails: values,
//         }),
//       });

//       const data = await response.json();
      
//       if (data.authorizationUrl) {
//         window.location.href = data.authorizationUrl;
//       }
//     } catch (error) {
//       console.error('Payment error:', error);
//       setIsProcessing(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (!cart || cart.items.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-xl font-semibold">Your cart is empty</h2>
//         <p className="mt-2">Add some products to your cart before checkout</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-8">
//       <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="space-y-6">
//           <h2 className="text-lg font-semibold">Shipping Information</h2>
//           <CheckoutForm onSubmit={handleSubmit} />
//         </div>
        
//         <div>
//           <h2 className="text-lg font-semibold mb-6">Your Order</h2>
//           <CartSummary cart={cart} />
//         </div>
//       </div>
//     </div>
//   );
// }