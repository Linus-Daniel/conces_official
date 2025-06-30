"use client";

import { useState } from "react";
import axios from "axios";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
      setResults(response.data.products);
    } catch (err) {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {results.length > 0 && (
        <ul className="space-y-2">
          {results.map((product: any) => (
            <li key={product._id} className="p-3 border rounded-md shadow-sm">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
