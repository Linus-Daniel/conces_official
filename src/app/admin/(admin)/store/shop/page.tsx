"use client"
import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaStore } from "react-icons/fa";


export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image: string;
  };
  

const products: Product[] = [
    { id: '1', name: 'CONCES T-Shirt', description: 'Official CONCES t-shirt', price: 2500, stock: 50, category: 'Apparel', image: '/tshirt.jpg' },
    { id: '2', name: 'Engineering Devotional', description: 'Daily devotional for engineers', price: 1500, stock: 30, category: 'Books', image: '/devotional.jpg' },
    { id: '3', name: 'CONCES Pin', description: 'Official membership pin', price: 500, stock: 100, category: 'Accessories', image: '/pin.jpg' }
  ];
export default function EcommerceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-royal-DEFAULT">Alumni Store Management</h2>
        <button className="bg-royal-DEFAULT text-white px-4 py-2 rounded-lg flex items-center hover:bg-royal-dark transition">
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
          >
            <option>Sort by Price</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <FaStore className="text-gray-400 text-4xl" />
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="bg-royal-100 text-royal-DEFAULT px-2 py-1 rounded-full text-xs">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-royal-DEFAULT">₦{product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{product.stock} in stock</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-royal-DEFAULT hover:text-royal-dark">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}