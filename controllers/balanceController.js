import Profile from "../models/Profile.js";

export const getMyBalance = async (req, res) => {
  try {
    // ✅ findOneAndUpdate with upsert — creates if not exists in one DB call (was 2 separate calls)
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $setOnInsert: { balance: 0.0, profit: 0.0, bonus: 0.0 } },
      { new: true, upsert: true }
    );

    res.set("Cache-Control", "no-store");
    res.json({
      balance: profile.balance,
      profit:  profile.profit,
      bonus:   profile.bonus,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
