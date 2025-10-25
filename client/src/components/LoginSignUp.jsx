import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { MdRestaurantMenu } from 'react-icons/md';
import { toast } from "react-toastify";
import axios from "axios";
import { useRestaurant } from '../context/RestaurantContext';

const LoginSignUp = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { backendUrl, fetchCurrentUser, setUser } = useRestaurant();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Clear form when switching between login/signup
  useEffect(() => {
    setFormData({
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }, [isLogin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const endpoint = isLogin ? "/api/user/login" : "/api/user/register";
      const payload = isLogin
        ? { 
            email: formData.email, 
            password: formData.password,
            rememberMe: rememberMe
          }
        : { 
            fullname: formData.fullname, 
            email: formData.email, 
            password: formData.password 
          };
  
      const response = await axios.post(`${backendUrl}${endpoint}`, payload, {
        withCredentials: true,
      });
  
      if (response.data.success) {
        toast.success(response.data.message);
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          await fetchCurrentUser();
        }
        
        setShowLogin(false);
        navigate("/");

        // Clear form
        setFormData({
          fullname: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.error("Auth Error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100" />

      {/* Main Card */}
      <div className="relative w-full max-w-sm bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
        
        {/* Close Button */}
        <button
          onClick={() => !isLoading && setShowLogin(false)}
          disabled={isLoading}
          className="absolute -top-2 -right-2 z-20 bg-white rounded-full p-2 shadow-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            onClick={() => !isLoading && setIsLogin(true)}
            disabled={isLoading}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
              isLogin ? 'bg-white text-amber-600 shadow' : 'text-gray-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Login
          </button>
          <button
            onClick={() => !isLoading && setIsLogin(false)}
            disabled={isLoading}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
              !isLogin ? 'bg-white text-amber-600 shadow' : 'text-gray-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
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
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                required={!isLogin}
                disabled={isLoading}
                className="w-full pl-10 pr-3 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
              disabled={isLoading}
              className="w-full pl-10 pr-3 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
              disabled={isLoading}
              minLength="6"
              className="w-full pl-10 pr-10 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
            <button
              type="button"
              onClick={() => !isLoading && setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isLoading}
                minLength="6"
                className="w-full pl-10 pr-3 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
          )}

          {isLogin && (
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-500 disabled:opacity-50 cursor-pointer" 
                  disabled={isLoading}
                />
                <span className="text-gray-600 select-none">Remember me</span>
              </label>
              <button 
                type="button" 
                className="text-amber-600 hover:text-amber-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => !isLoading && setIsLogin(!isLogin)}
              disabled={isLoading}
              className="text-amber-600 hover:text-amber-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Processing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;