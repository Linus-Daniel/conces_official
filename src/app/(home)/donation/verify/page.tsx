import DonationVerification from '@/components/VerifyDonation'
import React, { Suspense } from 'react'

function page() {
  return (
    <div>
      <Suspense>
        <DonationVerification />
      </Suspense>
      
    </div>
  )
}

export default page
