"use client";

import { MentorshipApplicationCard } from "@/components/MentorshipCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Filter, Plus } from "lucide-react";

export default function MentorshipBrowsePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [mentorships, setMentorships] = useState<any[]>([]);
  const [filteredMentorships, setFilteredMentorships] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        const response = await api.get("/mentorships");
        const data = response.data;
        setMentorships(data);
        setFilteredMentorships(data);
      } catch (error) {
        console.error("Error fetching mentorships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorships();
  }, []);

  useEffect(() => {
    let results = mentorships;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        (mentorship) =>
          mentorship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentorship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentorship.mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentorship.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      results = results.filter(
        (mentorship) => mentorship.category === categoryFilter
      );
    }

    setFilteredMentorships(results);
  }, [searchTerm, categoryFilter, mentorships]);

  const categories = [
    "all",
    ...Array.from(new Set(mentorships.map((m) => m.category))),
  ];

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="animate-pulse text-royal-600">Loading mentorships...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-royal-900 dark:text-royal-100">
            Mentorship Programs
          </h1>
          <p className="text-muted-foreground">
            Find the perfect mentor to guide your journey
          </p>
        </div>

        {user && (
          <Button
            onClick={() => router.push("/user/mentorship/applications")}
            className="bg-gold-600 hover:bg-gold-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            My Applications
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search mentorships..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div> */}
      </div>

      {filteredMentorships.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="bg-royal-100 dark:bg-royal-900 p-4 rounded-full">
            <Search className="h-8 w-8 text-royal-600 dark:text-royal-400" />
          </div>
          <h3 className="text-xl font-medium text-foreground">
            No mentorships found
          </h3>
          <p className="text-muted-foreground text-center">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            className="text-royal-600 border-royal-600"
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentorships.map((mentorship) => (
            <MentorshipApplicationCard
              key={mentorship._id}
              mentorship={mentorship}
              studentId={user?.id as string}
            />
          ))}
        </div>
      )}
    </div>
  );
}