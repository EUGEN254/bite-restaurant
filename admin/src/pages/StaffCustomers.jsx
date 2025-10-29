import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaUserTie,
  FaUserShield,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";
import { useAdminContext } from "../context/AdminContext";

const StaffCustomers = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const { backendUrl } = useAdminContext();

  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    password: "",
  });

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Manager",
    password: "",
  });

  const positions = [
    "Head Chef",
    "Sous Chef",
    "Waiter",
    "Bartender",
    "Cashier",
    "Cleaner",
  ];
  const roles = ["Manager", "Supervisor", "Accountant"];

  // 🔹 Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/get-all-members`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Filtered data
  const customers = users.filter(
    (u) => !u.role || u.role.toLowerCase() === "user"
  );
  const staff = users.filter(
    (u) => u.role && u.role.toLowerCase() === "staff"
  );
  const admins = users.filter(
    (u) => u.role && u.role.toLowerCase() === "admin"
  );

  const filterBySearch = (list) =>
    list.filter(
      (u) =>
        u.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getCurrentData = () => {
    switch (activeTab) {
      case "customers":
        return filterBySearch(customers);
      case "staff":
        return filterBySearch(staff);
      case "admins":
        return filterBySearch(admins);
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-2">
            Manage customers, staff, and admin accounts
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <p className="text-blue-700 font-medium">
            Total {activeTab}:{" "}
            <span className="text-blue-800">{getCurrentData().length}</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("customers")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium flex-1 justify-center ${
              activeTab === "customers"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaUsers />
            Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab("staff")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium flex-1 justify-center ${
              activeTab === "staff"
                ? "bg-green-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaUserTie />
            Staff ({staff.length})
          </button>
          <button
            onClick={() => setActiveTab("admins")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium flex-1 justify-center ${
              activeTab === "admins"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaUserShield />
            Admins ({admins.length})
          </button>
        </div>
      </div>

      {/* Search and Add */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          {(activeTab === "staff" || activeTab === "admins") && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg"
            >
              <FaPlus />
              Add {activeTab === "staff" ? "Staff" : "Admin"}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {getCurrentData().length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4">
              {activeTab === "customers" && (
                <FaUsers className="h-16 w-16 mx-auto" />
              )}
              {activeTab === "staff" && (
                <FaUserTie className="h-16 w-16 mx-auto" />
              )}
              {activeTab === "admins" && (
                <FaUserShield className="h-16 w-16 mx-auto" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              No {activeTab} added yet
            </h3>
            <p className="text-gray-400">
              {activeTab === "staff" || activeTab === "admins"
                ? `Click "Add ${activeTab === "staff" ? "Staff" : "Admin"}" to add one.`
                : "No customers have registered yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentData().map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.fullname}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">
                      {user.role || "user"}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal (kept as-is for now) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Add {activeTab === "staff" ? "Staff" : "Admin"}
            </h2>
            <p className="text-gray-500 mb-4">Form coming soon...</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffCustomers;
