import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectCloudinary from './configs/cloudinary.js';
import connectDB from './configs/connectDB.js';
import userRouter from './routes/userRouter.js';

// .......... express setup ..........
const app = express();
const PORT = process.env.PORT || 4000;

// .......... middleware ..........
connectCloudinary();

// Determine environmen
const isProduction = (process.env.NODE_ENV || "development") === "production";

const allowedOrigins = (isProduction
  ? process.env.PROD_ORIGINS
  : process.env.DEV_ORIGINS
)?.split(",");


app.use(express.json({ limit: "4mb" }));
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// test route
app.get("/", (req, res) => {
  res.send(`✅ Server running in ${process.env.NODE_ENV} mode — ready to receive requests`);
});



// ROUTES
app.use("/api/user",userRouter)

// connect MongoDB
await connectDB();

// start server
app.listen(PORT, () => console.log(`🚀 Server started on PORT: ${PORT}`));
