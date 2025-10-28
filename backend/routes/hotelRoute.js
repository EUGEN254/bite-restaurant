import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { 
    addHotel,
    getAllHotels,
    updateHotel,
    getHotelById,
    deleteHotel,
} from '../controllers/Admin.js';
import upload from "../middleware/uploadMiddleware.js";

const hotelRouter = express.Router();

// Public routes
hotelRouter.get("/all-hotels", getAllHotels);
hotelRouter.get("/:id", getHotelById);

// Admin routes
hotelRouter.post("/add-hotel", userAuth, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), addHotel);

hotelRouter.put("/update-hotel/:id", userAuth, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), updateHotel);

hotelRouter.delete("/delete-hotel/:id", userAuth, deleteHotel);

export default hotelRouter;