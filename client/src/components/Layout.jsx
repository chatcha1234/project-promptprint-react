import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Login from '../views/Login';
import Register from '../views/Register';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="w-full px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;