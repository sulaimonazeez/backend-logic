import User from "../models/User.js";
import CoinDeposit from "../models/Coin.js";

export const dashboard = async (req, res) => {
  try {
    const [totalUsers, totalDeposits, totalAmountResult] = await Promise.all([
      User.countDocuments(),
      CoinDeposit.countDocuments(),
      CoinDeposit.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
    ]); // ✅ Run all 3 queries in parallel — was sequential before

    res.status(200).json({
      totalUsers,
      totalDeposits,
      totalAmount: totalAmountResult[0]?.total || 0,
      message: "Admin dashboard loaded successfully",
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
