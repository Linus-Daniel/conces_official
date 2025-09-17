import React from "react";

interface ViewActionsProps {
  chapterCount: number;
}

const ViewActions: React.FC<ViewActionsProps> = ({ chapterCount }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      {/* View Toggle */}
      <div className="flex items-center mb-3 sm:mb-0">
        <button className="bg-primary-50 text-primary-600 px-3 py-1.5 rounded-l-md border border-primary-200">
          <i className="fa-solid fa-table-cells-large"></i>
        </button>
        <button className="bg-white text-gray-600 px-3 py-1.5 rounded-r-md border border-gray-300">
          <i className="fa-solid fa-list"></i>
        </button>
        <span className="ml-3 text-sm text-gray-600">
          {chapterCount} chapteres
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <i className="fa-solid fa-download mr-2"></i>
          Export
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
          <i className="fa-solid fa-plus mr-2"></i>
          Add Chapter
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
          <i className="fa-solid fa-bullhorn mr-2"></i>
          Announcement
        </button>
      </div>
    </div>
  );
};

export default ViewActions;
