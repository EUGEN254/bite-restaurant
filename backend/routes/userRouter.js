import express from 'express'
import { getUserData, login, logout, registerUser } from '../controllers/users.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",login);
userRouter.post("/logout",logout);
userRouter.get("/me",userAuth,getUserData);

export default userRouter