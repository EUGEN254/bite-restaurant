import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Validate input
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user);

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email }).select("fullname email password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No account found with that email.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    const token = generateToken(user._id);

    // ✅ Set cookie expiration based on rememberMe - NOW 1 DAY
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };

    if (rememberMe) {
      cookieOptions.maxAge = 24 * 60 * 60 * 1000; // 1day
    } else {
      // Session cookie: expires when browser closes
    }

    res.cookie("token", token, cookieOptions);

    const { password: _, ...userWithoutPassword } = user._doc;//take all properties from users and remove password

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};

export const getUserData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    // return the safe user
    const safeUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };

    res.json({ success: true, user: safeUser });
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const logout = async (req,res)=> {
  res.clearCookie("token");
  res.status(201).json({
    success:true,message:"Loggod Out Successfully"
  })
}
