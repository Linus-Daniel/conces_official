import ProductForm from '@/components/admin/ProductForm'
import React from 'react'

const  page = async () => {
    const categories = [
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Books' },
        { id: '3', name: 'Clothing' },
        { id: '4', name: 'Home & Kitchen' },
        { id: '5', name: 'Sports & Outdoors' }
    ];
  return (
    <div>
            <ProductForm categories={categories} />
    </div>
  )
}

export default page