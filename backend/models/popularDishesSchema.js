import mongoose from "mongoose";

const popularDishesSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    image: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true,
      min: 0
    },
    description: { 
      type: String,
      default: "" 
    },
    category: { 
      type: String, 
      required: true,
      trim: true
    },
    isAvailable: {
      type: Boolean,
      default: true // Changed from false to true
    },
  },
  {
    timestamps: true,
  }
);

const PopularDishes = mongoose.models.PopularDish || mongoose.model("PopularDish", popularDishesSchema);
export default PopularDishes;