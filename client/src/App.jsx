import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import Menu from "./pages/Menu";
import Hotel from "./pages/Hotel";
import Reservation from "./pages/Reservation";
import MoreAboutUs from "./pages/MoreAboutUs";
import MyReservations from "./pages/MyReservations";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import LoginSignUp from "./components/LoginSignUp";
import Notification from "./pages/Notification";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import HotelCheckOut from "./pages/HotelCheckOut";

const App = () => {

  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);


  const [showLogin, setShowLogin] = useState(false);

  // If showLogin is true, ONLY show the LoginSignUp component
  if (showLogin) {
    return <LoginSignUp setShowLogin={setShowLogin} />;
  }

  // If showLogin is false, show the normal app layout
  return (
    <div className="mx-2 sm:mx-[5%]">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        closeOnClick
        draggable
        className="!z-[1000]"
      />

      {/* Navbar - Appears on all pages */}
      <Navbar setShowLogin={setShowLogin} />

      {/* Public Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/testimonial" element={<Testimonials />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/description" element={<MoreAboutUs />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Payment />} />
        <Route path="/hotel-checkout" element={<HotelCheckOut />} />
      </Routes>

      {/* Footer - Appears on all pages */}
      <Footer />
    </div>
  );
};

export default App;