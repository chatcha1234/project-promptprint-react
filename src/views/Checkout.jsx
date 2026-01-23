// ===== นำเข้า React และ dependencies =====
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  User,
  Home,
  Building,
  CreditCard,
  Package,
  ShoppingBag,
  ArrowLeft,
  Check,
} from "lucide-react";

// ===== Component หลัก: หน้าชำระเงิน =====
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

  // ===== ดึงข้อมูลตะกร้า =====
  useEffect(() => {
    if (userId) {
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

  // Helper to get product data
  const getProductData = (item) => {
    if (item.customProduct && item.customProduct.isCustom) {
      return item.customProduct;
    }
    return item.productId;
  };

  // ===== คำนวณยอดรวม =====
  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      const product = getProductData(item);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== Submit Order =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      if (!cart || !cart.items.length) {
        alert("ตะกร้าว่างเปล่า!");
        setProcessing(false);
        return;
      }

      const orderItems = cart.items.map((item) => {
        const product = getProductData(item);
        const isCustom = item.customProduct?.isCustom;

        return {
          productId: isCustom ? null : item.productId?._id,
          customProduct: isCustom ? item.customProduct : null,
          name: product?.name || "Unknown Product",
          price: product?.price || 0,
          quantity: item.quantity,
          imageUrl: product?.imageUrl,
        };
      });

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          totalAmount: calculateTotal(),
        }),
      });

      if (response.ok) {
        try {
          await fetch(`/api/cart/${userId}/clear`, { method: "DELETE" });
        } catch {
          console.log("Cart clear failed, but order was placed");
        }

        alert("ชำระเงินสำเร็จ! ขอบคุณสำหรับคำสั่งซื้อ");
        setCart(null);
        navigate(`/orders/${userId}`);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "ไม่สามารถสร้างคำสั่งซื้อได้");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("เกิดข้อผิดพลาดในการชำระเงิน");
    } finally {
      setProcessing(false);
    }
  };

  // ===== Loading State =====
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="text-gray-500">กำลังโหลด...</span>
        </div>
      </div>
    );
  }

  // ===== No User State =====
  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-4">
            กรุณาเข้าสู่ระบบเพื่อชำระเงิน
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
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
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/cart"
            className="p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ชำระเงิน
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              กรอกข้อมูลเพื่อดำเนินการสั่งซื้อ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== Form Section ===== */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              ข้อมูลการจัดส่ง
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> ชื่อ-นามสกุล
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="กรอกชื่อ-นามสกุล"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> อีเมล
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4" /> ที่อยู่
                </label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="บ้านเลขที่ ถนน ตำบล/แขวง"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                />
              </div>

              {/* City & ZIP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Building className="w-4 h-4" /> จังหวัด
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="กรุงเทพฯ"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    รหัสไปรษณีย์
                  </label>
                  <input
                    required
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="10110"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className={`w-full mt-4 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                  processing
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
                }`}
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    กำลังดำเนินการ...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    ยืนยันคำสั่งซื้อ ฿{calculateTotal().toLocaleString()}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ===== Order Summary ===== */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                สินค้าในตะกร้า
              </h2>

              {cart && cart.items.length > 0 ? (
                <div className="space-y-4">
                  {cart.items.map((item) => {
                    const product = getProductData(item);
                    const isCustom = item.customProduct?.isCustom;

                    return (
                      <div
                        key={item._id}
                        className={`flex items-center gap-4 p-4 rounded-xl border ${
                          isCustom
                            ? "border-purple-200 bg-purple-50/50"
                            : "border-gray-100 bg-gray-50"
                        }`}
                      >
                        {product?.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg bg-white"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900 truncate">
                              {product?.name}
                            </h3>
                            {isCustom && (
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                AI
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            จำนวน: {item.quantity}
                          </p>
                        </div>
                        <span className="font-bold text-blue-600">
                          ฿
                          {(
                            (product?.price || 0) * item.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
                </div>
              )}
            </div>

            {/* Total */}
            {cart && cart.items.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>ยอดรวมสินค้า</span>
                    <span>฿{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>ค่าจัดส่ง</span>
                    <span className="text-green-600">ฟรี</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-100">
                  <span>ยอดรวมทั้งหมด</span>
                  <span className="text-blue-600">
                    ฿{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
