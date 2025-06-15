import { FaBook } from "react-icons/fa6";

type ResourceProps = {
  resource: {
    id: number;
    title: string;
    type: string; // e.g., 'article', 'video', 'podcast'
    category: string; // e.g., 'spiritual', 'community', 'education'
    url?: string; // Optional URL for the resource
    description?: string; // Optional description
    dateAdded?: string; // Optional date when the resource was added
  };
};

const ResourceCard = ({ resource }:ResourceProps) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="mr-4 p-2 bg-gray-100 rounded-lg">
            <FaBook className="text-conces-blue" />
          </div>
          <div>
            <h3 className="font-bold mb-1">{resource.title}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">{resource.type}</span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                {resource.category}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button className="text-sm text-conces-blue hover:underline">
            View Details
          </button>
          <button className="text-sm bg-conces-blue text-white px-3 py-1 rounded hover:bg-conces-blue-dark transition-colors">
            Download
          </button>
        </div>
      </div>
    </div>
  );
  
  export default ResourceCard;
  