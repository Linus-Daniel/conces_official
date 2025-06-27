import { FaSearch } from "react-icons/fa";

export default function CommunityHeader() {
  return (
    <section className="bg-white py-4 md:py-6 border-b sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-royal-DEFAULT">
            Community Hub
          </h1>
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search discussions, prayer requests, projects…"
              className="w-full pl-10 pr-4 placeholder:text-sm text-conces-blue py-2 placeholder:text-gray-500 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}