import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import AiDesign from "./views/AiDesign";
import AdminProduct from "./views/AdminProduct";
import ProductList from "./views/ProductList";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import About from "./views/About";
import Faqs from "./views/Faqs";
import Membership from "./views/Membership";
import ForgetPassword from "./views/ForgetPassword";
import ResetPassword from "./views/ResetPassword";

const App = () => {
  return (
    <Routes>
      {/* Main layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="admin/products" element={<AdminProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="design/:productId" element={<AiDesign />} />
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="membership" element={<Membership />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
       
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
