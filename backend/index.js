import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import commentRoutes from "./routes/comments.route.js";
import channelRoutes from "./routes/channel.routes.js";
import userRoutes from "./routes/user.route.js";
import videoRoutes from "./routes/video.route.js";
import { connectDB } from "./config/db.js";

const app = express();
//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use("/backend/auth", authRoute);
app.use("/backend/users", userRoutes);
app.use("/backend/videos", videoRoutes);
app.use("/backend/channels", channelRoutes);
app.use("/backend/comments", commentRoutes);

//default
app.get("/", (req, res) => {
  res.send("API Working");
});

//db connection
connectDB();

//start server
app.listen(3001, () => {
  console.log("server is running on port 3001");
});
