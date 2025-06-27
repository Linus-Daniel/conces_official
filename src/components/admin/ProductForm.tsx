'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';
import { ICategory } from '@/models/Category';
import ImageUpload from '../ImageUpload';
import { FaUpload, FaTimes } from 'react-icons/fa';
import api from '@/lib/axiosInstance';
import Link from 'next/link';

interface ProductFormProps {
  userRole: string;
  branch: string;
  categories: Partial<ICategory>[];
  initialData?: any; // Add proper type for your product
  onSuccess?: () => void;
}
 function ProductForm({ 
  userRole, 
  branch, 
  categories, 
  initialData, 
  onSuccess 
}: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    branch: userRole === 'admin' ? 'national' : branch,
    featured: false,
    images: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        category: initialData.category?.slug || initialData.category,
        stock: initialData.stock,
        branch: initialData.branch || (userRole === 'admin' ? 'national' : branch),
        featured: initialData.featured || false,
        images: initialData.images || [],
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        branch: userRole === 'admin' ? 'national' : branch,
        featured: false,
        images: [],
      });
    }
  }, [initialData, userRole, branch]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be positive';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.stock < 0) newErrors.stock = 'Stock must be positive';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, url]
    }));
  };

  const handleRemoveImage = (url: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(image => image !== url)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      setIsLoading(true);
      const url = initialData 
        ? `/api/admin/products/${initialData._id}`
        : '/api/admin/products';
      const method = initialData ? 'PUT' : 'POST';

      const response = await api({
        url,
        method,
        data: formData
      });

      toast.success(`Product ${initialData ? 'updated' : 'created'} successfully!`);
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/admin/store/products');
        router.refresh();
      }
    } catch (error) {
      toast.error(`Failed to ${initialData ? 'update' : 'create'} product. Please try again.`);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/store/products">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Create New Product</h1>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Product Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="branch">
                Branch
              </label>
              <Input
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                disabled // Make it read-only since it's determined by role
                placeholder="Branch"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {userRole === 'admin' ? 'National (all branches)' : `Your branch: ${branch}`}
              </p>
            </div>
          </div>

          {/* Rest of your form remains the same */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="min-h-[120px]"
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="price">
                Price
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
              />
              {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="stock">
                Stock Quantity
              </label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
              />
              {errors.stock && <p className="text-sm text-red-500 mt-1">{errors.stock}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, category: value }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category, index) => (
                    <SelectItem 
                      key={index} 
                      value={category.slug as string}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Rest of your form components... */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <label className="block text-sm font-medium" htmlFor="featured">
                Featured Product
              </label>
              <p className="text-sm text-muted-foreground">
                Show this product in featured sections
              </p>
            </div>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Product Images
            </label>
            <div className="space-y-4">
              <ImageUpload
                onSuccess={(info) => handleImageUpload(info.secure_url)}
                folder="products/"
              >
                <div className="flex items-center justify-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                  <FaUpload className="mr-2" />
                  Upload Images
                </div>
              </ImageUpload>
              
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.images.map((image) => (
                    <div key={image} className="relative group">
                      <img
                        src={image}
                        alt="Product preview"
                        className="rounded-md object-cover h-32 w-full"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.images && <p className="text-sm text-red-500 mt-1">{errors.images}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess ? () => onSuccess() : () => router.push('/admin/store/products')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading 
              ? initialData 
                ? 'Updating...' 
                : 'Creating...' 
              : initialData 
                ? 'Update Product' 
                : 'Create Product'}
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm