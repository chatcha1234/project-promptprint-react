import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, Wand2 } from "lucide-react";

const Home = () => {
  const [username] = useState(localStorage.getItem("username") || "Creator");
  const [role] = useState(localStorage.getItem("role"));

  return (
    <div className="p-6 md:p-12 min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome back, <span className="text-blue-600">{username}</span>! 👋
        </h1>
        <p className="text-gray-500">What would you like to create today?</p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Create with AI */}
        <Link
          to="/ai-design"
          className="group bg-linear-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-12">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              New
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-1">AI Design</h3>
          <p className="text-purple-100 mb-4 text-sm">
            Generate unique t-shirt designs with AI power.
          </p>
          <span className="flex items-center gap-2 font-semibold group-hover:gap-4 transition-all">
            Start Designing &rarr;
          </span>
        </Link>

        {/* Shop Collection */}
        <Link
          to="/shop"
          className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-12">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            Shop Collection
          </h3>
          <p className="text-gray-500 mb-4 text-sm">
            Browse our premium pre-designed collection.
          </p>
          <span className="flex items-center gap-2 font-semibold text-blue-600 group-hover:gap-4 transition-all">
            Go to Shop &rarr;
          </span>
        </Link>

        {/* My Orders */}
        <Link
          to={`/orders/${localStorage.getItem("userId")}`}
          className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-12">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">My Orders</h3>
          <p className="text-gray-500 mb-4 text-sm">
            Track your shipments and order history.
          </p>
          <span className="flex items-center gap-2 font-semibold text-emerald-600 group-hover:gap-4 transition-all">
            View Orders &rarr;
          </span>
        </Link>
      </div>

      {/* Admin Section (Only if Admin) */}
      {role === "admin" && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Admin Quick Access
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/admin/orders"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors text-center font-medium"
            >
              Manage Orders
            </Link>
            <Link
              to="/admin/products"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors text-center font-medium"
            >
              Add Product
            </Link>
            <Link
              to="/admin/users"
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors text-center font-medium"
            >
              Manage Users
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
