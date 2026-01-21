import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [userId] = useState(localStorage.getItem("userId"));
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    if (userId) {
      // Fetch cart for summary
      fetch(`/api/cart/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);

  // Helper to get product data (handles both regular and custom products)
  const getProductData = (item) => {
    if (item.customProduct && item.customProduct.isCustom) {
      return item.customProduct;
    }
    return item.productId;
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items
      .reduce((total, item) => {
        const product = getProductData(item);
        return total + (product?.price || 0) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      if (!cart || !cart.items.length) {
        alert("Your cart is empty!");
        setProcessing(false);
        return;
      }

      // Prepare items for Order model
      const orderItems = cart.items.map((item) => {
        const product = getProductData(item);
        const isCustom = item.customProduct?.isCustom;

        return {
          productId: isCustom ? null : item.productId?._id,
          customProduct: isCustom ? item.customProduct : null,
          name: product?.name || "Unknown Product",
          price: product?.price || 0,
          quantity: item.quantity,
        };
      });

      // Create Order
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          customerDetails: {
            name: formData.fullName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            zip: formData.zip,
          },
          items: orderItems,
          totalAmount: parseFloat(calculateTotal()),
        }),
      });

      if (response.ok) {
        // Clear cart from database
        try {
          await fetch(`/api/cart/${userId}/clear`, { method: "DELETE" });
        } catch {
          console.log("Cart clear failed, but order was placed");
        }

        alert("Payment Successful! Thank you for your order.");
        setCart(null);
        navigate("/products");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to place order.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Error processing payment.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading checkout...</div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Please login to checkout</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-center bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
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

            <button
              type="submit"
              disabled={processing}
              className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-900/20 ${
                processing
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-linear-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
              }`}
            >
              {processing
                ? "Processing..."
                : `Place Order ฿${calculateTotal()}`}
            </button>
          </form>
        </div>

        {/* Summary Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">In Your Cart</h2>
          {cart && cart.items.length > 0 ? (
            <>
              {cart.items.map((item) => {
                const product = getProductData(item);
                const isCustom = item.customProduct?.isCustom;

                return (
                  <div
                    key={item._id}
                    className={`bg-gray-900 p-4 rounded-xl border flex items-center gap-4 ${
                      isCustom ? "border-purple-500" : "border-gray-800"
                    }`}
                  >
                    {product?.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg bg-gray-800"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{product?.name}</h3>
                        {isCustom && (
                          <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                            AI Design
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono text-green-400">
                      ฿{((product?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
              <div className="border-t border-gray-800 pt-6">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-green-400">฿{calculateTotal()}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 text-center">
              <p className="text-gray-400">Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
