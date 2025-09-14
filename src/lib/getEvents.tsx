// components/HubDataTable.tsx - Example usage component
import React, { useState } from "react";
import { useHubUsers, useHubProjects, useHubSkills } from "@/hooks/useHubData";
import { QueryParams } from "@/types/hub";

interface HubDataTableProps {
  dataType: "users" | "projects" | "skills";
}

const HubDataTable: React.FC<HubDataTableProps> = ({ dataType }) => {
  const [params, setParams] = useState<QueryParams>({
    page: 1,
    limit: 10,
    search: "",
    category: "",
  });

  // Use appropriate hook based on data type
  const { data, isLoading, error, refetch } =
    dataType === "users"
      ? useHubUsers(params)
      : dataType === "projects"
      ? useHubProjects(params)
      : useHubSkills(params);

  const handleSearch = (searchTerm: string) => {
    setParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleCategoryFilter = (category: string) => {
    setParams((prev) => ({ ...prev, category, page: 1 }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading {dataType}
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                {error instanceof Error
                  ? error.message
                  : "Unknown error occurred"}
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => refetch()}
                className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const items =
    dataType === "users"
      ? (data as any).users
      : dataType === "projects"
      ? (data as any).projects
      : (data as any).skills;

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder={`Search ${dataType}...`}
          value={params.search || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {dataType === "skills" && (data as any).categories && (
          <select
            value={params.category || ""}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {(data as any).categories.map((category: string) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {items.map((item: any) => (
            <li key={item._id} className="px-6 py-4">
              {dataType === "users" && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.email}</p>
                    {item.university && (
                      <p className="text-sm text-gray-500">
                        {item.university} - {item.major}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              )}

              {dataType === "projects" && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm text-blue-600">
                      By: {item.userId.name}
                    </p>
                    <div className="mt-1">
                      {item.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              )}

              {dataType === "skills" && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-sm text-blue-600">
                      By: {item.user.name}
                    </p>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {(data.pagination.page - 1) * data.pagination.limit + 1} to{" "}
          {Math.min(
            data.pagination.page * data.pagination.limit,
            data.pagination.total
          )}{" "}
          of {data.pagination.total} results
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(data.pagination.page - 1)}
            disabled={data.pagination.page === 1}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded"
          >
            Previous
          </button>

          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">
            Page {data.pagination.page} of {data.pagination.pages}
          </span>

          <button
            onClick={() => handlePageChange(data.pagination.page + 1)}
            disabled={data.pagination.page === data.pagination.pages}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HubDataTable;
