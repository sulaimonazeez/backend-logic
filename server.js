import dotenv from "dotenv";
dotenv.config(); // ✅ Must be first before any other imports

import express from "express";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import adminRoute from "./routes/adminRoute.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();

// ✅ CORS — exact origin required when credentials: true (wildcard "*" breaks cookies)

app.use(express.json());
app.use(cookieParser());


// Only log in development
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(cors({
  origin: true, // or your allowed origins function
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use("/api", userRoutes);
app.use("/auth", authRouter);
app.use(adminRoute);

connectDb(); // ✅ After middleware is registered

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${process.env.NODE_ENV}]`);
});
