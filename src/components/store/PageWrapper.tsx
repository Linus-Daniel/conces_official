import React, { Suspense } from 'react'
import ProductsPage from './Products'
import { IProduct } from '@/models/Product'

function PageWrapper( {products}:{ products: IProduct[] }) {
  return (
    <Suspense>
      <ProductsPage products={products} />
    </Suspense>
  )
}

export default PageWrapper