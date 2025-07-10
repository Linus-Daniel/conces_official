import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <main>
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-4">Mentorship Requests</h1>
        <Link href={"/admin/mentorship/requests"} className="border-[2px] px-2 py-1 border-conces-blue bg-royal-900 text-white rounded-md">View Request</Link>
      </div>
    </main>
  )
}

export default page
