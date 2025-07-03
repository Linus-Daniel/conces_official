"use client"
import { useState } from 'react';
import { FaUpload, FaTimes, FaPlus, FaMinus, FaSpinner, FaStar } from 'react-icons/fa';
import FileUpload from '@/components/FileUpload'; // adjust path accordingly
import ImageUpload from '@/components/ImageUpload';
import axios from 'axios';
import RichTextEditor from '@/components/EditText';

// Type definitions
type ResourceType = 'pdf' | 'devotional' | 'video' | 'article' | 'spreadsheet';
type ResourceCategory = 'academic' | 'spiritual' | 'career' | 'media';

interface NewResource {
  title: string;
  type: ResourceType;
  author: string;
  description: string;
  thumbnail: string;
  tags: string[];
  category: ResourceCategory;
  fileUrl?: string;
  content?: string;
  videoUrl?: string;
  duration?: string;
  branch:string;
  featured: boolean;
}

const initialResourceState: NewResource = {
  title: '',
  type: 'pdf',
  author: '',
  description: '',
  content: "",
  thumbnail: '',
  videoUrl: "",
  fileUrl: "",
  tags: [],
  category: 'academic',
  featured: false,
  branch:""
};

const AddResources = ({branch}:{branch:string}) => {
  const [resource, setResource] = useState<NewResource>(initialResourceState);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResource(prev => ({ ...prev, [name]: value }));

    if (name === 'videoUrl') {
      setVideoPreview(value);
    }
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setResource(prev => ({ ...prev, [name]: checked }));
  };

  const handleTagAdd = () => {
    if (newTag.trim() && !resource.tags.includes(newTag.trim())) {
      setResource(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setResource(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const resetForm = () => {
    setResource(initialResourceState);
    setNewTag('');
    setThumbnailPreview('');
    setVideoPreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await axios.post('/api/resources', resource);
      console.log('Submitted:', response.data);
      setSubmitSuccess(true);
      resetForm();
    } catch (error) {
      console.error('Error creating resource:', error);
      alert('Failed to create resource');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTypeSpecificFields = () => {
    switch (resource.type) {
      case 'pdf':
      case 'spreadsheet':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
            <FileUpload
              folder="resources/files"
              allowedFormats={resource.type === 'pdf' ? ['pdf'] : ['xlsx,xls,csv']}
              onSuccess={(info) => {
                setResource(prev => ({ ...prev, fileUrl: info.secure_url }));
              }}
            >
              <span className="flex items-center">
                <FaUpload className="mr-2" />
                Upload {resource.type.toUpperCase()}
              </span>
            </FileUpload>
            {resource.fileUrl && (
              <p className="mt-2 text-green-600 text-sm">File uploaded successfully!</p>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={resource.videoUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://youtube.com/embed/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (HH:MM:SS)</label>
                <input
                  type="text"
                  name="duration"
                  value={resource.duration || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="1:25:36"
                />
              </div>
            </div>
            {videoPreview && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Video Preview</label>
                <div className="aspect-video w-full border rounded-md overflow-hidden bg-gray-100">
                  <iframe
                    src={videoPreview}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        );

        case 'devotional':
          case 'article':
            return (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <RichTextEditor
                  value={resource.content || ''}
                  onChange={(val) => setResource(prev => ({ ...prev, content: val }))}
                  placeholder="Enter your content here (rich formatting supported)"
                />
                <input type="hidden" name="content" value={resource.content} />
                <p className="text-xs text-gray-500 mt-1">Rich text supported (bold, italics, images, etc.)</p>
              </div>
            );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Resource</h1>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Resource created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={resource.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Resource title"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type*</label>
              <select
                name="type"
                value={resource.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              >
                <option value="pdf">PDF Document</option>
                <option value="devotional">Devotional</option>
                <option value="video">Video</option>
                <option value="article">Article</option>
                <option value="spreadsheet">Spreadsheet</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Author*</label>
              <input
                type="text"
                name="author"
                value={resource.author}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Author name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
              <select
                name="category"
                value={resource.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              >
                <option value="academic">Academic</option>
                <option value="spiritual">Spiritual</option>
                <option value="career">Career</option>
                <option value="media">Media</option>
              </select>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
              <ImageUpload
                onSuccess={(info) => {
                  setResource(prev => ({ ...prev, thumbnail: info.secure_url }));
                  setThumbnailPreview(info.secure_url);
                }}
                folder="resources/thumbnails"
              >
                <span className="flex items-center">
                  <FaUpload className="mr-2" />
                  Upload Thumbnail
                </span>
              </ImageUpload>
              {thumbnailPreview && (
                <div className="mt-2 relative inline-block">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="h-12 w-12 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setThumbnailPreview('');
                      setResource(prev => ({ ...prev, thumbnail: '' }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Add tag"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 transition"
                >
                  <FaPlus />
                </button>
              </div>
              {resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {resource.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 text-gray-500 hover:text-red-500 transition"
                      >
                        <FaMinus size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={resource.featured}
                    onChange={handleToggleChange}
                    className="sr-only"
                  />
                  <div className={`block w-14 h-8 rounded-full ${resource.featured ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                      resource.featured ? 'transform translate-x-6' : ''
                    }`}
                  ></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium flex items-center">
                  <FaStar className={`mr-1 ${resource.featured ? 'text-yellow-400' : 'text-gray-400'}`} />
                  Featured Resource
                </div>
              </label>
              <p className="text-xs text-gray-500 mt-1">Featured resources will be highlighted on the website</p>
            </div>
          </div>
        </div>

        {renderTypeSpecificFields()}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
          <textarea
            name="description"
            value={resource.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Brief description of the resource..."
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition flex items-center justify-center min-w-32"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Creating...
              </>
            ) : (
              'Create Resource'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResources;