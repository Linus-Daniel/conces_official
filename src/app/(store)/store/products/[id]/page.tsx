"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaHeart,
  FaSearch,
  FaMinus,
  FaPlus,
  FaCartPlus,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaShieldAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";
import useCart from "@/zustand/useCart";

// Define TypeScript interfaces
interface ProductImage {
  url: string;
  alt?: string;
}

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImage[] | string[];
  rating?: number;
  reviews?: number;
}

// Fetch product function
const fetchProduct = async (id: string): Promise<IProduct> => {
  const response = await api.get(`/store/products/${id}`);
  return response.data;
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-conces-blue"></div>
      <p className="mt-4 text-lg text-gray-600">Loading product details...</p>
    </div>
  </div>
);

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
    const { addToCart } = useCart();

  const {
    data: product,
    error,
    isLoading,
  } = useQuery<IProduct, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Only run query if id exists
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  // Handle loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Handle error state
  if (error || !product) {
    return (
      <main className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Failed to load product.</p>
          <button
            onClick={() => router.push("/shop")}
            className="px-4 py-2 bg-conces-blue text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </main>
    );
  }

  // Helper function to get image URL regardless of format
  const getImageUrl = (image: ProductImage | string, index: number): string => {
    if (typeof image === "string") return image;
    return image.url || `/api/placeholder/400/400?text=Image+${index + 1}`;
  };

  // Helper function to get image alt text
  const getImageAlt = (image: ProductImage | string, index: number): string => {
    if (typeof image === "string")
      return `${product.name} - Image ${index + 1}`;
    return image.alt || `${product.name} - Image ${index + 1}`;
  };

  console.log(product);
  const finalPrice = product.price;
  const availableStock = product.stock || 0;
  const currentImage =
    product.images.length > 0
      ? getImageUrl(product.images[selectedImage], selectedImage)
      : "/api/placeholder/400/400?text=No+Image";

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      console.log("Product is out of stock");
      return;
    }
    try {
      const response = await addToCart(product?._id as string);
    } catch (error) {
      console.log(error);
    }
  };



  const incrementQuantity = () =>
    setQuantity((q) => Math.min(availableStock, q + 1));

  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <main className="bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="container mx-auto">
          <div className="text-sm text-gray-600">
            <span
              className="hover:text-conces-blue cursor-pointer"
              onClick={() => router.push("/")}
            >
              Home
            </span>{" "}
            /{" "}
            <span
              className="hover:text-conces-blue cursor-pointer"
              onClick={() => router.push("/shop")}
            >
              Shop
            </span>{" "}
            / <span className="text-gray-500">{product.name}</span>
          </div>
        </div>
      </nav>

      {/* Product Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-white rounded-xl shadow-sm overflow-hidden mb-4">
                {/* Wishlist Button */}
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-rose-50 hover:text-rose-500 transition-colors"
                  aria-label={
                    wishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <FaHeart
                    className={wishlisted ? "text-rose-500" : "text-gray-400"}
                  />
                </button>

                {/* Main Image */}
                <div className="relative aspect-square w-full">
                  <Image
                    fill
                    className="object-contain p-4"
                    src={currentImage}
                    alt={getImageAlt(
                      product.images[selectedImage],
                      selectedImage
                    )}
                    priority
                  />
                </div>

                {/* Zoom Button */}
                <button
                  className="absolute bottom-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                  aria-label="Zoom Image"
                >
                  <FaSearch className="text-gray-700" />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                        selectedImage === index
                          ? "border-conces-blue"
                          : "border-transparent hover:border-gray-200"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        src={getImageUrl(img, index)}
                        alt={getImageAlt(img, index)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>

                {/* Rating - Uncomment if needed */}
                {/* <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-conces-gold">
                    {[1, 2, 3, 4, 5].map((star) => (
                      star <= Math.floor(product.rating || 4.5) ? (
                        <FaStar key={star} size={16} />
                      ) : star === Math.ceil(product.rating || 4.5) && (product.rating || 4.5) % 1 > 0 ? (
                        <FaStarHalfAlt key={star} size={16} />
                      ) : (
                        <FaRegStar key={star} size={16} />
                      )
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {product.rating?.toFixed(1) || '4.5'} ({product.reviews || 126} reviews)
                  </span>
                </div> */}

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-conces-blue">
                    ₦{finalPrice.toLocaleString()}
                  </span>

                  {product.price > finalPrice && (
                    <span className="text-gray-400 line-through">
                      ₦{product.price.toLocaleString()}
                    </span>
                  )}

                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      availableStock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {availableStock > 0
                      ? `In Stock (${availableStock} available)`
                      : "Out of Stock"}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="bg-blue-50 border-l-4 border-conces-blue p-3 text-sm rounded">
                    <p className="text-gray-700 flex items-center gap-2">
                      <FaHeart className="text-rose-500 flex-shrink-0" />
                      Proceeds from every purchase support CONCES student
                      projects and scholarships
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-1 w-fit">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className={`w-10 h-10 flex items-center justify-center border rounded-l-md transition-colors ${
                        quantity <= 1
                          ? "bg-gray-100 border-gray-300 text-gray-400"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus size={12} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min={1}
                      max={availableStock}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setQuantity(
                          Math.max(1, Math.min(availableStock, value))
                        );
                      }}
                      className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-conces-blue"
                    />
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= availableStock}
                      className={`w-10 h-10 flex items-center justify-center border rounded-r-md transition-colors ${
                        quantity >= availableStock
                          ? "bg-gray-100 border-gray-300 text-gray-400"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                      aria-label="Increase quantity"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={availableStock === 0}
                    className={`flex-1 flex items-center justify-center gap-2 border-2 py-3 px-6 rounded-md font-medium transition-colors ${
                      availableStock === 0
                        ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                        : "border-conces-blue text-conces-blue hover:bg-blue-50"
                    }`}
                  >
                    <FaCartPlus size={16} />
                    {availableStock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                
                </div>

                {/* Social Sharing */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 text-sm">Share:</span>
                  <div className="flex gap-4 text-conces-blue">
                    <a href="#" aria-label="Share on WhatsApp">
                      <FaWhatsapp size={18} />
                    </a>
                    <a href="#" aria-label="Share on Facebook">
                      <FaFacebookF size={18} />
                    </a>
                    <a href="#" aria-label="Share on Instagram">
                      <FaInstagram size={18} />
                    </a>
                    <a href="#" aria-label="Share on Twitter">
                      <FaTwitter size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <FaShieldAlt size={20} />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCcVisa size={24} />
              <FaCcMastercard size={24} />
              <span className="text-sm">Cards Accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMoneyBillWave size={20} />
              <span className="text-sm">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
