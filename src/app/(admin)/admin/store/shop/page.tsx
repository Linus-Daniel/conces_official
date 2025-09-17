// "use client"
// import React, { useState } from "react";
// import { FaSearch, FaEdit, FaTrash, FaPlus, FaStore } from "react-icons/fa";


// export type Product = {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     stock: number;
//     category: string;
//     image: string;
//   };
  

// const products: Product[] = [
//     { id: '1', name: 'CONCES T-Shirt', description: 'Official CONCES t-shirt', price: 2500, stock: 50, category: 'Apparel', image: '/tshirt.jpg' },
//     { id: '2', name: 'Engineering Devotional', description: 'Daily devotional for engineers', price: 1500, stock: 30, category: 'Books', image: '/devotional.jpg' },
//     { id: '3', name: 'CONCES Pin', description: 'Official membership pin', price: 500, stock: 100, category: 'Accessories', image: '/pin.jpg' }
//   ];
// export default function EcommerceManagement() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
  
//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const categories = [...new Set(products.map(p => p.category))];

//   return (
//     <div>
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-royal-DEFAULT">Alumni Store Management</h2>
//         <button className="bg-royal-DEFAULT text-white px-4 py-2 rounded-lg flex items-center hover:bg-royal-dark transition">
//           <FaPlus className="mr-2" /> Add Product
//         </button>
//       </div>
      
//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
          
//           <select
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="all">All Categories</option>
//             {categories.map(category => (
//               <option key={category} value={category}>{category}</option>
//             ))}
//           </select>
          
//           <select
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
//           >
//             <option>Sort by Price</option>
//             <option>Low to High</option>
//             <option>High to Low</option>
//           </select>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.map(product => (
//           <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//             <div className="h-48 bg-gray-100 flex items-center justify-center">
//               {product.image ? (
//                 <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
//               ) : (
//                 <FaStore className="text-gray-400 text-4xl" />
//               )}
//             </div>
//             <div className="p-4">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <span className="bg-royal-100 text-royal-DEFAULT px-2 py-1 rounded-full text-xs">
//                   {product.category}
//                 </span>
//               </div>
//               <p className="text-gray-600 text-sm mb-3">{product.description}</p>
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-lg font-bold text-royal-DEFAULT">₦{product.price.toLocaleString()}</p>
//                   <p className="text-sm text-gray-500">{product.stock} in stock</p>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button className="text-royal-DEFAULT hover:text-royal-dark">
//                     <FaEdit />
//                   </button>
//                   <button className="text-red-500 hover:text-red-700">
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client"
import { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Package, 
  TrendingUp, 
  CreditCard,
  LayoutDashboard,
  Box,
  ShoppingBag,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const data = [
  { name: 'Jan', revenue: 4000, orders: 2400 },
  { name: 'Feb', revenue: 3000, orders: 1398 },
  { name: 'Mar', revenue: 2000, orders: 9800 },
  { name: 'Apr', revenue: 2780, orders: 3908 },
  { name: 'May', revenue: 1890, orders: 4800 },
  { name: 'Jun', revenue: 2390, orders: 3800 },
  { name: 'Jul', revenue: 3490, orders: 4300 },
];

const pieData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Home Goods', value: 300 },
  { name: 'Beauty', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', date: '2023-05-01', amount: 125.99, status: 'Shipped' },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2023-05-02', amount: 89.50, status: 'Processing' },
  { id: 'ORD-003', customer: 'Robert Johnson', date: '2023-05-03', amount: 234.99, status: 'Delivered' },
  { id: 'ORD-004', customer: 'Emily Davis', date: '2023-05-04', amount: 56.75, status: 'Pending' },
  { id: 'ORD-005', customer: 'Michael Wilson', date: '2023-05-05', amount: 189.00, status: 'Shipped' },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 1254, stock: 56 },
  { name: 'Smart Watch', sales: 982, stock: 23 },
  { name: 'Bluetooth Speaker', sales: 754, stock: 12 },
  { name: 'Laptop Backpack', sales: 689, stock: 45 },
  { name: 'Phone Case', sales: 567, stock: 89 },
];

export default function Dashboard() {


  return (
    <div className=" bg-gray-100">
<div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,780</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
            <Progress value={65} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">
              +8.3% from last month
            </p>
            <Progress value={45} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">
              +15.2% from last month
            </p>
            <Progress value={78} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Order Value
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89.50</div>
            <p className="text-xs text-muted-foreground">
              +3.7% from last month
            </p>
            <Progress value={37} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent as number* 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Progress value={(product.sales / (product.sales + product.stock)) * 100} className="h-2" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
    
    </div>
  );
}

