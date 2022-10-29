import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "./../model/user.js";
import { hassPassword, comparePassword } from "../helpers/authHelpers.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    console.log(req.body.name);
    //1. destructure name, email, password from req.body
    const { name, email, password, address } = req.body;
    //2. all fields require validation
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at leat 6 characters long" });
    }
    //3. check if email taken
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }
    //4. hash password
    const hashedPassword = await hassPassword(password);
    //5. register user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      address,
    }).save();

    //6 create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "14d",
    });
    //7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //2. all fields require validation

    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at leat 6 characters long" });
    }
    //3. check if email taken
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    //4 compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "14d",
    });
    res.json({
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};
