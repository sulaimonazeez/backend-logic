import CoinDeposit from "../models/Coin.js";

export const depositCoin = async (req, res) => {
  const { amount, coinType } = req.body;

  if (!coinType || !amount) {
    return res.status(400).json({ message: "Amount and coinType are required" });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero" });
  }

  try {
    const newDeposit = await CoinDeposit.create({
      user: req.user.id,
      amount: Number(amount),
      coinType,
    });

    res.status(201).json(newDeposit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
