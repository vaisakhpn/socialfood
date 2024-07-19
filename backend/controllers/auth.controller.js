import { errorHandler } from "../middleware/error.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const { username, email, phoneNumber, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    phoneNumber,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
    res.status(500).json("Failed to create user");
  }
};

export const signIn = async (req, res, next) => {
  const { email, phonenumber, password } = req.body;
  try {
    const validUser = await User.findOne({
      $or: [{ email }, { phonenumber }],
    });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "invalid password"));

    const age = 1000 * 60 * 60 * 24 * 2;

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: age,
    });
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true, maxAge: age })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to login!" });
  }
};
export const signOut = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logout Successful" });
};
