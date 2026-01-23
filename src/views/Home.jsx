import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Get or create userId for guest cart
  const [userId] = useState(() => {
    let stored = localStorage.getItem("userId");
    if (!stored) {
      stored = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("userId", stored);
    }
    return stored;
  });

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`,
        );
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add to Cart Function
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
        alert("Added to cart! 🛒");
      } else {
        alert("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== Hero Section ===== */}
      <div className="relative h-[400px] w-full overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/CommitTeam.png)",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            PromptPrint Store
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up delay-100">
            เสื้อยืดคุณภาพสูง พร้อมระบบออกแบบ AI ที่ทันสมัยที่สุด
          </p>
          <div className="flex gap-4 animate-fade-in-up delay-200">
            <Link
              to="/ai-design"
              className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95"
            >
              ออกแบบลาย AI ✨
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Product Grid ===== */}
      <div className="container mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-4xl">🛍️</span> สินค้าแนะนำ
          </h2>
          <Link
            to="/products"
            className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline"
          >
            ดูทั้งหมด &rarr;
          </Link>
        </div>

        {isLoading ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-xs animate-pulse"
              >
                <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                {/* Image Area */}
                <div className="h-64 overflow-hidden relative bg-gray-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  {product.tag && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
                      {product.tag}
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-2xl font-bold text-emerald-600">
                      ฿{product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-gray-900 text-white p-3 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-gray-200 active:scale-95"
                      title="Add to Cart"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-2xl text-gray-400">ยังไม่มีสินค้าในขณะนี้</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
