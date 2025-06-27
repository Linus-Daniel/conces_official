import OrderDetails from '@/components/order/OrderDetails';
import { Order } from '@/types';

// This would normally fetch data from your backend
const getOrderData = (orderId: string): Order => {
  // Mock data - replace with actual API call
  return {
    id: orderId,
    orderNumber: 'RS-2023-456789',
    date: 'October 15, 2023',
    status: 'shipped',
    progress: 75,
    trackingNumber: 'RS123456789US',
    carrier: 'Royal Shipping',
    estimatedDelivery: 'October 22, 2023',
    products: [
      {
        id: 1,
        name: 'Royal Blue Velvet Cushion',
        price: 49.99,
        quantity: 1,
        color: 'Royal Blue',
        image: '/placeholder-product.jpg'
      },
      {
        id: 2,
        name: 'Gold Embroidered Throw Pillow',
        price: 59.99,
        quantity: 2,
        color: 'Gold',
        image: '/placeholder-product.jpg'
      },
      {
        id: 3,
        name: 'Regal Table Runner',
        price: 39.99,
        quantity: 1,
        color: 'Royal Blue & Gold',
        image: '/placeholder-product.jpg'
      }
    ],
    shipping: {
      name: 'John Smith',
      address: '123 Royal Way\nSuite 500\nNew York, NY 10001\nUnited States',
      method: 'Standard Shipping'
    },
    payment: {
      method: 'Paystack',
      date: 'October 15, 2023',
      billingAddress: '123 Royal Way\nSuite 500\nNew York, NY 10001\nUnited States'
    },
    subtotal: 199.96,
    shippingCost: 9.99,
    tax: 15.99,
    total: 225.94
  };
};

export default function OrderPage({ params }: { params: { id: string } }) {
  const order = getOrderData(params.id);

  return (
    <div className="min-h-screen bg-royal-50">
      <OrderDetails order={order} />
    </div>
  );
}