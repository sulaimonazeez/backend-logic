import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { myProfile } from "../controllers/profileController.js"
import { getMyBalance } from "../controllers/balanceController.js";
import { depositCoin } from "../controllers/coinController.js";
import { getCoin } from "../controllers/getCoinController.js";
import { checkAuth } from "../controllers/authController.js";




const router = express.Router();

router.get("/balance", verifyToken, getMyBalance);
router.get("/profile", verifyToken, myProfile);
router.post("/deposit", verifyToken, depositCoin);
router.get("/check", checkAuth);
router.get("/deposit", verifyToken, getCoin);

export default router;