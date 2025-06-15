import React from "react";
import { FaUser, FaSearch, FaHeart, FaShoppingCart, FaBars, FaArrowRight } from "react-icons/fa";
import ProductCard from "@/components/ui/ProductCard";
import { productData } from "@/constant";

function Page() {
  return (
    <div className="bg-gray-50">
      <header id="header" className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="hidden md:flex space-x-4 text-sm text-gray-600">
              <span className="hover:text-royal-DEFAULT cursor-pointer">About Us</span>
              <span className="hover:text-royal-DEFAULT cursor-pointer">Contact</span>
              <span className="hover:text-royal-DEFAULT cursor-pointer">FAQ</span>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-start">
              <p className="text-sm text-royal-DEFAULT font-medium">
                Free shipping on orders over $50
              </p>
            </div>
            <div className="hidden md:flex space-x-4 text-sm">
              <span className="flex items-center hover:text-royal-DEFAULT cursor-pointer">
                <FaUser className="mr-1" /> Login / Register
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-royal-DEFAULT mr-8 cursor-pointer">
                CONCES
              </span>
              <nav className="hidden lg:flex space-x-6">
                <span className="font-medium hover:text-royal-DEFAULT text-royal-dark cursor-pointer">Home</span>
                <span className="font-medium hover:text-royal-DEFAULT text-royal-dark cursor-pointer">Apparel</span>
                <span className="font-medium hover:text-royal-DEFAULT text-royal-dark cursor-pointer">Books & eBooks</span>
                <span className="font-medium hover:text-royal-DEFAULT text-royal-dark cursor-pointer">Devotionals</span>
                <span className="font-medium hover:text-royal-DEFAULT text-royal-dark cursor-pointer">Events</span>
                <span className="font-medium hover:text-royal-DEFAULT text-royal-dark cursor-pointer">Accessories</span>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 pl-10 pr-2 py-2 placeholder:text-gray-500 rounded-full border text-royal-DEFAULT border-gray-300 focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <span className="relative p-2 cursor-pointer">
                <FaHeart className="text-xl text-gray-700 hover:text-royal-DEFAULT" />
              </span>

              <span className="relative p-2 cursor-pointer">
                <FaShoppingCart className="text-xl text-gray-700 hover:text-royal-DEFAULT" />
                <span className="absolute -top-1 -right-1 bg-royal-DEFAULT text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </span>

              <button className="lg:hidden">
                <FaBars className="text-xl text-gray-700" />
              </button>
            </div>
          </div>

          <div className="block md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 placeholder:text-gray-700 text-royal-800 focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-royal-DEFAULT"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="promo-banner" className="bg-gold-DEFAULT text-white py-3">
          <div className="container mx-auto px-4 text-center">
            <p className="font-medium">
              🎉 10% off for first-time buyers! Use code:{" "}
              <span className="font-bold">WELCOME10</span>
            </p>
          </div>
        </section>

        <section
          id="categories"
          className="py-12 bg-gradient-to-r from-royal-DEFAULT to-royal-dark"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Shop by Category
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <span className="category-card bg-white rounded-lg shadow-sm overflow-hidden transition hover:shadow-md cursor-pointer">
                <div className="h-40 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b9b222d058-d07116d6f4e014965d57.png"
                    alt="Christian-themed t-shirts and hoodies folded neatly, blue and white colors, minimalist style"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-royal-DEFAULT">Apparel</h3>
                </div>
              </span>
            </div>
          </div>
        </section>

        <section id="featured-products" className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl text-gray-900 font-bold">
                Featured Products
              </h2>
              <span className="text-royal-DEFAULT hover:underline flex items-center cursor-pointer">
                View All <FaArrowRight className="ml-2" />
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productData.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="donation-banner"
          className="py-12 bg-gradient-to-r from-royal-DEFAULT to-royal-dark text-white"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Support Our Mission
                </h2>
                <p className="text-white text-opacity-90 mb-6">
                  Your contributions help us provide scholarships and
                  resources to Christian engineering students around the
                  world.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-white text-royal-DEFAULT font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition">
                    $10
                  </button>
                  <button className="bg-white text-royal-DEFAULT font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition">
                    $25
                  </button>
                  <button className="bg-white text-royal-DEFAULT font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition">
                    $50
                  </button>
                  <button className="bg-white text-royal-DEFAULT font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition">
                    $100
                  </button>
                  <button className="bg-white text-royal-DEFAULT font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition">
                    Other
                  </button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <button className="bg-gold-DEFAULT hover:bg-gold-dark text-white font-bold px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105">
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;
