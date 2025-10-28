import React, { useState } from 'react';
import {
  FaMoneyBillWave,
  FaSearch,
  FaFilter,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCreditCard,
  FaCashRegister,
  FaPrint,
  FaDownload,
  FaSort,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Dummy data for staff payments
  const [payments, setPayments] = useState([
    {
      id: 'PAY-001',
      staffId: 'STF-001',
      staffName: 'Alice Wanjiku',
      position: 'Head Chef',
      phone: '+254 745 678 901',
      email: 'alice@restaurant.com',
      period: 'January 2024',
      salary: 45000,
      bonus: 5000,
      deductions: 2000,
      netAmount: 48000,
      paymentMethod: 'bank',
      status: 'completed',
      paymentDate: '2024-01-31',
      dueDate: '2024-01-31',
      transactionId: 'TXN-001234'
    },
    {
      id: 'PAY-002',
      staffId: 'STF-002',
      staffName: 'David Omondi',
      position: 'Waiter',
      phone: '+254 756 789 012',
      email: 'david@restaurant.com',
      period: 'January 2024',
      salary: 25000,
      bonus: 2000,
      deductions: 1500,
      netAmount: 25500,
      paymentMethod: 'mpesa',
      status: 'completed',
      paymentDate: '2024-01-31',
      dueDate: '2024-01-31',
      transactionId: 'TXN-001235'
    },
    {
      id: 'PAY-003',
      staffId: 'STF-003',
      staffName: 'Grace Muthoni',
      position: 'Sous Chef',
      phone: '+254 767 890 123',
      email: 'grace@restaurant.com',
      period: 'January 2024',
      salary: 35000,
      bonus: 3000,
      deductions: 1800,
      netAmount: 36200,
      paymentMethod: 'bank',
      status: 'pending',
      paymentDate: null,
      dueDate: '2024-02-05',
      transactionId: null
    },
    {
      id: 'PAY-004',
      staffId: 'STF-004',
      staffName: 'Robert Kamau',
      position: 'Cashier',
      phone: '+254 778 901 234',
      email: 'robert@restaurant.com',
      period: 'January 2024',
      salary: 28000,
      bonus: 1500,
      deductions: 1200,
      netAmount: 28300,
      paymentMethod: 'cash',
      status: 'pending',
      paymentDate: null,
      dueDate: '2024-02-05',
      transactionId: null
    },
    {
      id: 'PAY-005',
      staffId: 'STF-005',
      staffName: 'Sarah Achieng',
      position: 'Cleaner',
      phone: '+254 789 012 345',
      email: 'sarah@restaurant.com',
      period: 'December 2023',
      salary: 18000,
      bonus: 1000,
      deductions: 800,
      netAmount: 18200,
      paymentMethod: 'mpesa',
      status: 'completed',
      paymentDate: '2023-12-31',
      dueDate: '2023-12-31',
      transactionId: 'TXN-001100'
    }
  ]);

  const [newPayment, setNewPayment] = useState({
    staffId: '',
    period: '',
    salary: '',
    bonus: '0',
    deductions: '0',
    paymentMethod: 'mpesa'
  });

  const statusOptions = {
    all: 'All Status',
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed'
  };

  const paymentMethods = {
    mpesa: 'M-Pesa',
    bank: 'Bank Transfer',
    cash: 'Cash'
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      failed: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock className="h-3 w-3" />,
      completed: <FaCheckCircle className="h-3 w-3" />,
      failed: <FaTimesCircle className="h-3 w-3" />
    };
    return icons[status] || <FaClock className="h-3 w-3" />;
  };

  // Mock staff data for payment form
  const staffMembers = [
    { id: 'STF-001', name: 'Alice Wanjiku', position: 'Head Chef', salary: 45000 },
    { id: 'STF-002', name: 'David Omondi', position: 'Waiter', salary: 25000 },
    { id: 'STF-003', name: 'Grace Muthoni', position: 'Sous Chef', salary: 35000 },
    { id: 'STF-004', name: 'Robert Kamau', position: 'Cashier', salary: 28000 },
    { id: 'STF-005', name: 'Sarah Achieng', position: 'Cleaner', salary: 18000 }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'date':
        aValue = new Date(a.paymentDate || a.dueDate);
        bValue = new Date(b.paymentDate || b.dueDate);
        break;
      case 'name':
        aValue = a.staffName.toLowerCase();
        bValue = b.staffName.toLowerCase();
        break;
      case 'amount':
        aValue = a.netAmount;
        bValue = b.netAmount;
        break;
      default:
        aValue = new Date(a.paymentDate || a.dueDate);
        bValue = new Date(b.paymentDate || b.dueDate);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStats = () => {
    const total = payments.length;
    const pending = payments.filter(p => p.status === 'pending').length;
    const completed = payments.filter(p => p.status === 'completed').length;
    const totalPaid = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, payment) => sum + payment.netAmount, 0);
    const pendingAmount = payments
      .filter(p => p.status === 'pending')
      .reduce((sum, payment) => sum + payment.netAmount, 0);

    return { total, pending, completed, totalPaid, pendingAmount };
  };

  const stats = getStats();

  const openPaymentDetails = (payment) => {
    setSelectedPayment(payment);
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

  const processPayment = async (paymentId) => {
    // Simulate API call
    setPayments(payments.map(payment =>
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: 'completed',
            paymentDate: new Date().toISOString().split('T')[0],
            transactionId: `TXN-${Date.now()}`
          }
        : payment
    ));
  };

  const handleNewPayment = async (e) => {
    e.preventDefault();
    
    const selectedStaff = staffMembers.find(staff => staff.id === newPayment.staffId);
    if (!selectedStaff) return;

    const netAmount = parseInt(newPayment.salary) + parseInt(newPayment.bonus) - parseInt(newPayment.deductions);
    
    const newPaymentRecord = {
      id: `PAY-${Date.now()}`,
      staffId: newPayment.staffId,
      staffName: selectedStaff.name,
      position: selectedStaff.position,
      phone: '+254 XXX XXX XXX', // Would come from staff data
      email: `${selectedStaff.name.toLowerCase().replace(' ', '.')}@restaurant.com`,
      period: newPayment.period,
      salary: parseInt(newPayment.salary),
      bonus: parseInt(newPayment.bonus),
      deductions: parseInt(newPayment.deductions),
      netAmount: netAmount,
      paymentMethod: newPayment.paymentMethod,
      status: 'pending',
      paymentDate: null,
      dueDate: new Date().toISOString().split('T')[0],
      transactionId: null
    };

    setPayments([newPaymentRecord, ...payments]);
    setShowPaymentModal(false);
    setNewPayment({
      staffId: '',
      period: '',
      salary: '',
      bonus: '0',
      deductions: '0',
      paymentMethod: 'mpesa'
    });
  };

  const handleStaffChange = (staffId) => {
    const selectedStaff = staffMembers.find(staff => staff.id === staffId);
    if (selectedStaff) {
      setNewPayment({
        ...newPayment,
        staffId,
        salary: selectedStaff.salary.toString()
      });
    }
  };

  const calculateNetAmount = () => {
    const salary = parseInt(newPayment.salary) || 0;
    const bonus = parseInt(newPayment.bonus) || 0;
    const deductions = parseInt(newPayment.deductions) || 0;
    return salary + bonus - deductions;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
          <p className="text-gray-600 mt-2">Manage staff payments and payroll</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <p className="text-blue-700 font-medium">
            Total Payments: <span className="text-blue-800">{stats.total}</span>
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                KES {stats.totalPaid.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <FaMoneyBillWave className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
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
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                KES {stats.pendingAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <FaMoneyBillWave className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.completed}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaCheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search payments by staff name, ID, or position..."
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
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200">
              <FaDownload className="h-4 w-4" />
              Export
            </button>
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
            >
              <FaMoneyBillWave className="h-4 w-4" />
              New Payment
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {sortedPayments.length === 0 ? (
          <div className="text-center py-12">
            <FaMoneyBillWave className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              No payments found
            </h3>
            <p className="text-gray-400">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filters' : 'No payments recorded yet'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center gap-2">
                      Payment Date
                      {getSortIcon('date')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Staff Member
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('amount')}
                  >
                    <div className="flex items-center gap-2">
                      Amount
                      {getSortIcon('amount')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
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
                {sortedPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {payment.paymentDate ? (
                          new Date(payment.paymentDate).toLocaleDateString()
                        ) : (
                          <span className="text-orange-600">Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          <FaUser className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{payment.staffName}</div>
                          <div className="text-sm text-gray-500">{payment.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {payment.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        KES {payment.netAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Basic: {payment.salary.toLocaleString()} + Bonus: {payment.bonus.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        {payment.paymentMethod === 'mpesa' && <FaCreditCard className="h-3 w-3" />}
                        {payment.paymentMethod === 'bank' && <FaMoneyBillWave className="h-3 w-3" />}
                        {payment.paymentMethod === 'cash' && <FaCashRegister className="h-3 w-3" />}
                        {paymentMethods[payment.paymentMethod]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openPaymentDetails(payment)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>
                        {payment.status === 'pending' && (
                          <button
                            onClick={() => processPayment(payment.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Process Payment"
                          >
                            <FaCheckCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Create New Payment</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleNewPayment}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Staff Member
                    </label>
                    <select
                      required
                      value={newPayment.staffId}
                      onChange={(e) => handleStaffChange(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                      <option value="">Choose staff member</option>
                      {staffMembers.map(staff => (
                        <option key={staff.id} value={staff.id}>
                          {staff.name} - {staff.position}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Period
                    </label>
                    <input
                      type="text"
                      required
                      value={newPayment.period}
                      onChange={(e) => setNewPayment({...newPayment, period: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="e.g., January 2024"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Basic Salary
                      </label>
                      <input
                        type="number"
                        required
                        value={newPayment.salary}
                        onChange={(e) => setNewPayment({...newPayment, salary: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bonus
                      </label>
                      <input
                        type="number"
                        value={newPayment.bonus}
                        onChange={(e) => setNewPayment({...newPayment, bonus: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deductions
                    </label>
                    <input
                      type="number"
                      value={newPayment.deductions}
                      onChange={(e) => setNewPayment({...newPayment, deductions: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="0"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Net Amount:</span>
                      <span className="text-lg font-bold text-green-600">
                        KES {calculateNetAmount().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select
                      required
                      value={newPayment.paymentMethod}
                      onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                      {Object.entries(paymentMethods).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Create Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {showDetailsModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Payment Details - {selectedPayment.id}</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimesCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Staff Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Staff Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedPayment.staffName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Position</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedPayment.position}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedPayment.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedPayment.email}</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Basic Salary</label>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        KES {selectedPayment.salary.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Bonus</label>
                      <p className="text-lg font-bold text-green-600 mt-1">
                        + KES {selectedPayment.bonus.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Deductions</label>
                      <p className="text-lg font-bold text-red-600 mt-1">
                        - KES {selectedPayment.deductions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Net Amount</label>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        KES {selectedPayment.netAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Payment Period</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedPayment.period}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Payment Method</label>
                    <p className="text-sm text-gray-900 mt-1 capitalize">{paymentMethods[selectedPayment.paymentMethod]}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Status</label>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedPayment.status)}`}>
                      {getStatusIcon(selectedPayment.status)}
                      {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                    </span>
                  </div>
                  {selectedPayment.transactionId && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Transaction ID</label>
                      <p className="text-sm text-gray-900 mt-1 font-mono">{selectedPayment.transactionId}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedPayment.status === 'pending' && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      processPayment(selectedPayment.id);
                      setShowDetailsModal(false);
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Process Payment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;