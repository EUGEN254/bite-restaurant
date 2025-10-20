import React from "react";
import { assets } from "../assets/assets";
import {
  FaShoppingCart,
  FaClock,
  FaBroom,
  FaCalendarCheck,
  FaUtensils,
  FaUserTie,
  FaAward,
  FaLeaf,
  FaHeart,
  FaStar,
  FaArrowRight
} from "react-icons/fa";
import { MdLocalShipping, MdSupportAgent } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MoreAboutUs = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaShoppingCart className="text-amber-500 text-xl" />,
      title: "Online Orders",
      description: "Seamless online ordering system with real-time tracking and instant confirmation",
      stats: "10,000+ orders monthly"
    },
    {
      icon: <FaClock className="text-amber-500 text-xl" />,
      title: "24/7 Service",
      description: "Round-the-clock service for late-night cravings and early morning breakfast",
      stats: "Always available"
    },
    {
      icon: <FaBroom className="text-amber-500 text-xl" />,
      title: "Hygiene Certified",
      description: "5-star hygiene rating with daily sanitation and quality checks",
      stats: "100% Clean Kitchen"
    },
    {
      icon: <FaCalendarCheck className="text-amber-500 text-xl" />,
      title: "Smart Reservations",
      description: "Advanced booking system with table customization and special requests",
      stats: "5,000+ monthly reservations"
    },
    {
      icon: <FaUtensils className="text-amber-500 text-xl" />,
      title: "Organized Foodie Place",
      description: "Perfectly organized dining spaces for intimate dinners and large gatherings",
      stats: "50+ seating capacity"
    },
    {
      icon: <FaUserTie className="text-amber-500 text-xl" />,
      title: "Master Chefs",
      description: "Internationally trained chefs with decades of culinary expertise",
      stats: "15+ years experience"
    },
    {
      icon: <FaLeaf className="text-amber-500 text-xl" />,
      title: "Fresh Ingredients",
      description: "Locally sourced, organic ingredients delivered fresh daily",
      stats: "Farm to Table"
    },
    {
      icon: <MdLocalShipping className="text-amber-500 text-xl" />,
      title: "Fast Delivery",
      description: "30-minute delivery guarantee within 5km radius",
      stats: "98% on-time delivery"
    }
  ];

  const achievements = [
    { number: "50+", label: "Expert Chefs" },
    { number: "1000+", label: "Happy Customers" },
    { number: "15+", label: "Years Experience" },
    { number: "50+", label: "Awards Won" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-0.5 bg-amber-400"></div>
            <span className="text-amber-600 font-semibold">WHY CHOOSE US</span>
            <div className="w-12 h-0.5 bg-amber-400"></div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            We Are More Than <span className="text-amber-600">Just A Restaurant</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover why thousands of customers trust us for exceptional dining experiences, 
            innovative culinary creations, and unparalleled service excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Chef Image with Decorative Elements */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={assets.chef}
                className="w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-in-out"
                alt="Master Chef preparing exquisite dishes"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-400 rounded-full opacity-20 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-300 rounded-full opacity-15 -z-10"></div>
            
            {/* Floating Badges */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <FaAward className="text-amber-500 text-2xl" />
              <div>
                <p className="font-bold text-gray-800">Award Winning</p>
                <p className="text-xs text-gray-600">Since 2008</p>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <FaHeart className="text-red-500 text-2xl" />
              <div>
                <p className="font-bold text-gray-800">100% Fresh</p>
                <p className="text-xs text-gray-600">Daily Ingredients</p>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                Crafting Memorable <br />
                <span className="text-amber-600">Dining Experiences</span>
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                At Gourmet Haven, we believe every meal should be an unforgettable journey. 
                Our passion for culinary excellence, combined with innovative techniques and 
                the finest ingredients, creates dining experiences that linger in your memory.
              </p>

              <p className="text-gray-600 leading-relaxed">
                From intimate dinners to grand celebrations, our dedicated team ensures every 
                detail is perfect. We source locally, cook with passion, and serve with pride, 
                making us the preferred choice for food enthusiasts across the city.
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-amber-600 mb-1">{achievement.number}</p>
                  <p className="text-sm text-gray-600 font-medium">{achievement.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {navigate("/menu"); window.scrollTo({top:"0",behaviour:"smooth"})}}
                className="bg-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                Explore Our Menu
                <FaArrowRight />
              </button>
              <button 
              onClick={() => {navigate("/reservation"); window.scrollTo({top:"0",behaviour:"smooth"})}}
                className="border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-xl font-semibold hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Book a Table
                <FaCalendarCheck />
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Why We Stand Out
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the unique features that make us the preferred choice for food lovers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="bg-amber-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{feature.description}</p>
                <p className="text-amber-600 text-sm font-semibold">{feature.stats}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-amber-500 text-xl" />
              ))}
            </div>
            <p className="text-gray-600">Rated 4.9/5 by 1000+ customers</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "The best dining experience I've had this year! The attention to detail is remarkable.",
                author: "Sarah M.",
                role: "Food Critic"
              },
              {
                quote: "From reservation to dessert, everything was perfect. Highly recommended!",
                author: "John D.",
                role: "Regular Customer"
              },
              {
                quote: "Their chefs are true artists. Every dish tells a story of passion and expertise.",
                author: "Chef Marco",
                role: "Industry Expert"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-amber-50 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Experience Excellence?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made us their preferred dining destination
          </p>
          <button 
            onClick={() => {navigate("/reservation"); window.scrollTo({top:"0",behaviour:"smooth"})}}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Reserve Your Table Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreAboutUs;