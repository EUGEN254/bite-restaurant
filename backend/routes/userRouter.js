import express from 'express'
import { getUserData, login, loginAdmin, logout, registerUser,getAdminData,logoutAdmin } from '../controllers/users.js';
import userAuth from '../middleware/userAuth.js';
import { getAllMembers } from '../controllers/Admin.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",login);
userRouter.post("/login-admin",loginAdmin);
userRouter.post("/logout",logout);
userRouter.post("/logout-admin",logoutAdmin);
userRouter.get("/me",userAuth,getUserData);
userRouter.get("/admin",userAuth,getAdminData);
userRouter.get("/get-all-members",userAuth,getAllMembers);




export default userRouter