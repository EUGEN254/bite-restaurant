import React, { useRef } from "react";
import { assets, testimonials } from "../assets/assets";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
    const scrollContainerRef = useRef(null);

    // function to scroll to left
    const scrollLeft = () => {
        if(scrollContainerRef.current){
            scrollContainerRef.current.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        }
    }

    // function to scroll to right
    const scrollRight = () => {
        if(scrollContainerRef.current){
            scrollContainerRef.current.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    }

  return (
    <div className="mt-20 px-4 md:px-16 lg:px-32" id="testimonials">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            What Our <span className="text-amber-500">Customers</span> Say
          </h2>
          <p className="text-gray-600 mt-2 max-w-md">
            Discover why our customers love dining with us
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <button 
            onClick={scrollLeft}
            className="rotate-180 border-2 border-amber-300 bg-amber-100 hover:bg-amber-300 rounded-full p-3 hover:scale-95 transition-all duration-300 cursor-pointer"
          >
            <img src={assets.arrow_icon} alt="Previous" className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="border-2 border-amber-300 bg-amber-100 hover:bg-amber-300 rounded-full p-3 hover:scale-95 transition-all duration-300 cursor-pointer"
          >
            <img src={assets.arrow_icon} alt="Next" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div 
        ref={scrollContainerRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        className="flex overflow-x-auto gap-8 mt-10 pb-6 scrollbar-hide scroll-smooth"
      >
        {testimonials.map((item, index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-80 bg-gradient-to-br from-white to-amber-50 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-amber-100"
            aria-hidden={index !== 0}
          >
            {/* Quote Icon */}
            <div className="text-amber-400 mb-4">
              <FaQuoteLeft className="text-2xl opacity-70" />
            </div>

            {/* Stars Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`text-sm ${
                    i < item.rating ? 'text-amber-400' : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>

            {/* Testimony Text */}
            <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-4">
              "{item.testimony}"
            </p>

            {/* Customer Info */}
            <div className="flex items-center gap-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-200"
              />
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-amber-500 text-sm">{item.role || "Happy Customer"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <div 
            key={index}
            className="w-2 h-2 rounded-full bg-amber-200 transition-all duration-300"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;