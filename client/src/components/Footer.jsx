import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  FaHome,
  FaUserFriends,
  FaUtensils,
  FaStar,
  FaBlog,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-[#f8eee2] via-[#f7dece] to-white p-8 mt-20 border-t border-amber-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {/* Brand Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={assets.logo}
              alt="Restaurant Logo"
              className="w-16 h-16 object-contain cursor-pointer rounded-full bg-amber-200 p-2 border-2 border-amber-300"
            />
            <span className="text-2xl font-bold text-amber-600">
              Restaurant
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-sm">
            Experience the best dining with us. Our team is dedicated to providing top-notch service and unforgettable meals.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaHome className="text-amber-500" />
            Quick Links
          </h2>
          <ul className="space-y-3">
            {[
              { to: "/", icon: FaHome, text: "Home" },
              { to: "/description", icon: FaUserFriends, text: "About Us" },
              { to: "/menu", icon: FaUtensils, text: "Menu" },
              { to: "/hotels", icon: FaStar, text: "Hotels" },
              { to: "/blogs", icon: FaBlog, text: "Blogs" },
              { to: "/contacts", icon: FaPhoneAlt, text: "Contacts" },
            ].map((link, index) => (
              <li key={index}>
              <NavLink
                to={link.to}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "bg-amber-100 text-amber-600 border-l-4 border-amber-500"
                      : "text-gray-600 hover:bg-amber-50 hover:text-amber-500"
                  }`
                }
              >
                <link.icon className="text-lg group-hover:scale-110 transition-transform" />
                <span className="font-medium">{link.text}</span>
              </NavLink>
            </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaPhoneAlt className="text-amber-500" />
            Contact Us
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-amber-100">
              <FaEnvelope className="text-amber-500 text-lg" />
              <div>
                <label className="text-xs text-gray-500 block">Email</label>
                <span className="text-gray-700 font-medium">
                  bitinyoeugen@gmail.com
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-amber-100">
              <FaPhoneAlt className="text-amber-500 text-lg" />
              <div>
                <label className="text-xs text-gray-500 block">Phone</label>
                <span className="text-gray-700 font-medium">
                  +254 115 418 682
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {[
                  {
                    icon: FaInstagram,
                    hoverBg: "hover:bg-pink-500",
                    color: "text-pink-600",
                  },
                  {
                    icon: FaWhatsapp,
                    hoverBg: "hover:bg-green-500",
                    color: "text-green-600",
                  },
                  {
                    icon: FaFacebookF,
                    hoverBg: "hover:bg-blue-500",
                    color: "text-blue-600",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-gray-600 hover:scale-110 transition-all duration-300 group ${social.hoverBg}`}
                  >
                    <social.icon
                      className={`text-xl group-hover:text-white transition-colors duration-300 ${social.color}`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaPaperPlane className="text-amber-500" />
            Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get special offers and stay updated
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 pr-12 rounded-xl border-2 border-amber-200 focus:border-amber-400 focus:outline-none transition-all duration-300 bg-white"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-400 hover:bg-amber-500 p-2 rounded-lg transition-all duration-300 hover:scale-110">
              <FaPaperPlane className="text-white text-lg" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-amber-200 mt-12 pt-6 text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Bites. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
