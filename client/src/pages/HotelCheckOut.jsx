import React from "react";
import { useRestaurant } from "../context/RestaurantContext";

const HotelCheckOut = () => {
  const {
    hotel,
    bookingDetails,
    currSymbol,
    handleConfirmBooking,
    handleRoomsChange,
    calculateTotalHotel,
    handleGuestsChange,
    handleInputChange,
    handleGoBack,
    getMinCheckoutDate,
    calculatedNights,
    handleGuestsBlur,
    handleRoomsBlur,
  } = useRestaurant();

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏨</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Hotel Selected
          </h2>
          <p className="text-gray-600 mb-6">Please select a hotel to book</p>
          <button
            onClick={handleGoBack}
            className="bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
          >
            Browse Hotels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Complete Your Booking
          </h1>
          <p className="text-gray-600">
            Review your hotel details and complete the booking process
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hotel Summary */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full md:w-48 h-48 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {hotel.name}
                </h2>
                <p className="text-gray-600 mb-3">{hotel.address}</p>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-bold text-amber-600">
                    {currSymbol} {hotel.pricePerNight}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      / night
                    </span>
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      hotel.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {hotel.isAvailable ? "Available" : "Not Available"}
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities?.slice(0, 5).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm border border-amber-200"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities?.length > 5 && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      +{hotel.amenities.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Booking Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Check-in Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={bookingDetails.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={bookingDetails.checkOut}
                  onChange={handleInputChange}
                  min={getMinCheckoutDate()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Number of Guests */}
              {/* Number of Guests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="guests"
                    value={bookingDetails.guests}
                    onChange={handleGuestsChange}
                    onBlur={handleGuestsBlur} // Add this
                    min="1"
                    max="20"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {bookingDetails.guests === 1 ? "Guest" : "Guests"}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Min: 1, Max: 20 guests
                </p>
              </div>

              {/* Number of Rooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Rooms *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="rooms"
                    value={bookingDetails.rooms}
                    onChange={handleRoomsChange}
                    onBlur={handleRoomsBlur} // Add this
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {bookingDetails.rooms === 1 ? "Room" : "Rooms"}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Min: 1, Max: 10 rooms
                </p>
              </div>

              {/* Nights Display */}
              <div className="md:col-span-2">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-amber-800">
                      Stay Duration:
                    </span>
                    <span className="text-lg font-bold text-amber-600">
                      {calculatedNights > 0
                        ? `${calculatedNights} night${
                            calculatedNights === 1 ? "" : "s"
                          }`
                        : "Select dates"}
                    </span>
                  </div>
                  {calculatedNights > 0 && (
                    <p className="text-sm text-amber-700 mt-2">
                      From{" "}
                      {new Date(bookingDetails.checkIn).toLocaleDateString()} to{" "}
                      {new Date(bookingDetails.checkOut).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Special Requests */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={bookingDetails.specialRequests}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any special requirements or requests..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">
                Total Amount:
              </span>
              <span className="text-2xl font-bold text-amber-600">
                {currSymbol} {calculateTotalHotel()}
              </span>
            </div>

            {/* Price Breakdown */}
            {calculatedNights > 0 && (
              <div className="text-sm text-gray-600 mb-4 space-y-1">
                <p>
                  <strong>Price Breakdown:</strong>
                </p>
                <p>
                  {bookingDetails.rooms} room
                  {bookingDetails.rooms === 1 ? "" : "s"} × {currSymbol}{" "}
                  {hotel.pricePerNight} × {calculatedNights} night
                  {calculatedNights === 1 ? "" : "s"}
                </p>
                <p className="text-green-600 font-medium">
                  = {currSymbol} {calculateTotalHotel()}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleGoBack}
                className="flex-1 py-3 px-6 border border-amber-500 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
              >
                Back to Hotel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={
                  !hotel.isAvailable ||
                  !bookingDetails.checkIn ||
                  !bookingDetails.checkOut ||
                  calculatedNights <= 0
                }
                className="flex-1 py-3 px-6 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCheckOut;
