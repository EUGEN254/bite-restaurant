import React, { useState } from 'react';
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime, MdSend } from 'react-icons/md';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              {/* Address */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-amber-100 p-3 rounded-2xl">
                  <MdLocationOn className="text-2xl text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Our Location</h3>
                  <p className="text-gray-600">
                    123 Gourmet Street<br />
                    Nairobi, Kenya 00100
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-amber-100 p-3 rounded-2xl">
                  <MdPhone className="text-2xl text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Phone Number</h3>
                  <p className="text-gray-600">+254 712 345 678</p>
                  <p className="text-gray-600">+254 734 567 890</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-amber-100 p-3 rounded-2xl">
                  <MdEmail className="text-2xl text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email Address</h3>
                  <p className="text-gray-600">info@gourmetrestaurant.com</p>
                  <p className="text-gray-600">reservations@gourmetrestaurant.com</p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-2xl">
                  <MdAccessTime className="text-2xl text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Opening Hours</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Friday: 7:00 AM - 11:00 PM</p>
                    <p>Saturday - Sunday: 8:00 AM - 12:00 AM</p>
                    <p className="text-amber-600 font-medium">24/7 Reservations Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-amber-100 p-3 rounded-2xl text-amber-600 hover:bg-amber-200 transition-colors">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="bg-amber-100 p-3 rounded-2xl text-amber-600 hover:bg-amber-200 transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="bg-amber-100 p-3 rounded-2xl text-amber-600 hover:bg-amber-200 transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="bg-amber-100 p-3 rounded-2xl text-amber-600 hover:bg-amber-200 transition-colors">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Table Reservation</option>
                      <option value="catering">Catering Services</option>
                      <option value="feedback">Feedback & Reviews</option>
                      <option value="complaint">Complaint</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <MdSend className="text-xl" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Map Info */}
            <div className="lg:col-span-1 p-8 bg-gradient-to-br from-amber-500 to-orange-500 text-white">
              <h2 className="text-2xl font-bold mb-4">Visit Our Restaurant</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Main Restaurant</h3>
                  <p>123 Gourmet Street, Nairobi</p>
                  <p className="text-amber-100">Opposite Central Park</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Parking</h3>
                  <p>Complimentary valet parking available</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Public Transport</h3>
                  <p>5 min walk from Central Station</p>
                  <p>Bus stops: 12, 24, 36</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="lg:col-span-2 h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MdLocationOn className="text-4xl mx-auto mb-2" />
                <p className="text-lg font-semibold">Interactive Map</p>
                <p className="text-sm">Google Maps integration would go here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Banner */}
        <div className="mt-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Need Immediate Assistance?</h3>
          <p className="text-amber-100 mb-4">Call us now for instant support</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+254712345678" className="bg-white text-amber-600 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-colors">
              Call Now: +254 712 345 678
            </a>
            <p className="text-amber-100">Or</p>
            <a href="mailto:info@gourmetrestaurant.com" className="bg-white text-amber-600 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-colors">
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;