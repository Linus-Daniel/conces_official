"use client"
import React, { useState, useEffect } from "react";
import { FaEdit, FaFilePdf, FaVideo, FaBook, FaArrowLeft } from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import { Resource } from "@/types";

export default function ViewResource() {
  const router = useRouter();
  const { id } = useParams();
  const [resource, setResource] = useState<Resource | null>(null);

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
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.',
        author: 'Linus Daniel',
        date: '2023-06-15',
        views: 150,
        tags: ['devotion', 'daily'],
        featured: true,
        fileUrl: '/devotional-june15.pdf'
      };
      setResource(mockResource);
    };

    fetchResource();
  }, [id]);

  const getTypeIcon = () => {
    switch (resource?.type) {
      case 'pdf': return <FaFilePdf className="text-red-500 text-2xl" />;
      case 'video': return <FaVideo className="text-blue-500 text-2xl" />;
      default: return <FaBook className="text-royal-DEFAULT text-2xl" />;
    }
  };

  if (!resource) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Resources
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              {getTypeIcon()}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 ml-3">
                {resource.title}
              </h1>
              {resource.featured && (
                <span className="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-royal-100 text-royal-DEFAULT">
                  Featured
                </span>
              )}
            </div>
            <button
              onClick={() => router.push(`/resources/${id}/edit`)}
              className="flex items-center text-royal-DEFAULT hover:text-royal-dark"
            >
              <FaEdit className="mr-1" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700">{resource.description}</p>
              </div>

              {(resource.type === 'devotional' || resource.type === 'blog') && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Content</h2>
                  <div className="prose max-w-none text-gray-700">
                    {resource.content}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Details</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="capitalize">{resource.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="capitalize">{resource.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Author</p>
                    <p>{resource.author}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Published</p>
                    <p>{new Date(resource.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Views</p>
                    <p>{resource.views}</p>
                  </div>
                </div>
              </div>

              {resource.tags && resource.tags.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(resource.type === 'pdf' || resource.type === 'video') && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    {resource.type === 'pdf' ? 'PDF File' : 'Video'}
                  </h3>
                  <a 
                    href={resource.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-royal-DEFAULT hover:bg-royal-dark"
                  >
                    {resource.type === 'pdf' ? 'Download PDF' : 'Watch Video'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}