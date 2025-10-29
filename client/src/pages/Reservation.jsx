import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdPeople, MdEvent, MdAccessTime, MdArrowBack } from "react-icons/md";
import { FaChair, FaMinus, FaPlus, FaCheck, FaSearch } from "react-icons/fa";
import axios from "axios";
import { useRestaurant } from "../context/RestaurantContext";

const Reservation = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [seatsFilter, setSeatsFilter] = useState("");

  const {
    reservation,
    reservationDetails,
    addReservation,
    handleReservationInputChange,
    handleReservationGuestsChange,
    adjustReservationSeats,
    calculateReservationTotal,
    handleConfirmReservation,
    handleReservationGoBack,
    backendUrl,
  } = useRestaurant();

  // Fetch all tables
  const fetchTables = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tables`, {
        withCredentials: true,
      });

      if (!response.data.success) throw new Error(response.data.message);
      setTables(response.data.tables || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Fix: Check if a table is selected
  const isTableSelected = (table) => {
    const tableId = table._id || table.id;
    const reservationId = reservation?._id || reservation?.id;
    return tableId === reservationId;
  };

  // FIXED: Improved seat adjustment with proper validation and debugging
  const handleSeatDecrease = () => {
    if (reservation && reservation.currentSeats > 1) {
      adjustReservationSeats(-1);
    }
  };

  const handleSeatIncrease = () => {
    if (reservation && reservation.currentSeats < reservation.maxSeats) {
      adjustReservationSeats(1);
    }
  };

  // FIXED: Progress bar calculation to prevent overflow
  const calculateProgressWidth = () => {
    if (!reservation) return 0;

    const percentage = (reservation.currentSeats / reservation.maxSeats) * 100;
    // Cap at 100% to prevent overflow
    return Math.min(percentage, 100);
  };

  // Optimized seat rendering for many seats
  const renderCompactSeats = (table, isSelected = false) => {
    const seats = [];
    const maxVisibleSeats = 6;

    const seatsToShow = Math.min(table.currentSeats, maxVisibleSeats);

    for (let i = 0; i < seatsToShow; i++) {
      seats.push(
        <div
          key={i}
          className={`p-1 rounded-full transition-all duration-200 ${
            isSelected
              ? "bg-amber-500 text-white"
              : "bg-amber-100 text-amber-600"
          }`}
        >
          <FaChair className="text-xs" />
        </div>
      );
    }

    if (table.currentSeats > maxVisibleSeats) {
      seats.push(
        <div
          key="count"
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isSelected
              ? "bg-amber-600 text-white"
              : "bg-amber-200 text-amber-700"
          }`}
        >
          +{table.currentSeats - maxVisibleSeats}
        </div>
      );
    }

    return seats;
  };

  // FIXED: Better compact renderer for adjustment section
  const renderAdjustmentSeats = (table) => {
    // For very large numbers, show a more compact representation
    if (table.currentSeats > 20) {
      return (
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-1">
            {Array.from({ length: Math.min(2, table.currentSeats) }).map(
              (_, i) => (
                <div
                  key={i}
                  className="p-1 rounded-full bg-amber-500 text-white"
                >
                  <FaChair className="text-xs" />
                </div>
              )
            )}
          </div>
          <div className="text-sm font-semibold text-amber-700">
            {table.currentSeats} seats selected
          </div>
        </div>
      );
    } else if (table.currentSeats > 8) {
      return (
        <div className="flex items-center gap-1 justify-center flex-wrap">
          {Array.from({ length: Math.min(4, table.currentSeats) }).map(
            (_, i) => (
              <div key={i} className="p-1 rounded-full bg-amber-500 text-white">
                <FaChair className="text-xs" />
              </div>
            )
          )}
          <div className="px-2 py-1 rounded-full bg-amber-600 text-white text-xs font-semibold">
            +{table.currentSeats - 4}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 justify-center flex-wrap">
          {Array.from({ length: table.currentSeats }).map((_, i) => (
            <div key={i} className="p-1 rounded-full bg-amber-500 text-white">
              <FaChair className="text-xs" />
            </div>
          ))}
        </div>
      );
    }
  };

  // Filter available tables with search and filters
  const availableTables = tables.filter((table) => {
    if (!table.available) return false;

    const matchesSearch =
      table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "" || table.type === typeFilter;

    let matchesSeats = true;
    if (seatsFilter === "small" && table.maxSeats > 2) matchesSeats = false;
    if (seatsFilter === "medium" && (table.maxSeats < 3 || table.maxSeats > 6))
      matchesSeats = false;
    if (seatsFilter === "large" && table.maxSeats < 6) matchesSeats = false;

    return matchesSearch && matchesType && matchesSeats;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setSeatsFilter("");
  };

  // Handle table selection
  const handleTableSelect = (table) => {
    addReservation(table);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleReservationGoBack}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors px-4 py-2 rounded-lg hover:bg-amber-50"
          >
            <MdArrowBack className="text-xl" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center">
            Reserve Your Table
          </h1>
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Side - Table Selection */}
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MdEvent className="text-amber-500" />
                Select Your Table
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {availableTables.length} tables available
                </span>
              </h2>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 w-full sm:w-48"
                  />
                </div>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Types</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="private">Private</option>
                  <option value="bar">Bar</option>
                </select>

                <select
                  value={seatsFilter}
                  onChange={(e) => setSeatsFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Sizes</option>
                  <option value="small">Small (1-2)</option>
                  <option value="medium">Medium (3-6)</option>
                  <option value="large">Large (6+)</option>
                </select>

                {(searchTerm || typeFilter || seatsFilter) && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Table Grid */}
            {availableTables.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No tables found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || typeFilter || seatsFilter
                    ? "Try adjusting your search or filters"
                    : "All tables are currently occupied"}
                </p>
                {(searchTerm || typeFilter || seatsFilter) && (
                  <button
                    onClick={clearFilters}
                    className="bg-amber-500 text-white px-6 py-2 rounded-xl hover:bg-amber-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableTables.map((table) => {
                  const isSelected = isTableSelected(table);
                  return (
                    <div
                      key={table._id || table.id}
                      className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 min-h-[280px] flex flex-col ${
                        isSelected
                          ? "border-amber-500 bg-amber-50 shadow-lg"
                          : "border-gray-200 hover:border-amber-300 bg-white"
                      }`}
                      onClick={() => handleTableSelect(table)}
                    >
                      {/* Table Image */}
                      <div className="relative mb-3 flex-shrink-0">
                        <img
                          src={table.image}
                          alt={table.name}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold capitalize">
                          {table.type}
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white p-1 rounded-full">
                            <FaCheck className="text-xs" />
                          </div>
                        )}
                      </div>

                      {/* Table Info */}
                      <div className="flex-grow space-y-2">
                        <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                          {table.name}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {table.description}
                        </p>

                        {/* Seats */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 flex-wrap">
                            {renderCompactSeats(table, isSelected)}
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            Max: {table.maxSeats}
                          </span>
                        </div>

                        {/* Price and Status */}
                        <div className="flex items-center justify-between pt-2 mt-auto">
                          <span className="text-lg font-bold text-amber-600">
                            Kes {table.price}
                          </span>
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              table.available
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {table.available ? "Available" : "Occupied"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Side - Reservation Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MdAccessTime className="text-amber-500" />
              Reservation Details
            </h2>

            {reservation ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleConfirmReservation();
                }}
                className="space-y-6"
              >
                {/* Selected Table Info */}
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Selected Table
                  </h3>
                  <div className="flex items-center gap-3">
                    <img
                      src={reservation.image}
                      alt={reservation.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {reservation.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Kes {reservation.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 gap-4">
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

                {/* FIXED: Selected Table Controls */}
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">
                      Adjust Seats for {reservation.name}
                    </h3>
                    <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full border">
                      {reservation.currentSeats} of {reservation.maxSeats} seats
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    {/* Minus Button */}
                    <button
                      type="button"
                      onClick={handleSeatDecrease}
                      disabled={reservation.currentSeats <= 1}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 flex-shrink-0 ${
                        reservation.currentSeats <= 1
                          ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "border-amber-300 bg-white text-amber-600 hover:bg-amber-50 hover:border-amber-400 hover:scale-105"
                      }`}
                    >
                      <FaMinus className="text-lg" />
                    </button>

                    {/* Seats Display - Improved compact layout */}
                    <div className="flex-grow flex justify-center min-h-[40px]">
                      <div className="flex items-center justify-center">
                        {renderAdjustmentSeats(reservation)}
                      </div>
                    </div>

                    {/* Plus Button */}
                    <button
                      type="button"
                      onClick={handleSeatIncrease}
                      disabled={
                        reservation.currentSeats >= reservation.maxSeats
                      }
                      className={`p-3 rounded-xl border-2 transition-all duration-200 flex-shrink-0 ${
                        reservation.currentSeats >= reservation.maxSeats
                          ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "border-amber-300 bg-white text-amber-600 hover:bg-amber-50 hover:border-amber-400 hover:scale-105"
                      }`}
                    >
                      <FaPlus className="text-lg" />
                    </button>
                  </div>

                  {/* FIXED: Progress Bar with capped width */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${calculateProgressWidth()}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 seat</span>
                      <span>{reservation.maxSeats} seats max</span>
                    </div>
                  </div>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MdPeople className="text-amber-500" />
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleReservationGuestsChange(
                          Math.max(1, reservationDetails.guests - 1)
                        )
                      }
                      className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {reservationDetails.guests}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleReservationGuestsChange(
                          reservationDetails.guests + 1
                        )
                      }
                      className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                    >
                      <FaPlus />
                    </button>
                    <span className="text-sm text-gray-500 ml-2">
                      (Table seats: {reservation.currentSeats})
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
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Price Summary
                  </h3>
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
                      <span className="text-amber-600">
                        Kes {calculateReservationTotal()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    !reservationDetails.date || !reservationDetails.time
                  }
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Proceed to Payment
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="text-amber-400 text-6xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No Table Selected
                </h3>
                <p className="text-gray-500">
                  Please select a table from the list to continue with your
                  reservation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
