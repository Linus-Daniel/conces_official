"use client"
import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type Props = {
    category:{
        id:string;
        name:string;
        image:string | StaticImageData;
        count:number
    }
}

export default function CategoryCard({ category }:Props) {
  return (
    <Link href={`/products?category=${category.id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
      >
        <div className="relative pt-[70%] bg-gray-100">
          <Image
            src={category.image}
            alt={category.name}
            width={500}
            height={50}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
          <p className="text-sm text-gray-200">{category.count} products</p>
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          className="absolute bottom-0 left-0 h-1 bg-primary origin-left transition-all duration-300"
        />
      </motion.div>
    </Link>
  )
}