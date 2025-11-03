import createUser from "../models/User.js";
import bcrypt from "bcryptjs";

export const userCreate = async (req, res) => {
  const { fullname, email, phone, country, password} = req.body;

  try {
    const existingUser = await createUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser.create({ fullname, email, phone, country, password: hashedPassword });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};