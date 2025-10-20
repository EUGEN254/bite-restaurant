import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PlannDinner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-20 py-8 lg:py-10 mt-8 lg:mt-10 gap-8 lg:gap-0">
      {/* left side */}
      <div className="flex flex-col gap-4 lg:gap-6 text-center lg:text-left order-2 lg:order-1">
        <div className="flex flex-col gap-3 lg:gap-4">
          <p className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-800 leading-tight">
            Do You Have Any Dinner <br className="hidden sm:block" />
            Plan Today? Reserve <br className="hidden sm:block" />
            Your Table
          </p>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xs sm:max-w-sm mx-auto lg:mx-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla autem
            rem met reprquia impedit expedita quod.
          </p>
        </div>

        <div className="mt-2 lg:mt-4">
          <button
            onClick={() => {navigate("/reservation"); window.scrollTo({ top: 0, behavior: 'smooth' })}}
            className="flex items-center justify-center gap-2 bg-amber-400 px-6 lg:px-8 py-3 rounded-full text-black hover:scale-95 transition-all duration-300 text-sm lg:text-base whitespace-nowrap w-full sm:w-auto mx-auto lg:mx-0"
          >
            Reserve Your Table
          </button>
        </div>
      </div>

      {/* right side */}
      <div className="relative order-1 lg:order-2">
        <img
          src={assets.table2}
          alt="table"
          className="w-64 h-64 sm:w-72 sm:h-72 lg:w-[500px] lg:h-80 object-cover rounded-lg shadow-lg mix-blend-multiply"
        />
        {/* overlay for blending */}
        <div className="absolute inset-0 bg-amber-100/20 rounded-lg pointer-events-none"></div>
      </div>
    </div>
  );
};

export default PlannDinner;
