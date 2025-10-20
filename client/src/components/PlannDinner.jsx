import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PlannDinner = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-row justify-between items-center px-20 py-10 mt-10">
      {/* left side */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="font-bold text-2xl lg:text-3xl text-gray-800">
            Do You Have Any Dinner <br />
            Plan Today? Reserve <br />
            Your Table
          </p>
          <p className="text-sm text-gray-600 max-w-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla autem
            rem met reprquia impedit expedita quod.
          </p>
        </div>

        <div className="mt-4">
          <button 
          onClick={() => navigate("/reservation")}
          className="flex items-center gap-2 bg-amber-400 px-6 lg:px-8 py-3 rounded-full text-black hover:scale-95 lg:hover:scale-90 transition-all duration-300 text-sm lg:text-base whitespace-nowrap">
            Reserve
          </button>
        </div>
      </div>

      {/* right side */}
      <div className="relative">
        <img 
          src={assets.table} 
          alt="table"
          className="w-80 h-80 lg:w-[500px] object-cover rounded-lg shadow-lg mix-blend-multiply"
        />
        {/* Optional overlay for better blending */}
        <div className="absolute inset-0 bg-amber-100/20 rounded-lg pointer-events-none"></div>
      </div>
    </div>
  );
};

export default PlannDinner;