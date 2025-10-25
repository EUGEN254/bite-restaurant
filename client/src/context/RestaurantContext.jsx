import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const RestaurantContent = createContext(null);

export const RestaurantContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currSymbol = "KES";
  const navigate = useNavigate();
  const[user,setUser] = useState(null);

  // getting user data
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/me`,{
        withCredentials:true
      });

      if(response.data.success && response.data.user){
        setUser(response.data.user)
      }else{
        setUser(null);
      }
      
    } catch (error) {
      console.error(error)
    }
    
  }


  // Cart State Management
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("restaurant_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Hotel booking management - WITH LOCALSTORAGE PERSISTENCE
  const [loading, setLoading] = useState(false);
  const [calculatedNights, setCalculatedNights] = useState(() => {
    const savedNights = localStorage.getItem("restaurant_calculatedNights");
    return savedNights ? parseInt(savedNights) : 0;
  });
  
  const [hotel, setHotel] = useState(() => {
    const savedHotel = localStorage.getItem("restaurant_hotel");
    return savedHotel ? JSON.parse(savedHotel) : null;
  });

  const [bookingDetails, setBookingDetails] = useState(() => {
    const savedBooking = localStorage.getItem("restaurant_bookingDetails");
    return savedBooking ? JSON.parse(savedBooking) : {
      checkIn: "",
      checkOut: "",
      guests: 1,
      rooms: 1,
      specialRequests: "",
    };
  });

  // Reservation management - NEW
  const [reservation, setReservation] = useState(() => {
    const savedReservation = localStorage.getItem("restaurant_reservation");
    return savedReservation ? JSON.parse(savedReservation) : null;
  });

  const [reservationDetails, setReservationDetails] = useState(() => {
    const savedReservationDetails = localStorage.getItem("restaurant_reservationDetails");
    return savedReservationDetails ? JSON.parse(savedReservationDetails) : {
      date: "",
      time: "",
      guests: 2,
      requests: "",
    };
  });

  // Save all data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("restaurant_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (hotel) {
      localStorage.setItem("restaurant_hotel", JSON.stringify(hotel));
    } else {
      localStorage.removeItem("restaurant_hotel");
    }
  }, [hotel]);

  useEffect(() => {
    localStorage.setItem("restaurant_bookingDetails", JSON.stringify(bookingDetails));
  }, [bookingDetails]);

  useEffect(() => {
    localStorage.setItem("restaurant_calculatedNights", calculatedNights.toString());
  }, [calculatedNights]);

  useEffect(() => {
    if (reservation) {
      localStorage.setItem("restaurant_reservation", JSON.stringify(reservation));
    } else {
      localStorage.removeItem("restaurant_reservation");
    }
  }, [reservation]);

  useEffect(() => {
    localStorage.setItem("restaurant_reservationDetails", JSON.stringify(reservationDetails));
  }, [reservationDetails]);

  // Add item to cart
  const addToCart = (foodItem) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item._id === foodItem._id
      );

      if (existingItemIndex >= 0) {
        // Item already exists - increase quantity
        return prev.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      // Item doesn't exist - add new item with quantity 1
      return [...prev, { ...foodItem, quantity: 1 }];
    });
  };

  // Update quantity of specific item
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + item.price * quantity;
    }, 0);
  };

  // Calculate total items count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  /*--------------------
        HOTEL BOOKING
  ---------------------------------*/
  // Set hotel for booking
  const addHotel = (hotel) => {
    setHotel(hotel);
  };

  // Clear hotel booking data
  const clearHotelBooking = () => {
    setHotel(null);
    setBookingDetails({
      checkIn: "",
      checkOut: "",
      guests: 1,
      rooms: 1,
      specialRequests: "",
    });
    setCalculatedNights(0);
  };

  // Calculate total hotel price
  const calculateTotalHotel = () => {
    if (!hotel) return 0;

    const nights = calculatedNights > 0 ? calculatedNights : 1;
    return hotel.pricePerNight * nights * bookingDetails.rooms;
  };

  // Handle input changes for hotel
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle number input for guests with validation
  const handleGuestsChange = (e) => {
    const value = e.target.value;
    setBookingDetails((prev) => ({
      ...prev,
      guests: value,
    }));
  };

  // Validate guests on blur
  const handleGuestsBlur = (e) => {
    let value = parseInt(e.target.value);
    
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 20) {
      value = 20;
    }

    setBookingDetails((prev) => ({
      ...prev,
      guests: value,
    }));
  };

  // Handle number input for rooms
  const handleRoomsChange = (e) => {
    const value = e.target.value;
    setBookingDetails((prev) => ({
      ...prev,
      rooms: value,
    }));
  };

  // Validate rooms on blur
  const handleRoomsBlur = (e) => {
    let value = parseInt(e.target.value);
    
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }

    setBookingDetails((prev) => ({
      ...prev,
      rooms: value,
    }));
  };

  // Update calculated nights
  const updateCalculatedNights = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      setCalculatedNights(nights > 0 ? nights : 0);
    } else {
      setCalculatedNights(0);
    }
  };

  // Handle hotel booking confirmation
  const handleConfirmBooking = () => {
    if (!hotel) {
      alert("No hotel selected");
      return;
    }

    if (!bookingDetails.checkIn || !bookingDetails.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    if (calculatedNights <= 0) {
      alert("Check-out date must be after check-in date");
      return;
    }

    const bookingSummary = {
      type: "hotel",
      hotel: hotel,
      bookingDetails: bookingDetails,
      total: calculateTotalHotel(),
      bookingId: "H" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      bookedAt: new Date().toISOString(),
      nights: calculatedNights,
    };

    navigate("/checkout", {
      state: {
        orderDetails: {
          items: [{
            _id: hotel._id,
            name: hotel.name,
            image: hotel.image,
            price: calculateTotalHotel(),
            quantity: 1,
            type: "hotel_booking",
            bookingDetails: bookingDetails,
          }],
          total: calculateTotalHotel(),
          itemCount: 1,
          timestamp: new Date().toISOString(),
          bookingSummary: bookingSummary,
        },
      },
    });
  };

  /*--------------------
        RESERVATION MANAGEMENT - NEW
  ---------------------------------*/

  // Set table for reservation
  const addReservation = (table) => {
    setReservation({ ...table, currentSeats: table.currentSeats || 2 });
  };

  // Clear reservation data
  const clearReservation = () => {
    setReservation(null);
    setReservationDetails({
      date: "",
      time: "",
      guests: 2,
      requests: "",
    });
  };

  // Handle reservation input changes
  const handleReservationInputChange = (e) => {
    const { name, value } = e.target;
    setReservationDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle guest count change for reservation
  const handleReservationGuestsChange = (value) => {
    setReservationDetails((prev) => ({
      ...prev,
      guests: value,
    }));
  };

  // Adjust seats for selected table
  const adjustReservationSeats = (adjustment) => {
    if (!reservation) return;

    setReservation((prev) => {
      if (!prev) return prev;

      const newSeats = prev.currentSeats + adjustment;
      if (newSeats >= 1 && newSeats <= prev.maxSeats) {
        return { ...prev, currentSeats: newSeats };
      }
      return prev;
    });
  };

  // Calculate reservation total
  const calculateReservationTotal = () => {
    if (!reservation) return 0;
    const subtotal = reservation.price;
    const serviceFee = 150;
    const tax = subtotal * 0.16;
    return subtotal + serviceFee + tax;
  };

  // Handle reservation submission
  const handleConfirmReservation = () => {
    if (!reservation || !reservationDetails.date || !reservationDetails.time) {
      alert("Please fill in all required fields");
      return;
    }

    const reservationSummary = {
      type: 'reservation',
      table: reservation,
      reservationDetails: {
        date: reservationDetails.date,
        time: reservationDetails.time,
        guests: reservationDetails.guests,
        requests: reservationDetails.requests,
        seats: reservation.currentSeats
      },
      total: calculateReservationTotal(),
      reservationId: 'R' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      reservedAt: new Date().toISOString()
    };

    navigate('/checkout', { 
      state: { 
        orderDetails: {
          items: [{
            _id: reservation.id,
            name: `Table Reservation - ${reservation.name}`,
            image: reservation.image,
            price: calculateReservationTotal(),
            quantity: 1,
            type: 'table_reservation',
            reservationDetails: reservationSummary.reservationDetails
          }],
          total: calculateReservationTotal(),
          itemCount: 1,
          timestamp: new Date().toISOString(),
          reservationSummary: reservationSummary
        }
      } 
    });
  };

  // Handle go back for hotel
  const handleGoBack = () => {
    navigate("/hotels");
  };

  // Handle go back for reservation
  const handleReservationGoBack = () => {
    navigate(-1);
  };

  // Get tomorrow's date for min check-out date
  const getMinCheckoutDate = () => {
    if (!bookingDetails.checkIn) return new Date().toISOString().split("T")[0];

    const nextDay = new Date(bookingDetails.checkIn);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
  };

  // Update calculated nights when booking details change
  useEffect(() => {
    updateCalculatedNights(bookingDetails.checkIn, bookingDetails.checkOut);
  }, [bookingDetails.checkIn, bookingDetails.checkOut]);


  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // All values that will be available to components
  const value = {
    backendUrl,
    currSymbol,
    fetchCurrentUser,
    user,
    setUser,
    
    // Cart functionality
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateTotal,
    getTotalItems,

    // Hotel management
    hotel,
    setHotel,
    addHotel,
    clearHotelBooking,
    handleConfirmBooking,
    handleRoomsChange,
    calculateTotalHotel,
    handleGuestsChange,
    handleInputChange,
    bookingDetails,
    handleGoBack,
    getMinCheckoutDate,
    calculatedNights,
    handleGuestsBlur,
    setCalculatedNights,
    handleRoomsBlur,

    // Reservation management 
    reservation,
    setReservation,
    addReservation,
    clearReservation,
    reservationDetails,
    setReservationDetails,
    handleReservationInputChange,
    handleReservationGuestsChange,
    adjustReservationSeats,
    calculateReservationTotal,
    handleConfirmReservation,
    handleReservationGoBack,
  };

  return (
    <RestaurantContent.Provider value={value}>
      {props.children}
    </RestaurantContent.Provider>
  );
};

// Custom hook to use the context
export const useRestaurant = () => {
  const context = useContext(RestaurantContent);
  if (!context) {
    throw new Error(
      "useRestaurant must be used within a RestaurantContextProvider"
    );
  }
  return context;
};