"use client";

import { FC } from "react";
import { FilterIcon, PlusIcon, SearchIcon } from "lucide-react";

type Order = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Processing' | 'Shipped' | 'Pending' | 'Cancelled';
  products: { name: string; quantity: number }[];
};

 const orders: Order[] = [
  {
    id: '#NS-1001',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: 125.99,
    date: '2023-06-15',
    status: 'Completed',
    products: [
      { name: 'Raspberry Pi 4 Model B 8GB', quantity: 1 },
      { name: 'Jumper Wires Pack', quantity: 2 }
    ]
  },
  {
    id: '#NS-1002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    amount: 89.50,
    date: '2023-06-16',
    status: 'Processing',
    products: [
      { name: 'Arduino Uno R3', quantity: 1 }
    ]
  },
  {
    id: '#NS-1003',
    customer: 'Robert Johnson',
    email: 'robert@example.com',
    amount: 215.75,
    date: '2023-06-17',
    status: 'Shipped',
    products: [
      { name: 'ESP32 Development Board', quantity: 3 },
      { name: 'OLED Display 1.3"', quantity: 2 }
    ]
  },
  {
    id: '#NS-1004',
    customer: 'Emily Davis',
    email: 'emily@example.com',
    amount: 55.25,
    date: '2023-06-18',
    status: 'Completed',
    products: [
      { name: 'DHT22 Temperature Sensor', quantity: 5 }
    ]
  },
  {
    id: '#NS-1005',
    customer: 'Michael Wilson',
    email: 'michael@example.com',
    amount: 179.99,
    date: '2023-06-19',
    status: 'Pending',
    products: [
      { name: 'Raspberry Pi 4 Model B 8GB', quantity: 2 }
    ]
  },
  {
    id: '#NS-1006',
    customer: 'Sarah Thompson',
    email: 'sarah@example.com',
    amount: 210.45,
    date: '2023-06-20',
    status: 'Cancelled',
    products: [
      { name: 'Arduino Uno R3', quantity: 3 },
      { name: 'Jumper Wires Pack', quantity: 1 }
    ]
  },
];

const Orders: FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Orders Management</h2>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Order
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search orders..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <button className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <FilterIcon className="h-4 w-4 mr-1" />
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.customer}</div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Pending' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                  <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
