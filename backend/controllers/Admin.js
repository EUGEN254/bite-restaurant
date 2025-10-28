import { v2 as cloudinary } from "cloudinary";
import PopularDishes from "../models/popularDishesSchema.js";
import User from "../models/userSchema.js";
import Category from "../models/categorySchema.js";

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
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert dish counts to a lookup object
    const dishCountMap = {};
    dishCounts.forEach(item => {
      dishCountMap[item._id] = item.count;
    });

    // Add dish counts to categories
    const categoriesWithCounts = categories.map(category => ({
      ...category.toObject(),
      dishesCount: dishCountMap[category.name] || 0
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

    const category = await Category.create({
      name: name.trim(),
      description: description?.trim() || "",
      status: status || "active",
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

// Update category
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

export {
  addDish,
  deleteDish,
  getAllDishes,
  updateDish,
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
