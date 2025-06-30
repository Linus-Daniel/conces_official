import { authOptions } from '@/lib/next-auth'
import ProductForm from '@/components/admin/ProductForm'
import api from '@/lib/axiosInstance'
import { ICategory } from '@/models/Category'
import { getServerSession } from 'next-auth'
import React from 'react'

const  page = async () => {
    const session = await getServerSession(authOptions)
    const userRole = session?.user.role as string
    let branchName;
    if (userRole == "branch-adming"){
      try{
        const response = await api.get("/branches")
        console.log(response.data)
        branchName = response.data
      }
      catch(error){

      }
    }
    const categories: Partial<ICategory>[] = [
      {
        name: "Shirts",
        slug: "shirts"
      },
      {
        name: "Wrist bangle",
        slug: "wrist-band"
      },
      {
        name: "Umbrellas",
        slug: "umbrellas"
      },
      {
        name: "shoes",
        slug: "shoes"
      },
      {
        name: "Holy books",
        slug: "bible"
      }
    ];
  
  return (
    <div>
            <ProductForm categories={categories} userRole={userRole} branch={branchName} />
    </div>
  )
}

export default page