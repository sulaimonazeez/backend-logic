// controllers/balance.js
import profileSchema from "../models/Profile.js";

export const getMyBalance = async (req, res) => {
  try {
    // req.user.id comes from JWT
    let balance = await profileSchema.findOne({ user: req.user.id });

    // If no balance exists, create one
    if (!balance) {
      await profileSchema.create({
        user: req.user.id,
        balance: 0.0,
        profit: 0.0,
        bonus: 0.0,
      });

      // Fetch the newly created balance
      balance = await profileSchema.findOne({ user: req.user.id });
    }

    // Return the balance info
    res.set("Cache-Control", "no-store"); 
    res.json({
      balance: balance.balance,
      user: balance.user,
      profit: balance.profit,
      bonus: balance.bonus,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};