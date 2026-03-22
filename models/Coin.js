import mongoose from "mongoose";
import { registerModel } from "../admin/adminRegistry.js";

const coinSchema = new mongoose.Schema(
  {
    user:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ correct ref
    amount:   { type: Number, required: true, min: 0 },
    coinType: { type: String, required: true, trim: true },
    status:   { type: String, enum: ["pending", "confirmed", "rejected"], default: "pending" }, // ✅ added status
    date:     { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CoinDeposit = mongoose.model("CoinDeposit", coinSchema);
registerModel("CoinDeposit", CoinDeposit);
export default CoinDeposit;
