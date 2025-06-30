"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { product as productData } from "@/constant";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaSearch, FaMinus, FaPlus, FaCartPlus, FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaShieldAlt, FaMoneyBillWave } from "react-icons/fa";
import { IProduct } from "@/models/Product";
import api from "@/lib/axiosInstance";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [product, setProducts] = useState<IProduct | null>(null)

  useEffect(()=>{
    const fetchProduct = async ()=>{
      const response = await api.get(`/store/products/${id}`)
      const data =  response.data
      console.log(data)
      setProducts(data)
    }
    fetchProduct()
  },[id])

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <p className="text-lg text-gray-600">Product not found.</p>
      </main>
    );
  }

  const finalPrice = product.price;
  const availableStock = product.stock || 0;
  const currentImage = product?.images[selectedImage];
console.log(typeof(product.images))
  const handleAddToCart = () => {
    if (!product || !product?.id || !product?.name) {
      console.error("Invalid product data.");
      return;
    }

    const safeQuantity = Math.min(quantity, availableStock);

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: finalPrice,
      quantity: safeQuantity,
      image: currentImage,
      maxQuantity: availableStock,
    };

    console.log("Adding to cart:", cartItem);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const incrementQuantity = () => 
    setQuantity(q => Math.min(availableStock, q + 1));

  const decrementQuantity = () => 
    setQuantity(q => Math.max(1, q - 1));

  return (
    <main className="bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="container mx-auto">
          <div className="text-sm text-gray-600">
            <span className="hover:text-conces-blue cursor-pointer" onClick={() => router.push("/")}>
              Home
            </span> /{" "}
            <span className="hover:text-conces-blue cursor-pointer" onClick={() => router.push("/shop")}>
              Shop
            </span> /{" "}
            <span className="text-gray-500">{product.name}</span>
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
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <FaHeart className={wishlisted ? "text-rose-500" : "text-gray-400"} />
                </button>

                {/* Main Image */}
                <div className="relative aspect-square w-full">
                  <Image
                    fill
                    className="object-contain p-4"
                    src={currentImage}
                    alt={product.name}
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
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>

                {/* Rating */}
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
                
                    <span className="text-gray-400 line-through">
                      ₦{(product.price * 1.2).toLocaleString()}
                    </span>
                  
                  <span className={`px-2 py-1 rounded text-xs ${
                    availableStock > 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {availableStock > 0 
                      ? `In Stock (${availableStock} available)` 
                      : 'Out of Stock'}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="bg-blue-50 border-l-4 border-conces-blue p-3 text-sm rounded">
                    <p className="text-gray-700 flex items-center gap-2">
                      <FaHeart className="text-rose-500 flex-shrink-0" />
                      Proceeds from every purchase support CONCES student projects and scholarships
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
                        quantity <= 1 ? 'bg-gray-100 border-gray-300 text-gray-400' : 'border-gray-300 hover:bg-gray-50'
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
                        setQuantity(Math.max(1, Math.min(availableStock, value)));
                      }}
                      className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-conces-blue"
                    />
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= availableStock}
                      className={`w-10 h-10 flex items-center justify-center border rounded-r-md transition-colors ${
                        quantity >= availableStock ? 'bg-gray-100 border-gray-300 text-gray-400' : 'border-gray-300 hover:bg-gray-50'
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
                        ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-conces-blue text-conces-blue hover:bg-blue-50'
                    }`}
                  >
                    <FaCartPlus size={16} />
                    {availableStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={availableStock === 0}
                    className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors ${
                      availableStock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-conces-blue text-white hover:bg-blue-700'
                    }`}
                  >
                    Buy Now
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