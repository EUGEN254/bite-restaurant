import React, { useState } from 'react';
import {
  FaHotel,
  FaChair,
  FaSearch,
  FaFilter,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaBed,
  FaDoorOpen,
  FaDoorClosed,
  FaSort,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const Reservations = () => {
  const [activeTab, setActiveTab] = useState('tables');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sortBy, setSortBy] = useState('time');
  const [sortOrder, setSortOrder] = useState('desc');

  // Dummy data for table reservations
  const [tableReservations, setTableReservations] = useState([
    {
      id: 'TR-001',
      type: 'table',
      customerName: 'Robert Davis',
      phone: '+254 767 890 123',
      email: 'robert.d@email.com',
      guests: 4,
      tableNumber: 6,
      reservationTime: '2024-01-20T19:00:00',
      duration: 2,
      status: 'confirmed',
      specialRequests: 'Window seat preferred',
      created: '2024-01-19T10:30:00'
    },
    {
      id: 'TR-002',
      type: 'table',
      customerName: 'Lisa Anderson',
      phone: '+254 778 901 234',
      email: 'lisa.a@email.com',
      guests: 2,
      tableNumber: 2,
      reservationTime: '2024-01-20T20:30:00',
      duration: 3,
      status: 'pending',
      specialRequests: 'Anniversary celebration - please prepare special dessert',
      created: '2024-01-20T14:15:00'
    },
    {
      id: 'TR-003',
      type: 'table',
      customerName: 'James Wilson',
      phone: '+254 789 012 345',
      email: 'james.w@email.com',
      guests: 6,
      tableNumber: 10,
      reservationTime: '2024-01-21T12:00:00',
      duration: 1.5,
      status: 'confirmed',
      specialRequests: 'High chair needed for 1 child',
      created: '2024-01-18T16:45:00'
    },
    {
      id: 'TR-004',
      type: 'table',
      customerName: 'Maria Garcia',
      phone: '+254 790 123 456',
      email: 'maria.g@email.com',
      guests: 8,
      tableNumber: 15,
      reservationTime: '2024-01-21T14:00:00',
      duration: 2,
      status: 'cancelled',
      specialRequests: '',
      created: '2024-01-17T09:20:00'
    },
    {
      id: 'TR-005',
      type: 'table',
      customerName: 'David Kim',
      phone: '+254 701 234 567',
      email: 'david.k@email.com',
      guests: 3,
      tableNumber: 4,
      reservationTime: '2024-01-20T18:00:00',
      duration: 2,
      status: 'seated',
      specialRequests: 'Vegetarian options required',
      created: '2024-01-19T15:30:00'
    }
  ]);

  // Dummy data for hotel bookings
  const [hotelBookings, setHotelBookings] = useState([
    {
      id: 'HB-001',
      type: 'hotel',
      customerName: 'Thomas Moore',
      phone: '+254 712 345 678',
      email: 'thomas.m@email.com',
      roomType: 'Deluxe Suite',
      roomNumber: '301',
      checkIn: '2024-01-20',
      checkOut: '2024-01-23',
      nights: 3,
      guests: 2,
      status: 'checked-in',
      total: 45000,
      paymentMethod: 'card',
      specialRequests: 'Late check-out requested if possible',
      created: '2024-01-15T11:20:00'
    },
    {
      id: 'HB-002',
      type: 'hotel',
      customerName: 'Jennifer Lopez',
      phone: '+254 723 456 789',
      email: 'jennifer.l@email.com',
      roomType: 'Executive Room',
      roomNumber: '205',
      checkIn: '2024-01-21',
      checkOut: '2024-01-24',
      nights: 3,
      guests: 1,
      status: 'confirmed',
      total: 32000,
      paymentMethod: 'card',
      specialRequests: 'Quiet room preferred',
      created: '2024-01-16T14:35:00'
    },
    {
      id: 'HB-003',
      type: 'hotel',
      customerName: 'Kevin Martin',
      phone: '+254 734 567 890',
      email: 'kevin.m@email.com',
      roomType: 'Family Room',
      roomNumber: '401',
      checkIn: '2024-01-25',
      checkOut: '2024-01-28',
      nights: 3,
      guests: 4,
      status: 'pending',
      total: 68000,
      paymentMethod: 'cash',
      specialRequests: 'Extra bed required',
      created: '2024-01-19T10:15:00'
    },
    {
      id: 'HB-004',
      type: 'hotel',
      customerName: 'Sophie Turner',
      phone: '+254 745 678 901',
      email: 'sophie.t@email.com',
      roomType: 'Standard Room',
      roomNumber: '102',
      checkIn: '2024-01-19',
      checkOut: '2024-01-20',
      nights: 1,
      guests: 2,
      status: 'checked-out',
      total: 15000,
      paymentMethod: 'card',
      specialRequests: '',
      created: '2024-01-18T08:45:00'
    },
    {
      id: 'HB-005',
      type: 'hotel',
      customerName: 'Michael Brown',
      phone: '+254 756 789 012',
      email: 'michael.b@email.com',
      roomType: 'Deluxe Suite',
      roomNumber: '302',
      checkIn: '2024-01-22',
      checkOut: '2024-01-25',
      nights: 3,
      guests: 2,
      status: 'confirmed',
      total: 48000,
      paymentMethod: 'card',
      specialRequests: 'Honeymoon package',
      created: '2024-01-17T16:20:00'
    }
  ]);

  const statusOptions = {
    all: 'All Status',
    pending: 'Pending',
    confirmed: 'Confirmed',
    seated: 'Seated',
    'checked-in': 'Checked In',
    'checked-out': 'Checked Out',
    cancelled: 'Cancelled'
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      seated: 'bg-green-100 text-green-800 border-green-200',
      'checked-in': 'bg-purple-100 text-purple-800 border-purple-200',
      'checked-out': 'bg-gray-100 text-gray-800 border-gray-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock className="h-3 w-3" />,
      confirmed: <FaCheckCircle className="h-3 w-3" />,
      seated: <FaChair className="h-3 w-3" />,
      'checked-in': <FaDoorOpen className="h-3 w-3" />,
      'checked-out': <FaDoorClosed className="h-3 w-3" />,
      cancelled: <FaTimesCircle className="h-3 w-3" />
    };
    return icons[status] || <FaClock className="h-3 w-3" />;
  };

  const getCurrentData = () => {
    return activeTab === 'tables' ? tableReservations : hotelBookings;
  };

  const filteredReservations = getCurrentData().filter(reservation => {
    const matchesSearch = 
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedReservations = [...filteredReservations].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'time':
        aValue = new Date(a.reservationTime || a.checkIn);
        bValue = new Date(b.reservationTime || b.checkIn);
        break;
      case 'name':
        aValue = a.customerName.toLowerCase();
        bValue = b.customerName.toLowerCase();
        break;
      case 'created':
        aValue = new Date(a.created);
        bValue = new Date(b.created);
        break;
      default:
        aValue = new Date(a.reservationTime || a.checkIn);
        bValue = new Date(b.reservationTime || b.checkIn);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const updateReservationStatus = (reservationId, newStatus) => {
    if (activeTab === 'tables') {
      setTableReservations(tableReservations.map(reservation =>
        reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
      ));
    } else {
      setHotelBookings(hotelBookings.map(booking =>
        booking.id === reservationId ? { ...booking, status: newStatus } : booking
      ));
    }
  };

  const getStats = () => {
    const tableData = tableReservations;
    const hotelData = hotelBookings;

    const tableStats = {
      total: tableData.length,
      pending: tableData.filter(r => r.status === 'pending').length,
      confirmed: tableData.filter(r => r.status === 'confirmed').length,
      seated: tableData.filter(r => r.status === 'seated').length,
      today: tableData.filter(r => 
        new Date(r.reservationTime).toDateString() === new Date().toDateString()
      ).length
    };

    const hotelStats = {
      total: hotelData.length,
      pending: hotelData.filter(r => r.status === 'pending').length,
      confirmed: hotelData.filter(r => r.status === 'confirmed').length,
      checkedIn: hotelData.filter(r => r.status === 'checked-in').length,
      revenue: hotelData
        .filter(r => r.status === 'checked-out')
        .reduce((sum, booking) => sum + booking.total, 0)
    };

    return { tableStats, hotelStats };
  };

  const stats = getStats();
  const currentStats = activeTab === 'tables' ? stats.tableStats : stats.hotelStats;

  const openReservationDetails = (reservation) => {
    setSelectedReservation(reservation);
    setShowDetailsModal(true);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? <FaArrowUp className="h-3 w-3" /> : <FaArrowDown className="h-3 w-3" />;
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reservations</h1>
          <p className="text-gray-600 mt-2">Manage table reservations and hotel bookings</p>
        </div>
        <div className={`border rounded-xl px-4 py-3 ${
          activeTab === 'tables' 
            ? 'bg-green-50 border-green-200 text-green-700' 
            : 'bg-purple-50 border-purple-200 text-purple-700'
        }`}>
          <p className="font-medium">
            Total {activeTab === 'tables' ? 'Reservations' : 'Bookings'}:{' '}
            <span className={activeTab === 'tables' ? 'text-green-800' : 'text-purple-800'}>
              {currentStats.total}
            </span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('tables')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === 'tables'
                ? 'bg-green-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaChair className="h-4 w-4" />
            Table Reservations ({tableReservations.length})
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === 'hotels'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaHotel className="h-4 w-4" />
            Hotel Bookings ({hotelBookings.length})
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeTab === 'tables' ? (
          <>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Reservations</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{currentStats.today}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <FaCalendarAlt className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-1">{currentStats.pending}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <FaClock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{currentStats.confirmed}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaCheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Currently Seated</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{currentStats.seated}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <FaChair className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Checked In</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{currentStats.checkedIn}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <FaDoorOpen className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-1">{currentStats.pending}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <FaClock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{currentStats.confirmed}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaCheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    KES {currentStats.revenue.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <FaHotel className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'tables' ? 'reservations' : 'bookings'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
              >
                {Object.entries(statusOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {sortedReservations.length === 0 ? (
          <div className="text-center py-12">
            {activeTab === 'tables' ? (
              <FaChair className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            ) : (
              <FaHotel className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            )}
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              No {activeTab === 'tables' ? 'reservations' : 'bookings'} found
            </h3>
            <p className="text-gray-400">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filters' : `No ${activeTab === 'tables' ? 'table reservations' : 'hotel bookings'} yet`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort(activeTab === 'tables' ? 'time' : 'created')}
                  >
                    <div className="flex items-center gap-2">
                      {activeTab === 'tables' ? 'Reservation Time' : 'Check-in Date'}
                      {getSortIcon(activeTab === 'tables' ? 'time' : 'created')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Customer
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  {activeTab === 'tables' ? (
                    <>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Table & Guests
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stay Duration
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {activeTab === 'tables' 
                          ? formatDateTime(reservation.reservationTime)
                          : formatDate(reservation.checkIn)
                        }
                      </div>
                      {activeTab === 'hotels' && (
                        <div className="text-xs text-gray-500">
                          Check-out: {formatDate(reservation.checkOut)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                          activeTab === 'tables' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                        }`}>
                          <FaUser className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                          <div className="text-xs text-gray-500">{reservation.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <FaPhone className="h-3 w-3 text-gray-400" />
                          {reservation.phone}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <FaEnvelope className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{reservation.email}</span>
                        </div>
                      </div>
                    </td>
                    {activeTab === 'tables' ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                              Table {reservation.tableNumber}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-gray-600">
                              <FaUsers className="h-3 w-3" />
                              {reservation.guests} guests
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {reservation.duration} hours
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{reservation.roomType}</div>
                          <div className="text-xs text-gray-500">Room {reservation.roomNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {reservation.nights} night{reservation.nights !== 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          KES {reservation.total.toLocaleString()}
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={reservation.status}
                        onChange={(e) => updateReservationStatus(reservation.id, e.target.value)}
                        className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${getStatusColor(reservation.status)}`}
                      >
                        {activeTab === 'tables' ? (
                          <>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="seated">Seated</option>
                            <option value="cancelled">Cancelled</option>
                          </>
                        ) : (
                          <>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="checked-in">Checked In</option>
                            <option value="checked-out">Checked Out</option>
                            <option value="cancelled">Cancelled</option>
                          </>
                        )}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openReservationDetails(reservation)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reservation Details Modal */}
      {showDetailsModal && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedReservation.type === 'table' ? 'Reservation' : 'Booking'} Details - {selectedReservation.id}
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimesCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedReservation.customerName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedReservation.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email Address</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedReservation.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Reservation Date</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedReservation.type === 'table' 
                        ? formatDateTime(selectedReservation.reservationTime)
                        : `${formatDate(selectedReservation.checkIn)} to ${formatDate(selectedReservation.checkOut)}`
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Reservation Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {selectedReservation.type === 'table' ? 'Table Reservation' : 'Hotel Booking'} Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedReservation.type === 'table' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Table Number</label>
                        <p className="text-sm text-gray-900 mt-1">Table {selectedReservation.tableNumber}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Number of Guests</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedReservation.guests} guests</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Duration</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedReservation.duration} hours</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Room Type</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedReservation.roomType}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Room Number</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedReservation.roomNumber}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Guests</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedReservation.guests} guest{selectedReservation.guests !== 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Total Amount</label>
                        <p className="text-sm font-bold text-gray-900 mt-1">
                          KES {selectedReservation.total.toLocaleString()}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Special Requests */}
              {selectedReservation.specialRequests && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Special Requests</h3>
                  <p className="text-sm text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    {selectedReservation.specialRequests}
                  </p>
                </div>
              )}

              {/* Status Update */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Status</h3>
                <select
                  value={selectedReservation.status}
                  onChange={(e) => {
                    updateReservationStatus(selectedReservation.id, e.target.value);
                    setSelectedReservation({...selectedReservation, status: e.target.value});
                  }}
                  className={`w-full px-4 py-2 rounded-xl border transition-colors ${getStatusColor(selectedReservation.status)}`}
                >
                  {selectedReservation.type === 'table' ? (
                    <>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="seated">Seated</option>
                      <option value="cancelled">Cancelled</option>
                    </>
                  ) : (
                    <>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="checked-in">Checked In</option>
                      <option value="checked-out">Checked Out</option>
                      <option value="cancelled">Cancelled</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;