"use client";
import Link from "next/link";
import React from "react";
import {
  FaUsers,
  FaPray,
  FaStore,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import useDailyVerse from "@/hooks/useDailyVerses";

type DashboardOverviewProps = {
  users: number;
  prayers: number;
  products: number;
  chapters: number;
  events: number;
};

export default function DashboardOverview({
  users,
  prayers,
  products,
  chapters,
  events,
}: DashboardOverviewProps) {
  const { reference, content, isLoading, error } = useDailyVerse();

  const stats = [
    {
      id: 1,
      name: "Total Users",
      value: users,
      icon: <FaUsers className="text-2xl" />,
      change: "+12%",
      changeType: "increase",
    },
    {
      id: 2,
      name: "Prayer Requests",
      value: prayers,
      icon: <FaPray className="text-2xl" />,
      change: "+5%",
      changeType: "increase",
    },
    {
      id: 3,
      name: "Store Products",
      value: products,
      icon: <FaStore className="text-2xl" />,
      change: "+3%",
      changeType: "increase",
    },
    {
      id: 4,
      name: "Chapters",
      value: chapters,
      icon: <FaMapMarkerAlt className="text-2xl" />,
      change: "0%",
      changeType: "neutral",
    },
    {
      id: 5,
      name: "Upcoming Events",
      value: events,
      icon: <FaCalendarAlt className="text-2xl" />,
      change: "+2",
      changeType: "increase",
    },
  ];

  return (
    <div className="text-gray-900">
      <h2 className="text-2xl font-bold text-royal-DEFAULT mb-6">
        Dashboard Overview
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p
                  className={`text-xs mt-1 ${
                    stat.changeType === "increase"
                      ? "text-green-500"
                      : stat.changeType === "decrease"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}{" "}
                  {stat.changeType === "increase"
                    ? "↑"
                    : stat.changeType === "decrease"
                    ? "↓"
                    : ""}
                </p>
              </div>
              <div
                className={`p-3 w-13 h-13 items-center justify-center flex rounded-full ${
                  stat.id % 2 === 0
                    ? "bg-royal-100 text-royal-DEFAULT"
                    : "bg-gold-100 text-gold-DEFAULT"
                }`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verse of the Day & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verse of the Day */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Verse of the Day</h3>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : error ? (
            <div>
              <p className="text-sm italic mb-2">{reference}</p>
              <p className="text-gray-700">{content}</p>
              {error && <p className="text-xs text-amber-600 mt-2">{error}</p>}
            </div>
          ) : (
            <div>
              <p className="text-sm italic mb-2 text-royal-DEFAULT font-medium">
                {reference}
              </p>
              <div
                className="text-gray-700 prose prose-sm"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href={"/admin/prayers"}
              className="bg-royal-50 text-royal-DEFAULT p-3 rounded-lg flex flex-col items-center justify-center hover:bg-royal-100 transition"
            >
              <FaPray className="text-xl mb-2" />
              <span className="text-sm">Add Prayer</span>
            </Link>
            <Link
              href={"/admin/users"}
              className="bg-royal-50 text-royal-DEFAULT p-3 rounded-lg flex flex-col items-center justify-center hover:bg-royal-100 transition"
            >
              <FaUsers className="text-xl mb-2" />
              <span className="text-sm">Add User</span>
            </Link>
            <Link
              href={"/admin/store/products/new"}
              className="bg-royal-50 text-royal-DEFAULT p-3 rounded-lg flex flex-col items-center justify-center hover:bg-royal-100 transition"
            >
              <FaStore className="text-xl mb-2" />
              <span className="text-sm">Add Product</span>
            </Link>
            <Link
              href={"/admin/events/new"}
              className="bg-royal-50 text-royal-DEFAULT p-3 rounded-lg flex flex-col items-center justify-center hover:bg-royal-100 transition"
            >
              <FaCalendarAlt className="text-xl mb-2" />
              <span className="text-sm">Add Event</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
