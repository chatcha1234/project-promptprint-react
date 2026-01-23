import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  Shirt,
  Baby,
  Watch,
  Tag,
  ChevronRight,
  Home,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

import { useState } from "react";

const Sidebar = ({ isOpen, onClose, variant = "drawer" }) => {
  const location = useLocation();
  const isDrawer = variant === "drawer";
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menuItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    {
      name: "AI Design",
      path: "/ai-design",
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
    },
    {
      name: "Men",
      path: "/category/men",
      icon: <Shirt className="w-5 h-5" />,
      disabled: true,
    },
    {
      name: "Women",
      path: "/category/women",
      icon: <Shirt className="w-5 h-5" />,
      disabled: true,
    },
    {
      name: "Kids",
      path: "/category/kids",
      icon: <Baby className="w-5 h-5" />,
      disabled: true,
    },
    {
      name: "Accessories",
      path: "/category/accessories",
      icon: <Watch className="w-5 h-5" />,
      disabled: true,
    },
    {
      name: "Promotions",
      path: "/promotions",
      icon: <Tag className="w-5 h-5" />,
      disabled: true,
    },
  ];

  return (
    <>
      {/* Backdrop Overlay - Only for Drawer */}
      {isDrawer && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`${
          isDrawer
            ? `fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } w-64`
            : `relative h-full hidden lg:flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
                isCollapsed ? "w-20" : "w-64"
              }`
        } ${isDrawer ? "bg-white shadow-2xl" : ""}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } p-6 border-b border-gray-100 transition-all`}
          >
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform shrink-0">
                P
              </div>
              {!isCollapsed && (
                <span className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all whitespace-nowrap">
                  PromptPrint
                </span>
              )}
            </Link>

            {/* Drawer Close Button */}
            {isDrawer && (
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Desktop Floating Toggle Button */}
          {!isDrawer && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-30 z-50 p-1.5 bg-white border border-gray-200 text-gray-400 hover:text-blue-600 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center cursor-pointer"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronLeft className="w-3 h-3" />
              )}
            </button>
          )}

          {!isDrawer && <div className="h-2" />}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.disabled ? "#" : item.path}
                  onClick={(e) => {
                    if (item.disabled) {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }
                    if (isDrawer) onClose();
                  }}
                  title={isCollapsed ? item.name : ""}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-red-50 text-red-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } ${item.disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""} ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                >
                  <span
                    className={`transition-colors shrink-0 ${
                      isActive
                        ? "text-red-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="whitespace-nowrap">{item.name}</span>
                  )}
                  {isActive && !isCollapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-600" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
