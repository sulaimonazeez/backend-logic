import express from "express";
import { userCreate } from "../controllers/createController.js";
import { userLogin } from "../controllers/loginController.js";
import User from "../models/User.js";

const userRoutes = express.Router();

userRoutes.post("/create", userCreate);
userRoutes.post("/login", userLogin);
// TEMP: Promote user to admin - REMOVE AFTER USE
userRoutes.get("/make-admin", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: "prime@stonefx.com" },
      { role: "admin" },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "User promoted to admin", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default userRoutes;
