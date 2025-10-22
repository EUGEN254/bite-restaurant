import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdCreditCard, MdSecurity, MdCheckCircle, MdPhoneIphone } from 'react-icons/md';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaMobileAlt, FaHotel, FaShoppingCart, FaChair } from 'react-icons/fa';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card'); // 'card' or 'mpesa'
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    // Card Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    // M-Pesa Info
    mpesaPhone: ''
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // If no order details, redirect back
  if (!orderDetails) {
    navigate('/cart');
    return null;
  }

  // Determine the type of order and set dynamic text
  const getOrderType = () => {
    // Check if it's a hotel booking
    if (orderDetails.bookingSummary || 
        (orderDetails.items && orderDetails.items[0] && orderDetails.items[0].type === 'hotel_booking')) {
      return 'hotel';
    }
    // Check if it's a table reservation
    if (orderDetails.reservationSummary || 
        (orderDetails.items && orderDetails.items[0] && orderDetails.items[0].type === 'table_reservation')) {
      return 'reservation';
    }
    // Default to food/cart order
    return 'cart';
  };

  const orderType = getOrderType();

  // Dynamic text based on order type
  const getBackButtonText = () => {
    switch (orderType) {
      case 'hotel':
        return 'Back to Hotel checkout';
      case 'reservation':
        return 'Back to Reservation';
      default:
        return 'Back to Cart';
    }
  };

  const getBackButtonIcon = () => {
    switch (orderType) {
      case 'hotel':
        return <FaHotel className="text-lg" />;
      case 'reservation':
        return <FaChair className="text-lg" />;
      default:
        return <FaShoppingCart className="text-lg" />;
    }
  };

  const getBackButtonRoute = () => {
    switch (orderType) {
      case 'hotel':
        return -1;
      case 'reservation':
        return '/reservation';
      default:
        return '/cart';
    }
  };

  const getOrderTitle = () => {
    switch (orderType) {
      case 'hotel':
        return 'Hotel Booking';
      case 'reservation':
        return 'Table Reservation';
      default:
        return 'Food Order';
    }
  };

  const getSuccessMessage = () => {
    switch (orderType) {
      case 'hotel':
        return 'Your hotel booking has been confirmed! You will receive an email with booking details.';
      case 'reservation':
        return 'Your table reservation has been confirmed! We look forward to serving you.';
      default:
        return 'Your food order has been confirmed and will be prepared shortly. You will receive an email confirmation with order details.';
    }
  };

  const getAddressLabel = () => {
    switch (orderType) {
      case 'hotel':
        return 'Billing Address *';
      case 'reservation':
        return 'Contact Address *';
      default:
        return 'Delivery Address *';
    }
  };

  const getAddressPlaceholder = () => {
    switch (orderType) {
      case 'hotel':
        return 'Enter your billing address';
      case 'reservation':
        return 'Enter your contact address';
      default:
        return 'Enter your complete delivery address';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      
      // Redirect to home after success
      setTimeout(() => {
        navigate('/');
      }, 10000);
    }, 4000);
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value) => {
    return value.replace(/\//g, '').replace(/(\d{2})(\d)/, '$1/$2');
  };

  const formatMpesaPhone = (value) => {
    // Format to Kenyan phone format: 254 XXX XXX XXX
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    }
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.substring(0, 3)} ${cleaned.substring(3)}`;
    if (cleaned.length <= 9) return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6, 9)} ${cleaned.substring(9, 12)}`;
  };

  const calculateTotal = () => {
    const subtotal = orderDetails.total;
    let serviceFee = 100;
    if (orderType === 'hotel') serviceFee = 200;
    if (orderType === 'reservation') serviceFee = 150;
    
    const tax = subtotal * 0.16;
    return subtotal + serviceFee + tax;
  };

  const getServiceFee = () => {
    switch (orderType) {
      case 'hotel':
        return 200;
      case 'reservation':
        return 150;
      default:
        return 100;
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdCheckCircle className="text-white text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-2">
            Thank you for your {orderType === 'hotel' ? 'booking' : orderType === 'reservation' ? 'reservation' : 'order'}
          </p>
          <p className="text-gray-600 mb-4">
            Paid via: <span className="font-bold text-amber-600">
              {selectedPaymentMethod === 'card' ? 'Credit Card' : 'M-Pesa'}
            </span>
          </p>
          <p className="text-gray-600 mb-6">Total: <span className="font-bold text-amber-600">Kes {calculateTotal().toFixed(0)}</span></p>
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <p className="text-green-700 text-sm">
              {getSuccessMessage()}
              {selectedPaymentMethod === 'mpesa' && orderType === 'cart' ? ' SMS and' : ''}
            </p>
          </div>
          <p className="text-gray-500 text-sm">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Dynamic Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(getBackButtonRoute())}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors"
          >
            <MdArrowBack className="text-xl" />
            {getBackButtonIcon()}
            <span>{getBackButtonText()}</span>
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center">
            Complete Your Payment
          </h1>
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Order Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MdCheckCircle className="text-amber-500" />
              {getOrderTitle()} Summary
            </h2>

            <div className="space-y-4 mb-6">
              {orderType === 'hotel' ? (
                // Hotel Booking Summary
                <div className="p-4 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-4 mb-3">
                    <img 
                      src={orderDetails.items[0].image} 
                      alt={orderDetails.items[0].name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{orderDetails.items[0].name}</h3>
                      <p className="text-sm text-gray-600">Hotel Booking</p>
                    </div>
                  </div>
                  
                  {/* Hotel Booking Details */}
                  {orderDetails.bookingSummary && (
                    <div className="text-sm text-gray-600 space-y-1 mt-3">
                      <p><strong>Check-in:</strong> {new Date(orderDetails.bookingSummary.bookingDetails.checkIn).toLocaleDateString()}</p>
                      <p><strong>Check-out:</strong> {new Date(orderDetails.bookingSummary.bookingDetails.checkOut).toLocaleDateString()}</p>
                      <p><strong>Guests:</strong> {orderDetails.bookingSummary.bookingDetails.guests}</p>
                      <p><strong>Rooms:</strong> {orderDetails.bookingSummary.bookingDetails.rooms}</p>
                      <p><strong>Nights:</strong> {orderDetails.bookingSummary.nights}</p>
                    </div>
                  )}
                </div>
              ) : orderType === 'reservation' ? (
                // Reservation Summary
                <div className="p-4 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-4 mb-3">
                    <img 
                      src={orderDetails.items[0].image} 
                      alt={orderDetails.items[0].name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{orderDetails.items[0].name}</h3>
                      <p className="text-sm text-gray-600">Table Reservation</p>
                    </div>
                  </div>
                  
                  {/* Reservation Details */}
                  {orderDetails.reservationSummary && (
                    <div className="text-sm text-gray-600 space-y-1 mt-3">
                      <p><strong>Date:</strong> {new Date(orderDetails.reservationSummary.reservationDetails.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {orderDetails.reservationSummary.reservationDetails.time}</p>
                      <p><strong>Guests:</strong> {orderDetails.reservationSummary.reservationDetails.guests}</p>
                      <p><strong>Seats:</strong> {orderDetails.reservationSummary.reservationDetails.seats}</p>
                      {orderDetails.reservationSummary.reservationDetails.requests && (
                        <p><strong>Requests:</strong> {orderDetails.reservationSummary.reservationDetails.requests}</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                // Food Order Summary
                orderDetails.items.map((item, index) => {
                  const quantity = item.quantity || 1;
                  const itemTotal = item.price * quantity;
                  
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 bg-amber-50 rounded-xl">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-amber-600">Kes {item.price}</p>
                        <p className="text-sm text-gray-600">Total: Kes {itemTotal}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">
                  {orderType === 'hotel' ? 'Booking Total' : orderType === 'reservation' ? 'Reservation Fee' : `Items (${orderDetails.itemCount})`}
                </span>
                <span className="text-gray-800">Kes {orderDetails.total}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Service Fee</span>
                <span className="text-gray-800">Kes {getServiceFee()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Tax (16%)</span>
                <span className="text-gray-800">Kes {(orderDetails.total * 0.16).toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold pt-4 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-amber-600">
                  Kes {calculateTotal().toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MdCreditCard className="text-amber-500" />
              Payment Details
            </h2>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                    selectedPaymentMethod === 'card'
                      ? 'border-amber-500 bg-amber-50 shadow-md'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <MdCreditCard className={`text-2xl ${
                      selectedPaymentMethod === 'card' ? 'text-amber-600' : 'text-gray-400'
                    }`} />
                    <span className={`font-semibold ${
                      selectedPaymentMethod === 'card' ? 'text-amber-600' : 'text-gray-600'
                    }`}>
                      Credit Card
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('mpesa')}
                  className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                    selectedPaymentMethod === 'mpesa'
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <FaMobileAlt className={`text-2xl ${
                      selectedPaymentMethod === 'mpesa' ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <span className={`font-semibold ${
                      selectedPaymentMethod === 'mpesa' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      M-Pesa
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-amber-500" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-2 text-amber-500" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaPhone className="inline mr-2 text-amber-500" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="+254 712 345 678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaMapMarkerAlt className="inline mr-2 text-amber-500" />
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="Nairobi"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getAddressLabel()}
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                    placeholder={getAddressPlaceholder()}
                  />
                </div>
              </div>

              {/* Payment Method Specific Forms */}
              {selectedPaymentMethod === 'card' ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MdCreditCard className="text-amber-500" />
                    Card Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="JOHN DOE"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formatCardNumber(formData.cardNumber)}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          setFormData(prev => ({ ...prev, cardNumber: formatted }));
                        }}
                        required
                        maxLength="19"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formatExpiryDate(formData.expiryDate)}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value);
                            setFormData(prev => ({ ...prev, expiryDate: formatted }));
                          }}
                          required
                          maxLength="5"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaMobileAlt className="text-green-500" />
                    M-Pesa Payment
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MdPhoneIphone className="inline mr-2 text-green-500" />
                        M-Pesa Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="mpesaPhone"
                        value={formatMpesaPhone(formData.mpesaPhone)}
                        onChange={(e) => {
                          const formatted = formatMpesaPhone(e.target.value);
                          setFormData(prev => ({ ...prev, mpesaPhone: formatted }));
                        }}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="254 712 345 678"
                      />
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">How it works:</h4>
                      <ol className="text-green-700 text-sm space-y-1">
                        <li>1. Enter your M-Pesa registered phone number</li>
                        <li>2. Click "Pay with M-Pesa" button</li>
                        <li>3. Check your phone for STK push notification</li>
                        <li>4. Enter your M-Pesa PIN to complete payment</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className={`rounded-xl p-4 border ${
                selectedPaymentMethod === 'card' 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-start gap-3">
                  <MdSecurity className={`text-xl mt-1 flex-shrink-0 ${
                    selectedPaymentMethod === 'card' ? 'text-amber-500' : 'text-green-500'
                  }`} />
                  <div>
                    <h4 className={`font-semibold mb-1 ${
                      selectedPaymentMethod === 'card' ? 'text-amber-800' : 'text-green-800'
                    }`}>
                      Secure Payment
                    </h4>
                    <p className={`text-sm ${
                      selectedPaymentMethod === 'card' ? 'text-amber-700' : 'text-green-700'
                    }`}>
                      {selectedPaymentMethod === 'card' 
                        ? 'Your payment information is encrypted and secure. We do not store your card details.'
                        : 'Your M-Pesa payment is processed securely through Safaricom. We do not store your PIN.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
                  selectedPaymentMethod === 'card'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    {selectedPaymentMethod === 'card' ? (
                      <MdCreditCard className="text-xl" />
                    ) : (
                      <FaMobileAlt className="text-xl" />
                    )}
                    {selectedPaymentMethod === 'card' 
                      ? `Pay Kes ${calculateTotal().toFixed(0)}` 
                      : `Pay with M-Pesa - Kes ${calculateTotal().toFixed(0)}`
                    }
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;