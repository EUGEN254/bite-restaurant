import React, { useState } from 'react';
import {
  FaUtensils,
  FaSearch,
  FaFilter,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaExclamationTriangle,
  FaSort,
  FaUser,
  FaPhone,
  FaChair,
  FaMoneyBillWave,
  FaPrint,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sortBy, setSortBy] = useState('time');
  const [sortOrder, setSortOrder] = useState('desc');

  // Dummy data for food orders
  const [orders, setOrders] = useState([
    {
      id: 'FO-001',
      customerName: 'John Smith',
      phone: '+254 712 345 678',
      items: [
        { name: 'Grilled Chicken', quantity: 2, price: 1800 },
        { name: 'French Fries', quantity: 1, price: 400 },
        { name: 'Fresh Juice', quantity: 2, price: 300 }
      ],
      total: 4300,
      status: 'pending',
      orderTime: '2024-01-20T14:30:00',
      tableNumber: 5,
      paymentMethod: 'cash',
      specialInstructions: 'No onions please'
    },
    {
      id: 'FO-002',
      customerName: 'Sarah Johnson',
      phone: '+254 723 456 789',
      items: [
        { name: 'Vegetable Pizza', quantity: 1, price: 1200 },
        { name: 'Garlic Bread', quantity: 1, price: 350 }
      ],
      total: 1550,
      status: 'preparing',
      orderTime: '2024-01-20T15:15:00',
      tableNumber: 12,
      paymentMethod: 'card',
      specialInstructions: 'Extra cheese'
    },
    {
      id: 'FO-003',
      customerName: 'Mike Brown',
      phone: '+254 734 567 890',
      items: [
        { name: 'Beef Burger', quantity: 1, price: 850 },
        { name: 'Onion Rings', quantity: 1, price: 450 },
        { name: 'Soda', quantity: 1, price: 150 }
      ],
      total: 1450,
      status: 'ready',
      orderTime: '2024-01-20T16:00:00',
      tableNumber: 8,
      paymentMethod: 'cash',
      specialInstructions: ''
    },
    {
      id: 'FO-004',
      customerName: 'Emma Wilson',
      phone: '+254 745 678 901',
      items: [
        { name: 'Seafood Pasta', quantity: 1, price: 1600 },
        { name: 'Caesar Salad', quantity: 1, price: 800 },
        { name: 'Wine', quantity: 1, price: 1200 }
      ],
      total: 3600,
      status: 'completed',
      orderTime: '2024-01-20T13:45:00',
      tableNumber: 3,
      paymentMethod: 'card',
      specialInstructions: 'Dressing on the side'
    },
    {
      id: 'FO-005',
      customerName: 'David Kim',
      phone: '+254 756 789 012',
      items: [
        { name: 'Sushi Platter', quantity: 1, price: 2200 },
        { name: 'Green Tea', quantity: 2, price: 200 }
      ],
      total: 2400,
      status: 'cancelled',
      orderTime: '2024-01-20T17:30:00',
      tableNumber: null,
      paymentMethod: 'card',
      specialInstructions: ''
    },
    {
      id: 'FO-006',
      customerName: 'Lisa Taylor',
      phone: '+254 767 890 123',
      items: [
        { name: 'Chicken Wings', quantity: 2, price: 1200 },
        { name: 'Coleslaw', quantity: 1, price: 300 },
        { name: 'Beer', quantity: 3, price: 600 }
      ],
      total: 2100,
      status: 'pending',
      orderTime: '2024-01-20T18:45:00',
      tableNumber: 7,
      paymentMethod: 'cash',
      specialInstructions: 'Spicy wings'
    }
  ]);

  const statusOptions = {
    all: 'All Status',
    pending: 'Pending',
    preparing: 'Preparing',
    ready: 'Ready',
    completed: 'Completed',
    cancelled: 'Cancelled'
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      preparing: 'bg-blue-100 text-blue-800 border-blue-200',
      ready: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock className="h-3 w-3" />,
      preparing: <FaUtensils className="h-3 w-3" />,
      ready: <FaCheckCircle className="h-3 w-3" />,
      completed: <FaCheckCircle className="h-3 w-3" />,
      cancelled: <FaTimesCircle className="h-3 w-3" />
    };
    return icons[status] || <FaClock className="h-3 w-3" />;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'time':
        aValue = new Date(a.orderTime);
        bValue = new Date(b.orderTime);
        break;
      case 'total':
        aValue = a.total;
        bValue = b.total;
        break;
      case 'name':
        aValue = a.customerName.toLowerCase();
        bValue = b.customerName.toLowerCase();
        break;
      default:
        aValue = new Date(a.orderTime);
        bValue = new Date(b.orderTime);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStats = () => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const preparing = orders.filter(o => o.status === 'preparing').length;
    const ready = orders.filter(o => o.status === 'ready').length;
    const revenue = orders
      .filter(o => o.status === 'completed')
      .reduce((sum, order) => sum + order.total, 0);

    return { total, pending, preparing, ready, revenue };
  };

  const stats = getStats();

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Food Orders</h1>
          <p className="text-gray-600 mt-2">Manage and track all food orders</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
          <p className="text-orange-700 font-medium">
            Active Orders: <span className="text-orange-800">{stats.total}</span>
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaUtensils className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <FaClock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Kitchen</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.preparing}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <FaUtensils className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                KES {stats.revenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <FaMoneyBillWave className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search orders by customer, ID, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white"
              >
                {Object.entries(statusOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200">
            <FaPrint className="h-4 w-4" />
            Print Report
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {sortedOrders.length === 0 ? (
          <div className="text-center py-12">
            <FaUtensils className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              No orders found
            </h3>
            <p className="text-gray-400">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filters' : 'No orders placed yet'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('time')}
                  >
                    <div className="flex items-center gap-2">
                      Order Time
                      {getSortIcon('time')}
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
                    Items
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('total')}
                  >
                    <div className="flex items-center gap-2">
                      Total
                      {getSortIcon('total')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Table
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(order.orderTime).toLocaleTimeString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.orderTime).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                          <FaUser className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <FaPhone className="h-3 w-3" />
                            {order.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.items.length} items
                      </div>
                      <div className="text-xs text-gray-500 max-w-xs truncate">
                        {order.items.map(item => item.name).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      KES {order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.tableNumber ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          <FaChair className="h-3 w-3" />
                          Table {order.tableNumber}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">Takeaway</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openOrderDetails(order)}
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

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Order Details - {selectedOrder.id}</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimesCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Table</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedOrder.tableNumber ? `Table ${selectedOrder.tableNumber}` : 'Takeaway'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Payment Method</label>
                    <p className="text-sm text-gray-900 mt-1 capitalize">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Item</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Qty</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">KES {item.price.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                            KES {(item.quantity * item.price).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                          Total:
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                          KES {selectedOrder.total.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Special Instructions */}
              {selectedOrder.specialInstructions && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Special Instructions</h3>
                  <p className="text-sm text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    {selectedOrder.specialInstructions}
                  </p>
                </div>
              )}

              {/* Status Update */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Status</h3>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    updateOrderStatus(selectedOrder.id, e.target.value);
                    setSelectedOrder({...selectedOrder, status: e.target.value});
                  }}
                  className={`w-full px-4 py-2 rounded-xl border transition-colors ${getStatusColor(selectedOrder.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
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

export default Orders;