import React, { useEffect, useState } from "react";
import { 
  FaUpload, FaEdit, FaTrash, FaSearch, FaFilter, FaPlus, 
  FaEye, FaEyeSlash, FaChair, FaUsers, FaMoneyBillWave,
  FaImage, FaTimes, FaCheckCircle, FaExclamationTriangle
} from "react-icons/fa";
import { MdTableRestaurant, MdCategory, MdDescription } from "react-icons/md";
import axios from "axios";
import { useAdminContext } from "../context/AdminContext";
import { toast } from 'react-toastify';

const Table = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    maxSeats: "",
    currentSeats: "",
    description: "",
    price: "",
    available: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { backendUrl } = useAdminContext();
  const [tables, setTables] = useState([]);
  const [editingTable, setEditingTable] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: newValue 
    }));

    // Real-time validation
    validateField(name, newValue);
  };

  // Field validation
  const validateField = (name, value) => {
    const errors = { ...formErrors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Table name is required';
        } else if (value.length < 2) {
          errors.name = 'Table name must be at least 2 characters';
        } else {
          delete errors.name;
        }
        break;
      
      case 'maxSeats':
        if (!value || value < 1) {
          errors.maxSeats = 'Max seats must be at least 1';
        } else if (value > 100) {
          errors.maxSeats = 'Max seats cannot exceed 100';
        } else {
          delete errors.maxSeats;
        }
        break;
      
      case 'currentSeats':
        if (!value || value < 0) {
          errors.currentSeats = 'Current seats cannot be negative';
        } else if (parseInt(value) > parseInt(formData.maxSeats || 0)) {
          errors.currentSeats = 'Current seats cannot exceed max seats';
        } else {
          delete errors.currentSeats;
        }
        break;
      
      case 'price':
        if (!value || value < 0) {
          errors.price = 'Price must be a positive number';
        } else {
          delete errors.price;
        }
        break;
      
      case 'description':
        if (!value.trim()) {
          errors.description = 'Description is required';
        } else if (value.length < 10) {
          errors.description = 'Description must be at least 10 characters';
        } else {
          delete errors.description;
        }
        break;
      
      default:
        break;
    }
    
    setFormErrors(errors);
  };

  // Form validation before submit
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Table name is required';
    if (!formData.type) errors.type = 'Table type is required';
    if (!formData.maxSeats || formData.maxSeats < 1) errors.maxSeats = 'Valid max seats required';
    if (!formData.currentSeats || formData.currentSeats < 0) errors.currentSeats = 'Valid current seats required';
    if (parseInt(formData.currentSeats) > parseInt(formData.maxSeats)) {
      errors.currentSeats = 'Current seats cannot exceed max seats';
    }
    if (!formData.price || formData.price < 0) errors.price = 'Valid price required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!preview && !editingTable) errors.image = 'Table image is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Drag & Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleImageFile(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleImageFile(file);
  };

  const handleImageFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setFormErrors(prev => ({ ...prev, image: undefined }));
    }
  };

  // Fetch all tables
  const fetchTables = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tables`, {
        withCredentials: true,
      });

      if (!response.data.success) throw new Error(response.data.message);
      setTables(response.data.tables || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch tables");
    }
  };

  // Handle form submit with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      toast.error("Please fix the form errors before submitting");
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (image) data.append("image", image);

      const url = editingTable 
        ? `${backendUrl}/api/tables/update/${editingTable._id}`
        : `${backendUrl}/api/tables/add`;

      const method = editingTable ? 'put' : 'post';

      const response = await axios[method](url, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message || (editingTable ? "Table updated successfully!" : "Table added successfully!"));
        
        if (editingTable) {
          setTables(prev => prev.map(table => 
            table._id === editingTable._id ? response.data.table : table
          ));
        } else {
          setTables((prev) => [...prev, response.data.table]);
        }
        
        resetForm();
      } else {
        toast.error(response.data.message || "Failed to save table.");
      }
    } catch (error) {
      console.error("Error saving table:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong while saving the table.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (table) => {
    setEditingTable(table);
    setFormData({
      name: table.name,
      type: table.type,
      maxSeats: table.maxSeats,
      currentSeats: table.currentSeats,
      description: table.description,
      price: table.price,
      available: table.available,
    });
    setPreview(table.image);
    setShowForm(true);
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open delete confirmation modal
  const openDeleteModal = (table) => {
    setSelectedTable(table);
    setShowDeleteModal(true);
  };

  // Handle delete confirmation
  const confirmDelete = async () => {
    if (!selectedTable) return;
    
    setActionLoading(true);
    try {
      const response = await axios.delete(`${backendUrl}/api/tables/delete/${selectedTable._id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setTables(prev => prev.filter(table => table._id !== selectedTable._id));
        toast.success("Table deleted successfully!");
        setShowDeleteModal(false);
        setSelectedTable(null);
      } else {
        toast.error(response.data.message || "Failed to delete table.");
      }
    } catch (error) {
      console.error("Error deleting table:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete table.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Open toggle confirmation modal
  const openToggleModal = (table) => {
    setSelectedTable(table);
    setShowToggleModal(true);
  };

  // Toggle availability with confirmation
  const confirmToggleAvailability = async () => {
    if (!selectedTable) return;

    setActionLoading(true);
    try {
      const response = await axios.put(
        `${backendUrl}/api/tables/update/${selectedTable._id}`,
        { available: !selectedTable.available },
        { withCredentials: true }
      );

      if (response.data.success) {
        setTables(prev => prev.map(t => 
          t._id === selectedTable._id ? { ...t, available: !t.available } : t
        ));
        toast.success(`Table ${!selectedTable.available ? 'activated' : 'deactivated'} successfully!`);
        setShowToggleModal(false);
        setSelectedTable(null);
      } else {
        toast.error(response.data.message || "Failed to update table availability.");
      }
    } catch (error) {
      console.error("Error updating table:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update table availability.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      maxSeats: "",
      currentSeats: "",
      description: "",
      price: "",
      available: true,
    });
    setImage(null);
    setPreview(null);
    setEditingTable(null);
    setShowForm(false);
    setFormErrors({});
  };

  // Close modals
  const closeModals = () => {
    setShowDeleteModal(false);
    setShowToggleModal(false);
    setSelectedTable(null);
    setActionLoading(false);
  };

  // Filter logic
  const filteredTables = tables.filter((table) => {
    const matchSearch =
      table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAvailability =
      availabilityFilter === ""
        ? true
        : availabilityFilter === "true"
        ? table.available
        : !table.available;
    const matchType = typeFilter === "" || table.type === typeFilter;

    return matchSearch && matchAvailability && matchType;
  });

  // Stats calculation
  const stats = {
    total: tables.length,
    available: tables.filter(t => t.available).length,
    occupied: tables.filter(t => !t.available).length,
    indoor: tables.filter(t => t.type === 'indoor').length,
    outdoor: tables.filter(t => t.type === 'outdoor').length,
    private: tables.filter(t => t.type === 'private').length,
    bar: tables.filter(t => t.type === 'bar').length,
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <MdTableRestaurant className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Table Management</h1>
              <p className="text-gray-600 mt-1">Manage your restaurant tables and seating arrangements</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaPlus className="text-sm" />
            {showForm ? "Close Form" : "Add New Table"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tables</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-red-600">{stats.occupied}</div>
            <div className="text-sm text-gray-600">Occupied</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{stats.indoor}</div>
            <div className="text-sm text-gray-600">Indoor</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-amber-600">{stats.outdoor}</div>
            <div className="text-sm text-gray-600">Outdoor</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">{stats.private}</div>
            <div className="text-sm text-gray-600">Private</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-cyan-600">{stats.bar}</div>
            <div className="text-sm text-gray-600">Bar</div>
          </div>
        </div>
      </div>

      {/* Add/Edit Table Form */}
      {showForm && (
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingTable ? "Edit Table" : "Create New Table"}
              </h2>
              <p className="text-gray-600 mt-1">
                {editingTable ? "Update table details" : "Add a new table to your restaurant"}
              </p>
            </div>
            {editingTable && (
              <button
                onClick={resetForm}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaTimes />
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Table Name */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <MdTableRestaurant className="text-blue-500" />
                  Table Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Family Table, Romantic Corner..."
                  className={`p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <FaExclamationTriangle className="text-xs" />
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Table Type */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <MdCategory className="text-purple-500" />
                  Table Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className={`p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.type ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select table type</option>
                  <option value="indoor">🏠 Indoor</option>
                  <option value="outdoor">🌳 Outdoor</option>
                  <option value="private">🚪 Private Room</option>
                  <option value="bar">🍻 Bar Counter</option>
                </select>
                {formErrors.type && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.type}</p>
                )}
              </div>

              {/* Max Seats */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <FaUsers className="text-green-500" />
                  Maximum Seats
                </label>
                <input
                  type="number"
                  name="maxSeats"
                  value={formData.maxSeats}
                  onChange={handleChange}
                  required
                  min="1"
                  max="100"
                  placeholder="e.g., 4, 6, 8..."
                  className={`p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.maxSeats ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {formErrors.maxSeats && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.maxSeats}</p>
                )}
              </div>

              {/* Current Seats */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <FaChair className="text-amber-500" />
                  Current Seats
                </label>
                <input
                  type="number"
                  name="currentSeats"
                  value={formData.currentSeats}
                  onChange={handleChange}
                  required
                  min="0"
                  max={formData.maxSeats || 100}
                  placeholder="Currently occupied seats"
                  className={`p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.currentSeats ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {formErrors.currentSeats && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.currentSeats}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Must be less than or equal to {formData.maxSeats || 'maximum'} seats
                </p>
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-500" />
                  Price (KES)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="50"
                  placeholder="Reservation fee in KES"
                  className={`p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {formErrors.price && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.price}</p>
                )}
              </div>

              {/* Availability */}
              <div className="flex flex-col justify-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="available"
                      checked={formData.available}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      formData.available ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      formData.available ? 'transform translate-x-6' : ''
                    }`}></div>
                  </div>
                  <span className="font-semibold text-gray-700">
                    {formData.available ? 'Available for Reservation' : 'Not Available'}
                  </span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                <MdDescription className="text-cyan-500" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Describe this table... (e.g., 'Perfect for family gatherings with a view of the garden')"
                className={`p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  formErrors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {formErrors.description && (
                <p className="text-red-600 text-sm mt-1">{formErrors.description}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                <FaImage className="text-pink-500" />
                Table Image
                {formErrors.image && (
                  <span className="text-red-600 text-sm ml-2">({formErrors.image})</span>
                )}
              </label>
              <div
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-all ${
                  dragActive
                    ? "border-blue-500 bg-blue-50 scale-105"
                    : formErrors.image 
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex flex-col items-center gap-4 text-gray-600 text-center"
                >
                  <div className="p-4 bg-blue-100 rounded-full">
                    <FaUpload className="text-2xl text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-lg">Drag & Drop or Click to Upload</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                  </div>
                </label>
                {preview && (
                  <div className="mt-6 text-center">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-48 h-32 mx-auto object-cover rounded-xl shadow-md border-2 border-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => { setPreview(null); setImage(null); }}
                      className="mt-3 flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <FaTimes />
                      Remove Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || Object.keys(formErrors).length > 0}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {editingTable ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    {editingTable ? "Update Table" : "Create Table"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tables Display Section */}
      <div className="max-w-7xl mx-auto">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tables by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-40"
                  >
                    <option value="">All Status</option>
                    <option value="true">Available</option>
                    <option value="false">Occupied</option>
                  </select>
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-40"
                >
                  <option value="">All Types</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="private">Private</option>
                  <option value="bar">Bar</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
              {filteredTables.length} of {tables.length} tables
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        {filteredTables.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tables found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || availabilityFilter || typeFilter
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first table!"}
            </p>
            {!searchTerm && !availabilityFilter && !typeFilter && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                Add Your First Table
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTables.map((table) => (
              <div
                key={table._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                <div className="relative">
                  <img
                    src={table.image}
                    alt={table.name}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                    table.available 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}>
                    {table.available ? "Available" : "Occupied"}
                  </div>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                    table.type === 'indoor' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    table.type === 'outdoor' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    table.type === 'private' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                    'bg-cyan-100 text-cyan-800 border border-cyan-200'
                  }`}>
                    {table.type}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800">{table.name}</h3>
                    <span className="text-green-700 font-bold text-lg">KES {table.price}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{table.description}</p>
                  
                  {/* Seats Information */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Seating Capacity</span>
                      <div className="flex items-center gap-1">
                        <FaChair className="text-amber-500 text-sm" />
                        <span className="text-sm font-semibold">
                          {table.currentSeats} / {table.maxSeats}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min((table.currentSeats / table.maxSeats) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(table)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <FaEdit className="text-sm" />
                      Edit
                    </button>
                    <button
                      onClick={() => openToggleModal(table)}
                      className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors shadow-sm ${
                        table.available
                          ? "bg-amber-600 text-white hover:bg-amber-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {table.available ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button
                      onClick={() => openDeleteModal(table)}
                      className="flex items-center justify-center gap-2 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-auto shadow-2xl transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FaExclamationTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Table</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">"{selectedTable?.name}"</span>? This action cannot be undone.
              </p>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={closeModals}
                  disabled={actionLoading}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={actionLoading}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FaTrash className="text-sm" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Availability Confirmation Modal */}
      {showToggleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-auto shadow-2xl transform transition-all">
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${
                selectedTable?.available ? 'bg-amber-100' : 'bg-green-100'
              }`}>
                {selectedTable?.available ? (
                  <FaEyeSlash className="h-6 w-6 text-amber-600" />
                ) : (
                  <FaEye className="h-6 w-6 text-green-600" />
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {selectedTable?.available ? 'Deactivate Table' : 'Activate Table'}
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {selectedTable?.available ? 'deactivate' : 'activate'} 
                <span className="font-semibold"> "{selectedTable?.name}"</span>? 
                {selectedTable?.available 
                  ? ' This will make it unavailable for reservations.' 
                  : ' This will make it available for reservations.'
                }
              </p>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={closeModals}
                  disabled={actionLoading}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmToggleAvailability}
                  disabled={actionLoading}
                  className={`px-6 py-3 text-white rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50 ${
                    selectedTable?.available 
                      ? 'bg-amber-600 hover:bg-amber-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {actionLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      {selectedTable?.available ? <FaEyeSlash /> : <FaEye />}
                      {selectedTable?.available ? 'Deactivate' : 'Activate'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;