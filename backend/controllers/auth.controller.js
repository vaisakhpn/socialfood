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

    res
      .cookie("access_token", token, { httpOnly: true, maxAge: age })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error("Failed to login:", error);
    next(error);
  }
};

export const check = async (req, res) => {
  const { username, email, phoneNumber } = req.body;

  if (!username && !email && !phoneNumber) {
    return res.status(400).json({ message: "At least one field is required" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { phoneNumber }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (existingUser.phoneNumber === phoneNumber) {
        return res.status(400).json({ message: "Phone Number already exists" });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    res.status(200).json({ message: "Available" });
  } catch (error) {
    console.error("Failed to check:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signOut = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logout Successful" });
};
