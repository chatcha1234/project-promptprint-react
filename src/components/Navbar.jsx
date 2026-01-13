import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag, User, Heart } from "lucide-react";
import Sidebar from "./Sidebar";
// dataTerst was in HEAD, assuming we want to keep it if used, or use new backend cart.
// Feature branch UI looks much cleaner and updated. Stick to feature branch design primarily.
// But check if any links from HEAD are needed. HEAD has links to /about, /faqs. Feature has /about.
// HEAD also has a cart badge with `dataTerst.length`. Feature has a static dot.
// I will keep the Feature branch UI (updated look) but integrate the About link (already there) and add FAQs link.
// Also update the Cart icon to link to /cart.

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white border-b border-transparent"
        }`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Header Container */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Menu & Brand */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                  P
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
                  PromptPrint
                </span>
              </Link>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full leading-5 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 sm:text-sm"
                  placeholder="Search for custom prompts, designs..."
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/about"
                className="hidden lg:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/faqs"
                className="hidden lg:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                FAQs
              </Link>

              <div className="h-6 w-px bg-gray-200 hidden lg:block" />

              <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors relative group">
                <Heart className="w-6 h-6" />
              </button>

              <Link to="/cart">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative">
                  <ShoppingBag className="w-6 h-6" />
                  {/* Cart badge logic can be added here later */}
                </button>
              </Link>

              <Link
                to="/Login"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all transform hover:-translate-y-0.5"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Navigation (Categories) */}
        <div className="border-t border-gray-100 bg-white/50 backdrop-blur-sm hidden md:block">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 h-12 text-sm overflow-x-auto no-scrollbar">
              {[
                "All Categories",
                "Featured",
                "New Arrivals",
                "Trending",
                "Best Sellers",
              ].map((item, idx) => (
                <button
                  key={item}
                  className={`font-medium whitespace-nowrap transition-colors relative group ${
                    idx === 0
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute -bottom-3.5 left-0 w-full h-0.5 bg-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ${
                      idx === 0 ? "scale-x-100" : ""
                    }`}
                  />
                </button>
              ))}
              <div className="flex-1" />
              <div className="flex items-center text-gray-500 text-xs gap-4">
                <span>Free Shipping on Orders over $50</span>
                <span>•</span>
                <span>Global Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-32 hidden md:block" />
      <div className="h-20 md:hidden" />
    </>
  );
};

export default Navbar;
