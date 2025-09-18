import Posts from '@/components/Community'
import api from '@/lib/axiosInstance';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import React from 'react'

async function page() {
  let posts= [];
  const session = await getServerSession(authOptions)
  const userRole = session?.user.role;
  const authorized =  userRole === "admin" || userRole === "chapter-admin" || userRole== "alumni";
  try{
    const response = api.get("/community/posts");
    const postDatas = (await response).data;
    console.log(postDatas);
    posts = postDatas;
  }
  catch(error){
    console.log(error);
  }
  return (
    <div>
      <Posts posts={posts} authorized={authorized} />
    </div>
  )
}

export default page