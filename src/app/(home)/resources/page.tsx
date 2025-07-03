import ResourcePage from '@/components/ResourcesPage'
import api from '@/lib/axiosInstance'
import { authOptions } from '@/lib/next-auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const getResources = async() =>{
  try{
    const response = await api.get("/resources")
    const resources = response.data
    return resources
  }
  catch(error){
    console.log(error)
  }
}
async function page() {
  const resources = await getResources()
  const session = await getServerSession(authOptions)
  const userRole  = session?.user.role as string
  
  return (
    <div>
      <ResourcePage resources={resources} userRole={userRole} />
    </div>
  )
}

export default page