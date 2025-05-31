"use client";

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const orders = [
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Types



const AdminDashboard = () => {
  const [addProduct,setAddProduct] = useState<boolean>(false)
  const router = useRouter();

  // Dummy data for dashboard
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 19000, 15000, 20000, 25000, 22000],
        borderColor: '#0bacd6',
        backgroundColor: 'rgba(11, 172, 214, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const productData = {
    labels: ['Raspberry Pi', 'Arduino', 'Sensors', 'Displays', 'Cables'],
    datasets: [
      {
        label: 'Items Sold',
        data: [120, 85, 210, 45, 180],
        backgroundColor: '#03a1b6',
      },
    ],
  };

  const stats = [
    { name: 'Total Sales', value: '$24,580', change: '+12%', changeType: 'positive' },
    { name: 'New Orders', value: '48', change: '+5%', changeType: 'positive' },
    { name: 'Products', value: '156', change: '+3%', changeType: 'positive' },
    { name: 'Customers', value: '1,245', change: '+8%', changeType: 'positive' },
  ];

 
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <motion.div 
                  key={stat.name}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <span className={`ml-2 text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
                <Line data={salesData} />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
                <Bar data={productData} />
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                <button 
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    
  };



const SettingsSection = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h2 className="text-xl font-bold text-gray-900 mb-6">System Settings</h2>
    <p className="text-gray-600">System configuration and settings will go here.</p>
  </div>
);

export default AdminDashboard;