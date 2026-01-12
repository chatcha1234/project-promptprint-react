import { ChevronDown, Menu, Search, ShoppingBag } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Login from "../views/Login";
import Register from "../views/Register";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <nav className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 right-0">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="w-full">
        <div className="w-full flex justify-between items-center h-16">
          {/* --------------------------Start Left: Menu------------------------------------------------ */}
          <div className="flex items-center">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          {/* --------------------------End Left: Menu------------------------------------------------ */}

          {/* --------------------------Start Center: Shop name------------------------------------------ */}
          <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <span className="text-lg font-bold whitespace-nowrap">
              Prompt Print Shop
            </span>
          </div>
          {/* --------------------------End Center: Shop name------------------------------------------ */}

          {/* ---------------------------Start Right: Link and cart-------------------------------------- */}
          <div className="flex items-center gap-6 absolute right-4">
            <Link to="/about" className="text-sm">
              About
            </Link>
            <Link to="/faqs" className="text-sm">
              FAQs
            </Link>
            <button className="border border-gray-300 rounded-full p-2 hover:bg-gray-100">
              <ShoppingBag />
            </button>
            <Link
              to="../Login"
              className="rounded-full bg-black text-white border border-black px-2 py-1 hover:bg-white hover:text-black"
            >
              Sign In
            </Link>
            <Link
              to="../Register"
              className="rounded-full bg-white text-black border border-black px-2 py-1 hover:bg-black hover:text-white"
            >
              Register
            </Link>
          </div>
          {/* ---------------------------End Right: Link and cart-------------------------------------- */}
        </div>
      </div> 
      {/* Line2 */}
      <div className="flex flex-col md:flex-row items-center gap-2">
        {/*------------------- Line2:Button#1---------------------- */}
        <div>
          <button className="flex items-center justify-between w-[200px] px-5 py-2 rounded-full bg-gray-50 border-none  text-sm font-medium text-gray-700 border-gray-100 hover:shadow-md transition-all duration-200">
            Categories
            {/* ส่วนของไอคอนลูกศร */}
            <div className="P-1 rounded-full bg-gray-50 flex items-center justify-center transition-transform duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </button>
        </div>
        {/*------------------- Line2:Button#1---------------------- */}
        {/*------------------- Line2:Button#2---------------------- */}
        <div>
          <button className="flex items-center justify-between w-[200px] px-5 py-2 bg-white rounded-full shadow-sm border text-sm font-medium text-gray-700 border-gray-100 hover:shadow-md transition-all duration-200">
            New Products
            {/* ส่วนของไอคอนลูกศร */}
            <div className="P-1 rounded-full bg-gray-50 flex items-center justify-center transition-transform duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </button>
        </div>
        {/*------------------- Line2:Button#2---------------------- */}
        {/*------------------- Line2:Search------------------------ */}
        <div className="relative flex items-center w-full max-w-xs">
          <input
            placeholder="Search"
            className="flex-row w-full bg-gray-50 border-none rounded-full py-2 pl-6 pr-10 text-sm focus:ring-1 focus:ring-gray-200 outline-none text-gray-600 placeholder-gray-400"
            type="text"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="absolute right-3 text-gray-400 pointer-events-none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        {/*------------------- Line2:Search------------------------ */}
        <div className="flex items-center gap-2 ">
          <button className="px-5 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
            Men
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
            Women
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
            Children
          </button>
        </div>
      </div>   
    </nav>
  );
};
export default Navbar;
