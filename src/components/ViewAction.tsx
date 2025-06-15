import { FiPlus } from 'react-icons/fi';

interface ViewActionsProps {
  branchCount: number;
  onAddBranch: () => void;
}

const ViewActions = ({ branchCount, onAddBranch }: ViewActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <p className="text-sm text-gray-600">{branchCount} branches found</p>
      <div className="flex space-x-3 w-full sm:w-auto">
        <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
          Filter
        </button>
        <button 
          onClick={onAddBranch}
          className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center"
        >
          <FiPlus className="mr-1" /> Add Branch
        </button>
      </div>
    </div>
  );
};

export default ViewActions;