import mongoose from "mongoose";
import { registerModel } from "../admin/adminRegistry.js";
const profileSchemas = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:"createUser", required:true},
  balance: { type: Number, default: 0.0 },
  profit: { type: Number, default: 0.0 },
  bonus: { type: Number, default: 0.0 }
});

const profileSchema = mongoose.model("userBalance", profileSchemas);
registerModel("UserBalance", profileSchema);
export default profileSchema;