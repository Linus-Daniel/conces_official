import { Table, X } from "lucide-react";
import { Card } from "../ui/card";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import {format } from "date-fns";

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

// Custom Modal Component
const OrderDetailsModal = ({ order, onClose, onStatusChange }: {
    order: Order;
    onClose: () => void;
    onStatusChange: (newStatus: OrderStatus) => void;
  }) => {
    const getStatusColor = (status: OrderStatus) => {
      const colors = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        PROCESSING: 'bg-blue-100 text-blue-800',
        SHIPPED: 'bg-indigo-100 text-indigo-800',
        DELIVERED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
        PAID: 'bg-purple-100 text-purple-800',
      };
      return colors[status];
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-royal-DEFAULT">
                Order #{order._id.slice(-8).toUpperCase()}
              </h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(order.createdAt), 'MMM dd, yyyy hh:mm a')}
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
  
          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Customer and Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-royal-DEFAULT">Customer Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium">{order.user.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">{order.user.email}</p>
                  </div>
                </div>
              </Card>
  
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-royal-DEFAULT">Shipping Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recipient</p>
                    <p className="font-medium">
                      {order.shippingDetails.firstName} {order.shippingDetails.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                    <p className="font-medium">
                      {order.shippingDetails.address}<br />
                      {order.shippingDetails.city}, {order.shippingDetails.state}<br />
                      {order.shippingDetails.country} {order.shippingDetails.postalCode}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                    <p className="font-medium">{order.shippingDetails.phone}</p>
                  </div>
                </div>
              </Card>
            </div>
  
            {/* Order Items */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-royal-DEFAULT">Order Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          SKU: {item.product._id.slice(-6)}
                        </div>
                      </TableCell>
                      <TableCell>${item.product.price.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
  
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
  
              <div className="flex justify-end">
                <div className="w-64 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span>${(order.total * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Tax</span>
                    <span>${(order.total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
  
            {/* Status Update */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-royal-DEFAULT">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED','PAID'] as OrderStatus[]).map((status) => (
                  <Button
                    key={status}
                    variant={order.status === status ? 'default' : 'outline'}
                    className={`transition-colors ${
                      order.status === status ? 
                      {
                        PENDING: 'bg-yellow-500 hover:bg-yellow-600 text-white',
                        PROCESSING: 'bg-blue-500 hover:bg-blue-600 text-white',
                        SHIPPED: 'bg-indigo-500 hover:bg-indigo-600 text-white',
                        DELIVERED: 'bg-green-500 hover:bg-green-600 text-white',
                        CANCELLED: 'bg-red-500 hover:bg-red-600 text-white',
                        PAID:"bg-red-500 hover:bg-red-600 text-white"
                      }[status] : ''
                    }`}
                    onClick={() => onStatusChange(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
  
          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-royal-DEFAULT hover:bg-royal-dark text-white">
              Print Invoice
            </Button>
          </div>
        </div>
      </div>
    );
  };

  export default OrderDetailsModal