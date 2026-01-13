import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [userId] = useState(localStorage.getItem("userId"));
  const [cart, setCart] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  useEffect(() => {
    if (userId) {
      // Fetch cart for summary
      fetch(`http://localhost:5000/api/cart/${userId}`)
        .then((res) => res.json())
        .then((data) => setCart(data))
        .catch((err) => console.error(err));
    }
  }, [userId]);

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items
      .reduce(
        (total, item) => total + (item.productId?.price || 0) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate Payment Processing
    setTimeout(() => {
      alert("Payment Successful! Thank you for your order.");
      // Clear Cart Logic here if needed, or just redirect
      navigate("/products");
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Shipping Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm block mb-1">
                Full Name
              </label>
              <input
                required
                type="text"
                name="fullName"
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1">Email</label>
              <input
                required
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1">
                Address
              </label>
              <input
                required
                type="text"
                name="address"
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">City</label>
                <input
                  required
                  type="text"
                  name="city"
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">
                  ZIP Code
                </label>
                <input
                  required
                  type="text"
                  name="zip"
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-6 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Payment Details
            </h2>
            <div>
              <label className="text-gray-400 text-sm block mb-1">
                Card Number
              </label>
              <input
                required
                type="text"
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">
                  Expiry Date
                </label>
                <input
                  required
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">CVC</label>
                <input
                  required
                  type="text"
                  name="cvc"
                  placeholder="123"
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-900/20"
            >
              Pay Now ${calculateTotal()}
            </button>
          </form>
        </div>

        {/* Summary Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">In Your Cart</h2>
          {cart &&
            cart.items.map((item) => (
              <div
                key={item._id}
                className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex items-center gap-4"
              >
                {item.productId?.imageUrl && (
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-800"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold">{item.productId?.name}</h3>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-mono text-green-400">
                  ${(item.productId?.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="text-green-400">${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
