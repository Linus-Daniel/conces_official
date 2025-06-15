import PrayerManagement from '@/components/admin/client_pages/prayers'
import api from '@/lib/axiosInstance'
import React from 'react'

const  getPrayers = async ()=>{
  try{
    const response = await api.get("/prayer-request")
    const prayerRequests = response.data 
    console.log(prayerRequests)
    return prayerRequests

  }
  catch(error){
    console.log(error)
  }
}

const page = async()=> {

  const prayers = await getPrayers()
  return (
    <div>
      <PrayerManagement prayers={prayers} />
    </div>
  )
}

export default page