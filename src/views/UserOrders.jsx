// ===== นำเข้า React และ dependencies =====
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  X,
  Upload, // New Icon
} from "lucide-react";
import PaymentQR from "../components/PaymentQR";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // State for slip file
  const [uploading, setUploading] = useState(false); // State for upload loading

  const userId = localStorage.getItem("userId");

  // Reset file when modal closes
  useEffect(() => {
    if (!selectedOrder) {
      setSelectedFile(null);
      setUploading(false);
    }
  }, [selectedOrder]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSlip = async () => {
    if (!selectedFile) {
      alert("Please select a slip image first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("slip", selectedFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/orders/${selectedOrder._id}/payment`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        alert("Slip uploaded successfully! Admin will verify soon.");
        setSelectedOrder(null);
        // Refresh orders
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  // ===== ดึงข้อมูล Orders จาก API =====
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // ===== Helper: แสดงไอคอนตามสถานะ =====
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // ===== Helper: สีตามสถานะ =====
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // ===== Loading State =====
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="text-gray-500">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== Header ===== */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              My Orders
            </h1>
            <p className="text-gray-500">ดูประวัติการสั่งซื้อของคุณ</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
            <Package className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700 font-medium">
              {orders.length} Orders
            </span>
          </div>
        </div>

        {/* ===== Orders List ===== */}
        {orders.length === 0 ? (
          // ===== Empty State =====
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-lg">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              ยังไม่มีคำสั่งซื้อ
            </h2>
            <p className="text-gray-500 mb-6">
              เริ่มช้อปปิ้งและสร้างคำสั่งซื้อแรกของคุณ!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              ไปช้อปปิ้ง
            </Link>
          </div>
        ) : (
          // ===== Orders Cards =====
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono text-sm font-medium text-gray-700">
                      #{order._id?.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">วันที่สั่งซื้อ</p>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items?.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {item.name || "Custom Design"}
                        </p>
                        <p className="text-sm text-gray-500">
                          x{item.quantity} • ฿{item.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {order.items?.length > 3 && (
                    <p className="text-sm text-gray-400">
                      +{order.items.length - 3} items more
                    </p>
                  )}
                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">ยอดรวม</p>
                    <p className="text-xl font-bold text-gray-900">
                      ฿{order.totalAmount?.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {order.status === "pending" && (
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                      >
                        <CreditCard className="w-4 h-4" />
                        Pay Now
                      </button>
                    )}
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                      รายละเอียด
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== Payment Modal ===== */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-bold text-lg text-gray-900">Payment</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <PaymentQR amount={selectedOrder.totalAmount} />

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-4">
                    After payment, please wait for admin verification.
                  </p>
                  <label className="block w-full cursor-pointer bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500 font-medium">
                        {selectedFile
                          ? selectedFile.name
                          : "Click to upload Payment Slip"}
                      </span>
                    </div>
                  </label>

                  <button
                    onClick={handleUploadSlip}
                    disabled={!selectedFile || uploading}
                    className={`w-full mt-4 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                      !selectedFile || uploading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
                    }`}
                  >
                    {uploading ? "Uploading..." : "Confirm Payment"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== Export Component =====
export default UserOrders;
