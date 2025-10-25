import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { 
  MdShoppingBasket, 
  MdClose,
  MdPerson,
  MdRestaurantMenu,
  MdHotel,
  MdCalendarToday,
  MdArticle,
  MdContactMail,
  MdLogout
} from "react-icons/md";
import { 
  FaBell, 
  FaHome, 
  FaUserCircle,
  FaChevronRight 
} from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { useRestaurant } from "../context/RestaurantContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { getTotalItems, user, setUser, backendUrl } = useRestaurant();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        setUser(null);
        localStorage.removeItem("user");
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    { path: "/", icon: FaHome, label: "Home" },
    { path: "/description", icon: MdPerson, label: "About Us" },
    { path: "/menu", icon: MdRestaurantMenu, label: "Menu" },
    { path: "/hotels", icon: MdHotel, label: "Hotels" },
    { path: "/reservation", icon: MdCalendarToday, label: "Reservations" },
    { path: "/blogs", icon: MdArticle, label: "Blogs" },
    { path: "/contacts", icon: MdContactMail, label: "Contacts" },
  ];

  return (
    <>
      <div className="flex items-center justify-between text-sm py-4 mb-5">
        {/* Logo section */}
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Restaurant Logo"
          className="w-12 h-12 object-contain cursor-pointer rounded-full bg-amber-200"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center ml-30 gap-5 font-medium">
          <NavLink to="/" className="group" aria-label="Home">
            <li className="py-1 group-hover:text-amber-600 transition-colors duration-300">
              Home
            </li>
            <hr className="border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavLink>
          <NavLink to="/description" className="group" aria-label="About Us">
            <li className="group-hover:text-amber-600 transition-colors duration-300">
              About Us
            </li>
            <hr className="border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavLink>
          <NavLink to="/menu" className="group">
            <li className="group-hover:text-amber-600 transition-colors duration-300">
              Menu
            </li>
            <hr className="border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavLink>
          <NavLink to="/hotels" className="group">
            <li className="group-hover:text-amber-600 transition-colors duration-300">
              Hotels
            </li>
            <hr className="border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavLink>
          <NavLink to="/reservation" className="group">
            <li className="group-hover:text-amber-600 transition-colors duration-300">
              Reservations
            </li>
            <hr className="border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavLink>
          <NavLink to="/blogs" className="group">
            <li className="group-hover:text-amber-600 transition-colors duration-300">
              Blogs
            </li>
            <hr className="border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavLink>
          <NavLink to="/contacts" className="group">
            <li className="group-hover:text-amber-600 transition-colors duration-300">
              Contacts
            </li>
            <hr className="border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavLink>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <NavLink to="/notification" className="relative">
            <FaBell className="text-2xl text-amber-700 cursor-pointer hover:text-amber-800 transition" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-xs font-medium text-white">
              2
            </div>
          </NavLink>

          {/* basket icon */}
          <NavLink to="/cart" className="relative">
            <MdShoppingBasket className="text-2xl text-amber-700 cursor-pointer hover:text-amber-800 transition" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-xs font-medium text-white">
              {getTotalItems()}
            </div>
          </NavLink>

          {/* Avatar or Login */}
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              {/* User Profile with Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                {/* Avatar & Dropdown Trigger */}
                <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-amber-50 transition">
                  <img
                    src={user.image || assets.avatar}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-amber-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.fullname?.split(" ")[0] || "User"}
                  </span>
                  <img
                    src={assets.dropdown}
                    alt="dropdown"
                    className={`w-3 transition-transform duration-200 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-1 min-w-52 bg-white border border-amber-200 rounded-2xl shadow-lg flex flex-col gap-2 p-4 z-30">
                    <div className="px-3 py-2 border-b border-amber-100">
                      <p className="font-medium text-gray-800">
                        {user.fullname}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <p
                      onClick={() => {
                        navigate("/profile");
                        setShowDropdown(false);
                      }}
                      className="cursor-pointer py-2 px-3 rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-all"
                    >
                      Profile
                    </p>
                    <p
                      onClick={() => {
                        navigate("/my-reservations");
                        setShowDropdown(false);
                      }}
                      className="cursor-pointer py-2 px-3 rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-all"
                    >
                      My Reservations
                    </p>
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer text-red-500 hover:text-white hover:bg-red-500 transition-all flex items-center gap-2 px-3 py-2 rounded-lg mt-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Reserve Table Button */}
              <button
                onClick={() => navigate("/reservation")}
                className="text-black bg-amber-400 px-6 py-2 rounded-full cursor-pointer font-medium hover:bg-amber-500 transition"
              >
                Reserve Table
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="hidden md:block text-black bg-amber-400 px-8 py-3 rounded-full cursor-pointer font-medium hover:bg-amber-500 transition"
            >
              Create account
            </button>
          )}

          {/* MOBILE MENU BUTTON - This was missing! */}
          <button 
            onClick={() => setShowMenu(true)} 
            className="md:hidden p-2 rounded-lg hover:bg-amber-50 transition-colors"
          >
            <HiOutlineMenu className="text-2xl text-amber-700" />
          </button>
        </div>
      </div>

      {/* Professional Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out ${
          showMenu
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        } md:hidden`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setShowMenu(false)}
        />

        {/* Menu Panel */}
        <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center gap-3">
              <img
                src={assets.logo}
                alt="Logo"
                className="w-10 h-10 object-contain rounded-full bg-amber-200"
              />
              <div>
                <h2 className="font-bold text-gray-800 text-lg">Gourmet Haven</h2>
                <p className="text-xs text-gray-500">Fine Dining Experience</p>
              </div>
            </div>
            <button
              onClick={() => setShowMenu(false)}
              className="p-2 rounded-full hover:bg-white transition-colors"
            >
              <MdClose className="text-2xl text-gray-600" />
            </button>
          </div>

          {/* User Info Section */}
          {user ? (
            <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <div className="flex items-center gap-3">
                <img
                  src={user.image || assets.avatar}
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">
                    {user.fullname}
                  </h3>
                  <p className="text-amber-100 text-sm truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <div className="text-center">
                <FaUserCircle className="text-3xl mx-auto mb-2" />
                <p className="font-medium">Welcome Guest</p>
                <p className="text-amber-100 text-sm">Sign in to access features</p>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-4">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? "bg-amber-500 text-white shadow-lg"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                      }`
                    }
                  >
                    <IconComponent
                      className={`text-xl transition-transform duration-200 ${
                        location.pathname === item.path
                          ? "text-white"
                          : "text-amber-500 group-hover:scale-110"
                      }`}
                    />
                    <span className="font-medium flex-1">{item.label}</span>
                    <FaChevronRight
                      className={`text-xs transition-transform duration-200 ${
                        location.pathname === item.path
                          ? "text-white"
                          : "text-gray-400 group-hover:text-amber-500"
                      }`}
                    />
                  </NavLink>
                );
              })}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 px-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    navigate("/cart");
                    setShowMenu(false);
                  }}
                  className="flex flex-col items-center justify-center p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors group"
                >
                  <div className="relative">
                    <MdShoppingBasket className="text-2xl text-amber-600 mb-1" />
                    {getTotalItems() > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-medium">
                        {getTotalItems()}
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-700">Cart</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/notification");
                    setShowMenu(false);
                  }}
                  className="flex flex-col items-center justify-center p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors group"
                >
                  <div className="relative">
                    <FaBell className="text-xl text-amber-600 mb-1" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-medium">
                      2
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-700">Alerts</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-100 space-y-3">
            {user ? (
              <>
                <button
                  onClick={() => {
                    navigate("/reservation");
                    setShowMenu(false);
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <MdCalendarToday className="text-lg" />
                  Reserve Table
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full border border-red-500 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MdLogout className="text-lg" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setShowMenu(false);
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <FaUserCircle className="text-lg" />
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;