// ===== นำเข้า React และ dependencies =====
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Package,
} from "lucide-react";

// ===== Component หลัก: หน้าตะกร้าสินค้า =====
const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchCart(true);
    } else {
      setLoading(false);
    }
  }, [userId]);

  // ===== ดึงข้อมูลตะกร้าจาก API =====
  const fetchCart = async (isInitial = false) => {
    if (!userId) return;
    if (isInitial) setLoading(true);

    try {
      const response = await fetch(`/api/cart/${userId}`);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  // Helper to get product data
  const getProductData = (item) => {
    if (item.customProduct && item.customProduct.isCustom) {
      return item.customProduct;
    }
    return item.productId;
  };

  // ===== Optimistic Update: อัปเดต quantity =====
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const previousCart = cart;

    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    }));

    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, itemId, quantity: newQuantity }),
      });
      if (!response.ok) setCart(previousCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setCart(previousCart);
    }
  };

  // ===== Optimistic Update: ลบ item =====
  const removeItem = async (itemId) => {
    const previousCart = cart;

    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item._id !== itemId),
    }));

    try {
      const response = await fetch(`/api/cart/${userId}/${itemId}`, {
        method: "DELETE",
      });
      if (!response.ok) setCart(previousCart);
    } catch (error) {
      console.error("Error removing item:", error);
      setCart(previousCart);
    }
  };

  // ===== คำนวณยอดรวม =====
  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      const product = getProductData(item);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  // ===== Loading State =====
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="text-gray-500">กำลังโหลดตะกร้า...</span>
        </div>
      </div>
    );
  }

  // ===== No User State =====
  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-4">
            กรุณาเข้าสู่ระบบเพื่อดูตะกร้า
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* ===== Header ===== */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-2">
              ตะกร้าสินค้า
            </h1>
            <p className="text-gray-500">รายการสินค้าที่คุณเลือกไว้</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
            <Package className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700 font-medium">
              {cart?.items?.length || 0} รายการ
            </span>
          </div>
        </div>

        {/* ===== Empty Cart ===== */}
        {!cart || cart.items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-lg">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              ตะกร้าว่างเปล่า
            </h2>
            <p className="text-gray-500 mb-6">
              เริ่มช้อปปิ้งและเพิ่มสินค้าลงตะกร้า!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              ไปช้อปปิ้ง
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ===== Items List ===== */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => {
                const product = getProductData(item);
                const isCustom = item.customProduct?.isCustom;

                return (
                  <div
                    key={item._id}
                    className={`bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center gap-4 ${
                      isCustom ? "border-purple-300" : "border-gray-200"
                    }`}
                  >
                    {/* Image */}
                    {product?.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-xl bg-gray-100"
                      />
                    )}

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {product?.name || "สินค้าไม่พร้อมใช้งาน"}
                        </h3>
                        {isCustom && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">
                            AI Design
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                        {product?.description}
                      </p>
                      <p className="text-lg font-bold text-emerald-600">
                        ฿{product?.price?.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="w-9 h-9 flex items-center justify-center bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="w-9 h-9 flex items-center justify-center bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="ลบสินค้า"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ===== Order Summary ===== */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  สรุปคำสั่งซื้อ
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>ยอดรวมสินค้า</span>
                    <span>฿{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>ค่าจัดส่ง</span>
                    <span className="text-green-600">ฟรี</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-100 mb-6">
                  <span>ยอดรวมทั้งหมด</span>
                  <span className="text-emerald-600">
                    ฿{calculateTotal().toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  ดำเนินการชำระเงิน
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
