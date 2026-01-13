import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  Shirt,
  Baby,
  Watch,
  Tag,
  ChevronRight,
  Menu as MenuIcon,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Men", path: "/category/men", icon: <Shirt className="w-5 h-5" /> },
    {
      name: "Women",
      path: "/category/women",
      icon: <Shirt className="w-5 h-5" />,
    },
    {
      name: "Kids",
      path: "/category/kids",
      icon: <Baby className="w-5 h-5" />,
    },
    {
      name: "Accessories",
      path: "/category/accessories",
      icon: <Watch className="w-5 h-5" />,
    },
    {
      name: "Promotions",
      path: "/promotions",
      icon: <Tag className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 w-[280px] h-full bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`transition-colors ${
                        isActive
                          ? "text-blue-500"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Footer Area */}
          <div className="p-6 border-t border-gray-100">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-4 text-white shadow-lg">
              <p className="text-sm font-medium opacity-90 mb-1">
                New Collection
              </p>
              <h3 className="text-lg font-bold mb-3">Summer Sale is Live!</h3>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-sm font-semibold transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
