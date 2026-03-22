import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});
import express from "express";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import adminRoute from "./routes/adminRoute.js";
import router from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();
connectDb()
app.use(cors({
  origin: "https://xentrovest.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", userRoutes);
app.use("/auth", router);
app.use(adminRoute);
console.log(process.env.CLIENT_URL)
app.listen(8000, () => {
  console.log("Server is running...");
});