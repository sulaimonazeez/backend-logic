import createUser from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await createUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create payload
    const payload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      phone: user.phone,
      country: user.country,
      role: user.role
    };

    // Create JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    // Set token as HTTP-only cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in prod
      sameSite: "none", // protects against CSRF
      maxAge: 1000 * 60 * 60 // 1 hour
    });

    // Return minimal user info (no token in JSON)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        country: user.country,
        role: user.role
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};