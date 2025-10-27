import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAdminContext } from "./context/AdminContext"; // Import the context
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import Adddish from "./pages/Adddish";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";

// Enhanced protect route wrapper
const ProtectRoute = ({ children }) => {
  const { admin } = useAdminContext(); // Get admin state from context
  
  return admin ? children : <Navigate to="/" replace />;
}

// Public route redirect to admin if already logged in
const PublicRoute = ({ children }) => {
  const { admin } = useAdminContext(); // Get admin state from context
  
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
          path="/admin/*"
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
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;