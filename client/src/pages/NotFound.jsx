import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;