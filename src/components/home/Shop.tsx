"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductCard from '../ui/ProductCard'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import api from '@/lib/axiosInstance'
import { IProduct } from '@/models/Product'

function Shop() {
  const [products,setProducts] = useState<IProduct[]>([])
  useEffect(()=>{
    const fetchProducts = async ()=>{
      const response =await api.get("/store/products")
      const productsData = response.data
      setProducts(productsData)

    }
fetchProducts()
  },[])
  return (
    <div>
        <section id="shop" className="py-20 bg-white">
        <div className="container mx-auto px-2">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-royal-100 text-royal-700 font-medium rounded-full text-sm mb-4">
              CONCES Store
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Official <span className="text-royal-700">Merchandise</span>
            </h2>
            <div className="w-20 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              Show your CONCES pride with our high-quality branded merchandise.
              Every purchase supports our mission and programs.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4">
            {
  [...products] // create a shallow copy so we don't mutate the original
    .sort(() => Math.random() - 0.5) // shuffle the array
    .slice(0, 8) // get the first 8 random products
    .map((product, index) => (
      <ProductCard product={product} key={index} />
    ))
}
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 md:flex items-center justify-center hidden">
              <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-royal-700 hover:bg-royal-50">
                <FaChevronLeft className="fa-solid fa-chevron-left" />
              </button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 md:flex items-center justify-center hidden">
              <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-royal-700 hover:bg-royal-50">
                <FaChevronRight className="fa-solid fa-chevron-right" />
              </button>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
                href={"/store"}
              className="inline-block px-8 py-3 bg-royal-600 text-white font-bold rounded-lg hover:bg-royal-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            >
              Visit Store
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop
