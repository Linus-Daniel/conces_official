"use client"
import { Resources } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaBookmark, FaDownload, FaEye, FaRegBookmark, FaStar } from "react-icons/fa";

type Props = {
  resource: Resources;
  onBookmark?: (id: string) => void;
  isBookmarked?: boolean;
};

function ResourceCard({ resource, onBookmark, isBookmarked = false }: Props) {
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBookmark) onBookmark(resource._id);
  };

  return (
    <article className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col relative">
      {/* Featured Badge - positioned absolutely at the top left */}
      {resource.featured && (
        <div className="absolute top-3 left-3 bg-yellow-400 text-white p-1.5 rounded-full z-10 shadow-md">
          <FaStar className="text-sm" />
        </div>
      )}
      
      <Link 
        href={`/resources/${resource._id}`} 
        className="block h-40 bg-gray-100 relative overflow-hidden"
        aria-label={`View ${resource.title}`}
      >
        <Image
          width={320}
          height={160}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={resource.thumbnail}
          alt={resource.title}
          placeholder="blur"
          blurDataURL="/placeholder-resource.jpg"
          priority={false}
        />
        <button
          onClick={handleBookmark}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarked ? (
            <FaBookmark className="text-conces-blue" />
          ) : (
            <FaRegBookmark className="text-gray-600 hover:text-conces-blue" />
          )}
        </button>
      </Link>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {/* Featured Tag - shown in the tags section */}
          {resource.featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              Featured
            </span>
          )}
          <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full capitalize">
            {resource.type}
          </span>
          {resource.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
          <Link 
            href={`/resources/${resource._id}`} 
            className="hover:text-conces-blue transition-colors"
          >
            {resource.title}
          </Link>
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center min-w-0">
            <div className="w-6 h-6 rounded-full mr-2 bg-gray-200 overflow-hidden">
              {/* {resource.authorImage && (
                <Image
                  src={resource.authorImage}
                  width={24}
                  height={24}
                  alt={resource.author}
                  className="w-full h-full object-cover"
                />
              )} */}
            </div>
            <span 
              className="text-xs text-gray-500 truncate"
              title={resource.author}
            >
              {resource.author}
            </span>
          </div>
          <time 
            dateTime={new Date(resource.createdAt).toISOString()}
            className="text-xs text-gray-500 whitespace-nowrap ml-2"
          >
            {new Date(resource.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </div>
        
        <div className="flex gap-3 mt-auto">
          <Link
            href={resource.fileUrl || `#`}
            download
            className="flex items-center justify-center flex-1 bg-conces-blue hover:bg-royal-light text-white px-3 py-2 rounded-lg text-sm transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            aria-label={`Download ${resource.title}`}
            onClick={(e) => !resource.fileUrl && e.preventDefault()}
          >
            <FaDownload className="mr-1.5" /> 
            <span className="truncate">Download</span>
          </Link>
          <Link
            href={`/resources/${resource._id}`}
            className="flex items-center justify-center flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm transition-colors"
            aria-label={`Preview ${resource.title}`}
          >
            <FaEye className="mr-1.5" /> 
            <span>Preview</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ResourceCard;