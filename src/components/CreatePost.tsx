import React from "react";
import { FaXmark, FaCloudArrowUp } from "react-icons/fa6";

type CreatePostModalProps = {
  onClose: () => void;
};

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm w-full h-full flex z-50 items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-royal-DEFAULT">
              Create New Post
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaXmark className="text-xl" />
            </button>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                placeholder="Enter a descriptive title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="discussion">Discussion</option>
                <option value="prayer">Prayer Request</option>
                <option value="project">Project Update</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
                placeholder="Share your thoughts, questions, or prayer requests..."
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachments (Optional)
              </label>
              <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                <FaCloudArrowUp className="text-gray-400 text-2xl mb-2 mx-auto" />
                <p className="text-sm text-gray-500">
                  Drag files here or click to upload
                </p>
                <input type="file" className="hidden" id="file-upload" />
                <button
                  type="button"
                  className="mt-2 text-royal-DEFAULT text-sm hover:underline"
                >
                  Browse files
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-dark"
              >
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}