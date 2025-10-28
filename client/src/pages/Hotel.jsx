import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurant } from "../context/RestaurantContext";

const Hotel = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState(5000);
  const { addHotel, hotels, fetchHotels, loading } = useRestaurant();

  // Fetch hotels when component mounts
  useEffect(() => {
    fetchHotels();
  }, []);

  // Get unique cities and hotel names from real data
  const cities = useMemo(() => {
    return [...new Set(hotels.map((h) => h.county).filter(Boolean))];
  }, [hotels]);

  const hotelNames = useMemo(() => {
    return [...new Set(hotels.map((h) => h.name).filter(Boolean))];
  }, [hotels]);

  const maxPrice = useMemo(() => {
    return hotels.length > 0 ? Math.max(...hotels.map((h) => h.pricePerNight || 0)) : 5000;
  }, [hotels]);

  // Filtering logic
  const filteredHotels = useMemo(() => {
    return hotels.filter((item) => {
      const cityMatch = selectedCity ? item.county === selectedCity : true;
      const hotelMatch = selectedHotel ? item.name === selectedHotel : true;
      const priceMatch = (item.pricePerNight || 0) <= priceRange;
      return cityMatch && hotelMatch && priceMatch;
    });
  }, [selectedCity, selectedHotel, priceRange, hotels]);

  // Sorting logic
  const sortedHotels = useMemo(() => {
    return [...filteredHotels].sort((a, b) => {
      if (sortOption === "priceLowToHigh") {
        return (a.pricePerNight || 0) - (b.pricePerNight || 0);
      } else if (sortOption === "priceHighToLow") {
        return (b.pricePerNight || 0) - (a.pricePerNight || 0);
      } else {
        return 0;
      }
    });
  }, [filteredHotels, sortOption]);

  console.log(sortedHotels)

  const handleOrderHotel = (hotel) => {
    addHotel(hotel);
    navigate('/hotel-checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSelectedCity("");
    setSelectedHotel("");
    setSortOption("default");
    setPriceRange(maxPrice);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8eee2] via-[#f7dece] to-white py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8eee2] via-[#f7dece] to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Hotels & Resorts
        </h1>

        {/* Filter section */}
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

            {/* Hotel Names */}
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

            {/* Sort Filter */}
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

            {/* Price range filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: Kes {priceRange.toLocaleString()}
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
                <span>Kes {maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {sortedHotels.length} of {hotels.length} hotels
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
              onClick={resetFilters}
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
                          src={item.image || "/default-hotel-image.png"}
                          alt={item.name}
                          className="w-full h-64 object-cover rounded-2xl shadow-md"
                          onError={(e) => {
                            e.target.src = "/default-hotel-image.png";
                          }}
                        />
                      </div>

                      {/* Hotel Details */}
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {item.name}
                          </h2>
                          <p className="text-gray-600 mb-1">{item.address}, {item.county}</p>
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
                            Kes {(item.pricePerNight || 0).toLocaleString()}
                          </span>
                          <span className="text-gray-500">/ night</span>
                        </div>

                        {/* Amenities */}
                        <div>
                          <h3 className="font-semibold text-gray-700 mb-3">
                            Amenities:
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {item.amenities && item.amenities.map((amenity, idx) => (
                              <span
                                key={idx}
                                className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm border border-amber-200"
                              >
                                {amenity}
                              </span>
                            ))}
                            {(!item.amenities || item.amenities.length === 0) && (
                              <span className="text-gray-500 text-sm">No amenities listed</span>
                            )}
                          </div>
                        </div>

                        {/* Contact Info */}
                        {(item.contactEmail || item.contactPhone) && (
                          <div>
                            <h3 className="font-semibold text-gray-700 mb-2">
                              Contact:
                            </h3>
                            <div className="text-sm text-gray-600">
                              {item.contactEmail && <p>📧 {item.contactEmail}</p>}
                              {item.contactPhone && <p>📞 {item.contactPhone}</p>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Book Button */}
                    <button
                      onClick={() => {
                        if (item.isAvailable) {
                          handleOrderHotel(item);
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
                      {item.images && item.images.length > 0 ? (
                        item.images.map((img, i) => (
                          <div
                            key={i}
                            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md"
                          >
                            <img
                              src={img}
                              alt={`${item.name} room ${i + 1}`}
                              className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.target.src = "/default-room-image.png";
                              }}
                            />
                            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                                View Room {i + 1}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-8">
                          <div className="text-4xl mb-2">🛏️</div>
                          <p className="text-gray-500">No room images available</p>
                        </div>
                      )}
                    </div>

                    {/* Room Count */}
                    <div className="mt-6 text-center">
                      <p className="text-gray-600">
                        {item.images?.length || 0} room types available
                        {item.roomsAvailable && item.roomsAvailable > 1 && (
                          <span className="text-amber-600 ml-2">
                            • {item.roomsAvailable} rooms available
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Hotel Description */}
                    {item.description && (
                      <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-2">About this hotel:</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    )}
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