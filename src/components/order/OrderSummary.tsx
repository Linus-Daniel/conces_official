import { Order } from '@/types';
import Image from 'next/image';

export default function OrderSummary({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-royal-900 mb-6">Order Details</h2>
      
      <div className="space-y-6">
        {order.items.map((product) => (
          <div key={product._id} className="flex flex-col sm:flex-row gap-4 py-4 border-b border-gray-200">
            <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
              {/* <Image 
                src={product.image[0]} 
                alt={product.name} 
                width={96}
                height={96}
                className="w-full h-full object-cover"
              /> */}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                {/* <h3 className="text-lg font-medium text-royal-900">{product.name}</h3> */}
                <p className="text-lg font-bold text-royal-900">${(product.price * product.quantity).toFixed(2)}</p>
              </div>
              {/* <p className="text-gray-600 mt-1">Color: {product.color}</p> */}
              <p className="text-gray-600">Qty: {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-royal-900 mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Address</h4>
            <address className="not-italic text-gray-600 whitespace-pre-line">
              {order.shippingDetails.address}
            </address>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Method</h4>
            <p className="text-gray-600">Paystack</p>
            <p className="text-gray-600">Estimated delivery: 10 days time</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-royal-900 mb-4">Payment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h4>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Billing Address</h4>
            <address className="not-italic text-gray-600 whitespace-pre-line">
              {order.shippingDetails.country}
            </address>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-royal-900 mb-4">Order Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${order.total }</span>
          </div>
         
          <div className="border-t border-gray-200 pt-4 flex justify-between">
            <span className="text-lg font-bold text-royal-900">Total</span>
            <span className="text-lg font-bold text-royal-900">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}