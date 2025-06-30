import { Order } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";




interface OrdersListProps {
  orders: Order[];
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'processing':
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        border: 'border-amber-300',
        icon: '⏳'
      };
    case 'shipped':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300',
        icon: '🚚'
      };
    case 'delivered':
      return {
        bg: 'bg-emerald-100',
        text: 'text-emerald-800',
        border: 'border-emerald-300',
        icon: '✅'
      };
    case 'cancelled':
    case 'failed':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300',
        icon: '❌'
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        border: 'border-gray-300',
        icon: 'ℹ️'
      };
  }
}

const OrdersList = ({ orders }: OrdersListProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-800">
        <h2 className="text-2xl font-bold text-white">Your Orders</h2>
        <p className="text-blue-100 text-sm mt-1">View your order history and status</p>
      </div>

      <div className="divide-y divide-gray-200">
        {orders.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500">No orders yet</h3>
            <p className="text-gray-400 mt-1">Your orders will appear here once you make a purchase</p>
          </div>
        ) : (
          orders.map((order) => {
            const statusColor = getStatusColor(order.status);
            const firstItem = order.items[0];
            
            return (
              <div key={order._id.toString()} className="p-6 hover:bg-gray-50 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <Link href={`/store/order/${order._id}`} className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        Order #{order._id.toString().slice(-6).toUpperCase()}
                      </Link>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor.bg} ${statusColor.text} ${statusColor.border} border flex items-center gap-1`}
                      >
                        {statusColor.icon} {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-900 font-bold text-lg">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                      {order.items.length} {order.items.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    Order Items
                  </h4>
                  <ul className="space-y-3">
                    {order?.items?.map((item, index) => (
                      <li key={index} className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-3">
                      
                            <div className="w-16 h-16 rounded-md overflow-hidden bg-red-300 border border-gray-200 flex items-center justify-center">
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                                unoptimized
                              />
                            </div>
                        
                          <span className="text-gray-900 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                              {item.quantity}
                            </span>
                            {item.product.name}
                          </span>
                        </div>
                        <span className="text-gray-900 font-medium bg-white rounded px-2 py-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrdersList;