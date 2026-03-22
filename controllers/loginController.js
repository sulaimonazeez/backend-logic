import createUser from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔍 Find user
    const user = await createUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 📦 Create payload
    const payload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      phone: user.phone,
      country: user.country,
      role: user.role,
    };

    // 🔑 Create token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    // 🌍 Detect environment
    const isProduction = process.env.NODE_ENV === "production";

    // 🍪 Set cookie (FIXED)
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProduction,                  // true ONLY in production
      sameSite: isProduction ? "none" : "lax", // 🔥 FIX HERE
      maxAge: 1000 * 60 * 60,                // 1 hour
    });

    // ✅ Response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        country: user.country,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};