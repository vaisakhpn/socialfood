import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();

app.listen(3001, () => {
  console.log("server is running on port 3001");
});

app.get("/", (req, res) => {
  res.send("API Working");
});

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();
