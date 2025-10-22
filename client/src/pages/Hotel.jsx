import React, { useState, useMemo } from "react";
import { counties, hotel } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useRestaurant } from "../context/RestaurantContext";

const Hotel = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate()
  const [selectedHotel, setSelectedHotel] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [cities, setCities] = useState([
    ...new Set(hotel.map((h) => h.address)),
  ]);
  const [hotelNames, setHotelNames] = useState(hotel.map((h) => h.name));
  const [priceRange, setPriceRange] = useState(5000);
  const maxPrice = Math.max(...hotel.map((h) => h.pricePerNight));
   const { addHotel} = useRestaurant();

  // filtering logic
  const filteredHotels = useMemo(() => {
    return hotel.filter((item) => {
        const cityMatch = selectedCity ? item.address === selectedCity : true;
        const hotelMatch = selectedHotel ? item.name === selectedHotel : true;
        const priceMatch = item.pricePerNight <= priceRange;
        return cityMatch && hotelMatch && priceMatch;
    });
  }, [selectedCity, selectedHotel, priceRange]);

  // sorting logic
  const sortedHotels = useMemo(() => {
    return [...filteredHotels].sort((a, b) => {
        if (sortOption === "priceLowToHigh") {
            return a.pricePerNight - b.pricePerNight;
        } else if (sortOption === "priceHighToLow") {
            return b.pricePerNight - a.pricePerNight;
        } else {
            return 0;
        }
    });
  }, [filteredHotels, sortOption]);

  const handleOrderHotel = (hotel) =>{
    addHotel(hotel)
    navigate('/hotel-checkout');
    window.scrollTo({top:0,behaviour:'smooth'})

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8eee2] via-[#f7dece] to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Hotels & Resorts
        </h1>

        {/* filter section */}
        <div className="mt-4 lg:mt-0 mb-12 p-6 bg-white rounded-3xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Cities */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="">All Cities</option>
                {cities.map((cityItem) => (
                  <option key={cityItem} value={cityItem}>
                    {cityItem}
                  </option>
                ))}
              </select>
            </div>

            {/* hotelNames */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hotel Name
              </label>
              <select
                value={selectedHotel}
                onChange={(e) => setSelectedHotel(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="">All Hotels</option>
                {hotelNames.map((hotelItem) => (
                  <option key={hotelItem} value={hotelItem}>
                    {hotelItem}
                  </option>
                ))}
              </select>
            </div>

            {/* sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="default">Default</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>

            {/* price range filter */}
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

        {/* Results Counter */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {sortedHotels.length} of {hotel.length} hotels
          </p>
        </div>

        {/* Hotels List */}
        {sortedHotels.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No hotels found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={() => {
                setSelectedCity("");
                setSelectedHotel("");
                setSortOption("default");
                setPriceRange(maxPrice);
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {sortedHotels.map((item) => (
              <div
                key={item._id}
                className="bg-gradient-to-b from-[#f8eee2] via-[#f7dece] to-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* LEFT SIDE - Hotel Description */}
                  <div className="lg:w-2/5 p-8 flex flex-col justify-between">
                    <div>
                      {/* Hotel Main Image */}
                      <div className="mb-6">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-64 object-cover rounded-2xl shadow-md"
                        />
                      </div>

                      {/* Hotel Details */}
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {item.name}
                          </h2>
                          <p className="text-gray-600 mb-1">{item.address}</p>
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              item.isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.isAvailable
                              ? "✅ Available"
                              : "❌ Not Available"}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-bold text-amber-600">
                            Kes {item.pricePerNight}
                          </span>
                          <span className="text-gray-500">/ night</span>
                        </div>

                        {/* Amenities */}
                        <div>
                          <h3 className="font-semibold text-gray-700 mb-3">
                            Amenities:
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {item.amenities.map((amenity, idx) => (
                              <span
                                key={idx}
                                className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm border border-amber-200"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Book Button */}
                    <button
                      onClick={() => {
                        if (item.isAvailable) {
                          handleOrderHotel(item)
                        }
                      }}
                      className={`w-full mt-6 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        item.isAvailable
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 hover:scale-105"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!item.isAvailable}
                    >
                      {item.isAvailable ? "Book Now" : "Currently Unavailable"}
                    </button>
                  </div>

                  {/* RIGHT SIDE - Room Images */}
                  <div className="lg:w-3/5 bg-gradient-to-b from-[#f8eee2] via-[#f7dece] to-white p-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                      Room Gallery
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {item.images &&
                        item.images.map((img, i) => (
                          <div
                            key={i}
                            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md"
                          >
                            <img
                              src={img}
                              alt={`${item.name} room ${i + 1}`}
                              className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                                View Room {i + 1}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Room Count */}
                    <div className="mt-6 text-center">
                      <p className="text-gray-600">
                        {item.images?.length || 0} room types available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotel;
