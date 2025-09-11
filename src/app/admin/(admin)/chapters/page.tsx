"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import BranchSummary from "@/components/ui/BranchSummary"
import SearchFilters from "@/components/ui/SearchFilter"
import BranchCard from "@/components/ui/ChapterCard"
import CreateBranchModal from "@/components/CreateChapter"
import ViewActions from "@/components/ViewAction"
import api from "@/lib/axiosInstance"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

const BranchOversight = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [branches, setBranches] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  const totalBranches = 42
  const totalPages = Math.ceil(totalBranches / pageSize)

  const handleSuccess = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get("/chapters?page=" + currentPage)
        setBranches(response.data.branches || [])
        console.log(response.data.branches)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBranches()
  }, [currentPage])

  console.log(branches)

  const handleCreateBranch = (newBranch: { name: string; location: string; institution: string }) => {
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
    }
    setBranches([...branches, branch])
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Branch Oversight | CONCES Admin</title>
        <meta name="description" content="Branch management dashboard" />
      </Head>

      <main className="flex-1 overflow-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-6">
          <BranchSummary />
          <SearchFilters />
          <ViewActions branchCount={totalBranches} onAddBranch={() => setIsModalOpen(true)} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch,index) => (
              <BranchCard key={index} branch={branch} />
            ))}
          </div>

          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((_,p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === currentPage}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>

      <CreateBranchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  )
}

export default BranchOversight
