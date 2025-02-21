import express from "express";
import { sendOtpForSignup, verifyOtpAndLogin } from "../controllers/auth.js";

const router = express.Router();

router.post("/send-otp", sendOtpForSignup);
router.post("/verify-otp", verifyOtpAndLogin);

export default router;
