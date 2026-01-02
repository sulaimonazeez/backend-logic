import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import adminRoute from "./routes/adminRoute.js";
import router from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import User from "./models/User.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();
connectDb()

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan('dev'));
app.use("/api", userRoutes);
app.use("/auth", router);
app.use(adminRoute);

app.listen(8000, ()=>{
  console.log("Server is running...");
})