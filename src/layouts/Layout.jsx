import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="w-full px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
