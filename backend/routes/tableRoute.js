// routes/tableRoutes.js
import express from "express";
import userAuth from "../middleware/userAuth.js";
import upload from "../middleware/uploadMiddleware.js";
import { 
  addTable, 
  getTables, 
  updateTable, 
  deleteTable, 
  toggleTableAvailability 
} from "../controllers/Admin.js";

const tableRouter = express.Router();


tableRouter.post("/add", userAuth, upload.single("image"), addTable);
tableRouter.get("/", getTables);
tableRouter.put("/update/:id", userAuth, upload.single("image"), updateTable);
tableRouter.delete("/delete/:id", userAuth, deleteTable);
tableRouter.put("/toggle-availability/:id", userAuth, toggleTableAvailability);

export default tableRouter;