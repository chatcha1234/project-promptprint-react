import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  LogOut,
  ChevronDown,
  PlusCircle,
  Package,
  Users,
  ClipboardList,
  Menu,
} from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(() => localStorage.getItem("username"));
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Removed redundant user check that caused cascading renders

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsProfileOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        }`}
      >
        {/* Main Header Container */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left area */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button - STRICTLY HIDDEN ON DESKTOP */}
              <div className="lg:hidden">
                <button
                  onClick={onMenuClick}
                  className="p-2 -ml-2 text-gray-600 hover:text-gray-900"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
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
                </button>
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-all border border-transparent hover:border-gray-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                      {user}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      {/* New code:22JAN25 ----------- */}
                      <Link
                        to="/ai-design"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <Package className="w-4 h-4" />
                        AI Design
                      </Link>
                      <Link
                        to={`/orders/${localStorage.getItem("userId")}`}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <ClipboardList className="w-4 h-4" />
                        My Orders
                      </Link>
                      {/* Divider */}
                      <div className="border-t border-gray-100 my-1"></div>
                      {/* New code:22JAN25 ---------- */}
                      {localStorage.getItem("role") === "admin" && (
                        <>
                          <Link
                            to="/admin/products"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            <PlusCircle className="w-4 h-4" />
                            Add Product
                          </Link>
                          <Link
                            to="/admin/manage-products" // New page (we need to create this)
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Manage Products
                          </Link>
                          <Link
                            to="/admin/orders"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            <ClipboardList className="w-4 h-4" />
                            Orders
                          </Link>
                          <Link
                            to="/admin/users"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            <Users className="w-4 h-4" />
                            Manage Users
                          </Link>
                        </>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all transform hover:-translate-y-0.5"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Navigation (Categories) */}
        {/* <div className="border-t border-gray-100 bg-white/50 backdrop-blur-sm hidden md:block">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 h-12 text-sm overflow-x-auto no-scrollbar">
              {[
                "Products",
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
            </div>
          </div>
        </div> */}
      </nav>
    </>
  );
};

export default Navbar;
