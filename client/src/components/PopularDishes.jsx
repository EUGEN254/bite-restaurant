import React, { useRef, useState } from "react";
import { assets, food_list } from "../assets/assets";

const PopularDishes = () => {
  const scrollContainerRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* left side */}
      <div className="flex flex-row justify-between items-center mt-40">
        <p className="font-medium text-black -sm:ml-3 text-3xl">Popular Dishes</p>

        {/* right side - Arrow buttons */}
        <div className="flex flex-row gap-3 items-center">
          <img
            src={assets.arrow_icon}
            alt="Previous"
            onClick={scrollLeft}
            className="rotate-180 border-2 border-amber-300 bg-amber-100 hover:bg-amber-300 rounded-full p-4 hover:scale-95 lg:hover:scale-90 transition-all duration-300 cursor-pointer"
          />
          <img
            src={assets.arrow_icon}
            alt="Next"
            onClick={scrollRight}
            className="border-2 border-amber-300 bg-amber-100 hover:bg-amber-300 rounded-full p-4 hover:scale-95 lg:hover:scale-90 transition-all duration-300 cursor-pointer"
          />
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 mt-10 pr-6 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {food_list.map((food, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 bg-gradient-to-b from-[#f8eee2] via-[#f7dece] to-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative flex flex-col"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover rounded-2xl"
              />
            </div>

            {/* Content Area - Using flex column to control spacing */}
            <div className="flex flex-col flex-1 mt-4">
              {/* Title and Button Row */}
              <div className="flex flex-row justify-between items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-lg text-left line-clamp-1">
                    {food.name}
                  </p>
                  <p className="text-amber-400 font-semibold mt-1">
                    KES {food.price}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button className="whitespace-nowrap bg-gradient-to-b from-[#f8eee2] via-[#f7dece] to-white border-2 border-amber-300 px-4 py-2 rounded-full font-medium hover:bg-amber-400 transition-all duration-300 cursor-pointer text-sm">
                    Order Now
                  </button>
                </div>
              </div>

              <hr className="border border-gray-300 my-2" />
              
              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-2 flex-1">
                {food.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDishes;