import Header from './OrderHeader';
import Footer from './Footer';
import OrderStatus from './OrderStatus';
import OrderSummary from './OrderSummary';
import { Order } from '@/types';

export default function OrderDetails({ order }: { order: Order }) {
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-royal-900 mb-2">Order #{order.orderNumber}</h1>
            <p className="text-gray-600">Placed on {order.date}</p>
          </div>

          <OrderStatus 
            status={order.status} 
            progress={order.progress} 
            trackingNumber={order.trackingNumber} 
            carrier={order.carrier} 
            estimatedDelivery={order.estimatedDelivery} 
          />

          <OrderSummary order={order} />

          <div className="flex justify-between">
            <a 
              href="/shop" 
              className="bg-white hover:bg-gray-50 text-royal-900 font-bold py-2 px-6 rounded-md border border-gray-300 transition duration-200"
            >
              Continue Shopping
            </a>
            <button className="bg-royal-DEFAULT hover:bg-royal-700 text-white font-bold py-2 px-6 rounded-md transition duration-200">
              Need Help?
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}