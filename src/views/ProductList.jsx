import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [userId] = useState(() => {
    let stored = localStorage.getItem("userId");
    if (!stored) {
      stored = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("userId", stored);
    }
    return stored;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product._id,
          quantity: 1,
        }),
      });
      if (response.ok) {
        alert("Added to cart!");
      } else {
        alert("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen  text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Shop Collection
        </h1>
        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-2 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 transition-all flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          View Cart
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 hover:shadow-cyan-500/20 shadow-xl transition-all duration-300 group flex flex-col"
          >
            {/* Image Area */}
            <div className="h-64 overflow-hidden relative bg-gray-800">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
                {product.tag}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col">
              <h2
                className="text-xl font-bold mb-1 truncate"
                title={product.name}
              >
                {product.name}
              </h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-white">
                  ฿{product.price.toLocaleString()}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-linear-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-sm hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-600">No products available yet.</p>
          <p className="text-gray-500 mt-2">Check back later!</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
