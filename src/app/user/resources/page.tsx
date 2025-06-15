"use client"
import ResourceCard from "@/components/user/ResourcesCard";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

// Resources Content Component
const Resources = () => {

    const [resources, setResources] = useState([
        {
          id: 1,
          title: "Faith & Engineering eBook",
          type: "ebook",
          category: "faith",
        },
        {
          id: 2,
          title: "Python for Engineers Tutorial",
          type: "tutorial",
          category: "technical",
        },
        {
          id: 3,
          title: "Resume Template Pack",
          type: "template",
          category: "career",
        },
      ]);
return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-conces-blue">
          Learning Resources
        </h2>
        <div className="flex space-x-2">
          <button className="border border-conces-blue text-conces-blue px-4 py-2 rounded-lg hover:bg-conces-blue hover:text-white transition-colors">
            Upload Resource
          </button>
          <button className="bg-conces-blue text-white px-4 py-2 rounded-lg hover:bg-conces-blue-dark transition-colors">
            Request Resource
          </button>
        </div>
      </div>
  
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
  
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Resource Categories</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Technical
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Faith
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Career
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Leadership
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Research
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            Tutorials
          </span>
        </div>
      </div>
    </div>
  );
}
export default Resources