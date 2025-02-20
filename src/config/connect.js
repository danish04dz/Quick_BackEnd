
import mongoose from "mongoose"

import dotenv from "dotenv"

dotenv.config()

export const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB connected successfully");
    } catch (error) {
      console.error(" DB CONNECTION ERROR:", error);
      process.exit(1);
    }
  };