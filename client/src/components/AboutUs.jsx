import React from "react";
import { assets } from "../assets/assets";
import {
  FaShoppingCart,
  FaClock,
  FaBroom,
  FaCalendarCheck,
  FaUtensils,
  FaUserTie,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const services = [
  { icon: FaShoppingCart, text: "Online Orders" },
  { icon: FaClock, text: "24/7 Service" },
  { icon: FaBroom, text: "Clean Kitchen" },
  { icon: FaCalendarCheck, text: "Pre-Reservation" },
  { icon: FaUtensils, text: "Organized Foodie Place" },
  { icon: FaUserTie, text: "Super Chefs" },
];

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-30 flex flex-col lg:flex-row gap-10 lg:gap-40 items-center" id="about-us">
      {/* left side - Chef Image */}
      <div className="relative">
        <img
          src={assets.chef}
          className="transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-in-out max-w-xs lg:max-w-md"
          alt="Chef"
        />
        {/* decoration */}
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-amber-400 rounded-full opacity-20 -z-10"></div>
      </div>

      {/* right side */}
      <div className="flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-5">
          <p className="font-bold text-2xl lg:text-3xl text-gray-800">
            We Are More Than <br /> Multiple Service
          </p>
          <div className="text-sm text-gray-600 max-w-xs lg:max-w-md">
            We provide a variety of services to ensure your dining experience is exceptional. From online orders to organized foodie places, we have it all.
          </div>
        </div>

        <div className="text-sm text-gray-600">
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            {services.map((service, index) => (
              <li key={index} className="flex items-center gap-3">
                <service.icon className="text-amber-500 text-lg" />
                <span>{service.text}</span>
              </li>
            ))}
          </ul>
          <button 
          onClick={()=> {navigate('/description'); window.scrollTo({ top: 0, behavior: 'smooth' })}}
          className="flex items-center font-medium mt-5 gap-2 bg-amber-400 px-6 lg:px-8 py-3 rounded-full text-black hover:scale-95 lg:hover:scale-90 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
            More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
