import React from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  // Dummy Data
  // Dummy Data (Removed)
  const products = [];

  return (
    <div className="w-full">
      {/* Featured Products Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {/* Empty Placeholders (Skeleton) */}
          {[...Array(6)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="group relative bg-white rounded-2xl border border-gray-100 p-3 shadow-xs hover:shadow-xl transition-all duration-300 animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="aspect-square w-full bg-gray-200 rounded-xl mb-4" />

              {/* Content Skeleton */}
              <div className="space-y-3 px-1">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 bg-gray-200 rounded w-1/4" />
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-24 bg-gray-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Join our PromptPrint Community
          </h2>
          <p className="text-gray-300 mb-8">
            Get exclusive drops, fresh prompts, and 10% off your first order.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-all transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
        {/* Background Gradient Blob */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-20" />
      </div>
    </div>
  );
};

export default Home;
