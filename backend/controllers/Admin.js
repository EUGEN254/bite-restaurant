import { v2 as cloudinary } from "cloudinary";
import PopularDishes from "../models/popularDishesSchema.js";
import User from "../models/userSchema.js";
import Category from "../models/categorySchema.js";
import Hotel from "../models/hotelSchema.js";
import tableSchema from "../models/tableSchema.js";

// adding dish
const addDish = async (req, res) => {
  try {
    const { category, dishname, amount, status, description } = req.body;

    if (!category || !dishname || !amount) {
      return res.status(400).json({
        success: false,
        message: "Category, dish name, and amount are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Dish image is required",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "dishes",
    });

    const newDish = new PopularDishes({
      name: dishname,
      price: parseFloat(amount),
      category,
      isAvailable: status === "available",
      image: result.secure_url,
      description: description || "No description provided", // Use provided description
    });

    const savedDish = await newDish.save();

    res.status(201).json({
      success: true,
      message: "Dish added successfully",
      dish: savedDish,
    });
  } catch (error) {
    console.error("Add dish error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists and is authenticated
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const dish = await PopularDishes.findById(id);
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    // Delete image from Cloudinary
    if (dish.image) {
      const publicId = dish.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`dishes/${publicId}`);
    }

    await PopularDishes.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Dish deleted successfully",
      dishId: id,
    });
  } catch (err) {
    console.error("Delete dish error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete dish",
      error: err.message,
    });
  }
};

const getAllDishes = async (req, res) => {
  try {
    const dishes = await PopularDishes.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      dishes,
      message: "Dishes fetched successfully",
      count: dishes.length,
    });
  } catch (error) {
    console.error("Get all dishes error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dishes",
      error: error.message,
    });
  }
};

//  Update dish
const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, dishname, amount, status, description } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const dish = await PopularDishes.findById(id);
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    // Update fields
    if (category) dish.category = category;
    if (dishname) dish.name = dishname;
    if (amount) dish.price = parseFloat(amount);
    if (status) dish.isAvailable = status === "available";
    if (description) dish.description = description;

    // Handle image update if new file is provided
    if (req.file) {
      // Delete old image from Cloudinary
      if (dish.image) {
        const publicId = dish.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`dishes/${publicId}`);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "dishes",
      });
      dish.image = result.secure_url;
    }

    const updatedDish = await dish.save();

    res.status(200).json({
      success: true,
      message: "Dish updated successfully",
      dish: updatedDish,
    });
  } catch (error) {
    console.error("Update dish error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update dish",
      error: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    // Get all categories
    const categories = await Category.find({}).sort({ createdAt: -1 });

    // Get dish counts by category
    const dishCounts = await PopularDishes.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert dish counts to a lookup object
    const dishCountMap = {};
    dishCounts.forEach((item) => {
      dishCountMap[item._id] = item.count;
    });

    // Add dish counts to categories
    const categoriesWithCounts = categories.map((category) => ({
      ...category.toObject(),
      dishesCount: dishCountMap[category.name] || 0,
    }));

    res.status(200).json({
      success: true,
      data: categoriesWithCounts,
    });
  } catch (error) {
    console.error("Fetch categories error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add new category
const addCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    // Handle image upload if provided
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "categories",
      });
      imageUrl = result.secure_url;
    }

    const category = await Category.create({
      name: name.trim(),
      description: description?.trim() || "",
      status: status || "active",
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: category,
    });
  } catch (error) {
    console.error("Add category error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // If name is being updated, check for duplicates
    if (name && name.trim() !== category.name) {
      const existingCategory = await Category.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category with this name already exists",
        });
      }
      category.name = name.trim();
    }

    if (description !== undefined) category.description = description.trim();
    if (status) category.status = status;

    // Handle image update if new file is provided
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (category.image) {
        const publicId = category.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`categories/${publicId}`);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "categories",
      });
      category.image = result.secure_url;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: category,
    });
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add new hotel
const addHotel = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      county,
      pricePerNight,
      amenities,
      contactEmail,
      contactPhone,
      roomsAvailable,
      isAvailable,
    } = req.body;

    // Validation
    if (!name || !address || !county || !pricePerNight) {
      return res.status(400).json({
        success: false,
        message: "Name, address, county, and price are required",
      });
    }

    if (!req.files?.image) {
      return res.status(400).json({
        success: false,
        message: "Hotel main image is required",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Check if hotel already exists
    const existingHotel = await Hotel.findOne({ name: name.trim() });
    if (existingHotel) {
      return res.status(400).json({
        success: false,
        message: "Hotel with this name already exists",
      });
    }

    // Upload main image to Cloudinary
    const mainImageResult = await cloudinary.uploader.upload(
      req.files.image[0].path,
      {
        folder: "hotels",
      }
    );

    // Upload additional images if provided
    let additionalImages = [];
    if (req.files.images) {
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "hotels/rooms",
        });
        additionalImages.push(result.secure_url);
      }
    }

    // Parse amenities if it's a string
    let amenitiesArray = [];
    if (amenities) {
      if (typeof amenities === "string") {
        amenitiesArray = amenities.split(",").map((item) => item.trim());
      } else if (Array.isArray(amenities)) {
        amenitiesArray = amenities;
      }
    }

    const newHotel = new Hotel({
      name: name.trim(),
      description: description?.trim() || "",
      address: address.trim(),
      county: county.trim(),
      pricePerNight: parseFloat(pricePerNight),
      amenities: amenitiesArray,
      image: mainImageResult.secure_url,
      images: additionalImages,
      contactEmail: contactEmail?.trim() || "",
      contactPhone: contactPhone?.trim() || "",
      roomsAvailable: parseInt(roomsAvailable) || 1,
      isAvailable: isAvailable === "true" || isAvailable === true,
    });

    const savedHotel = await newHotel.save();

    res.status(201).json({
      success: true,
      message: "Hotel added successfully",
      hotel: savedHotel,
    });
  } catch (error) {
    console.error("Add hotel error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      hotels,
      message: "Hotels fetched successfully",
      count: hotels.length,
    });
  } catch (error) {
    console.error("Get all hotels error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotels",
      error: error.message,
    });
  }
};

// Get hotel by ID
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.error("Get hotel by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotel",
      error: error.message,
    });
  }
};

// Update hotel
const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      address,
      county,
      pricePerNight,
      amenities,
      contactEmail,
      contactPhone,
      roomsAvailable,
      isAvailable,
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // If name is being updated, check for duplicates
    if (name && name.trim() !== hotel.name) {
      const existingHotel = await Hotel.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });

      if (existingHotel) {
        return res.status(400).json({
          success: false,
          message: "Hotel with this name already exists",
        });
      }
      hotel.name = name.trim();
    }

    // Update fields
    if (description !== undefined) hotel.description = description.trim();
    if (address) hotel.address = address.trim();
    if (county) hotel.county = county.trim();
    if (pricePerNight) hotel.pricePerNight = parseFloat(pricePerNight);
    if (contactEmail !== undefined) hotel.contactEmail = contactEmail.trim();
    if (contactPhone !== undefined) hotel.contactPhone = contactPhone.trim();
    if (roomsAvailable !== undefined)
      hotel.roomsAvailable = parseInt(roomsAvailable);
    if (isAvailable !== undefined)
      hotel.isAvailable = isAvailable === "true" || isAvailable === true;

    // Parse amenities if provided
    if (amenities !== undefined) {
      let amenitiesArray = [];
      if (typeof amenities === "string") {
        amenitiesArray = amenities.split(",").map((item) => item.trim());
      } else if (Array.isArray(amenities)) {
        amenitiesArray = amenities;
      }
      hotel.amenities = amenitiesArray;
    }

    // Handle main image update
    if (req.files?.image) {
      // Delete old main image from Cloudinary
      if (hotel.image) {
        const publicId = hotel.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`hotels/${publicId}`);
      }

      // Upload new main image
      const result = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: "hotels",
      });
      hotel.image = result.secure_url;
    }

    // Handle additional images update
    if (req.files?.images) {
      // Delete old additional images if needed
      if (hotel.images && hotel.images.length > 0) {
        for (const oldImage of hotel.images) {
          const publicId = oldImage.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`hotels/rooms/${publicId}`);
        }
      }

      // Upload new additional images
      let newImages = [];
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "hotels/rooms",
        });
        newImages.push(result.secure_url);
      }
      hotel.images = newImages;
    }

    const updatedHotel = await hotel.save();

    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      hotel: updatedHotel,
    });
  } catch (error) {
    console.error("Update hotel error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update hotel",
      error: error.message,
    });
  }
};

// Delete hotel
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // Delete images from Cloudinary
    if (hotel.image) {
      const publicId = hotel.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`hotels/${publicId}`);
    }

    if (hotel.images && hotel.images.length > 0) {
      for (const image of hotel.images) {
        const publicId = image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`hotels/rooms/${publicId}`);
      }
    }

    await Hotel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
      hotelId: id,
    });
  } catch (error) {
    console.error("Delete hotel error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete hotel",
      error: error.message,
    });
  }
};


//  Add a new table'
const addTable = async (req, res) => {
  try {
    const { name, maxSeats, currentSeats, type, description, price, available } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Validate seat numbers
    if (parseInt(currentSeats) > parseInt(maxSeats)) {
      return res.status(400).json({
        success: false,
        message: "Current seats cannot exceed maximum seats"
      });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "restaurant_tables",
    });

    // Create new table document
    const newTable = new tableSchema({
      name,
      image: uploadResult.secure_url,
      maxSeats,
      currentSeats,
      type,
      description,
      price,
      available: available ?? true,
    });

    await newTable.save();

    res.status(201).json({
      success: true,
      message: "Table added successfully",
      table: newTable,
    });
  } catch (error) {
    console.error("Error adding table:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding table",
      error: error.message,
    });
  }
};

// Get all tables
const getTables = async (req, res) => {
  try {
    const tables = await tableSchema.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tables.length,
      tables,
    });
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tables",
      error: error.message,
    });
  }
};

// Update table
const updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maxSeats, currentSeats, type, description, price, available } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Find table
    const table = await tableSchema.findById(id);
    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found"
      });
    }

    // Validate seat numbers
    if (parseInt(currentSeats) > parseInt(maxSeats)) {
      return res.status(400).json({
        success: false,
        message: "Current seats cannot exceed maximum seats"
      });
    }

    let imageUrl = table.image;
    
    // Upload new image if provided
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (table.image) {
        const publicId = table.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`restaurant_tables/${publicId}`);
      }
      
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "restaurant_tables",
      });
      imageUrl = uploadResult.secure_url;
    }

    // Update table
    const updatedTable = await tableSchema.findByIdAndUpdate(
      id,
      {
        name,
        image: imageUrl,
        maxSeats,
        currentSeats,
        type,
        description,
        price,
        available,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Table updated successfully",
      table: updatedTable,
    });
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating table",
      error: error.message,
    });
  }
};

// Delete table
const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Find table
    const table = await tableSchema.findById(id);
    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found"
      });
    }

    // Delete image from Cloudinary
    if (table.image) {
      const publicId = table.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`restaurant_tables/${publicId}`);
    }

    // Delete table from database
    await tableSchema.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Table deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting table:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting table",
      error: error.message,
    });
  }
};

// Toggle table availability
const toggleTableAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { available } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const table = await tableSchema.findById(id);
    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found"
      });
    }

    const updatedTable = await tableSchema.findByIdAndUpdate(
      id,
      { available },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `Table ${available ? 'activated' : 'deactivated'} successfully`,
      table: updatedTable,
    });
  } catch (error) {
    console.error("Error toggling table availability:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating table availability",
      error: error.message,
    });
  }
};



// get all members
const getAllMembers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export {
  addDish,
  addHotel,
  getAllHotels,
  updateHotel,
  addTable,
  updateTable, 
  deleteTable, 
  toggleTableAvailability ,
  getAllMembers,
  getTables,
  getHotelById,
  deleteHotel,
  deleteDish,
  getAllDishes,
  updateDish,
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
