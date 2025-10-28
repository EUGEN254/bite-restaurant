import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
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
    image: {
      type: String, // Main hotel image
      required: true
    },
    images: [{
      type: String // Array of room images
    }],
    address: {
      type: String,
      required: true
    },
    county: {
      type: String,
      required: true
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0
    },
    amenities: [{
      type: String
    }],
    isAvailable: {
      type: Boolean,
      default: true
    },
    contactEmail: {
      type: String,
      trim: true
    },
    contactPhone: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    roomsAvailable: {
      type: Number,
      default: 1,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
export default Hotel;