import { useState } from 'react';
import { format } from 'date-fns';
 

import {

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; 

import {

  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  
} from '@/components/ui/dropdown-menu'; // Assuming you have these UI components
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'PAID';

interface OrderItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
}

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
  };
  items: OrderItem[];
  shippingDetails: ShippingDetails;
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
}

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      _id: "686115edef1f30265ff86fd8",
      user: {
        _id: "6844c783296816d9c32c5356",
        fullName: "Super Admin",
        email: "serverside2000@gmail.com"
      },
      items: [
        {
          _id: "686115edef1f30265ff86fd9",
          product: {
            _id: "685e35f7ee716696531b6370",
            name: "Portable Power Bank",
            price: 22.95,
            images: []
          },
          quantity: 1,
          price: 22.95
        },
        {
          _id: "686115edef1f30265ff86fda",
          product: {
            _id: "685e35f7ee716696531b6371",
            name: "Premium Headphones",
            price: 130,
            images: []
          },
          quantity: 1,
          price: 130
        },
        {
          _id: "686115edef1f30265ff86fdb",
          product: {
            _id: "685e35f7ee716696531b6372",
            name: "Wireless Mouse",
            price: 22.95,
            images: []
          },
          quantity: 1,
          price: 22.95
        }
      ],
      shippingDetails: {
        firstName: "Linus",
        lastName: "Daniel",
        email: "ld604068@gmail.com",
        phone: "+2347044533766",
        address: "Lushi, yelwa",
        city: "Bauchi",
        state: "Bauchi state",
        country: "Nigeria",
        postalCode: "dasdfasd"
      },
      status: "PAID",
      total: 175.90,
      createdAt: "2025-06-29T10:31:09.924Z",
      updatedAt: "2025-06-29T10:31:31.521Z"
    },
    {
      _id: "6860670def1f30265ff86f02",
      user: {
        _id: "6844c783296816d9c32c5356",
        fullName: "Super Admin",
        email: "serverside2000@gmail.com"
      },
      items: [
        {
          _id: "6860670def1f30265ff86f03",
          product: {
            _id: "685e35f7ee716696531b6373",
            name: "Smart Watch",
            price: 199.99,
            images: []
          },
          quantity: 1,
          price: 199.99
        }
      ],
      shippingDetails: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
        postalCode: "10001"
      },
      status: "PROCESSING",
      total: 225.89,
      createdAt: "2025-06-28T15:22:17.842Z",
      updatedAt: "2025-06-28T15:22:17.842Z"
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order._id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } 
        : order
    ));
  };

  const getStatusBadge = (status: OrderStatus) => {
    const statusColors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-indigo-100 text-indigo-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      PAID: 'bg-purple-100 text-purple-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-royal-DEFAULT">Order Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-royal-DEFAULT text-royal-DEFAULT">
            Export
          </Button>
          <Button className="bg-royal-DEFAULT hover:bg-royal-dark text-white">
            Create Order
          </Button>
        </div>
      </div>

      <Card className="bg-white dark:bg-card rounded-lg shadow-sm">
        <Table>
          <TableHeader className="bg-royal-50 dark:bg-royal-950">
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id} className="hover:bg-royal-50/50 dark:hover:bg-royal-950/50">
                <TableCell className="font-medium">#{order._id.slice(-6)}</TableCell>
                <TableCell>
                  <div className="font-medium">{order.user.fullName}</div>
                  <div className="text-sm text-muted-foreground">{order.user.email}</div>
                </TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(order.createdAt), 'hh:mm a')}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div 
                        key={index}
                        className="w-8 h-8 rounded-full bg-royal-100 dark:bg-royal-900 border-2 border-white dark:border-card flex items-center justify-center text-xs font-medium"
                      >
                        {item.quantity}
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-royal-100 dark:bg-royal-900 border-2 border-white dark:border-card flex items-center justify-center text-xs font-medium">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  {getStatusBadge(order.status)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => updateOrderStatus(order._id, 'PENDING')}
                        className={order.status === 'PENDING' ? 'bg-yellow-50' : ''}
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => updateOrderStatus(order._id, 'PROCESSING')}
                        className={order.status === 'PROCESSING' ? 'bg-blue-50' : ''}
                      >
                        Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => updateOrderStatus(order._id, 'SHIPPED')}
                        className={order.status === 'SHIPPED' ? 'bg-indigo-50' : ''}
                      >
                        Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => updateOrderStatus(order._id, 'DELIVERED')}
                        className={order.status === 'DELIVERED' ? 'bg-green-50' : ''}
                      >
                        Delivered
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => updateOrderStatus(order._id, 'CANCELLED')}
                        className={order.status === 'CANCELLED' ? 'bg-red-50' : ''}
                      >
                        Cancel
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => {
                          // View order details logic
                        }}
                        className="text-royal-DEFAULT"
                      >
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Order Details Modal (would be implemented) */}
      {/* <OrderDetailsModal /> */}
    </div>
  );
};

export default OrderManagementPage;