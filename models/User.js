import mongoose from "mongoose";
import { registerModel } from "../admin/adminRegistry.js";

const loginSchema = new mongoose.Schema({
  fullname: {type:String, required:true},
  email: {type:String, unique:true, required:true},
  phone: {type:String, unique:true, required:true},
  country: {type:String, required:true},
  password: {type: String, required:true},
  role: { type: String, enum: ["user", "admin", "staff"], default: "user" }
})


const createUser = mongoose.model("createUser", loginSchema);
registerModel("User", createUser);
export default createUser;