import jwt from "jsonwebtoken";
import User from "../models/User.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

// GET /auth/check — verify cookie and return user
export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// POST /auth/logout — clear the cookie
export const logout = (req, res) => {
  res.clearCookie("access_token", cookieOptions);
  res.status(200).json({ message: "Logged out successfully" });
};
