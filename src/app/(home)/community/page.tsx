import Posts from '@/components/Community'
import api from '@/lib/axiosInstance';
import React from 'react'

async function page() {
  let posts= [];
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
      <Posts posts={posts}/>
    </div>
  )
}

export default page