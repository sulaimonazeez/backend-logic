import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // ✅ Crash immediately — don't run with no DB
  }
};

export default connectDb;
