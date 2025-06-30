'use client';

import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from '../ui/ProductCard';
import Link from 'next/link';
import { productData } from '@/constant';
import { IProduct } from '@/models/Product';


export default function FeaturedProducts({products}:{products:IProduct[]}) {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl text-gray-900 font-bold">
            Featured Products
          </h2>
          <Link
            href="/store/products"
            className="text-royal-DEFAULT hover:underline flex items-center"
          >
            View All <FaArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 md:flex items-center justify-center hidden">
            <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-royal-700 hover:bg-royal-50">
              <FaChevronLeft />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 md:flex items-center justify-center hidden">
            <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-royal-700 hover:bg-royal-50">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}