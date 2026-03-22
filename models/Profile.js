import mongoose from "mongoose";
import { registerModel } from "../admin/adminRegistry.js";

const profileSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true }, // ✅ fixed ref (was "createUser")
    balance: { type: Number, default: 0.0 },
    profit:  { type: Number, default: 0.0 },
    bonus:   { type: Number, default: 0.0 },
  },
  { timestamps: true }
);

const Profile = mongoose.model("UserBalance", profileSchema);
registerModel("UserBalance", Profile);
export default Profile;
