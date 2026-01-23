import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./components/PublicLayout";

import Home from "./views/Home";
import Shop from "./views/Shop"; // Was Home
import Login from "./views/Login";
import Register from "./views/Register";
import AiDesign from "./views/AiDesign";
import AdminProduct from "./views/AdminProduct";
import AdminProductList from "./views/AdminProductList";
import AdminUserList from "./views/AdminUserList";
import AdminOrderList from "./views/AdminOrderList";
import ProductList from "./views/ProductList";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import About from "./views/About";
import Faqs from "./views/Faqs";
import Membership from "./views/Membership";
import ForgetPassword from "./views/ForgetPassword";
import ResetPassword from "./views/ResetPassword";

import LandingPage from "./views/LandingPage";
import UserOrders from "./views/UserOrders"; // หน้า My Orders

const App = () => {
  return (
    <Routes>
      {/* Auth pages - Full width with navbar only, no sidebar */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
      </Route>

      {/* Public Layout (Landing Page, About, etc.) - No Sidebar */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="membership" element={<Membership />} />
      </Route>

      {/* Main Layout (App Dashboard) - With Sidebar */}
      <Route element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="products" element={<ProductList />} />

        {/* ===== Admin Routes (ต้องเป็น Admin เท่านั้น) ===== */}
        <Route
          path="admin/products"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/manage-products"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminUserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/orders"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminOrderList />
            </ProtectedRoute>
          }
        />

        {/* ===== User Routes (ต้อง Login) ===== */}
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="checkout" element={<Checkout />} />
        <Route
          path="ai-design"
          element={
            <ProtectedRoute>
              <AiDesign />
            </ProtectedRoute>
          }
        />
        <Route
          path="design/:productId"
          element={
            <ProtectedRoute>
              <AiDesign />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders/:userId"
          element={
            <ProtectedRoute>
              <UserOrders />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex justify-center items-center bg-red-300">
            <h1 className="font-bold">404 - Page Not Found 😭😭</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
