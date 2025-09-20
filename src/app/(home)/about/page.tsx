import AboutPage from '@/components/home/AboutPage'
import React, { Suspense } from 'react'

function page() {
  return (
    <div>
      <Suspense>
        <AboutPage />
      </Suspense>
    </div>
  )
}

export default page