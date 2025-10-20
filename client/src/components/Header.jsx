import React from "react";
import {
  FaSearch,
  FaUtensils,
  FaIceCream,
  FaGlassWhiskey,
  FaConciergeBell,
  FaCookieBite,
} from "react-icons/fa";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-5 items-center lg:items-start mt-10 lg:mt-20 px-5 lg:px-20 animate-fade-in">
      {/* Text Content Section */}
      <div className="lg:w-1/2 flex flex-col justify-center items-start w-full">
        <div>
          <img alt="" />
        </div>
        <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight text-left w-full">
          We Serve the Taste <br />
          You Love 😍
        </p>
        <p className="my-4 lg:my-5 text-gray-600 text-sm lg:text-base max-w-2xl lg:w-[80vh] text-left w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          architecto molestiae, distinctio saepe ab quod reiciendis accusamus,
          iure, sunt consequatur temporibus possimus facilis ex deleniti autem
          delectus cum officiis explicabo!
        </p>
        <div className="flex flex-row gap-3 lg:gap-4 justify-start w-full">
          <button className="flex items-center gap-2 bg-amber-400 px-6 lg:px-8 py-3 rounded-full text-black hover:scale-95 lg:hover:scale-90 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
            Explore Food
            <img className="w-3" src={assets.arrow_icon} alt="" />
          </button>
          <button className="flex items-center gap-2 bg-white px-6 lg:px-8 py-3 rounded-full text-black border-2 border-amber-400 hover:scale-95 lg:hover:scale-90 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
            <FaSearch className="text-sm" /> Search Your Food
          </button>
        </div>
      </div>

      {/* Image and Categories Section */}
      <div className="flex flex-col sm:flex-row lg:flex-row items-center gap-6 lg:gap-10 mt-8 lg:mt-0">
        {/* Image */}
        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-none">
          <img 
            src={assets.popular_dish} 
            className="w-full max-w-[280px] sm:max-w-[320px] lg:w-90 h-auto object-contain" 
            alt="Popular dish" 
          />
        </div>
        
        {/* Categories List */}
        <div className="w-full sm:w-auto">
          <ul className="flex flex-row sm:flex-col gap-3 lg:gap-2 font-medium text-gray-700 justify-start flex-wrap sm:flex-nowrap">
            <li className="flex flex-row items-center gap-2 bg-amber-200 px-4 py-2 lg:p-3 rounded-full hover:scale-95 lg:hover:scale-90 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
              <FaUtensils /> Dishes
            </li>
            <li className="flex flex-row items-center gap-2 bg-amber-200 px-4 py-2 lg:p-3 rounded-full hover:scale-95 lg:hover:scale-90 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
              <FaIceCream /> Desert
            </li>
            <li className="flex flex-row items-center gap-2 bg-amber-200 px-4 py-2 lg:p-3 rounded-full hover:scale-95 lg:hover:scale-90 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
              <FaGlassWhiskey /> Drinks
            </li>
            <li className="flex flex-row items-center gap-2 bg-amber-200 px-4 py-2 lg:p-3 rounded-full hover:scale-95 lg:hover:scale-90 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
              <FaConciergeBell /> Platter
            </li>
            <li className="flex flex-row items-center gap-2 bg-amber-200 px-4 py-2 lg:p-3 rounded-full hover:scale-95 lg:hover:scale-90 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
              <FaCookieBite /> Snacks
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;