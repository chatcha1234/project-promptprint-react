import React from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  // Dummy Data
  const products = [
    {
      id: 1,
      title: "เสื้อยืด",
      price: 850,
      originalPrice: 35.0,
      discount: 17,
      category: "Men",
      image:
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isNew: true,
    },
    {
      id: 2,
      title: "สินค้า",
      price: 0,
      category: "Unisex",
      image:
        "https://images.unsplash.com/photo-1578768076057-3d98fb27da29?q=80&w=2570&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "ถุงผ้า",
      price: 250,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "เสื้อเด็ก",
      price: 150,
      originalPrice: 24.0,
      category: "Kids",
      image:
        "https://images.unsplash.com/photo-1519278470570-c7500beee821?q=80&w=2574&auto=format&fit=crop",
      isNew: true,
    },
  ];

  return (
    <div className="w-full">
      {/* Featured Products Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Products
          </h2>
          <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
            View All &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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
