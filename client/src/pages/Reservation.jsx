import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdPeople,
  MdEvent,
  MdAccessTime,
  MdLocationOn,
  MdArrowBack,
} from "react-icons/md";
import { FaChair, FaMinus, FaPlus, FaCheck } from "react-icons/fa";
import { assets, tables } from "../assets/assets";
import { useRestaurant } from "../context/RestaurantContext"; // ADD THIS

const Reservation = () => {
  const navigate = useNavigate();
  const { 
    reservation,
    reservationDetails,
    addReservation,
    handleReservationInputChange,
    handleReservationGuestsChange,
    adjustReservationSeats,
    calculateReservationTotal,
    handleConfirmReservation,
    handleReservationGoBack
  } = useRestaurant(); // USE CONTEXT

  // Filter available tables
  const availableTables = tables.filter((table) => table.available);

  // Render seat icons
  const renderSeats = (table, isSelected = false) => {
    const seats = [];
    const seatsToShow = isSelected ? table.currentSeats : table.currentSeats;
    
    for (let i = 0; i < seatsToShow; i++) {
      seats.push(
        <div
          key={i}
          className={`p-1 rounded-full transition-all duration-300 ${
            isSelected
              ? "bg-amber-500 text-white scale-110"
              : "bg-amber-100 text-amber-600"
          }`}
        >
          <FaChair className="text-sm" />
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleReservationGoBack}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors"
          >
            <MdArrowBack className="text-xl" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center">
            Reserve Your Table
          </h1>
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Table Selection */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MdEvent className="text-amber-500" />
              Select Your Table
            </h2>

            {/* Table Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableTables.map((table) => (
                <div
                  key={table.id}
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    reservation?.id === table.id
                      ? "border-amber-500 bg-amber-50 shadow-lg"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
                  onClick={() => addReservation(table)}
                >
                  {/* Table content remains the same */}
                  <div className="relative mb-3">
                    <img
                      src={table.image}
                      alt={table.name}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {table.type}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800">
                      {table.name}
                    </h3>
                    <p className="text-sm text-gray-600">{table.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {renderSeats(table, reservation?.id === table.id)}
                      </div>
                      <span className="text-sm text-gray-500">
                        Max: {table.maxSeats}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-amber-600">
                        Kes {table.price}
                      </span>
                      {reservation?.id === table.id && (
                        <FaCheck className="text-green-500 text-xl" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Reservation Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MdAccessTime className="text-amber-500" />
              Reservation Details
            </h2>

            <form onSubmit={(e) => { e.preventDefault(); handleConfirmReservation(); }} className="space-y-6">
              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reservation Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={reservationDetails.date}
                    onChange={handleReservationInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reservation Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={reservationDetails.time}
                    onChange={handleReservationInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Selected Table Controls */}
              {reservation && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Adjust Seats for {reservation.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => adjustReservationSeats(-1)}
                        disabled={reservation.currentSeats <= 1}
                        className="p-2 rounded-full bg-white border border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-100 transition-colors"
                      >
                        <FaMinus className="text-amber-600" />
                      </button>

                      <div className="flex items-center gap-2">
                        {renderSeats(reservation, true)}
                      </div>

                      <button
                        type="button"
                        onClick={() => adjustReservationSeats(1)}
                        disabled={reservation.currentSeats >= reservation.maxSeats}
                        className="p-2 rounded-full bg-white border border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-100 transition-colors"
                      >
                        <FaPlus className="text-amber-600" />
                      </button>
                    </div>

                    <span className="text-sm text-gray-600">
                      {reservation.currentSeats} of {reservation.maxSeats} seats
                    </span>
                  </div>
                </div>
              )}

              {/* Guest Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MdPeople className="text-amber-500" />
                  Number of Guests
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleReservationGuestsChange(Math.max(1, reservationDetails.guests - 1))}
                    className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">
                    {reservationDetails.guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleReservationGuestsChange(reservationDetails.guests + 1)}
                    className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                  >
                    <FaPlus />
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    {reservation
                      ? `(Table seats: ${reservation.currentSeats})`
                      : "Select a table first"}
                  </span>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  name="requests"
                  value={reservationDetails.requests}
                  onChange={handleReservationInputChange}
                  rows="4"
                  placeholder="Any special requirements, allergies, celebrations, or accessibility needs..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                />
              </div>

              {/* Price Summary */}
              {reservation && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Price Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Table Reservation Fee:</span>
                      <span>Kes {reservation.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee:</span>
                      <span>Kes 150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (16%):</span>
                      <span>Kes {(reservation.price * 0.16).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-amber-200 font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-amber-600">Kes {calculateReservationTotal()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!reservation || !reservationDetails.date || !reservationDetails.time}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;