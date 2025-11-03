import CoinType from "../models/Coin.js";

export const getCoin = async (req, res) =>{
  try {
    const transaction = await CoinType.find({user:req.user.id}).sort({ date:-1 });
    res.status(200).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Something went wrong"})
  }
  
}