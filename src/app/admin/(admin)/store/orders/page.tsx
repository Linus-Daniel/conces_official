"use client";
import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import {
  MoreHorizontal,
  X,
  Loader2,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import api from "@/lib/axiosInstance";

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "PAID";

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
  chapter?: string;
}

// API Service Functions
const fetchOrders = async (): Promise<Order[]> => {
  const response = await api("/store/orders");
  if (!response) {
    throw new Error("Failed to fetch orders");
  }
  return response.data.orders;
};

const updateOrderStatus = async (
  orderId: string,
  newStatus: string
): Promise<Order> => {
  const response = await fetch(`/api/store/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to update order status");
  }

  return response.json();
};

const bulkUpdateStatus = async (
  orderIds: string[],
  newStatus: string
): Promise<void> => {
  const response = await fetch("/api/store/orders/bulk-status", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderIds, status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to bulk update order status");
  }
};

// Custom Modal Component
const OrderDetailsModal = ({
  order,
  onClose,
  onStatusChange,
}: {
  order: Order;
  onClose: () => void;
  onStatusChange: (newStatus: OrderStatus) => Promise<void>;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    setIsUpdating(true);
    try {
      await onStatusChange(newStatus);
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      PROCESSING: "bg-blue-100 text-blue-800",
      SHIPPED: "bg-indigo-100 text-indigo-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
      PAID: "bg-purple-100 text-purple-800",
    };
    return colors[status];
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-royal-DEFAULT">
              Order #{order._id.slice(-8).toUpperCase()}
            </h2>
            <div className="flex items-center space-x-4 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(order.createdAt), "MMM dd, yyyy hh:mm a")}
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
              <h3 className="text-lg font-semibold mb-4 text-royal-DEFAULT">
                Customer Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Name
                  </p>
                  <p className="font-medium">{order.user.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-medium">{order.user.email}</p>
                </div>
                {order.chapter && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Chapter
                    </p>
                    <p className="font-medium">{order.chapter}</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-royal-DEFAULT">
                Shipping Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recipient
                  </p>
                  <p className="font-medium">
                    {order.shippingDetails.firstName}{" "}
                    {order.shippingDetails.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Address
                  </p>
                  <p className="font-medium">
                    {order.shippingDetails.address}
                    <br />
                    {order.shippingDetails.city}, {order.shippingDetails.state}
                    <br />
                    {order.shippingDetails.country}{" "}
                    {order.shippingDetails.postalCode}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Contact
                  </p>
                  <p className="font-medium">{order.shippingDetails.phone}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Items */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-royal-DEFAULT">
              Order Items
            </h3>
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
                    <TableCell className="text-right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

            <div className="flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span>${(order.total * 0.9).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Shipping
                  </span>
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
            <h3 className="text-lg font-semibold mb-4 text-royal-DEFAULT">
              Update Status
            </h3>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "PENDING",
                  "PROCESSING",
                  "SHIPPED",
                  "DELIVERED",
                  "CANCELLED",
                ] as OrderStatus[]
              ).map((status) => (
                <Button
                  key={status}
                  variant={order.status === status ? "default" : "outline"}
                  className={`transition-colors ${
                    order.status === status
                      ? {
                          PENDING:
                            "bg-yellow-500 hover:bg-yellow-600 text-white",
                          PROCESSING:
                            "bg-blue-500 hover:bg-blue-600 text-white",
                          SHIPPED:
                            "bg-indigo-500 hover:bg-indigo-600 text-white",
                          DELIVERED:
                            "bg-green-500 hover:bg-green-600 text-white",
                          CANCELLED: "bg-red-500 hover:bg-red-600 text-white",
                          PAID: "bg-red-500 hover:bg-red-600 text-white",
                        }[status]
                      : ""
                  }`}
                  onClick={() => handleStatusChange(status)}
                  disabled={isUpdating}
                >
                  {isUpdating && order.status === status ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    status
                  )}
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

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    chapter: "",
    state: "",
    dateFrom: "",
    dateTo: "",
  });

  // Fetch orders on component mount
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const data = await fetchOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        setError("Failed to load orders");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...orders];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.user.fullName.toLowerCase().includes(term) ||
          order.user.email.toLowerCase().includes(term) ||
          order._id.toLowerCase().includes(term) ||
          order.shippingDetails.phone.toLowerCase().includes(term) ||
          order.items.some((item) =>
            item.product.name.toLowerCase().includes(term)
          )
      );
    }

    // Apply filters
    if (filters.status) {
      result = result.filter((order) => order.status === filters.status);
    }
    if (filters.chapter) {
      result = result.filter((order) => order.chapter === filters.chapter);
    }
    if (filters.state) {
      result = result.filter(
        (order) => order.shippingDetails.state === filters.state
      );
    }
    if (filters.dateFrom) {
      const dateFrom = new Date(filters.dateFrom);
      result = result.filter((order) => new Date(order.createdAt) >= dateFrom);
    }
    if (filters.dateTo) {
      const dateTo = new Date(filters.dateTo);
      result = result.filter((order) => new Date(order.createdAt) <= dateTo);
    }

    setFilteredOrders(result);
  }, [orders, searchTerm, filters]);

  // Get unique values for filters
  const uniqueChapters = useMemo(() => {
    const chapteres = new Set(
      orders.map((order) => order.chapter).filter(Boolean)
    );
    return Array.from(chapteres) as string[];
  }, [orders]);

  const uniqueStates = useMemo(() => {
    const states = new Set(orders.map((order) => order.shippingDetails.state));
    return Array.from(states);
  }, [orders]);

  const statusOptions = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "PAID",
  ];

  // Update order status
  const handleStatusUpdate = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      // Optimistic UI update
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : order
        )
      );

      // Update selected order if it's the one being modified
      if (selectedOrder?._id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        });
      }

      // API call
      await updateOrderStatus(orderId, newStatus);

      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      // Revert on error
      setOrders([...orders]);
      if (selectedOrder?._id === orderId) {
        setSelectedOrder({ ...selectedOrder });
      }

      toast.error("Failed to update order status");
      console.error("Update error:", err);
    }
  };

  // Bulk update status
  const handleBulkStatusUpdate = async (newStatus: OrderStatus) => {
    if (selectedOrders.length === 0) {
      toast.warning("No orders selected");
      return;
    }

    try {
      // Optimistic UI update
      setOrders((prev) =>
        prev.map((order) =>
          selectedOrders.includes(order._id)
            ? {
                ...order,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : order
        )
      );

      // API call
      await bulkUpdateStatus(selectedOrders, newStatus);

      toast.success(`Updated ${selectedOrders.length} orders to ${newStatus}`);
      setSelectedOrders([]);
    } catch (err) {
      // Revert on error
      setOrders([...orders]);
      toast.error("Failed to bulk update orders");
      console.error("Bulk update error:", err);
    }
  };

  // Toggle order selection
  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((order) => order._id));
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const data = filteredOrders.map((order) => ({
      "Order ID": order._id,
      Customer: order.user.fullName,
      Email: order.user.email,
      Date: format(new Date(order.createdAt), "MMM dd, yyyy hh:mm a"),
      Status: order.status,
      Chapter: order.chapter || "",
      State: order.shippingDetails.state,
      City: order.shippingDetails.city,
      Total: order.total,
      Items: order.items
        .map((item) => `${item.product.name} (x${item.quantity})`)
        .join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, `orders_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeOrderDetails = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusBadge = (status: OrderStatus) => {
    const statusColors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      PROCESSING: "bg-blue-100 text-blue-800",
      SHIPPED: "bg-indigo-100 text-indigo-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
      PAID: "bg-purple-100 text-purple-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
      >
        {status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-royal-DEFAULT" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-royal-DEFAULT">
          Order Management
        </h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-royal-DEFAULT text-royal-DEFAULT"
            onClick={exportToExcel}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-royal-DEFAULT hover:bg-royal-dark text-white">
            Create Order
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select
            value={filters?.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              {statusOptions?.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {uniqueChapters.length > 0 && (
            <Select
              value={filters.chapter}
              onValueChange={(value) =>
                setFilters({ ...filters, chapter: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chapter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Chapters</SelectItem>
                {uniqueChapters.map((chapter) => (
                  <SelectItem key={chapter} value={chapter}>
                    {chapter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select
            value={filters.state}
            onValueChange={(value) => setFilters({ ...filters, state: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All States</SelectItem>
              {uniqueStates?.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() =>
              setFilters({
                status: "",
                chapter: "",
                state: "",
                dateFrom: "",
                dateTo: "",
              })
            }
          >
            Clear Filters
          </Button>
        </div>

        {/* Date Range Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              From Date
            </label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters({ ...filters, dateFrom: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To Date
            </label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters({ ...filters, dateTo: e.target.value })
              }
            />
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {selectedOrders.length} selected
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Update Status</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {(
                    [
                      "PENDING",
                      "PROCESSING",
                      "SHIPPED",
                      "DELIVERED",
                      "CANCELLED",
                    ] as OrderStatus[]
                  ).map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => handleBulkStatusUpdate(status)}
                      className="flex items-center"
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          {
                            PENDING: "bg-yellow-500",
                            PROCESSING: "bg-blue-500",
                            SHIPPED: "bg-indigo-500",
                            DELIVERED: "bg-green-500",
                            CANCELLED: "bg-red-500",
                            PAID: "bg-red-500",
                          }[status]
                        } mr-2`}
                      ></span>
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              variant="ghost"
              onClick={() => setSelectedOrders([])}
              className="text-red-500 hover:text-red-700"
            >
              Clear Selection
            </Button>
          </div>
        </Card>
      )}

      {/* Orders Table */}
      <Card className="bg-white dark:bg-card rounded-lg shadow-sm">
        <Table>
          <TableHeader className="bg-royal-50 dark:bg-royal-950">
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={
                    selectedOrders.length === filteredOrders.length &&
                    filteredOrders.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow
                  key={order._id}
                  className="hover:bg-royal-50/50 dark:hover:bg-royal-950/50"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order._id)}
                      onCheckedChange={() => toggleOrderSelection(order._id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    #{order._id.slice(-6)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{order.user.fullName}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(order.createdAt), "hh:mm a")}
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
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 z-50"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusUpdate(order._id, "PENDING")
                          }
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 cursor-pointer flex items-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusUpdate(order._id, "PROCESSING")
                          }
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer flex items-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                          Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusUpdate(order._id, "SHIPPED")
                          }
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer flex items-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                          Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusUpdate(order._id, "DELIVERED")
                          }
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 cursor-pointer flex items-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusUpdate(order._id, "CANCELLED")
                          }
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer flex items-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                          Cancel
                        </DropdownMenuItem>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                        <DropdownMenuItem
                          onClick={() => openOrderDetails(order)}
                          className="px-4 py-2 text-sm text-royal-DEFAULT hover:bg-royal-50 dark:hover:bg-royal-900/30 cursor-pointer flex items-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-royal-DEFAULT mr-2"></span>
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  No orders found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {isModalOpen && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={closeOrderDetails}
          onStatusChange={(status) =>
            handleStatusUpdate(selectedOrder._id, status)
          }
        />
      )}
    </div>
  );
};

export default OrderManagementPage;
