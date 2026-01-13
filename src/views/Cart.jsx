import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchCart = React.useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId, fetchCart]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId,
          quantity: newQuantity,
        }),
      });
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${userId}/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items
      .reduce(
        (total, item) => total + (item.productId?.price || 0) * item.quantity,
        0
      )
      .toFixed(2);
  };

  if (!userId)
    return (
      <div className="text-white p-10">
        Please start shopping to create a session.
      </div>
    );

  return (
    <div className="container mx-auto p-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Your Shopping Cart
      </h1>

      {!cart || cart.items.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800">
          <p className="text-xl text-gray-400 mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col sm:flex-row items-center gap-4"
              >
                {item.productId?.imageUrl && (
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    className="w-24 h-24 object-cover rounded-lg bg-gray-800"
                  />
                )}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg">
                    {item.productId?.name || "Product unavailable"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {item.productId?.description}
                  </p>
                  <p className="text-green-400 font-mono mt-1">
                    ${item.productId?.price}
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded text-lg font-bold"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove Item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 sticky top-4">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2 text-gray-400">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-2xl font-bold mb-6 pt-4 border-t border-gray-800">
                <span>Total</span>
                <span className="text-green-400">${calculateTotal()}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-900/20"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
