"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { Product } from "@/types";
import { FaHeart, FaStar } from "react-icons/fa6";

type Props = { product: Product };

export default function ProductCard({product}:Props) {

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
    >


<div
                  id="product-card-3"
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition hover:shadow-md"
                >
                  <Link href={`/store/products/${product.id}`} className="relative">
                    <img
                      className="w-full h-64 object-cover"
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/aacf65afde-9e8a27c8cab576d18a24.png"
                      alt="eBook cover for Faith in Engineering showing bridge design with cross symbol, professional digital mockup"
                    />
                    <button className="absolute top-2 right-2 bg-white rounded-full p-2 text-gray-400 hover:text-royal-DEFAULT">
                      <FaHeart className="fa-regular fa-heart" />
                    </button>
                  </Link>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-gold">
                        <FaStar className="fa-solid fa-star" />
                        <FaStar className="fa-solid fa-star" />
                        <FaStar className="fa-solid fa-star" />
                        <FaStar className="fa-solid fa-star" />
                        <FaStar className="fa-regular fa-star" />
                      </div>
                      <span className="text-xs text-gray-500 ml-1">(18)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                    {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gold-DEFAULT text-lg">${product.price}</span>
                      <button className="bg-royal-DEFAULT text-white px-3 py-2 rounded-full text-sm hover:bg-royal-dark transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
   
    </motion.div>
  );
}
