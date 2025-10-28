import React, { useState } from 'react';
import {
  FaUsers,
  FaUserTie,
  FaUserShield,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch
} from 'react-icons/fa';

const StaffCustomers = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data
  const [customers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+254 712 345 678',
      joinDate: '2024-01-15',
      orders: 12,
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+254 723 456 789',
      joinDate: '2024-02-03',
      orders: 8,
      status: 'active'
    },
    {
      id: 3,
      name: 'Mike Brown',
      email: 'mike.brown@email.com',
      phone: '+254 734 567 890',
      joinDate: '2024-01-28',
      orders: 5,
      status: 'inactive'
    }
  ]);

  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Alice Wanjiku',
      email: 'alice@restaurant.com',
      phone: '+254 745 678 901',
      position: 'Head Chef',
      joinDate: '2023-05-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'David Omondi',
      email: 'david@restaurant.com',
      phone: '+254 756 789 012',
      position: 'Waiter',
      joinDate: '2024-01-10',
      status: 'active'
    }
  ]);

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: 'Manager Admin',
      email: 'manager@restaurant.com',
      role: 'Manager',
      joinDate: '2023-01-15',
      status: 'active'
    }
  ]);

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    password: ''
  });

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'Manager',
    password: ''
  });

  const positions = ['Head Chef', 'Sous Chef', 'Waiter', 'Bartender', 'Cashier', 'Cleaner'];
  const roles = ['Manager', 'Supervisor', 'Accountant'];

  const handleAddStaff = (e) => {
    e.preventDefault();
    const newStaffMember = {
      id: staff.length + 1,
      ...newStaff,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setStaff([...staff, newStaffMember]);
    setShowAddModal(false);
    setNewStaff({ name: '', email: '', phone: '', position: '', password: '' });
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const newAdminUser = {
      id: admins.length + 1,
      ...newAdmin,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setAdmins([...admins, newAdminUser]);
    setShowAddModal(false);
    setNewAdmin({ name: '', email: '', role: 'Manager', password: '' });
  };

  const handleDeleteStaff = (id) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  const handleDeleteAdmin = (id) => {
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  const toggleStatus = (type, id) => {
    if (type === 'staff') {
      setStaff(staff.map(member => 
        member.id === id 
          ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' }
          : member
      ));
    } else {
      setAdmins(admins.map(admin => 
        admin.id === id 
          ? { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' }
          : admin
      ));
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCurrentData = () => {
    switch (activeTab) {
      case 'customers': return filteredCustomers;
      case 'staff': return filteredStaff;
      case 'admins': return filteredAdmins;
      default: return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-2">Manage customers, staff, and admin accounts</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <p className="text-blue-700 font-medium">
            Total {activeTab}: <span className="text-blue-800">{getCurrentData().length}</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === 'customers'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaUsers className="h-4 w-4" />
            Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === 'staff'
                ? 'bg-green-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaUserTie className="h-4 w-4" />
            Staff ({staff.length})
          </button>
          <button
            onClick={() => setActiveTab('admins')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === 'admins'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaUserShield className="h-4 w-4" />
            Admins ({admins.length})
          </button>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          {(activeTab === 'staff' || activeTab === 'admins') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <FaPlus className="h-4 w-4" />
              Add {activeTab === 'staff' ? 'Staff' : 'Admin'}
            </button>
          )}
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {getCurrentData().length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4">
              {activeTab === 'customers' && <FaUsers className="h-16 w-16 mx-auto" />}
              {activeTab === 'staff' && <FaUserTie className="h-16 w-16 mx-auto" />}
              {activeTab === 'admins' && <FaUserShield className="h-16 w-16 mx-auto" />}
            </div>
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              No {activeTab} found
            </h3>
            <p className="text-gray-400">
              {searchTerm ? 'Try adjusting your search terms' : `No ${activeTab} data available`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  {activeTab === 'customers' && (
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                  )}
                  {(activeTab === 'staff' || activeTab === 'admins') && (
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {activeTab === 'staff' ? 'Position' : 'Role'}
                    </th>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  {(activeTab === 'staff' || activeTab === 'admins') && (
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentData().map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {item.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="h-3 w-3 text-gray-400" />
                          {item.email}
                        </div>
                        {item.phone && (
                          <div className="flex items-center gap-2 mt-1">
                            <FaPhone className="h-3 w-3 text-gray-400" />
                            {item.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    {activeTab === 'customers' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {item.orders} orders
                        </span>
                      </td>
                    )}
                    {(activeTab === 'staff' || activeTab === 'admins') && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          activeTab === 'staff' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {item.position || item.role}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaCalendar className="h-3 w-3 text-gray-400" />
                        {new Date(item.joinDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(activeTab, item.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        } transition-colors`}
                      >
                        {item.status === 'active' ? (
                          <>
                            <FaCheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <FaTimesCircle className="h-3 w-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    {(activeTab === 'staff' || activeTab === 'admins') && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <FaEdit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => activeTab === 'staff' ? handleDeleteStaff(item.id) : handleDeleteAdmin(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Add {activeTab === 'staff' ? 'Staff Member' : 'Admin User'}
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={activeTab === 'staff' ? handleAddStaff : handleAddAdmin}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={activeTab === 'staff' ? newStaff.name : newAdmin.name}
                      onChange={(e) => activeTab === 'staff' 
                        ? setNewStaff({...newStaff, name: e.target.value})
                        : setNewAdmin({...newAdmin, name: e.target.value})
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={activeTab === 'staff' ? newStaff.email : newAdmin.email}
                      onChange={(e) => activeTab === 'staff'
                        ? setNewStaff({...newStaff, email: e.target.value})
                        : setNewAdmin({...newAdmin, email: e.target.value})
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter email address"
                    />
                  </div>
                  {activeTab === 'staff' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={newStaff.phone}
                          onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="+254 XXX XXX XXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Position
                        </label>
                        <select
                          required
                          value={newStaff.position}
                          onChange={(e) => setNewStaff({...newStaff, position: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                        >
                          <option value="">Select position</option>
                          {positions.map(pos => (
                            <option key={pos} value={pos}>{pos}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                  {activeTab === 'admins' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <select
                        required
                        value={newAdmin.role}
                        onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      >
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={activeTab === 'staff' ? newStaff.password : newAdmin.password}
                      onChange={(e) => activeTab === 'staff'
                        ? setNewStaff({...newStaff, password: e.target.value})
                        : setNewAdmin({...newAdmin, password: e.target.value})
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter temporary password"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Add {activeTab === 'staff' ? 'Staff' : 'Admin'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffCustomers;