import React, { useState, useEffect } from "react";
import {
  FaHotel,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  FaEnvelope,
  FaBed,
  FaCheckCircle,
  FaTimesCircle,
  FaUpload,
  FaImage,
} from "react-icons/fa";
import { useAdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useAdminContext();

  // Kenyan counties for dropdown
  const counties = [
    "Baringo",
    "Bomet",
    "Bungoma",
    "Busia",
    "Elgeyo-Marakwet",
    "Embu",
    "Garissa",
    "Homa Bay",
    "Isiolo",
    "Kajiado",
    "Kakamega",
    "Kericho",
    "Kiambu",
    "Kilifi",
    "Kirinyaga",
    "Kisii",
    "Kisumu",
    "Kitui",
    "Kwale",
    "Laikipia",
    "Lamu",
    "Machakos",
    "Makueni",
    "Mandera",
    "Marsabit",
    "Meru",
    "Migori",
    "Mombasa",
    "Murang'a",
    "Nairobi",
    "Nakuru",
    "Nandi",
    "Narok",
    "Nyamira",
    "Nyandarua",
    "Nyeri",
    "Samburu",
    "Siaya",
    "Taita-Taveta",
    "Tana River",
    "Tharaka-Nithi",
    "Trans Nzoia",
    "Turkana",
    "Uasin Gishu",
    "Vihiga",
    "Wajir",
    "West Pokot",
  ];

  const [newHotel, setNewHotel] = useState({
    name: "",
    description: "",
    address: "",
    county: "",
    pricePerNight: "",
    amenities: "",
    contactEmail: "",
    contactPhone: "",
    roomsAvailable: "1",
    isAvailable: "true",
    image: null,
    imagePreview: null,
    images: [],
    imagesPreview: [],
  });

  const [editHotel, setEditHotel] = useState({
    name: "",
    description: "",
    address: "",
    county: "",
    pricePerNight: "",
    amenities: "",
    contactEmail: "",
    contactPhone: "",
    roomsAvailable: "1",
    isAvailable: "true",
    image: null,
    imagePreview: null,
    images: [],
    imagesPreview: [],
  });

  // Fetch hotels
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/hotels/all-hotels`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setHotels(response.data.hotels || []);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast.error("Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Filter hotels based on search
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.county.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Image upload handlers
  const handleMainImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewHotel((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleAdditionalImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newImages = [...newHotel.images, ...files];
      const newPreviews = [
        ...newHotel.imagesPreview,
        ...files.map((file) => URL.createObjectURL(file)),
      ];

      setNewHotel((prev) => ({
        ...prev,
        images: newImages,
        imagesPreview: newPreviews,
      }));
    }
  };

  const handleEditMainImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditHotel((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleEditAdditionalImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newImages = [...editHotel.images, ...files];
      const newPreviews = [
        ...editHotel.imagesPreview,
        ...files.map((file) => URL.createObjectURL(file)),
      ];

      setEditHotel((prev) => ({
        ...prev,
        images: newImages,
        imagesPreview: newPreviews,
      }));
    }
  };

  // Remove additional image
  const removeAdditionalImage = (index) => {
    setNewHotel((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagesPreview: prev.imagesPreview.filter((_, i) => i !== index),
    }));
  };

  const removeEditAdditionalImage = (index) => {
    setEditHotel((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagesPreview: prev.imagesPreview.filter((_, i) => i !== index),
    }));
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    if (type === "main") {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        setNewHotel((prev) => ({
          ...prev,
          image: file,
          imagePreview: URL.createObjectURL(file),
        }));
      }
    } else if (type === "additional") {
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      if (imageFiles.length > 0) {
        const newImages = [...newHotel.images, ...imageFiles];
        const newPreviews = [
          ...newHotel.imagesPreview,
          ...imageFiles.map((file) => URL.createObjectURL(file)),
        ];

        setNewHotel((prev) => ({
          ...prev,
          images: newImages,
          imagesPreview: newPreviews,
        }));
      }
    }
  };

  // Add hotel
  const handleAddHotel = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (
        !newHotel.name?.trim() ||
        !newHotel.address ||
        !newHotel.county ||
        !newHotel.pricePerNight
      ) {
        return toast.error("Name, address, county, and price are required");
      }

      if (!newHotel.image) {
        return toast.error("Hotel main image is required");
      }

      const formData = new FormData();
      formData.append("name", newHotel.name.trim());
      formData.append("description", newHotel.description.trim());
      formData.append("address", newHotel.address.trim());
      formData.append("county", newHotel.county);
      formData.append("pricePerNight", newHotel.pricePerNight);
      formData.append("amenities", newHotel.amenities);
      formData.append("contactEmail", newHotel.contactEmail);
      formData.append("contactPhone", newHotel.contactPhone);
      formData.append("roomsAvailable", newHotel.roomsAvailable);
      formData.append("isAvailable", newHotel.isAvailable);

      formData.append("image", newHotel.image);

      // Append additional images
      newHotel.images.forEach((image, index) => {
        formData.append("images", image);
      });

      const response = await axios.post(
        `${backendUrl}/api/hotels/add-hotel`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to add hotel");
      }

      // Add to local state
      setHotels((prev) => [response.data.hotel, ...prev]);
      setShowAddModal(false);
      setNewHotel({
        name: "",
        description: "",
        address: "",
        county: "",
        pricePerNight: "",
        amenities: "",
        contactEmail: "",
        contactPhone: "",
        roomsAvailable: "1",
        isAvailable: "true",
        image: null,
        imagePreview: null,
        images: [],
        imagesPreview: [],
      });

      toast.success(response.data.message || "Hotel added successfully!");
    } catch (error) {
      console.error("Error adding hotel:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to add hotel"
      );
    } finally {
      setLoading(false);
    }
  };

  // Edit hotel
  const handleEditHotel = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", editHotel.name.trim());
      formData.append("description", editHotel.description.trim());
      formData.append("address", editHotel.address.trim());
      formData.append("county", editHotel.county);
      formData.append("pricePerNight", editHotel.pricePerNight);
      formData.append("amenities", editHotel.amenities);
      formData.append("contactEmail", editHotel.contactEmail);
      formData.append("contactPhone", editHotel.contactPhone);
      formData.append("roomsAvailable", editHotel.roomsAvailable);
      formData.append("isAvailable", editHotel.isAvailable);

      if (editHotel.image) {
        formData.append("image", editHotel.image);
      }

      // Append additional images
      editHotel.images.forEach((image, index) => {
        formData.append("images", image);
      });

      const response = await axios.put(
        `${backendUrl}/api/hotels/update-hotel/${selectedHotel._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update hotel");
      }

      // Update local state
      setHotels((prev) =>
        prev.map((hotel) =>
          hotel._id === selectedHotel._id ? response.data.hotel : hotel
        )
      );

      setShowEditModal(false);
      setSelectedHotel(null);
      setEditHotel({
        name: "",
        description: "",
        address: "",
        county: "",
        pricePerNight: "",
        amenities: "",
        contactEmail: "",
        contactPhone: "",
        roomsAvailable: "1",
        isAvailable: "true",
        image: null,
        imagePreview: null,
        images: [],
        imagesPreview: [],
      });

      toast.success(response.data.message || "Hotel updated successfully!");
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update hotel"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete hotel
  const handleDeleteHotel = async () => {
    if (!selectedHotel) return;
    setLoading(true);

    try {
      const response = await axios.delete(
        `${backendUrl}/api/hotels/delete-hotel/${selectedHotel._id}`,
        {
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete hotel");
      }

      // Remove from local state
      setHotels((prev) =>
        prev.filter((hotel) => hotel._id !== selectedHotel._id)
      );
      setShowDeleteModal(false);
      setSelectedHotel(null);

      toast.success(response.data.message || "Hotel deleted successfully!");
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete hotel"
      );
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (hotel) => {
    setSelectedHotel(hotel);
    setEditHotel({
      name: hotel.name,
      description: hotel.description || "",
      address: hotel.address,
      county: hotel.county,
      pricePerNight: hotel.pricePerNight.toString(),
      amenities: hotel.amenities?.join(", ") || "",
      contactEmail: hotel.contactEmail || "",
      contactPhone: hotel.contactPhone || "",
      roomsAvailable: hotel.roomsAvailable?.toString() || "1",
      isAvailable: hotel.isAvailable?.toString() || "true",
      image: null,
      imagePreview: hotel.image || null,
      images: [],
      imagesPreview: hotel.images || [],
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (hotel) => {
    setSelectedHotel(hotel);
    setShowDeleteModal(true);
  };

  // Toggle availability
  const toggleAvailability = async (hotelId) => {
    try {
      const hotel = hotels.find((h) => h._id === hotelId);
      const newAvailability = !hotel.isAvailable;

      const response = await axios.put(
        `${backendUrl}/api/hotels/update-hotel/${hotelId}`,
        {
          isAvailable: newAvailability,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        // Update local state
        setHotels((prev) =>
          prev.map((h) =>
            h._id === hotelId ? { ...h, isAvailable: newAvailability } : h
          )
        );
        toast.success("Hotel availability updated!");
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error("Failed to update hotel availability");
    }
  };

  const getStatusColor = (isAvailable) => {
    return isAvailable
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getStatusIcon = (isAvailable) => {
    return isAvailable ? (
      <FaCheckCircle className="h-3 w-3" />
    ) : (
      <FaTimesCircle className="h-3 w-3" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hotel Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your hotel listings and availability
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <p className="text-emerald-700 font-medium">
            Total Hotels:{" "}
            <span className="text-emerald-800">{hotels.length}</span>
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Available Hotels
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {hotels.filter((hotel) => hotel.isAvailable).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <FaCheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Unavailable Hotels
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {hotels.filter((hotel) => !hotel.isAvailable).length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <FaTimesCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {hotels.reduce(
                  (total, hotel) => total + (hotel.roomsAvailable || 0),
                  0
                )}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaBed className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg Price/Night
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                Kes{" "}
                {hotels.length > 0
                  ? Math.round(
                      hotels.reduce(
                        (total, hotel) => total + hotel.pricePerNight,
                        0
                      ) / hotels.length
                    )
                  : 0}
              </p>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl">
              <FaMoneyBillWave className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search hotels by name, address, or county..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FaPlus className="h-4 w-4" />
            Add Hotel
          </button>
        </div>
      </div>

      {/* Hotels Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading hotels...</p>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="text-center py-12">
            <FaHotel className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              No hotels found
            </h3>
            <p className="text-gray-400">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start by adding your first hotel"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hotel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price/Night
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rooms
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
                {filteredHotels.map((hotel) => (
                  <tr
                    key={hotel._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {hotel.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {hotel.amenities?.slice(0, 2).join(", ")}
                            {hotel.amenities?.length > 2 && "..."}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {hotel.county}
                      </div>
                      <div className="text-sm text-gray-500">
                        {hotel.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Kes {hotel.pricePerNight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {hotel.roomsAvailable || 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleAvailability(hotel._id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${getStatusColor(
                          hotel.isAvailable
                        )} hover:opacity-80`}
                      >
                        {getStatusIcon(hotel.isAvailable)}
                        {hotel.isAvailable ? "Available" : "Unavailable"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(hotel)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(hotel)}
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

      {/* Add Hotel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Add New Hotel</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleAddHotel}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hotel Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newHotel.name}
                        onChange={(e) =>
                          setNewHotel({ ...newHotel, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="Enter hotel name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={newHotel.description}
                        onChange={(e) =>
                          setNewHotel({
                            ...newHotel,
                            description: e.target.value,
                          })
                        }
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
                        placeholder="Hotel description..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={newHotel.address}
                        onChange={(e) =>
                          setNewHotel({ ...newHotel, address: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="Street address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        County *
                      </label>
                      <select
                        required
                        value={newHotel.county}
                        onChange={(e) =>
                          setNewHotel({ ...newHotel, county: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      >
                        <option value="">Select County</option>
                        {counties.map((county) => (
                          <option key={county} value={county}>
                            {county}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Per Night (KES) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={newHotel.pricePerNight}
                        onChange={(e) =>
                          setNewHotel({
                            ...newHotel,
                            pricePerNight: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amenities
                      </label>
                      <input
                        type="text"
                        value={newHotel.amenities}
                        onChange={(e) =>
                          setNewHotel({
                            ...newHotel,
                            amenities: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="Free WiFi, Pool, Breakfast, etc. (comma separated)"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={newHotel.contactEmail}
                          onChange={(e) =>
                            setNewHotel({
                              ...newHotel,
                              contactEmail: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={newHotel.contactPhone}
                          onChange={(e) =>
                            setNewHotel({
                              ...newHotel,
                              contactPhone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                          placeholder="+254..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rooms Available
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={newHotel.roomsAvailable}
                          onChange={(e) =>
                            setNewHotel({
                              ...newHotel,
                              roomsAvailable: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={newHotel.isAvailable}
                          onChange={(e) =>
                            setNewHotel({
                              ...newHotel,
                              isAvailable: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                        >
                          <option value="true">Available</option>
                          <option value="false">Unavailable</option>
                        </select>
                      </div>
                    </div>

                    {/* Main Image Upload */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FaImage className="h-4 w-4 text-emerald-600" />
                        Main Hotel Image *
                      </label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-emerald-400 transition-all duration-200 cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, "main")}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMainImageUpload}
                          className="hidden"
                          id="hotel-main-image"
                          required
                        />
                        <label
                          htmlFor="hotel-main-image"
                          className="cursor-pointer"
                        >
                          {newHotel.imagePreview ? (
                            <div className="flex flex-col items-center">
                              <img
                                src={newHotel.imagePreview}
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
                                Click or drag main image here
                              </p>
                              <p className="text-gray-400 text-sm mt-1">
                                PNG, JPG, JPEG up to 5MB
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Additional Images Upload */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FaImage className="h-4 w-4 text-emerald-600" />
                        Additional Room Images
                      </label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-emerald-400 transition-all duration-200 cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, "additional")}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAdditionalImagesUpload}
                          className="hidden"
                          id="hotel-additional-images"
                          multiple
                        />
                        <label
                          htmlFor="hotel-additional-images"
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col items-center">
                            <FaUpload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-gray-600 font-medium">
                              Click or drag additional images
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                              Multiple images allowed
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Additional Images Preview */}
                      {newHotel.imagesPreview.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Additional Images ({newHotel.imagesPreview.length})
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {newHotel.imagesPreview.map((preview, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  className="h-16 w-16 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeAdditionalImage(index)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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
                    disabled={loading}
                    className={`px-6 py-2 rounded-xl transition-colors ${
                      loading
                        ? "bg-emerald-400 cursor-not-allowed text-white"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    {loading ? "Adding..." : "Add Hotel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Hotel Modal - Similar structure to Add Modal but with existing data */}

      {showEditModal && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Edit Hotel</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleEditHotel}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hotel Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editHotel.name}
                        onChange={(e) =>
                          setEditHotel({ ...editHotel, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="Enter hotel name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editHotel.description}
                        onChange={(e) =>
                          setEditHotel({
                            ...editHotel,
                            description: e.target.value,
                          })
                        }
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
                        placeholder="Hotel description..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={editHotel.address}
                        onChange={(e) =>
                          setEditHotel({
                            ...editHotel,
                            address: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="Street address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        County *
                      </label>
                      <select
                        required
                        value={editHotel.county}
                        onChange={(e) =>
                          setEditHotel({ ...editHotel, county: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                      >
                        <option value="">Select County</option>
                        {counties.map((county) => (
                          <option key={county} value={county}>
                            {county}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Per Night (KES) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={editHotel.pricePerNight}
                        onChange={(e) =>
                          setEditHotel({
                            ...editHotel,
                            pricePerNight: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amenities
                      </label>
                      <input
                        type="text"
                        value={editHotel.amenities}
                        onChange={(e) =>
                          setEditHotel({
                            ...editHotel,
                            amenities: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="Free WiFi, Pool, Breakfast, etc. (comma separated)"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={editHotel.contactEmail}
                          onChange={(e) =>
                            setEditHotel({
                              ...editHotel,
                              contactEmail: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={editHotel.contactPhone}
                          onChange={(e) =>
                            setEditHotel({
                              ...editHotel,
                              contactPhone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                          placeholder="+254..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rooms Available
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={editHotel.roomsAvailable}
                          onChange={(e) =>
                            setEditHotel({
                              ...editHotel,
                              roomsAvailable: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={editHotel.isAvailable}
                          onChange={(e) =>
                            setEditHotel({
                              ...editHotel,
                              isAvailable: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
                        >
                          <option value="true">Available</option>
                          <option value="false">Unavailable</option>
                        </select>
                      </div>
                    </div>

                    {/* Main Image Upload */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FaImage className="h-4 w-4 text-emerald-600" />
                        Main Hotel Image
                      </label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-emerald-400 transition-all duration-200 cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files[0];
                          if (file && file.type.startsWith("image/")) {
                            setEditHotel((prev) => ({
                              ...prev,
                              image: file,
                              imagePreview: URL.createObjectURL(file),
                            }));
                          }
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditMainImageUpload}
                          className="hidden"
                          id="edit-hotel-main-image"
                        />
                        <label
                          htmlFor="edit-hotel-main-image"
                          className="cursor-pointer"
                        >
                          {editHotel.imagePreview ? (
                            <div className="flex flex-col items-center">
                              <img
                                src={editHotel.imagePreview}
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
                                Click or drag to change main image
                              </p>
                              <p className="text-gray-400 text-sm mt-1">
                                PNG, JPG, JPEG up to 5MB
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                      {selectedHotel.image && !editHotel.imagePreview && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-2">
                            Current Image:
                          </p>
                          <img
                            src={selectedHotel.image}
                            alt="Current"
                            className="h-20 w-20 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    {/* Additional Images Upload */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FaImage className="h-4 w-4 text-emerald-600" />
                        Additional Room Images
                      </label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-emerald-400 transition-all duration-200 cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={(e) => {
                          e.preventDefault();
                          const files = Array.from(e.dataTransfer.files);
                          const imageFiles = files.filter((file) =>
                            file.type.startsWith("image/")
                          );
                          if (imageFiles.length > 0) {
                            const newImages = [
                              ...editHotel.images,
                              ...imageFiles,
                            ];
                            const newPreviews = [
                              ...editHotel.imagesPreview,
                              ...imageFiles.map((file) =>
                                URL.createObjectURL(file)
                              ),
                            ];

                            setEditHotel((prev) => ({
                              ...prev,
                              images: newImages,
                              imagesPreview: newPreviews,
                            }));
                          }
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditAdditionalImagesUpload}
                          className="hidden"
                          id="edit-hotel-additional-images"
                          multiple
                        />
                        <label
                          htmlFor="edit-hotel-additional-images"
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col items-center">
                            <FaUpload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-gray-600 font-medium">
                              Click or drag to add more images
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                              Multiple images allowed
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Current Additional Images */}
                      {selectedHotel.images &&
                        selectedHotel.images.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Current Room Images ({selectedHotel.images.length}
                              )
                            </p>
                            <div className="grid grid-cols-4 gap-2">
                              {selectedHotel.images.map((image, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={image}
                                    alt={`Room ${index + 1}`}
                                    className="h-16 w-16 object-cover rounded-lg"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* New Additional Images Preview */}
                      {editHotel.imagesPreview.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            New Images to Add ({editHotel.imagesPreview.length})
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {editHotel.imagesPreview.map((preview, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={preview}
                                  alt={`New Preview ${index + 1}`}
                                  className="h-16 w-16 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeEditAdditionalImage(index)
                                  }
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 rounded-xl transition-colors ${
                      loading
                        ? "bg-emerald-400 cursor-not-allowed text-white"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    {loading ? "Updating..." : "Update Hotel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrash className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Delete Hotel
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete{" "}
              <strong>"{selectedHotel.name}"</strong>? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteHotel}
                disabled={loading}
                className={`px-6 py-2 rounded-xl transition-colors ${
                  loading
                    ? "bg-red-400 cursor-not-allowed text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelManagement;
