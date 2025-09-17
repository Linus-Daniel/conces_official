"use client";

import { FC, useState, useRef } from "react";
import { FilterIcon, PlusIcon, SearchIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

type Order = {
  _id: string;
  user: {
    fullName: string;
    email: string;
  };
  items: {
    product: {
      name: string;
      images: string[];
    };
    quantity: number;
    price: number;
  }[];
  chapterTotal: number;
  status: string;
  createdAt: string;
  shippingDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
};

interface OrdersProps {
  orders: Order[];
}

const Orders: FC<OrdersProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageClick = (image: string) => {
    setZoomedImage(image);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Orders</h2>
            <p className="text-sm text-muted-foreground">
              Manage and track customer orders
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-dark transition-colors w-full md:w-auto justify-center">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Order
          </button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              className="block w-full pl-10 pr-3 py-2 border border-input rounded-lg leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:ring-offset-2 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="inline-flex items-center px-3 py-2 border border-input text-sm rounded-lg text-foreground bg-background hover:bg-accent transition-colors w-full md:w-auto justify-center">
            <FilterIcon className="h-4 w-4 mr-1" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-royal-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-royal-900 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-royal-900 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-royal-900 uppercase tracking-wider hidden sm:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-royal-900 uppercase tracking-wider hidden md:table-cell">
                  Products
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-royal-900 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-royal-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-royal-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-royal-50/30 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-foreground">
                      {order.user.fullName}
                    </div>
                    <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                      {order.user.email}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground hidden sm:table-cell">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground hidden md:table-cell">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    ₦{order.chapterTotal.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "PAID"
                          ? "bg-green-100 text-green-800"
                          : order.status === "PROCESSING"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "SHIPPED"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "PENDING"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-royal-DEFAULT hover:text-royal-dark transition-colors"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No orders found matching your search
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <Dialog
          open={true}
          onClose={() => setSelectedOrder(null)}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <Dialog.Panel className="bg-card rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
              <div className="sticky top-0 bg-card/90 backdrop-blur-sm p-6 border-b border-border flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Order #{selectedOrder._id}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedOrder.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 rounded-full hover:bg-accent transition-colors"
                >
                  <XIcon className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      Customer Information
                    </h4>
                    <div className="bg-royal-50 p-4 rounded-lg">
                      <p className="font-medium text-foreground">
                        {selectedOrder.user.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.user.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      Order Status
                    </h4>
                    <div className="bg-royal-50 p-4 rounded-lg">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedOrder.status === "PAID"
                            ? "bg-green-100 text-green-800"
                            : selectedOrder.status === "PROCESSING"
                            ? "bg-yellow-100 text-yellow-800"
                            : selectedOrder.status === "SHIPPED"
                            ? "bg-blue-100 text-blue-800"
                            : selectedOrder.status === "PENDING"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedOrder.status}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Last updated:{" "}
                        {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Order Items
                  </h4>
                  <ul className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-4 p-3 bg-royal-50/20 rounded-lg"
                      >
                        {item?.product?.images?.[0] && (
                          <div
                            className="flex-shrink-0 cursor-pointer"
                            onClick={() =>
                              handleImageClick(item?.product?.images[0])
                            }
                          >
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name || "Product image"}
                              width={48}
                              height={48}
                              className="rounded-lg object-cover border border-border hover:shadow-md transition-all"
                            />
                          </div>
                        )}
                        <div className="flex-grow">
                          <p className="font-medium text-foreground">
                            {item.product.name}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              ₦{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      Order Summary
                    </h4>
                    <div className="bg-royal-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Subtotal
                        </span>
                        <span className="text-sm font-medium">
                          ₦{selectedOrder.chapterTotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Shipping
                        </span>
                        <span className="text-sm font-medium">₦0.00</span>
                      </div>
                      <div className="border-t border-border pt-2 mt-2 flex justify-between">
                        <span className="font-medium text-foreground">
                          Total
                        </span>
                        <span className="font-medium text-foreground">
                          ₦{selectedOrder.chapterTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedOrder.shippingDetails && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">
                        Shipping Details
                      </h4>
                      <div className="bg-royal-50 p-4 rounded-lg text-sm space-y-1">
                        <p className="font-medium text-foreground">
                          {selectedOrder.shippingDetails.firstName}{" "}
                          {selectedOrder.shippingDetails.lastName}
                        </p>
                        <p className="text-muted-foreground">
                          {selectedOrder.shippingDetails.address}
                        </p>
                        <p className="text-muted-foreground">
                          {selectedOrder.shippingDetails.city},{" "}
                          {selectedOrder.shippingDetails.state}{" "}
                          {selectedOrder.shippingDetails.postalCode}
                        </p>
                        <p className="text-muted-foreground">
                          {selectedOrder.shippingDetails.country}
                        </p>
                        <p className="text-muted-foreground mt-2">
                          Phone: {selectedOrder.shippingDetails.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={handleCloseZoom}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()} // ✅ Prevent parent close
            >
              <button
                onClick={handleCloseZoom}
                className="absolute -top-10 right-0 p-2 text-white hover:text-gold-300 transition-colors"
              >
                <XIcon className="w-6 h-6" />
              </button>

              <div className="relative w-full h-full">
                <Image
                  src={zoomedImage}
                  alt="Zoomed product"
                  width={800}
                  height={800}
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
