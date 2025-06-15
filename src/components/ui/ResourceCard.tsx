import { Resources } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBookBookmark, FaDownload, FaEye } from "react-icons/fa6";

type Props = {
  resource:Resources
}

function ResourceCard({resource}:Props) {
  console.log("linus");
  return (
    <div>
      <div
        id="resource-card-1"
        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
      >
        <Link href={`/resources/${resource.id}`} className="h-40 bg-gray-200  relative">
          <Image
            width={500}
            height={500}
            className="w-full h-1/2 object-contain"
            src={resource.thumbnail}
            alt="engineering textbook or lecture notes, flat lay with calculator and engineering tools"
          />
          <div className="absolute top-3 right-3">
            <button className="bg-white text-gray-600 hover:text-conces-blue p-2 rounded-full">
              <FaBookBookmark className="fa-regular fa-bookmark" />
            </button>
          </div>
        </Link>
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {
                resource.type
              }
            </span>
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {
                resource.tags[0]
              }
            </span>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">
            {
              resource.title
            }
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
           {resource.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                alt="Author"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-xs text-gray-500">{resource.author}</span>
            </div>
            <span className="text-xs text-gray-500"> {resource.date}
            </span>
          </div>
          <div className="flex justify-between">
            <button className="flex items-center bg-conces-blue hover:bg-royal-light text-white px-3 py-1.5 rounded-lg text-sm transition">
              <FaDownload className="fa-solid fa-download mr-1" /> Download
            </button>
            <button className="flex items-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm transition">
              <FaEye className="fa-solid fa-eye mr-1" /> Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
