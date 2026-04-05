import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkAuth = async (req, res) => {
  try {
    let token = null;

    // 1. Check Authorization header first (cross-domain production fix)
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. Fall back to cookie
    if (!token) {
      token = req.cookies?.access_token;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    console.error("checkAuth error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
