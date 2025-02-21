import User from "../models/user.js";
import { sendOTP } from "../services/otpService.js";
import jwt from "jsonwebtoken";

export const sendOtpForSignup = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = new User({ phoneNumber, otp });
    } else {
      user.otp = otp;
    }

    await user.save();
    await sendOTP(phoneNumber, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOtpAndLogin = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    const token = jwt.sign({ userId: user._id, phoneNumber }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "OTP verification failed" });
  }
};
