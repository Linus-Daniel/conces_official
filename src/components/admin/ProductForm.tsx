"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronLeft, Loader2, ImageIcon, Star } from "lucide-react";
import { ICategory } from "@/models/Category";
import ImageUpload from "../ImageUpload";
import { FaUpload, FaTimes, FaDollarSign, FaBox, FaTag } from "react-icons/fa";
import api from "@/lib/axiosInstance";
import Link from "next/link";

interface ProductFormProps {
  userRole: string;
  chapter: string;
  categories: Partial<ICategory>[];
  initialData?: any;
  onSuccess?: () => void;
  url: string;
  chapterId: string;
}

function ProductForm({
  userRole,
  chapter,
  categories,
  initialData,
  chapterId,
  onSuccess,
  url,
}: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    chapter: chapterId,
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
        chapter:
          initialData.chapter || (userRole === "admin" ? "national" : chapterId),
        featured: initialData.featured || false,
        images: initialData.images || [],
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        chapter: userRole === "admin" ? "national" : chapterId,
        featured: false,
        images: [],
      });
    }
  }, [initialData, userRole, chapter]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
    toast.success("Image uploaded successfully!");
  };

  const handleRemoveImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== url),
    }));
    toast.info("Image removed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setIsLoading(true);
      const url = initialData
        ? `/store/products/${initialData._id}`
        : "/store/products";
      const method = initialData ? "PUT" : "POST";

      const response = await api({
        url,
        method,
        data: formData,
      });

      toast.success(
        `Product ${initialData ? "updated" : "created"} successfully!`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || `Failed to ${initialData ? "update" : "create"} product`;
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="bg-white border-gray-200 hover:bg-gray-50"
          >
            <Link href="/admin/store/products">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {initialData ? "Edit Product" : "Create New Product"}
            </h1>
            <p className="text-gray-600 mt-1">
              {initialData ? "Update your product details" : "Add a new product to your store"}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                    Product Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className={`w-full ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="chapter">
                    Chapter
                  </label>
                  <Input
                    id="chapter"
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleChange}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {userRole === "admin"
                      ? "National (all chapters)"
                      : `Your chapter: ${chapter}`}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                  Description *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product in detail..."
                  className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                    <span>⚠️</span> {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Pricing & Details Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Pricing & Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="price">
                    Price *
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className={`pl-10 ${errors.price ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.price}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="stock">
                    Stock Quantity *
                  </label>
                  <div className="relative">
                    <FaBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className={`pl-10 ${errors.stock ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.stock && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.stock}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
                    Category *
                  </label>
                  <div className="relative">
                    <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                    <Select
                      value={formData.category}
                      onValueChange={(value) => {
                        setFormData((prev) => ({ ...prev, category: value }));
                        if (errors.category) {
                          setErrors((prev) => ({ ...prev, category: "" }));
                        }
                      }}
                    >
                      <SelectTrigger className={`pl-10 ${errors.category ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category, index) => (
                          <SelectItem key={index} value={category.slug as string}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.category && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.category}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Product Toggle */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-blue-600" />
                <div>
                  <label className="block text-sm font-medium text-gray-900" htmlFor="featured">
                    Featured Product
                  </label>
                  <p className="text-sm text-gray-600">
                    Show this product in featured sections
                  </p>
                </div>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, featured: checked }))
                }
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Product Images
              </h2>
              
              <div className="space-y-4">
                <ImageUpload
                  onSuccess={(info) => handleImageUpload(info.secure_url)}
                  folder="products/"
                >
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-700">Upload Images</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </ImageUpload>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {formData.images.map((image, index) => (
                      <div key={image} className="relative group">
                        <img
                          src={image}
                          alt={`Product preview ${index + 1}`}
                          className="rounded-lg object-cover h-32 w-full shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {errors.images && (
                  <p className="text-sm text-red-600 mt-4 flex items-center gap-1">
                    <span>⚠️</span> {errors.images}
                  </p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={
                  onSuccess
                    ? () => onSuccess()
                    : () => router.push("/admin/store/products")
                }
                className="px-6 py-2"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {initialData ? "Updating..." : "Creating..."}
                  </>
                ) : initialData ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;