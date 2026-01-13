import React from "react";
import { Routes, Route } from "react-router-dom";
// HEAD used components/Layout, feature used layouts/Layout. Assuming layouts/Layout is the correct one from previous context.
import Layout from "./layouts/Layout";
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
// There is a conflict on 'cart' route. HEAD has UserCart, feature has Cart.
// Feature branch 'Cart' is the one I implemented with backend. 'UserCart' seems to be something adding in HEAD.
// I will keep 'Cart' from feature branch as /cart, and maybe keep UserCart as something else if needed,
// OR assume Cart.jsx is the intended one since it has the implementation.
// However, looking at HEAD, it imports UserCart from ./views/UserCart.
// Feature imports Cart from ./views/Cart.
// I will keep Cart from feature as it is the functional one I built.
// I will COMMENT OUT UserCart for now or just stick with Cart.
// Wait, HEAD has:
// <Route path="cart" element={<UserCart />} />
// Feature has:
// <Route path="cart" element={<Cart />} />
// Since I just built Cart.jsx, I should prioritize it.
// I will include About and Faqs.

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="admin/products" element={<AdminProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="design/:productId" element={<AiDesign />} />
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<Faqs />} />
      </Route>
    </Routes>
  );
};

export default App;
