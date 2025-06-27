import { FaSearch } from 'react-icons/fa';

export default function SearchInput({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        className={`${mobile ? 'w-full' : 'w-64'} pl-10 pr-4 py-2 rounded-full border border-gray-300 placeholder:text-gray-700 text-royal-800 focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT`}
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}