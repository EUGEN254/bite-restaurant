import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";

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
      </Routes>

      {/* footer to all pages */}
      <Footer />
    </div>
  );
};

export default App;
