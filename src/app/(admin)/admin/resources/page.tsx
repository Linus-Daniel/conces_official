"use client";
import api from "@/lib/axiosInstance";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaBook,
  FaFilePdf,
  FaVideo,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import {
  ApprovalSystem,
  createApprovalComponents,
} from "@/components/admin/ApprovalSystem";
import { useApprovalSystem } from "@/hooks/useApprove";

export type Content = {
  _id: string;
  title: string;
  type: "devotional" | "pdf" | "video" | "blog" | "article" | "other";
  category: string;
  author?: string;
  videoUrl: string;
  content: string;
  date: string;
  views: number;
  fileUrl?: string;
  approved: boolean;
  featured: boolean;
};

export default function ContentManagement() {
  const [resources, setResources] = useState<Content[]>([]);
  const { data } = useSession();
  const userRole = data?.user?.role || "user";

  // 🔥 ONE hook handles all approval logic
  const approvalSystem = useApprovalSystem({
    items: resources,
    setItems: setResources,
    entity: "resources",
    userRole,
  });

  // 🔥 Create reusable table components
  const { ApprovalBadge, ApprovalActions, SelectAllCheckbox, ItemCheckbox } =
    createApprovalComponents<Content>(approvalSystem);

  // Custom filters state (separate from approval system)
  const [selectedType, setSelectedType] = useState("all");

  // Apply type filter to already approval-filtered items
  const finalFilteredItems = React.useMemo(() => {
    return approvalSystem.filteredItems.filter((content) => {
      const matchesType =
        selectedType === "all" || content.type === selectedType;
      return matchesType;
    });
  }, [approvalSystem.filteredItems, selectedType]);

  useEffect(() => {
    const getResources = async () => {
      try {
        const response = await api.get("/resources");
        console.log(response.data);
        setResources(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getResources();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="text-red-500" />;
      case "video":
        return <FaVideo className="text-blue-500" />;
      default:
        return <FaBook className="text-royal-DEFAULT" />;
    }
  };

  const clearAllFilters = () => {
    approvalSystem.clearFilters();
    setSelectedType("all");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-royal-DEFAULT">
          Resources Management
        </h2>
        <Link
          href={"/admin/resources/create"}
          className="bg-royal-DEFAULT text-white px-4 py-2 rounded-lg flex items-center hover:bg-royal-dark transition"
        >
          <FaPlus className="mr-2" /> Add Resource
        </Link>
      </div>

      {/* 🔥 ALL filters, search, and batch actions in ONE component */}
      <ApprovalSystem
        {...approvalSystem}
        totalItems={resources.length}
        searchFields={["title", "category", "author"]}
        searchPlaceholder="Search resources..."
        additionalFilters={
          <>
            {/* Type Filter */}
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="devotional">Devotional</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="blog">Blog</option>
              <option value="article">Article</option>
            </select>
          </>
        }
      />

      {/* Override the clear filters to include our custom filter */}
      <div className="px-4">
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Clear All Filters
        </button>
      </div>

      {/* Results count - using final filtered items */}
      <div className="px-4 text-sm text-gray-600">
        Showing {finalFilteredItems.length} of {resources.length} resources
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {approvalSystem.canApprove && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <SelectAllCheckbox />
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {finalFilteredItems.map((content) => (
              <tr key={content._id}>
                {approvalSystem.canApprove && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ItemCheckbox item={content} />
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getTypeIcon(content.type)}
                    </div>
                    <div className="ml-4">
                      <Link href={`/admin/resources/${content._id}`} className="text-sm font-medium text-gray-900">
                        {content.title}
                      </Link>
                      <div className="text-sm text-gray-500">
                        {content.date}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full capitalize ${
                      content.type === "devotional"
                        ? "bg-royal-100 text-royal-DEFAULT"
                        : content.type === "pdf"
                        ? "bg-red-100 text-red-800"
                        : content.type === "video"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {content.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {content.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {content.author || "Linus Daniel"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ApprovalBadge approved={content.approved} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button className="text-royal-DEFAULT hover:text-royal-dark">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                    <ApprovalActions item={content} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {finalFilteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No resources found matching your filters
        </div>
      )}
    </div>
  );
}
