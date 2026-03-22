import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const userCreate = async (req, res) => {
  const { fullname, email, phone, country, password } = req.body;

  if (!fullname || !email || !phone || !country || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // ✅ increased from 10 to 12 rounds
    await User.create({ fullname, email, phone, country, password: hashedPassword });

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
