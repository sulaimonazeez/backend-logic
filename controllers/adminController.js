import User from "../models/User.js";
import CoinDeposit from "../models/Coin.js";

export const dashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDeposits = await Coin.countDocuments();

    const totalAmount = await Coin.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const dashboardData = {
      totalUsers,
      totalDeposits,
      totalAmount: totalAmount[0]?.total || 0,
      message: "Admin dashboard data loaded successfully"
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};