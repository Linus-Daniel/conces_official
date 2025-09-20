// app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  FiUsers,
  FiBriefcase,
  FiAward,
  FiBarChart2,
  FiSettings,
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import Link from "next/link";
import { useHubProjects, useHubSkills, useHubUsers } from "@/hooks/useHubData";

interface Stats {
  totalUsers: number;
  totalSkills: number;
  totalProjects: number;
}

export default function AdminDashboard() {
    
      const { data: userDatas, isLoading: lodaingUsers } = useHubUsers();
      const { data: projectData, isLoading: loadingProjects } = useHubProjects();
      const { data: SkillsData, isLoading: loadingSkills } = useHubSkills();
      const loading = lodaingUsers || loadingProjects || loadingSkills;
      console.log(userDatas, SkillsData, projectData);

      const totalUsers = userDatas?.users.length || 0;
      const totalProjects = projectData?.projects.length || 0;
      const totalSkills = SkillsData?.skills.length || 0;
  console.log(totalUsers, totalProjects, totalSkills)
  const [activeTab, setActiveTab] = useState("overview");


  const statCards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FiUsers,
      color: "bg-blue-100 text-blue-600",
      href: "/admin/users",
    },
    {
      title: "Skills",
      value: totalSkills,
      icon: FiAward,
      color: "bg-purple-100 text-purple-600",
      href: "/admin/skills",
    },
    {
      title: "Projects",
      value: totalProjects,
      icon: FiBriefcase,
      color: "bg-amber-100 text-amber-600",
      href: "/admin/projects",
    },

  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your talent platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FiSettings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statCards.map((stat) => (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/users/create"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2">
                <FiUsers className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                Add User
              </span>
            </Link>
            <Link
              href="/admin/skills/create"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-2">
                <FiAward className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                Add Skill
              </span>
            </Link>
            <Link
              href="/admin/projects/create"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 mb-2">
                <FiBriefcase className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                Add Project
              </span>
            </Link>
            <Link
              href="/admin/portfolios/create"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-3 rounded-full bg-green-100 text-green-600 mb-2">
                <FiBarChart2 className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                Add Portfolio
              </span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Users
              </h2>
              <Link
                href="/admin/users"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {/* Sample user data - in real app, fetch from API */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <FiUsers className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        User {i}
                      </p>
                      <p className="text-sm text-gray-500">
                        user{i}@example.com
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Projects
              </h2>
              <Link
                href="/admin/projects"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {/* Sample project data - in real app, fetch from API */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    Project {i}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    Description of project {i}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      React
                    </span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full ml-2">
                      Node.js
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
