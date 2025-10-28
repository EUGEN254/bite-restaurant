import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    description: { 
      type: String, 
      default: "" 
    },
    status: { 
      type: String, 
      default: "active",
      enum: ["active", "inactive"] 
    }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;