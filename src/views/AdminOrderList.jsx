import React, { useState, useEffect } from "react";
import {
  Eye,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  AlertTriangle,
  X,
  MapPin,
  Mail,
  User,
  ShoppingBag,
  Calendar,
  CreditCard,
} from "lucide-react";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ===== State สำหรับ Confirm Modal =====
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    orderId: null,
    newStatus: null,
    currentStatus: null,
  });

  // ===== State สำหรับ View Order Modal =====
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    order: null,
  });

  // ===== Fetch Orders =====
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ===== เปิด Confirm Modal =====
  const openConfirmModal = (orderId, newStatus, currentStatus) => {
    if (newStatus === currentStatus) return;
    setConfirmModal({
      isOpen: true,
      orderId,
      newStatus,
      currentStatus,
    });
  };

  // ===== ปิด Confirm Modal =====
  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      orderId: null,
      newStatus: null,
      currentStatus: null,
    });
  };

  // ===== เปิด View Order Modal =====
  const openViewOrderModal = (order) => {
    setViewModal({
      isOpen: true,
      order: order,
    });
  };

  // ===== ปิด View Order Modal =====
  const closeViewOrderModal = () => {
    setViewModal({
      isOpen: false,
      order: null,
    });
  };

  // ===== ยืนยันเปลี่ยน Status =====
  const confirmStatusChange = async () => {
    const { orderId, newStatus } = confirmModal;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
        closeConfirmModal();
      } else {
        alert("ไม่สามารถอัปเดตสถานะได้");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("เกิดข้อผิดพลาด");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Processing":
        return <Package className="w-4 h-4" />;
      case "Shipped":
        return <Truck className="w-4 h-4" />;
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const statusOptions = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <span className="text-gray-500">กำลังโหลดคำสั่งซื้อ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-2">
              จัดการคำสั่งซื้อ
            </h1>
            <p className="text-gray-500">ติดตามและจัดการคำสั่งซื้อของลูกค้า</p>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold shadow-sm">
            <Package className="w-5 h-5 text-gray-400" />
            <span>ทั้งหมด: {orders.length} รายการ</span>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                  <th className="p-5 font-semibold">Order ID</th>
                  <th className="p-5 font-semibold">ลูกค้า</th>
                  <th className="p-5 font-semibold">ยอดรวม</th>
                  <th className="p-5 font-semibold">สถานะ</th>
                  <th className="p-5 font-semibold">วันที่</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-3">
                        <Package className="w-12 h-12 text-gray-300" />
                        <p className="text-lg">ยังไม่มีคำสั่งซื้อ</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="p-5 font-mono text-xs text-gray-500">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="p-5">
                        <div className="font-semibold text-gray-900">
                          {order.customerDetails?.name || "Guest"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.items?.length || 0} รายการ
                        </div>
                      </td>
                      <td className="p-5 font-mono font-bold text-emerald-600">
                        ฿{order.totalAmount?.toLocaleString()}
                      </td>
                      <td className="p-5">
                        {/* ===== Status Dropdown ===== */}
                        <select
                          value={order.status}
                          onChange={(e) =>
                            openConfirmModal(
                              order._id,
                              e.target.value,
                              order.status,
                            )
                          }
                          className={`px-3 py-2 rounded-lg border text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 ${getStatusColor(
                            order.status,
                          )}`}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleDateString("th-TH")}
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => openViewOrderModal(order)}
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="ดูรายละเอียด"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== Confirm Modal ===== */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  ยืนยันการเปลี่ยนสถานะ
                </h3>
                <p className="text-sm text-gray-500">
                  คุณต้องการเปลี่ยนสถานะคำสั่งซื้อหรือไม่?
                </p>
              </div>
              <button
                onClick={closeConfirmModal}
                className="ml-auto p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Status Change Preview */}
            <div className="flex items-center justify-center gap-4 py-6 bg-gray-50 rounded-xl mb-6">
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(
                  confirmModal.currentStatus,
                )}`}
              >
                {getStatusIcon(confirmModal.currentStatus)}
                {confirmModal.currentStatus}
              </span>
              <span className="text-gray-400">→</span>
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(
                  confirmModal.newStatus,
                )}`}
              >
                {getStatusIcon(confirmModal.newStatus)}
                {confirmModal.newStatus}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={closeConfirmModal}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmStatusChange}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors cursor-pointer"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== View Details Modal ===== */}
      {viewModal.isOpen && viewModal.order && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" />
                  รายละเอียดคำสั่งซื้อ
                </h2>
                <p className="text-sm text-gray-500 font-mono mt-1">
                  ID: #{viewModal.order._id}
                </p>
              </div>
              <button
                onClick={closeViewOrderModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Status Section */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">วันที่สั่งซื้อ:</span>
                  <span>
                    {new Date(viewModal.order.createdAt).toLocaleDateString(
                      "th-TH",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </span>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(
                    viewModal.order.status,
                  )}`}
                >
                  {getStatusIcon(viewModal.order.status)}
                  {viewModal.order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    ข้อมูลลูกค้า
                  </h3>
                  <div className="space-y-3 pl-6 border-l-2 border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400">ชื่อผู้รับ</p>
                      <p className="font-medium text-gray-900">
                        {viewModal.order.customerDetails?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">อีเมล</p>
                      <p className="text-gray-700">
                        {viewModal.order.customerDetails?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    ที่อยู่จัดส่ง
                  </h3>
                  <div className="space-y-1 pl-6 border-l-2 border-gray-100 text-gray-700">
                    <p>{viewModal.order.customerDetails?.address || "N/A"}</p>
                    <p>
                      {viewModal.order.customerDetails?.city}{" "}
                      {viewModal.order.customerDetails?.zip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-600" />
                  รายการสินค้า
                </h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left bg-gray-50/50">
                    <thead className="bg-gray-100 text-gray-500 text-xs uppercase">
                      <tr>
                        <th className="p-3 font-semibold">สินค้า</th>
                        <th className="p-3 font-semibold text-center">จำนวน</th>
                        <th className="p-3 font-semibold text-right">ราคา</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {viewModal.order.items.map((item, idx) => (
                        <tr key={idx} className="bg-white">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              {item.imageUrl && (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200"
                                />
                              )}
                              <div>
                                <p className="font-medium text-gray-900 text-sm">
                                  {item.name}
                                </p>
                                {item.customProduct && (
                                  <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200">
                                    Custom AI
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center text-gray-600 text-sm">
                            x{item.quantity}
                          </td>
                          <td className="p-3 text-right text-gray-900 font-medium text-sm">
                            ฿{(item.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t border-gray-200">
                      <tr>
                        <td
                          colSpan="2"
                          className="p-3 text-right font-semibold text-gray-700"
                        >
                          ยอดรวมทั้งสิ้น
                        </td>
                        <td className="p-3 text-right font-bold text-emerald-600 text-lg">
                          ฿{viewModal.order.totalAmount?.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
              <button
                onClick={closeViewOrderModal}
                className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors shadow-sm cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
