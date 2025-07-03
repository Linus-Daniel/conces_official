import AddResources from '@/components/addResources'
import { authOptions } from '@/lib/next-auth'
import { getServerSession } from 'next-auth'
import React from 'react'


async function page() {
    const session = await getServerSession(authOptions);
    const branch  = session?.user.branch as string;
  return (
    <div>
        <AddResources branch={branch} />
    </div>
  )
}

export default page