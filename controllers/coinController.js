import CoinDeposit from "../models/Coin.js";

export const depositCoin = async (req, res) => {
  const { amount, coinType } = req.body
  if (!coinType || !amount){
    console.error('No Data Provided');
    res.status(404).json({message:"No Data Provuded"})
  }
  try {
    const newCoin = await CoinDeposit.create({
      user: req.user.id,
      amount: amount,
      coinType: coinType
    });
    res.json(newCoin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};