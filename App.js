import express from "express";
import dotenv from "dotenv";
import { connect } from "./src/config/connect.js";

dotenv.config();

const app = express();


app.get("/", (req, res) => {
    res.send("Welcome to Quick Commerce Backend");
  });




// Connect to the database
connect();


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
