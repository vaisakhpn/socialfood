import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "console";
dotenv.config();

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
