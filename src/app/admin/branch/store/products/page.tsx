"use client"
// import { Product } from "@/types";
import { ChevronDownIcon, ChevronUpIcon, FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    sales: number;
    image: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  };
  

  const products: Product[] = [
    {
      id: '1',
      name: 'Raspberry Pi 4 Model B 8GB',
      category: 'Development Boards',
      price: 75.00,
      stock: 25,
      sales: 120,
      image: '/images/raspberry-pi.jpg',
      status: 'In Stock'
    },
    {
      id: '2',
      name: 'Arduino Uno R3',
      category: 'Development Boards',
      price: 22.90,
      stock: 42,
      sales: 85,
      image: '/images/arduino-uno.jpg',
      status: 'In Stock'
    },
    {
      id: '3',
      name: 'ESP32 Development Board',
      category: 'Development Boards',
      price: 12.99,
      stock: 5,
      sales: 210,
      image: '/images/esp32.jpg',
      status: 'Low Stock'
    },
    {
      id: '4',
      name: 'OLED Display 1.3"',
      category: 'Displays',
      price: 18.50,
      stock: 0,
      sales: 45,
      image: '/images/oled-display.jpg',
      status: 'Out of Stock'
    },
    {
      id: '5',
      name: 'Jumper Wires Pack',
      category: 'Cables',
      price: 8.99,
      stock: 78,
      sales: 180,
      image: '/images/jumper-wires.jpg',
      status: 'In Stock'
    },
    {
      id: '6',
      name: 'DHT22 Temperature Sensor',
      category: 'Sensors',
      price: 9.95,
      stock: 32,
      sales: 150,
      image: '/images/dht22.jpg',
      status: 'In Stock'
    },
  ];


const Products = () => {
    const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Products Management</h2>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
        
        <div className="mb-6 flex items-center">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <>
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded" src={product.image} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                        product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                        className="text-primary hover:text-primary-dark mr-3"
                      >
                        {expandedProduct === product.id ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                  {expandedProduct === product.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Product Details</h4>
                            <p className="text-sm text-gray-500">ID: {product.id}</p>
                            <p className="text-sm text-gray-500">Category: {product.category}</p>
                            <p className="text-sm text-gray-500">Price: ${product.price.toFixed(2)}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Inventory</h4>
                            <p className="text-sm text-gray-500">Current Stock: {product.stock}</p>
                            <p className="text-sm text-gray-500">Total Sales: {product.sales}</p>
                            <p className="text-sm text-gray-500">Status: {product.status}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

  export default Products