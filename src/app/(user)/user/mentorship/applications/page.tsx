import MentorshipApplicationsPage from '@/components/ApplicationsTable';
import api from '@/lib/axiosInstance';
import { r } from 'framer-motion/dist/types.d-CQt5spQA';
import { cookies } from 'next/headers';
import React from 'react'

const getApplications = async ()=>{
  const cookieStorage = await cookies()
  try {
    const response = await api.get('/mentorships/application/',{
      headers:{
        cookie:cookieStorage.toString()
      }
    });
    console.log("Applications fetched successfully:", response);
    return response.data.mentorships || [];

  }
  catch(error){
    console.error("Error fetching applications:", error);
    return [];
  }
}
async function page() {

const data = await getApplications();
console.log("Applications:", data);

  return (
    <div>
   
      <MentorshipApplicationsPage 
  userType="student" 
  data={data}
/>
    </div>
  )
}

export default page
