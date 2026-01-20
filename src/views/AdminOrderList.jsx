import React, { useState, useEffect } from "react";
import { Eye, Package, CheckCircle, Clock, XCircle, Truck } from "lucide-react";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

  // Update Status Handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        // Update local state
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex text-gray-900 items-center justify-center bg-white">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Order Management
            </h1>
            <p className="text-gray-500">Track and manage customer orders.</p>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold shadow-sm">
            <Package className="w-5 h-5 text-gray-400" />
            <span>Total Orders: {orders.length}</span>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                  <th className="p-5 font-semibold">Order ID</th>
                  <th className="p-5 font-semibold">Customer</th>
                  <th className="p-5 font-semibold">Total</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold">Date</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-3">
                        <Package className="w-12 h-12 text-gray-300" />
                        <p className="text-lg">No orders found.</p>
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
                          {order.items.length} items
                        </div>
                      </td>
                      <td className="p-5 font-mono font-bold text-green-600">
                        ฿{order.totalAmount.toLocaleString()}
                      </td>
                      <td className="p-5">
                        <div className="relative group/status">
                          <button
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </button>

                          {/* Status Dropdown on Hover */}
                          <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden hidden group-hover/status:block z-10">
                            {[
                              "Pending",
                              "Processing",
                              "Shipped",
                              "Delivered",
                              "Cancelled",
                            ].map((status) => (
                              <button
                                key={status}
                                onClick={() =>
                                  handleStatusChange(order._id, status)
                                }
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                  order.status === status
                                    ? "bg-gray-100 font-semibold"
                                    : ""
                                }`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-5 text-right">
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
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
    </div>
  );
};

export default AdminOrderList;
