"use client"
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaBook, FaFilePdf, FaVideo } from "react-icons/fa";


export type User = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'branch-admin' | 'user';
    branch?: string;
    status: 'active' | 'inactive';
    joinDate: string;
};


export type Content = {
  id: string;
  title: string;
  type: 'devotional' | 'pdf' | 'video' | 'blog';
  category: string;
  author?: User;
  date: string;
  views: number;
  fileUrl?: string;
};

const contents: Content[] = [
    { id: '1', title: 'Daily Devotional - June 15', type: 'devotional', category: 'Spiritual',  date: '2023-06-15', views: 150 },
    { id: '2', title: 'Engineering Ethics PDF', type: 'pdf', category: 'Professional', date: '2023-06-10', views: 85, fileUrl: '/ethics.pdf' },
    { id: '3', title: 'Annual Conference Highlights', type: 'video', category: 'Events', date: '2023-05-28', views: 210, fileUrl: '/conference.mp4' }
  ];

export default function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || content.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FaFilePdf className="text-red-500" />;
      case 'video': return <FaVideo className="text-blue-500" />;
      default: return <FaBook className="text-royal-DEFAULT" />;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-royal-DEFAULT">Resources Management</h2>
        <Link href={"/admin/resources/create"} className="bg-royal-DEFAULT text-white px-4 py-2 rounded-lg flex items-center hover:bg-royal-dark transition">
          <FaPlus className="mr-2" /> Add Resource
        </Link>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="devotional">Devotional</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="blog">Blog</option>
          </select>
          
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
          >
            <option>Sort by Date</option>
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContents.map(content => (
              <tr key={content.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getTypeIcon(content.type)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{content.title}</div>
                      <div className="text-sm text-gray-500">{content.date}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                    content.type === 'devotional' ? 'bg-royal-100 text-royal-DEFAULT' : 
                    content.type === 'pdf' ? 'bg-red-100 text-red-800' : 
                    content.type === 'video' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {content.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {content.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Linus Daniel
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {content.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-royal-DEFAULT hover:text-royal-dark mr-3">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}