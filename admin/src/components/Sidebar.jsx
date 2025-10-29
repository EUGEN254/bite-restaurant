import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaUtensils, 
  FaList, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaCalendarAlt,
  FaBox,
  FaTable,
  FaMoneyBillWave,
  FaHome
} from "react-icons/fa";
import { useAdminContext } from "../context/AdminContext";

const Sidebar = ({ onLinkClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    { 
      name: "Dashboard", 
      path: "dashboard", 
      icon: <FaTachometerAlt className="text-lg" /> 
    },
    { 
      name: "Add Dish", 
      path: "add-dish", 
      icon: <FaUtensils className="text-lg" /> 
    },
    { 
      name: "Category", 
      path: "category", 
      icon: <FaList className="text-lg" /> 
    },
    { 
      name: "Orders", 
      path: "orders", 
      icon: <FaShoppingCart className="text-lg" /> 
    },
    { 
      name: "Reservations", 
      path: "reservations", 
      icon: <FaCalendarAlt className="text-lg" /> 
    },
    { 
      name: "HotelManagment", 
      path: "hotels", 
      icon: <FaHome className="text-lg" /> 
    },
    { 
      name: "Add Table", 
      path: "add-table", 
      icon: <FaTable className="text-lg" /> 
    },
    { 
      name: "Staff/Customers", 
      path: "staff-customers", 
      icon: <FaUsers className="text-lg" /> 
    },
    { 
      name: "Inventory", 
      path: "inventory", 
      icon: <FaBox className="text-lg" /> 
    },
    { 
      name: "Analytics", 
      path: "analytics", 
      icon: <FaChartBar className="text-lg" /> 
    },
    { 
      name: "Payment", 
      path: "payment", 
      icon: <FaMoneyBillWave className="text-lg" /> 
    },
    { 
      name: "Settings", 
      path: "settings", 
      icon: <FaCog className="text-lg" /> 
    }
  ];

  const {admin} = useAdminContext()

  return (
    <div className={`bg-gradient-to-b rounded-br-2xl rounded-tr-2xl from-emerald-900 to-green-900 text-white h-screen transition-all duration-300 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} flex-shrink-0`}>
      
      {/* Header */}
      <div className={`p-4 border-b border-emerald-700 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
              <span className="text-emerald-600 font-bold text-lg">{admin.fullname?.[0] || 'B'}</span>
            </div>
            <div>
              <h1 className="font-bold text-xl">Bite</h1>
              <p className="text-emerald-200 text-xs">Admin Panel</p>
            </div>
          </div>
        )}
        
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-emerald-800 transition-colors duration-200"
        >
          {isCollapsed ? (
            <FaChevronRight className="text-white" />
          ) : (
            <FaChevronLeft className="text-white" />
          )}
        </button>
      </div>

      {/* Navigation Links - Horizontal Scrollable */}
      <nav className="flex-1 p-2 overflow-hidden">
        <div className="h-full overflow-y-auto sidebar-scrollbar hide-horizontal-scrollbar">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  onClick={onLinkClick}
                  end={link.path === "dashboard"}
                  className={({ isActive }) => 
                    `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'bg-white text-emerald-700 shadow-lg' 
                        : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                    } ${isCollapsed ? 'justify-center' : ''}`
                  }
                >
                  <div className="flex-shrink-0">
                    {link.icon}
                  </div>
                  {!isCollapsed && (
                    <span className="font-medium whitespace-nowrap transition-opacity duration-200">
                      {link.name}
                    </span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                      {link.name}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-emerald-700 ${isCollapsed ? 'text-center' : ''}`}>
        {!isCollapsed ? (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-800/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              {admin.fullname?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{admin.fullname || 'Admin'}</p>
              <p className="text-emerald-200 text-xs truncate">Restaurant Manager</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm mx-auto">
            {admin.fullname?.[0] || 'A'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;