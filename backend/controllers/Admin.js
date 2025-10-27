import { v2 as cloudinary } from "cloudinary";
import PopularDishes from "../models/popularDishesSchema.js";
import User from "../models/userSchema.js";

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
        message: "Not authorized" 
      });
    }

    const dish = await PopularDishes.findById(id);
    if (!dish) {
      return res.status(404).json({ 
        success: false, 
        message: "Dish not found" 
      });
    }

    // Delete image from Cloudinary
    if (dish.image) {
      const publicId = dish.image.split('/').pop().split('.')[0];
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
      error: err.message 
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
      count: dishes.length
    });
  } catch (error) {
    console.error("Get all dishes error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dishes",
      error: error.message
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
        message: "Not authorized"
      });
    }

    const dish = await PopularDishes.findById(id);
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found"
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
        const publicId = dish.image.split('/').pop().split('.')[0];
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
      dish: updatedDish
    });
  } catch (error) {
    console.error("Update dish error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update dish",
      error: error.message
    });
  }
};

export { addDish, deleteDish, getAllDishes,  updateDish };