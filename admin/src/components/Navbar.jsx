import React, { useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import { 
  FaBell, 
  FaComments, 
  FaSignOutAlt, 
  FaCog, 
  FaChevronDown,
  FaCircle,
  FaEnvelope,
  FaBars
} from "react-icons/fa";
import { IoIosRestaurant } from "react-icons/io";

const Navbar = ({ onMenuToggle }) => { // Add onMenuToggle prop
  const { logoutAdmin, admin } = useAdminContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mock notifications data
  const notifications = [
    { id: 1, message: "New order received - Table #5", time: "5 min ago", read: false, type: "order" },
    { id: 2, message: "Table reservation for 4 people at 7:00 PM", time: "10 min ago", read: false, type: "reservation" },
    { id: 3, message: "Inventory low: Chicken breast", time: "1 hour ago", read: true, type: "inventory" },
    { id: 4, message: "Staff shift change reminder", time: "2 hours ago", read: true, type: "staff" },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'order': return <IoIosRestaurant className="text-blue-500" />;
      case 'reservation': return <FaCircle className="text-green-500 text-xs" />;
      case 'inventory': return <FaBell className="text-red-500" />;
      case 'staff': return <FaCog className="text-purple-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div className="md:m-1 rounded-2xl w-full max-w-full flex flex-row justify-between items-center p-2 bg-white shadow-lg border-b border-gray-200">
      {/* Left side - Hamburger Menu & Profile */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {/* Hamburger Menu Button - Visible only on mobile */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <FaBars className="h-5 w-5 text-gray-600" />
        </button>

        <div className="hidden sm:flex items-center gap-4">
          <div className="relative">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white font-bold text-lg shadow-md">
              {admin.fullname?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
              <FaCircle className="text-white text-xs" />
            </div>
          </div>
          
          <div className="flex flex-col min-w-0">
            <div className="font-semibold text-gray-800 text-lg truncate">
              {admin.fullname || "Admin"}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-2 truncate">
              <span className="truncate">{admin.email || "admin@restaurant.com"}</span>
            </div>
          </div>
        </div>

        {/* Mobile-only profile info */}
        <div className="sm:hidden flex items-center gap-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white font-bold text-sm shadow-md">
            {admin.fullname?.[0]?.toUpperCase() || "A"}
          </div>
        </div>
      </div>

      {/* Right side - Icons and Actions */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 md:mr-3">
        {/* Chat Icon - Hidden on very small screens */}
        <button className="hidden sm:block relative p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group border border-gray-200 hover:border-emerald-200 flex-shrink-0">
          <FaComments className="h-5 w-5 text-gray-600 group-hover:text-emerald-600 transition-colors" />
          <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
            3
          </div>
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
            Messages
          </div>
        </button>

        {/* Notification Icon */}
        <div className="relative flex-shrink-0">
          <button 
            className="p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group border border-gray-200 hover:border-emerald-200"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell className="h-5 w-5 text-gray-600 group-hover:text-emerald-600 transition-colors" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium animate-pulse">
                {unreadCount}
              </div>
            )}
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
              Notifications
            </div>
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-medium">
                    {unreadCount} new
                  </span>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      <div className="mt-1 flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-gray-100">
                <button className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium py-2 transition-colors">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative flex-shrink-0">
          <button
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-200"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
              {admin.fullname?.[0]?.toUpperCase() || "A"}
            </div>
            <FaChevronDown className={`hidden md:block h-3 w-3 text-gray-500 group-hover:text-emerald-600 transition-transform duration-200 flex-shrink-0 ${
              showProfileMenu ? 'rotate-180' : ''
            }`} />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-100">
                <div className="font-semibold text-gray-800 truncate">{admin.fullname || "Admin"}</div>
                <div className="text-sm text-gray-500 truncate">{admin.email || "admin@restaurant.com"}</div>
              </div>
              
              <div className="p-2">
                <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors duration-200">
                  <FaCog className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="font-medium truncate">Settings</span>
                </button>
                
                <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors duration-200">
                  <FaEnvelope className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="font-medium truncate">Support</span>
                </button>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button 
                  onClick={logoutAdmin}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors duration-200 font-medium"
                >
                  <FaSignOutAlt className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for closing dropdowns */}
      {(showNotifications || showProfileMenu) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowProfileMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;