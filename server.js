import dotenv from "dotenv";
dotenv.config(); // ✅ simple, works everywhere

import express from "express";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import adminRoute from "./routes/adminRoute.js";
import router from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "https://xentrovest.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", userRoutes);
app.use("/auth", router);
app.use(adminRoute);

connectDb(); // ✅ after middleware

app.listen(8000, () => {
  console.log("Server is running...");
});