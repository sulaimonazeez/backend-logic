import express from "express";
import { userCreate } from "../controllers/createController.js";
import { userLogin } from "../controllers/loginController.js";

const userRoutes = express.Router();

userRoutes.post("/create", userCreate);
userRoutes.post("/login", userLogin);

export default userRoutes;
