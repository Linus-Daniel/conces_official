// components/admin/SearchBar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../hooks/hooks";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
}

export function SearchBar({ placeholder = "Search...", defaultValue = "" }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (debouncedSearchTerm) {
      params.set("search", debouncedSearchTerm);
      params.delete("page"); // Reset to first page when searching
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  }, [debouncedSearchTerm, router, searchParams]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-royal-DEFAULT focus:border-royal-DEFAULT sm:text-sm"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}