"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { productData } from "@/constant";

// Import icons from react-icons
import {
  FaStar,
  FaStarHalfAlt,
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

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const product = productData.find((item) => item.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="font-sans bg-gray-50 p-8">
        <p>Product not found.</p>
      </main>
    );
  }

  const handleAddToCart = () => {
    // addToCart(product, quantity);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <main className="font-sans bg-gray-50">
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600">
            <span className="hover:text-conces-blue cursor-pointer">Home</span>{" "}
            /{" "}
            <span className="hover:text-conces-blue cursor-pointer">Shop</span>{" "}
            /{" "}
            <span className="hover:text-conces-blue cursor-pointer">
              Apparel
            </span>{" "}
            / <span className="text-gray-500">{product.name}</span>
          </div>
        </div>
      </div>

      <section id="product-detail" className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            {/* Gallery */}
            <div
              id="product-gallery"
              className="w-full md:w-1/2 px-4 mb-8 md:mb-0"
            >
              <div className="relative mb-4 bg-white rounded-lg overflow-hidden">
                <span className="absolute top-4 left-4 bg-conces-blue text-white text-sm px-3 py-1 rounded-full z-10">
                  Best Seller
                </span>
                <div className="relative h-[450px] overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    src={product?.images?.[selectedImage] ?? "/placeholder.jpg"}
                    alt={`${product?.name ?? "Product"} image ${
                      selectedImage + 1
                    }`}
                    priority
                  />

                  {/* Magnify button */}
                  <button
                    className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded-full p-2 text-gray-700 hover:bg-opacity-100 transition"
                    aria-label="Zoom Image"
                  >
                    <FaSearch className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div
                id="thumbnails"
                className="flex space-x-2 overflow-x-auto pb-2"
              >
                {product?.images?.map((img, index) => (
                  <div
                    key={index}
                    className={`w-24 h-24 rounded-md overflow-hidden flex-shrink-0 border-2 cursor-pointer ${
                      selectedImage === index
                        ? "border-conces-blue"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div id="product-info" className="w-full md:w-1/2 px-4">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>

                <div className="flex items-center mb-4">
                  <div className="flex text-conces-gold space-x-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                  </div>
                  <span className="text-gray-600 ml-2">4.5 (126 reviews)</span>
                </div>

                <div className="flex items-center mb-6">
                  <span className="text-2xl font-bold text-conces-blue">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className="ml-2 text-gray-500 line-through">
                    ₦{(product.price * 1.2).toLocaleString()}
                  </span>
                  <span className="ml-3 bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    In Stock
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="bg-blue-50 border-l-4 border-conces-blue p-3 text-sm">
                    <p className="text-gray-700 flex items-center">
                      <FaHeart className="text-red-500 mr-2" />
                      Proceeds from every purchase support CONCES student
                      projects and scholarships
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Size
                  </label>
                  <div className="flex space-x-2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className={`w-10 h-10 rounded-md border ${
                          size === "M"
                            ? "border-2 border-conces-blue bg-blue-50 text-conces-blue font-medium"
                            : "border-gray-300 text-gray-700 hover:border-conces-blue"
                        } flex items-center justify-center`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-conces-blue mt-2 inline-block hover:underline cursor-pointer">
                    Size Guide
                  </span>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Quantity
                  </label>
                  <div className="flex">
                    <button
                      onClick={decrementQuantity}
                      className="bg-gray-100 px-3 py-2 rounded-l-md border border-gray-300 text-gray-600 hover:bg-gray-200"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min={1}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(1, Math.min(999, Number(e.target.value)))
                        )
                      }
                      className="w-16 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-conces-blue"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="bg-gray-100 px-3 py-2 rounded-r-md border border-gray-300 text-gray-600 hover:bg-gray-200"
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
                  <button
                    id="add-to-cart"
                    className="flex-1 bg-white border-2 border-conces-blue text-conces-blue py-3 px-6 rounded-md font-medium hover:bg-blue-50 transition"
                    onClick={handleAddToCart}
                  >
                    <FaCartPlus className="inline mr-2" />
                    Add to Cart
                  </button>
                  <button
                    id="buy-now"
                    className="flex-1 bg-conces-blue text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition"
                    onClick={() => {
                      handleAddToCart();
                      router.push("/cart");
                    }}
                  >
                    Buy Now
                  </button>
                </div>

                <div className="flex space-x-6 text-conces-blue text-2xl">
                  <a
                    href="https://wa.me/2348132735119"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="https://facebook.com/conces"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://instagram.com/conces"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://twitter.com/conces"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="payment-info"
        className="bg-white border-t border-gray-200 py-8"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-10 text-4xl text-conces-blue">
            <FaCcVisa />
            <FaCcMastercard />
            <FaShieldAlt />
            <FaMoneyBillWave />
          </div>
        </div>
      </section>
    </main>
  );
}
