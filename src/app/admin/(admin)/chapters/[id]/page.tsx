"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import {
  FiArrowLeft,
  FiUsers,
  FiCalendar,
  FiBox,
  FiFileText,
  FiMapPin,
  FiBook,
  FiActivity,
  FiShoppingBag,
  FiUser,
  FiAward,
} from "react-icons/fi";
import api from "@/lib/axiosInstance";

interface Branch {
  _id: string;
  branchName: string;
  status: string;
  branchLocation: string;
  institution: string;
  leader: {
    name: string;
    email: string;
    avatar: string;
  };
  description: string;
  lastActivity: string;
}

interface Resource {
  _id: string;
  title: string;
  type: string;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
}

interface Member {
  _id: string;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
  avatar: string;
}

// Custom hooks for data fetching
const useBranchDetails = (id: string) => {
  return useQuery({
    queryKey: ["branch", id],
    queryFn: async () => {
      const response = await api.get(`/chapters/${id}`);
      return response.data.branch as Branch;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

const useBranchResources = (id: string) => {
  return useQuery({
    queryKey: ["branch-resources", id],
    queryFn: async () => {
      const response = await api.get(`/chapters/${id}/resources`);
      return response.data as Resource[];
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

const useBranchMembers = (id: string) => {
  return useQuery({
    queryKey: ["branch-members", id],
    queryFn: async () => {
      const response = await fetch(`/api/chapters/${id}/members`);
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }
      const data = await response.json();
      console.log(data)
      return data.users as Member[];
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

const useBranchProducts = (id: string) => {
  return useQuery({
    queryKey: ["branch-products", id],
    queryFn: async () => {
      const response = await api.get(`/chapters/${id}/store/products/`);
      return response.data as Product[];
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

const BranchDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("overview");

  // React Query hooks
  const {
    data: branch,
    isLoading: branchLoading,
    error: branchError,
  } = useBranchDetails(id);

  const {
    data: resources = [],
    isLoading: resourcesLoading,
    error: resourcesError,
  } = useBranchResources(id);

  const {
    data: members = [],
    isLoading: membersLoading,
    error: membersError,
  } = useBranchMembers(id);

  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useBranchProducts(id);

  // Derived loading state
  const isLoading =
    branchLoading || resourcesLoading || membersLoading || productsLoading;

  // Derived error state
  const error = branchError || resourcesError || membersError || productsError;

  // Stats calculation
  const stats = {
    members: members.length,
    events: 0, // This seems to not be implemented in the original
    products: products.length,
    contents: resources.length,
  };

  const statCards = [
    {
      name: "Total Members",
      value: stats.members,
      icon: FiUsers,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Branch Products",
      value: stats.products,
      icon: FiShoppingBag,
      color: "bg-amber-100 text-amber-600",
    },
    {
      name: "Resources",
      value: stats.contents,
      icon: FiFileText,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      name: "Events",
      value: stats.events,
      icon: FiCalendar,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error || !branch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Branch
          </h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "Branch not found"}
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{branch.branchName} | CONCES Admin</title>
        <meta name="description" content="Branch details" />
      </Head>

      <main className="flex-1 overflow-auto pb-20">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
              >
                <FiArrowLeft className="mr-2" /> Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {branch.branchName}
              </h1>
              <span
                className={`ml-4 px-3 py-1 text-sm rounded-full ${
                  branch.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {branch.status}
              </span>
            </div>
            <div className="flex items-center mt-2 text-gray-600">
              <FiMapPin className="mr-1" />
              <span>{branch.branchLocation}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <div
                key={stat.name}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {["overview", "resources", "products", "members"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Branch Information */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Branch Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Institution</p>
                    <p className="text-gray-900 font-medium">
                      {branch.institution}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Branch Leader</p>
                    <div className="flex items-center mt-1">
                      <img
                        src={branch.leader?.avatar}
                        alt={branch.leader?.name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-gray-900 font-medium">
                          {branch.leader?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {branch.leader?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-gray-900 mt-1">{branch.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Activity</p>
                    <p className="text-gray-900 font-medium">
                      {branch.lastActivity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Resources */}
              {resources.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Recent Resources
                    </h2>
                    <button
                      onClick={() => setActiveTab("resources")}
                      className="text-blue-600 text-sm font-medium hover:text-blue-800"
                    >
                      View all
                    </button>
                  </div>
                  <div className="space-y-4">
                    {resources.slice(0, 3).map((resource) => (
                      <div
                        key={resource._id}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                          <FiFileText className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-900">
                            {resource.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {resource.type} •{" "}
                            {new Date(resource.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "resources" && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Branch Resources
                </h2>
                {resourcesLoading && (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                )}
              </div>
              {resources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources.map((resource) => (
                    <div
                      key={resource._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
                          <FiFileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {resource.type}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(resource.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiBook className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No resources
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by uploading a new resource.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "products" && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Branch Products
                </h2>
                {productsLoading && (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                )}
              </div>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="object-cover w-full h-40"
                          />
                        ) : (
                          <div className="w-full h-40 flex items-center justify-center bg-gray-100">
                            <FiShoppingBag className="h-10 w-10 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {product.category}
                        </p>
                        <p className="text-lg font-semibold text-blue-600 mt-2">
                          ₦{product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No products
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No products are available for this branch.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "members" && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Branch Members
                </h2>
                {membersLoading && (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                )}
              </div>
              {members.length > 0 ? (
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Member
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {members.map((member) => (
                        <tr key={member._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={member.avatar}
                                  alt={member.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {member.name}
                                </div>
                                <div className="text-gray-500">
                                  {member.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                member.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {member.role}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(member.joinedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No members
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This branch doesn't have any members yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BranchDetail;
