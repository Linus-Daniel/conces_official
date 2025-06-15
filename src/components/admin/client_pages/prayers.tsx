"use client"
import React, { useState } from "react";
import { FaPray, FaPlus } from "react-icons/fa";
import PrayerCard from "@/components/ui/PrayerCard";
import PrayerFilters from "@/components/PrayerFilter";
import { Prayer } from "@/types";



const PrayerManagement = ({prayers}:{prayers:Prayer[]}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  
  const filteredPrayers = prayers
    .filter(prayer => {
      const matchesSearch =
        prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prayer.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || prayer.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOption === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortOption === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return b.prayedCount - a.prayedCount;
    });

  const handleApprove = (id: string) => {
    console.log("Approve prayer:", id);
    // Implement approval logic
  };

  const handleReject = (id: string) => {
    console.log("Reject prayer:", id);
    // Implement rejection logic
  };

  const handleEdit = (id: string) => {
    console.log("Edit prayer:", id);
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    console.log("Delete prayer:", id);
    // Implement delete logic
  };

  return (
    <div className="container mx-auto px-2 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-royal-DEFAULT">Prayer Wall Management</h1>
        <button 
          className="bg-royal-DEFAULT text-white px-4 py-2 rounded-lg flex items-center hover:bg-royal-dark transition"
          onClick={() => console.log("Add new prayer")}
        >
          <FaPlus className="mr-2" /> Add Prayer
        </button>
      </div>
      
      <PrayerFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
        {filteredPrayers.map((prayer,index) => (
          <PrayerCard
            key={index}
            prayer={prayer}
            onApprove={handleApprove}
            onReject={handleReject}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredPrayers.length === 0 && (
        <div className="text-center py-12">
          <div className="flex flex-col items-center justify-center">
            <FaPray className="text-gray-300 text-5xl mb-4" />
            <p className="text-gray-500">No prayers found matching your criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerManagement;