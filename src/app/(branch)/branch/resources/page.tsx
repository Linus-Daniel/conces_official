import ResourceTable from '@/components/ResourceTable'
import api from '@/lib/axiosInstance'
import { authOptions } from '@/lib/next-auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const getBranchResource = async (id:string)=>{
    try{
        const response = await api.get(`/chapters/${id}/resources/`);
        const responseData = response.data
        return responseData

    }catch(error){
        console.log(error)
    }
}

async function page() {
 const session = await getServerSession(authOptions);
 const branchId = session?.user.branch as string
 const resources =await getBranchResource(branchId)
  return (
    <div>
        <ResourceTable resources={resources} />
    </div>
  )
}

export default page