import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import router from "./routes/auth.js";

const port = process.env.PORT || 8000;

dotenv.config();
const app = express();
//connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("DB error => ", err);
  });

//router middleware
app.use("/api", authRoutes);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
