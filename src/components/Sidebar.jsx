import React from "react";
import { Link } from "react-router-dom";
import { X,Trash2 } from "lucide-react";
// import { Home, ShoppingBag ,Grid,HelpCircle,Info,User } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* ---------------------------Sidebar-------------------------------------- */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full flex flex-col flex-1 overflow-y-auto"
        }`}
      >
        <Trash2 className="w-20 h-20"/>
        {/* ---------------------------Start Top sidebar: Menu-------------------------------------- */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* ---------------------------End Top sidebar: Menu-------------------------------------- */}

        {/* ---------------------------Start Bottom sidebar: Menu-------------------------------------- */}
        <nav className="flex flex-col flex-1 overflow-y-auto">
          
              <Link to="/" className="p-2 rounded-full">Men</Link>
           
              <Link to="/about" className="p-2 rounded-full">women</Link>
           
              <Link to="/faqs" className="p-2 rounded-full">Kids</Link>
           
              <Link to="/sign-in" className="p-2 rounded-full">Accessories</Link>
          
              <Link to="/register" className="p-2 rounded-full">Promotions</Link>
          
        </nav>
        {/* ---------------------------End Bottom sidebar: Menu--   ------------------------------------ */}
      </div>
      {/* ---------------------------End Sidebar-------------------------------------- */}
    </>
  );
};

export default Sidebar;
