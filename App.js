import express from "express";
import dotenv from "dotenv";
import { connect } from "./src/config/connect.js";

import authRoutes from "./src/routes/auth.js";

dotenv.config();
const PORT= 8080;
const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to Quick Commerce Backend");
  });


  app.use("/api/auth", authRoutes);

// Connect to the database
connect();


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`); 
});
 