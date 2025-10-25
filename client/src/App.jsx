import React, { useEffect, useState, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";

// 🟢 CRITICAL - regular imports (used immediately/frequently)
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Notification from "./pages/Notification";
import Payment from "./pages/Payment";
import LoginSignUp from "./components/LoginSignUp";

// 🟡 HEAVY/LESS USED - Lazy load these
const Hotel = React.lazy(() => import("./pages/Hotel"));
const Reservation = React.lazy(() => import("./pages/Reservation"));
const HotelCheckOut = React.lazy(() => import("./pages/HotelCheckOut"));
const MyReservations = React.lazy(() => import("./pages/MyReservations"));
const Blogs = React.lazy(() => import("./pages/Blogs"));

// 🔵 SECONDARY PAGES - Lazy load these
const AboutUs = React.lazy(() => import("./components/AboutUs"));
const Testimonials = React.lazy(() => import("./components/Testimonials"));
const MoreAboutUs = React.lazy(() => import("./pages/MoreAboutUs"));
const Contact = React.lazy(() => import("./pages/Contact"));

const App = () => {
  const location = useLocation();
  
  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Customized ToastContainer with reduced size and rounded edges */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        closeOnClick
        draggable
        className="!z-[1000]"
        toastClassName="!min-h-12 !max-w-md !rounded-xl !shadow-lg"
        bodyClassName="!text-sm !p-3"
        progressClassName="!h-1"
        style={{
          width: "auto",
          fontSize: "14px",
        }}
      />

      {/* Conditionally render Login or Main App */}
      {showLogin ? (
        <LoginSignUp setShowLogin={setShowLogin} />
      ) : (
        <div className="mx-2 sm:mx-[5%]">
          {/* Navbar - Appears on all pages */}
          <Navbar setShowLogin={setShowLogin} />

          {/* Public Routes */}
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              </div>
            }
          >
            <Routes>
              {/* Regular imports - critical pages */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />

              {/* Lazy loaded - heavy/less frequent pages */}
              <Route path="/hotels" element={<Hotel />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/checkout" element={<Payment />} />
              <Route path="/hotel-checkout" element={<HotelCheckOut />} />
              <Route path="/my-reservations" element={<MyReservations />} />
              <Route path="/blogs" element={<Blogs />} />

              {/* Lazy loaded - secondary pages */}
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/testimonial" element={<Testimonials />} />
              <Route path="/description" element={<MoreAboutUs />} />
              <Route path="/contacts" element={<Contact />} />
              <Route path="/notification" element={<Notification />} />
            </Routes>
          </Suspense>
          
          {/* Footer - Appears on all pages */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;