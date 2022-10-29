import jwt from "jsonwebtoken";
import User from "../model/user.js";
export const requireSignin = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded;
  } catch (err) {
    return res.status(401).json(err);
  }
  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
