import React, { useEffect, useState } from "react";
import { FaPray, FaCommentDots, FaLightbulb, FaPlus } from "react-icons/fa";
import api from "@/lib/axiosInstance";
import { Loader2 } from "lucide-react";
import { PrayerWallItem } from "../Community";
import CreatePostButton from "../PostButton";

type SidebarProps = {
  onCreatePost: () => void;
};

export default function Sidebar({ onCreatePost }: SidebarProps) {
  return (
    <div className="w-full md:w-1/4 space-y-6">
<CreatePostButton onCreatePost={() => console.log('Post modal opened')} />


      <PrayerWall />
      
      <div className="bg-gradient-to-r from-royal-DEFAULT to-royal-dark rounded-lg p-4 md:p-5 text-white">
        <h3 className="font-bold text-lg mb-2">Join Mentorship Program</h3>
        <p className="text-sm mb-4 text-gray-100">
          Connect with experienced Christian engineers who can guide your
          spiritual and professional growth.
        </p>
        <button className="bg-gold hover:bg-gold-dark text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
          Apply Now
        </button>
      </div>
    </div>
  );
}

function PrayerWall() { 
  const [prayers,setPrayers] = useState<PrayerWallItem[]>([])
  const [loader,setLoader] = useState<boolean>(false)
  useEffect(()=>{
    const fetchPrayer = async()=>{
      setLoader(true)
      try{
       const  response = await api.get("/prayer-request");
       console.log(response.data)
       setPrayers(response.data)
       setLoader(false)
      }
      catch(error){
        console.log(error,"Failed to fetch prayers")
        setLoader(false)
      }
    }
    fetchPrayer()
  },[])
  if (loader){
return(
  <div className="flex w-full h-full items-center justify-center">
    <Loader2 className="animate-spin"/>
    </div>
)
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-royal-DEFAULT text-white p-3 md:p-4 flex items-center justify-between">
        <h3 className="font-semibold">Prayer Wall</h3>
        <span className="text-gold-light text-sm hover:underline cursor-pointer">
          View All
        </span>
      </div>
      <div className="p-3 md:p-4 space-y-4 max-h-[300px] overflow-y-auto">
        {prayers.map(item => (
          <div key={item._id} className="border-b border-gray-100 pb-3 last:border-0">
            <div className="flex items-center mb-2">
              <img
                src={item.creator?.avatar}
                alt={item.creator?.fullName}
                className="w-8 h-8 rounded-full mr-2"
              />
              <p className="text-sm font-medium">{item.creator?.fullName}</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">{item?.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{item?.createdAt}</span>
              <button className="text-xs text-royal-DEFAULT hover:underline">
                I've prayed ({item.prayed})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}