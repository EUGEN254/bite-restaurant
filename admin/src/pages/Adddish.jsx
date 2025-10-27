import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaUpload,
  FaUtensils,
  FaImage,
  FaTag,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaAlignLeft,
} from "react-icons/fa";
import { useAdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Adddish = () => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { currSymbol, backendUrl, addDish, dishes, removeDish, updateDish } =
    useAdminContext();
  const [loading, setIsLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [form, setForm] = useState({
    category: "",
    dishname: "",
    amount: "",
    description: "",
    status: "available",
    image: null,
    imagePreview: null,
  });

  const [editForm, setEditForm] = useState({
    category: "",
    dishname: "",
    amount: "",
    description: "",
    status: "available",
    image: null,
    imagePreview: null,
  });

  // Mock categories
  const categories = [
    { id: 1, name: "Appetizers" },
    { id: 2, name: "Main Course" },
    { id: 3, name: "Desserts" },
    { id: 4, name: "Beverages" },
    { id: 5, name: "Salads" },
    { id: 6, name: "Specials" },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleEditImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.dishname?.trim() || !form.amount || !form.image) {
      return toast.error("Dish name, amount, and image are required");
    }

    if (!form.category) {
      return toast.error("Please select a category");
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("category", form.category);
    formData.append("dishname", form.dishname.trim());
    formData.append("amount", parseFloat(form.amount));
    formData.append(
      "description",
      form.description || "No description provided"
    );
    formData.append("status", form.status);
    if (form.image) {
      formData.append("image", form.image);
    }

    setIsLoading(true);

    try {
      // sending to backend
      const response = await axios.post(
        `${backendUrl}/api/dishes/add-dish`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to add dish");
      }

      addDish(response.data.dish);
      toast.success(response.data.message);

      // Reset form after successful submission
      setForm({
        category: "",
        dishname: "",
        amount: "",
        description: "",
        status: "available",
        image: null,
        imagePreview: null,
      });
    } catch (error) {
      console.error("Add dish error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to add dish"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!editForm.dishname?.trim() || !editForm.amount) {
      return toast.error("Dish name and amount are required");
    }

    if (!editForm.category) {
      return toast.error("Please select a category");
    }

    const formData = new FormData();
    formData.append("category", editForm.category);
    formData.append("dishname", editForm.dishname.trim());
    formData.append("amount", parseFloat(editForm.amount));
    formData.append("description", editForm.description || "No description provided");
    formData.append("status", editForm.status);
    if (editForm.image) {
      formData.append("image", editForm.image);
    }

    setEditLoading(true);

    try {
      const response = await axios.put(
        `${backendUrl}/api/dishes/update-dish/${editModal._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update dish");
      }

      updateDish(editModal._id, response.data.dish);
      toast.success(response.data.message);
      closeEditModal();
    } catch (error) {
      console.error("Update dish error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to update dish"
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleEditDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setEditForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // edit and delete functions
  const openEditModal = (dish) => {
    setEditModal(dish);
    setEditForm({
      category: dish.category || "",
      dishname: dish.name || dish.dishname || "",
      amount: dish.price || dish.amount || "",
      description: dish.description || "",
      status: dish.isAvailable ? "available" : "unavailable",
      image: null,
      imagePreview: dish.image || null,
    });
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditForm({
      category: "",
      dishname: "",
      amount: "",
      description: "",
      status: "available",
      image: null,
      imagePreview: null,
    });
  };

  // delete
  const openDeleteModal = (id) => setDeleteModal({ open: true, dishId: id });
  const closeDeleteModal = () => setDeleteModal({ open: false, dishId: null });

  const confirmDelete = async () => {
    if (!deleteModal.dishId) return;
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        `${backendUrl}/api/dishes/delete-dish/${deleteModal.dishId}`, 
        {
          withCredentials: true,
        }
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete dish");
      }

      removeDish(deleteModal.dishId);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to delete dish");
    } finally {
      setDeleteLoading(false);
      closeDeleteModal();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
          <p className="text-gray-600 mt-2">
            Add and manage your restaurant dishes
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <p className="text-emerald-700 font-medium">
            Total Dishes:{" "}
            <span className="text-emerald-800">{dishes.length}</span>
          </p>
        </div>
      </div>

      {/* Add Dish Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <FaUtensils className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Add New Dish</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaTag className="h-4 w-4 text-emerald-600" />
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dish Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaUtensils className="h-4 w-4 text-emerald-600" />
              Dish Name
            </label>
            <input
              name="dishname"
              value={form.dishname}
              onChange={handleChange}
              type="text"
              placeholder="Enter dish name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaDollarSign className="h-4 w-4 text-emerald-600" />
              Amount ({currSymbol})
            </label>
            <input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaCheckCircle className="h-4 w-4 text-emerald-600" />
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
            >
              <option value="available">Available</option>
              <option value="unavailable">Not Available</option>
            </select>
          </div>

          {/* Description - Full Width */}
          <div className="lg:col-span-2 space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaAlignLeft className="h-4 w-4 text-emerald-600" />
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Type a brief description of the dish"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
            />
          </div>

          {/* Image Upload - Full Width */}
          <div className="lg:col-span-2 space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaImage className="h-4 w-4 text-emerald-600" />
              Dish Image
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-emerald-400 transition-all duration-200 cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="dish-image"
              />
              <label htmlFor="dish-image" className="cursor-pointer">
                {form.imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={form.imagePreview}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-xl mb-4 shadow-md"
                    />
                    <span className="text-emerald-600 font-medium">
                      Change Image
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FaUpload className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 font-medium">
                      Click or drag image here
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`
                px-8 py-3 rounded-xl font-medium transition-all duration-200
                ${
                  loading
                    ? "bg-green-400 text-white cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }
              `}
            >
              {loading ? "Adding Dish..." : "Add Dish"}
            </button>
          </div>
        </form>
      </div>

      {/* Dishes Table Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaUtensils className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">My Dishes</h2>
          </div>
          <div className="text-sm text-gray-500">
            {dishes.length} dish{dishes.length !== 1 ? "es" : ""}
          </div>
        </div>

        {dishes.length === 0 ? (
          <div className="text-center py-12">
            <FaUtensils className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              No dishes added yet
            </h3>
            <p className="text-gray-400">
              Start by adding your first dish above
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dish Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dishes.map((dish, index) => (
                  <tr
                    key={dish._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {dish.name || dish.dishname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {dish.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          dish.isAvailable || dish.status === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {dish.isAvailable || dish.status === "available" ? (
                          <>
                            <FaCheckCircle className="h-3 w-3 mr-1" />
                            Available
                          </>
                        ) : (
                          <>
                            <FaTimesCircle className="h-3 w-3 mr-1" />
                            Not Available
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {currSymbol}
                      {dish.price || dish.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(dish.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dish.image && (
                        <img
                          src={dish.image}
                          alt={dish.name || dish.dishname}
                          className="h-10 w-10 object-cover rounded-lg shadow-sm"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(dish)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(dish._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash className="h-4 w-4" />
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

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Edit Dish</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleEditSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaTag className="h-4 w-4 text-emerald-600" />
                    Category
                  </label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dish Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaUtensils className="h-4 w-4 text-emerald-600" />
                    Dish Name
                  </label>
                  <input
                    name="dishname"
                    value={editForm.dishname}
                    onChange={handleEditChange}
                    type="text"
                    placeholder="Enter dish name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaDollarSign className="h-4 w-4 text-emerald-600" />
                    Amount ({currSymbol})
                  </label>
                  <input
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaCheckCircle className="h-4 w-4 text-emerald-600" />
                    Status
                  </label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                  >
                    <option value="available">Available</option>
                    <option value="unavailable">Not Available</option>
                  </select>
                </div>

                {/* Description - Full Width */}
                <div className="lg:col-span-2 space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaAlignLeft className="h-4 w-4 text-emerald-600" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    placeholder="Type a brief description of the dish"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Image Upload - Full Width */}
                <div className="lg:col-span-2 space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaImage className="h-4 w-4 text-emerald-600" />
                    Dish Image
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-emerald-400 transition-all duration-200 cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleEditDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageUpload}
                      className="hidden"
                      id="edit-dish-image"
                    />
                    <label htmlFor="edit-dish-image" className="cursor-pointer">
                      {editForm.imagePreview ? (
                        <div className="flex flex-col items-center">
                          <img
                            src={editForm.imagePreview}
                            alt="Preview"
                            className="h-32 w-32 object-cover rounded-xl mb-4 shadow-md"
                          />
                          <span className="text-emerald-600 font-medium">
                            Change Image
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <FaUpload className="h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-gray-600 font-medium">
                            Click or drag image here
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="lg:col-span-2 flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className={`
                      px-6 py-2 rounded-xl font-medium transition-colors
                      ${
                        editLoading
                          ? "bg-emerald-400 text-white cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white"
                      }
                    `}
                  >
                    {editLoading ? "Updating..." : "Update Dish"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrash className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Delete Dish
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this dish? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={closeDeleteModal}
                disabled={deleteLoading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className={`
                  px-6 py-2 rounded-xl transition-colors
                  ${
                    deleteLoading
                      ? "bg-red-400 text-white cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }
                `}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adddish;