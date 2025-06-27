"use client"
import { useEffect, useState } from 'react';
import Head from "next/head";
import BranchSummary from "@/components/ui/BranchSummary";
import SearchFilters from "@/components/ui/SearchFilter";
import BranchCard from "@/components/ui/BranchCard";
import Pagination from "@/components/ui/Pagination";
import CreateBranchModal from '@/components/CreatBranch';
import { FiPlus } from 'react-icons/fi';
import ViewActions from '@/components/ViewAction';
import api from '@/lib/axiosInstance';

const BranchOversight = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSuccess = () => {
    setIsModalOpen(false);
  };

   useEffect(()=>{
      const fetchBranches = async ()=>{
        try{
            const response = await api.get("/branch")
            console.log(response)
        }catch(error){
          console.log(error)
        }
      }

      fetchBranches()
   },[])


  const [branches, setBranches] = useState([
    {
      id: 1,
      name: "UNILAG Branch",
      status: "Active",
      location: "University of Lagos, Lagos",
      activity: "High Activity",
      leader: {
        name: "Sarah Okonkwo",
        email: "sarahokonkwo@gmail.com",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      },
      members: 124,
      events: 8,
      lastActivity: "2 hours ago",
    },
    // Add other branches here...
  ]);

  const handleCreateBranch = (newBranch: { name: string; location: string; institution: string }) => {
    // In a real app, you would send this to your API
    const branch = {
      id: branches.length + 1,
      name: newBranch.name,
      status: "Active",
      location: newBranch.location,
      institution: newBranch.institution,
      activity: "No Activity",
      leader: {
        name: "No Leader Assigned",
        email: "",
        avatar: "",
      },
      members: 0,
      events: 0,
      lastActivity: "Just created",
    };
    setBranches([...branches, branch]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Branch Oversight | CONCES Admin</title>
        <meta name="description" content="Branch management dashboard" />
      </Head>

      <main className="flex-1 overflow-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <BranchSummary />
          <SearchFilters />
          <ViewActions 
            branchCount={42} 
            onAddBranch={() => setIsModalOpen(true)}
          />

          {/* Branch Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>

          <Pagination totalBranches={42} currentPage={1} />
        </div>
      </main>

      <CreateBranchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default BranchOversight;