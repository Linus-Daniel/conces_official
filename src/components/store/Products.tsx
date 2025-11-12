// app/store/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { IProduct } from "@/models/Product";

const categories = [
  { value: "", label: "All Products" },
  { value: "clothing", label: "Clothing" },
  { value: "electronics", label: "Electronics" },
  { value: "home", label: "Home & Garden" },
  { value: "books", label: "Books" },
  { value: "sports", label: "Sports" },
];

export default function ProductsPage({ products }: { products: IProduct[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter products based on selected category
  useEffect(() => {
    setLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      if (selectedCategory) {
        const filtered = products.filter(
          (product) => product.category === selectedCategory
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Update category when URL parameter changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update URL without page reload
    const url = new URL(window.location.href);
    if (category) {
      url.searchParams.set("category", category);
    } else {
      url.searchParams.delete("category");
    }
    window.history.pushState({}, "", url.toString());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-600">
            Discover our amazing collection of products
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? "bg-royal-DEFAULT text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
            {selectedCategory &&
              ` in ${
                categories.find((c) => c.value === selectedCategory)?.label
              }`}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-DEFAULT"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedCategory
                ? `We couldn't find any products in the ${
                    categories.find((c) => c.value === selectedCategory)?.label
                  } category.`
                : "No products available at the moment."}
            </p>
            {selectedCategory && (
              <button
                onClick={() => handleCategoryChange("")}
                className="px-6 py-2 bg-royal-DEFAULT text-white rounded-lg hover:bg-royal-600 transition-colors"
              >
                View All Products
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
