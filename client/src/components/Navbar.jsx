import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MdShoppingBasket } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
          <NavLink to="/" className="group">
            <li className="py-1 group-hover:text-amber-600 transition-colors duration-300">
              Home
            </li>
            <hr className="border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavLink>
          <NavLink to="/description" className="group">
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
              2
            </div>
          </NavLink>

          {/* Avatar or Login */}
          {user ? (
            <div className="flex items-center gap-4">
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
                      onClick={() => {
                        setUser(false);
                        setShowDropdown(false);
                        navigate("/");
                      }}
                      className="cursor-pointer text-red-500 hover:text-white hover:bg-red-500 transition-all flex items-center gap-2 px-3 py-2 rounded-lg mt-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Reserve Table Button - SEPARATE from dropdown */}
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
              className="text-black bg-amber-400 px-8 py-3 rounded-full cursor-pointer font-medium hover:bg-amber-500 transition"
            >
              Create account
            </button>
          )}

          {/* mobile menu Icon */}
          <button onClick={() => setShowMenu(true)} className="md:hidden">
            <HiOutlineMenu className="text-3xl text-amber-700 cursor-pointer hover:text-amber-800 transition" />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`${
          showMenu ? "fixed inset-0 w-full h-screen" : "hidden"
        } md:hidden z-20 bg-orange-200 transition-all`}
      >
        <div className="flex items-center justify-between px-7 py-4">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-12 h-12 object-contain cursor-pointer rounded-full bg-amber-200"
          />
          <button>
            <RiCloseLine
              onClick={() => setShowMenu(false)}
              className="text-3xl text-amber-700 cursor-pointer hover:text-amber-800 transition"
            />
          </button>
        </div>

        <ul className="flex flex-col items-start gap-4 mt-5 px-5 ml-8 font-medium text-lg">
          <NavLink onClick={() => setShowMenu(false)} to={"/"}>
            <li className="px-4 py-2 rounded inline-block hover:text-amber-600 hover:bg-amber-100 transition-all duration-300">
              Home
            </li>
          </NavLink>
          <NavLink to={"/description"} onClick={() => setShowMenu(false)}>
            <li className="px-4 py-2 rounded inline-block hover:text-amber-600 hover:bg-amber-100 transition-all duration-300">
              About Us
            </li>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={"/menu"}>
            <li className="px-4 py-2 rounded inline-block hover:text-amber-600 hover:bg-amber-100 transition-all duration-300">
              Menu
            </li>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={"/hotels"}>
            <li className="px-4 py-2 rounded inline-block hover:text-amber-600 hover:bg-amber-100 transition-all duration-300">
              Hotels
            </li>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={"/blogs"}>
            <li className="px-4 py-2 rounded inline-block hover:text-amber-600 hover:bg-amber-100 transition-all duration-300">
              Blogs
            </li>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={"/contacts"}>
            <li className="px-4 py-2 rounded inline-block hover:text-amber-600 hover:bg-amber-100 transition-all duration-300">
              Contacts
            </li>
          </NavLink>
        </ul>

        {/* Mobile Auth Buttons */}
        <div className="mt-8 px-8">
          {user ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  navigate("/reservation");
                  setShowMenu(false);
                }}
                className="w-full text-black bg-amber-400 px-6 py-3 rounded-full cursor-pointer font-medium hover:bg-amber-500 transition"
              >
                Reserve Table
              </button>
              <button
                onClick={() => {
                  setUser(false);
                  setShowMenu(false);
                  navigate("/");
                }}
                className="w-full text-red-500 border border-red-500 px-6 py-3 rounded-full cursor-pointer font-medium hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="w-full text-black bg-amber-400 px-8 py-3 rounded-full cursor-pointer font-medium hover:bg-amber-500 transition"
            >
              Create account
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
