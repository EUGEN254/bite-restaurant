import React, { useState } from "react";
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

const Reservation = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState("");

  // Filter available tables
  const availableTables = tables.filter((table) => table.available);

  // Handle seat adjustment
  const adjustSeats = (tableId, adjustment) => {
    setSelectedTable((prev) => {
      if (!prev || prev.id !== tableId) return prev;

      const newSeats = prev.currentSeats + adjustment;
      if (newSeats >= 1 && newSeats <= prev.maxSeats) {
        return { ...prev, currentSeats: newSeats };
      }
      return prev;
    });
  };

  // Render seat icons
  const renderSeats = (table, isSelected = false) => {
    const seats = [];
    for (let i = 0; i < table.currentSeats; i++) {
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

  // Handle reservation submission
  const handleReservation = (e) => {
    e.preventDefault();
    if (!selectedTable || !reservationDate || !reservationTime) {
      alert("Please fill in all required fields");
      return;
    }

    // Here you would typically send the reservation to your backend
    console.log("Reservation Details:", {
      table: selectedTable,
      date: reservationDate,
      time: reservationTime,
      guests: guestCount,
      requests: specialRequests,
    });

    alert("Reservation confirmed! We look forward to serving you.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors"
          >
            <MdArrowBack className="text-xl" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center">
            Reserve Your Table
          </h1>
          <div className="w-20"></div> {/* Spacer for balance */}
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
                    selectedTable?.id === table.id
                      ? "border-amber-500 bg-amber-50 shadow-lg"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
                  onClick={() => setSelectedTable({ ...table })}
                >
                  {/* Table Image */}
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

                  {/* Table Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800">
                      {table.name}
                    </h3>
                    <p className="text-sm text-gray-600">{table.description}</p>

                    {/* Seat Configuration */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {renderSeats(table, selectedTable?.id === table.id)}
                      </div>
                      <span className="text-sm text-gray-500">
                        Max: {table.maxSeats}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-amber-600">
                        Kes {table.price}
                      </span>
                      {selectedTable?.id === table.id && (
                        <FaCheck className="text-green-500 text-xl" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Table Controls */}
            {selectedTable && (
              <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Adjust Seats for {selectedTable.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => adjustSeats(selectedTable.id, -1)}
                      disabled={selectedTable.currentSeats <= 1}
                      className="p-2 rounded-full bg-white border border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-100 transition-colors"
                    >
                      <FaMinus className="text-amber-600" />
                    </button>

                    <div className="flex items-center gap-2">
                      {renderSeats(selectedTable, true)}
                    </div>

                    <button
                      onClick={() => adjustSeats(selectedTable.id, 1)}
                      disabled={
                        selectedTable.currentSeats >= selectedTable.maxSeats
                      }
                      className="p-2 rounded-full bg-white border border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-100 transition-colors"
                    >
                      <FaPlus className="text-amber-600" />
                    </button>
                  </div>

                  <span className="text-sm text-gray-600">
                    {selectedTable.currentSeats} of {selectedTable.maxSeats}{" "}
                    seats
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Reservation Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MdAccessTime className="text-amber-500" />
              Reservation Details
            </h2>

            <form onSubmit={handleReservation} className="space-y-6">
              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reservation Date *
                  </label>
                  <input
                    type="date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
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
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MdPeople className="text-amber-500" />
                  Number of Guests
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setGuestCount((prev) => Math.max(1, prev - 1))
                    }
                    className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestCount((prev) => prev + 1)}
                    className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                  >
                    <FaPlus />
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    {selectedTable
                      ? `(Table seats: ${selectedTable.currentSeats})`
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
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows="4"
                  placeholder="Any special requirements, allergies, or celebrations..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                />
              </div>

              {/* Selected Table Summary */}
              {selectedTable && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Your Selection
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">{selectedTable.name}</p>
                      <p className="text-sm text-gray-500">
                        {selectedTable.currentSeats} seats configured
                      </p>
                    </div>
                    <span className="text-lg font-bold text-amber-600">
                      Kes {selectedTable.price}
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!selectedTable}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
