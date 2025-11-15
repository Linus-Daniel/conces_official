"use client";
import { useState, useEffect } from "react";
import {
  Crown,
  Users,
  MapPin,
  GraduationCap,
  Calendar,
  BookOpen,
  Star,
} from "lucide-react";
import { IExecutive } from "@/models/Executive";
import { ExecutiveGridSkeleton, LoadingWithText } from "@/components/ui/Skeletons";

export default function ExecutivesPage() {
  const [activeExecutives, setActiveExecutives] = useState<IExecutive[]>([]);
  const [excos, setExcos] = useState<IExecutive[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");

  // Position hierarchy (top to bottom)
  const positionHierarchy = [
    "National President",
    "Vice President",
    "General Secretary",
    "Assistant General Secretary",
    "Financial Secretary",
    "Treasurer",
    "Organizing Secretary",
    "Publicity Secretary",
    "Prayer Secretary",
    "Traveling Secretary",
    "North East Zonal Coordinator",
  ];

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    try {
      setLoading(true);

      // Fetch active executives
      const activeResponse = await fetch("/api/executives?status=Active");
      const activeData = await activeResponse.json();

      // Fetch excos
      const excosResponse = await fetch("/api/executives?status=Excos");
      const excosData = await excosResponse.json();

      if (activeData.success && excosData.success) {
        setActiveExecutives(activeData.data);
        setExcos(excosData.data);
      }
    } catch (error) {
      console.error("Error fetching executives:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortExecutivesByHierarchy = (executives: IExecutive[]) => {
    return [...executives].sort((a, b) => {
      const aIndex = positionHierarchy.indexOf(a.position);
      const bIndex = positionHierarchy.indexOf(b.position);

      // If position not in hierarchy, put it at the end
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;

      return aIndex - bIndex;
    });
  };

  const ExecutiveCard = ({
    executive,
    isPresident = false,
  }: {
    executive: IExecutive;
    isPresident?: boolean;
  }) => (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        isPresident ? "border-2 border-yellow-400 relative" : ""
      }`}
    >
      {isPresident && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-bl-lg flex items-center gap-1">
          <Crown className="w-4 h-4" />
          <span className="text-xs font-bold">PRESIDENT</span>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {executive.avatar && (
            <img
              src={executive.avatar}
              alt={executive.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {executive.name}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              {isPresident && <Crown className="w-4 h-4 text-yellow-500" />}
              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  isPresident
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {executive.position}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{executive.institution}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">{executive.course}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm">Level {executive.level}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{executive.session}</span>
          </div>

          {executive.state && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{executive.state}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">{executive.department}</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header Skeleton */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Star className="w-10 h-10 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-900">
                  CONCES Executives
                </h1>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conference of Nigeria Christian Engineering Students - National
                Leadership Team
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>2024/2025 Spiritual Session</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Tabs Skeleton */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <div className="flex">
                <div className="bg-blue-600 text-white shadow-md px-6 py-2 rounded-md">
                  Loading...
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-8">
            {/* President Section Skeleton */}
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  National Leadership
                </h2>
                <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
              </div>
              <div className="flex justify-center mb-12">
                <div className="w-full max-w-md">
                  <ExecutiveGridSkeleton count={1} />
                </div>
              </div>
            </div>

            {/* Other Executives Section Skeleton */}
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Executive Council
                </h2>
                <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
              </div>
              <ExecutiveGridSkeleton count={8} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sortedActive = sortExecutivesByHierarchy(activeExecutives);
  const sortedExcos = sortExecutivesByHierarchy(excos);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="w-10 h-10 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">
                CONCES Executives
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conference of Nigeria Christian Engineering Students - National
              Leadership Team
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>2024/2025 Spiritual Session</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab("current")}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === "current"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Current Executives ({sortedActive.length})
            </button>
            <button
              onClick={() => setActiveTab("excos")}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === "excos"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Former Executives ({sortedExcos.length})
            </button>
          </div>
        </div>

        {/* Current Executives */}
        {activeTab === "current" && (
          <div>
            {sortedActive.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500">
                  No current executives found.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* President Section */}
                {sortedActive.filter(
                  (exec) => exec.position === "National President"
                ).length > 0 && (
                  <div>
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                        <Crown className="w-6 h-6 text-yellow-500" />
                        National Leadership
                      </h2>
                      <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                      {sortedActive
                        .filter(
                          (exec) => exec.position === "National President"
                        )
                        .map((executive) => (
                          <div
                            key={executive.id}
                            className="md:col-span-2 lg:col-span-3 flex justify-center"
                          >
                            <div className="w-full max-w-md">
                              <ExecutiveCard
                                executive={executive}
                                isPresident={true}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Other Executives */}
                {sortedActive.filter(
                  (exec) => exec.position !== "National President"
                ).length > 0 && (
                  <div>
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                        <Users className="w-6 h-6 text-blue-600" />
                        Executive Council
                      </h2>
                      <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {sortedActive
                        .filter(
                          (executive) =>
                            executive.position !== "National President"
                        )
                        .map((executive) => (
                          <ExecutiveCard
                            key={executive.id}
                            executive={executive}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Former Executives (Excos) */}
        {activeTab === "excos" && (
          <div>
            {sortedExcos.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500">
                  No former executives found.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Star className="w-6 h-6 text-gray-600" />
                    Former Executives
                  </h2>
                  <div className="w-24 h-1 bg-gray-400 mx-auto rounded-full"></div>
                  <p className="text-gray-600 mt-4">
                    Honoring those who have served with dedication
                  </p>
                </div>

                {/* Group by session */}
                {(() => {
                  const groupedBySessions = sortedExcos.reduce((acc, exec) => {
                    const session = exec.session;
                    if (!acc[session]) acc[session] = [];
                    acc[session].push(exec);
                    return acc;
                  }, {} as Record<string, IExecutive[]>);

                  return Object.entries(groupedBySessions)
                    .sort(([a], [b]) => b.localeCompare(a)) // Sort sessions in descending order
                    .map(([session, executives]) => (
                      <div key={session} className="mb-12">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {session}
                          </h3>
                          <div className="w-16 h-0.5 bg-gray-300 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {executives.map((executive) => (
                            <div
                              key={executive.id}
                              className="opacity-80 hover:opacity-100 transition-opacity"
                            >
                              <ExecutiveCard
                                executive={executive}
                                isPresident={
                                  executive.position === "National President"
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                })()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">
                CONCES National
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Conference of Nigeria Christian Engineering Students
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Building Christian Engineers for National Development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
