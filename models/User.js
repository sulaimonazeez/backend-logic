import mongoose from "mongoose";
import { registerModel } from "../admin/adminRegistry.js";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email:    { type: String, unique: true, required: true, lowercase: true, trim: true },
    phone:    { type: String, unique: true, required: true, trim: true },
    country:  { type: String, required: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ["user", "admin", "staff"], default: "user" },
  },
  { timestamps: true } // ✅ Adds createdAt and updatedAt automatically
);

// ✅ "User" → Mongoose maps to "users" collection (was "createUser" → wrong "createusers")
const User = mongoose.model("User", userSchema);
registerModel("User", User);
export default User;
