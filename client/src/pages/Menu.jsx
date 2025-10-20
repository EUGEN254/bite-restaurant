import React, { useState } from "react";
import { food_list, menu_list } from "../assets/assets";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState(50); // Max price filter

  // Filter food items based on selected category and price
  const filteredFoodList = food_list.filter(food => {
    const categoryMatch = selectedCategory === "All" || food.category === selectedCategory;
    const priceMatch = food.price <= priceRange;
    return categoryMatch && priceMatch;
  });

  // Sort the filtered list
  const sortedFoodList = [...filteredFoodList].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price;//so like 10-15 => -5 so a comes first
      case "price-high-low":
        return b.price - a.price;
      case "name-a-z":
        return a.name.localeCompare(b.name);//alphabetically comparison
      case "name-z-a":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Get unique categories for filter dropdown
  const categories = ["All", ...new Set(food_list.map(food => food.category))];

  // Get max price for range slider
  const maxPrice = Math.max(...food_list.map(food => food.price));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8eee2] via-[#f7dece] to-white py-8 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Our Regular Menu Pack
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our delicious selection of carefully crafted dishes made with the finest ingredients
        </p>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {/* Menu Categories */}
          {menu_list.map((category, index) => (
            <div 
              key={index}
              onClick={() => setSelectedCategory(category.menu_name)}
              className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.menu_name ? "ring-2 ring-amber-500 rounded-2xl" : ""
              }`}
            >
              <div className={`bg-gradient-to-b from-[#f8eee2] via-[#f7dece] to-[#f7dece] rounded-2xl p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                selectedCategory === category.menu_name ? "bg-amber-100" : ""
              }`}>
                <img 
                  src={category.menu_image} 
                  alt={category.menu_name} 
                  className="w-full h-20 object-cover rounded-xl"
                />
              </div>
              <p className="text-center text-sm font-medium text-gray-700 mt-2 group-hover:text-amber-600 transition-colors">
                {category.menu_name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="max-w-7xl mx-auto">
        {/* Header with Results Count */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedCategory === "All" ? "All Food Items" : `${selectedCategory} Items`}
            </h2>
            <p className="text-gray-600 mt-2">
              Showing {sortedFoodList.length} of {food_list.length} items
            </p>
          </div>
          
          {/* Filter Section */}
          <div className="mt-4 lg:mt-0 bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                >
                  <option value="default">Default</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price: Kes {priceRange}
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max={maxPrice} 
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Kes 0</span>
                  <span>Kes {maxPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Food Items Grid */}
        {sortedFoodList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">🍕</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedFoodList.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
              >
                {/* Food Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={food.image} 
                    alt={food.name} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Kes {food.price}
                  </div>
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {food.category}
                  </div>
                </div>

                {/* Food Content */}
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                        {food.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {food.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-amber-600">
                          Kes {food.price}
                        </span>
                      </div>
                      <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/*custom styles for the range slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Menu;