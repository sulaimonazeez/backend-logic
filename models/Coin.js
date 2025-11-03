import mongoose from "mongoose";
import { registerModel } from "../admin/adminRegistry.js";

const coinSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // fixed typo
  amount: { type: Number, default: 0.0, required: true },
  coinType: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const CoinDeposit = mongoose.model("CoinDeposit", coinSchema);
registerModel("CoinDeposit", CoinDeposit);
export default CoinDeposit;