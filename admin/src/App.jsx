import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAdminContext } from "./context/AdminContext"; // Import the context
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import Adddish from "./pages/Adddish";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/NotFound";
import Category from "./pages/Category";
import Orders from "./pages/Orders";
import Reservations from "./pages/Reservations";
import StaffCustomers from "./pages/StaffCustomers";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Payments from "./pages/Payments";
import HotelManagement from "./pages/HotelManagement";
import Table from "./pages/Table";

// Enhanced protect route wrapper
const ProtectRoute = ({ children }) => {
  const { admin } = useAdminContext(); 
  return admin ? children : <Navigate to="/" replace />;
}

// Public route redirect to admin if already logged in
const PublicRoute = ({ children }) => {
  const { admin } = useAdminContext(); 
  return !admin ? children : <Navigate to="/admin" replace />;
}

const App = () => {
  return (
    <>
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
      <Routes>
        {/* Public Route - Login */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        >
          {/* Nested routes inside Home component */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-dish" element={<Adddish />} />
          <Route path="category" element={<Category/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="reservations" element={<Reservations/>} />
          <Route path="hotels" element={<HotelManagement/>} />
          <Route path="staff-customers" element={<StaffCustomers/>} />
          <Route path="inventory" element={<Inventory/>} />
          <Route path="add-table" element={<Table/>} />
          <Route path="analytics" element={<Analytics/>} />
          <Route path="payment" element={<Payments/>} />
          <Route path="settings" element={<Settings/>} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
};

export default App;