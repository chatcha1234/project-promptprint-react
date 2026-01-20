import React, { useState, useEffect } from "react";
import { Trash2, User, Users, Shield, ShieldAlert } from "lucide-react";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete User Handler
  const handleDelete = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    )
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((u) => u._id !== userId));
        alert("User deleted successfully");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error connecting to server");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex text-gray-900 items-center justify-center bg-white">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Manage Users
            </h1>
            <p className="text-gray-500">View and manage registered users.</p>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold shadow-sm">
            <Users className="w-5 h-5 text-gray-400" />
            <span>Total Users: {users.length}</span>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                  <th className="p-5 font-semibold">User Info</th>
                  <th className="p-5 font-semibold">Role</th>
                  <th className="p-5 font-semibold">Joined At</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-3">
                        <User className="w-12 h-12 text-gray-300" />
                        <p className="text-lg">No users found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {user.role === "admin" ? (
                              <Shield className="w-5 h-5" />
                            ) : (
                              <User className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {user.username}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            user.role === "admin"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }`}
                        >
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-5 text-gray-500 text-sm">
                        {new Date(
                          user.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </td>
                      <td className="p-5">
                        <div className="flex items-center justify-end gap-2">
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(user._id)}
                            disabled={user.role === "admin"} // Prevent deleting admin/self simply here (backend should enforce too)
                            className={`p-2 rounded-lg transition-colors ${
                              user.role === "admin"
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                            }`}
                            title={
                              user.role === "admin"
                                ? "Cannot delete admin"
                                : "Delete User"
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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

export default AdminUserList;
