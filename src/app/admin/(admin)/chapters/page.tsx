"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import ChapterSummary from "@/components/ui/ChapterSummary";
import SearchFilters from "@/components/ui/SearchFilter";
import ChapterCard from "@/components/ui/ChapterCard";
import CreateChapterModal from "@/components/CreateChapter";
import ViewActions from "@/components/ViewAction";
import api from "@/lib/axiosInstance";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const ChapterOversight = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chapteres, setChapters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalChapters = 42;
  const totalPages = Math.ceil(totalChapters / pageSize);

  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await api.get("/chapters?page=" + currentPage);
        setChapters(response.data.chapteres || []);
        console.log(response.data.chapteres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChapters();
  }, [currentPage]);

  console.log(chapteres);

  const handleCreateChapter = (newChapter: {
    name: string;
    location: string;
    institution: string;
  }) => {
    const chapter = {
      id: chapteres.length + 1,
      name: newChapter.name,
      status: "Active",
      location: newChapter.location,
      institution: newChapter.institution,
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
    setChapters([...chapteres, chapter]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Chapter Oversight | CONCES Admin</title>
        <meta name="description" content="Chapter management dashboard" />
      </Head>

      <main className="flex-1 overflow-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-6">
          <ChapterSummary />
          <SearchFilters />
          <ViewActions
            chapterCount={totalChapters}
            onAddChapter={() => setIsModalOpen(true)}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chapteres.map((chapter, index) => (
              <ChapterCard key={index} chapter={chapter} />
            ))}
          </div>

          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (_, p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === currentPage}
                      onClick={() => setCurrentPage(p)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>

      <CreateChapterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ChapterOversight;
