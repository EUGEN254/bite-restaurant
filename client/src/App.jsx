import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import Menu from "./pages/Menu";
import Hotel from "./pages/Hotel";
import Reservation from "./pages/Reservation";
import MoreAboutUs from "./pages/MoreAboutUs";
import MyReservations from "./pages/MyReservations";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";

const App = () => {
  return (
    <div className="mx-2 sm:mx-[5%]">
      {/* for toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        closeOnClick
        draggable
        className="!z-[1000]"
      />
      {/* to appear in all pages */}

      <Navbar />

      {/* public routes */}
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
      </Routes>

      {/* footer to all pages */}
      <Footer />
    </div>
  );
};

export default App;
