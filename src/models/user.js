import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    location: {
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Reference to orders
    role: { type: String, enum: ["customer", "vendor", "delivery"], default: "customer" }, // User role
    otp: { type: String }, // OTP for authentication
    isVerified: { type: Boolean, default: false }, // Verification status
  },
  { timestamps: true } // Auto-add createdAt & updatedAt fields
);

export default mongoose.model("User", userSchema);
