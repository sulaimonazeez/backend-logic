import CoinDeposit from "../models/Coin.js";

export const getCoin = async (req, res) => {
  try {
    const transactions = await CoinDeposit.find({ user: req.user.id })
      .sort({ date: -1 })
      .lean(); // ✅ .lean() returns plain JS objects — faster for read-only queries

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
