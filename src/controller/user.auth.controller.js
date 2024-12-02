import UserModel from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass = await bcrypt.hashSync(password, 10);

    const data = {
      name,
      email,
      password: hashPass,
    };
    const newUser = new UserModel(data);
    await newUser.save();

    res.status(201).json({
      msg: "User Create Success",
      error: false,
      success: true,
      user: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ msg: "Invalid password", error: true, success: false });
    }
    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    res.status(201).json({
      msg: "User Create Success",
      error: false,
      success: true,
      user: user,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: " logout  success  " });
  } catch (error) {
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};
