"use client"
import React, { useState, useEffect } from "react";
import { FaSave, FaUpload, FaTimes, FaTrash } from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import { Resource } from "@/types";

export default function EditResource() {
  const router = useRouter();
  const { id } = useParams();
  const [resource, setResource] = useState<Resource | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch resource data
    const fetchResource = async () => {
      // Replace with actual API call
      const mockResource: Resource = {
        id: id as string,
        title: 'Daily Devotional - June 15',
        type: 'devotional',
        category: 'Spiritual',
        description: 'Daily spiritual guidance for June 15',
        content: 'Lorem ipsum dolor sit amet...',
        author: 'Linus Daniel',
        date: '2023-06-15',
        views: 150,
        tags: ['devotion', 'daily'],
        featured: true
      };
      setResource(mockResource);
    };

    fetchResource();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setResource(prev => ({
      ...prev!,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = () => {
    if (tagInput && !resource?.tags?.includes(tagInput)) {
      setResource(prev => ({
        ...prev!,
        tags: [...prev!.tags, tagInput]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setResource(prev => ({
      ...prev!,
      tags: prev!.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resource) return;
    
    setIsSubmitting(true);
    
    try {
      // Replace with actual API call
      console.log('Updating resource:', resource);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/resources');
    } catch (error) {
      console.error('Error updating resource:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    
    try {
      // Replace with actual API call
      console.log('Deleting resource:', id);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/resources');
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  if (!resource) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-royal-DEFAULT">Edit Resource</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 flex items-center"
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Same form fields as CreateResource, but with existing values */}
        {/* ... */}
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaTrash className="mr-2" />
            Delete Resource
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-royal-DEFAULT hover:bg-royal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-DEFAULT disabled:opacity-50"
          >
            <FaSave className="mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}