import express from 'express'
import { getUserData, login, loginAdmin, logout, registerUser,getAdminData } from '../controllers/users.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",login);
userRouter.post("/login-admin",loginAdmin);
userRouter.post("/logout",logout);
userRouter.get("/me",userAuth,getUserData);
userRouter.get("/admin",userAuth,getAdminData);

export default userRouter