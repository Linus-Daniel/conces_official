import Image from 'next/image';
import { getStatusColor } from '@/utils/getStatusColor';
import { IOrder } from '@/models/Order';

interface OrderCardProps {
  order: IOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  const statusColor = getStatusColor(order.status);
  
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-royal-900">Order #{order._id as string}</h3>
              <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text}`}>
                {order.status}
              </span>
            </div>
            {new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-royal-900">${order.total.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
          </div>
        </div>
        
        {/* Order Items Preview */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {order.items.slice(0, 3).map((item, index) => (
            <div key={index} className="relative">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-md overflow-hidden">
                {/* <Image 
                  src={item.product?.images[0]} 
                  alt={item.product.name || "image"} 
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                /> */}
              </div>
              <span className="absolute top-0 right-0 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium border border-gray-200 shadow-sm">
                {item.quantity}
              </span>
            </div>
          ))}
        </div>
        
        {/* Order Actions */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
          <div>
            <p className="text-sm text-gray-500">
              {order.status === 'DELIVERED' 
                ? `Delivered on: `
                : order.status === 'SHIPPED'
                ? `Estimated delivery: `
                : `Estimated ship date: `}
{new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}            </p>
          </div>
          <div className="flex space-x-3">
            <a href="#" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Invoice
            </a>
            
            {order.status === 'SHIPPED' && (
              <a href={`/track-order/${order._id}`} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-royal-DEFAULT hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Track Order
              </a>
            )}
            
            {order.status === 'DELIVERED' && (
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-DEFAULT hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Buy Again
              </button>
            )}
            
            {order.status === 'PROCESSING' && (
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}