import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { addCategory, getCategories, updateCategory, deleteCategory } from '../controllers/Admin.js';

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/add-category", userAuth, addCategory);
categoryRouter.put("/update-category/:id", userAuth, updateCategory);
categoryRouter.delete("/delete-category/:id", userAuth, deleteCategory);

export default categoryRouter;