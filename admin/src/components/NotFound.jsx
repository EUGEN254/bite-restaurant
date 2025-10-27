import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
