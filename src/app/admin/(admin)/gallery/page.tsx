// Let me rewrite the entire gallery file with all type fixes at once
"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload,Plus, Trash2, Edit ,
  Tag,
  Folder,
  MoreVertical,
  CheckSquare,
  Square,
  ImageIcon,
  Calendar
} from 'lucide-react';
import { IGallery, IGalleryData } from '@/models/Gallery';

interface UploadFormState {
  title: string;
  description: string;
  imageUrl: string;
  event?: string;
  category?: "Service" | "Outreach" | "Retreat" | "Wedding" | "Other";
  tags?: string[];
}

export default function AdminDashboard() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [images, setImages] = useState<IGallery[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editingImage, setEditingImage] = useState<IGalleryData | null>(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const [uploadForm, setUploadForm] = useState<UploadFormState>({
    title: '',
    description: '',
    imageUrl: '',
    event: '',
    category: undefined,
    tags: []
  });

  const categories = ['Service', 'Outreach', 'Retreat', 'Wedding', 'Other'];

  // Fetch albums
  const fetchAlbums = async () => {
    try {
      const response = await fetch('/api/gallery/albums');
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      showAlert('Failed to fetch albums', 'error');
    }
  };

  // Fetch images for specific album
  const fetchAlbumImages = async (event: string, category: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (event && event !== 'no-event') params.append('event', event);
      if (category && category !== 'no-category') params.append('category', category);
      
      const response = await fetch(`/api/gallery?${params.toString()}&limit=50`);
      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      showAlert('Failed to fetch images', 'error');
    }
    setLoading(false);
  };

  // Upload single or bulk images
  const handleUpload = async (isBulk = false) => {
    try {
      const payload = isBulk ? { images: [uploadForm] } : uploadForm;
      
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.success) {
        showAlert(data.message, 'success');
        setUploadDialog(false);
        resetUploadForm();
        fetchAlbums();
        if (selectedAlbum) {
          fetchAlbumImages(selectedAlbum.event, selectedAlbum.category);
        }
      } else {
        showAlert(data.error, 'error');
      }
    } catch (error) {
      showAlert('Upload failed', 'error');
    }
  };

  // Update image
  const handleUpdate = async () => {
    if (!editingImage) return;
    try {
      const response = await fetch(`/api/gallery/${(editingImage as any)._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingImage)
      });

      const data = await response.json();
      
      if (data.success) {
        showAlert(data.message, 'success');
        setEditDialog(false);
        if (selectedAlbum) {
          fetchAlbumImages(selectedAlbum.event, selectedAlbum.category);
        }
      } else {
        showAlert(data.error, 'error');
      }
    } catch (error) {
      showAlert('Update failed', 'error');
    }
  };

  // Delete single image
  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const response = await fetch(`/api/gallery/${imageId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        showAlert(data.message, 'success');
        fetchAlbums();
        if (selectedAlbum) {
          fetchAlbumImages(selectedAlbum.event, selectedAlbum.category);
        }
      } else {
        showAlert(data.error, 'error');
      }
    } catch (error) {
      showAlert('Delete failed', 'error');
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) {
      showAlert('Please select images to delete', 'error');
      return;
    }
    
    if (!confirm(`Delete ${selectedImages.length} selected images?`)) return;

    try {
      const response = await fetch('/api/gallery/bulk-delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedImages })
      });

      const data = await response.json();
      
      if (data.success) {
        showAlert(data.message, 'success');
        setSelectedImages([]);
        fetchAlbums();
        if (selectedAlbum) {
          fetchAlbumImages(selectedAlbum.event, selectedAlbum.category);
        }
      } else {
        showAlert(data.error, 'error');
      }
    } catch (error) {
      showAlert('Bulk delete failed', 'error');
    }
  };

  const showAlert = (message: string, type: string) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
  };

  const resetUploadForm = () => {
    setUploadForm({
      title: '',
      description: '',
      imageUrl: '',
      event: '',
      category: undefined,
      tags: []
    });
  };

  const handleImageSelect = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const selectAllImages = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(images.map(img => img._id as string));
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  if (!selectedAlbum) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          {alert.show && (
            <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-500 text-red-700' : 'border-green-500 text-green-700'}`}>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gallery Admin</h1>
              <p className="text-gray-600 mt-2">Manage your gallery albums and images</p>
            </div>
            
            <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Images
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload New Image</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Image title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={uploadForm.imageUrl}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="Cloudinary URL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="event">Event</Label>
                    <Input
                      id="event"
                      value={uploadForm.event}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, event: e.target.value }))}
                      placeholder="Event name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value as "Service" | "Outreach" | "Retreat" | "Wedding" | "Other" }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Image description"
                    />
                  </div>
                  <Button onClick={() => handleUpload()} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {albums.map((album) => (
              <Card 
                key={album.albumId} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                onClick={() => setSelectedAlbum(album)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={album.latestImage}
                      alt={album.event || 'Album'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-800">
                        {album.count} photos
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {album.event || 'Untitled Event'}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Tag className="w-3 h-3 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {album.category || 'No category'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {new Date(album.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {albums.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No albums yet</h3>
              <p className="text-gray-600 mb-4">Start by uploading your first image</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {alert.show && (
          <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-500 text-red-700' : 'border-green-500 text-green-700'}`}>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => {
                setSelectedAlbum(null);
                setImages([]);
                setSelectedImages([]);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Albums
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedAlbum.event || 'Untitled Event'}
              </h1>
              <p className="text-gray-600">
                {selectedAlbum.category} • {images.length} images
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {selectedImages.length > 0 && (
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedImages.length})
              </Button>
            )}
            <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <Button
            variant="outline"
            onClick={selectAllImages}
            className="flex items-center gap-2"
          >
            {selectedImages.length === images.length ? (
              <CheckSquare className="w-4 h-4" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            {selectedImages.length === images.length ? 'Deselect All' : 'Select All'}
          </Button>
          
          <Button 
            onClick={() => fetchAlbumImages(selectedAlbum.event, selectedAlbum.category)}
            variant="outline"
          >
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {images.map((image) => (
              <div key={image._id as string} className="group relative">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  
                  <div className="absolute top-2 left-2">
                    <Checkbox
                      checked={selectedImages.includes(image._id as string)}
                      onCheckedChange={() => handleImageSelect(image._id as string)}
                      className="bg-white/90 border-gray-400"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setEditingImage(image);
                          setEditDialog(true);
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(image._id as string)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {image.title}
                  </h4>
                  {image.tags && image.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {image.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {image.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{image.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && !loading && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images in this album</h3>
            <p className="text-gray-600 mb-4">Add some images to get started</p>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={editDialog} onOpenChange={setEditDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Image</DialogTitle>
            </DialogHeader>
            {editingImage && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingImage.title}
                    onChange={(e) => setEditingImage(prev => prev ? ({ ...prev, title: e.target.value }) : prev)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-event">Event</Label>
                  <Input
                    id="edit-event"
                    value={editingImage.event || ''}
                    onChange={(e) => setEditingImage(prev => prev ? ({ ...prev, event: e.target.value }) : prev)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={editingImage.category || ''} 
                    onValueChange={(value) => setEditingImage(prev => prev ? ({ ...prev, category: value as "Service" | "Outreach" | "Retreat" | "Wedding" | "Other" | undefined }) : prev)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingImage.description || ''}
                    onChange={(e) => setEditingImage(prev => prev ? ({ ...prev, description: e.target.value }) : prev)}
                  />
                </div>
                <Button onClick={handleUpdate} className="w-full">
                  Update Image
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}