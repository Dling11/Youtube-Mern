import { createError } from "../utils/error.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Sign up
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);        // only hashing password
    const newUser = new User({ ...req.body, password: hash });    // store all info from user | including hashed password

    await newUser.save();
    res.status(201).send("User has been created!");
  } catch (err) {
    // next(createError(404, "User has already signin"));
    next(err);
  }
};

// Sign up
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });  // Check name in database mongodb
    if (!user) return next(createError(404, "User not found!"));

    // check userpassword & compare
    const isCorrect = await bcrypt.compare(req.body.password, user.password); // compare(<input of user>, <mongoDb-check-for some pass>)
    if (!isCorrect) return next(createError(400, "Wrong Password...!"));

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc; // _doc is only the path we need, also separate password || don't include password

    res.cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

// login using google
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // condition which determined if user has alreay an account or not in mongoDb
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {                  // if user doesn't have account register this user
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
