import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// register user
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picture,
      friends,
      location,
      occupation,
    } = req.body;
    // encryption
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPass,
      picture,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impression: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // encryption
    const user = await User.findOne({ email: email });
    // user not exist
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    // user exist
    const isMatch = await bcrypt.compare(password, user.password);
    // pass not match
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    // jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
