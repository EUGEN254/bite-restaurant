import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
  maxSeats: {
    type: Number,
    required: true,
  },
  currentSeats: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["indoor", "outdoor", "private", "bar"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Table", tableSchema);
