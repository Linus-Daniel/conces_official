'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { ICategory } from '@/models/Category';
import { ImageUpload } from '@/components/admin/ImageUpload';

export default function ProductForm({ categories }: { categories: Partial<ICategory[] >}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    sku: '',
    featured: false,
    images: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be positive';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.stock < 0) newErrors.stock = 'Stock must be positive';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
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

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result = await response.json();
      toast.success('Product created successfully!');
      router.push('/admin/store/products');
      router.refresh();
    } catch (error) {
      toast.error('Failed to create product. Please try again.');
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
              <label className="block text-sm font-medium mb-1" htmlFor="sku">
                SKU
              </label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="Enter product SKU"
              />
              {errors.sku && <p className="text-sm text-red-500 mt-1">{errors.sku}</p>}
            </div>
          </div>

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
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category?._id as string} value={category?._id as string}>
                      {category?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
            </div>
          </div>

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
            <ImageUpload
              value={formData.images}
              onChange={(urls:string[]) => setFormData(prev => ({ ...prev, images: urls }))}
              onRemove={(url:string) => {
                setFormData(prev => ({
                  ...prev,
                  images: prev.images.filter(image => image !== url)
                }));
              }}
            />
            {errors.images && <p className="text-sm text-red-500 mt-1">{errors.images}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/store/products')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}