// middleware/auth.js
import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token from HTTP-only cookies
 */
export const verifyToken = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies?.access_token; // Make sure you have cookie-parser middleware
    console.log("Cookies:", req.cookies);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded; // id, email, fullname, role, etc.

    next(); // proceed to next middleware or route handler
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};