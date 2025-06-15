"use client"
import React, { useState } from "react";
import { FaSave, FaUpload, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CreateResource() {
  const router = useRouter();
  const [resource, setResource] = useState({
    title: '',
    type: 'devotional',
    category: '',
    description: '',
    content: '',
    fileUrl: '',
    author: '',
    tags: [] as string[],
    featured: false
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setResource(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = () => {
    if (tagInput && !resource.tags.includes(tagInput)) {
      setResource(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setResource(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with actual API call
      console.log('Creating resource:', resource);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/resources');
    } catch (error) {
      console.error('Error creating resource:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-royal-DEFAULT">Create New Resource</h1>
        <button 
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
            <input
              type="text"
              name="title"
              value={resource.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
            <select
              name="type"
              value={resource.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              required
            >
              <option value="devotional">Devotional</option>
              <option value="pdf">PDF Document</option>
              <option value="video">Video</option>
              <option value="blog">Blog Post</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
            <input
              type="text"
              name="category"
              value={resource.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author*</label>
            <input
              type="text"
              name="author"
              value={resource.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
          <textarea
            name="description"
            value={resource.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
            required
          />
        </div>

        {resource.type === 'devotional' || resource.type === 'blog' ? (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
            <textarea
              name="content"
              value={resource.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              required
            />
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {resource.type === 'pdf' ? 'PDF File' : 'Video URL'}*
            </label>
            <div className="flex items-center">
              <input
                type={resource.type === 'pdf' ? 'file' : 'text'}
                name="fileUrl"
                onChange={(e) => {
                  if (resource.type === 'pdf' && e.target.files) {
                    // Handle file upload
                    const file = e.target.files[0];
                    setResource(prev => ({
                      ...prev,
                      fileUrl: file.name
                    }));
                  } else {
                    handleChange(e);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
                required
                accept={resource.type === 'pdf' ? 'application/pdf' : undefined}
              />
              {resource.type === 'pdf' && resource.fileUrl && (
                <span className="ml-2 text-sm text-gray-500">{resource.fileUrl}</span>
              )}
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              placeholder="Add tag and press Enter"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-royal-DEFAULT text-white rounded-r-md hover:bg-royal-dark"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {resource.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={10} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            name="featured"
            checked={resource.featured}
            onChange={handleChange}
            className="h-4 w-4 text-royal-DEFAULT focus:ring-royal-DEFAULT border-gray-300 rounded"
          />
          <label className="ml-2 text-sm text-gray-700">Featured Resource</label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-royal-DEFAULT hover:bg-royal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-DEFAULT disabled:opacity-50"
          >
            <FaSave className="mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Resource'}
          </button>
        </div>
      </form>
    </div>
  );
}