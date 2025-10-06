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
  FaCcVisa,
  FaCcMastercard,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCheck,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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

// Skeleton Loader Component
const ProductSkeleton = () => (
  <main className="bg-gray-50">
    {/* Breadcrumb Skeleton */}
    <nav className="bg-gray-100 py-3 px-4">
      <div className="container mx-auto">
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </nav>

    {/* Product Section Skeleton */}
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery Skeleton */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
              <div className="relative aspect-square w-full bg-gray-200 animate-pulse"></div>
            </div>
            {/* Thumbnails Skeleton */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Title Skeleton */}
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>

              {/* Price Skeleton */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Info Box Skeleton */}
              <div className="h-16 w-full bg-gray-100 rounded mb-6 animate-pulse"></div>

              {/* Quantity Selector Skeleton */}
              <div className="mb-6">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-10 w-36 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Button Skeleton */}
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse mb-6"></div>

              {/* Social Share Skeleton */}
              <div className="flex items-center gap-4">
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-5 w-5 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Payment Methods Skeleton */}
    <section className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-32 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </section>
  </main>
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
    enabled: !!id,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Handle loading state with skeleton
  if (isLoading) {
    return <ProductSkeleton />;
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

  // Helper functions
  const getImageUrl = (image: ProductImage | string, index: number): string => {
    if (typeof image === "string") return image;
    return image.url || `/api/placeholder/400/400?text=Image+${index + 1}`;
  };

  const getImageAlt = (image: ProductImage | string, index: number): string => {
    if (typeof image === "string")
      return `${product.name} - Image ${index + 1}`;
    return image.alt || `${product.name} - Image ${index + 1}`;
  };

  const finalPrice = product.price;
  const availableStock = product.stock || 0;
  const currentImage =
    product.images.length > 0
      ? getImageUrl(product.images[selectedImage], selectedImage)
      : "/api/placeholder/400/400?text=No+Image";

  // Share functionality
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out ${
    product.name
  } - ₦${finalPrice.toLocaleString()}`;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedText = encodeURIComponent(shareText);

    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    };

    if (platform === "instagram") {
      // Instagram doesn't support web sharing, so copy link instead
      handleCopyLink();
    } else if (urls[platform as keyof typeof urls]) {
      window.open(
        urls[platform as keyof typeof urls],
        "_blank",
        "width=600,height=400"
      );
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      console.log("Product is out of stock");
      return;
    }

    setIsAddingToCart(true);
    try {
      const response = await addToCart(product?._id as string, quantity);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAddingToCart(false);
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
                    disabled={availableStock === 0 || isAddingToCart}
                    className={`flex-1 flex items-center justify-center gap-2 border-2 py-3 px-6 rounded-md font-medium transition-colors ${
                      availableStock === 0 || isAddingToCart
                        ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                        : "border-conces-blue text-conces-blue hover:bg-blue-50"
                    }`}
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <FaCartPlus size={16} />
                        {availableStock === 0 ? "Out of Stock" : "Add to Cart"}
                      </>
                    )}
                  </button>
                </div>

                {/* Social Sharing */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 text-sm">Share:</span>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="text-conces-blue hover:text-green-600 transition-colors"
                      aria-label="Share on WhatsApp"
                    >
                      <FaWhatsapp size={18} />
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="text-conces-blue hover:text-blue-600 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebookF size={18} />
                    </button>
                    <button
                      onClick={() => handleShare("instagram")}
                      className="text-conces-blue hover:text-pink-600 transition-colors relative"
                      aria-label="Copy link (Instagram)"
                    >
                      {copied ? (
                        <FaCheck size={18} className="text-green-600" />
                      ) : (
                        <FaInstagram size={18} />
                      )}
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="text-conces-blue hover:text-gray-900 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <FaXTwitter size={18} />
                    </button>
                  </div>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 mt-2">
                    Link copied to clipboard!
                  </p>
                )}
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
