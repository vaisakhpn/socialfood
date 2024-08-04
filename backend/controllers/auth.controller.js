import { errorHandler } from "../middleware/error.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const { username, email, phoneNumber, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User created successfully:", newUser);
    return res.status(201).json("User created successfully");
  } catch (error) {
    console.error("Failed to create user:", error);
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, phoneNumber, password } = req.body;
  try {
    const validUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid password"));
    }

    const age = 1000 * 60 * 60 * 24 * 2;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: age,
    });

    const { password: pass, ...rest } = validUser._doc;
    console.log("User signed in successfully:", rest);

    return res
      .cookie("access_token", token, { httpOnly: true, maxAge: age })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error("Failed to login:", error);
    next(error);
  }
};

export const signOut = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logout Successful" });
};
