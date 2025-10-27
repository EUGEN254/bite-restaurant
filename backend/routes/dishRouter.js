import express from 'express'
import upload from "../middleware/uploadMiddleware.js";
import userAuth from '../middleware/userAuth.js';
import { addDish, deleteDish, getAllDishes,  updateDish } from '../controllers/Admin.js';

const dishRouter = express.Router();

// Routes
dishRouter.post("/add-dish", userAuth, upload.single("image"), addDish);
dishRouter.get("/all-dishes", getAllDishes);
dishRouter.put("/update-dish/:id", userAuth, upload.single("image"), updateDish);
dishRouter.delete("/delete-dish/:id", userAuth, deleteDish); 

export default dishRouter;