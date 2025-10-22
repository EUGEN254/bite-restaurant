import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { MdRestaurantMenu } from 'react-icons/md';
import { toast } from 'react-toastify';

const LoginSignUp = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    console.log(isLogin ? 'Login:' : 'Signup:', formData);
    toast.success(isLogin ? 'Login successful!' : 'Signup successful!');
    setShowLogin(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100" />

      {/* Main Card */}
      <div className="relative w-full max-w-sm bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
        
        {/* Close Button - Inside form top right */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute -top-2 -right-2 z-20 bg-white rounded-full p-2 shadow-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <FaTimes className="text-lg" />
        </button>
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-xl inline-block mb-3">
            <MdRestaurantMenu className="text-xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-amber-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
              isLogin ? 'bg-white text-amber-600 shadow' : 'text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
              !isLogin ? 'bg-white text-amber-600 shadow' : 'text-gray-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required={!isLogin}
                className="w-full pl-10 pr-3 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
              />
            </div>
          )}

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-3 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required={!isLogin}
                className="w-full pl-10 pr-3 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
              />
            </div>
          )}

          {isLogin && (
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-amber-600 hover:text-amber-700 font-medium">
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;