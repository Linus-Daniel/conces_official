"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaHeart, FaRegHeart, FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { Product } from "@/types";
import { IProduct } from "@/models/Product";
import { FaPlus } from "react-icons/fa6";
import useCart from "@/zustand/useCart";


export default function ProductCard({ product }:{product:IProduct}) {
  const {addToCart} = useCart()
  const handleAddToCart = async ()=>{

    try{
      const response = await addToCart(product?._id as string)

    }
    catch(error){
      console.log(error)
    }


  }
  const rating = 4; // Replace with actual product rating
  const reviewCount = 18; // Replace with actual review count
  const isWishlisted = false; // Replace with actual wishlist state
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md"
    >
      {/* Product Image with Wishlist Button */}
      <div className="relative group">
        <Link href={`/store/products/${product._id}`}>
          <img
            className="w-full h-32 sm:h-48 object-contain p-4 bg-gray-50"
            src={product.images?.[0] || "/images/shirt.png"}
            alt={product.name}
          />
        </Link>
        
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-rose-50 hover:text-rose-500 transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <FaHeart className="text-rose-500" />
          ) : (
            <FaRegHeart className="text-gray-400 group-hover:text-rose-500" />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        {/* Product Title */}
        <Link href={`/store/products/${product?._id}`}>
          <h3 className="font-medium text-sm sm:text-md text-gray-900 line-clamp-2 hover:text-royal-DEFAULT">
            {product.name}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              i < Math.floor(rating) ? (
                <FaStar key={i} className="w-3 h-3" />
              ) : (
                <FaRegStar key={i} className="w-3 h-3" />
              )
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
          
              <span className="font-bold text-lg text-royal-DEFAULT">
                ${product.price.toFixed(2)}
              </span>
          
          </div>

          <button 
          onClick={handleAddToCart}
            className="p-2 flex items-center gap-1  rounded-full bg-royal-DEFAULT  text-white hover:bg-royal-detext-royal-DEFAULT-dark transition-colors"
            aria-label="Add to cart"
          >
            <FaShoppingCart className="w-4 h-4" />
            <FaPlus size={10} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}