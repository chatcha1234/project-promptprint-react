import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./views/Home";
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
import LandingPage from "./views/LandingPage"; //New code from Juang

const App = () => {

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Auth pages - Full width with navbar only, no sidebar */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
      </Route>

      {/* Main layout with sidebar */}
      <Route path="/" element={<Layout />}>
        {/* ถ้า login แล้วให้ไป Home ถ้ายังไม่ login ให้ไป LandingPage */}
        <Route index element={isAuthenticated ? <Home /> : <LandingPage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="admin/products" element={<AdminProduct />} />
        <Route path="admin/manage-products" element={<AdminProductList />} />
        <Route path="admin/users" element={<AdminUserList />} />
        <Route path="admin/orders" element={<AdminOrderList />} />
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
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="membership" element={<Membership />} />
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
